"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { Phone } from "./phone";
import { Eyebrow } from "./ui";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STEPS = [
  { k: "Connect", title: "Connect your social media.", body: "Instagram, YouTube and Facebook in a tap. Link your bank once — that's setup done.", screen: "/media/screens/home.webp", notch: true, accent: "text-royal", icon: "/media/icons/ig.webp" },
  { k: "Discover", title: "Discover & tag products.", body: "Find products you'd love to create around — or tag them onto posts you've already made. Live commission up to 10%.", screen: "/media/screens/discover.webp", notch: true, accent: "text-rose", icon: "/media/icons/verified.webp" },
  { k: "Share", title: "Share it. We'll handle the DMs.", body: "Share the post with your audience and let the comments flow in — CreatorPay replies to every one with your link.", screen: "/media/screens/dm2_post.webp", notch: false, accent: "text-violet", icon: "/media/icons/autodm.webp" },
  { k: "Earn", title: "Watch every rupee land.", body: "Clicks, conversions, commissions and payouts — tracked live, paid to UPI or bank.", screen: "/media/screens/earnings.webp", notch: true, accent: "text-money", icon: "/media/icons/wallet.webp" },
];

export function Flow() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: `+=${STEPS.length * 85}%`,
          pin: ".flow-pin",
          scrub: true,
          onUpdate: (self) => setActive(Math.min(STEPS.length - 1, Math.floor(self.progress * STEPS.length))),
        });
      });
      gsap.from(".flow-head > *", { y: 40, opacity: 0, stagger: 0.08, duration: 1, ease: "expo.out", scrollTrigger: { trigger: root.current, start: "top 75%" } });
      return () => mm.revert();
    },
    { scope: root },
  );

  const prev = STEPS[(active + STEPS.length - 1) % STEPS.length];
  const next = STEPS[(active + 1) % STEPS.length];
  const cur = STEPS[active];

  return (
    <section id="product" ref={root} className="relative">
      {/* Desktop: pinned, three-phone stage */}
      <div className="flow-pin hidden h-screen overflow-hidden lg:block">
        <div className="mx-auto grid h-full max-w-7xl grid-cols-[0.9fr_1.1fr] items-center gap-8 px-6 pt-20">
          <div className="flow-head">
            <Eyebrow>The product · {String(active + 1).padStart(2, "0")} / 04</Eyebrow>
            <h2 className="display t-section mt-4">
              Connect. Post. <em className="text-money">Earn.</em>
            </h2>
            <ol className="mt-[clamp(1rem,3.5svh,2.5rem)] space-y-1">
              {STEPS.map((s, i) => (
                <li key={s.k} className={clsx("rounded-3xl px-5 py-[clamp(0.55rem,1.6svh,1rem)] transition-all duration-500", i === active ? "bg-white shadow-[0_20px_50px_-25px_rgba(17,2,2,0.3)] ring-1 ring-line" : "opacity-45")}>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold tabular-nums text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                    <span className={clsx("eyebrow", s.accent)}>{s.k}</span>
                  </div>
                  <p className="display mt-1 text-[clamp(1.4rem,3.4svh,1.9rem)]">{s.title}</p>
                  <div className={clsx("grid transition-all duration-500", i === active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                    <p className="overflow-hidden pt-1 text-sm leading-relaxed text-ink-2">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative flex h-full items-center justify-center">
            <div className="absolute inset-x-10 top-1/2 h-[70%] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,var(--color-sky-soft),transparent)]" />
            <div className="absolute left-0 top-1/2 w-[min(28%,calc((100svh-9rem)*0.34))] -translate-y-[42%] -rotate-[8deg] opacity-80 blur-[0.3px] transition-all duration-700" key={"p" + prev.k}>
              <Phone src={prev.screen} alt={prev.k} notch={prev.notch} />
            </div>
            <div className="absolute right-0 top-1/2 w-[min(28%,calc((100svh-9rem)*0.34))] -translate-y-[42%] rotate-[8deg] opacity-80 transition-all duration-700" key={"n" + next.k}>
              <Phone src={next.screen} alt={next.k} notch={next.notch} />
            </div>
            <div className="relative z-10 w-[min(40%,calc((100svh-9rem)*0.485))] transition-all duration-700" key={"c" + cur.k}>
              <div className="animate-[rise_0.7s_var(--ease-out-expo)]">
                <Phone src={cur.screen} alt={`CreatorPay — ${cur.k}`} notch={cur.notch} priority />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cur.icon} alt="" className="absolute -right-10 top-16 h-20 w-20 drop-shadow-2xl animate-[pop_0.8s_var(--ease-out-expo)]" />
            </div>
          </div>
        </div>
      </div>

      {/* Phones: swipeable step carousel */}
      <MobileCarousel />

      {/* Tablet: stacked */}
      <div className="mx-auto hidden max-w-2xl px-6 py-24 md:block lg:hidden">
        <div className="flow-head">
          <Eyebrow>The product</Eyebrow>
          <h2 className="display mt-4 text-6xl">
            Connect. Post. <em className="text-money">Earn.</em>
          </h2>
        </div>
        <div className="mt-12 space-y-16">
          {STEPS.map((s, i) => (
            <div key={s.k} className="grid grid-cols-[1fr_0.9fr] items-center gap-5">
              <div>
                <span className={clsx("eyebrow", s.accent)}>
                  {String(i + 1).padStart(2, "0")} · {s.k}
                </span>
                <p className="display mt-2 text-3xl">{s.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-2">{s.body}</p>
              </div>
              <Phone src={s.screen} alt={`CreatorPay — ${s.k}`} notch={s.notch} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Phones: one step per slide, native swipe with scroll-snap, dots + tabs stay in sync. */
function MobileCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    setActive(Math.max(0, Math.min(STEPS.length - 1, i)));
  };
  const go = (i: number) => {
    const el = track.current;
    el?.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="py-20 md:hidden">
      <div className="flow-head px-4">
        <Eyebrow>The product · {String(active + 1).padStart(2, "0")} / 04</Eyebrow>
        <h2 className="display mt-4 text-[clamp(2.5rem,12vw,3.5rem)]">
          Connect. Post. <em className="text-money">Earn.</em>
        </h2>
      </div>

      {/* Step tabs */}
      <div className="mt-6 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Product steps">
        {STEPS.map((s, i) => (
          <button
            key={s.k}
            role="tab"
            aria-selected={i === active}
            onClick={() => go(i)}
            className={clsx(
              "shrink-0 rounded-full px-4 py-2 text-xs font-semibold ring-1 transition",
              i === active ? "bg-white text-ink shadow-sm ring-line" : "text-ink-3 ring-transparent",
            )}
          >
            <span className={clsx("mr-1.5 tabular-nums", i === active && s.accent)}>{String(i + 1).padStart(2, "0")}</span>
            {s.k}
          </button>
        ))}
      </div>

      <div
        ref={track}
        onScroll={onScroll}
        className="mt-4 flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {STEPS.map((s, i) => (
          <div key={s.k} className="w-full shrink-0 snap-center px-4" aria-roledescription="slide" aria-label={`${i + 1} of ${STEPS.length}`}>
            <div className="relative overflow-hidden rounded-[2rem] bg-white px-5 pb-0 pt-6 ring-1 ring-line">
              <div className="absolute inset-x-6 bottom-0 h-2/3 rounded-full bg-[radial-gradient(closest-side,var(--color-sky-soft),transparent)]" aria-hidden />
              <span className={clsx("eyebrow relative", s.accent)}>
                {String(i + 1).padStart(2, "0")} · {s.k}
              </span>
              <p className="display relative mt-2 text-[clamp(1.75rem,8vw,2.25rem)]">{s.title}</p>
              <p className="relative mt-2 text-sm leading-relaxed text-ink-2">{s.body}</p>
              <div className="relative mx-auto mt-6 h-[clamp(15rem,52svh,24rem)] w-[min(68%,15rem)] overflow-hidden">
                <Phone src={s.screen} alt={`CreatorPay — ${s.k}`} notch={s.notch} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.icon} alt="" className="absolute -right-1 top-10 h-14 w-14 drop-shadow-xl" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="mt-5 flex justify-center gap-2">
        {STEPS.map((s, i) => (
          <button
            key={s.k}
            onClick={() => go(i)}
            aria-label={`Show step ${i + 1}: ${s.k}`}
            className={clsx("h-2 rounded-full transition-all duration-500", i === active ? "w-7 bg-royal" : "w-2 bg-mist")}
          />
        ))}
      </div>
    </div>
  );
}
