/**
 * The seven MUNI capability areas.
 *
 * This is the single source of truth for capability content. The landing-page
 * grid and (in phase two) the individual /capabilities/[slug] pages both read
 * from here, so a capability can become its own service page without any
 * redesign — add richer fields to the object, render them on the detail route.
 *
 * Copy is limited to the approved high-level descriptions from the MUNI
 * Corporate Brand Guidelines and the supplied business profile. Where the
 * source material is thin (engineering, marine, sustainable development) the
 * copy is deliberately high-level and leaves room for future content.
 *
 * Images point at the shared photo library (public/images/library/). Several
 * slots deliberately reuse a photo until dedicated photography is supplied —
 * swap a single path here to change it everywhere it appears.
 */

export type Capability = {
  number: string;
  title: string;
  slug: string;
  /** Short description used on the landing-page card. */
  description: string;
  /** Longer lead paragraph for a future dedicated service page. */
  overview: string;
  /** Supporting points — only included where the source material supports them. */
  points: string[];
  image: string;
  imageAlt: string;
  /** True where the supplied profile only gives a high-level description. */
  highLevelOnly?: boolean;
};

export const CAPABILITIES: Capability[] = [
  {
    number: "01",
    title: "Explosives Distribution & Application",
    slug: "explosives-distribution",
    description:
      "Orica range of products, licensed explosives facilities and field application capability.",
    overview:
      "MUNI distributes the Orica range of products and operates licensed explosives facilities, combined with field application capability for demanding mining and civil work.",
    points: [
      "Orica range of products",
      "Licensed explosives facilities",
      "Field application capability",
    ],
    image: "/images/library/explosives.jpg",
    imageAlt:
      "MUNI crew with a MUNI explosives truck and drill rig on a mine bench",
  },
  {
    number: "02",
    title: "Reagents & Fertilizers",
    slug: "reagents-fertilizers",
    description:
      "Reagents for mining and metals, agriculture inputs and related product support.",
    overview:
      "MUNI supplies reagents for mining and metals processing alongside agriculture inputs, backed by technical product support.",
    points: [
      "Xanthate, collectors and flocculants",
      "UREA and agriculture inputs",
      "Water and wastewater treatment",
      "Technical support",
    ],
    image: "/images/library/reagents-warehouse.jpg",
    imageAlt:
      "MUNI personnel in a warehouse stocked with Orica reagent and UREA product",
  },
  {
    number: "03",
    title: "Drill & Blast Services",
    slug: "drill-blast",
    description:
      "Drilling and blasting support for mining, quarries, exploration and pioneer-road applications.",
    overview:
      "MUNI provides drilling and blasting support across mining, quarrying, exploration and pioneer-road applications.",
    points: [
      "Mining and quarry operations",
      "Exploration programmes",
      "Pioneer-road applications",
    ],
    image: "/images/library/drill-blast.jpg",
    imageAlt:
      "MUNI crew at a drilled blast pattern with charged holes and a drill rig",
  },
  {
    number: "04",
    title: "Engineering & Civil Works",
    slug: "engineering-civil",
    description:
      "Engineering and civil capability supporting industrial and infrastructure projects.",
    overview:
      "MUNI brings engineering and civil capability to industrial and infrastructure projects. Detailed scope is developed with each client around project requirements.",
    points: [],
    image: "/images/library/engineering-civil.jpg",
    imageAlt:
      "MUNI engineers reviewing drawings on a civil earthworks site with an excavator",
    highLevelOnly: true,
  },
  {
    number: "05",
    title: "Tug & Barge Services",
    slug: "tug-barge",
    description:
      "Marine transport and project support through tug and barge operations.",
    overview:
      "MUNI supports projects with marine transport through tug and barge operations, coordinated with its wider supply-chain capability.",
    points: [],
    image: "/images/library/marine.jpg",
    imageAlt: "MUNI marine crew on a wharf with a tug and loaded barge at a PNG port",
    highLevelOnly: true,
  },
  {
    number: "06",
    title: "End-to-End Supply Chain",
    slug: "supply-chain",
    description:
      "Coordinated sourcing, logistics, storage, handling and delivery around customer requirements.",
    overview:
      "MUNI coordinates sourcing, logistics, storage, handling and delivery around customer requirements — monitoring orders from manufacture through to delivery with tailored delivery schedules.",
    points: [
      "In-house logistics team",
      "Order monitoring from manufacture to delivery",
      "Tailored delivery schedules",
      "Safe and secure materials storage and handling",
    ],
    image: "/images/library/supply-chain.jpg",
    imageAlt: "MUNI logistics operations — from manufacture to delivery",
  },
  {
    number: "07",
    title: "Sustainable Project Development",
    slug: "sustainable-development",
    description:
      "Project development with a focus on responsible delivery and long-term value.",
    overview:
      "MUNI approaches project development with a focus on responsible delivery and long-term value for clients and communities.",
    points: [],
    image: "/images/library/sustainability.jpg",
    imageAlt:
      "MUNI team with plans beside a solar array and tree planting above a PNG coastline",
    highLevelOnly: true,
  },
];

export function getCapability(slug: string): Capability | undefined {
  return CAPABILITIES.find((c) => c.slug === slug);
}
