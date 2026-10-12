"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { site } from "@/content/site";
import { Countdown } from "./countdown";
import { Arrow, CalendarIcon, GlassCta, PlayIcon } from "./ui";

gsap.registerPlugin(useGSAP);

type Act = "film" | "portrait";
const SEEN_KEY = "cp-film-seen";
const noopSubscribe = () => () => {};

/**
 * Two-act hero.
 * Act I  — the founders' film plays once (muted autoplay, tap for sound, skippable).
 * Act II — when it ends, the hero becomes the founders' portrait, the line and the countdown.
 * Returning visitors in the same session land straight on Act II, with "Replay the film".
 */
export function Hero() {
  // First act comes from this session's history; null during SSR so markup stays stable.
  const initial = useSyncExternalStore<Act | null>(
    noopSubscribe,
    () => (sessionStorage.getItem(SEEN_KEY) ? "portrait" : "film"),
    () => null,
  );
  const [chosen, setAct] = useState<Act | null>(null);
  const act = chosen ?? initial;

  const finishFilm = () => {
    sessionStorage.setItem(SEEN_KEY, "1");
    setAct("portrait");
  };

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-gradient-to-b from-sky-soft via-paper to-paper pb-6 pt-24 sm:pt-28">
      <SkyGlow />
      {act === "film" && <FilmAct onDone={finishFilm} />}
      {act === "portrait" && <PortraitAct onReplay={() => setAct("film")} />}
      {act === null && <div className="h-[80svh]" />}
    </section>
  );
}

function SkyGlow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-sky/20 blur-3xl" />
      <div className="absolute -right-32 top-24 h-[28rem] w-[28rem] rounded-full bg-lime/25 blur-3xl" />
    </div>
  );
}

/* ---------------------------------- ACT I ---------------------------------- */

function FilmAct({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const hasFilm = Boolean(site.media.foundersFilm);

  // Exit animation, then hand over to Act II
  const exit = () => {
    gsap.to(root.current, { opacity: 0, scale: 0.96, y: -30, duration: 0.8, ease: "expo.inOut", onComplete: onDone });
  };

  useGSAP(
    () => {
      gsap.from(".film-frame", { opacity: 0, y: 40, scale: 0.97, duration: 1.2, ease: "expo.out" });
      if (hasFilm) return;
      // Placeholder film: a timed title sequence that stands in for the founders' video
      const tl = gsap.timeline({ delay: 0.6, onUpdate: () => setProgress(tl.progress()), onComplete: exit });
      gsap.utils.toArray<HTMLElement>(".film-line").forEach((el) => {
        tl.fromTo(el, { opacity: 0, y: 30, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "expo.out" })
          .to(el, { opacity: 0, y: -20, filter: "blur(6px)", duration: 0.6, ease: "power2.in" }, "+=1.5");
      });
      tl.fromTo(".film-logo", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.9, ease: "back.out(1.6)" }).to({}, { duration: 1.2 });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 sm:px-6">
      <div className="mb-4 flex w-full max-w-[min(100%,calc((100svh-15rem)*16/9))] items-end justify-between gap-4">
        <div>
          <p className="display text-3xl sm:text-4xl">
            Before anything else, <em>meet us.</em>
          </p>
        </div>
        <GlassCta onClick={exit} className="shrink-0">Skip film</GlassCta>
      </div>

      <div className={clsx("film-frame relative aspect-video w-full max-w-[min(100%,calc((100svh-15rem)*16/9))] overflow-hidden rounded-[2rem] bg-white shadow-[0_50px_100px_-40px_rgba(53,107,255,0.45)] ring-1 ring-line", !hasFilm && "max-sm:aspect-[4/5] max-sm:max-h-[calc(100svh-14rem)]")}>
        {hasFilm ? (
          <>
            <video
              ref={video}
              src={site.media.foundersFilm}
              poster={site.media.foundersFilmPoster || undefined}
              className="h-full w-full object-cover"
              autoPlay
              muted={muted}
              playsInline
              onEnded={exit}
              onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime / (e.currentTarget.duration || 1))}
            />
            <button
              onClick={() => setMuted((m) => !m)}
              className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-ink shadow ring-1 ring-line backdrop-blur"
            >
              {muted ? "🔊 Tap for sound" : "🔇 Mute"}
            </button>
          </>
        ) : (
          <PlaceholderFilm />
        )}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-mist/60">
          <div className="h-full bg-royal transition-[width] duration-200" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </div>
  );
}

