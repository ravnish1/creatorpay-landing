"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import clsx from "clsx";
import { nav } from "@/content/site";

/**
 * Liquid-glass nav. Myntra-style icon tabs; the active section gets a white tab
 * that rises out of the bar and slides between items as you scroll.
 */
export function Nav() {
  const [active, setActive] = useState<string | null>(null);
  const [tab, setTab] = useState<{ left: number; width: number } | null>(null);
  const items = useRef<Record<string, HTMLAnchorElement | null>>({});

  // Real refraction only where SVG backdrop filters are supported (Chromium).
  useEffect(() => {
    const ua = (navigator as Navigator & { userAgentData?: { brands: { brand: string }[] } }).userAgentData;
    if (ua?.brands.some((b) => /Chromium/i.test(b.brand))) document.documentElement.classList.add("lg-refract");
  }, []);

  // Scroll-spy: whichever section crosses the middle of the screen is active.
  useEffect(() => {
    const ids = [...nav.map((n) => n.section), "top", "reserve", "backers"];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const id = e.target.id;
          const match = nav.find((n) => n.section === id) ?? (id === "backers" ? nav.find((n) => n.section === "proof") : undefined);
          setActive(match ? match.section : null);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useLayoutEffect(() => {
    const el = active ? items.current[active] : null;
    // measure the <li> (positioned inside the relative <ul>), not the link inside it
    const li = el?.parentElement;
    setTab(li ? { left: li.offsetLeft, width: li.offsetWidth } : null);
  }, [active]);

  return (
    <>
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <RefractionFilter />
      <nav className="liquid-glass nav-glass mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-[1.75rem] py-1.5 pl-2 pr-1.5 sm:pl-3" aria-label="Main">
        <a href="#top" className="flex shrink-0 items-center gap-2 rounded-full py-1 pl-1 pr-3" aria-label="CreatorPay home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/brand/logo.png" alt="" className="h-8 w-8" />
          <span className="font-sans text-[1.02rem] font-bold tracking-tight">CreatorPay</span>
        </a>

        {/* Tabs */}
        <ul className="relative -my-1.5 hidden items-end self-stretch lg:flex">
          <span
            aria-hidden
            className="nav-tab top-1.5"
            style={{ left: tab?.left ?? 0, width: tab?.width ?? 0, opacity: tab ? 1 : 0 }}
          />
          {nav.map((n) => {
            const on = active === n.section;
            return (
              <li key={n.href} className="relative">
                <a
                  ref={(el) => { items.current[n.section] = el; }}
                  href={n.href}
                  className={clsx("flex flex-col items-center gap-0.5 px-4 pb-1.5 pt-1.5 text-[0.72rem] font-semibold transition-colors", on ? "text-royal" : "text-ink-2 hover:text-ink")}
                  aria-current={on ? "true" : undefined}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={n.icon} alt="" className={clsx("h-7 w-7 object-contain transition-transform duration-500", on ? "-translate-y-0.5 scale-110" : "opacity-85")} />
                  {n.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex shrink-0 items-center gap-1.5">
          <a
            href="#reserve"
            className="cta group inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#4b7cff] to-royal py-1.5 pl-4 pr-1.5 text-xs font-semibold text-white shadow-[0_10px_24px_-10px_rgba(53,107,255,0.8),inset_0_1px_0_rgba(255,255,255,0.35)] sm:text-sm"
          >
            <span className="relative z-[2] sm:hidden">Reserve</span>
            <span className="relative z-[2] hidden sm:inline">Reserve early access</span>
            <span className="cta-chip relative z-[2] grid h-7 w-7 place-items-center rounded-full bg-lime text-ink">
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 -rotate-45" fill="none" aria-hidden><path d="M4 10h11m0 0-4.5-4.5M15 10l-4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </a>
        </div>
      </nav>
    </header>

      <BottomBar active={active} />
    </>
  );
}

/**
 * Phones & tablets: the same tabs as an app-style bottom bar, in thumb reach.
 * A white pill slides under the active section; it tucks away while a form field has focus (keyboard up).
 */
function BottomBar({ active }: { active: string | null }) {
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    const isField = (t: EventTarget | null) => t instanceof HTMLElement && t.matches("input, textarea, select");
    const on = (e: FocusEvent) => isField(e.target) && setTyping(true);
    const off = (e: FocusEvent) => isField(e.target) && setTyping(false);
    document.addEventListener("focusin", on);
    document.addEventListener("focusout", off);
    return () => { document.removeEventListener("focusin", on); document.removeEventListener("focusout", off); };
  }, []);
  const i = nav.findIndex((n) => n.section === active);

  return (
    <nav
      aria-label="Sections"
      className={clsx(
        "fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 mx-auto max-w-md transition-[transform,opacity] duration-500 ease-[var(--ease-out-expo)] lg:hidden",
        typing ? "pointer-events-none translate-y-[150%] opacity-0" : "translate-y-0 opacity-100",
      )}
    >
      <ul className="liquid-glass nav-glass relative grid grid-cols-5 rounded-[1.75rem] p-1.5">
        <span
          aria-hidden
          className="absolute inset-y-1.5 left-1.5 w-[calc((100%-0.75rem)/5)] rounded-[1.35rem] bg-white shadow-[0_10px_24px_-12px_rgba(53,107,255,0.6),inset_0_1px_0_#fff] transition-[transform,opacity] duration-500 ease-[var(--ease-out-expo)]"
          style={{ transform: `translateX(${Math.max(i, 0) * 100}%)`, opacity: i < 0 ? 0 : 1 }}
        />
        {nav.map((n) => {
          const on = active === n.section;
          return (
            <li key={n.href} className="relative">
              <a
                href={n.href}
                aria-current={on ? "true" : undefined}
                className={clsx("tap flex flex-col items-center gap-0.5 rounded-[1.35rem] px-1 pb-1.5 pt-2 text-[0.65rem] font-semibold transition-colors", on ? "text-royal" : "text-ink-2")}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={n.icon} alt="" className={clsx("h-7 w-7 object-contain transition-transform duration-500 ease-[var(--ease-out-expo)]", on ? "-translate-y-0.5 scale-110" : "scale-95 opacity-80")} />
                <span className="truncate">{n.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** SVG displacement used by `.liquid-glass` in Chromium for edge refraction. */
function RefractionFilter() {
  return (
    <svg aria-hidden width="0" height="0" className="absolute">
      <filter id="cp-liquid" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="7" result="noise" />
        <feGaussianBlur in="noise" stdDeviation="2" result="soft" />
        <feDisplacementMap in="SourceGraphic" in2="soft" scale="28" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}
