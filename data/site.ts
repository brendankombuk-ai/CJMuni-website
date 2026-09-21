/**
 * Global site configuration: navigation, brand statements and verified
 * contact details taken from the CJ MUNI business profile.
 *
 * Keep contact details in one place so every section (nav, contact block,
 * footer, JSON-LD) stays consistent.
 */

/**
 * The canonical production origin. Used for metadataBase, the sitemap and
 * robots.txt, so a domain change happens here and nowhere else.
 */
export const SITE_URL = "https://cjmuni.com";

export const BRAND = {
  name: "CJ MUNI",
  idea: "THE POWER OF PARTNERSHIP",
  promise: "CONNECTED CAPABILITY. RELIABLE DELIVERY.",
  positioning:
    "A Papua New Guinea-focused industrial partner delivering critical products, field services, engineering, marine logistics and end-to-end supply-chain support for demanding projects.",
  character: ["Strong", "Technical", "Reliable", "Connected", "Responsible"],
} as const;

export type NavLink = { label: string; href: string };

/**
 * Primary navigation. Every entry is a real page — no in-page anchors — so a
 * link always takes you somewhere with its own URL, title and back button.
 */
export const NAV_LINKS: NavLink[] = [
  { label: "Products & Services", href: "/capabilities" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export const CONTACT = {
  email: "info@cjmuni.com",
  phones: ["+675 7588 8314"],
  location:
    "Portion 2465, Konekaru, Papa Lealea Road, Central Province, Papua New Guinea",
  postal: "PO Box 687, Port Moresby 211, National Capital District",
} as const;

/**
 * Options for the enquiry form dropdown — mirrors the products and services in
 * data/capabilities.ts.
 */
export const ENQUIRY_SERVICES: string[] = [
  "Explosives Manufacture & Supply",
  "Fertilizer & Reagents",
  "Drill & Blast",
  "Quarry Services",
  "Tug & Barge",
  "End-to-End Supply Chain",
  "Sustainable Development Projects",
  "General Enquiry",
];
