/**
 * Global site configuration: navigation, brand statements and verified
 * contact details taken from the CJ MUNI business profile.
 *
 * Keep contact details in one place so every section (nav, contact block,
 * footer, JSON-LD) stays consistent.
 */

export const BRAND = {
  name: "CJ MUNI",
  idea: "THE POWER OF PARTNERSHIP",
  promise: "CONNECTED CAPABILITY. RELIABLE DELIVERY.",
  positioning:
    "A Papua New Guinea-focused industrial partner delivering critical products, field services, engineering, marine logistics and end-to-end supply-chain support for demanding projects.",
  character: ["Strong", "Technical", "Reliable", "Connected", "Responsible"],
} as const;

export type NavLink = { label: string; href: string };

export const NAV_LINKS: NavLink[] = [
  { label: "Products", href: "/#products" },
  { label: "Services", href: "/#services" },
  { label: "Frontier Agri", href: "/#frontier-agri" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];

export const CONTACT = {
  email: "Kassman@icloud.com",
  phones: ["+675 7600 7962", "+675 7525 7882", "+675 7834 3770"],
  location:
    "Portion 2465, Konekaru, Papa Lealea Road, Central Province, Papua New Guinea",
  postal: "PO Box 687, Port Moresby 211, National Capital District",
} as const;

/**
 * Options for the enquiry form dropdown — mirrors the products and services in
 * data/capabilities.ts, plus the Frontier Agri arm.
 */
export const ENQUIRY_SERVICES: string[] = [
  "Explosives Manufacture & Supply",
  "Fertilizer & Reagents",
  "Drill & Blast",
  "Quarry Services",
  "Civil & Earth Moving",
  "Tug & Barge",
  "End-to-End Supply Chain",
  "Sustainable Development Projects",
  "Frontier Agri",
  "General Enquiry",
];
