/**
 * The CJ MUNI / Orica Product Catalog 2026, as structured data.
 *
 * Every name, category, description and specification value below is taken
 * from the supplied catalogue PDF — including its "Technical Specification –
 * Typical" framing. Nothing here is estimated, rounded, expanded or inferred:
 * if the catalogue does not state it, it is not on the page. Short
 * descriptions are restatements of the catalogue's own category and
 * specification wording so the page reads as prose without adding claims.
 *
 * Product photography was extracted from the same PDF. See
 * public/images/products/README.md for the provenance of each file.
 *
 * The /products page, its in-page navigation and its range summary all read
 * from this file, so a catalogue revision is a data change only.
 */

export type ProductImage = {
  src: string;
  alt: string;
  /** Intrinsic pixel size of the extracted asset — never render above it. */
  width: number;
  height: number;
  /** Short label shown under the image and in the lightbox. */
  caption: string;
};

/** One row of a specification table: a parameter and one value per column. */
export type SpecRow = {
  parameter: string;
  values: string[];
};

export type ProductRange = {
  /** Anchor id, used by the in-page navigation. */
  id: string;
  /** Catalogue position, e.g. "01". */
  number: string;
  name: string;
  /** The catalogue's descriptor for the range, e.g. "Bulk Explosives". */
  descriptor: string;
  /** The catalogue's "Product Category" value. */
  category: string;
  description: string;
  /** Compact label for the sticky product navigation. */
  navLabel: string;
  /**
   * Specification column headings. A single "Specification" column is the
   * catalogue's normal form; AMEX™ is the one range with a column per product.
   */
  specColumns: string[];
  specs: SpecRow[];
  /** Footnote for asterisked parameters. */
  specNote?: string;
  images: ProductImage[];
};

/** Catalogue cover copy — the introduction on page 1. */
export const CATALOGUE_INTRO =
  "CJ MUNI Limited is the licensed distributing agent of Orica products in PNG. Orica is a global leader in commercial explosives and blasting systems, supplying mining, quarrying, construction, and civil infrastructure projects worldwide. Orica's product portfolio is engineered to deliver safety, reliability, productivity, and precision blast outcomes.";

/** The image that opens the page — the bulk delivery photograph from page 1. */
export const CATALOGUE_HERO_IMAGE: ProductImage = {
  src: "/images/products/amex-bulk-delivery-truck.jpg",
  alt: "Crew in hi-vis and hard hats working at the rear of an Orica bulk explosives delivery truck on a red-earth mine bench",
  width: 500,
  height: 360,
  caption: "Bulk explosives delivery on site",
};

export const SPEC_HEADING = "Technical Specification – Typical";

