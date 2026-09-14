/**
 * Narrative content for the luxury product story page, keyed by the
 * product's real Shopify `productType` — the one signal every product
 * always has, independent of handle or which collection it's filed under.
 *
 * Shopify has no field for "market comparison" or "how it's made" copy,
 * so this is where that content lives. Everything here is written to
 * match what's actually true of each real product (GSM, fill, weave) —
 * never invented specs. `default` is deliberately thin: it skips any
 * section that would require claiming something we don't know about an
 * unfamiliar product (e.g. a future Latex Pillow) rather than guessing.
 */

export interface ComparisonRow {
  label: string;
  market: string;
  loom: string;
}

export interface Material {
  number: string;
  title: string;
  text: string;
}

export interface Benefit {
  title: string;
  text: string;
}

export interface Step {
  number: string;
  title: string;
  text: string;
}

export interface SpecRow {
  label: string;
  value: string;
}

export interface CareItem {
  number: string;
  text: string;
}

export interface ProductStoryContent {
  /** Short hero headline. Shopify's real product titles are long, keyword-
   * stuffed SEO strings (100+ chars, meant for search listings, not a
   * display heading) — using them directly as an <h1> overflows a hero
   * built for a short name. This is what actually renders there; the full
   * SEO title still drives <title>/meta via the route's own meta(). */
  displayName: string;
  heroKicker: string;
  showWeave: boolean;
  weaveLabel?: string;
  storyEyebrow: string;
  storyHeading: string;
  storyParagraphs: string[];
  comparisonEyebrow?: string;
  comparisonHeading?: string;
  comparisonMarketLabel?: string;
  comparisonRows?: ComparisonRow[];
  materialsEyebrow?: string;
  materialsHeading?: string;
  materials?: Material[];
  benefitsEyebrow?: string;
  benefits?: Benefit[];
  stepsEyebrow?: string;
  stepsHeading?: string;
  steps?: Step[];
  specsHeading?: string;
  specRows?: SpecRow[];
  careHeading?: string;
  careItems?: CareItem[];
  boxEyebrow?: string;
  boxHeading?: string;
  boxItems?: string[];
}

