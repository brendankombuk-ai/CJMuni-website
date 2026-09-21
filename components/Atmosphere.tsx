import type { ReactNode } from "react";

/**
 * The atmosphere layer.
 *
 * Every section on the site is lit by the same system: a surface gradient, a
 * brand glow and a texture, all driven by custom properties on the section
 * itself (see the BACKGROUND SYSTEM block in app/globals.css). This module is
 * the other half of it — the named recipes that say which of those primitives
 * a given section uses, plus the oversized shapes that sit behind it.
 *
 * Two exports, used together:
 *
 *   <section className={`py-20 ${atmosphere("marine")}`}>
 *     <Atmosphere variant="marine" />
 *     …
 *   </section>
 *
 * `atmosphere()` returns the class list for the section element, and
 * <Atmosphere /> renders that variant's decorative shapes. Both are pure
 * presentation: no state, no client JavaScript, nothing focusable, and every
 * shape is `pointer-events: none` and negatively stacked, so the atmosphere
 * can never sit between a visitor and a link.
 *
 * Keeping the two in one file is deliberate — a variant's surface and its
 * shapes are one design decision, and splitting them is how a section ends up
 * with a marine texture and an explosives shard.
 */

export type AtmosphereVariant =
  | "hero"
  | "page-intro"
  | "neutral"
  | "alt"
  | "explosives"
  | "reagents"
  | "drill-blast"
  | "quarry"
  | "civil"
  | "marine"
  | "supply-chain"
  | "sustainable"
  | "projects"
  | "contact"
  | "footer";

/**
 * The class list for the section element itself.
 *
 * Read these as sentences: surface, texture, where the light comes from, how
 * strong it is. The eight capability variants each answer the brief's
 * requirement that a service feels like itself — industrial, scientific,
 * structural, architectural, marine, connected, environmental — while every
 * one of them is built from the same six or seven primitives, so they remain
 * one design system rather than eight.
 */
const SECTION_CLASSES: Record<AtmosphereVariant, string> = {
  // Cinematic but corporate: the widest, softest light on the site.
  hero: "section-shell section-dark texture-grid atmo-right atmo-medium atmo-wide",

  // Interior page headers. Quiet — the headline is the only thing here.
  "page-intro": "section-shell section-dark texture-grid atmo-tr atmo-soft",

  // The default section. Almost nothing, just enough to not be flat.
  neutral: "section-shell section-dark texture-grain atmo-tr atmo-soft",

  // The alternate surface, for rhythm between two ordinary sections.
  alt: "section-shell section-dark-alt texture-grain atmo-tl atmo-soft",

  // Explosives: deep graphite, controlled warm light, technical hatching.
  // Warm sits a step below the others: the emblem red reads considerably
  // louder than the gold at the same opacity.
  explosives:
    "section-shell section-dark-alt texture-hatch atmo-tr atmo-soft atmo-warm",

  // Fertilizer & reagents: charcoal, soft flowing light, a fine lab pattern.
  reagents: "section-shell section-dark-alt texture-dots atmo-left atmo-medium",

  // Drill & blast: graphite and construction diagonals. Structural.
  "drill-blast":
    "section-shell section-dark texture-diagonal atmo-bl atmo-medium",

  // Quarry: the same engineering language, lit from the other side.
  quarry: "section-shell section-dark texture-diagonal atmo-tr atmo-soft",

  // Civil & earth moving: concrete tones and a blueprint grid.
  civil: "section-shell section-dark-alt texture-blueprint atmo-top atmo-soft",

  // Tug & barge: black, soft horizontal light, banded like a horizon.
  marine: "section-shell section-dark texture-horizon atmo-left atmo-medium atmo-wide",

  // End-to-end supply chain: the technical grid, plus the node network below.
  "supply-chain": "section-shell section-dark texture-grid atmo-right atmo-medium",

  // Sustainable development: contour lines and organic forms. Not green.
  sustainable: "section-shell section-dark texture-contour atmo-bl atmo-medium",

  // Project work: grain and a low, wide light.
  projects: "section-shell section-gradient texture-grain atmo-br atmo-soft",

  // The closing call to action — the one moment that is a feature.
  contact:
    "section-shell section-feature texture-grid atmo-top atmo-strong atmo-wide seam-top",

  footer: "section-shell section-dark-alt texture-grain atmo-top atmo-soft",
};

export function atmosphere(variant: AtmosphereVariant, extra?: string) {
  return extra
    ? `${SECTION_CLASSES[variant]} ${extra}`
    : SECTION_CLASSES[variant];
}

/**
 * The supply-chain network.
 *
 * The one variant that cannot be done with gradients: connection, movement and
 * delivery want actual nodes and actual lines between them. It is a single
 * inline SVG of eleven lines and eight circles — no library, no request, and it
 * scales with the section because it is laid out in viewBox units.
 */
function NetworkField() {
  const nodes: Array<[number, number, number]> = [
    [60, 150, 3],
    [220, 70, 4],
    [250, 230, 3],
    [420, 120, 5],
    [470, 265, 3],
    [620, 60, 3],
    [660, 190, 4],
    [790, 130, 3],
  ];

  const links: Array<[number, number]> = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
    [2, 4],
    [3, 4],
    [3, 5],
    [3, 6],
    [4, 6],
    [5, 7],
    [6, 7],
  ];

  return (
    <svg
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
      viewBox="0 0 840 320"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="rgb(255 255 255 / 0.075)" strokeWidth="0.75">
        {links.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
          />
        ))}
      </g>
      <g fill="rgb(241 175 33 / 0.42)">
        {nodes.map(([x, y, r], i) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r={r * 0.35}
            className={i % 3 === 0 ? "atmo-breathe" : undefined}
            style={i % 3 === 0 ? { animationDelay: `${i * 2.4}s` } : undefined}
          />
        ))}
      </g>
      <g fill="none" stroke="rgb(241 175 33 / 0.14)" strokeWidth="0.75">
        {nodes.map(([x, y, r]) => (
          <circle key={`ring-${x}-${y}`} cx={x} cy={y} r={r * 1.6} />
        ))}
      </g>
    </svg>
  );
}