function PlaceholderFilm() {
  const lines = [
    <>Every day, India buys what <em>creators</em> recommend.</>,
    <>Most creators never see <em>a rupee</em> of it.</>,
    <>We&rsquo;ve spent a decade on the other side of those deals.</>,
    <>So we built the app that <span className="swipe not-italic">pays them.</span></>,
  ];
  return (
    <div className="relative grid h-full w-full place-items-center bg-gradient-to-br from-white via-sky-soft to-lime-soft">
      {lines.map((l, i) => (
        <p key={i} className="film-line display absolute max-w-4xl px-6 text-center text-[clamp(1.9rem,9vw,2.6rem)] opacity-0 sm:px-8 sm:text-6xl lg:text-7xl">
          {l}
        </p>
      ))}
      <div className="film-logo absolute flex items-center gap-3 opacity-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/brand/logo.png" alt="" className="h-16 w-16 sm:h-24 sm:w-24" />
        <span className="font-sans text-4xl font-bold tracking-tight sm:text-6xl">CreatorPay</span>
      </div>
      <span className="absolute right-4 top-4 rounded-full sm:right-5 sm:top-5 bg-white/80 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-ink-3 ring-1 ring-line">
        Founders&rsquo; film: placeholder
      </span>
    </div>
  );
}

/* ---------------------------------- ACT II --------------------------------- */

function PortraitAct({ onReplay }: { onReplay: () => void }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".p-frame", { opacity: 0, y: 60, scale: 0.94, duration: 1.4, stagger: 0.12 })
        .from(".p-word", { yPercent: 110, opacity: 0, duration: 1.1, stagger: 0.06 }, 0.15)
        .from(".p-fade", { opacity: 0, y: 24, duration: 1, stagger: 0.08 }, 0.5);

      // Cursor parallax on the portrait and floating icons
      const xTo = gsap.quickTo(".p-parallax", "x", { duration: 0.9, ease: "power3" });
      const yTo = gsap.quickTo(".p-parallax", "y", { duration: 0.9, ease: "power3" });
      const onMove = (e: PointerEvent) => {
        const r = root.current!.getBoundingClientRect();
        xTo(((e.clientX - r.left) / r.width - 0.5) * 18);
        yTo(((e.clientY - r.top) / r.height - 0.5) * 18);
      };
      root.current!.addEventListener("pointermove", onMove);
      return () => root.current?.removeEventListener("pointermove", onMove);
    },
    { scope: root },
  );

  const headline = ["Creators", "make", "culture."];

  return (
    <div ref={root} className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
      <div className="relative z-10">
        <h1 className="display t-hero">
          <span className="block overflow-hidden pb-1">
            {headline.map((w) => (
              <span key={w} className="p-word mr-[0.22em] inline-block">
                {w}
              </span>
            ))}
          </span>
          <span className="block overflow-hidden pb-2">
            <span className="p-word inline-block font-light italic text-royal">Now they get paid</span>{" "}
            <span className="p-word inline-block font-light italic text-royal">for it.</span>
          </span>
        </h1>

        <p className="p-fade mt-[clamp(1rem,2.6svh,1.75rem)] max-w-lg text-base leading-relaxed text-ink-2 sm:text-lg">
          One app to discover brands, create, share and earn, built by the team behind a decade of India&rsquo;s creator–brand deals.
        </p>

        {/* One question, two doors: every visitor picks their path here. */}
        <div className="mt-[clamp(1.5rem,4svh,2.5rem)] grid max-w-xl gap-3 sm:grid-cols-2">
          <IntentCta href="#reserve" who="I’m a creator" action="Reserve early access" primary />
          <IntentCta href={site.bookingUrl} who="I’m investing" action="Book a 15-min call" />
        </div>

        <div className="p-fade mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-ink-3">Launch in</span>
            <Countdown size="sm" />
          </div>
          <button onClick={onReplay} className="tap group inline-flex items-center gap-2 text-sm font-medium text-ink-2 transition-colors hover:text-royal">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-royal-soft text-royal transition-colors group-hover:bg-royal group-hover:text-white"><PlayIcon /></span>
            Replay the founders&rsquo; note
          </button>
        </div>
      </div>

      <div className="relative short-hide">
        <p className="p-fade display mx-auto mb-[clamp(1.5rem,4svh,2.75rem)] hidden max-w-[min(100%,30rem)] text-[clamp(1.6rem,min(2.5vw,4.4svh),2.5rem)] leading-[1.02] md:block">
          Winter is coming. <em className="text-tangerine">And we&rsquo;re bringing the fire.</em>
        </p>
        <FoundersPortrait />
      </div>
    </div>
  );
}

