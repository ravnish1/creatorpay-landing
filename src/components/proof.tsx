import { Eyebrow, Reveal } from "./ui";

const STATS = [
  { icon: "trophy", n: "₹100 Cr+", l: "in brand business delivered over 10+ years at CollabX Entertainment", c: "text-money", bg: "bg-money-soft" },
  { icon: "handshake", n: "500+", l: "brands we already work with", c: "text-royal", bg: "bg-royal-soft" },
  { icon: "verified", n: "4,00,000+", l: "curated creators across categories", c: "text-violet", bg: "bg-violet-soft" },
  { icon: "academy", n: "Academy", l: "our own pipeline of new creators", c: "text-rose", bg: "bg-rose-soft" },
];

const BACKERS = [
  { k: "ashish", n: "Ashish Chanchlani", r: "Creator & actor" },
  { k: "sarthak", n: "Sarthak Sachdeva", r: "Content creator" },
  { k: "aditya", n: "Aditya Rikhari", r: "Singer-songwriter" },
  { k: "purav", n: "Purav Jha", r: "Creator & actor" },
];

export function Proof() {
  return (
    <Reveal as="section" id="proof" className="screen relative mx-auto max-w-7xl px-4 sm:px-6">
      <div className="max-w-3xl">
        <Eyebrow>Why us</Eyebrow>
        <h2 data-reveal className="display t-section mt-4">
          Others start from zero. <em className="text-royal">We start with the room already full.</em>
        </h2>
      </div>

      <div className="mt-[clamp(1.5rem,4svh,3rem)] grid grid-cols-2 gap-3 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.n} data-reveal className="flex items-center gap-4 rounded-[1.75rem] bg-white p-[clamp(0.9rem,2.2svh,1.5rem)] ring-1 ring-line max-sm:flex-col max-sm:items-start">
            <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-full ${s.bg}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/media/icons/${s.icon}.webp`} alt="" className="h-10 w-10 object-contain" />
            </div>
            <div>
              <p className={`font-sans text-2xl font-semibold tracking-tight sm:text-3xl ${s.c}`}>{s.n}</p>
              <p className="mt-0.5 text-xs text-ink-2 sm:text-sm">{s.l}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Brand wall marquee */}
      <div data-reveal className="mt-3 overflow-hidden rounded-[1.75rem] bg-white py-[clamp(0.9rem,2.4svh,1.5rem)] ring-1 ring-line">
        <p className="eyebrow px-6 text-ink-3">Brands we&rsquo;ve delivered for</p>
        <div className="relative mt-3 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <div className="marquee flex w-max">
            {[0, 1].map((i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src="/media/brand/brandwall.webp" alt={i ? "" : "Samsung, Coca-Cola, Intel, Amazon, Nykaa, Spotify, Netflix, Red Bull, Flipkart and more"} className="h-[clamp(7rem,18svh,11rem)] w-auto max-w-none px-6" />
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function Backers() {
  return (
    <Reveal as="section" id="backers" className="screen relative mx-auto max-w-7xl px-4 sm:px-6">
      <div className="grid gap-[clamp(1.5rem,5svh,3.5rem)] lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <Eyebrow tone="ink">Backed by creators who know the market</Eyebrow>
          <h2 data-reveal className="display t-section mt-4">
            The people we&rsquo;re building for <em className="text-royal">backed us first.</em>
          </h2>
          <p data-reveal className="mt-[clamp(0.9rem,2.4svh,1.5rem)] max-w-md text-ink-2">
            Our first investors have built audiences and businesses inside the creator economy. They know what&rsquo;s broken — and they bet on us to fix it.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {BACKERS.map((b) => (
            <div key={b.k} data-reveal>
            <figure className="group flex h-full items-center gap-4 rounded-[1.75rem] bg-white p-[clamp(0.8rem,2svh,1.25rem)] ring-1 ring-line transition hover:-translate-y-1 hover:shadow-lg max-sm:flex-col max-sm:text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/media/people/${b.k}.webp`} alt={b.n} className="h-[clamp(4rem,11svh,6.5rem)] w-[clamp(4rem,11svh,6.5rem)] shrink-0 rounded-full object-cover grayscale-[30%] transition group-hover:grayscale-0" />
              <figcaption>
                <p className="font-serif text-[clamp(1.15rem,2.8svh,1.6rem)] font-semibold leading-tight">{b.n}</p>
                <p className="text-xs text-ink-3">{b.r}</p>
              </figcaption>
            </figure>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
