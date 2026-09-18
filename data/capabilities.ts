/**
 * CJ MUNI capability areas, split into the two things the business sells:
 *
 *   PRODUCTS — physical product lines manufactured, supplied and distributed.
 *   SERVICES — capability delivered on site or across the supply chain.
 *
 * This is the single source of truth for capability content. The landing-page
 * product/service sections, the /capabilities index and the individual
 * /capabilities/[slug] pages all read from here, so a capability can change
 * name, copy or photography in one place.
 *
 * Copy is limited to the approved high-level descriptions from the CJ MUNI
 * Corporate Brand Guidelines and the supplied business profile. Where the
 * source material is thin (quarry, civil, marine, sustainable development) the
 * copy is deliberately high-level and leaves room for future content.
 *
 * Images point at the shared photo library (public/images/library/). A slot
 * with no file yet renders the CJ MUNI image placeholder rather than breaking —
 * drop the file at the listed path and it appears automatically.
 */

export type CapabilityGroup = "product" | "service";

/** A named group of supplied products, listed on the capability detail page. */
export type CapabilityCatalogueGroup = {
  heading: string;
  items: string[];
};

export type Capability = {
  /** Number shown on the card — restarts at 01 within each group. */
  number: string;
  group: CapabilityGroup;
  title: string;
  slug: string;
  /** Short description used on the landing-page card. */
  description: string;
  /** Optional headline shown under the title on the detail page. */
  lead?: string;
  /** Longer lead paragraph for the dedicated service page. */
  overview: string;
  /** Supporting points — only included where the source material supports them. */
  points: string[];
  /**
   * Confirmed product lines, grouped by application. Rendered as a catalogue
   * block on the detail page where supplied — omit it and the block disappears.
   */
  catalogue?: CapabilityCatalogueGroup[];
  /**
   * A full catalogue that has outgrown the detail page and lives on its own
   * route — currently the Orica product catalogue behind Explosives
   * Manufacture & Supply. Rendered as a link block where present.
   */
  catalogueLink?: { href: string; label: string; blurb: string };
  image: string;
  imageAlt: string;
  /** True where the supplied profile only gives a high-level description. */
  highLevelOnly?: boolean;
};

/** Product lines — what CJ MUNI manufactures, supplies and distributes. */
export const PRODUCTS: Capability[] = [
  {
    number: "01",
    group: "product",
    title: "Explosives Manufacture & Supply",
    slug: "explosives-manufacture-supply",
    description:
      "Powering PNG mines with global-standard explosives technology.",
    lead: "Powering PNG's Mines with Global Standard Technologies.",
    overview:
      "As the trusted local partner, distributor and expert applicator for Orica Mining Services, CJ MUNI manufactures and supplies world-class blasting products, chemicals and application expertise directly to site.",
    points: [
      "Orica range of products",
      "Licensed explosives facilities",
      "Manufacture and bulk supply",
      "Field application capability",
    ],
    catalogueLink: {
      href: "/products",
      label: "Orica Products",
      blurb:
        "The full Orica range we distribute — AMEX™, PENTEX™, EXEL™ MS, ENDURADET™, EXEL™ CONNECTADET™, CORDTEX™ and SENATEL™ — with product imagery and the technical specifications from the Product Catalog 2026.",
    },
    image: "/images/library/explosives.jpg",
    imageAlt:
      "CJ MUNI crew charging a blast pattern beside an Orica Bulkmaster 7 delivery truck on a Papua New Guinea site at sunset",
  },
  {
    number: "02",
    group: "product",
    title: "Fertilizer & Reagents",
    slug: "fertilizer-reagents",
    description:
      "Fertilizer and agriculture inputs alongside reagents for mining and metals processing.",
    overview:
      "CJ MUNI supplies fertilizer and agriculture inputs alongside reagents for mining and metals processing, backed by technical product support.",
    points: [
      "UREA and agriculture inputs",
      "Xanthate, collectors and flocculants",
      "Water and wastewater treatment",
      "Technical support",
    ],
    catalogue: [
      {
        heading: "Agricultural",
        items: ["Urea", "Ammonium Nitrate — agriculture grade"],
      },
      {
        heading: "Reagents",
        items: ["Sodium Cyanide", "Caustic Soda", "Mining Acids"],
      },
      {
        heading: "Water Treatment",
        items: ["Chlorine", "Aluminium Sulphate", "Hydrated Lime"],
      },
    ],
    image: "/images/library/reagents-fertilizers.jpg",
    imageAlt:
      "Two CJ MUNI staff with tablets in a warehouse stacked with Orica urea, ammonium nitrate, flocculant and collector product",
  },
];

