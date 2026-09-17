/**
 * Frontier Agri — the agriculture arm of CJ MUNI.
 *
 * Content is taken from the supplied Frontier Agri background. It is kept
 * separate from data/capabilities.ts because Frontier Agri is a business arm
 * rather than a product or service line, and gets its own page section.
 */

export const FRONTIER = {
  name: "Frontier Agri",
  eyebrow: "Another arm of CJ MUNI",
  title: "Frontier Agri.",
  lead: "The agriculture arm of CJ MUNI and the largest cocoa farming enterprise in Central Province.",
  intro:
    "Frontier Agri turns land into long-term income. Working alongside landowner companies, it builds high-yield cocoa ventures and the technical capacity to run them — so the value stays in the community long after a project ends.",
  /** Headline figure for the stat block. */
  stat: {
    value: "500,000+",
    label: "Cocoa trees planted to date",
  },
  pillars: [
    {
      number: "01",
      title: "Proven Agriculture Partner",
      body: "A business arm of CJ MUNI and the largest cocoa farming enterprise in Central Province, with over 500,000 cocoa trees planted to date.",
    },
    {
      number: "02",
      title: "Sustainable Economic Growth",
      body: "Delivers high-yield cocoa farming ventures and technical capacity building that generate long-term revenue for LandCo partners.",
    },
    {
      number: "03",
      title: "Community Impact",
      body: "Creates local employment and secures lasting socio-economic resilience for landowner communities beyond the Papua LNG project lifecycle.",
    },
  ],
  /**
   * The official Frontier Agri mark. The source PNG has an opaque white
   * background (no alpha), which is why the panel that holds it is white —
   * on any darker surface the black wordmark would disappear.
   */
  logo: "/images/logo/frontier-agri-logo.png",
  logoAlt: "Frontier Agri",
  logoWidth: 1000,
  logoHeight: 696,
} as const;
