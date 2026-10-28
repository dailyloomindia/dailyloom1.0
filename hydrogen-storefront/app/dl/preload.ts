// The photo each page shows first, so the browser can fetch it ahead of the rest.
// Same URLs the views use, so the early download is the one the page displays.
import {IMG, SRC} from './data/catalog';

/** Home hero: one photo for phones (under 768px, as the design switches) and one for wider screens. */
export const HOME_HERO = {mobile: IMG('hero-bed-mobile.jpg'), desktop: IMG('hero-bed.jpg')};
export const MOBILE_MEDIA = '(max-width: 767.98px)', DESKTOP_MEDIA = '(min-width: 768px)';

/** A collection page's full-bleed hero. */
export const storyHero = (k: string): string => SRC[`story-${k}-hero`] || '';

/** A collection page's hero on phones (under 768px): portrait photos; wider screens keep storyHero. */
const STORY_HERO_MOBILE: Record<string, string> = {
  covers: 'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/story-covers-hero-mobile.png?v=1793176672',
  duvets: 'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/story-duvets-hero-mobile.png?v=1793176597',
  towels: 'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/story-towels-hero-mobile.png?v=1793176491',
  sheets: 'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/story-sheets-hero-mobile.png?v=1793176527',
  pillows: 'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/story-pillows-hero-mobile.png?v=1793177330',
};
export const storyHeroMobile = (k: string): string => STORY_HERO_MOBILE[k] || storyHero(k);

/** HTTP Link header value that starts a high-priority image download before the HTML is parsed. */
export const preloadHeader = (urls: (string | [string, string])[]) =>
  urls.filter(Boolean).map(u => typeof u === 'string' ? `<${u}>; rel=preload; as=image; fetchpriority=high` : `<${u[0]}>; rel=preload; as=image; fetchpriority=high; media="${u[1]}"`).join(', ');

/** Starts downloading a photo now so it is ready when the page that shows it appears. */
export function warm(url: string){ if (url && typeof Image !== 'undefined') new Image().src = url; }
