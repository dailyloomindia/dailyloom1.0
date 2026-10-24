// The shop's Google rating and reviews, from its Google Business Profile through the Places API
// (New). Needs GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID; kept for 6 hours so Google is asked rarely.

export type Review = {name: string; place: string; product: string; stars: number; text: string};
export type GoogleReviews = {rating: string; count: string; url: string; reviews: Review[]};

const KEEP_SECONDS = 6 * 60 * 60;
const FIELDS = 'rating,userRatingCount,googleMapsUri,reviews';

/** The three best reviews: highest rated first, only reviews with words, Google's order otherwise. */
function top3(reviews: any[]): Review[] {
  return reviews
    .map((r, i) => ({r, i, text: ((r.originalText || r.text || {}).text || '').trim()}))
    .filter(x => x.text && x.r.rating >= 4)
    .sort((a, b) => b.r.rating - a.r.rating || a.i - b.i)
    .slice(0, 3)
    .map(({r, text}) => ({
      name: (r.authorAttribution && r.authorAttribution.displayName) || 'Google reviewer',
      place: r.relativePublishTimeDescription || '', product: '', stars: Math.round(r.rating), text,
    }));
}

export async function getGoogleReviews(env: any): Promise<GoogleReviews | null> {
  const key = env.GOOGLE_PLACES_API_KEY, place = env.GOOGLE_PLACE_ID;
  if (!key || !place) return null;
  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(place)}?languageCode=en`;
  const stored = new Request(`https://reviews.dailyloom.internal/${encodeURIComponent(place)}`);
  const cache = typeof caches !== 'undefined' ? await caches.open('dl-google-reviews').catch(() => null) : null;
  let data: any = null;
  const hit = cache && await cache.match(stored).catch(() => null);
  if (hit) data = await hit.json().catch(() => null);
  if (!data) {
    const res = await fetch(url, {headers: {'X-Goog-Api-Key': key, 'X-Goog-FieldMask': FIELDS}}).catch(() => null);
    if (!res || !res.ok) { console.error('Google reviews:', res ? res.status + ' ' + (await res.text()).slice(0, 300) : 'no response'); return null; }
    data = await res.json();
    if (cache) await cache.put(stored, new Response(JSON.stringify(data), {headers: {'Content-Type': 'application/json', 'Cache-Control': `public, max-age=${KEEP_SECONDS}`}})).catch(() => {});
  }
  return {
    rating: data.rating ? (Math.round(data.rating * 10) / 10).toFixed(1) : '',
    count: data.userRatingCount ? String(data.userRatingCount) : '',
    url: data.googleMapsUri || 'https://www.google.com/maps',
    reviews: top3(data.reviews || []),
  };
}
