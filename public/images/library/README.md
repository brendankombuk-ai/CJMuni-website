# Shared photo library

Save photos here, then run `npm run images` (from the project root). The script
strips bad "Save As" extensions (`name.jpg.png` → `name.jpg`), matches the
filename to a slot, downscales to 2400px and compresses. Anything unmatched is
still normalised in place.

Match the **leading filename** to a slot (case / spaces / dashes don't matter):

| Filename you save | Canonical file | Appears in |
| --- | --- | --- |
| `hero` / `drill-blast` / `blast` | `drill-blast.jpg` | Hero, Mining environment, Project 01 |
| `drill-blast-services` | `drill-blast-services.jpg` | Drill & Blast Services card + service page |
| `explosives` | `explosives.jpg` | Explosives Distribution & Application card |
| `reagents` / `warehouse` | `reagents-warehouse.jpg` | Project 02 |
| `reagents-fertilizers` | `reagents-fertilizers.jpg` | Reagents & Fertilizers card + service page |
| `supply-chain` / `manufacture-delivery` / `logistics` | `supply-chain-feature.jpg` | "From manufacture to delivery" cinematic section |
| `engineering` / `civil` | `engineering-civil.jpg` | Infrastructure environment, Project 04 |
| `engineering-civil-services` | `engineering-civil-services.jpg` | Engineering & Civil Works card + service page |
| `marine` / `tug` / `barge` | `marine.jpg` | Tug & Barge Services card |
| `sustainability` / `sustainable` | `sustainability.jpg` | Sustainable Project Development card, Agriculture environment |
| `field` / `field-vehicle` / `landcruiser` | `field-vehicle.jpg` | Exploration environment, Project 03 |

Recommended source: ~2000–2800px wide, landscape.

## Still on styled placeholders (no photo supplied)

- `../industries/` — metals, oil-gas, water, quarries, industrial
