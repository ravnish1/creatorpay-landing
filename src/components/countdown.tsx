"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { site } from "@/content/site";

type Parts = { d: number; h: number; m: number; s: number };

function partsUntil(target: number): Parts {
  const diff = Math.max(0, target - Date.now());
  return {
    d: Math.floor(diff / 86_400_000),
    h: Math.floor(diff / 3_600_000) % 24,
    m: Math.floor(diff / 60_000) % 60,
    s: Math.floor(diff / 1000) % 60,
  };
}

/** Live countdown to launch. Renders dashes until mounted to avoid hydration mismatch. */
export function useCountdown() {
  const [parts, setParts] = useState<Parts | null>(null);
  useEffect(() => {
    const target = new Date(site.launchAt).getTime();
    const tick = () => setParts(partsUntil(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return parts;
}

const pad = (n: number) => String(n).padStart(2, "0");

export function Countdown({ size = "lg", className }: { size?: "sm" | "lg"; className?: string }) {
  const p = useCountdown();
  const cells: [string, string][] = [
    [p ? String(p.d) : "—", "days"],
    [p ? pad(p.h) : "—", "hrs"],
    [p ? pad(p.m) : "—", "min"],
    [p ? pad(p.s) : "—", "sec"],
  ];
  if (size === "sm") {
    return (
      <div className={clsx("flex items-baseline gap-3 font-sans tabular-nums", className)} aria-label="Time until launch">
        {cells.map(([v, l]) => (
          <span key={l} className="flex items-baseline gap-1">
            <span className="text-xl font-semibold text-ink">{v}</span>
            <span className="text-[0.65rem] uppercase tracking-widest text-ink-3">{l}</span>
          </span>
        ))}
      </div>
    );
  }
  return (
    <div className={clsx("grid grid-cols-4 gap-2 sm:gap-4", className)} aria-label="Time until launch">
      {cells.map(([v, l]) => (
        <div key={l} className="liquid-glass rounded-3xl px-2 py-[clamp(0.8rem,2.6svh,1.6rem)] text-center sm:px-4">
          <div className="relative font-sans text-[clamp(2rem,min(6vw,7svh),3.75rem)] font-semibold tabular-nums tracking-tight text-ink">{v}</div>
          <div className="relative mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-ink-3">{l}</div>
        </div>
      ))}
    </div>
  );
}
