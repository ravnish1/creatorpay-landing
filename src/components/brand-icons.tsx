import clsx from "clsx";

/**
 * 3D-styled store & social icons — glossy tiles with depth, matching the
 * clay icons used across the CreatorPay app.
 */

function Gloss({ id }: { id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-gloss`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.65" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#000" stopOpacity="0.18" />
        </linearGradient>
      </defs>
    </>
  );
}

function Tile({ id, children, fill, className }: { id: string; children: React.ReactNode; fill: string; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={clsx("drop-shadow-[0_6px_10px_rgba(17,2,2,0.22)]", className)} aria-hidden>
      <Gloss id={id} />
      <rect x="2" y="3" width="60" height="60" rx="16" fill="#000" opacity="0.12" />
      <rect x="2" y="1" width="60" height="60" rx="16" fill={fill} />
      <rect x="2.5" y="1.5" width="59" height="59" rx="15.5" fill="none" stroke={`url(#${id}-rim)`} strokeOpacity="0.6" />
      {children}
      <path d="M6 18 Q6 5 18 5 H46 Q58 5 58 18 V24 Q32 34 6 24 Z" fill={`url(#${id}-gloss)`} />
    </svg>
  );
}

export function AppStoreIcon({ className }: { className?: string }) {
  return (
    <Tile id="as" className={className} fill="url(#as-bg)">
      <defs>
        <linearGradient id="as-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#21d0fc" />
          <stop offset="1" stopColor="#1868f2" />
        </linearGradient>
      </defs>
      <g stroke="#fff" strokeWidth="4.6" strokeLinecap="round" filter="drop-shadow(0 1.5px 0 rgba(0,40,120,.35))">
        <path d="M26.5 18 L40 43" />
        <path d="M37.5 18 L24 43" />
        <path d="M18.5 37 H45.5" />
        <path d="M21 47 L23 43" />
      </g>
    </Tile>
  );
}

export function PlayStoreIcon({ className }: { className?: string }) {
  return (
    <Tile id="ps" className={className} fill="url(#ps-bg)">
      <defs>
        <linearGradient id="ps-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e8edf3" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0 1.5px 1px rgba(17,2,2,.18))">
        <path d="M20 15.5 L36.2 31.5 L20 47.5 Q18 46.6 18 44.4 V18.6 Q18 16.4 20 15.5Z" fill="#00b4ff" />
        <path d="M20 15.5 Q21.6 14.8 23.4 15.8 L41.6 26.2 L36.2 31.5 Z" fill="#00d26a" />
        <path d="M41.6 26.2 L47.2 29.4 Q49.6 30.8 49.6 31.5 Q49.6 32.2 47.2 33.6 L41.6 36.8 L36.2 31.5 Z" fill="#ffc400" />
        <path d="M36.2 31.5 L41.6 36.8 L23.4 47.2 Q21.6 48.2 20 47.5 Z" fill="#ff3a44" />
      </g>
    </Tile>
  );
}

export function LinkedInIcon({ className }: { className?: string }) {
  return (
    <Tile id="li" className={className} fill="url(#li-bg)">
      <defs>
        <linearGradient id="li-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2e8fdc" />
          <stop offset="1" stopColor="#0a5fae" />
        </linearGradient>
      </defs>
      <g fill="#fff" filter="drop-shadow(0 1.5px 0 rgba(0,40,100,.35))">
        <circle cx="21" cy="19.5" r="4" />
        <rect x="17.4" y="26" width="7.2" height="22" rx="2" />
        <path d="M29 28 a2 2 0 0 1 2-2h3.4a2 2 0 0 1 2 2v1.6c1.4-2.2 3.8-4 7.4-4 5 0 7.4 3.4 7.4 9.2V46a2 2 0 0 1-2 2h-3.4a2 2 0 0 1-2-2V36.4c0-2.6-1-4.2-3.2-4.2s-3.6 1.6-3.6 4.4V46a2 2 0 0 1-2 2H31a2 2 0 0 1-2-2Z" />
      </g>
    </Tile>
  );
}

export function XIcon({ className }: { className?: string }) {
  return (
    <Tile id="xx" className={className} fill="url(#xx-bg)">
      <defs>
        <linearGradient id="xx-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dfe5ec" />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0 1.5px 0 rgba(255,255,255,.9))">
        <path d="M18 16 H28.5 L46 47 H35.5 Z" fill="#110202" />
        <path d="M44 16 L34.2 27.8 M19.8 47 L29.6 35.2" stroke="#110202" strokeWidth="3.4" strokeLinecap="round" />
      </g>
    </Tile>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  // The app's own 3D Instagram icon
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/media/icons/ig.webp" alt="" className={clsx("object-contain drop-shadow-[0_6px_10px_rgba(17,2,2,0.18)]", className)} />;
}

export function SocialIcon({ name, className }: { name: "instagram" | "linkedin" | "x"; className?: string }) {
  if (name === "instagram") return <InstagramIcon className={className} />;
  if (name === "linkedin") return <LinkedInIcon className={className} />;
  return <XIcon className={className} />;
}
