// Converts the Daily Loom v4 dc template into React view components that
// produce the same React element tree the dc-runtime (support.js) builds.
import fs from 'node:fs';
import path from 'node:path';
import {parseFragment} from 'parse5';
import {toWebUrls} from './web-assets.mjs';

const [, , SRC_FILE, OUT_DIR] = process.argv;
const src = fs.readFileSync(SRC_FILE, 'utf8');

// --- same slicing + encoding the runtime does (parseDcText / encodeCase) ---
const open = /<x-dc(?:\s[^>]*)?>/.exec(src);
let html = src.slice(open.index + open[0].length, src.lastIndexOf('</x-dc>'));
html = html.replace(/<helmet(\s|>)/gi, '<sc-helmet$1').replace(/<\/helmet\s*>/gi, '</sc-helmet>');
const CAMEL = 'sc-camel-';
html = html.replace(/(\s)([a-z]+[A-Z][A-Za-z0-9]*)(\s*=)/g, (_, sp, n, eq) => sp + CAMEL + n.replace(/[A-Z]/g, c => '-' + c.toLowerCase()) + eq);
// Pages now live at nested URLs, so document-relative asset paths become root-relative.
html = html.split('./assets/').join('/assets/');
// Design images are served from the Shopify CDN (design/web-file-urls-*.csv).
html = toWebUrls(html);

const frag = parseFragment(html);

const kebabToCamel = s => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
function cssToObj(css) {
  const o = {};
  for (const decl of css.split(';')) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    const prop = decl.slice(0, i).trim();
    o[prop.startsWith('--') ? prop : kebabToCamel(prop)] = decl.slice(i + 1).trim();
  }
  return o;
}
function importantify(css) {
  const decls = [];
  let start = 0, depth = 0, quote = '';
  for (let i = 0; i < css.length; i++) {
    const c = css[i];
    if (quote) { if (c === '\\') i++; else if (c === quote) quote = ''; }
    else if (c === "'" || c === '"') quote = c;
    else if (c === '(') depth++;
    else if (c === ')') depth = Math.max(0, depth - 1);
    else if (c === ';' && depth === 0) { decls.push(css.slice(start, i)); start = i + 1; }
  }
  decls.push(css.slice(start));
  return decls.map(d => d.trim()).filter(Boolean).map(d => /!\s*important$/i.test(d) ? d : d + ' !important').join(';');
}

// pseudo-class sheet, registered in the runtime's pre-order compile order
const pseudo = new Map();
const pseudoRules = [];
function pseudoClass(name, css) {
  const k = name + '|' + css;
  if (pseudo.has(k)) return pseudo.get(k);
  const cls = 'scp' + pseudo.size.toString(36);
  const isEl = name === 'before' || name === 'after';
  pseudoRules.push((isEl ? '.' + cls + '::' + name : '.' + cls + ':' + name) + '{' + (isEl ? css : importantify(css)) + '}');
  pseudo.set(k, cls);
  return cls;
}

const EVENT_MAP = {onclick:'onClick',onchange:'onChange',oninput:'onInput',onsubmit:'onSubmit',onkeydown:'onKeyDown',onpointerdown:'onPointerDown'};
const SVG_ATTR = {'stroke-width':'strokeWidth','stroke-linecap':'strokeLinecap','stroke-linejoin':'strokeLinejoin','fill-rule':'fillRule','clip-rule':'clipRule'};
const IDENT = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

// {{ path }} -> JS expression against the current scope
function expr(p, scope) {
  p = p.trim();
  if (p === 'true' || p === 'false') return p;
  if (!/^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\.\d+)*$/.test(p)) throw new Error('unsupported binding: ' + p);
  const [head, ...rest] = p.split('.');
  const base = scope.includes(head) ? head : 'vals.' + head;
  return base + rest.map(r => '?.' + r).join('');
}
const js = s => JSON.stringify(s);
const tpl = s => s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
function attrValue(raw, scope) {
  const whole = raw.match(/^\s*\{\{([\s\S]+?)\}\}\s*$/);
  if (whole) return {kind: 'expr', code: expr(whole[1], scope)};
  if (raw.includes('{{')) {
    const parts = raw.split(/\{\{([\s\S]+?)\}\}/g);
    return {kind: 'tpl', code: '`' + parts.map((s, i) => i & 1 ? '${S(' + expr(s, scope) + ')}' : tpl(s)).join('') + '`'};
  }
  return {kind: 'lit', code: js(raw), raw};
}
function objLiteral(o) {
  return '{' + Object.entries(o).map(([k, v]) => (IDENT.test(k) ? k : js(k)) + ': ' + js(v)).join(', ') + '}';
}

const attr = (el, n) => (el.attrs.find(a => a.name === n) || {}).value;
const VIEW_KEYS = {isHome: 'Home', isStory: 'Story', isProduct: 'Product', isHelp: 'Help', isAccount: 'Account'};
const views = {};

