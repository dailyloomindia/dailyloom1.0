// /site.webmanifest: the name and icons phones use for the site (tabs, home screen, Android's address bar).
export async function loader() {
  const body = {
    name: 'Daily Loom', short_name: 'Daily Loom', start_url: '/', display: 'browser', background_color: '#F4EFE6',
    icons: [{src: '/icon-192.png', sizes: '192x192', type: 'image/png'}, {src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png'}],
  };
  return new Response(JSON.stringify(body), {headers: {'Content-Type': 'application/manifest+json', 'Cache-Control': 'public, max-age=86400'}});
}
