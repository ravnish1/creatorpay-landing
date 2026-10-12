"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Children with [data-reveal] rise + fade in as the block scrolls into view. */
export function Reveal({ children, className, as: Tag = "div", id }: { children: React.ReactNode; className?: string; as?: "div" | "section"; id?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const items = ref.current?.querySelectorAll("[data-reveal]");
      if (!items?.length) return;
      gsap.from(items, {
        y: 40,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: "top 78%" },
      });
    },
    { scope: ref },
  );
  return (
    <Tag ref={ref as React.Ref<HTMLDivElement>} className={className} id={id}>
      {children}
    </Tag>
  );
}

export function Eyebrow({ children, className, tone = "royal" }: { children: React.ReactNode; className?: string; tone?: "royal" | "ink" | "money" | "violet" | "onair" }) {
  const color = { royal: "text-royal", ink: "text-ink-2", money: "text-money", violet: "text-violet", onair: "text-onair" }[tone];
  return <p className={clsx("eyebrow", color, className)}>{children}</p>;
}

/** Gentle pull toward the cursor (desktop pointers only). */
function useMagnetic<T extends HTMLElement>(strength = 0.25) {
  const ref = useRef<T>(null);
  useGSAP(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => { xTo(0); yTo(0); };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
  }, []);
  return ref;
}

type CtaProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  /** Small element shown at the start (icon, avatars) — secondary CTAs */
  lead?: React.ReactNode;
  size?: "md" | "lg";
  /** Pull toward the cursor; turn off for wide, full-width buttons. */
  magnetic?: boolean;
};

/**
 * Primary CTA — royal pill, lime arrow chip that turns on hover, light sweep, magnetic.
 */
export function PrimaryCta({ href, children, className, onClick, type, disabled, size = "md", magnetic = true }: CtaProps) {
  const ref = useMagnetic<HTMLAnchorElement & HTMLButtonElement>(magnetic ? 0.25 : 0);
  const cls = clsx(
    "cta group inline-flex items-center gap-3 whitespace-nowrap rounded-full bg-gradient-to-b from-[#4b7cff] to-royal font-semibold text-white",
    "shadow-[0_14px_34px_-12px_rgba(53,107,255,0.75),inset_0_1px_0_rgba(255,255,255,0.35)] transition-shadow duration-300 hover:shadow-[0_18px_40px_-12px_rgba(53,107,255,0.9),inset_0_1px_0_rgba(255,255,255,0.35)] disabled:opacity-60",
    size === "lg" ? "py-2 pl-7 pr-2 text-base" : "py-1.5 pl-5 pr-1.5 text-sm",
    className,
  );
  const inner = (
    <>
      <span className="relative z-[2]">{children}</span>
      <span className={clsx("cta-chip relative z-[2] grid place-items-center rounded-full bg-lime text-ink", size === "lg" ? "h-11 w-11" : "h-9 w-9")}>
        <Arrow className="-rotate-45" />
      </span>
    </>
  );
  return href ? (
    <a ref={ref} href={href} className={cls} onClick={onClick}>{inner}</a>
  ) : (
    <button ref={ref} type={type ?? "button"} className={cls} onClick={onClick} disabled={disabled}>{inner}</button>
  );
}

/**
 * Secondary CTA — liquid-glass pill with an optional lead (icon / avatars).
 */
export function GlassCta({ href, children, className, onClick, type, lead, size = "md" }: CtaProps) {
  const ref = useMagnetic<HTMLAnchorElement & HTMLButtonElement>(0.18);
  const cls = clsx(
    "cta liquid-glass group inline-flex items-center gap-3 whitespace-nowrap rounded-full font-semibold text-ink transition-transform",
    size === "lg" ? "py-2 pl-2 pr-6 text-base" : "py-1.5 pl-1.5 pr-5 text-sm",
    !lead && (size === "lg" ? "pl-6" : "pl-5"),
    className,
  );
  const inner = (
    <>
      {lead && <span className="relative z-[2] flex items-center">{lead}</span>}
      <span className="relative z-[2]">{children}</span>
    </>
  );
  return href ? (
    <a ref={ref} href={href} className={cls} onClick={onClick}>{inner}</a>
  ) : (
    <button ref={ref} type={type ?? "button"} className={cls} onClick={onClick}>{inner}</button>
  );
}

/** Round icon disc used as a GlassCta lead. */
export function CtaIcon({ children, tone = "royal" }: { children: React.ReactNode; tone?: "royal" | "lime" }) {
  return (
    <span
      className={clsx(
        "grid h-9 w-9 place-items-center rounded-full transition-colors duration-300",
        tone === "royal" ? "bg-royal-soft text-royal group-hover:bg-royal group-hover:text-white" : "bg-lime text-ink",
      )}
    >
      {children}
    </span>
  );
}

/** Back-compat wrapper for simple buttons. */
export function Button({ variant = "primary", ...props }: CtaProps & { variant?: "primary" | "ghost" | "lime" }) {
  return variant === "primary" ? <PrimaryCta {...props} /> : <GlassCta {...props} />;
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={clsx("h-4 w-4", className)} aria-hidden>
      <path d="M4 10h11m0 0-4.5-4.5M15 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={clsx("h-4 w-4", className)} aria-hidden>
      <rect x="3" y="4.5" width="14" height="12" rx="3" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3 8.5h14M7 2.8v3.4M13 2.8v3.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={clsx("h-3.5 w-3.5", className)} aria-hidden>
      <path d="M6 4.2v11.6a.8.8 0 0 0 1.2.7l9.2-5.8a.8.8 0 0 0 0-1.4L7.2 3.5A.8.8 0 0 0 6 4.2Z" fill="currentColor" />
    </svg>
  );
}
