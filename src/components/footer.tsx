import { nav, site } from "@/content/site";
import { SocialIcon } from "./brand-icons";

export function Footer() {
  return (
    <footer className="relative mx-auto max-w-7xl px-4 pb-[calc(6.5rem+env(safe-area-inset-bottom))] pt-6 lg:pb-10 sm:px-6">
      <div className="rounded-[2.25rem] bg-white p-6 ring-1 ring-line sm:p-12">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/media/brand/logo.png" alt="" className="h-12 w-12" />
              <span className="font-sans text-2xl font-bold tracking-tight">CreatorPay</span>
            </div>
            <p className="display mt-6 text-[clamp(2.75rem,13vw,3rem)] sm:text-6xl">
              Connect. Post. <em className="text-money">Earn.</em>
            </p>
          </div>
          <div className="grid gap-8 text-sm sm:grid-cols-3 sm:gap-10">
            <ul className="grid grid-cols-2 gap-x-6 sm:block sm:space-y-2">
              {nav.map((n) => (
                <li key={n.href}><a href={n.href} className="block py-2 text-ink-2 hover:text-ink sm:py-0">{n.label}</a></li>
              ))}
            </ul>
            <ul className="flex items-start gap-3 max-sm:border-t max-sm:border-line max-sm:pt-6">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} aria-label={s.label} className="block transition-transform duration-500 hover:-translate-y-1 hover:-rotate-6">
                    <SocialIcon name={s.icon} className="h-12 w-12 shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="space-y-2 text-ink-2 max-sm:flex max-sm:items-center max-sm:justify-between max-sm:gap-4 max-sm:space-y-0">
              <p>Launching {site.launchLabel}</p>
              <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="tap block whitespace-nowrap hover:text-ink max-sm:rounded-full max-sm:bg-royal-soft max-sm:px-4 max-sm:py-2.5 max-sm:font-semibold max-sm:text-royal">Book an investor call</a>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-2 border-t border-line pt-6 text-xs text-ink-3 sm:flex-row">
          <p>© 2026 CreatorPay. Made in India, for every Indian creator.</p>
        </div>
      </div>
    </footer>
  );
}
