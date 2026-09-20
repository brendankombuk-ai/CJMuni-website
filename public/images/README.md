# CJ MUNI image slots

Every image on the site is a **slot**. Drop a correctly named file into the
folder below and it replaces the placeholder automatically — no code changes.
If a file is missing, a CJ MUNI-styled placeholder renders instead of a broken
image.

All images are rendered with `object-fit: cover` and responsive `sizes`. Supply
high-resolution landscape/portrait source and let `next/image` do the rest.
Prefer authentic, operational, safety-conscious, PNG-focused photography with
correct PPE. Avoid staged corporate handshake shots.

## Logo

| File | Use |
| --- | --- |
| `logo/muni-logo-light.png` | The supplied lockup — artwork on a white plate |
| `logo/muni-logo-dark.png` | Reverse lockup for the black page — what the header renders |

The dark file is generated, not drawn: replace `muni-logo-light.png` and re-run
`node scripts/make-dark-logo.mjs` to rebuild it. Do **not** stretch, recolour,
rotate, add glow/shadow/3D, or alter the goat.

## Hero

| File | Recommended |
| --- | --- |
| `hero/hero-main.jpg` | 2400×1600+, landscape, subject weighted left/centre |

## Services (one per capability)

| File | Capability |
| --- | --- |
| `services/explosives.jpg` | 01 Explosives Distribution & Application |
| `services/reagents.jpg` | 02 Reagents & Fertilizers |
| `services/drill-blast.jpg` | 03 Drill & Blast Services |
| `services/engineering.jpg` | 04 Engineering & Civil Works |
| `services/marine.jpg` | 05 Tug & Barge Services |
| `services/supply-chain.jpg` | 06 End-to-End Supply Chain |
| `services/sustainability.jpg` | 07 Sustainable Project Development |

## Features

| File | Use |
| --- | --- |
| `features/supply-chain.jpg` | Supply-chain cinematic section |
| `features/capability.jpg` | Reserved for future capability feature |

## Industries

`industries/mining.jpg`, `metals.jpg`, `oil-gas.jpg`, `agriculture.jpg`,
`water.jpg`, `infrastructure.jpg`, `quarries.jpg`, `exploration.jpg`,
`industrial.jpg`

## Projects

`projects/project-01.jpg` … `projects/project-04.jpg`

Replace the placeholder copy in `data/projects.ts` at the same time — set
`placeholder: false` once real detail is in.