const bedSheets: ProductStoryContent = {
  displayName: 'Percale Bed Sheet Set',
  heroKicker: '100% cotton percale · no polyester',
  showWeave: true,
  weaveLabel: 'Keep scrolling — the weave comes to you',
  storyEyebrow: 'Why percale',
  storyHeading: 'Nothing hidden in the weave',
  storyParagraphs: [
    'Percale is the plainest weave there is, which is exactly why it cannot lie. One thread over, one thread under. A blend hides behind a sheen; cotton has to earn its hand from the fibre up.',
    'Woven tight enough to hold a crease and loose enough to breathe, it comes out of the dryer matte, not shiny. That matte is the tell.',
  ],
  comparisonEyebrow: 'Against the market standard',
  comparisonHeading: 'Same word on the label. Different thing in the box.',
  comparisonMarketLabel: 'Market standard',
  comparisonRows: [
    {label: 'Fibre', market: 'Poly-cotton blend, 40–60% polyester', loom: '100% pure cotton'},
    {label: 'Weave', market: 'Sateen sheen hiding thin yarn', loom: 'Crisp percale weave'},
    {label: 'After 30 washes', market: 'Pilling, static, trapped heat', loom: 'Softer, matte, no pills'},
    {label: 'On the label', market: '"Cotton-rich"', loom: 'Fibre content printed in full'},
  ],
  materialsEyebrow: 'What it is made of',
  materialsHeading: 'Built from the fibre up',
  materials: [
    {number: '01', title: 'Long-staple cotton', text: 'Longer fibres mean fewer ends sticking out of the yarn, which is why the sheet gets softer instead of fuzzier.'},
    {number: '02', title: 'Crisp percale weave', text: 'A tight, plain weave that holds a crease and still lets air through — the hand hotels chase and rarely admit to.'},
    {number: '03', title: 'Colour-fast dye', text: 'Bonded to the fibre rather than sitting on it, so colour fades slowly across years, not weeks.'},
  ],
  benefitsEyebrow: 'What it does for you',
  benefits: [
    {title: 'Sleeps cool', text: 'Plain weave leaves air gaps. Body heat leaves instead of pooling.'},
    {title: 'Gets better', text: 'Each wash relaxes the yarn. The best night is somewhere around wash twenty.'},
    {title: 'No pilling', text: 'Long-staple cotton has nothing short enough to ball up.'},
    {title: 'Honest hand', text: 'Matte, not shiny. Sheen is usually polyester doing the talking.'},
  ],
  stepsEyebrow: 'How it is made',
  stepsHeading: 'No shortcuts',
  steps: [
    {number: 'Step 1', title: 'Fibre in', text: 'Pure cotton graded by staple length, not by price per bale.'},
    {number: 'Step 2', title: 'Spun', text: 'Yarn spun for strength without sacrificing softness.'},
    {number: 'Step 3', title: 'Woven', text: 'Crisp percale weave, one thread over, one under.'},
    {number: 'Step 4', title: 'Cut and hemmed', text: 'Pre-shrunk, dyed, cut and hemmed as a complete set.'},
  ],
  specsHeading: 'Specification',
  specRows: [
    {label: 'Composition', value: '100% pure cotton'},
    {label: 'Weave', value: 'Percale, crisp breathable finish'},
    {label: 'Set contains', value: '1 flat, 1 fitted, 2 pillowcases'},
    {label: 'Size', value: 'King'},
  ],
  careHeading: 'Care',
  careItems: [
    {number: '01', text: 'Machine wash cold with like colours. Mild detergent, no bleach, no fabric softener — softener coats the fibre and kills the breathability you paid for.'},
    {number: '02', text: 'Tumble dry low, or line dry in shade.'},
    {number: '03', text: 'Warm iron on the reverse if you want a crisp finish. Steam is usually enough.'},
    {number: '04', text: 'Rotate two sets. Cotton lasts longer when it gets to rest and fully dry between uses.'},
  ],
  boxEyebrow: 'What you get',
  boxHeading: 'In the box',
  boxItems: ['1 flat sheet', '1 fitted sheet', '2 pillow covers', 'Folded and ready to ship'],
};

const duvetCovers: ProductStoryContent = {
  displayName: 'Percale Duvet Cover',
  heroKicker: '100% cotton percale · removable & washable',
  showWeave: true,
  weaveLabel: 'Keep scrolling — the weave comes to you',
  storyEyebrow: 'Why a cotton cover',
  storyHeading: 'The layer between you and the fill',
  storyParagraphs: [
    'A duvet cover exists so the actual insulation — down, microfiber, wool — never has to touch your skin or a washing machine directly. That makes the cover the one part of a duvet system you feel every night.',
    'Ours is crisp cotton percale: woven tight enough to hold its shape over an insert, breathable enough not to trap heat against it, and, unlike the insert, fully machine washable whenever it needs it.',
  ],
  comparisonEyebrow: 'Against the market standard',
  comparisonHeading: 'Same word on the label. Different thing in the box.',
  comparisonMarketLabel: 'Market standard',
  comparisonRows: [
    {label: 'Fibre', market: 'Poly-cotton blend, prone to static', loom: '100% pure cotton'},
    {label: 'Feel against the fill', market: 'Slippery synthetic lining', loom: 'Crisp, breathable percale'},
    {label: 'Closure', market: 'Loose ties, insert bunches', loom: 'Secure closure, holds the insert in place'},
    {label: 'On the label', market: '"Cotton-rich"', loom: 'Fibre content printed in full'},
  ],
  benefitsEyebrow: 'What it does for you',
  benefits: [
    {title: 'Breathes', text: 'Cotton weave lets heat escape instead of building up over the fill.'},
    {title: 'Washable', text: 'The one part of your duvet system you can actually launder on a normal cycle.'},
    {title: 'Holds its shape', text: 'A tight weave keeps the insert from sliding or bunching in one corner.'},
    {title: 'Honest hand', text: 'Matte cotton, not a synthetic sheen standing in for quality.'},
  ],
  specsHeading: 'Specification',
  specRows: [
    {label: 'Composition', value: '100% pure cotton'},
    {label: 'Weave', value: 'Percale, crisp breathable finish'},
    {label: 'Size', value: 'King'},
    {label: 'Closure', value: 'Secure insert closure'},
  ],
  careHeading: 'Care',
  careItems: [
    {number: '01', text: 'Machine wash cold with like colours. Mild detergent, no bleach.'},
    {number: '02', text: 'Tumble dry low, or line dry in shade.'},
    {number: '03', text: 'Warm iron if you want a crisp finish — usually unnecessary.'},
    {number: '04', text: 'Wash before the insert needs it. Cotton holds up to far more cycles than the fill inside it.'},
  ],
  boxEyebrow: 'What you get',
  boxHeading: 'In the box',
  boxItems: ['1 duvet cover, King', 'Insert-secure closure', 'Folded and ready to ship'],
};

