// Copies the v4 data constants verbatim into modules (asset paths made root-relative).
import fs from 'node:fs';
import path from 'node:path';
import {toWebUrls, webMap} from './web-assets.mjs';

const [, , SRC_FILE, OUT_DIR] = process.argv;
const lines = fs.readFileSync(SRC_FILE, 'utf8').split('\n');
// Line numbers below are as in the v4 file, where the data block starts at line 1141 with
// `const fmt`; they shift with any edit made above it.
const shift = lines.findIndex(l => l.startsWith('const fmt = n =>')) + 1 - 1141;
const take = (a, b) => lines.slice(a - 1 + shift, b + shift).join('\n');
const exp = s => s
  .replace(/^const fmt = n =>/m, 'export const fmt = (n: number) =>')
  .replace(/^const IMG = f =>/m, 'export const IMG = (f: string) =>')
  .replace(/^const TCPTS = \(noun\) =>/m, 'export const TCPTS = (noun: string): any[] =>')
  .replace(/^const ([A-Z_]+) =/gm, 'export const $1: any =')
  .split('./assets/').join('/assets/');
const web = s => toWebUrls(s)
  .replace("export const IMG = (f: string) => '/assets/img/' + f;", "export const IMG = (f: string) => WEB_IMG[f] || '/assets/img/' + f;");
const head = what => `// ${what}\n// Copied verbatim from "Daily Loom v4.dc.html"; asset paths are root-relative.\n/* eslint-disable */\n`;

const files = {
  'catalog.ts': [head('Shared catalog: products, categories, media and image slots.'), take(1141, 1144), take(1146, 1151), take(1171, 1219), take(1282, 1283)],
  'home-data.ts': [head('Home page data.'), take(1145, 1145), take(1167, 1170), take(1281, 1281)],
  'product-data.ts': [head('Buy page data.'), take(1152, 1152)],
  'story.server.ts': [head('Collection story copy. Served per collection by the route loader.'), take(1220, 1280)],
  'help.server.ts': [head('Help page copy. Served by the route loader.'), take(1153, 1166)],
};
fs.mkdirSync(OUT_DIR, {recursive: true});
for (const [f, parts] of Object.entries(files)) {
  const [h, ...body] = parts;
  const extra = f === 'catalog.ts' ? '// Design images on the Shopify CDN, by local file name (design/web-file-urls-*.csv).\nexport const WEB_IMG: Record<string, string> = ' + JSON.stringify(webMap(), null, 2) + ';\n' : '';
  fs.writeFileSync(path.join(OUT_DIR, f), h + extra + web(exp(body.join('\n'))) + '\n');
}
console.log(Object.keys(files).join(', '));
