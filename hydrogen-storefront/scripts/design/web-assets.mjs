// Maps local design images (public/assets/img/<name>) to their Shopify CDN URLs,
// from the upload list in design/web-file-urls-*.csv (files uploaded as "web-<name>").
// A local file with a .jpg name that is really PNG data was uploaded as web-<stem>.png.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const CSV = path.join(ROOT, 'design', 'web-file-urls-20261020-a7f3.csv');
const IMG_DIR = path.join(ROOT, 'public', 'assets', 'img');

const urls = new Map(
  fs.readFileSync(CSV, 'utf8').trim().split(/\r?\n/).slice(1).map(l => {
    const i = l.indexOf(',');
    return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
  }),
);
const isPng = f => { try { return fs.readFileSync(f).subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])); } catch { return false; } };

/** CDN URL for a local image file name, or null when it was not uploaded. */
export function webUrl(name) {
  if (urls.has('web-' + name)) return urls.get('web-' + name);
  const png = 'web-' + name.replace(/\.jpe?g$/i, '.png');
  if (png !== 'web-' + name && urls.has(png) && isPng(path.join(IMG_DIR, name))) return urls.get(png);
  return null;
}

/** Replaces every "/assets/img/<name>" in source text that has a CDN copy. */
export const toWebUrls = text => text.replace(/\/assets\/img\/([A-Za-z0-9_.-]+\.(?:png|jpe?g|webp))/g, (m, n) => webUrl(n) || m);

/** All uploaded design images, local name → CDN URL. */
export function webMap() {
  const out = {};
  for (const f of fs.readdirSync(IMG_DIR).sort()) { const u = webUrl(f); if (u) out[f] = u; }
  return out;
}
