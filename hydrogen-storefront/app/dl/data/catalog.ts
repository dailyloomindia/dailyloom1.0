// Shared catalog: products, categories, media and image slots.
// Copied verbatim from "Daily Loom v4.dc.html"; asset paths are root-relative.
/* eslint-disable */
// Design images on the Shopify CDN, by local file name (design/web-file-urls-*.csv).
export const WEB_IMG: Record<string, string> = {
  "bed-set-card.png": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-bed-set-card.png?v=1792532709",
  "covers-charcoal.jpg": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/Moody_Charcoal_Bedding_Close-Up.png?v=1793287280",
  "duvet-fill.png": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-duvet-fill.png?v=1792532736",
  "duvet-home.jpg": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-duvet-home.png?v=1792532732",
  "duvet-roll.jpg": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-duvet-roll.png?v=1792532729",
  "duvet-shell.png": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-duvet-shell.png?v=1792532737",
  "duvet-stitch.png": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-duvet-stitch.png?v=1792532730",
  "hero-bed-mobile.jpg": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-hero-bed-mobile.jpg?v=1792532664",
  "hero-bed.jpg": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-hero-bed.jpg?v=1792532665",
  "pillow-classic-card.png": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-pillow-classic-card.png?v=1792532738",
  "pillow-contour-card.png": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-pillow-contour-card.png?v=1792532724",
  "pillow-home-latex.png": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-pillow-home-latex.png?v=1792532711",
  "sheet-set-card.png": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-sheet-set-card.png?v=1792532712",
  "sheets-taupe.jpg": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-sheets-taupe.jpg?v=1792532663",
  "story-covers-hero.png": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-covers-hero.png?v=1792532723",
  "story-covers-why-0.png": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-covers-why-0.png?v=1792532719",
  "story-covers-why-1.png": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-covers-why-1.png?v=1793286275",
  "story-covers-why-2.png": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-covers-why-2.png?v=1792532710",
  "story-duvets-hero.jpg": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-duvets-hero.png?v=1792532730",
  "story-duvets-length.jpg": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-duvets-length.jpg?v=1792532742",
  "story-duvets-why-0.jpg": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-duvets-why-0.png?v=1792532730",
  "story-duvets-why-1.png": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-duvets-why-1.png?v=1792532727",
  "story-duvets-why-2.png": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-duvets-why-2.png?v=1792532737",
  "story-mill.jpg": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-mill.jpg?v=1792532662",
  "story-pillows-hero.png": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-pillows-hero.png?v=1792532716",
  "story-pillows-why-0.png": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-pillows-why-0.png?v=1792532722",
  "story-pillows-why-1.png": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-pillows-why-1.png?v=1792532716",
  "story-pillows-why-2.png": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-pillows-why-2.png?v=1792532738",
  "story-sheets-hero.png": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-sheets-hero.png?v=1792532718",
  "story-sheets-why-0.png": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-sheets-why-0.png?v=1792532735",
  "story-sheets-why-1.png": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-sheets-why-1.png?v=1792532718",
  "story-sheets-why-2.png": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-sheets-why-2.png?v=1792532724",
  "story-towels-hero-v2.png": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-towels-hero-v2.png?v=1792532739",
  "story-towels-weight-v2.png": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-towels-weight-v2.png?v=1792532726",
  "story-towels-why-0.png": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-towels-why-0.png?v=1792532737",
  "story-towels-why-1.png": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-towels-why-1.png?v=1792532725",
  "tc-300.jpg": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-tc-300.jpg?v=1792532665",
  "tc-400.jpg": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-tc-400.png?v=1792532742",
  "tc-600.jpg": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-tc-600.png?v=1792532741",
  "tc-800.jpg": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-tc-800.png?v=1792532740",
  "tex-charcoal.jpg": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-tex-charcoal.jpg?v=1792532661",
  "tex-taupe.jpg": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-tex-taupe.jpg?v=1792532661",
  "towel-bamboo-green.jpg": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-towel-bamboo-green.png?v=1792532744",
  "towel-bamboo-single.png": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-towel-bamboo-single.png?v=1792532740",
  "towel-cotton-single.png": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-towel-cotton-single.png?v=1792532739",
  "towel-set-card.png": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-towel-set-card.png?v=1792532733",
  "towel-terry-macro.png": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-towel-terry-macro.png?v=1792532707",
  "towel-waffle-macro.png": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-towel-waffle-macro.png?v=1792532734",
  "towels-cotton-stack.png": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-towels-cotton-stack.png?v=1792532711",
  "towels-white.jpg": "https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-towels-white.jpg?v=1792532666"
};
export const fmt = (n: number) => '₹' + n.toLocaleString('en-IN');
export const LINEN: any = [{v:'Dark taupe',hex:'#6E6158'},{v:'Charcoal grey',hex:'#4A4A4C'}];
export const TOWEL_C: any = [{v:'White',hex:'#F6F4EF'}];
export const TOWEL_B: any = [{v:'Sand brown',hex:'#9C8774'},{v:'Ash grey',hex:'#B9BAB5'},{v:'Lilac grey',hex:'#8F8791'},{v:'Dark blue',hex:'#626E85'},{v:'Dark brown',hex:'#665347'}];
export const TC: any = [{v:'300 TC',d:'Soft and airy',p:0},{v:'400 TC',d:'Smoother, deeper sheen',p:900}];
export const TC_COVER: any = [{v:'300 TC',d:'Soft and airy',p:0}];
export const PC_MONO: any = [{v:'None',p:0},{v:'Add initials',d:'₹150 per pillow cover, two covers',p:300}];
export const TT: any = [{v:'Face',d:'30 × 30 cm',p:0},{v:'Hand',d:'40 × 60 cm',p:450},{v:'Bath',d:'75 × 150 cm',p:1250}];
export const MONO: any = [{v:'None',p:0},{v:'Add initials',d:'₹100',p:100}];
export const TT_C: any = [{v:'Face',d:'Pair · 30 × 30 cm · 650 gsm',p:0},{v:'Hand',d:'Pair · 40 × 60 cm · 625 gsm · 150 g each',p:450},{v:'Bath',d:'75 × 150 cm · 650 gsm · 725 g',p:1250}];
export const IMG = (f: string) => WEB_IMG[f] || '/assets/img/' + f;
// Mock of Shopify product media. altText tags (split by "|") tie an image to option values; empty = shown for every selection.
export const SHOP_MEDIA: any = {
  'winter-duvet':[['duvet-roll.jpg',''],['story-duvets-why-0.jpg',''],['story-duvets-length.jpg',''],['story-duvets-why-2.png','']],
  'duvet-cover':[['covers-charcoal.jpg','Charcoal grey'],['tex-charcoal.jpg','Charcoal grey'],[null,'Dark taupe'],['tex-taupe.jpg','Dark taupe'],['story-covers-why-1.png','']],
  'bedsheet':[['sheet-set-card.png','Dark taupe'],['sheets-taupe.jpg','Dark taupe'],['tex-taupe.jpg','Dark taupe'],[null,'Charcoal grey'],['tex-charcoal.jpg','Charcoal grey'],['story-sheets-why-1.png','']],
  'bed-set':[['bed-set-card.png',''],['tex-taupe.jpg','Dark taupe'],['tex-charcoal.jpg','Charcoal grey'],['story-sheets-hero.png','']],
  'latex-pillow':[['pillow-classic-card.png',''],['story-pillows-why-1.png',''],['story-pillows-why-2.png',''],['story-pillows-why-0.png','']],
  'contour-pillow':[['pillow-contour-card.png',''],['story-pillows-why-1.png','']],
  'cotton-towel':[['towel-cotton-single.png',''],['story-towels-weight-v2.png','Bath'],[null,'Hand'],[null,'Face'],['towel-terry-macro.png','']],
  'cotton-towel-set':[['towel-set-card.png',''],['towels-cotton-stack.png',''],['towel-terry-macro.png','']],
  'bamboo-towel':[[null,'Sand brown'],[null,'Ash grey'],[null,'Lilac grey'],[null,'Dark blue'],[null,'Dark brown'],['towel-bamboo-single.png',''],['towel-waffle-macro.png','']]
};
export const P: any = {
  'winter-duvet': {cat:'duvets', name:'Winter Duvet', short:'A peach skin fabric shell, box-stitched so the fill stays even through the coldest months.', base:8900,
    opts:[{n:'Size', vals:[{v:'Single',d:'150 × 220 cm',p:0},{v:'Double',d:'200 × 220 cm',p:2600},{v:'King',d:'230 × 250 cm',p:4100}]}],
    details:'Peach skin fabric shell. Two layers of 150 gsm virgin fibre sheet, thread-stitched in boxes. Cut with extra length for full coverage. Three layers available on special order for high altitudes.', care:'Dry in shade. Dry cleaning is recommended. Store in the bag it arrives in.'},
  'duvet-cover': {cat:'covers', name:'Duvet Cover', short:'Percale-woven 100% virgin Indian cotton, for double and king duvets, closed with snap buttons.', pairShort:'100% virgin Indian cotton, for double and king duvets. Softens with every wash.', base:3900,
    opts:[{n:'Thread count', vals:TC_COVER},{n:'Size', vals:[{v:'Double / King',d:'92 × 102 inch · 234 × 259 cm',p:0}]},{n:'Colour', swatch:true, vals:LINEN}],
    details:'100% virgin Indian cotton, percale weave with a natural satin finish. 92 inch long × 102 inch wide (234 × 259 cm), for double and king duvets. Snap button closure.', care:'Dark tones are best washed on their own at first, then with like colours in cold water. Close the snap buttons before washing, line dry in shade, and iron warm while slightly damp.'},
  'bedsheet': {cat:'sheets', name:'Bedsheet Set', short:'A percale flat sheet with two matching pillow covers, in 100% virgin Indian cotton.', base:3200,
    opts:[{n:'Thread count', vals:TC_COVER},{n:'Size', vals:[{v:'One size',d:'Sheet 112 × 112 inch · two pillow covers 28 × 18 inch',p:0}]},{n:'Colour', swatch:true, vals:LINEN},{n:'Monogram', vals:PC_MONO}],
    details:'One flat sheet, 112 × 112 inch (284 × 284 cm), and two pillow covers, 28 × 18 inch (71 × 46 cm), all in the same colour and thread count. A flat sheet for double and king beds. 100% virgin Indian cotton, percale weave with a natural satin finish.', care:'Dark tones are best washed on their own at first, then with like colours in cold water. Line dry in shade, and iron warm while slightly damp for a smooth finish.'},
  'bed-set': {cat:'sheets', name:'The Complete Bed', short:'Duvet cover, flat sheet and two pillow covers, matched in thread count and colour.', base:6600,
    opts:[{n:'Thread count', vals:TC_COVER},{n:'Colour', swatch:true, vals:LINEN},{n:'Monogram', vals:PC_MONO}],
    details:'One duvet cover (92 × 102 inch), one flat sheet (112 × 112 inch) and two pillow covers (28 × 18 inch), all in the same colour and thread count. 100% virgin Indian cotton, percale weave with a natural satin finish. Snap button closure on the duvet cover.', care:'Dark tones are best washed on their own at first, then with like colours in cold water. Line dry in shade, and iron warm while slightly damp for a smooth finish.'},
  'latex-pillow': {cat:'pillows', name:'Natural Latex Pillow', short:'One solid piece of pure natural latex with pin-core cooling, in a knitted zip cover.', base:4200,
    opts:[{n:'Size', vals:[{v:'One size',d:'66 × 41 × 10 cm · 26 × 16 × 4 inch',p:0}]}],
    details:'One solid piece of 100% natural latex from Indian plantations, with pin-core ventilation. Slim 4 inch (10 cm) height. Protective inner fabric seals the core; knitted outer cover with zip. Soft: your head sinks in, and it springs back when you rise. A fresh natural latex scent for the first few days, which fades.', care:'Wash the knitted cover only. Keep the latex core out of direct sunlight and air it in shade.'},
  'contour-pillow': {cat:'pillows', name:'Natural Latex Contour Pillow', short:'The same pure natural latex, shaped to hold the natural C-shaped curve of your neck and keep your neck, head and back aligned.', base:4600,
    opts:[{n:'Size', vals:[{v:'One size',d:'66 × 41 × 10 cm · 26 × 16 × 4 inch',p:0}]}],
    details:'One solid piece of 100% natural latex from Indian plantations, contoured to maintain the natural C-shaped curve of the cervical spine, keeping the neck, head and back aligned, with pin-core ventilation. Slim 4 inch (10 cm) height. Protective inner fabric and knitted outer cover with zip. Soft: your head sinks in, and it springs back when you rise. A fresh natural latex scent for the first few days, which fades.', care:'Wash the knitted cover only. Keep the latex core out of direct sunlight and air it in shade.'},
  'cotton-towel': {cat:'towels', name:'Cotton Towel', short:'650 GSM pure virgin Indian cotton terry, cut, stitched and hemmed in our workshop. Dense, absorbent and soft from the first use.', base:690,
    opts:[{n:'Type', vals:TT_C},{n:'Colour', swatch:true, vals:TOWEL_C},{n:'Monogram', vals:MONO}],
    details:'100% pure virgin cotton, ringspun terry. Face and hand towels come as a pair. Face and bath towels 650 gsm, hand towels 625 gsm. Bath towel weighs 725 g, each hand towel 150 g. Woven border at each end.', care:'Wash with whites only, in warm water (about 40°C) with a mild liquid detergent. No fabric softener or chlorine bleach. Shake out, tumble dry low and remove as soon as dry.'},
  'cotton-towel-set': {cat:'towels', name:'Cotton Towel Set', short:'One bath, one hand and one face towel in 650 GSM pure white cotton. Made for gifting.', base:3390,
    opts:[{n:'Colour', swatch:true, vals:TOWEL_C},{n:'Monogram', vals:[{v:'None',p:0},{v:'Add initials',d:'₹100 per towel, three towels',p:300}]}],
    details:'One bath towel (75 × 150 cm), one hand towel (40 × 60 cm) and one face towel (30 × 30 cm). 100% pure virgin cotton, ringspun terry, with a woven border at each end.', care:'Wash with whites only, in warm water (about 40°C) with a mild liquid detergent. No fabric softener or chlorine bleach. Shake out, tumble dry low and remove as soon as dry.'},
  'bamboo-towel': {cat:'towels', name:'Bamboo Towel', short:'Pure bamboo, woven into a sculpted texture. Soft, absorbent and light in the hand, and quick to dry.', base:890,
    opts:[{n:'Type', vals:[{v:'Bath',d:'75 × 150 cm',p:1250}]},{n:'Colour', swatch:true, vals:TOWEL_B},{n:'Monogram', vals:MONO}],
    details:'100% bamboo terry in a sculpted, textured weave, with a woven border at each end. 75 × 150 cm.', care:'Wash separately to protect the textured weave from snagging. Mild liquid detergent, no fabric softener. Line dry in shade.'}
};
export const CATS: any = [
  {k:'duvets', name:'Duvets', items:[{pid:'winter-duvet'},{soon:true, name:'Summer Comforter'}]},
  {k:'covers', name:'Duvet Covers', items:[{pid:'duvet-cover',sel:{'Thread count':0},photoCol:'Charcoal grey',label:'300 TC · soft and airy'},{pid:'bed-set',badge:'Complete the bed',photoCol:'Charcoal grey',label:'Cover, sheet and two pillow covers'}]},
  {k:'sheets', name:'Bedsheets', items:[{pid:'bedsheet',sel:{'Thread count':0},photoCol:'Dark taupe',label:'300 TC · soft and airy'},{pid:'bed-set',badge:'Complete the bed',photoCol:'Charcoal grey',label:'Cover, sheet and two pillow covers'}]},
  {k:'pillows', name:'Pillows', items:[{pid:'latex-pillow', label:'Classic · an even, all-round feel'},{pid:'contour-pillow', label:'Contour · keeps the neck in its natural curve'}]},
  {k:'towels', name:'Towels', items:[{pid:'cotton-towel', badge:'Signature', sel:{Type:2}, label:'Pure white · face, hand or bath'},{pid:'cotton-towel-set', label:'Bath, hand and face · the complete set'},{pid:'bamboo-towel', sel:{Type:0}, label:'Five colours · bath towel'}]}
];
export const RECS: any = {duvets:['duvet-cover','latex-pillow','bedsheet'], covers:['winter-duvet','bedsheet','latex-pillow'], sheets:['duvet-cover','latex-pillow','cotton-towel'], pillows:['bedsheet','duvet-cover','winter-duvet'], towels:['bamboo-towel','cotton-towel','bedsheet']};
export const SRC: any = {'col-pillows-1':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-pillow-contour-card.png?v=1792532724','story-pillows-why-2':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-pillows-why-2.png?v=1792532738','story-pillows-why-1':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-pillows-why-1.png?v=1792532716','story-pillows-why-0':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-pillows-why-0.png?v=1792532722','story-pillows-hero':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-pillows-hero.png?v=1792532716','col-sheets-0':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-sheet-set-card.png?v=1792532712','pdp-bedsheet-1':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-sheet-set-card.png?v=1792532712','story-sheets-why-1':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-sheets-why-1.png?v=1792532718','story-sheets-why-2':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-sheets-why-2.png?v=1792532724','story-covers-why-0':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-covers-why-0.png?v=1792532719','story-covers-hero':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-covers-hero.png?v=1792532723','col-covers-1':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-bed-set-card.png?v=1792532709','col-sheets-1':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-bed-set-card.png?v=1792532709','pdp-bed-set-1':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-bed-set-card.png?v=1792532709','story-covers-why-2':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-covers-why-2.png?v=1792532710','story-covers-why-1':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-covers-why-1.png?v=1793286275','story-sheets-why-0':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-sheets-why-0.png?v=1792532735','story-sheets-hero':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-sheets-hero.png?v=1792532718','pdp-bamboo-towel-1':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-towel-bamboo-single.png?v=1792532740','col-towels-2':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-towel-bamboo-single.png?v=1792532740','pdp-cotton-towel-1':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-towel-cotton-single.png?v=1792532739','col-towels-0':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-towel-cotton-single.png?v=1792532739','story-towels-weight':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-towels-weight-v2.png?v=1792532726','col-towels-1':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-towel-set-card.png?v=1792532733','pdp-cotton-towel-set-1':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-towel-set-card.png?v=1792532733','story-towels-why-1':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-towels-why-1.png?v=1792532725','story-towels-why-0':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-towels-why-0.png?v=1792532737','story-towels-hero':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-towels-hero-v2.png?v=1792532739','story-duvets-length':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-duvets-length.jpg?v=1792532742','col-covers-0':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/Moody_Charcoal_Bedding_Close-Up.png?v=1793287280','story-duvets-why-0':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-duvets-why-0.png?v=1792532730','story-duvets-why-1':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-duvets-why-1.png?v=1792532727','story-duvets-why-2':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-duvets-why-2.png?v=1792532737','story-duvets-hero':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-duvets-hero.png?v=1792532730','col-duvets-0':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-duvet-roll.png?v=1792532729','pdp-winter-duvet-1':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-duvet-roll.png?v=1792532729','col-pillows-0':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-pillow-classic-card.png?v=1792532738','pdp-latex-pillow-1':'https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-pillow-classic-card.png?v=1792532738'};
