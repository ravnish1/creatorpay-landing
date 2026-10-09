"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Phone } from "./phone";
import { Eyebrow, Reveal } from "./ui";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Comment → DM → Sale, played as a looping micro-story while in view. */
export function AutoDm() {
  const stage = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.set(".dm-step", { opacity: 0 });
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2, paused: true, defaults: { ease: "expo.out", duration: 0.8 } });
      tl.set(".dm-step", { opacity: 0, y: 24, scale: 0.96 })
        .to(".dm-1", { opacity: 1, y: 0, scale: 1 })
        .to(".dm-typing", { opacity: 1, y: 0, scale: 1, duration: 0.4 }, "+=0.5")
        .to(".dm-typing", { opacity: 0, duration: 0.2 }, "+=0.9")
        .to(".dm-2", { opacity: 1, y: 0, scale: 1 })
        .to(".dm-3", { opacity: 1, y: 0, scale: 1 }, "+=0.9")
        .to(".dm-4", { opacity: 1, y: 0, scale: 1, ease: "back.out(1.8)" }, "+=0.7")
        .to({}, { duration: 2.2 })
        .to(".dm-step", { opacity: 0, y: -12, duration: 0.5, stagger: 0.04 });
      ScrollTrigger.create({ trigger: stage.current, start: "top 80%", end: "bottom 10%", onToggle: (s) => (s.isActive ? tl.play() : tl.pause()) });
    },
    { scope: stage },
  );

  return (
    <Reveal as="section" className="screen relative overflow-hidden bg-gradient-to-b from-paper via-violet-soft/60 to-paper">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <Eyebrow tone="violet">Auto DM</Eyebrow>
          <h2 data-reveal className="display t-section mt-4">
            Comment. DM. Sale. <em className="text-violet">On autopilot.</em>
          </h2>
          <p data-reveal className="mt-[clamp(0.9rem,2.4svh,1.5rem)] max-w-md text-ink-2">
            Followers comment a keyword. CreatorPay replies in their DMs with the product and your link — instantly, every time, even while you sleep.
          </p>

          <div ref={stage} data-reveal className="relative mt-[clamp(1.25rem,3.5svh,2.5rem)] h-[clamp(17rem,40svh,22rem)] max-w-md rounded-[2rem] bg-white p-5 shadow-[0_30px_80px_-40px_rgba(123,92,240,0.5)] ring-1 ring-line">
            <div className="dm-step dm-1 flex items-start gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-rose-soft text-xs font-bold text-rose">PS</span>
              <div className="rounded-2xl rounded-tl-sm bg-canvas px-4 py-2.5 text-sm">
                <span className="font-semibold">priya.styles</span> where&rsquo;s this sweatshirt from?? <b>#link</b> 😍
              </div>
            </div>
            <div className="dm-step dm-typing ml-12 mt-3 inline-flex gap-1 rounded-full bg-canvas px-3 py-2">
              {[0, 1, 2].map((i) => <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-3" style={{ animationDelay: `${i * 0.12}s` }} />)}
            </div>
            <div className="dm-step dm-2 ml-auto mt-3 w-fit max-w-[80%] rounded-2xl rounded-tr-sm bg-royal px-4 py-2.5 text-sm text-white">
              Hey Priya! Here&rsquo;s the exact one 👇
            </div>
            <div className="dm-step dm-3 ml-auto mt-2 flex w-[78%] items-center gap-3 rounded-2xl bg-white p-2.5 ring-1 ring-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/media/icons/sneaker.webp" alt="" className="h-14 w-14 rounded-xl object-cover" />
              <div className="text-xs">
                <p className="font-semibold">Oversized sweatshirt</p>
                <p className="text-ink-3">via CreatorPay</p>
                <p className="mt-1 font-semibold text-royal">Shop now →</p>
              </div>
            </div>
            <div className="dm-step dm-4 absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl bg-money-soft px-4 py-3 ring-1 ring-money/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/media/icons/party.webp" alt="" className="h-9 w-9" />
              <div>
                <p className="text-sm font-semibold text-money">+ ₹56.10 commission</p>
                <p className="text-xs text-ink-2">Order placed · tracking to payout</p>
              </div>
            </div>
          </div>
        </div>

        <div data-reveal className="relative mx-auto hidden w-full max-w-[min(32rem,calc((100svh-10rem)*0.92))] items-center justify-center gap-4 sm:flex">
          <div className="w-[46%] -rotate-3 translate-y-6">
            <Phone src="/media/screens/dm3_keywords.webp" alt="Auto DM — set trigger keywords" notch={false} />
          </div>
          <div className="w-[46%] rotate-3">
            <Phone src="/media/screens/dm1_connect.webp" alt="Auto DM — connect Instagram" notch={false} />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