export const PRODUCT_RANGES: ProductRange[] = [
  {
    id: "amex",
    number: "01",
    name: "AMEX™ Range",
    descriptor: "Bulk Explosives",
    category: "Bulk blasting agents",
    navLabel: "AMEX™",
    description:
      "Bulk blasting agents in three forms: prilled ANFO, ANFO blended with emulsion, and pumpable emulsion. Between them the range covers dry, damp and wet holes, loaded pneumatically, by gravity or pumped.",
    specColumns: ["AMEX™ ANFO", "AMEX™ Heavy ANFO", "AMEX™ Emulsion Blends"],
    specs: [
      {
        parameter: "Form",
        values: ["Prilled ANFO", "ANFO + emulsion", "Pumpable emulsion"],
      },
      {
        parameter: "Density (g/cc)",
        values: ["~0.80–0.85", "~0.90–1.10", "~1.10–1.30"],
      },
      {
        parameter: "Water Resistance",
        values: ["Low", "Moderate", "High"],
      },
      {
        parameter: "Detonation Velocity (m/s)*",
        values: ["3,200–4,000", "4,000–4,800", "4,500–5,500"],
      },
      {
        parameter: "Loading Method",
        values: ["Pneumatic / gravity", "Pumped", "Pumped"],
      },
      {
        parameter: "Hole Conditions",
        values: ["Dry", "Damp", "Wet / dry"],
      },
    ],
    specNote:
      "* Values are typical, as published in the CJ MUNI / Orica Product Catalog 2026.",
    images: [
      {
        src: "/images/products/amex-anfo-bag.jpg",
        alt: "A white Orica bulk explosive bag labelled Exan Explosive, carrying UN 0331 blasting agent and 1.5D class markings",
        width: 202,
        height: 401,
        caption: "Bagged bulk blasting agent",
      },
      {
        src: "/images/products/amex-explosive-bag.jpg",
        alt: "A sealed pink Amex explosive bag with class 1 explosive hazard labelling",
        width: 240,
        height: 130,
        caption: "Amex™ explosive bag",
      },
    ],
  },
  {
    id: "pentex",
    number: "02",
    name: "PENTEX™ Booster Range",
    descriptor: "Cast Boosters",
    category: "Cast boosters",
    navLabel: "PENTEX™",
    description:
      "Detonator-sensitive cast boosters of high-density cast explosive, supplied in typical sizes from 150 g to 2 kg, with excellent water resistance and compatibility with EXEL™, ENDURADET™ and detonating cord initiation.",
    specColumns: ["Specification"],
    specs: [
      { parameter: "Explosive Type", values: ["High-density cast explosive"] },
      { parameter: "Detonation Velocity", values: [">7,000 m/s"] },
      { parameter: "Density", values: ["~1.50–1.60 g/cc"] },
      { parameter: "Sensitivity", values: ["Detonator sensitive"] },
      {
        parameter: "Available Sizes",
        values: ["150 g, 250 g, 400 g, 1 kg, 2 kg (typical)"],
      },
      { parameter: "Water Resistance", values: ["Excellent"] },
      {
        parameter: "Initiation Compatibility",
        values: ["EXEL™, ENDURADET™, detonating cord"],
      },
    ],
    images: [
      {
        src: "/images/products/pentex-cast-boosters.jpg",
        alt: "Orange-wrapped Orica Pentex cast boosters packed in a bulk liner, each showing its moulded detonator well",
        width: 462,
        height: 400,
        caption: "Pentex™ cast boosters as supplied",
      },
      {
        src: "/images/products/pentex-gl-product-sheet.jpg",
        alt: "The Orica Pentex GL product information sheet reproduced in the catalogue, showing the booster in its packaging",
        width: 306,
        height: 424,
        caption: "Pentex™ GL product sheet",
      },
    ],
  },
  {
    id: "exel-ms",
    number: "03",
    name: "EXEL™ Millisecond Range",
    descriptor: "Non-Electric Detonators",
    category: "Non-electric initiation systems",
    navLabel: "EXEL™ MS",
    description:
      "Shock-tube initiation with millisecond surface and downhole delays. The system carries no electrical circuit, so it is immune to RF, static and stray currents, and the tube is built for high abrasion and moisture resistance.",
    specColumns: ["Specification"],
    specs: [
      { parameter: "Initiation Type", values: ["Shock tube"] },
      {
        parameter: "Delay Range",
        values: ["Millisecond delays (surface & downhole)"],
      },
      { parameter: "Delay Accuracy", values: ["±3% (typical)"] },
      {
        parameter: "Electrical Safety",
        values: ["Immune to RF, static, stray currents"],
      },
      {
        parameter: "Tube Lengths",
        values: ["Multiple standard lengths available"],
      },
      {
        parameter: "Environmental Resistance",
        values: ["High abrasion & moisture resistance"],
      },
    ],
    images: [
      {
        src: "/images/products/exel-ms-red-detonator-coils.jpg",
        alt: "Coils of red Orica Exel shock tube, each terminating in a metal downhole detonator",
        width: 480,
        height: 445,
        caption: "Exel™ shock tube assemblies",
      },
      {
        src: "/images/products/exel-ms-yellow-detonator-coils.jpg",
        alt: "Coils of yellow Orica Exel shock tube with black-sheathed downhole detonators and tagged delay labels",
        width: 310,
        height: 409,
        caption: "Tagged millisecond delay assemblies",
      },
      {
        src: "/images/products/exel-ms-downhole-detonator.jpg",
        alt: "A single coil of yellow Orica Exel shock tube with a length tag and a metal downhole detonator",
        width: 412,
        height: 381,
        caption: "Single downhole assembly",
      },
    ],
  },
  {
    id: "enduradet",
    number: "04",
    name: "ENDURADET™",
    descriptor: "Electronic Detonation Systems",
    category: "Electronic detonators",
    navLabel: "ENDURADET™",
    description:
      "Electronic initiation with fully programmable delays and ±0.1 ms typical accuracy, supported by full circuit testing and verification. The system comprises detonators, testers and programmers, and suits high-complexity precision blasting.",
    specColumns: ["Specification"],
    specs: [
      { parameter: "Initiation Type", values: ["Electronic"] },
      { parameter: "Delay Programming", values: ["Fully programmable"] },
      { parameter: "Delay Accuracy", values: ["±0.1 ms (typical)"] },
      {
        parameter: "Diagnostics",
        values: ["Full circuit testing & verification"],
      },
      {
        parameter: "System Components",
        values: ["Detonators, testers, programmers"],
      },
      {
        parameter: "Application Complexity",
        values: ["High (precision blasting)"],
      },
    ],
    images: [
      {
        src: "/images/products/enduradet-blast-box-and-tester.jpg",
        alt: "An Orica electronic blasting control unit in a hard case beside a handheld tester and two connector plugs",
        width: 440,
        height: 316,
        caption: "Control unit, tester and connectors",
      },
      {
        src: "/images/products/enduradet-electronic-systems.jpg",
        alt: "Orica electronic blasting systems panel from the catalogue, naming i-kon III Neo, eDev II Neo and uni tronic 600 Neo",
        width: 588,
        height: 307,
        caption: "Electronic blasting systems",
      },
      {
        src: "/images/products/exel-signal-tube-spool.jpg",
        alt: "A coil of red Orica signal tube beside a spool of the same tube",
        width: 207,
        height: 152,
        caption: "Signal tube coil and spool",
      },
    ],
  },
  {
    id: "connectadet",
    number: "05",
    name: "EXEL™ CONNECTADET™ Range",
    descriptor: "Surface Delay Systems",
    category: "Surface delay connectors",
    navLabel: "EXEL™ CONNECTADET™",
    description:
      "Non-electric surface delay connectors with factory-set delays and a snap-on, clip-based connection to EXEL™ downhole detonators — a rapid surface hook-up with low misfire risk.",
    specColumns: ["Specification"],
    specs: [
      { parameter: "Initiation Type", values: ["Non-electric"] },
      { parameter: "Delay Increments", values: ["Factory-set surface delays"] },
      { parameter: "Connection Method", values: ["Snap-on / clip-based"] },
      { parameter: "Compatibility", values: ["EXEL™ downhole detonators"] },
      { parameter: "Installation", values: ["Rapid surface hook-up"] },
      { parameter: "Safety", values: ["Non-electric, low misfire risk"] },
    ],
    images: [
      {
        src: "/images/products/connectadet-clip-connectors.jpg",
        alt: "Coils of pink Orica Exel Connectadet signal tube with black-sheathed leads and coloured surface connector blocks",
        width: 437,
        height: 438,
        caption: "Connectadet™ surface delay assemblies",
      },
      {
        src: "/images/products/connectadet-surface-connectors.jpg",
        alt: "A fan of pink Orica Exel Connectadet surface delay leads fitted with coloured snap-on connector clips",
        width: 422,
        height: 329,
        caption: "Colour-coded snap-on connectors",
      },
    ],
  },
  {
    id: "cordtex",
    number: "06",
    name: "CORDTEX™",
    descriptor: "Detonating Cord",
    category: "Detonating cord",
    navLabel: "CORDTEX™",
    description:
      "Detonating cord built around a PETN core in a textile and polymer sheath, with core loads from 3 to 100 g PETN/m and a detonation velocity of about 6,500–7,000 m/s. Typically used for surface tie-ins and trunklines.",
    specColumns: ["Specification"],
    specs: [
      { parameter: "Core Load", values: ["3–100 g PETN/m"] },
      { parameter: "Detonation Velocity", values: ["~6,500–7,000 m/s"] },
      {
        parameter: "Construction",
        values: ["PETN core with textile & polymer sheath"],
      },
      { parameter: "Tensile Strength", values: ["High"] },
      { parameter: "Water Resistance", values: ["Available"] },
      { parameter: "Typical Use", values: ["Surface tie-ins, trunklines"] },
    ],
    images: [
      {
        src: "/images/products/cordtex-spools.jpg",
        alt: "Three spools of Orica Cordtex detonating cord, two red and one green",
        width: 228,
        height: 213,
        caption: "Cordtex™ spools",
      },
      {
        src: "/images/products/cordtex-product-sheet.jpg",
        alt: "The Orica Cordtex product information sheet reproduced in the catalogue, listing cord types and their colours",
        width: 520,
        height: 723,
        caption: "Cordtex™ product sheet",
      },
    ],
  },
  {
    id: "senatel",
    number: "07",
    name: "SENATEL™ Range",
    descriptor: "Packaged Explosives",
    category: "Packaged explosives",
    navLabel: "SENATEL™",
    description:
      "Factory-manufactured cartridge explosives of consistent quality, ~1.10–1.25 g/cc, with moderate to high water resistance. Supplied in various typical mining sizes and initiated by detonator or booster.",
    specColumns: ["Specification"],
    specs: [
      { parameter: "Explosive Form", values: ["Cartridge explosives"] },
      { parameter: "Density", values: ["~1.10–1.25 g/cc"] },
      { parameter: "Water Resistance", values: ["Moderate to high"] },
      {
        parameter: "Cartridge Diameters",
        values: ["Various (typical mining sizes)"],
      },
      { parameter: "Initiation", values: ["Detonator or booster"] },
      {
        parameter: "Handling",
        values: ["Factory-manufactured, consistent"],
      },
    ],
    images: [
      {
        src: "/images/products/senatel-powerfrag-cartridge.jpg",
        alt: "A wrapped Orica Senatel Powerfrag cartridge explosive marked Danger Explosive",
        width: 978,
        height: 187,
        caption: "Senatel™ Powerfrag cartridge",
      },
      {
        src: "/images/products/senatel-explosives-display.jpg",
        alt: "A display board of packaged explosive cartridges, detonating cord and initiation accessories",
        width: 445,
        height: 321,
        caption: "Packaged explosives and accessories",
      },
    ],
  },
];

