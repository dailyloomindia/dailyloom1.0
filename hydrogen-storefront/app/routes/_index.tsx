// Serves the Daily Loom v4 design document byte-for-byte. The page renders
// itself in the browser via /support.js (dc-runtime) and /image-slot.js.
import v4Html from '~/design/Daily Loom v4.dc.html?raw';

export async function loader() {
  return new Response(v4Html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
}
