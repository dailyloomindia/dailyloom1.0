/**
 * Editorial copy for the v3 storefront. Products, prices, options and images
 * always come from Shopify; this file only holds the words Shopify has no field
 * for. Every claim is written against the real catalog (product titles and
 * descriptions) — the design prototype's placeholder catalog (thread-count
 * tiers, bamboo towels, pillow profiles) is not carried over because those
 * products do not exist.
 */

export interface ClosePoint {
  t: string;
  b: string;
  zoom: number;
  label: string;
}

export interface CategoryStory {
  tagline: string;
  intro: string;
  accent: string;
  why: {tag: string; t: string; b: string}[];
  closer: {title: string; lede: string; base: string; points: ClosePoint[]};
  compare: [string, string, string][];
  care: string;
  buyLede: string;
}

export interface ProductCopy {
  name: string;
  short: string;
  specs: [string, string][];
  care: string;
}

const PERCALE_POINTS: ClosePoint[] = [
  {t: 'Crisp', b: 'One thread over, one under. A tight plain weave that holds a crease and keeps its shape.', zoom: 8, label: 'Cotton percale · magnified'},
  {t: 'Cool', b: 'The plain weave leaves room for air to move, so body heat leaves instead of pooling.', zoom: 6, label: 'Plain weave · air gaps'},
  {t: 'Matte', b: 'No synthetic sheen. Cotton percale has a quiet, matte hand that softens with every wash.', zoom: 4.5, label: 'Percale surface · close-up'},
];

