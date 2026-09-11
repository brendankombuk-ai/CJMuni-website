/**
 * Project / capability-evidence entries.
 *
 * Photography is real MUNI operational imagery. The written project detail
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
    title: "Project title to be added.",
    description: "Short project description to be added.",
    location: "Central Province, PNG",
    image: "/images/library/project-01-drill-blast.jpg",
    imageAlt: "MUNI crew reviewing plans at a drill and blast site, Central Province, PNG",
    detailsPending: true,
  },
  {
    ref: "PROJECT 02",
    category: "Supply Chain / Logistics",
    title: "Project title to be added.",
    description: "Short project description to be added.",
    location: "National Capital District, PNG",
    image: "/images/library/reagents-warehouse.jpg",
    imageAlt: "MUNI warehouse and product handling operation",
    detailsPending: true,
  },
  {
    ref: "PROJECT 03",
    category: "Field Operations / Access",
    title: "Project title to be added.",
    description: "Short project description to be added.",
    location: "Gulf Province, PNG",
    image: "/images/library/field-vehicle.jpg",
    imageAlt: "MUNI field vehicle working through wet ground at a remote site",
    detailsPending: true,
  },
  {
    ref: "PROJECT 04",
    category: "Engineering & Civil Works",
    title: "Project title to be added.",
    description: "Short project description to be added.",
    location: "Morobe Province, PNG",
    image: "/images/library/engineering-civil.jpg",
    imageAlt: "MUNI engineering and civil earthworks in progress",
    detailsPending: true,
  },
];