const comforter: ProductStoryContent = {
  displayName: 'Winter Comforter',
  heroKicker: '300 GSM microfiber · winter weight',
  showWeave: false,
  storyEyebrow: 'Why 300 GSM',
  storyHeading: 'Warm without the weight',
  storyParagraphs: [
    'GSM — grams per square metre — is the one number on a comforter label that cannot be marketed around. It is a direct measure of how much fill is actually inside, not how the packaging photographs.',
    'At 300 GSM this sits at proper winter weight: warm enough for a cold night, still light enough that it does not feel like sleeping under a weighted blanket. Fluffed, not flattened, straight out of the bag.',
  ],
  comparisonEyebrow: 'Against the market standard',
  comparisonHeading: 'Same word on the label. Different thing in the box.',
  comparisonMarketLabel: 'Market standard',
  comparisonRows: [
    {label: 'Fill weight', market: 'GSM rarely stated', loom: '300 GSM, stated on the label'},
    {label: 'Loft after washing', market: 'Flattens, clumps in corners', loom: 'Fluffs back after a normal wash'},
    {label: 'Shell fabric', market: 'Thin, prone to fill leaking through', loom: 'Tightly woven shell holds the fill in'},
    {label: 'On the label', market: '"Premium filling"', loom: 'Fill weight printed in full'},
  ],
  benefitsEyebrow: 'What it does for you',
  benefits: [
    {title: 'Winter-ready', text: '300 GSM is real cold-weather weight, not a light throw dressed up as one.'},
    {title: 'Stays fluffy', text: 'A tighter shell weave keeps the microfiber fill from migrating and clumping.'},
    {title: 'Machine washable', text: 'No dry-cleaner trips — wash and tumble dry on a normal cycle.'},
    {title: 'Breathable warmth', text: 'Traps heat without trapping moisture the way a heavier razai can.'},
  ],
  specsHeading: 'Specification',
  specRows: [
    {label: 'Fill', value: '300 GSM microfiber'},
    {label: 'Size', value: 'King'},
    {label: 'Colour', value: 'White'},
    {label: 'Best for', value: 'Winter weight, cold-climate nights'},
  ],
  careHeading: 'Care',
  careItems: [
    {number: '01', text: 'Machine wash cold on a gentle cycle. A large-capacity washer helps the fill move freely.'},
    {number: '02', text: 'Tumble dry low with a couple of clean tennis balls to keep the fill from clumping.'},
    {number: '03', text: 'Store flat or loosely rolled between seasons — never compressed for long stretches.'},
    {number: '04', text: 'Use a duvet cover to cut down on how often it needs a full wash.'},
  ],
  boxEyebrow: 'What you get',
  boxHeading: 'In the box',
  boxItems: ['1 comforter, King, White', '300 GSM microfiber fill', 'Compression-packed for shipping — fluffs up within a day'],
};