/** Services — capability delivered on site and across the supply chain. */
export const SERVICES: Capability[] = [
  {
    number: "01",
    group: "service",
    title: "Drill & Blast",
    slug: "drill-blast",
    description:
      "Drilling and blasting support for mining, quarries, exploration and pioneer-road applications.",
    overview:
      "CJ MUNI provides drilling and blasting support across mining, quarrying, exploration and pioneer-road applications.",
    points: [
      "Mining and quarry operations",
      "Exploration programmes",
      "Pioneer-road applications",
    ],
    image: "/images/library/drill-blast-services.jpg",
    imageAlt:
      "Two CJ MUNI crew in hi-vis at a charged blast pattern with a drill rig and explosives trucks behind them at sunset",
  },
  {
    number: "02",
    group: "service",
    title: "Quarry Services",
    slug: "quarry-services",
    description:
      "Quarry development, production drilling and blasting that keeps aggregate supply moving.",
    overview:
      "CJ MUNI supports quarry operations across Papua New Guinea with production drilling, blasting and the technical capability to keep aggregate supply moving. Detailed scope is developed with each client around site requirements.",
    points: [],
    image: "/images/library/quarry-services.jpg",
    imageAlt:
      "Two CJ MUNI crew at a charged quarry pattern with a drill rig, explosives trucks and quarry benches behind them at sunset",
    highLevelOnly: true,
  },
  {
    number: "03",
    group: "service",
    title: "Civil & Earth Moving",
    slug: "civil-earth-moving",
    description:
      "Civil works and earth moving supporting industrial and infrastructure projects.",
    overview:
      "CJ MUNI brings civil and earth-moving capability to industrial and infrastructure projects. Detailed scope is developed with each client around project requirements.",
    points: [],
    image: "/images/library/engineering-civil-services.jpg",
    imageAlt:
      "Two CJ MUNI civil crew with site drawings in front of a CJ MUNI excavator and tip truck on a PNG earthworks site",
    highLevelOnly: true,
  },
  {
    number: "04",
    group: "service",
    title: "Tug & Barge",
    slug: "tug-barge",
    description:
      "Marine transport and project support through tug and barge operations.",
    overview:
      "CJ MUNI supports projects with marine transport through tug and barge operations, coordinated with its wider supply-chain capability.",
    points: [],
    image: "/images/library/marine.jpg",
    imageAlt:
      "CJ MUNI marine crew on a wharf with a tug and loaded barge at a PNG port",
    highLevelOnly: true,
  },
  {
    number: "05",
    group: "service",
    title: "End-to-End Supply Chain",
    slug: "supply-chain",
    description:
      "Coordinated sourcing, logistics, storage, handling and delivery around customer requirements.",
    overview:
      "CJ MUNI coordinates sourcing, logistics, storage, handling and delivery around customer requirements — monitoring orders from manufacture through to delivery with tailored delivery schedules.",
    points: [
      "In-house logistics team",
      "Order monitoring from manufacture to delivery",
      "Tailored delivery schedules",
      "Safe and secure materials storage and handling",
    ],
    image: "/images/library/supply-chain-feature.jpg",
    imageAlt: "CJ MUNI logistics operations — from manufacture to delivery",
  },
  {
    number: "06",
    group: "service",
    title: "Sustainable Development Projects",
    slug: "sustainable-development",
    description:
      "Project development with a focus on responsible delivery and long-term value.",
    overview:
      "CJ MUNI approaches project development with a focus on responsible delivery and long-term value for clients and communities.",
    points: [],
    image: "/images/library/sustainability.jpg",
    imageAlt:
      "CJ MUNI team with plans beside a solar array and tree planting above a PNG coastline",
    highLevelOnly: true,
  },
];

/** Every capability, products first — used by the index page and sitemap. */
export const CAPABILITIES: Capability[] = [...PRODUCTS, ...SERVICES];

export function getCapability(slug: string): Capability | undefined {
  return CAPABILITIES.find((c) => c.slug === slug);
}
