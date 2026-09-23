/**
 * Derive the navigation lockup from the supplied artwork.
 *
 * The supplied file (muni-logo-light.png) is the official lockup on an opaque
 * white plate: a gold ring, a black shield, a red goat, a black "MU" and a red
 * "NI". Nothing about the artwork is changed here — no recolouring, no
 * redrawing, no effects. The only thing this does is make the plate
 * transparent, so the mark sits on whatever the page puts behind it instead of
 * carrying a white rectangle around with it.
 *
 * The plate is found by flooding inward from the image border rather than by
 * keying white globally. That distinction matters: the rock the goat stands on
 * is not a white shape of its own, it is plate showing through the shield, and
 * a global white key would punch a hole through the middle of the emblem.
 * Flooding from the edge only clears white that is actually connected to the
 * background, so the emblem stays intact.
 *
 * Usage:  npm run logo
 */
import path from "node:path";
import sharp from "sharp";

const DIR = path.join(process.cwd(), "public", "images", "logo");
const SOURCE = path.join(DIR, "muni-logo-light.png");
const OUTPUT = path.join(DIR, "muni-logo.png");

/** The navigation never renders this above ~132px tall, even at 3x. */
const WIDTH = 1200;

/** Above this max-minus-min spread a pixel is brand colour, not ink or plate. */
const CHROMA = 40;

/** A colourless pixel this light is plate, or a plate/ink blend, not artwork. */
const PLATE_LUMA = 100;

async function main() {
  const { data, info } = await sharp(SOURCE)
    .resize({ width: WIDTH })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  const isColour = (i) => {
    const max = Math.max(data[i], data[i + 1], data[i + 2]);
    const min = Math.min(data[i], data[i + 1], data[i + 2]);
    return max - min > CHROMA;
  };

  // Rec. 601 luma is close enough here and keeps the maths in integers.
  const luma = (i) =>
    (data[i] * 299 + data[i + 1] * 587 + data[i + 2] * 114) / 1000;

  const plate = new Uint8Array(width * height);
  const stack = [];

  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const p = y * width + x;
    if (plate[p]) return;
    const i = p * channels;
    // Already transparent (the plate's rounded corners), or colourless and
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

  let cleared = 0;
  for (let p = 0; p < width * height; p++) {
    if (!plate[p]) continue;
    data[p * channels + 3] = 0;
    cleared++;
  }

  // Trim the cleared plate from every edge, so the file is only as tall as
  // the mark and the navigation bar is not padded by empty pixels.
  await sharp(data, { raw: { width, height, channels } })
    .trim({ threshold: 0 })
    .png({ compressionLevel: 9, palette: false })
    .toFile(OUTPUT);

  const pct = ((100 * cleared) / (width * height)).toFixed(1);
  console.log(
    `wrote ${path.relative(process.cwd(), OUTPUT)} (${width}x${height}, plate cleared on ${pct}% of pixels)`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
