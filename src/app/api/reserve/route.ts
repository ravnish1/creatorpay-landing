/**
 * Early-access reservations → Google Sheet (via an Apps Script web app).
 * Set GOOGLE_SHEET_WEBHOOK_URL in .env.local (see README → "Reservations").
 */

const ROLES = new Set(["Creator", "Brand", "Investor", "Just curious"]);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Naive per-instance rate limit: 5 submissions / 10 min / IP
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const clean = (v: unknown, max = 120) => String(v ?? "").trim().slice(0, max);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success.
  if (clean(body.company_site)) return Response.json({ ok: true });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) return Response.json({ error: "Too many attempts. Try again in a few minutes." }, { status: 429 });

  const entry = {
    name: clean(body.name, 80),
    email: clean(body.email, 120).toLowerCase(),
    phone: clean(body.phone, 20),
    handle: clean(body.handle, 120),
    role: ROLES.has(String(body.role)) ? String(body.role) : "Just curious",
    submittedAt: new Date().toISOString(),
  };

  if (!entry.name) return Response.json({ error: "Please add your name." }, { status: 400 });
  if (!EMAIL.test(entry.email)) return Response.json({ error: "That email doesn't look right." }, { status: 400 });

  const webhook = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[reserve] (no GOOGLE_SHEET_WEBHOOK_URL set; dev only, not stored)", entry);
      return Response.json({ ok: true, dev: true });
    }
    return Response.json({ error: "Reservations open shortly. Please try again soon." }, { status: 503 });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...entry, secret: process.env.GOOGLE_SHEET_SECRET ?? "" }),
      redirect: "follow",
    });
    if (!res.ok) throw new Error(`Sheet responded ${res.status}`);
  } catch (err) {
    console.error("[reserve] failed to store", err);
    return Response.json({ error: "Couldn't save that just now. Please try again." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