/** Product Range Summary — the closing table of the catalogue (page 9). */
export type RangeSummaryRow = {
  /** Links back to the matching section on the page. */
  id: string;
  range: string;
  category: string;
  primaryFunction: string;
  keyAdvantage: string;
};

export const RANGE_SUMMARY: RangeSummaryRow[] = [
  {
    id: "amex",
    range: "AMEX™",
    category: "Bulk explosives",
    primaryFunction: "Blasting agent",
    keyAdvantage: "Cost-effective mass blasting",
  },
  {
    id: "pentex",
    range: "PENTEX™",
    category: "Boosters",
    primaryFunction: "Initiation",
    keyAdvantage: "Reliable energy transfer",
  },
  {
    id: "exel-ms",
    range: "EXEL™ MS",
    category: "Detonators",
    primaryFunction: "Non-electric initiation",
    keyAdvantage: "Safety & reliability",
  },
  {
    id: "enduradet",
    range: "ENDURADET™",
    category: "Detonators",
    primaryFunction: "Electronic initiation",
    keyAdvantage: "Precision & control",
  },
  {
    id: "connectadet",
    range: "EXEL™ CONNECTADET™",
    category: "Surface delays",
    primaryFunction: "Hook-up system",
    keyAdvantage: "Fast & simple connections",
  },
  {
    id: "cordtex",
    range: "CORDTEX™",
    category: "Accessories",
    primaryFunction: "Signal transfer",
    keyAdvantage: "Versatility",
  },
  {
    id: "senatel",
    range: "SENATEL™",
    category: "Packaged explosives",
    primaryFunction: "Confined blasting",
    keyAdvantage: "Consistency & control",
  },
];
