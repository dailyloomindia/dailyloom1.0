// The photo each page shows first, so the browser can fetch it ahead of the rest.
// Same URLs the views use, so the early download is the one the page displays.
import {IMG, SRC} from './data/catalog';

/** Home hero: one photo for phones (under 768px, as the design switches) and one for wider screens. */
export const HOME_HERO = {mobile: IMG('hero-bed-mobile.jpg'), desktop: IMG('hero-bed.jpg')};
export const MOBILE_MEDIA = '(max-width: 767.98px)', DESKTOP_MEDIA = '(min-width: 768px)';

/** A collection page's full-bleed hero. */
export const storyHero = (k: string): string => SRC[`story-${k}-hero`] || '';

/** HTTP Link header value that starts a high-priority image download before the HTML is parsed. */
export const preloadHeader = (urls: string[]) =>
  urls.filter(Boolean).map(u => `<${u}>; rel=preload; as=image; fetchpriority=high`).join(', ');

/** Starts downloading a photo now so it is ready when the page that shows it appears. */
export function warm(url: string){ if (url && typeof Image !== 'undefined') new Image().src = url; }
