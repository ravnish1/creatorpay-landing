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

type Status = "idle" | "sending" | "done" | "error";

const STEPS = [
  { t: "Reserve your spot", d: "Share a few details. It takes under a minute." },
  { t: "Early testing", d: "We contact you before launch to join the first cohort." },
  { t: "Launch", d: `Live on the App Store and Play Store on ${site.launchLabel}.` },
];

export function Reserve() {
  const [status, setStatus] = useState<Status>("idle");

  return (
    <Reveal as="section" id="reserve" className="screen relative overflow-hidden bg-gradient-to-b from-paper via-sky-soft to-lime-soft/60">
      <div className="pointer-events-none absolute inset-0 opacity-90">
        <WinterScene />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="grid items-end gap-[clamp(1.25rem,3svh,2rem)] lg:grid-cols-[1fr_auto]">
          <div>
            <Eyebrow>Early access</Eyebrow>
            <h2 data-reveal className="display t-section mt-4 max-w-3xl">
              Launching <em className="text-tangerine">{site.launchLabel}.</em>
            </h2>
            <div data-reveal className="mt-4 flex flex-wrap items-center gap-3">
              <StoreBadge store="App Store" />
              <StoreBadge store="Play Store" />
            </div>
          </div>
          <div data-reveal className="w-full lg:w-[min(30rem,38vw)]">
            <Countdown />
          </div>
        </div>

        <div data-reveal className="mt-[clamp(1.25rem,4svh,2.5rem)] grid gap-2 rounded-[2.25rem] bg-white/90 p-2 shadow-[0_40px_90px_-40px_rgba(53,107,255,0.45)] ring-1 ring-line backdrop-blur lg:grid-cols-[0.95fr_1.05fr]">
          <AccessPanel step={status === "done" ? 1 : 0} />
          <div className="p-[clamp(1rem,3svh,2rem)] sm:px-8">
            {status === "done" ? <Confirmation /> : <ReserveForm status={status} setStatus={setStatus} />}
          </div>
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

/** Left half of the card: what early access is, and where the visitor is in it. */
function AccessPanel({ step }: { step: number }) {
  return (
    <div className="relative flex flex-col justify-between gap-8 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#5b88ff] via-royal to-[#2449c9] p-[clamp(1.25rem,3.5svh,2.25rem)] text-white">
      {/* soft light, in brand colours */}
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky/50 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-lime/25 blur-3xl" />

      <div className="relative">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 py-1 pl-1 pr-3 text-xs font-semibold ring-1 ring-white/25 backdrop-blur">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/brand/logo.png" alt="" className="h-6 w-6" />
          CreatorPay early access
        </span>
        <p className="display mt-5 text-[clamp(2.1rem,min(4.4vw,6svh),3.4rem)]">
          Be part of the <em>first cohort.</em>
        </p>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80">
          A small group of creators and brands will use CreatorPay before public launch. Their feedback shapes what ships on day one.
        </p>
      </div>

      <ol className="relative grid gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
        {STEPS.map((s, i) => {
          const on = i === step;
          const done = i < step;
          return (
            <li
              key={s.t}
              aria-current={on ? "step" : undefined}
              className={clsx(
                "flex gap-3 rounded-2xl p-3.5 transition-colors duration-500 sm:flex-col sm:gap-6 lg:flex-row lg:gap-3 xl:flex-col xl:gap-6",
                on ? "bg-white text-ink shadow-[0_18px_40px_-18px_rgba(17,2,2,0.5)]" : "bg-white/10 text-white ring-1 ring-white/20",
              )}
            >
              <span
                className={clsx(
                  "grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold tabular-nums",
                  on ? "bg-royal text-white" : done ? "bg-lime text-ink" : "bg-white/15 text-white",
                )}
              >
                {done ? <Check /> : i + 1}
              </span>
              <span>
                <span className="block text-sm font-semibold leading-tight">{s.t}</span>
                <span className={clsx("mt-1 block text-xs leading-snug", on ? "text-ink-2" : "text-white/70")}>{s.d}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" aria-hidden>
      <path d="m5 10.5 3.2 3L15 6.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Confirmation() {
  return (
    <div className="grid h-full min-h-[20rem] place-items-center text-center">
      <div>
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-money-soft text-money ring-1 ring-money/30">
          <svg viewBox="0 0 20 20" className="h-7 w-7" fill="none" aria-hidden>
            <path d="m5 10.5 3.2 3L15 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="display mt-5 text-4xl">You&rsquo;re on the list.</p>
        <p className="mx-auto mt-2 max-w-sm text-ink-2">We&rsquo;ll reach out before launch to bring you into early testing.</p>
      </div>
    </div>
  );
}

function ReserveForm({ status, setStatus }: { status: Status; setStatus: (s: Status) => void }) {
  const [role, setRole] = useState<(typeof ROLES)[number]>("Creator");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, role }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong. Try again?");
      setStatus("done");
    } catch (err) {
      setError((err as Error).message);
      setStatus("error");
    }
  }

  const field = "mt-1.5 w-full rounded-2xl bg-canvas px-4 py-[clamp(0.6rem,1.5svh,0.85rem)] text-base outline-none ring-1 ring-transparent transition placeholder:text-ink-3 focus:bg-white focus:ring-royal sm:text-sm";
  const label = "block text-xs font-semibold text-ink-2";

  return (
    <form onSubmit={onSubmit}>
      <p className="display text-3xl sm:text-4xl">Reserve early access</p>
      <p className="mt-1 text-sm text-ink-2">Tell us who you are and how to reach you.</p>

      <fieldset className="mt-[clamp(1rem,2.6svh,1.5rem)]">
        <legend className={label}>I&rsquo;m joining as</legend>
        <div className="mt-2 grid grid-cols-2 gap-1 rounded-2xl bg-canvas p-1 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          {ROLES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              aria-pressed={role === r}
              className={clsx(
                "rounded-xl px-3 py-2 text-sm font-medium transition",
                role === r ? "bg-white text-royal shadow-[0_6px_16px_-8px_rgba(53,107,255,0.6)] ring-1 ring-line" : "text-ink-2 hover:text-ink",
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-[clamp(0.75rem,2svh,1.25rem)] grid gap-x-3 gap-y-[clamp(0.6rem,1.6svh,1rem)] sm:grid-cols-2">
        <label className={label}>
          Full name
          <input name="name" required placeholder="Your name" autoComplete="name" className={field} />
        </label>
        <label className={label}>
          Email
          <input name="email" type="email" required placeholder="you@example.com" autoComplete="email" className={field} />
        </label>
        <label className={label}>
          Phone <span className="font-normal text-ink-3">(optional)</span>
          <input name="phone" type="tel" placeholder="+91" autoComplete="tel" className={field} />
        </label>
        <label className={label}>
          {role === "Brand" ? "Brand or website" : "Instagram or YouTube handle"}
          <input name="handle" placeholder={role === "Brand" ? "brand.com" : "@handle"} className={field} />
        </label>
        {/* honeypot */}
        <input name="company_site" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      </div>

      <PrimaryCta type="submit" disabled={status === "sending"} magnetic={false} className="mt-[clamp(1rem,2.8svh,1.75rem)] w-full justify-between">
        {status === "sending" ? "Reserving…" : "Reserve my spot"}
      </PrimaryCta>
      {status === "error" && <p className="mt-3 text-sm text-rose" role="alert">{error}</p>}
      <p className="mt-3 text-center text-xs text-ink-3">We only use these details to contact you about early access.</p>
    </form>
  );
}
