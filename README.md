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
  api/enquiry/route.ts        validated enquiry endpoint, emailed via Resend
  capabilities/page.tsx       products & services index
  capabilities/[slug]/page.tsx  product / service page (static-generated)
  products/page.tsx           Orica product catalogue — one page, seven ranges
  contact/ · projects/        contact and project pages
  sitemap.ts · robots.ts · icon.svg · not-found.tsx

components/
  Atmosphere.tsx              background-system recipes + decorative shapes
  (rest)                      Navbar, Footer, Logo, PageIntro, SmartImage,
                              HomeHero, CapabilityLinks, ProjectsTeaser,
                              CapabilityCard, Projects, Contact,
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
  capabilities.ts             PRODUCTS (2) + SERVICES (5) — single source of truth
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

`public/images/logo/muni-logo-light.png` is the supplied lockup, exactly as
supplied: the official artwork on an opaque white plate. The header uses
`muni-logo.png`, which is the same artwork with that plate made transparent:

```bash
npm run logo
```

Re-run that after replacing `muni-logo-light.png`. Nothing about the mark is
changed by it — no recolouring, no redrawing — only the plate is cleared, so
the lockup sits on the navigation instead of on a white rectangle inside it.

The plate is found by flooding inward from the image border, not by keying
white globally. The rock the goat stands on is not a white shape of its own, it
is plate showing through the shield, so a global white key would punch a hole
through the middle of the emblem.

Never distort, recolour or add effects to the official mark, and never alter
the goat.

## Content rules

Copy uses only the approved high-level descriptions from the CJ MUNI Corporate
Brand Guidelines and the supplied business profile. **Quarry Services**, **Tug
& Barge** and **Sustainable Development Projects** are deliberately high-level —
the source material does not support detailed claims. No invented statistics,
certifications, clients or project history.

### Page structure

The site is multi-page. Every navigation link is a real route, not an in-page
anchor:

