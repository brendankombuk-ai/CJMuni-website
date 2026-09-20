/**
 * Derive the dark-background lockup from the light-background one.
 *
 * The supplied lockup (muni-logo-light.png) is artwork on an opaque white
 * plate: a gold ring, a black shield, a red goat, a black "MU" and a red "NI".
 * Dropped onto the black site it would read as a white card, and keying the
 * plate out alone would leave the "MU" invisible. So this does three things,
 * in one pass over the pixels:
 *
 *   1. Flood-fills the white plate from the image border and clears it, so the
 *      page shows through wherever the plate was.
 *   2. Keeps the emblem's gold and red, and snaps its greys to true black, so
 *      nothing haloes the shield against the page.
 *   3. Repaints the wordmark's black as white, keeping the red "NI". Grey
 *      anti-aliasing becomes partial white so the letter edges stay smooth.
 *
 * Emblem and wordmark are told apart by x alone: the artwork has a 31px empty
 * gutter between them (columns 239-269), so any split inside it works.
 *
 * The rock the goat stands on is drawn as plate showing through the shield
 * rather than as its own white shape, so it reverses out with the plate — the
 * emblem reads as ring, goat and negative space, which is how a one-colour
 * reverse of this mark is meant to look.
 *
 * Usage:  node scripts/make-dark-logo.mjs
 */
import path from "node:path";
import sharp from "sharp";

const DIR = path.join(process.cwd(), "public", "images", "logo");
const SOURCE = path.join(DIR, "muni-logo-light.png");
const OUTPUT = path.join(DIR, "muni-logo-dark.png");

/** Column where the wordmark starts; inside the gutter after the emblem. */
const WORDMARK_X = 254;

/** Above this max-minus-min spread a pixel is brand colour, not ink or plate. */
const CHROMA = 40;

/** A colourless pixel this light is plate or plate/ink blend, not artwork. */
const PLATE_LUMA = 100;

async function main() {
  const { data, info } = await sharp(SOURCE)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const at = (x, y) => (y * width + x) * channels;

  const isColour = (i) => {
    const max = Math.max(data[i], data[i + 1], data[i + 2]);
    const min = Math.min(data[i], data[i + 1], data[i + 2]);
    return max - min > CHROMA;
  };

  // Rec. 601 luma is close enough here and keeps the maths in integers.
  const luma = (i) =>
    (data[i] * 299 + data[i + 1] * 587 + data[i + 2] * 114) / 1000;

  // 1. Flood the plate inward from every border pixel.
  const plate = new Uint8Array(width * height);
  const stack = [];

  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const p = y * width + x;
    if (plate[p]) return;
    const i = p * channels;
    // Transparent already (the plate's rounded corners), or colourless and
    // light enough to be plate rather than artwork.
    if (data[i + 3] < 250 || (!isColour(i) && luma(i) >= PLATE_LUMA)) {
      plate[p] = 1;
      stack.push(p);
    }
  };

  for (let x = 0; x < width; x++) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }

  while (stack.length) {
    const p = stack.pop();
    const x = p % width;
    const y = (p - x) / width;
    push(x - 1, y);
    push(x + 1, y);
    push(x, y - 1);
    push(x, y + 1);
  }

  // 2 & 3. Rewrite every pixel from what the flood found.
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const p = y * width + x;
      const i = at(x, y);

      if (plate[p]) {
        data[i + 3] = 0;
        continue;
      }

      data[i + 3] = 255;
      if (isColour(i)) continue;

      if (x < WORDMARK_X) {
        // Emblem: the shield, and the grey where it was anti-aliased against
        // the plate. Snap both to true black so no halo traces the shield.
        data[i] = 0;
        data[i + 1] = 0;
        data[i + 2] = 0;
        continue;
      }

      // Wordmark ink: black becomes solid white, grey becomes partial white.
      const alpha = Math.round(255 - luma(i));
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
      data[i + 3] = alpha < 0 ? 0 : alpha;
    }
  }

  await sharp(data, { raw: { width, height, channels } })
    .png({ compressionLevel: 9, palette: false })
    .toFile(OUTPUT);

  console.log(`wrote ${path.relative(process.cwd(), OUTPUT)} (${width}x${height})`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