const latexPillow: ProductStoryContent = {
  displayName: 'Latex Pillow',
  heroKicker: '100% natural latex · zero-pressure support',
  showWeave: false,
  storyEyebrow: 'Why natural latex',
  storyHeading: 'One piece of latex, not a bag of shredded foam',
  storyParagraphs: [
    'Most "orthopedic" pillows are shredded memory foam stuffed into a shell — soft at first, then lumpy within weeks as the fill migrates and compacts under your head every night.',
    'This is moulded from natural latex as one continuous piece, so there is nothing inside it to shift, clump, or go flat unevenly. It presses back evenly under pressure and returns to shape the moment you lift your head off it — every night, not just the first one.',
  ],
  comparisonEyebrow: 'Against the market standard',
  comparisonHeading: 'Same word on the label. Different thing in the box.',
  comparisonMarketLabel: 'Market standard',
  comparisonRows: [
    {label: 'Fill', market: 'Shredded memory foam, migrates and clumps', loom: 'One moulded piece of natural latex'},
    {label: 'After a hot night', market: 'Traps heat, foam softens further', loom: 'Open cell structure, breathes and cools'},
    {label: 'After 6 months', market: 'Flattens unevenly, lumps form', loom: 'Holds its shape, lump-free by construction'},
    {label: 'On the label', market: '"Memory foam" (blend undisclosed)', loom: '100% natural latex, stated in full'},
  ],
  materialsEyebrow: 'What it is made of',
  materialsHeading: 'Two parts, both named',
  materials: [
    {number: '01', title: 'Natural latex core', text: 'Moulded as a single piece — nothing to shift, clump, or leak out over time the way shredded fill does.'},
    {number: '02', title: 'Spun, knitted shell', text: 'A breathable knitted cover over the core, built to move heat and moisture away rather than trap them against your skin.'},
  ],
  benefitsEyebrow: 'What it does for you',
  benefits: [
    {title: 'Zero-pressure support', text: 'Latex presses back evenly instead of bottoming out under the weight of your head.'},
    {title: 'Sleeps cool', text: 'Open-cell latex and a knitted shell move heat out instead of holding it in.'},
    {title: 'Stays lump-free', text: 'A single moulded piece has nothing loose inside it to migrate or clump.'},
    {title: 'Built for side support', text: 'A slim, 4-inch profile keeps stomach and back sleepers aligned without over-elevating the neck.'},
  ],
  specsHeading: 'Specification',
  specRows: [
    {label: 'Fill', value: '100% natural latex'},
    {label: 'Profile', value: 'Slim, 4 in'},
    {label: 'Dimensions', value: '26 × 16 × 4 in'},
    {label: 'Shell', value: 'Premium spun, knitted cover'},
    {label: 'Best for', value: 'Stomach and back sleepers'},
  ],
  careHeading: 'Care',
  careItems: [
    {number: '01', text: 'Spot clean the knitted shell with mild soap and cold water — the latex core itself should not be machine washed or soaked.'},
    {number: '02', text: 'Air dry fully out of direct sunlight before use; prolonged UV exposure degrades natural latex over time.'},
    {number: '03', text: 'Keep away from direct heat sources — natural latex softens and can be damaged by high heat.'},
    {number: '04', text: 'Fluff and air the pillow periodically to keep the shell fresh between washes.'},
  ],
  boxEyebrow: 'What you get',
  boxHeading: 'In the box',
  boxItems: ['1 latex pillow, 26 × 16 × 4 in', 'Spun, knitted cover', 'Ready to ship'],
};

