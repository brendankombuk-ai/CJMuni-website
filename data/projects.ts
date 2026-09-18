/**
 * Project / capability-evidence entries.
 *
 * Photography is real CJ MUNI operational imagery. The written project detail
 * (title, description, exact location) is still to be confirmed — those fields
 * carry "to be added" copy and `detailsPending: true` so the UI stays honest
 * rather than inventing a project history.
 */

export type Project = {
  ref: string;
  category: string;
  title: string;
  description: string;
  location: string;
  image: string;
  imageAlt: string;
  /** Written project detail not yet confirmed for publication. */
  detailsPending: boolean;
};

export const PROJECTS: Project[] = [
  {
    ref: "PROJECT 01",
    category: "Mining / Drill & Blast",
    title:
      "Civil (Global Construction), Quarry (Yang Guang) and Mining (Pacific Cement & Limestone)",
    description:
      "CJ MUNI recently delivered Drill & Blast services across civil construction, quarrying, and mining operations in Central Province, PNG, supporting major clients including Global Construction, Yang Guang, Pacific Cement, and Limestone.",
    location: "Central Province, PNG",
    image: "/images/library/project-01-drill-blast.jpg",
    imageAlt: "CJ MUNI drill and blast crew reviewing plans and core trays at a Central Province site, PNG",
    detailsPending: false,
  },
  {
    ref: "PROJECT 02",
    category: "Drill & Blast / Supply",
    title: "Explosives Supply - Santos, Curtain Brothers, Corman Construction",
    description:
      "CJ MUNI provided reliable explosives supply solutions to major civil construction and resource-sector clients across Papua New Guinea, including Santos, Curtain Brothers, and Corman Construction.",
    location: "Central Province, PNG",
    image: "/images/library/project-02-explosives-supply.jpg",
    imageAlt: "Orica-branded explosives crates, detonator cartons, Exel coils, ANFO and Pentex pallets staged dockside beside a CJ MUNI truck",
    detailsPending: false,
  },
  {
    ref: "PROJECT 03",
    category: "Reagents Supply – Mining & Processing",
    title: "Reagents Supply - AG Investment, Pioneer DG",
    description:
      "CJ MUNI provides reliable reagent supply solutions to clients operating within Papua New Guinea's mining and resource sectors, including AG Investment and Pioneer DG. Our reagent supply services support mineral processing and mining operations.",
    location: "Central Province, PNG",
    image: "/images/library/project-03-reagents-supply.jpg",
    imageAlt: "CJ MUNI crew loading Orica reagent product — flocculant drums, caustic soda flakes, polymer and IBCs — into a container at the wharf with a ship alongside",
    detailsPending: false,
  },
  {
    ref: "PROJECT 04",
    category: "Logistics & Storage – Resource & Construction",
    title: "Reliable logistics and storage solutions",
    description:
      "CJ MUNI provides reliable logistics and storage solutions to clients across Papua New Guinea's construction, mining, and resource sectors, including Curtain Brothers, Pacific Limestone Cement, and Mayur Resources.",
    location: "Central Province, PNG",
    image: "/images/library/project-04-logistics-storage.jpg",
    imageAlt: "CJ MUNI warehouse team checking palletised Orica stock in racking with a CJ MUNI forklift working the aisle",
    detailsPending: false,
  },
];