```
/                       short signpost home page
/capabilities           products (2) and services (5)
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

The home page runs: hero -> what we do (links to all 7 capabilities) -> recent
work (3 projects). Everything on it has a fuller page behind it, so it stays
short.

No page carries a closing contact band. The details it repeated — email, the
three numbers, the address — are in the footer of every page, and "Request an
Enquiry" is in the sticky navigation, so the band was saying a third time what
the page already said twice.

Pages are black: black backgrounds, white text, gold as an accent, red kept for
the emblem. Content is not animated in on scroll — it renders immediately.

Two deliberate exceptions to the black:

- **The navigation is a solid white bar.** It is sticky, so it cannot be
  translucent without turning the content scrolling beneath it into noise, and
  the lockup is artwork on a white plate, so white is what lets the mark sit in
  the navigation rather than on a card inside it. Its links are charcoal on
  white; the current page is marked with gold rule rather than gold type,
  because the brand gold is only 2.8:1 on white. Its bottom edge is a gold rule
  with a single light travelling along it — the site's only continuous
  animation, decoration only, and hidden outright under reduced motion, leaving
  the rule it travels along in place.
- **The product frames on `/products` stay white**, because the Orica catalogue
  shots are cut-outs on white and a dark frame would put a ragged white
  rectangle inside one.

### The background system

Sections are not flat fills. Each one is lit by a shared system — see the
`BACKGROUND SYSTEM` block in `app/globals.css` and `components/Atmosphere.tsx` —
that paints two decorative layers behind the section's own content:

```
::before   seam (top rule) + brand glow + surface tint
::after    texture, masked so it fades out
```

Both are pointer-transparent and negatively stacked, so they can never sit
between a visitor and a link. Everything about them is driven by custom
properties, which is what lets a section change character by changing its class
list rather than by gaining CSS of its own:

| axis        | classes                                                                                 |
| ----------- | --------------------------------------------------------------------------------------- |
| surface     | `section-dark` · `section-dark-alt` · `section-gradient` · `section-feature` · `section-continue` |
| texture     | `texture-grid` · `texture-blueprint` · `texture-hatch` · `texture-diagonal` · `texture-dots` · `texture-horizon` · `texture-contour` · `texture-grain` |
| light source| `atmo-tl/tr/bl/br/top/left/right` · `atmo-soft/medium/strong` · `atmo-wide/tight` · `atmo-warm` |
| seam        | `seam-top` · `seam-top-quiet` · `seam-bottom-edge`                                        |

`components/Atmosphere.tsx` names the combinations. `atmosphere("marine")`
returns the class list for a section, `<Atmosphere variant="marine" />` renders
that variant's oversized background shapes, and each capability in
`data/capabilities.ts` carries the variant its pages are lit with — so explosives
reads industrial, reagents reads like a laboratory, tug and barge reads marine,
and all of them are built from the same primitives.

Two rules hold the whole thing together:

- **Every surface is a translucent tint, never an opaque fill.** An opaque
  section has to end somewhere and leaves a step wherever it does. A tint that
  fades out at its own edges has nothing to step against, so the page background
  runs unbroken underneath and sections dissolve into one another.
- **No `filter: blur()` anywhere.** Soft radial gradients reach the same place
  without asking the compositor to blur a 40rem surface every frame. Motion is
  `transform`/`opacity` only, and every keyframe rests at 0% and 100% so the
  reduced-motion override collapses it to a no-op rather than a jump.

## Enquiry form

`POST /api/enquiry` validates with zod and emails the submission to CJ MUNI
through [Resend](https://resend.com). Resend is called over its REST API with
`fetch` rather than through its SDK — that would be a dependency, a bundle and
a version to track in exchange for wrapping one POST request.

| Variable | | |
| --- | --- | --- |
| `RESEND_API_KEY` | **required** | From the Resend dashboard. |
| `ENQUIRY_FROM` | optional | Sender, which must be on a domain verified in Resend. Defaults to Resend's shared `onboarding@resend.dev`, which works immediately but is only meant for testing. Set it to something like `CJ MUNI Website <enquiries@cjmuni.com>` once the domain is verified. |
| `ENQUIRY_TO` | optional | Defaults to the public address in `data/site.ts`. |

Set them on the Vercel project (all three environments), then `vercel env pull`
for local work.

**Without `RESEND_API_KEY` the endpoint returns 503, it does not pretend to
have sent.** Answering "ok" with no mail configured loses the enquiry silently:
the visitor believes they have been in touch and nobody ever sees it. Failing
puts the form into its error state, which shows the address on the page and
invites them to email directly.

Two details that matter for deliverability:

- The message is sent **from** the verified domain, never from the visitor's
  address. Sending as the visitor fails SPF and DMARC and lands in spam.
- `reply_to` is set to the visitor, so replying in the mail client goes to the
  person who enquired rather than back to the sending domain.

### Abuse protection

The endpoint is public, unauthenticated and sends mail, so an open loop against
it costs real money and buries genuine enquiries under noise. Three layers:

- **Honeypot.** The form carries a hidden `website` field. People never see it;
  bots that fill every input do. A submission with it filled gets a `200` and is
  silently dropped — answering with an error would only tell the bot what to
  change.
- **Per-IP rate limit.** Five submissions per ten minutes, then `429` with
  `Retry-After`. The window lives in instance memory: Fluid Compute reuses
  instances across requests, so this stops the ordinary case, but it is not a
  guarantee across every instance.
- **Vercel Firewall.** The durable layer, and the one that is *not* yet set up.
  Add a rate-limit rule on `/api/enquiry` in the project's Firewall settings so
  abuse is turned away at the edge, before it reaches a function at all.

## Security headers

`next.config.mjs` sets a CSP plus `X-Frame-Options`, `X-Content-Type-Options`,
`Referrer-Policy`, `Permissions-Policy` and HSTS on every route.

The CSP allows `'unsafe-inline'` for scripts because Next injects its bootstrap
inline and the organisation JSON-LD in `app/layout.tsx` is an inline tag. That
weakens the script rule against an injected inline payload, but the policy still
blocks scripts from any other origin — the realistic risk for a site with no
third-party embeds. If a third-party script is ever added (analytics, chat,
tag manager), switch to per-request nonces in middleware rather than widening
the policy.

Fonts are self-hosted — `next/font` downloads Montserrat and Inter at build time
and serves them from `/_next` — so no Google origin is needed at runtime.

## Phase two

The design system, components and data are structured so these routes can be
added without a redesign:

```
/capabilities                     ✅ built
/capabilities/explosives-distribution
/capabilities/reagents-fertilizers
/capabilities/drill-blast
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
