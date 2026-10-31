// Page titles, descriptions and share previews (Open Graph / Twitter) for search engines and links.
import {HOME_HERO} from '../preload';

export const SITE = 'Daily Loom';
export const SITE_DESC = 'Handloom duvets, linens, pillows and towels for everyday rest.';
export const ORIGIN = 'https://dailyloom.in';

/** `title` gets " | Daily Loom" added; `fullTitle` is used as it is. `ld` is schema.org structured data. */
export function seo({title, fullTitle, description, image, path, ld}: {title?: string; fullTitle?: string; description?: string; image?: string; path?: string; ld?: any[]}) {
  const t = fullTitle || (title ? `${title} | ${SITE}` : SITE), d = description || SITE_DESC, url = ORIGIN + (path || '/');
  return [
    {title: t},
    {name: 'description', content: d},
    {tagName: 'link', rel: 'canonical', href: url},
    {property: 'og:site_name', content: SITE},
    {property: 'og:type', content: 'website'},
    {property: 'og:title', content: t},
    {property: 'og:description', content: d},
    {property: 'og:url', content: url},
    // Pages without a photo of their own (help, policies) share the home photo in link previews.
    {property: 'og:image', content: image || HOME_HERO.desktop},
    {name: 'twitter:card', content: 'summary_large_image'},
    ...(ld || []).map(x => ({'script:ld+json': x})),
  ];
}

/** schema.org: Home > … breadcrumb trail, as [name, path] pairs. */
export const breadcrumbs = (trail: [string, string][]) => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [['Home', '/'], ...trail].map(([name, path], i) => ({'@type': 'ListItem', position: i + 1, name, item: ORIGIN + path})),
});

/** schema.org: the business and the website, for the home page. */
export const ORGANIZATION = {
  '@context': 'https://schema.org', '@type': 'Organization', name: SITE, url: ORIGIN, logo: ORIGIN + '/icon-192.png',
  email: 'contact@dailyloom.in', sameAs: ['https://www.instagram.com/dailyloom.in'],
  contactPoint: {'@type': 'ContactPoint', contactType: 'customer service', email: 'contact@dailyloom.in', telephone: '+91-92204-42722', areaServed: 'IN', availableLanguage: ['English', 'Hindi']},
};
export const WEBSITE = {'@context': 'https://schema.org', '@type': 'WebSite', name: SITE, url: ORIGIN};

/** schema.org: the returns policy (7 days from delivery, for products that arrive damaged; pickup is free). */
export const RETURN_POLICY = {
  '@type': 'MerchantReturnPolicy', applicableCountry: 'IN', returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
  merchantReturnDays: 7, returnMethod: 'https://schema.org/ReturnByMail', returnFees: 'https://schema.org/FreeReturn', merchantReturnLink: ORIGIN + '/policies/refund-policy',
};

/** schema.org: complimentary delivery across India, dispatched within 48 hours, 3–8 days in transit (remote areas can take longer). */
export const SHIPPING = {
  '@type': 'OfferShippingDetails', shippingRate: {'@type': 'MonetaryAmount', value: 0, currency: 'INR'},
  shippingDestination: {'@type': 'DefinedRegion', addressCountry: 'IN'},
  deliveryTime: {'@type': 'ShippingDeliveryTime',
    handlingTime: {'@type': 'QuantitativeValue', minValue: 0, maxValue: 2, unitCode: 'DAY'},
    transitTime: {'@type': 'QuantitativeValue', minValue: 3, maxValue: 8, unitCode: 'DAY'}},
};
