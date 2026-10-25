// Request checks for the site's own POST endpoints (/cart, /notify).

const HOSTS = ['dailyloom.in', 'www.dailyloom.in'];

/**
 * True when a POST comes from this site's own pages: the browser's Origin is this site, and the body is
 * JSON. Another website cannot send JSON here without the browser asking first (and it is never allowed),
 * so a page elsewhere cannot add to a visitor's bag or send Notify requests in their name.
 */
export function sameOrigin(request: Request): boolean {
  if (!/^application\/json\b/i.test(request.headers.get('Content-Type') || '')) return false;
  const origin = request.headers.get('Origin');
  if (!origin) return true;
  let host = '';
  try { host = new URL(origin).host; } catch (e) { return false; }
  return host === new URL(request.url).host || HOSTS.includes(host);
}
