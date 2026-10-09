import { nav, site } from "@/content/site";
import { SocialIcon } from "./brand-icons";

export function Footer() {
  return (
    <footer className="relative mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6">
      <div className="rounded-[2.25rem] bg-white p-8 ring-1 ring-line sm:p-12">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/media/brand/logo.png" alt="" className="h-12 w-12" />
              <span className="font-sans text-2xl font-bold tracking-tight">CreatorPay</span>
            </div>
            <p className="display mt-6 text-5xl sm:text-6xl">
              Connect. Post. <em className="text-money">Earn.</em>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
            <ul className="space-y-2">
              {nav.map((n) => (
                <li key={n.href}><a href={n.href} className="text-ink-2 hover:text-ink">{n.label}</a></li>
              ))}
            </ul>
            <ul className="flex items-start gap-3">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} aria-label={s.label} className="block transition-transform duration-500 hover:-translate-y-1 hover:-rotate-6">
                    <SocialIcon name={s.icon} className="h-12 w-12" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="space-y-2 text-ink-2">
              <p>Launching {site.launchLabel}</p>
              <a href={`mailto:${site.contactEmail}`} className="block hover:text-ink">{site.contactEmail}</a>
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