/** Hero path choice: who you are on top, what you get below, one arrow. Both doors carry equal weight. */
function IntentCta({ href, who, action, primary }: { href: string; who: string; action: string; primary?: boolean }) {
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className={clsx(
        "p-fade cta group flex items-center justify-between gap-4 rounded-[1.5rem] py-3 pl-5 pr-3 transition-shadow duration-300",
        primary
          ? "bg-gradient-to-b from-[#4b7cff] to-royal text-white shadow-[0_18px_40px_-16px_rgba(53,107,255,0.8),inset_0_1px_0_rgba(255,255,255,0.35)] hover:shadow-[0_22px_46px_-14px_rgba(53,107,255,0.95),inset_0_1px_0_rgba(255,255,255,0.35)]"
          : "liquid-glass text-ink",
      )}
    >
      <span className="relative z-[2] min-w-0">
        <span className={clsx("block text-xs font-medium", primary ? "text-white/75" : "text-ink-3")}>{who}</span>
        <span className="mt-0.5 block text-base font-semibold leading-tight">{action}</span>
      </span>
      <span className={clsx("cta-chip relative z-[2] grid h-11 w-11 shrink-0 place-items-center rounded-full", primary ? "bg-lime text-ink" : "bg-ink text-white")}>
        {primary ? <Arrow className="-rotate-45" /> : <CalendarIcon />}
      </span>
    </a>
  );
}

function FoundersPortrait() {
  const [a, b] = site.founders;
  const photo = site.media.foundersPortrait;
  return (
    <div className="relative mx-auto w-full max-w-[min(88%,20rem)] sm:max-w-[min(100%,26rem,calc((100svh-19rem)*0.62))] lg:max-w-[min(100%,calc((100svh-19rem)*0.62))]">
      <div className="p-parallax relative">
        {photo ? (
          <div className="p-frame relative aspect-[4/5] overflow-hidden rounded-[2.5rem] ring-1 ring-line sm:aspect-[5/5]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} alt={`${a.name} and ${b.name}, founders of CreatorPay`} className="h-full w-full object-cover" />
          </div>
        ) : (
          // Placeholder: two arched portrait frames facing each other (Harvey & Mike stance)
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            {[a, b].map((f, i) => (
              <div
                key={f.name}
                className={clsx(
                  "p-frame relative flex aspect-[3/5] flex-col items-center justify-end overflow-hidden rounded-t-full rounded-b-[2rem] pb-8 ring-1 ring-line",
                  i === 0 ? "bg-gradient-to-b from-[#cfdcff] via-royal-soft to-white" : "mt-10 bg-gradient-to-b from-[#d9f7a8] via-lime-soft to-white",
                )}
              >
                <span className={clsx("display text-[clamp(4.5rem,11svh,8.5rem)] leading-none", i === 0 ? "text-royal/45" : "text-money/45")}>
                  {f.name.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Name tags */}
        <NameTag className="p-fade absolute -left-2 bottom-16 sm:-left-6" name={a.name} role={a.role} />
        <NameTag className="p-fade absolute -right-2 bottom-4 sm:-right-4" name={b.name} role={b.role} />
      </div>

    </div>
  );
}

function NameTag({ name, role, className }: { name: string; role: string; className?: string }) {
  return (
    <div className={clsx("rounded-2xl bg-white/90 px-4 py-2.5 shadow-[0_12px_30px_-12px_rgba(17,2,2,0.25)] ring-1 ring-line backdrop-blur", className)}>
      <p className="font-serif text-lg font-semibold leading-tight">{name}</p>
      <p className="text-[0.7rem] font-medium text-ink-3">{role}</p>
    </div>
  );
}
