/**
 * Single source of truth for copy, links and media.
 * Swap placeholders here — no component changes needed.
 */

/** HQ cam feed (same take for every slot until separate ones are shot). */
const hqOffice = "/media/video/vidssave.com%204K%20Camera%20Video%20--%20%20office%20720P.mp4";

export const site = {
  name: "CreatorPay",
  tagline: "Connect. Post. Earn.",
  description:
    "CreatorPay is the creator commerce app for India. Discover brands, create, share and get paid in one place. Launching 31 January 2027.",

  /** Countdown target — App Store & Play Store launch (IST). */
  launchAt: "2027-01-31T00:00:00+05:30",
  launchLabel: "31.01.2027",

  /** Media. Leave a value empty ("") to show the designed placeholder. */
  media: {
    /** Act I of the hero — founders' film (mp4/webm, ideally < 25 MB, 16:9). */
    foundersFilm: "",
    foundersFilmPoster: "",
    /** Act II of the hero — founders standing face to face, arms folded. */
    foundersPortrait: "",
    /** HQ cam — one long take per part of the day (10–20 min each). */
    hqCam: {
      morning: hqOffice,
      afternoon: hqOffice,
      evening: hqOffice,
    },
  },

  /** Google Calendar appointment schedule (Booking page → "Share" → embed / link). */
  calendarUrl: "",

  /** Investor call booking page — the "Request a call" CTA opens this. */
  bookingUrl: "https://cal.com/ravnish-kumar-te7xrd/15min",

  founders: [
    { name: "Ankit Madaan", role: "Founder & CEO", note: "A decade of creator–brand deals at CollabX Entertainment" },
    { name: "Ravnish Kumar", role: "Co-founder & CTO", note: "Builds products 0 → 1. Built the CreatorPay app end to end" },
  ],

  raise: {
    round: "Pre-seed",
    amount: "₹5 Cr",
  },

  socials: [
    { label: "Instagram", href: "#", icon: "instagram" },
    { label: "LinkedIn", href: "#", icon: "linkedin" },
    { label: "X", href: "#", icon: "x" },
  ],
} as const;

/** Nav tabs — `section` is the element id watched for the active tab. */
export const nav = [
  { label: "Product", href: "#product", section: "product", icon: "/media/icons/autodm.webp" },
  { label: "Academy", href: "#academy", section: "academy", icon: "/media/icons/academy.webp" },
  { label: "Why us", href: "#proof", section: "proof", icon: "/media/icons/trophy.webp" },
  { label: "HQ cam", href: "#hq", section: "hq", icon: "/media/icons/yt.webp" },
  { label: "Investors", href: "#investors", section: "investors", icon: "/media/icons/handshake.webp" },
] as const;
