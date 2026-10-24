// What each page is called in Google's results and the browser tab, in the words people search with.
// Shown only to search engines and in the tab: the pages themselves keep the design's wording.

/** Collection pages, by design category key. */
export const CAT_SEO: Record<string, {title: string; description: string}> = {
  duvets: {
    title: 'Winter Duvet, Comforter & Razai for Single and King Bed',
    description: 'A warm, light winter duvet (razai / comforter) with a peach skin shell, box-stitched so the fill stays even. Single and king size. Tracked delivery across India.',
  },
  covers: {
    title: '300 TC Cotton Percale Duvet Cover, King Size',
    description: '300 TC percale duvet cover in 100% virgin Indian cotton, king size, closed with snap buttons. Soft and breathable, in dark taupe and charcoal grey.',
  },
  sheets: {
    title: '300 TC Cotton Bedsheet Set, King Size with 2 Pillow Covers',
    description: '300 TC percale bedsheet set in 100% virgin Indian cotton, king size, with two pillow covers. Soft and breathable, in dark taupe and charcoal grey.',
  },
  pillows: {
    title: 'Natural Latex Pillow: Orthopedic, Cooling, Lump-Free',
    description: 'Pure natural latex pillows: the classic pillow and the contour pillow for neck support. Orthopedic, pin-core cooled and lump-free, in a soft knitted cover.',
  },
  towels: {
    title: '650 GSM Cotton Bath, Hand & Face Towels and Towel Sets',
    description: '650 GSM pure cotton bath, hand and face towels, and a 3-piece cotton towel gift set. Thick, absorbent white terry, cut and hemmed in our workshop.',
  },
};

/** Buy pages, by product id. */
export const PRODUCT_SEO: Record<string, {title: string; description: string}> = {
  'winter-duvet': {
    title: 'Winter Duvet / Comforter (Razai), Single & King Size',
    description: 'Winter duvet (razai / comforter) with a peach skin shell, box-stitched so the fill stays even through the coldest months. Warm and light. Single and king size.',
  },
  'duvet-cover': {
    title: '300 TC Cotton Percale Duvet Cover, King Size',
    description: 'Percale-woven 300 TC duvet cover in 100% virgin Indian cotton, for double and king duvets, with snap buttons. In dark taupe and charcoal grey.',
  },
  'bedsheet': {
    title: '300 TC Cotton Percale Bedsheet Set, King Size with 2 Pillow Covers',
    description: 'King size percale flat sheet with two matching pillow covers, in 100% virgin Indian cotton, 300 TC. Optional monogram. In dark taupe and charcoal grey.',
  },
  'bed-set': {
    title: 'The Complete Bed: Cotton Duvet Cover, Bedsheet & 2 Pillow Covers',
    description: 'Duvet cover, flat sheet and two pillow covers in 100% virgin Indian cotton, matched in thread count and colour. King size bedding set.',
  },
  'latex-pillow': {
    title: 'Natural Latex Pillow: Orthopedic, Cooling, Lump-Free',
    description: 'One solid piece of pure natural latex with pin-core cooling, in a knitted zip cover. Orthopedic support that keeps its shape for years.',
  },
  'contour-pillow': {
    title: 'Natural Latex Contour Pillow for Neck Support (Cervical Pillow)',
    description: 'Pure natural latex contour pillow, shaped to the C-shaped curve of your neck to keep neck, head and back aligned. Cooling, lump-free, orthopedic.',
  },
  'cotton-towel': {
    title: '650 GSM Cotton Bath Towel, Hand Towel & Face Towel',
    description: 'Pure virgin Indian cotton terry bath, hand and face towels, cut, stitched and hemmed in our workshop. Dense, absorbent and soft from the first use.',
  },
  'cotton-towel-set': {
    title: '3-Piece Cotton Towel Set: Bath, Hand & Face Towel (Gift Set)',
    description: 'One bath, one hand and one face towel in 650 GSM pure white cotton. A towel gift set with an optional monogram.',
  },
};

export const HOME_SEO = {
  title: 'Daily Loom | Pure Cotton Bedsheets, Winter Duvets, Latex Pillows & Towels',
  description: 'Shop 100% virgin Indian cotton bedsheets and duvet covers, winter duvets (razai), natural latex pillows and 650 GSM cotton towels. Tracked delivery across India.',
};
