// Page titles, descriptions and share previews (Open Graph / Twitter) for search engines and links.
export const SITE = 'Daily Loom';
export const SITE_DESC = 'Handloom duvets, linens, pillows and towels for everyday rest.';
export const ORIGIN = 'https://dailyloom.in';

export function seo({title, description, image, path}: {title?: string; description?: string; image?: string; path?: string}) {
  const t = title ? `${title} · ${SITE}` : SITE, d = description || SITE_DESC, url = ORIGIN + (path || '/');
  return [
    {title: t},
    {name: 'description', content: d},
    {tagName: 'link', rel: 'canonical', href: url},
    {property: 'og:site_name', content: SITE},
    {property: 'og:type', content: 'website'},
    {property: 'og:title', content: t},
    {property: 'og:description', content: d},
    {property: 'og:url', content: url},
    ...(image ? [{property: 'og:image', content: image}] : []),
    {name: 'twitter:card', content: image ? 'summary_large_image' : 'summary'},
  ];
}