const bathTowels: ProductStoryContent = {
  displayName: 'Bath Towel',
  heroKicker: '650 GSM · ring-spun cotton',
  showWeave: true,
  weaveLabel: 'Keep scrolling — the loop pile comes to you',
  storyEyebrow: 'Why 650 GSM',
  storyHeading: 'Weight is the whole story',
  storyParagraphs: [
    'A towel is mostly air and loops. GSM is the honest measure of how much cotton is actually in those loops — and at 650 GSM this sits solidly in the plush, absorbent range rather than the thin end most "premium" towels quietly ship at.',
    'Ring-spun cotton twists finer, stronger yarn than the open-end cotton cheaper towels use, which is why this stays plush and quick-drying wash after wash instead of going stiff and thin.',
  ],
  comparisonEyebrow: 'Against the market standard',
  comparisonHeading: 'Same word on the label. Different thing in the box.',
  comparisonMarketLabel: 'Market standard',
  comparisonRows: [
    {label: 'Weight', market: '300–400 GSM, feels thin', loom: '650 GSM, plush and absorbent'},
    {label: 'Yarn', market: 'Open-end cotton, sheds lint', loom: 'Ring-spun cotton, stronger and softer'},
    {label: 'After 30 washes', market: 'Thins out, loses absorbency', loom: 'Stays plush, dries fast'},
    {label: 'On the label', market: '"100% cotton" (no weight given)', loom: 'GSM printed in full'},
  ],
  benefitsEyebrow: 'What it does for you',
  benefits: [
    {title: 'Actually absorbent', text: '650 GSM means real cotton mass, not a towel-shaped piece of thin fabric.'},
    {title: 'Quick-dry', text: 'Ring-spun yarn dries faster than open-end cotton despite the extra weight.'},
    {title: 'Plush, not scratchy', text: 'Finer-twisted yarn is softer against skin from the first wash.'},
    {title: 'Built to last', text: 'Ring-spun cotton resists the thinning and pilling cheaper towels show early.'},
  ],
  specsHeading: 'Specification',
  specRows: [
    {label: 'Weight', value: '650 GSM'},
    {label: 'Fabric', value: '100% pure cotton, ring-spun'},
    {label: 'Colour', value: 'White'},
  ],
  careHeading: 'Care',
  careItems: [
    {number: '01', text: 'Machine wash warm with like colours. Skip the fabric softener — it coats the loops and kills absorbency.'},
    {number: '02', text: 'Tumble dry low to medium, or line dry.'},
    {number: '03', text: 'Wash before first use to reach full absorbency — this is true of any cotton towel.'},
    {number: '04', text: 'Hang to dry between uses so it gets to fully dry, not just air out.'},
  ],
  boxEyebrow: 'What you get',
  boxHeading: 'In the box',
  boxItems: ['1 bath towel, 650 GSM', 'Ring-spun cotton, White', 'Folded and ready to ship'],
};

const handTowels: ProductStoryContent = {
  displayName: 'Hand Towel Set',
  heroKicker: '150 GSM · pack of 2',
  showWeave: false,
  storyEyebrow: 'Built for daily use',
  storyHeading: 'The towel that gets used the most',
  storyParagraphs: [
    'Hand towels get more daily contact than almost any other textile in the house, which is exactly why weight and absorbency matter more here than the marketing usually admits.',
    'At 150 GSM these sit at a deliberately lighter, quick-dry weight than a bath towel — enough cotton to actually dry your hands, light enough to dry themselves between uses instead of staying damp on the rail.',
  ],
  comparisonEyebrow: 'Against the market standard',
  comparisonHeading: 'Same word on the label. Different thing in the box.',
  comparisonMarketLabel: 'Market standard',
  comparisonRows: [
    {label: 'Weight', market: 'Thin, barely absorbs', loom: '150 GSM, genuinely absorbent'},
    {label: 'Dry time', market: 'Stays damp on the rail', loom: 'Dries between uses'},
    {label: 'After 30 washes', market: 'Thins, frays at the edge', loom: 'Holds its weight and hem'},
    {label: 'On the label', market: '"100% cotton" (no weight given)', loom: 'GSM printed in full'},
  ],
  benefitsEyebrow: 'What it does for you',
  benefits: [
    {title: 'Actually dries hands', text: '150 GSM is enough cotton mass to absorb, not just wipe.'},
    {title: 'Quick to dry itself', text: 'Lighter weight means it is ready again before its next use.'},
    {title: 'Pack of two', text: 'One at the sink, one as backup — or one for the kitchen.'},
    {title: 'Everyday durable', text: 'Holds its hem and weight through daily washing, not occasional.'},
  ],
  specsHeading: 'Specification',
  specRows: [
    {label: 'Weight', value: '150 GSM'},
    {label: 'Set contains', value: 'Pack of 2'},
    {label: 'Colour', value: 'White'},
  ],
  careHeading: 'Care',
  careItems: [
    {number: '01', text: 'Machine wash warm. Skip the fabric softener.'},
    {number: '02', text: 'Tumble dry low, or line dry — dries quickly either way.'},
    {number: '03', text: 'Wash before first use to reach full absorbency.'},
    {number: '04', text: 'Rotate the pair so one is always fully dry and ready.'},
  ],
  boxEyebrow: 'What you get',
  boxHeading: 'In the box',
  boxItems: ['2 hand towels, 150 GSM', 'White', 'Folded and ready to ship'],
};