export const CATEGORY_STORY: Record<string, CategoryStory> = {
  duvets: {
    tagline: 'Warmth without the weight.',
    intro: 'A good winter duvet keeps you warm without pinning you down.',
    accent: 'Ours is 300 GSM microfiber in a reversible, three-layer build, with a crisp cotton percale cover to go over it.',
    why: [
      {tag: 'Winter weight', t: '300 GSM, stated plainly.', b: 'Grams per square metre is the one number on a duvet that cannot be marketed around. At 300 GSM this is real cold-weather weight, still light enough to sleep under comfortably.'},
      {tag: 'Reversible', t: 'Two sides, one duvet.', b: 'A reversible, three-layer build that traps heat on cold nights and can be turned over as it settles into use.'},
      {tag: 'The cover', t: 'Cotton percale over the fill.', b: 'The duvet cover is crisp cotton percale: breathable over the fill, and the part of the set you can wash on a normal cycle whenever it needs it.'},
    ],
    closer: {
      title: 'Inside the set.',
      lede: 'Three parts make a warm, easy bed. Tap each to look closer.',
      base: '#E9DDC6',
      points: [
        {t: 'The fill', b: '300 GSM microfiber, fluffy and even, for warmth without a heavy weight on you.', zoom: 5, label: 'Microfiber fill · close-up'},
        {t: 'The layers', b: 'A three-layer build designed to trap heat, reversible so either side can face up.', zoom: 1.6, label: 'Three-layer build'},
        {t: 'The cover', b: 'Cotton percale, woven tight enough to hold its shape over the duvet and open enough to breathe.', zoom: 7, label: 'Percale cover · magnified'},
      ],
    },
    compare: [
      ['Fill weight', '300 GSM, stated on the label', 'GSM rarely stated'],
      ['Build', 'Reversible, three layers', 'Single-sided'],
      ['Cover', 'Cotton percale, machine washable', 'Synthetic, prone to static'],
    ],
    care: 'Machine wash the duvet cold on a gentle cycle in a large drum, and tumble dry low so the fill stays even. Use the cover to cut down on how often the duvet itself needs washing.',
    buyLede: 'Choose your piece, then size or colour on the next step.',
  },
  'bed-sheet-set': {
    tagline: 'Cool to the touch. Crisp by morning.',
    intro: 'You spend a third of your life against your sheets.',
    accent: 'So ours are cotton percale, cut as a King set with two matching pillow covers.',
    why: [
      {tag: 'Cool', t: 'Cotton that breathes.', b: 'Cotton percale lets air through the weave and draws moisture away from the skin, so the bed stays comfortable through warm nights.'},
      {tag: 'Deep pocket', t: 'A fitted sheet that stays put.', b: 'A deep-pocket fitted design that holds the mattress properly, so the sheet stays smooth until morning.'},
      {tag: 'Complete', t: 'Two pillow covers, always.', b: 'Every set comes with two matching pillow covers, woven from the same cloth so the colour and feel match exactly.'},
    ],
    closer: {title: 'Read the weave.', lede: 'Tap each quality to see the cloth up close.', base: '#F1E9DB', points: PERCALE_POINTS},
    compare: [
      ['Fibre', 'Cotton percale', 'Poly-cotton blends'],
      ['In the set', 'Sheet and two pillow covers', 'Pillow covers sold separately'],
      ['Finish', 'Crisp and matte', 'Synthetic sheen'],
    ],
    care: 'Machine wash cold with like colours and a mild detergent; skip bleach and fabric softener. Tumble dry low or line dry in shade, and iron warm while slightly damp for a crisp finish.',
    buyLede: 'Choose your colour on the next step.',
  },
  pillows: {
    tagline: 'Natural latex. Naturally supportive.',
    intro: 'Most "orthopedic" pillows are shredded foam in a bag.',
    accent: 'Ours is natural latex in a breathable knitted shell, so it presses back evenly and returns to shape every night.',
    why: [
      {tag: 'Responsive', t: 'Springs back instantly.', b: 'Latex returns to shape the moment you lift your head, so the pillow never needs plumping and does not sink into a dip.'},
      {tag: 'Cool', t: 'A shell that breathes.', b: 'A premium spun, knitted cover moves heat and moisture away instead of holding it against your face.'},
      {tag: 'Lump-free', t: 'Nothing loose inside.', b: 'Natural latex has no shredded fill to migrate or clump, so the support you feel on the first night is the support you keep.'},
    ],
    closer: {
      title: 'Find your fit.',
      lede: 'What goes into the pillow, part by part.',
      base: '#E8DDC8',
      points: [
        {t: 'The core', b: 'Pure natural latex for zero-pressure support that does not bottom out.', zoom: 2.2, label: 'Natural latex · close-up'},
        {t: 'The shell', b: 'A premium spun, knitted cover that keeps the pillow cool and fresh.', zoom: 5, label: 'Knitted shell · magnified'},
        {t: 'The profile', b: 'Slim, at 4 inches (26 × 16 × 4 in), to keep stomach and back sleepers aligned.', zoom: 3.4, label: 'Slim 4" profile'},
      ],
    },
    compare: [
      ['Core', 'Natural latex', 'Shredded memory foam'],
      ['Shape', 'Springs back every night', 'Flattens and clumps'],
      ['Shell', 'Spun, knitted, breathable', 'Polyester, traps heat'],
    ],
    care: 'Spot clean the knitted shell with mild soap and cold water; never machine wash or soak the latex. Air dry fully out of direct sunlight and away from direct heat.',
    buyLede: 'Natural latex, slim profile, ready to ship.',
  },
  towels: {
    tagline: 'Weight you can feel.',
    intro: 'GSM is the honest measure of how much cotton is in a towel.',
    accent: 'Ours run from a quick-drying 150 GSM hand towel to a plush 650 GSM ring-spun bath towel.',
    why: [
      {tag: 'Absorbent', t: 'Real cotton in the loops.', b: 'At 650 GSM the bath towel sits solidly in the plush range — enough cotton to actually dry you, not just wipe.'},
      {tag: 'Quick-dry', t: 'Ring-spun yarn.', b: 'Ring-spun cotton twists finer, stronger yarn, which stays soft and dries quickly wash after wash.'},
      {tag: 'Everyday', t: 'Made for daily use.', b: 'A hand towel pack of two for the sink and kitchen, light enough to dry between uses.'},
    ],
    closer: {
      title: 'Feel the loop.',
      lede: 'Terry is woven with loops that lift water away from the skin.',
      base: '#E9E3D8',
      points: [
        {t: 'Bath · 650 GSM', b: 'Dense, plush loops for a thick, absorbent towel.', zoom: 5, label: 'Bath towel terry · magnified'},
        {t: 'Hand · 150 GSM', b: 'A lighter weight that dries itself between uses.', zoom: 3.4, label: 'Hand towel terry · magnified'},
        {t: 'Ring-spun', b: 'Finer, stronger yarn that stays soft and resists thinning.', zoom: 4, label: 'Ring-spun yarn · close-up'},
      ],
    },
    compare: [
      ['Bath towel weight', '650 GSM', 'Often 300–400 GSM'],
      ['Yarn', 'Ring-spun cotton', 'Open-end cotton, sheds lint'],
      ['On the label', 'GSM printed in full', '"100% cotton", no weight given'],
    ],
    care: 'Wash before first use to reach full absorbency. Machine wash warm, tumble dry low or line dry, and skip fabric softener — it coats the loops.',
    buyLede: 'Choose your towel, then colour on the next step.',
  },
};

