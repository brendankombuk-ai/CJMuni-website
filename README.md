# CJ MUNI — Corporate Website

Premium industrial marketing site for **CJ MUNI**, a Papua New Guinea-focused
industrial partner. Single-page landing experience with the architecture for
phase-two service pages already in place.

> **Brand promise:** Connected Capability. Reliable Delivery.
> **Brand idea:** The Power of Partnership.

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS 3** with brand tokens (`tailwind.config.ts`)
- **Framer Motion** for deliberate, hierarchy-supporting animation
- **react-hook-form + zod** for the enquiry form

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
```

## Project structure

```
app/
  layout.tsx                  fonts, metadata, Organization JSON-LD, skip link
  page.tsx                    landing page section rhythm
  globals.css                 design system + reduced-motion handling
  api/enquiry/route.ts        validated enquiry endpoint (no email backend yet)
  capabilities/page.tsx       products & services index
  capabilities/[slug]/page.tsx  product / service page (static-generated)
  products/page.tsx           Orica product catalogue — one page, seven ranges
  contact/ · projects/        contact and project pages
  sitemap.ts · robots.ts · icon.svg · not-found.tsx

components/                   Navbar, Footer, Logo, PageIntro, SmartImage,
                              HomeHero, CapabilityLinks, ProjectsTeaser,
                              ContactBand, CapabilityCard, Projects, Contact,
                              EnquiryForm, Reveal
                              (unused, kept for reuse: CapabilityGrid,
                              ConnectedCapability, WhyMuni, SupplyChainFeature,
                              Industries, SectionHeading — these still use the
                              older dark styling)

components/products/          the /products page: ProductsHero,
                              ProductNavigation, ProductSection,
                              ProductGallery, ProductSpecifications,
                              ProductRangeSummary, SmoothAnchor

data/
  site.ts                     nav, brand statements, verified contact details
  capabilities.ts             PRODUCTS (2) + SERVICES (6) — single source of truth
  products.ts                 Orica catalogue: 7 ranges, specs, imagery
  industries.ts · projects.ts

public/images/                image slots — see public/images/README.md
```

## Brand

| Token | Hex | Role |
| --- | --- | --- |
| CJ MUNI Gold | `#F1AF21` | Primary accent — lines, numbers, buttons, hover |
| CJ MUNI Black | `#000000` | Primary background |
| Goat Red | `#E12129` | Signature detail only — used sparingly |
| White | `#FFFFFF` | Body text and headings |

Off-black panels are `ink-900` (`#0A0A0A`) and `ink-800` (`#111111`); secondary
text is white at 70%, faint labels at 50-55%. Charcoal (`#4A4A4A`) is a
light-background colour and is not used on the page. `#E12129` is too dark to
read as small text on black, so error text uses `goat-light` (`#EA6469`).

Type: **Montserrat** (headings, 700/800) · **Inter** (body/technical).

### Logo

`public/images/logo/muni-logo-light.png` is the supplied lockup: the artwork on
an opaque white plate. The header uses `muni-logo-dark.png`, the reverse of it —
white "MU", red "NI", no plate — which is generated from the supplied file:

```
node scripts/make-dark-logo.mjs
```

Re-run that after replacing `muni-logo-light.png`. Never distort, recolour or
add effects to the official mark, and never alter the goat.

## Content rules

Copy uses only the approved high-level descriptions from the CJ MUNI Corporate
Brand Guidelines and the supplied business profile. **Quarry Services**, **Civil
& Earth Moving**, **Tug & Barge** and **Sustainable Development Projects** are
deliberately high-level — the source material does not support detailed claims.
No invented statistics, certifications, clients or project history.

### Page structure

The site is multi-page. Every navigation link is a real route, not an in-page
anchor:

```
/                       short signpost home page
/capabilities           products (2) and services (6)
/capabilities/[slug]    one page per product / service
/products               Orica product catalogue (linked from explosives)
/projects               project evidence
/contact                contact details + enquiry form
```

`/products` is the one exception to "no in-page anchors": the Orica catalogue is
a single page with seven ranges and a sticky range selector, so its navigation
is anchors with a per-click smooth scroll rather than seven thin routes. Its
content and photography come from the CJ MUNI / Orica Product Catalog 2026 —
every value in `data/products.ts` is the catalogue's own, and nothing is
estimated or expanded. See `public/images/products/README.md` for where each
image came from.

The home page runs: hero -> what we do (links to all 8 capabilities) -> recent
work (3 projects) -> contact band. Everything on it has a fuller page behind
it, so it stays short.

Pages are black: black backgrounds, white text, gold as an accent, red kept for
the emblem. Sections are separated by white hairlines at 10% rather than by
changes of colour, and panels sit one step off black. The exception is the
product frames on `/products`, which stay white on purpose — the Orica catalogue
shots are cut-outs on white, so a white plate is what keeps them readable.
Content is not animated in on scroll — it renders immediately.

## Enquiry form

`POST /api/enquiry` validates with zod and acknowledges the submission. It does
**not** send email. To connect a backend, add a provider call at the marked
integration point in `app/api/enquiry/route.ts` (e.g. Resend / SendGrid / SMTP
/ CRM webhook) and set the relevant env vars.

## Phase two

The design system, components and data are structured so these routes can be
added without a redesign:

```
/capabilities                     ✅ built
/capabilities/explosives-distribution
/capabilities/reagents-fertilizers
/capabilities/drill-blast
/capabilities/engineering-civil
/capabilities/tug-barge
/capabilities/supply-chain
/capabilities/sustainable-development   ✅ all built from data/capabilities.ts
/projects                         ✅ built
/contact                          ✅ built
```

Add richer per-capability content by extending the `Capability` type in
`data/capabilities.ts` and rendering the new fields in
`app/capabilities/[slug]/page.tsx`.

## Accessibility & motion

Semantic landmarks, keyboard-operable nav and form, visible gold focus rings,
alt text on every image, skip link, and full `prefers-reduced-motion` support
(animations and smooth scroll collapse to near-instant).