/**
 * The oversized shapes behind a section.
 *
 * Deliberately sparse: one or two forms per variant, most of them running off
 * the edge of the section so the eye reads them as part of something larger
 * rather than as a decoration placed in a box.
 */
const SHAPES: Record<AtmosphereVariant, ReactNode> = {
  hero: (
    <>
      <div className="atmo-orb atmo-drift-slow -right-40 -top-56 h-[46rem] w-[46rem]" />
      <div className="atmo-orb-cool atmo-hide-mobile -left-64 top-40 h-[34rem] w-[34rem]" />
      <div className="atmo-ring atmo-ring-gold atmo-hide-mobile -right-24 top-10 h-[34rem] w-[34rem]" />
      <div className="atmo-line atmo-hide-mobile left-0 top-1/3 w-2/3" />
    </>
  ),

  "page-intro": (
    <>
      <div className="atmo-orb -right-48 -top-40 h-[34rem] w-[34rem]" />
      <div className="atmo-line atmo-line-cool atmo-hide-mobile right-0 bottom-10 w-1/2" />
    </>
  ),

  neutral: <div className="atmo-orb -right-56 -top-32 h-[32rem] w-[32rem]" />,

  alt: <div className="atmo-orb -left-56 top-0 h-[32rem] w-[32rem]" />,

  explosives: (
    <>
      <div className="atmo-orb atmo-drift -right-52 -top-40 h-[40rem] w-[40rem]" />
      <div className="atmo-shard atmo-hide-mobile -right-20 bottom-0 h-[30rem] w-[26rem]" />
      <div className="atmo-line atmo-hide-mobile right-0 top-24 w-1/2" />
    </>
  ),

  reagents: (
    <>
      <div className="atmo-orb atmo-drift-slow -left-56 -top-24 h-[42rem] w-[42rem]" />
      <div className="atmo-orb-cool atmo-hide-mobile -right-40 -bottom-20 h-[30rem] w-[30rem]" />
      <div className="atmo-ring atmo-hide-mobile -left-32 bottom-0 h-[28rem] w-[28rem]" />
    </>
  ),

  "drill-blast": (
    <>
      <div className="atmo-orb -left-48 -bottom-40 h-[38rem] w-[38rem]" />
      <div className="atmo-shard atmo-hide-mobile -left-16 top-0 h-[28rem] w-[24rem] rotate-180" />
      <div className="atmo-line atmo-hide-mobile left-0 bottom-20 w-3/5" />
    </>
  ),

  quarry: (
    <>
      <div className="atmo-orb -right-48 -top-36 h-[36rem] w-[36rem]" />
      <div className="atmo-shard atmo-hide-mobile -right-16 bottom-0 h-[26rem] w-[22rem]" />
    </>
  ),

  civil: (
    <>
      <div className="atmo-orb -top-52 left-1/3 h-[38rem] w-[38rem]" />
      <div className="atmo-ring atmo-hide-mobile left-1/2 -top-40 h-[36rem] w-[36rem] -translate-x-1/2" />
      <div className="atmo-line atmo-line-cool atmo-hide-mobile left-1/4 bottom-16 w-1/2" />
    </>
  ),

  marine: (
    <>
      <div className="atmo-orb atmo-drift-slow -left-64 top-1/4 h-[44rem] w-[44rem]" />
      <div className="atmo-orb-cool atmo-hide-mobile -right-52 bottom-0 h-[34rem] w-[34rem]" />
      <div className="atmo-line atmo-line-cool left-0 top-2/3 w-full" />
    </>
  ),

  "supply-chain": (
    <>
      <NetworkField />
      <div className="atmo-orb -right-52 top-0 h-[38rem] w-[38rem]" />
    </>
  ),

  sustainable: (
    <>
      <div className="atmo-orb atmo-drift-slow -left-52 -bottom-44 h-[44rem] w-[44rem]" />
      <div className="atmo-ring atmo-ring-gold atmo-hide-mobile -left-40 -bottom-36 h-[38rem] w-[38rem]" />
    </>
  ),

  projects: (
    <>
      <div className="atmo-orb -right-56 -bottom-32 h-[36rem] w-[36rem]" />
      <div className="atmo-orb-cool atmo-hide-mobile -left-52 top-0 h-[30rem] w-[30rem]" />
    </>
  ),

  contact: (
    <>
      <div className="atmo-orb atmo-drift left-1/2 -top-64 h-[52rem] w-[52rem] -translate-x-1/2" />
      <div className="atmo-ring atmo-ring-gold atmo-hide-mobile left-1/2 -top-52 h-[46rem] w-[46rem] -translate-x-1/2" />
      <div className="atmo-line left-0 top-0 w-full" />
    </>
  ),

  footer: <div className="atmo-orb left-1/2 -top-48 h-[36rem] w-[36rem] -translate-x-1/2" />,
};

export function Atmosphere({ variant }: { variant: AtmosphereVariant }) {
  return <>{SHAPES[variant]}</>;
}
