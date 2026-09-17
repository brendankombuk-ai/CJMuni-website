# Shared photo library

Save photos here, then run `npm run images` (from the project root). The script
strips bad "Save As" extensions (`name.jpg.png` -> `name.jpg`), matches the
filename to a slot, downscales to 2400px and compresses. Anything unmatched is
still normalised in place.

Match the **leading filename** to a slot (case / spaces / dashes don't matter):

| Filename you save | Canonical file | Appears in |
| --- | --- | --- |
| `explosives` / `bulkmaster` | `explosives.jpg` | Explosives Manufacture & Supply card + product page |
| `reagents` / `fertilizer` / `warehouse` | `reagents-fertilizers.jpg` | Fertilizer & Reagents card + product page |
| `drill-blast` / `blast` | `drill-blast-services.jpg` | Drill & Blast card + service page |
| `quarry` | `quarry-services.jpg` | Quarry Services card + service page |
| `civil` / `engineering` / `earth-moving` | `engineering-civil-services.jpg` | Civil & Earth Moving card + service page |
| `marine` / `tug` / `barge` | `marine.jpg` | Tug & Barge card + service page |
| `supply-chain` / `logistics` | `supply-chain-feature.jpg` | End-to-End Supply Chain card + service page |
| `sustainability` / `sustainable` | `sustainability.jpg` | Sustainable Development Projects card + service page |
| `project01` | `project-01-drill-blast.jpg` | Project 01 |
| `project02` | `project-02-explosives-supply.jpg` | Project 02 |
| `project03` | `project-03-reagents-supply.jpg` | Project 03 |
| `project04` | `project-04-logistics-storage.jpg` | Project 04 |

The hero photo lives outside this folder at `../hero/hero-main.jpg` and is not
handled by the script.

Recommended source: ~2000-2800px wide, landscape.

## Still showing the previous CJ MUNI logo

These slots kept their original photography because no replacement was
supplied. Drop a new file over the same filename and run `npm run images`:

- `marine.jpg` — Tug & Barge
- `supply-chain-feature.jpg` — End-to-End Supply Chain
- `sustainability.jpg` — Sustainable Development Projects
