"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { site } from "@/content/site";
import { Eyebrow, Reveal } from "./ui";

type Slot = "morning" | "afternoon" | "evening";

const SLOTS: { id: Slot; label: string; hours: string; startHour: number; what: string }[] = [
  { id: "morning", label: "Morning", hours: "06:00 – 12:00", startHour: 6, what: "Stand-up & strategy" },
  { id: "afternoon", label: "Afternoon", hours: "12:00 – 17:00", startHour: 12, what: "Build & brand calls" },
  { id: "evening", label: "Evening", hours: "17:00 – 06:00", startHour: 17, what: "Review & brainstorm" },
];

/** Current wall-clock in India, independent of the visitor's timezone. */
function istNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour12: false,
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const h = Number(get("hour")) % 24, m = Number(get("minute")), s = Number(get("second"));
  return { h, m, s, label: `${get("day")} ${get("month").toUpperCase()} ${get("year")} · ${get("hour")}:${get("minute")}:${get("second")} IST` };
}

function slotFor(h: number): Slot {
  if (h >= 6 && h < 12) return "morning";
  if (h >= 12 && h < 17) return "afternoon";
  return "evening";
}

/** Seconds elapsed since the current slot started — everyone sees the same moment of the take. */
function secondsIntoSlot(slot: Slot, t: { h: number; m: number; s: number }) {
  const start = SLOTS.find((x) => x.id === slot)!.startHour;
  const hours = (t.h - start + 24) % 24;
  return hours * 3600 + t.m * 60 + t.s;
}

