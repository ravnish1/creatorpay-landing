import { Eyebrow, Reveal } from "./ui";

const FLOW = [
  { n: "01", t: "Enroll", d: "Emerging creators pay to join.", tag: "Engine 1 · course fees", c: "text-royal", ring: "ring-royal/30", bg: "bg-royal-soft" },
  { n: "02", t: "Learn", d: "Six commerce tracks — hooks to live selling.", tag: "Commerce-ready skills", c: "text-violet", ring: "ring-violet/30", bg: "bg-violet-soft" },
  { n: "03", t: "Graduate & earn", d: "Graduates sell on CreatorPay from day one.", tag: "Engine 2 · commissions", c: "text-money", ring: "ring-money/30", bg: "bg-money-soft" },
];

const TRACKS = ["Content", "Growth", "Commerce", "Selling", "Live", "Creator business"];

export function Academy() {
  return (
    <Reveal as="section" id="academy" className="screen relative mx-auto max-w-7xl px-4 sm:px-6">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <Eyebrow tone="violet">CreatorPay Academy</Eyebrow>
          <h2 data-reveal className="display t-section mt-4">
            Creators pay to learn. <em className="text-violet">Then they earn with us.</em>
          </h2>
          <p data-reveal className="mt-[clamp(0.9rem,2.4svh,1.5rem)] max-w-lg text-ink-2">
            Most platforms buy their creators. We grow ours — and get paid twice: once when they learn, again every time they sell.
          </p>

          <div className="mt-[clamp(1.25rem,3.5svh,2.5rem)] grid gap-3 sm:grid-cols-3">
            {FLOW.map((f) => (
              <div key={f.n} data-reveal className={`rounded-3xl bg-white p-[clamp(0.9rem,2.2svh,1.25rem)] ring-1 ${f.ring}`}>
                <span className="text-xs font-semibold text-ink-3">{f.n}</span>
                <p className={`display mt-1 text-3xl ${f.c}`}>{f.t}</p>
                <p className="mt-2 text-sm text-ink-2">{f.d}</p>
                <span className={`mt-4 inline-block rounded-full ${f.bg} px-3 py-1 text-[0.7rem] font-semibold ${f.c}`}>{f.tag}</span>
              </div>
            ))}
          </div>

          <div data-reveal className="mt-6 flex flex-wrap gap-2">
            {TRACKS.map((t) => (
              <span key={t} className="rounded-full bg-white px-3.5 py-1.5 text-xs font-medium text-ink-2 ring-1 ring-line">{t}</span>
            ))}
          </div>
        </div>

        {/* Mock Academy card — what a learner sees */}
        <div data-reveal className="relative mx-auto hidden w-full max-w-md md:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/icons/academy.webp" alt="" className="absolute -top-24 right-0 z-10 h-28 w-28 drop-shadow-2xl sm:-right-10 sm:-top-28 sm:h-36 sm:w-36" />
          <div className="rounded-[2.25rem] bg-white p-6 shadow-[0_40px_90px_-40px_rgba(123,92,240,0.55)] ring-1 ring-line">
            <p className="eyebrow text-violet">Academy · Track 03</p>
            <p className="display mt-2 text-4xl">Commerce</p>
            <p className="text-sm text-ink-3">Turn recommendations into revenue</p>

            <ul className="mt-6 space-y-3">
              {[
                ["Picking products your audience trusts", "12 min", 100],
                ["Hooks that make people click", "9 min", 100],
                ["Your first affiliate reel", "15 min", 60],
                ["Live assignment: sell 5 units", "Project", 0],
              ].map(([t, d, p]) => (
                <li key={t as string} className="rounded-2xl bg-canvas p-3.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{t}</span>
                    <span className="text-xs text-ink-3">{d}</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-mist/70">
                    <div className="h-full rounded-full bg-violet" style={{ width: `${p}%` }} />
                  </div>
                </li>
              ))}
            </ul>

          </div>
        </div>
      </div>
    </Reveal>
  );
}
