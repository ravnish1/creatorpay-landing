# CreatorPay — Landing page

Next.js 16 · React 19 · Tailwind CSS 4 · GSAP + ScrollTrigger · Lenis · React Three Fiber.
Light theme only. Cormorant Garamond (display) + Poppins (UI), per the CreatorPay design system.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Page map

| Section | File | What it does |
|---|---|---|
| Hero — Act I | `src/components/hero.tsx` | Founders' film plays once (muted autoplay, tap for sound, skippable). Placeholder title sequence until the film exists. |
| Hero — Act II | `src/components/hero.tsx` | After the film: founders' portrait, headline, CTAs, live countdown, "Replay the film". Same-session visitors land here directly. |
| HQ cam | `src/components/hq-cam.tsx` | Morning / afternoon / evening take, chosen by India time and started at the "current" second. No seeking, pausing or skipping. |
| Product flow | `src/components/flow.tsx` | Connect → Discover → Share → Earn on a pinned three-phone stage (stacked on mobile). |
| Auto DM | `src/components/auto-dm.tsx` | Animated comment → DM → sale story + real Auto DM screens. |
| Academy | `src/components/academy.tsx` | The Academy as its own business model. |
| Proof | `src/components/proof.tsx` | CollabX track record, brand wall, creator backers. |
| Reserve | `src/components/reserve.tsx` | "Winter is coming…" countdown, 3D snow & embers, early-access form. |
| Investors | `src/components/investors.tsx` | Round, raise, min. ticket, Google Calendar booking. |

## Everything editable lives in `src/content/site.ts`

- `launchAt` — countdown target (currently 31 Jan 2027, 00:00 IST)
- `media.foundersFilm`, `media.foundersFilmPoster` — hero film
- `media.foundersPortrait` — the arms-folded portrait
- `media.hqCam.morning | afternoon | evening` — HQ cam takes
- `calendarUrl` — Google Calendar appointment schedule
- `raise` — round, amount, minimum ticket
- `bookingUrl` — Cal.com link opened by the "Request a call" CTA
- `founders`, `socials`

Empty values show a designed placeholder, so the site is always presentable.

### Media

Put files in `public/media/video/` (or a CDN) and reference them, e.g. `"/media/video/founders.mp4"`.

- **Founders' film:** 16:9 MP4 (H.264), ideally under 25 MB. Add a poster JPG.
- **Portrait:** around 2000 px wide, both founders standing face to face, arms folded.
- **HQ cam:** one 10–20 minute take per slot. 1080p H.264 at about 2–3 Mbps keeps each file manageable. For long files, host on a CDN (Cloudflare R2, Bunny, S3) rather than in the repo.
  The feed is labelled "HQ CAM · ON AIR", and the footer states these are recorded sessions synced to India time.

### Google Calendar booking

Google Calendar → *Create → Appointment schedule* → open the booking page → *Share* → copy the **embed** URL (`https://calendar.google.com/calendar/appointments/schedules/…?gv=true`) into `calendarUrl`. Until then, the section shows a "Request a call" button linking to `bookingUrl`.

## Reservations → Google Sheet

1. Create a Google Sheet with the header row: `submittedAt | name | email | phone | handle | role`.
2. *Extensions → Apps Script*, paste the script below, set `SECRET`, then *Deploy → New deployment → Web app* (Execute as: **Me**, Access: **Anyone**).
3. Copy the web app URL into `.env.local`:

```bash
GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/XXXX/exec
GOOGLE_SHEET_SECRET=the-same-secret
```

```js
const SECRET = "the-same-secret";
function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  if (d.secret !== SECRET) return ContentService.createTextOutput("forbidden");
  SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
    .appendRow([d.submittedAt, d.name, d.email, d.phone, d.handle, d.role]);
  return ContentService.createTextOutput("ok");
}
```

Without the env var, dev mode accepts and logs submissions without storing them; production returns a friendly "opens shortly" error.

## Deploy

Vercel works out of the box. Add the two env vars in project settings.
