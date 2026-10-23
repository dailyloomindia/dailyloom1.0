// Helpers used by the generated views. Each one reproduces what the
// dc-runtime (the design tool's renderer) does for the same template construct,
// so the React output matches the design file exactly.
import {isValidElement, type ReactNode} from 'react';

const kebabToCamel = (s: string) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

/** Inline style string → React style object (runtime `cssToObj`). */
export function css(s: string): Record<string, string> {
  const o: Record<string, string> = {};
  for (const decl of s.split(';')) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    const prop = decl.slice(0, i).trim();
    o[prop.startsWith('--') ? prop : kebabToCamel(prop)] = decl.slice(i + 1).trim();
  }
  return o;
}

/** A {{ value }} inside an attribute string. */
export const S = (x: unknown) => (x ?? '') as string;

/** A {{ value }} inside text: wrapped in a span, like the runtime does. */
export function I(x: unknown): ReactNode {
  if (x === undefined || x === null || typeof x === 'boolean') return null;
  if (isValidElement(x) || Array.isArray(x)) return <>{x}</>;
  return <span className="sc-interp">{String(x)}</span>;
}

/** An sc-for list; anything that is not an array renders nothing. */
export const L = (x: unknown): any[] => (Array.isArray(x) ? x : []);

/** Input value/checked: undefined becomes '' so the input stays controlled. */
export const VAL = (x: unknown) => (x === undefined ? '' : x) as any;
