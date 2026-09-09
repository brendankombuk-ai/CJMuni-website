/**
 * Operating environments MUNI works around. Categories are drawn only from
 * the supplied source material. No customer names or logos are implied.
 *
 * Images reuse the shared photo library where a real MUNI photo fits the
 * category; the rest fall back to a styled placeholder until photography is
 * supplied.
 */

export type Industry = {
  name: string;
  image: string;
  imageAlt: string;
};

export const INDUSTRIES: Industry[] = [
  { name: "Mining", image: "/images/library/drill-blast.jpg", imageAlt: "MUNI crew on a mine bench with drill rig and explosives truck" },
  { name: "Metals", image: "/images/industries/metals.jpg", imageAlt: "Metals processing plant" },
  { name: "Oil & Gas", image: "/images/industries/oil-gas.jpg", imageAlt: "Oil and gas facility" },
  { name: "Agriculture", image: "/images/library/sustainability.jpg", imageAlt: "Cultivated land and planting above a PNG coastline" },
  { name: "Water & Wastewater", image: "/images/industries/water.jpg", imageAlt: "Water treatment infrastructure" },
  { name: "Infrastructure", image: "/images/library/engineering-civil.jpg", imageAlt: "Civil earthworks with excavator and haul truck" },
  { name: "Quarries", image: "/images/industries/quarries.jpg", imageAlt: "Aggregate quarry" },
  { name: "Exploration", image: "/images/library/field-vehicle.jpg", imageAlt: "MUNI field vehicle on rough ground at a remote site" },
  { name: "Industrial Projects", image: "/images/industries/industrial.jpg", imageAlt: "Large industrial project site" },
];
