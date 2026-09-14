/** Best-effort colour swatch fill from a variant option value's name — this
 * is decorative only (the option button's title/label carries the real
 * value for screen readers and sighted users alike). Unrecognised names
 * fall back to a neutral gold chip rather than guessing wrong. Shared
 * between the story page's preview swatches and the buy page's real
 * option picker so they render identically. */
export function swatchColor(name: string): string {
  const n = name.toLowerCase();
  const map: Record<string, string> = {
    white: '#f7f3eb',
    black: '#23241f',
    gray: '#8b8a86',
    grey: '#8b8a86',
    'dark gray': '#5a5954',
    'dark grey': '#5a5954',
    charcoal: '#3a3a36',
    brown: '#6b4a35',
    'dark brown': '#4a3326',
    beige: '#e4d9c4',
    cream: '#f7f3eb',
    navy: '#2b3345',
    blue: '#3f5a78',
    green: '#5c6e4f',
    sage: '#8b9a7a',
    gold: '#b8985a',
    red: '#8a3b32',
    pink: '#d9a9a0',
  };
  // Longest key first so "dark gray" matches before the shorter "gray".
  const keys = Object.keys(map).sort((a, b) => b.length - a.length);
  for (const key of keys) {
    if (n.includes(key)) return map[key];
  }
  return '#b8985a';
}
