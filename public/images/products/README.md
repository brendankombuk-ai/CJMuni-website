# Orica product imagery

Every file in this folder was extracted from the embedded images inside
**CJ MUNI / Orica Product Catalog 2026** (`Product Catalog 2026.pdf`) — the
original JPEG streams, not screenshots of the pages. Uniform white margins were
trimmed and the files re-encoded (mozjpeg, q92); nothing was upscaled, stretched
or re-cropped, so each file is at or below the resolution the catalogue held.

| File | Catalogue page | Native size |
| --- | --- | --- |
| `amex-bulk-delivery-truck.jpg` | 1 — AMEX™ (used as the page hero) | 500×360 |
| `amex-anfo-bag.jpg` | 1 — AMEX™ | 202×401 |
| `amex-explosive-bag.jpg` | 1 — AMEX™ | 240×130 |
| `pentex-cast-boosters.jpg` | 2 — PENTEX™ | 462×400 |
| `pentex-gl-product-sheet.jpg` | 2 — PENTEX™ | 306×424 |
| `exel-ms-red-detonator-coils.jpg` | 3 — EXEL™ MS | 480×445 |
| `exel-ms-yellow-detonator-coils.jpg` | 3 — EXEL™ MS | 310×409 |
| `exel-ms-downhole-detonator.jpg` | 3 and 5 (same photograph) | 412×381 |
| `enduradet-blast-box-and-tester.jpg` | 4 — ENDURADET™ | 440×316 |
| `enduradet-electronic-systems.jpg` | 4 — ENDURADET™ | 588×307 |
| `exel-signal-tube-spool.jpg` | 4 — ENDURADET™ | 207×152 |
| `connectadet-clip-connectors.jpg` | 5 — EXEL™ CONNECTADET™ | 437×438 |
| `connectadet-surface-connectors.jpg` | 5 — EXEL™ CONNECTADET™ | 422×329 |
| `cordtex-product-sheet.jpg` | 6 — CORDTEX™ | 520×723 |
| `cordtex-spools.jpg` | 7 — CORDTEX™ | 228×213 |
| `senatel-powerfrag-cartridge.jpg` | 8 — SENATEL™ | 978×187 |
| `senatel-explosives-display.jpg` | 8 — SENATEL™ | 445×321 |

Two catalogue images are not included: the Orica wordmark repeated in the page
header, and a second, tighter crop of the same PENTEX™ booster photograph that
already appears as `pentex-cast-boosters.jpg`.

## Replacing these with better originals

The catalogue's own images are small — the largest is 978 px wide — so `/products`
renders them `object-fit: contain` inside fixed frames and never blows them up.
If Orica supplies higher-resolution originals, drop them in at the same file
names and update the `width`/`height` values in `data/products.ts` to match. The
layout will not need to change.

Do not substitute generic stock photography for Orica product shots, and do not
alter Orica branding in an image.
