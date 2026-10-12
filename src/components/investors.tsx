import { site } from "@/content/site";
import { CalendarIcon, PrimaryCta, Reveal } from "./ui";

export function Investors() {
  const { raise, calendarUrl, bookingUrl } = site;

  return (
    <Reveal as="section" id="investors" className="screen relative mx-auto max-w-7xl px-4 sm:px-6">
      <div className="grid w-full gap-[clamp(1.5rem,5svh,3rem)] lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <h2 data-reveal className="display t-section">
            Investment purpose? <em className="text-royal">Let&rsquo;s talk.</em>
          </h2>
          <p data-reveal className="mt-[clamp(0.9rem,2.4svh,1.5rem)] max-w-md text-lg text-ink-2">
            Get on a quick call with us, and we&rsquo;ll take the conversation further from there.
          </p>

          <dl data-reveal className="mt-[clamp(1.25rem,3.5svh,2.5rem)] grid max-w-md grid-cols-2 gap-3">
            {[
              ["Round", raise.round],
              ["Raising", raise.amount],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl bg-white p-4 ring-1 ring-line">
                <dt className="text-[0.65rem] font-semibold uppercase tracking-widest text-ink-3">{k}</dt>
                <dd className="mt-1 font-sans text-xl font-semibold text-ink">{v}</dd>
              </div>
            ))}
          </dl>

          <p data-reveal className="mt-[clamp(1.25rem,4svh,2.5rem)] max-w-md max-md:hidden font-serif text-[clamp(1.35rem,3svh,1.75rem)] italic leading-snug text-ink">
            If CreatorPay resonates with you, we&rsquo;d be honoured to build it together.
          </p>
          <p data-reveal className="mt-3 text-sm text-ink-2 max-md:hidden">Ankit & Ravnish</p>
        </div>

        <div data-reveal className="rounded-[2rem] bg-white p-3 shadow-[0_40px_90px_-40px_rgba(17,2,2,0.3)] ring-1 ring-line">
          {calendarUrl ? (
            <iframe src={calendarUrl} title="Book a call with the CreatorPay founders" className="h-[min(640px,calc(100svh-9rem))] w-full rounded-[1.5rem]" loading="lazy" />
          ) : (
            <div className="grid place-items-center max-md:py-10 md:h-[min(560px,calc(100svh-9rem))] md:min-h-[22rem] rounded-[1.5rem] bg-gradient-to-br from-royal-soft via-white to-lime-soft p-8 text-center">
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/media/icons/handshake.webp" alt="" className="mx-auto h-[clamp(4rem,10svh,6rem)] w-auto" />
                <p className="display mt-6 text-4xl">Pick a time that suits you.</p>
                <p className="mx-auto mt-3 max-w-sm text-sm text-ink-2">
                  Book a 15-minute intro call with the founders. Choose a slot on our calendar.
                </p>
                <PrimaryCta href={bookingUrl} size="lg" className="mt-8">
                  <span className="inline-flex items-center gap-2"><CalendarIcon /> Request a call</span>
                </PrimaryCta>
              </div>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}
