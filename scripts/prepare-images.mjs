// Converts the screenshots/exports in "current site image" into web-ready assets.
// Run with: npm run images
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const src = "current site image";
const out = "public/images";
const webp = (img) => img.webp({ quality: 90 });

for (const dir of ["gallery", "before-after"]) {
  await mkdir(path.join(out, dir), { recursive: true });
}

for (let i = 1; i <= 9; i++) {
  await webp(sharp(path.join(src, `G${i}.png`))).toFile(path.join(out, "gallery", `g${i}.webp`));
}

// Each before/after export is a 500x500 graphic with both photos at fixed
// positions and "BEFORE & AFTER" text baked in — cut out just the photos.
const halves = {
  before: { left: 33, top: 82, width: 210, height: 285 },
  after: { left: 267, top: 82, width: 210, height: 285 },
};
for (let i = 1; i <= 3; i++) {
  for (const [name, region] of Object.entries(halves)) {
    await webp(sharp(path.join(src, `BnA${i}.png`)).extract(region)).toFile(
      path.join(out, "before-after", `${i}-${name}.webp`),
    );
  }
}

// Logo: the export is a white mark on a flat light-grey (230) background.
// Rebuild it as pure white with alpha taken from brightness, so it sits on any colour.
async function whiteOnTransparent(input, region) {
  const img = region ? sharp(input).extract(region) : sharp(input);
  const { data, info } = await img.removeAlpha().greyscale().raw().toBuffer({ resolveWithObject: true });
  const rgba = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < data.length; i++) {
    const alpha = Math.round(Math.min(1, Math.max(0, (data[i] - 232) / (255 - 232))) * 255);
    rgba.set([255, 255, 255, alpha], i * 4);
  }
  return sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } }).png();
}

const logo = path.join(src, "logo.PNG");
const mark = { left: 115, top: 0, width: 405, height: 418 };
await (await whiteOnTransparent(logo)).toFile(path.join(out, "logo.png"));
await (await whiteOnTransparent(logo, mark)).toFile(path.join(out, "logo-mark.png"));

// Favicon: white mark on the brand charcoal.
const markBuffer = await (await whiteOnTransparent(logo, mark)).resize({ height: 190 }).toBuffer();
await sharp({ create: { width: 256, height: 256, channels: 4, background: "#0c0d0f" } })
  .composite([{ input: markBuffer, gravity: "center" }])
  .png()
  .toFile("src/app/icon.png");

console.log("Images prepared.");
