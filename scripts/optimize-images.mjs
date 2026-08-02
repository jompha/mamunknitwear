import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const srcDir = path.join(process.cwd(), 'migration', 'raw-assets');
const outDir = path.join(process.cwd(), 'src', 'assets', 'images');
fs.mkdirSync(outDir, { recursive: true });

const plan = [
  { name: 'hero-factory.jpg', maxWidth: 1440, q: 74, convert: 'jpeg' },
  { name: 'about-building.jpg', maxWidth: 590, q: 76, convert: 'jpeg' },
  { name: 'svc-knitting.jpg', maxWidth: 900, q: 75, convert: 'jpeg' },
  { name: 'svc-sample.jpg', maxWidth: 900, q: 75, convert: 'jpeg' },
  { name: 'svc-cutting.jpg', maxWidth: 900, q: 75, convert: 'jpeg' },
  { name: 'svc-sewing.jpg', maxWidth: 900, q: 75, convert: 'jpeg' },
  { name: 'svc-finishing.jpg', maxWidth: 900, q: 75, convert: 'jpeg' },
  { name: 'svc-embroidery.jpg', maxWidth: 900, q: 75, convert: 'jpeg' },
  { name: 'knitting-01.jpg', maxWidth: 1200, q: 75, convert: 'jpeg' },
  { name: 'knitting-02.jpg', maxWidth: 1200, q: 75, convert: 'jpeg' },
  { name: 'knitting-03.jpg', maxWidth: 1200, q: 75, convert: 'jpeg' },
  { name: 'knitting-04.jpg', maxWidth: 1200, q: 75, convert: 'jpeg' },
  { name: 'printing-01.jpg', maxWidth: 1200, q: 75, convert: 'jpeg' },
  { name: 'printing-02.jpg', maxWidth: 1200, q: 75, convert: 'jpeg' },
  { name: 'printing-03.jpg', maxWidth: 1200, q: 75, convert: 'jpeg' },
  { name: 'printing-04.jpg', maxWidth: 1200, q: 75, convert: 'jpeg' },
  { name: 'sewing-01.jpg', maxWidth: 1200, q: 75, convert: 'jpeg' },
  { name: 'sewing-02.jpg', maxWidth: 1200, q: 75, convert: 'jpeg' },
  { name: 'sewing-03.jpg', maxWidth: 1200, q: 75, convert: 'jpeg' },
  { name: 'sewing-04.jpg', maxWidth: 1200, q: 75, convert: 'jpeg' },
  { name: 'news-chairman-cip.jpg', maxWidth: 900, q: 75, convert: 'jpeg' },
  { name: 'news-featured-01.jpg', maxWidth: 900, q: 75, convert: 'jpeg' },
  { name: 'news-featured-02.jpg', maxWidth: 900, q: 75, convert: 'jpeg' },
  { name: 'news-featured-03.jpg', maxWidth: 900, q: 75, convert: 'jpeg' },
  { name: 'news-featured-04.jpg', maxWidth: 900, q: 75, convert: 'jpeg' },
  { name: 'team-mofizul-sm.jpg', maxWidth: 560, q: 75, convert: 'jpeg' },
  { name: 'team-mofizul.jpg', maxWidth: 900, q: 75, convert: 'jpeg' },
  { name: 'team-mamunur.jpg', maxWidth: 560, q: 75, convert: 'jpeg' },
  { name: 'logo.png', maxWidth: 1200, q: 90, convert: 'png' },
  { name: 'client-pepe-jeans.png', maxWidth: 220, q: 90, convert: 'png' },
  { name: 'client-la-halle.png', maxWidth: 220, q: 90, convert: 'png' },
  { name: 'client-sports-world.png', maxWidth: 220, q: 90, convert: 'png' },
  { name: 'client-pierre-cardin.png', maxWidth: 220, q: 90, convert: 'png' },
  { name: 'client-slazenger.png', maxWidth: 220, q: 90, convert: 'png' },
  { name: 'cert-bsci.png', maxWidth: 220, q: 90, convert: 'png' },
  { name: 'cert-intertek.png', maxWidth: 220, q: 90, convert: 'png' },
  { name: 'cert-sedex.png', maxWidth: 220, q: 90, convert: 'png' },
  { name: 'cert-oeko-tex.png', maxWidth: 220, q: 90, convert: 'png' },
  { name: 'cert-wrap.png', maxWidth: 220, q: 90, convert: 'png' },
  { name: 'cert-iso-14001.png', maxWidth: 220, q: 90, convert: 'png' },
  { name: 'cert-ohsas.png', maxWidth: 220, q: 90, convert: 'png' },
  { name: 'cert-organic.png', maxWidth: 220, q: 90, convert: 'png' },
];

const report = [];
let ok = 0;
let fail = 0;
for (const p of plan) {
  const src = path.join(srcDir, p.name);
  const out = path.join(outDir, p.name);
  if (!fs.existsSync(src)) {
    fail++;
    report.push({ source: p.name, status: 'MISSING' });
    continue;
  }
  const origSize = fs.statSync(src).size;
  try {
    let pipe = sharp(src).rotate().resize({ width: p.maxWidth, withoutEnlargement: true });
    if (p.convert === 'jpeg') pipe = pipe.jpeg({ quality: p.q, mozjpeg: true });
    else pipe = pipe.png({ quality: p.q, compressionLevel: 9 });
    await pipe.toFile(out);
    const optSize = fs.statSync(out).size;
    ok++;
    report.push({
      source: src,
      destination: out,
      originalSize: origSize,
      optimizedSize: optSize,
      savingPercent: Math.round(((origSize - optSize) / origSize) * 100),
      status: 'OK',
    });
    console.log(
      `OK ${p.name.padEnd(26)} ${(origSize / 1024).toFixed(0)}KB -> ${(optSize / 1024).toFixed(0)}KB (-${Math.round(
        ((origSize - optSize) / origSize) * 100,
      )}%)`,
    );
  } catch (e) {
    fail++;
    report.push({ source: src, status: 'ERROR', error: e.message });
    console.log(`ERR ${p.name}: ${e.message}`);
  }
}
// copy remaining raw files not in plan (favicons) into public
const favSrc = path.join(srcDir, 'favicon-32.png');
const favDest = path.join(process.cwd(), 'public', 'favicon-32.png');
if (fs.existsSync(favSrc)) fs.copyFileSync(favSrc, favDest);
fs.copyFileSync(
  path.join(srcDir, 'favicon-192.png'),
  path.join(process.cwd(), 'public', 'favicon-192.png'),
);
fs.copyFileSync(
  path.join(srcDir, 'favicon-180.png'),
  path.join(process.cwd(), 'public', 'favicon-180.png'),
);
fs.copyFileSync(
  path.join(srcDir, 'favicon-270.png'),
  path.join(process.cwd(), 'public', 'favicon-270.png'),
);

fs.writeFileSync(
  path.join(process.cwd(), 'migration', 'asset-manifest.json'),
  JSON.stringify(report, null, 2),
);
console.log(`\nDONE: ${ok} ok, ${fail} failed. Manifest written to migration/asset-manifest.json`);