function walkChildren(node, scope, ind, ctx) {
  return node.childNodes.map(c => walk(c, scope, ind, ctx)).filter(x => x != null);
}
function walk(node, scope, ind, ctx) {
  if (node.nodeName === '#text') return walkText(node.value, scope, ind);
  if (node.nodeName === '#comment' || !node.tagName) return null;
  const tag = node.tagName;
  if (tag === 'sc-helmet') return null;
  if (tag === 'sc-for') {
    const list = attrValue(attr(node, 'list'), scope).code;
    const as = attr(node, 'as') || 'item';
    const kids = walkChildren(node, [...scope, as], ind + '    ', ctx);
    return `${ind}{L(${list}).map((${as}, i${scope.length}) => (\n${ind}  <Fragment key={i${scope.length}}>\n${kids.join('\n')}\n${ind}  </Fragment>\n${ind}))}`;
  }
  if (tag === 'sc-if') {
    const v = attr(node, 'value');
    const key = (v.match(/^\s*\{\{\s*(\w+)\s*\}\}\s*$/) || [])[1];
    if (ctx.root && VIEW_KEYS[key]) {
      // a top-level view: becomes its own route component
      views[VIEW_KEYS[key]] = walkChildren(node, scope, '      ', {root: false});
      if (ctx.outletPlaced) return null;
      ctx.outletPlaced = true;
      return `${ind}{children}`;
    }
    const cond = attrValue(v, scope).code;
    const kids = walkChildren(node, scope, ind + '  ', ctx);
    return `${ind}{${cond} ? (\n${ind}  <>\n${kids.join('\n')}\n${ind}  </>\n${ind}) : null}`;
  }
  return walkElement(node, scope, ind, ctx);
}
function walkText(txt, scope, ind) {
  if (!txt.includes('{{')) {
    if (!txt.trim() && !txt.includes(' ')) return null;
    return `${ind}{${js(txt)}}`;
  }
  const parts = txt.split(/\{\{([\s\S]+?)\}\}/g);
  return ind + parts.map((p, i) => i & 1 ? `{I(${expr(p, scope)})}` : (p ? `{${js(p)}}` : '')).join('');
}
function walkElement(el, scope, ind, ctx) {
  const props = [];
  const classes = [];
  for (const {name, value} of el.attrs) {
    let key = name.startsWith(CAMEL) ? kebabToCamel(name.slice(CAMEL.length)) : name;
    if (key.startsWith('style-')) { classes.push(pseudoClass(key.slice(6), value)); continue; }
    if (key === 'class') key = 'className';
    else if (key === 'for') key = 'htmlFor';
    else if (key.startsWith('on')) key = EVENT_MAP[key.toLowerCase()] || 'on' + key[2].toUpperCase() + key.slice(3);
    key = SVG_ATTR[key] || key;
    const val = attrValue(value, scope);
    if (key === 'style') {
      if (val.kind === 'lit') props.push(`style={${objLiteral(cssToObj(val.raw))}}`);
      else props.push(`style={css(${val.code})}`);
    } else if ((key === 'value' || key === 'checked') && val.kind === 'expr') {
      props.push(`${key}={VAL(${val.code})}`);
    } else if (key.startsWith('on') && val.kind !== 'expr') {
      throw new Error('literal event handler on ' + el.tagName);
    } else {
      props.push(val.kind === 'lit' ? `${key}=${val.code}` : `${key}={${val.code}}`);
    }
  }
  if (classes.length) props.push(`className=${js(classes.join(' '))}`);
  const open = `<${el.tagName}${props.length ? ' ' + props.join(' ') : ''}`;
  const kids = walkChildren(el, scope, ind + '  ', ctx);
  if (!kids.length) return `${ind}${open} />`;
  return `${ind}${open}>\n${kids.join('\n')}\n${ind}</${el.tagName}>`;
}

const rootDiv = frag.childNodes.find(n => n.tagName === 'div');
// also register helmet-free walk order: the runtime walks every node of the fragment
const shell = walkElement(rootDiv, [], '    ', {root: true, outletPlaced: false});

const HEADER = `// @ts-nocheck
/* eslint-disable */
// Generated from "Daily Loom v4.dc.html" by the dc → React converter.
// Mirrors the element tree the dc-runtime renders for this part of the page.
import {Fragment, type ReactNode} from 'react';
import {css, I, L, S, VAL} from '../runtime';
`;
const unusedSafe = '';
fs.mkdirSync(path.join(OUT_DIR, 'views'), {recursive: true});
fs.writeFileSync(path.join(OUT_DIR, 'views', 'ShellView.tsx'),
  HEADER + unusedSafe + `\nexport function ShellView({vals, children}: {vals: any; children: ReactNode}) {\n  return (\n${shell}\n  );\n}\n`);
for (const [name, kids] of Object.entries(views)) {
  fs.writeFileSync(path.join(OUT_DIR, 'views', name + 'View.tsx'),
    HEADER.replace(', type ReactNode', '') + unusedSafe + `\nexport function ${name}View({vals}: {vals: any}) {\n  return (\n    <>\n${kids.join('\n')}\n    </>\n  );\n}\n`);
}
fs.writeFileSync(path.join(OUT_DIR, 'pseudo.css'),
  '/* Generated: the dc-runtime pseudo-class sheet (style-hover / style-active / style-focus). */\n' + pseudoRules.join('\n') + '\n');
console.log('views:', Object.keys(views).join(', '), '| pseudo rules:', pseudoRules.length);