/** Keyed by the product's real Shopify productType. */
export const PRODUCT_COPY: Record<string, ProductCopy> = {
  'Duvet / Comforter': {
    name: 'Winter Duvet',
    short: '300 GSM microfiber in a reversible, three-layer build. Warm, fluffy and light.',
    specs: [['Fill', '300 GSM microfiber'], ['Build', 'Reversible, three-layer'], ['Colour', 'White']],
    care: 'Machine wash cold on a gentle cycle in a large drum. Tumble dry low so the fill stays even. Store loosely between seasons, never compressed for long.',
  },
  'Duvet Covers': {
    name: 'Percale Duvet Cover',
    short: 'Crisp, breathable cotton percale in King size. Softens with every wash.',
    specs: [['Fabric', 'Cotton percale'], ['Size', 'King']],
    care: 'Machine wash cold with like colours. Tumble dry low or line dry in shade. Iron warm for a crisp finish.',
  },
  'Bed Sheets': {
    name: 'Percale Bed Sheet Set',
    short: 'Crisp, breathable cotton percale with a deep-pocket fitted sheet and two pillow covers.',
    specs: [['Fabric', 'Cotton percale'], ['Size', 'King'], ['In the set', 'Bed sheet and 2 pillow covers']],
    care: 'Machine wash cold with like colours; no bleach or fabric softener. Tumble dry low or line dry in shade. Iron warm while slightly damp.',
  },
  Pillows: {
    name: 'Natural Latex Pillow',
    short: 'Pure natural latex in a spun, knitted shell. Cooling, lump-free and slim at 4 inches.',
    specs: [['Core', 'Pure natural latex'], ['Shell', 'Premium spun, knitted'], ['Size', '26 × 16 × 4 in'], ['Best for', 'Stomach and back sleepers']],
    care: 'Spot clean the shell with mild soap and cold water; never machine wash or soak the latex. Air dry out of direct sunlight and away from heat.',
  },
  'Bath Towels': {
    name: 'Cotton Bath Towel',
    short: '650 GSM ring-spun cotton. Plush, absorbent and quick to dry.',
    specs: [['Weight', '650 GSM'], ['Fabric', '100% pure cotton, ring-spun']],
    care: 'Wash before first use. Machine wash warm, tumble dry low or line dry. Skip fabric softener to keep the loops absorbent.',
  },
  'Hand Towels': {
    name: 'Cotton Hand Towel Set',
    short: 'Soft, absorbent cotton hand towels in a pack of two, light enough to dry between uses.',
    specs: [['Weight', '150 GSM'], ['In the set', 'Pack of 2']],
    care: 'Machine wash warm. Tumble dry low or line dry. Skip fabric softener.',
  },
};

export function productCopy(productType: string | null | undefined): ProductCopy | undefined {
  if (!productType) return undefined;
  return PRODUCT_COPY[productType] || (/pillow/i.test(productType) ? PRODUCT_COPY.Pillows : undefined);
}
