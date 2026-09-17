/**
 * Normalise and optimise images dropped into public/images/library/.
 *
 * Handles the common "Save As" mistakes:
 *  - double extensions:  drill-blast.jpg.png  ->  drill-blast.jpg
 *  - wrong container:     a PNG saved as .jpg  (re-encoded to real JPEG)
 *  - oversized originals: downscaled to 2400px wide, mozjpeg q82
 *
 * A source file's leading name (before the first dot) is matched, case- and
 * separator-insensitive, against the canonical slots below. Anything that
 * doesn't match is still normalised in place (deduped extension + optimised).
 *
 * Usage:  node scripts/process-images.mjs
 */
import { readdir, rename, unlink, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIR = path.join(process.cwd(), "public", "images", "library");
const MAX_WIDTH = 2400;
const QUALITY = 82;

/** aliases (normalised: lowercase, no spaces/underscores/dashes) -> canonical file */
const CANON = {
  drillblastservices: "drill-blast-services.jpg",
  drillblast: "drill-blast-services.jpg",
  drillpattern: "drill-blast-services.jpg",
  blast: "drill-blast-services.jpg",
  engineeringcivilservices: "engineering-civil-services.jpg",
  engineeringcivil: "engineering-civil-services.jpg",
  engineering: "engineering-civil-services.jpg",
  civil: "engineering-civil-services.jpg",
  earthmoving: "engineering-civil-services.jpg",
  explosives: "explosives.jpg",
  explosive: "explosives.jpg",
  bulkmaster: "explosives.jpg",
  reagentsfertilizers: "reagents-fertilizers.jpg",
  fertilizer: "reagents-fertilizers.jpg",
  fertilizers: "reagents-fertilizers.jpg",
  reagents: "reagents-fertilizers.jpg",
  warehouse: "reagents-fertilizers.jpg",
  quarryservices: "quarry-services.jpg",
  quarry: "quarry-services.jpg",
  marine: "marine.jpg",
  tugbarge: "marine.jpg",
  tug: "marine.jpg",
  barge: "marine.jpg",
  supplychainfeature: "supply-chain-feature.jpg",
  supplychain: "supply-chain-feature.jpg",
  manufacturedelivery: "supply-chain-feature.jpg",
  frommanufacture: "supply-chain-feature.jpg",
  logistics: "supply-chain-feature.jpg",
  sustainability: "sustainability.jpg",
  sustainable: "sustainability.jpg",
  project01: "project-01-drill-blast.jpg",
  project02: "project-02-explosives-supply.jpg",
  project03: "project-03-reagents-supply.jpg",
  project04: "project-04-logistics-storage.jpg",
};

const norm = (s) => s.toLowerCase().replace(/[\s_\-.]/g, "");

const isRasterSource = (name) => /\.(jpe?g|png|webp|avif|tiff?)$/i.test(name);
const alreadyCanonical = new Set(Object.values(CANON));

async function main() {
  const entries = await readdir(DIR);
  const sources = entries.filter(
    (f) => isRasterSource(f) && !/\.(md)$/i.test(f),
  );

  if (sources.length === 0) {
    console.log("No images found in", DIR);
    return;
  }

  for (const file of sources) {
    const full = path.join(DIR, file);
    // strip *all* trailing image extensions, keep the real leading name
    const base = file.replace(/(\.(jpe?g|png|webp|avif|tiff?))+$/i, "");
    const leading = base.split(".")[0];
    const target = CANON[norm(leading)] ?? `${base}.jpg`;
    const targetPath = path.join(DIR, target);

    // Skip a canonical file that is already a lean JPEG and wasn't a bad drop
    if (file === target) {
      const meta = await sharp(full).metadata();
      const { size } = await stat(full);
      if (meta.format === "jpeg" && meta.width <= MAX_WIDTH && size < 900_000) {
        console.log(`ok    ${file} (already optimised)`);
        continue;
      }
    }

    const buf = await sharp(full)
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toBuffer();

    // write to a temp name then swap, so we never clobber the source mid-read
    const tmp = targetPath + ".tmp";
    await sharp(buf).toFile(tmp);
    if (file !== target) await unlink(full).catch(() => {});
    await rename(tmp, targetPath).catch(async () => {
      await unlink(targetPath).catch(() => {});
      await rename(tmp, targetPath);
    });

    const kb = Math.round(buf.length / 1024);
    console.log(`done  ${file}  ->  ${target}  (${kb} KB)`);
  }

  const after = (await readdir(DIR)).filter(isRasterSource).sort();
  console.log("\nLibrary now:", after.join(", ") || "(empty)");
  const missing = [...alreadyCanonical].filter((f) => !after.includes(f));
  if (missing.length) console.log("Still missing:", missing.join(", "));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