/**
 * Deliberately thin: renders hero + real product description only, no
 * comparison/materials/steps/specs sections that would require inventing
 * facts about a product type we don't have written content for yet
 * (e.g. a first Latex Pillow SKU before its copy is written).
 */
const fallback: ProductStoryContent = {
  displayName: '', // always overwritten by getProductStoryContent's shortenTitle()
  heroKicker: 'Daily Loom',
  showWeave: false,
  storyEyebrow: 'About this piece',
  storyHeading: 'Made with the same standard as everything else we ship',
  storyParagraphs: [
    'We are still writing the full story for this piece — the specification below reflects exactly what Shopify has on file for it today.',
  ],
};

export const productStoryContent: Record<string, ProductStoryContent> = {
  'Bed Sheets': bedSheets,
  'Duvet Covers': duvetCovers,
  'Duvet / Comforter': comforter,
  'Bath Towels': bathTowels,
  'Hand Towels': handTowels,
  // Exact productType unconfirmed for the new Latex Pillow SKU — registered
  // under every plausible spelling; the keyword fallback below catches it
  // even if the real value doesn't match any of these exactly.
  'Latex Pillow': latexPillow,
  Pillow: latexPillow,
  Pillows: latexPillow,
};

/**
 * Narrower than the exact map above, but catches a productType whose exact
 * string we haven't confirmed yet (or that changes as the catalog is
 * edited) without risking a wrong match — "pillow" only ever means one
 * thing in this catalog today, unlike e.g. "duvet" which must stay an
 * exact match (Duvet Covers vs. Duvet / Comforter are very different
 * products).
 */
const KEYWORD_CONTENT: {test: RegExp; content: ProductStoryContent}[] = [
  {test: /pillow/i, content: latexPillow},
];

/**
 * Best-effort short name for a product Shopify's real (long, SEO-stuffed)
 * title has no written displayName for yet. Real titles here follow
 * "Daily Loom <Descriptor> - <Variant detail> | <Marketing bullet> | ...",
 * so the first " - " or "|" segment, with the "Daily Loom " prefix
 * stripped, is usually a reasonable short name. Hard-capped as a backstop
 * for titles that don't follow the pattern.
 */
function shortenTitle(title: string): string {
  const stripped = title.replace(/^daily loom\s+/i, '');
  const firstSegment = stripped.split(/\s+\||\s+-\s+/)[0].trim();
  const base = firstSegment || stripped;
  return base.length > 48 ? base.slice(0, 45).trimEnd() + '…' : base;
}

export function getProductStoryContent(
  productType: string | null | undefined,
  productTitle: string,
): ProductStoryContent {
  if (productType && productStoryContent[productType]) {
    return productStoryContent[productType];
  }
  if (productType) {
    const keywordMatch = KEYWORD_CONTENT.find((k) => k.test.test(productType));
    if (keywordMatch) return keywordMatch.content;
  }
  return {...fallback, displayName: shortenTitle(productTitle)};
}
