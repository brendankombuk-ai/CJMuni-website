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
  contact/ · projects/        phase-two routes reusing landing sections
  sitemap.ts · robots.ts · icon.svg · not-found.tsx

components/                   Navbar, Hero, Products, Services, CapabilitySection,
                              CapabilityCard, FrontierAgri, Projects, Contact,
                              EnquiryForm, FinalCta, Footer, Logo, SectionHeading,
                              PageIntro, Reveal, SmartImage
                              (unused, kept for reuse: CapabilityGrid,
                              ConnectedCapability, WhyMuni, SupplyChainFeature,
                              Industries)

data/
  site.ts                     nav, brand statements, verified contact details
  capabilities.ts             PRODUCTS (2) + SERVICES (6) — single source of truth
  frontier.ts                 Frontier Agri — the agriculture arm
  industries.ts · projects.ts

public/images/                image slots — see public/images/README.md
```

## Brand

| Token | Hex | Role |
| --- | --- | --- |
| CJ MUNI Gold | `#F1AF21` | Primary accent — lines, numbers, buttons, hover |
| CJ MUNI Black | `#000000` | Structure, headings, panels |
| Goat Red | `#E12129` | Signature detail only — used sparingly |
| Charcoal | `#4A4A4A` | Secondary text / panels |
| White | `#FFFFFF` | Primary background |

Type: **Montserrat** (headings, 700/800) · **Inter** (body/technical).

### Logo

The official CJ MUNI artwork is **not** in this repo. Add:

- `public/images/logo/muni-lockup.svg` — full lockup (header/footer)
- `public/images/logo/muni-emblem.svg` — goat emblem (compact/favicon)

`public/images/logo/frontier-agri-logo.png` is the Frontier Agri mark shown in
the Frontier Agri section. Its source PNG has an opaque white background (no
alpha), so it is always placed on a white panel — on a dark surface the black
wordmark would disappear.

then swap the placeholder in `components/Logo.tsx`. Never distort, recolour or
add effects to the official mark, and never alter the goat.

## Content rules

Copy uses only the approved high-level descriptions from the CJ MUNI Corporate
Brand Guidelines and the supplied business profile. **Quarry Services**, **Civil
& Earth Moving**, **Tug & Barge** and **Sustainable Development Projects** are
deliberately high-level — the source material does not support detailed claims.
No invented statistics, certifications, clients or project history.

### Page structure

The landing page runs: Hero -> Products (2) -> Services (6) -> Frontier Agri ->
Projects -> Contact -> closing CTA. Products and services sit on black;
Frontier Agri breaks to white so the agriculture arm reads as a separate part
of the business.

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