export function HqCam() {
  const [now, setNow] = useState<ReturnType<typeof istNow> | null>(null);
  useEffect(() => {
    const tick = () => setNow(istNow());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const slot = now ? slotFor(now.h) : null;

  return (
    <Reveal as="section" id="hq" className="screen relative mx-auto max-w-7xl px-4 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <Eyebrow tone="onair" className="flex items-center gap-2" >
            <span className="onair-dot h-2 w-2 rounded-full bg-onair" /> Right now at CreatorPay HQ
          </Eyebrow>
          <h2 data-reveal className="display t-section mt-4">
            Don&rsquo;t take our word for it. <em className="text-royal">Watch us build.</em>
          </h2>
          <p data-reveal className="mt-[clamp(1rem,2.6svh,1.75rem)] max-w-md font-serif text-[clamp(1.45rem,3.3svh,2.1rem)] font-normal leading-[1.2] text-ink">
            Anyone can say they&rsquo;re building. <em className="text-royal">We&rsquo;d rather you watch it happen</em> — every idea, every argument, every late-night fix.
          </p>
          <p data-reveal className="eyebrow mt-4 text-ink-3">No rewinds · No skips · Just the work</p>

          <ul data-reveal className="mt-[clamp(1rem,3svh,2rem)] space-y-2">
            {SLOTS.map((s) => {
              const active = s.id === slot;
              return (
                <li
                  key={s.id}
                  className={clsx(
                    "flex items-center justify-between rounded-2xl px-4 py-[clamp(0.45rem,1.3svh,0.75rem)] text-sm ring-1 transition",
                    active ? "bg-white ring-onair/40 shadow-sm" : "bg-transparent text-ink-3 ring-line",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span className={clsx("h-2 w-2 rounded-full", active ? "onair-dot bg-onair" : "bg-mist")} />
                    <span className={clsx("font-semibold", active && "text-ink")}>{s.label}</span>
                    <span className="hidden sm:inline lg:hidden xl:inline">· {s.what}</span>
                  </span>
                  <span className="shrink-0 whitespace-nowrap tabular-nums">{active ? "On air" : s.hours + " IST"}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div data-reveal>
          <CamFrame slot={slot} now={now} />
        </div>
      </div>
    </Reveal>
  );
}

function CamFrame({ slot, now }: { slot: Slot | null; now: ReturnType<typeof istNow> | null }) {
  const src = slot ? site.media.hqCam[slot] : "";

  return (
    <div className="rounded-[2rem] bg-white p-3 shadow-[0_40px_90px_-40px_rgba(17,2,2,0.35)] ring-1 ring-line">
      <div className="scanlines relative aspect-video overflow-hidden rounded-[1.5rem] bg-[#dfe5ea]">
        {src && slot && now ? <SyncedFeed key={slot} src={src} offset={secondsIntoSlot(slot, now)} /> : <WarmingUp />}

        {/* Overlay — CCTV chrome, kept light */}
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-4 font-mono text-[0.7rem] text-ink sm:text-xs">
          <div className="flex items-start justify-between gap-2">
            <span className="flex items-center gap-2 rounded-md bg-white/85 px-2.5 py-1.5 font-sans font-semibold tracking-wide shadow-sm">
              <span className="onair-dot h-2 w-2 rounded-full bg-onair" />
            </span>
            <span className="rounded-md bg-white/85 px-2.5 py-1.5 tabular-nums shadow-sm">{now?.label ?? "—"}</span>
          </div>
          <div className="flex items-end justify-end gap-2">
            <span className="rounded-md bg-white/85 px-2.5 py-1.5 font-sans shadow-sm">CreatorPay HQ</span>
          </div>
        </div>
        {/* Corner brackets */}
        {["left-3 top-3 border-l-2 border-t-2", "right-3 top-3 border-r-2 border-t-2", "left-3 bottom-3 border-l-2 border-b-2", "right-3 bottom-3 border-r-2 border-b-2"].map((c) => (
          <span key={c} className={clsx("pointer-events-none absolute z-10 h-6 w-6 border-ink/30", c)} />
        ))}
      </div>
    </div>
  );
}

/**
 * Plays the slot's take from the "current" second and refuses to be scrubbed, paused or skipped.
 * Native controls are hidden; seeking snaps back; pausing resumes (unless the tab is hidden).
 */
function SyncedFeed({ src, offset }: { src: string; offset: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const programmatic = useRef(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const start = performance.now();
    const target = () => {
      const d = v.duration || 1;
      return (offset + (performance.now() - start) / 1000) % d;
    };
    const jump = () => {
      programmatic.current = true;
      v.currentTime = target();
      v.play().catch(() => {});
    };
    const onSeeking = () => {
      if (programmatic.current) { programmatic.current = false; return; }
      jump();
    };
    const onPause = () => { if (!document.hidden && !v.ended) v.play().catch(() => {}); };
    const onVisible = () => { if (!document.hidden) jump(); };
    // Keep within 2s of the shared clock
    const drift = setInterval(() => { if (Math.abs(v.currentTime - target()) > 2) jump(); }, 5000);

    v.addEventListener("loadedmetadata", jump);
    v.addEventListener("seeking", onSeeking);
    v.addEventListener("pause", onPause);
    v.addEventListener("ended", jump);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearInterval(drift);
      v.removeEventListener("loadedmetadata", jump);
      v.removeEventListener("seeking", onSeeking);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("ended", jump);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [offset]);

  return (
    <>
      <video
        ref={ref}
        src={src}
        muted={muted}
        autoPlay
        playsInline
        preload="auto"
        disablePictureInPicture
        controlsList="nodownload noplaybackrate noremoteplayback"
        onContextMenu={(e) => e.preventDefault()}
        className="pointer-events-none h-full w-full object-cover saturate-[0.85]"
      />
      <button
        onClick={() => setMuted((m) => !m)}
        className="absolute bottom-14 right-4 z-20 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold shadow ring-1 ring-line"
      >
        {muted ? "Listen in" : "Mute"}
      </button>
    </>
  );
}

function WarmingUp() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-[#eef2f6] via-[#e2e8ee] to-[#d9e1e8]">
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_30%_40%,white,transparent_45%),radial-gradient(circle_at_75%_65%,#cfe9ff,transparent_40%)]" />
      <div className="relative text-center">
        <p className="display text-3xl sm:text-5xl">
          Camera <em>warming up.</em>
        </p>
        <p className="mt-3 text-sm text-ink-2">The first feed from HQ goes on air soon.</p>
      </div>
    </div>
  );
}
