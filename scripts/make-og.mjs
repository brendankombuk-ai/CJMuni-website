/**
 * Build the social sharing card at app/opengraph-image.png.
 *
 * The card is the site's own look rather than a new invention: the white
 * navigation band carrying the lockup, the gold rule beneath it, then the
 * black field with the positioning line and the promise.
 *
 * Type is set in a generic sans on purpose. Montserrat is not installed on the
 * machines that run this, and the headline weight it would need cannot be
 * faked convincingly — so the brand typography is carried by the artwork, which
 * is the real lockup, and the supporting lines stay deliberately plain. If
 * Montserrat is ever available locally, swap FONT below.
 *
 * Usage:  npm run og
 */
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const LOGO = path.join(ROOT, "public", "images", "logo", "muni-logo.png");
const OUTPUT = path.join(ROOT, "app", "opengraph-image.png");

const W = 1200;
const H = 630;
const BAND = 168;          // white navigation band
const RULE = 6;            // the gold edge under it
const PAD = 80;
const GOLD = "#F1AF21";
const FONT = "Arial, Helvetica, sans-serif";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const overlay = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="${W}" height="${H}" fill="#000000"/>
  <rect x="0" y="0" width="${W}" height="${BAND}" fill="#FFFFFF"/>
  <rect x="0" y="${BAND}" width="${W}" height="${RULE}" fill="${GOLD}"/>

  <text x="${PAD}" y="300" fill="${GOLD}" font-family="${FONT}"
        font-size="23" font-weight="700" letter-spacing="6.5">
    ${esc("THE POWER OF PARTNERSHIP")}
  </text>
  <rect x="${PAD}" y="330" width="96" height="3" fill="${GOLD}"/>

  <text x="${PAD}" y="432" fill="#FFFFFF" font-family="${FONT}"
        font-size="68" font-weight="700" letter-spacing="-1">
    ${esc("CONNECTED CAPABILITY.")}
  </text>
  <text x="${PAD}" y="512" fill="#FFFFFF" font-family="${FONT}"
        font-size="68" font-weight="700" letter-spacing="-1">
    ${esc("RELIABLE DELIVERY.")}
  </text>

  <text x="${PAD}" y="578" fill="#8A8A8A" font-family="${FONT}"
        font-size="24" font-weight="400">
    ${esc("Papua New Guinea \u00B7 cjmuni.com")}
  </text>
</svg>`;

async function main() {
  const logoHeight = 92;
  const logo = await sharp(LOGO)
    .resize({ height: logoHeight })
    .toBuffer();
  const { height: lh } = await sharp(logo).metadata();

  await sharp(Buffer.from(overlay))
    .composite([
      { input: logo, left: PAD, top: Math.round((BAND - (lh ?? logoHeight)) / 2) },
    ])
    .png()
    .toFile(OUTPUT);

  const { size, width, height } = await sharp(OUTPUT).metadata();
  console.log(
    `og image -> ${path.relative(ROOT, OUTPUT)} ${width}x${height} ${Math.round((size ?? 0) / 1024)}kB`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
