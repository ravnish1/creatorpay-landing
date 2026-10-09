"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import clsx from "clsx";
import { site } from "@/content/site";
import { Countdown } from "./countdown";
import { Eyebrow, PrimaryCta, Reveal } from "./ui";
import { AppStoreIcon, PlayStoreIcon } from "./brand-icons";

const WinterScene = dynamic(() => import("./winter-scene"), { ssr: false });

const ROLES = ["Creator", "Brand", "Investor", "Just curious"] as const;

export function Reserve() {
  return (
    <Reveal as="section" id="reserve" className="screen relative overflow-hidden bg-gradient-to-b from-paper via-sky-soft to-lime-soft/60">
      <div className="pointer-events-none absolute inset-0 opacity-90">
        <WinterScene />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-[clamp(1.5rem,5svh,3.5rem)] px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Eyebrow>Launching {site.launchLabel}</Eyebrow>
          <h2 data-reveal className="display t-section mt-4">
            Winter is coming. <em className="text-tangerine">And we&rsquo;re bringing the fire.</em>
          </h2>
          <div data-reveal className="mt-[clamp(1.25rem,4svh,2.5rem)] max-w-xl">
            <Countdown />
          </div>
          <div data-reveal className="mt-4 flex flex-wrap items-center gap-3">
            <StoreBadge store="App Store" />
            <StoreBadge store="Play Store" />
          </div>
        </div>

        <div data-reveal className="relative">
          <ReserveForm />
        </div>
      </div>
    </Reveal>
  );
}

function StoreBadge({ store }: { store: "App Store" | "Play Store" }) {
  return (
    <span className="liquid-glass inline-flex items-center gap-3 rounded-2xl py-2 pl-2 pr-5 text-left">
      {store === "App Store" ? <AppStoreIcon className="h-11 w-11" /> : <PlayStoreIcon className="h-11 w-11" />}
      <span className="relative">
        <span className="block text-[0.6rem] font-semibold uppercase tracking-widest text-ink-3">Coming to</span>
        <span className="block text-base font-semibold leading-tight">{store}</span>
      </span>
    </span>
  );
}

function ReserveForm() {
  const [role, setRole] = useState<(typeof ROLES)[number]>("Creator");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, role }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong. Try again?");
      setState("done");
    } catch (err) {
      setError((err as Error).message);
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-[2rem] bg-white/90 p-10 text-center shadow-[0_40px_90px_-40px_rgba(53,107,255,0.45)] ring-1 ring-line backdrop-blur">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/icons/party.webp" alt="" className="mx-auto h-20 w-20" />
        <p className="display mt-4 text-4xl">You&rsquo;re on the list.</p>
        <p className="mt-2 text-ink-2">We&rsquo;ll reach out before launch to bring you into early testing.</p>
      </div>
    );
  }

  const field = "w-full rounded-2xl bg-canvas px-4 py-[clamp(0.65rem,1.6svh,0.9rem)] text-sm outline-none ring-1 ring-transparent transition placeholder:text-ink-3 focus:bg-white focus:ring-royal";

  return (
    <form onSubmit={onSubmit} className="rounded-[2rem] bg-white/90 p-[clamp(1.25rem,3svh,2rem)] shadow-[0_40px_90px_-40px_rgba(53,107,255,0.45)] ring-1 ring-line backdrop-blur">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="display text-3xl sm:text-4xl">Reserve early access</p>
          <p className="mt-1 text-sm text-ink-2">Be in the first cohort that tests CreatorPay before the world does.</p>
        </div>
      </div>

      <fieldset className="mt-6">
        <legend className="eyebrow text-ink-3">I&rsquo;m a</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {ROLES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              aria-pressed={role === r}
              className={clsx("rounded-full px-4 py-2 text-sm font-medium ring-1 transition", role === r ? "bg-royal text-white ring-royal" : "bg-white text-ink-2 ring-line hover:ring-ink-3")}
            >
              {r}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-5 grid gap-3">
        <input name="name" required placeholder="Your name" autoComplete="name" className={field} />
        <input name="email" type="email" required placeholder="Email" autoComplete="email" className={field} />
        <input name="phone" type="tel" placeholder="Phone (optional)" autoComplete="tel" className={field} />
        <input name="handle" placeholder={role === "Brand" ? "Brand / website" : "Instagram or YouTube handle"} className={field} />
        {/* honeypot */}
        <input name="company_site" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      </div>

      <div className="mt-6 flex sm:justify-end">
        <PrimaryCta type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Reserving…" : "Reserve my spot"}
        </PrimaryCta>
      </div>
      {state === "error" && <p className="mt-3 text-sm text-rose">{error}</p>}
    </form>
  );
}
