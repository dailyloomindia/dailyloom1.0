import {useEffect, useMemo, useState} from 'react';
import {Link, useLoaderData, useOutletContext} from '@remix-run/react';
import type {LoaderFunctionArgs, MetaFunction} from '@shopify/remix-oxygen';
import {LoomImage} from '~/components/loom/LoomImage';
import {CATEGORY_STORY, productCopy} from '~/data/loomContent';
import {
  LOOM_PRODUCT_FRAGMENT,
  collectionPath,
  colourValues,
  findVariant,
  formatMoneyV2,
  joinWords,
  productPath,
  shortenTitle,
  swatchColor,
  type LoomCollection,
  type LoomImage as LoomImageData,
  type LoomProduct,
} from '~/lib/loom';

export const meta: MetaFunction = () => [
  {title: 'Daily Loom | Duvets, Bed Linen, Latex Pillows and Towels'},
  {
    name: 'description',
    content:
      'Cotton percale bed sheets and duvet covers, a 300 GSM winter duvet, natural latex pillows and ring-spun cotton towels, made for everyday rest.',
  },
  {property: 'og:title', content: 'Daily Loom'},
  {property: 'og:type', content: 'website'},
];

export async function loader({context}: LoaderFunctionArgs) {
  const {collections} = await context.storefront.query(HOME_QUERY, {
    cache: context.storefront.CacheShort(),
  });
  return {collections: (collections?.nodes || []) as LoomCollection[]};
}

interface Placed {
  product: LoomProduct;
  collectionHandle: string;
}

function useCatalog(collections: LoomCollection[]) {
  return useMemo(() => {
    const seen = new Set<string>();
    const all: Placed[] = [];
    collections.forEach((c) =>
      c.products.nodes.forEach((p) => {
        if (seen.has(p.id)) return;
        seen.add(p.id);
        all.push({product: p, collectionHandle: c.handle});
      }),
    );
    const find = (test: RegExp) => all.find((x) => test.test(x.product.productType || x.product.title));
    return {
      duvet: find(/comforter|^duvet$|duvet \/|winter duvet/i),
      cover: find(/duvet cover/i),
      sheet: find(/sheet/i),
      pillow: find(/pillow/i),
      towels: all.filter((x) => /towel/i.test(x.product.productType || x.product.title)),
    };
  }, [collections]);
}

function From({product}: {product: LoomProduct}) {
  const price = product.priceRange.minVariantPrice;
  const compare = product.compareAtPriceRange?.minVariantPrice;
  const onSale = compare && Number(compare.amount) > Number(price.amount);
  return (
    <>
      From {formatMoneyV2(price)}
      {onSale && <span className="lm-strike">{formatMoneyV2(compare)}</span>}
    </>
  );
}

function nameOf(product: LoomProduct) {
  return productCopy(product.productType)?.name || shortenTitle(product.title);
}

type BrandAssets = {
  video: {url: string; mimeType: string} | null;
  videoPreviewImage: LoomImageData | null;
};

function HeroMedia({fallback}: {fallback: LoomImageData | null | undefined}) {
  const {brandAssets} = useOutletContext<{brandAssets: BrandAssets}>();
  const video = brandAssets?.video;
  const poster = brandAssets?.videoPreviewImage || fallback;
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (!video) return;
    const conn = (navigator as Navigator & {connection?: {saveData?: boolean; effectiveType?: string}}).connection;
    const slow = conn?.saveData || /2g/.test(conn?.effectiveType || '');
    if (slow || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setShowVideo(true);
  }, [video]);

  return (
    <div style={{position: 'absolute', inset: 0}}>
      <LoomImage image={poster} alt="A made bed in soft morning light" sizes="100vw" eager />
      {showVideo && video && (
        <video className="lm-fill" autoPlay muted loop playsInline preload="auto" poster={poster?.url} aria-hidden="true">
          <source src={video.url} type={video.mimeType} />
        </video>
      )}
    </div>
  );
}

export default function Home() {
  const {collections} = useLoaderData<typeof loader>();
  const {duvet, cover, sheet, pillow, towels} = useCatalog(collections);

  const bedroomHref = sheet ? collectionPath(sheet.collectionHandle) : duvet ? collectionPath(duvet.collectionHandle) : '/collections/all';
  const towelsHref = towels[0] ? collectionPath(towels[0].collectionHandle) : null;

  return (
    <main>
      <section className="lm-hero" data-screen-label="Home · Hero">
        <HeroMedia fallback={duvet?.product.featuredImage || sheet?.product.featuredImage} />
        <div className="lm-hero__shade" />
        <div className="lm-hero__body">
          <div data-reveal="80" className="lm-col" style={{maxWidth: 820, gap: 22}}>
            <span className="lm-tag lm-tag--dark">Bed &amp; Bath</span>
            <h1 className="lm-h-hero" style={{color: 'var(--lm-paper)'}}>
              Woven for the hours you rest.
            </h1>
          </div>
          <div data-reveal="320" className="lm-col" style={{gap: 22, maxWidth: 340}}>
            <p>Duvets, cotton percale linens, natural latex pillows and towels, made for the Indian home.</p>
            <div className="lm-row" style={{gap: 12}}>
              <Link to={bedroomHref} prefetch="intent" className="lm-btn lm-btn--light">
                Explore the bedroom
              </Link>
              {towelsHref && (
                <Link to={towelsHref} prefetch="intent" className="lm-btn lm-btn--ghost-light">
                  Towels
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section
        className="lm-satin lm-pad lm-row"
        style={{paddingBlock: 'clamp(100px,14vw,180px) clamp(80px,10vw,140px)', gap: 40}}
      >
        <div style={{flex: '1 1 200px', paddingTop: 14}}>
          <span className="lm-tag">Daily Loom</span>
        </div>
        <p data-reveal="0" className="lm-statement" style={{flex: '3 1 520px'}}>
          Essentials for the bed and bath, in cotton percale, ring-spun cotton terry and natural latex.{' '}
          <span>Made to be used every day, and to feel better each time.</span>
        </p>
      </section>

      {duvet && (
        <section
          data-screen-label="Home · Duvets"
          className="lm-pad lm-row"
          style={{paddingBottom: 'clamp(100px,12vw,180px)', gap: 'clamp(32px,5vw,88px)', alignItems: 'flex-end'}}
        >
          <Link
            to={productPath(duvet.product.handle)}
            data-reveal="0"
            className="lm-frame"
            style={{flex: '7 1 460px', height: 'clamp(420px,60vw,800px)'}}
          >
            <div className="lm-frame__zoom">
              <LoomImage image={duvet.product.featuredImage} alt={nameOf(duvet.product)} sizes="(min-width: 900px) 60vw, 100vw" />
            </div>
          </Link>
          <div data-reveal="160" className="lm-col" style={{flex: '4 1 320px', gap: 22, paddingBottom: 20}}>
            <span className="lm-tag">Duvets</span>
            <h2 className="lm-h-lg">The Winter Duvet.</h2>
            <p className="lm-lede" style={{maxWidth: 420}}>
              Warmth without the weight. 300 GSM microfiber in a reversible, three-layer build that traps heat on cold
              nights.
            </p>
            <div style={{fontSize: 15}}>
              <From product={duvet.product} />
            </div>
            <div className="lm-row" style={{alignItems: 'center', gap: 24}}>
              <Link to={collectionPath(duvet.collectionHandle)} prefetch="intent" className="lm-btn lm-btn--dark">
                Discover duvets
              </Link>
              <Link to={productPath(duvet.product.handle)} prefetch="intent" className="lm-link">
                Buy →
              </Link>
            </div>
            {cover && (
              <Link
                to={productPath(cover.product.handle)}
                className="lm-hr-top"
                style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 18, paddingTop: 22, fontSize: 14, color: 'var(--lm-muted)'}}
              >
                <span style={{width: 7, height: 7, borderRadius: '50%', background: '#A3A585', flex: 'none'}} />
                Pair it with the percale duvet cover · <From product={cover.product} />
              </Link>
            )}
          </div>
        </section>
      )}

      {(cover || sheet) && <WeaveSection cover={cover} sheet={sheet} />}

      {(cover || sheet) && (
        <section
          data-screen-label="Home · Covers & Sheets"
          className="lm-pad lm-row"
          style={{paddingBlock: 'clamp(100px,12vw,180px)', gap: 'clamp(24px,2.8vw,40px)', alignItems: 'flex-start'}}
        >
          {cover && (
            <ProductFeature
              placed={cover}
              tag="Duvet Covers"
              heading="Covers that soften with every wash."
              note={colourValues(cover.product).length > 0 ? `in ${joinWords(colourValues(cover.product))}` : ''}
              style={{flex: '5 1 340px'}}
              height="clamp(480px,54vw,760px)"
              delay="0"
            />
          )}
          {sheet && (
            <ProductFeature
              placed={sheet}
              tag="Bedsheets"
              heading="Cool, crisp cotton percale."
              note="with two pillow covers"
              style={{flex: '7 1 440px', marginTop: cover ? 'clamp(0px,9vw,160px)' : 0}}
              height="clamp(440px,48vw,680px)"
              delay="180"
            />
          )}
        </section>
      )}

      {pillow && (
        <section data-screen-label="Home · Pillow" className="lm-satin lm-satin--dark lm-row" style={{minHeight: '100vh'}}>
          <div
            className="lm-col"
            style={{flex: '4 1 360px', padding: 'clamp(100px,12vw,170px) var(--lm-gutter)', justifyContent: 'center', gap: 26, boxSizing: 'border-box'}}
          >
            <div data-reveal="0" className="lm-col" style={{gap: 22}}>
              <span className="lm-tag lm-tag--dark">Pillows</span>
              <h2 className="lm-h-lg" style={{color: 'var(--lm-paper)'}}>
                Natural latex. Naturally supportive.
              </h2>
              <p className="lm-lede" style={{color: '#B8AE9E', maxWidth: 420}}>
                Springs back the moment you lift your head. A slim, 4-inch profile in a breathable knitted shell, for
                stomach and back sleepers.
              </p>
            </div>
            <div data-reveal="220" className="lm-row" style={{alignItems: 'center', gap: 24, marginTop: 10}}>
              <Link to={collectionPath(pillow.collectionHandle)} prefetch="intent" className="lm-btn lm-btn--light">
                Discover the pillow
              </Link>
              <span style={{fontSize: 15, color: '#B8AE9E'}}>
                <From product={pillow.product} />
              </span>
            </div>
          </div>
          <div data-reveal="0" className="lm-frame lm-frame--dark" style={{flex: '6 1 460px', minHeight: 'clamp(520px,60vw,100vh)'}}>
            <LoomImage image={pillow.product.featuredImage} alt={nameOf(pillow.product)} sizes="(min-width: 900px) 60vw, 100vw" />
          </div>
        </section>
      )}

      {towels.length > 0 && <TowelSection towels={towels} />}

      <section data-screen-label="Home · Story" style={{position: 'relative', paddingBottom: 'clamp(80px,10vw,140px)'}}>
        <div data-reveal="0" className="lm-frame" style={{height: 'clamp(460px,80vh,900px)', outline: 0}}>
          <LoomImage
            image={sheet?.product.images.nodes[1] || cover?.product.images.nodes[1] || sheet?.product.featuredImage}
            alt="Cotton percale, up close"
            sizes="100vw"
          />
        </div>
        <div
          data-reveal="120"
          className="lm-col"
          style={{
            position: 'relative',
            margin: 'clamp(-200px,-12vw,-80px) var(--lm-gutter) 0 auto',
            maxWidth: 560,
            backgroundColor: 'var(--lm-paper)',
            padding: 'clamp(32px,4.5vw,64px)',
            gap: 22,
            outline: '1px dashed rgba(126,82,50,.45)',
            outlineOffset: -12,
          }}
        >
          <img src="/images/v3/logo-mark-128.webp" alt="" width={56} height={60} />
          <h2 className="lm-h-md">Named for the loom, made for everyday use.</h2>
          <p className="lm-lede" style={{fontSize: 17, lineHeight: 1.65}}>
            We keep our materials honest and label them in full: cotton percale, ring-spun terry and natural latex. So
            what reaches your home is comfortable from the first night, and stays that way.
          </p>
        </div>
      </section>
    </main>
  );
}

function ProductFeature({
  placed,
  tag,
  heading,
  note,
  style,
  height,
  delay,
}: {
  placed: Placed;
  tag: string;
  heading: string;
  note: string;
  style: React.CSSProperties;
  height: string;
  delay: string;
}) {
  const href = productPath(placed.product.handle);
  return (
    <div data-reveal={delay} className="lm-col" style={{...style, gap: 30}}>
      <Link to={href} prefetch="intent" style={{display: 'block'}}>
        <div className="lm-frame" style={{height}}>
          <div className="lm-frame__zoom">
            <LoomImage image={placed.product.featuredImage} alt={nameOf(placed.product)} sizes="(min-width: 900px) 50vw, 100vw" />
          </div>
        </div>
      </Link>
      <div className="lm-col" style={{gap: 12, maxWidth: 440}}>
        <span className="lm-tag">{tag}</span>
        <h3 className="lm-h-sm">{heading}</h3>
        <div style={{fontSize: 15, color: 'var(--lm-muted)'}}>
          <From product={placed.product} />
          {note && ` · ${note}`}
        </div>
        <Link to={href} prefetch="intent" className="lm-link">
          Discover →
        </Link>
      </div>
    </div>
  );
}

function WeaveSection({cover, sheet}: {cover?: Placed; sheet?: Placed}) {
  const points = CATEGORY_STORY['bed-sheet-set'].closer.points;
  const [i, setI] = useState(0);
  const cur = points[i];
  return (
    <section data-screen-label="Home · Weave" className="lm-satin lm-satin--linen lm-pad" style={{paddingBlock: 'clamp(100px,12vw,170px)'}}>
      <div className="lm-row" style={{justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, marginBottom: 'clamp(48px,6vw,88px)'}}>
        <div data-reveal="0" className="lm-col" style={{maxWidth: 640, gap: 20}}>
          <span className="lm-tag lm-tag--paper">Duvet Covers &amp; Bedsheets</span>
          <h2 className="lm-h-xl">Woven in cotton percale.</h2>
        </div>
        <p data-reveal="120" className="lm-lede" style={{maxWidth: 380, color: '#554D42'}}>
          Our covers and sheets are cotton percale: the plainest weave there is, which is why it cannot hide anything.
          Tap to look closer.
        </p>
      </div>
      <div className="lm-row" style={{gap: 'clamp(32px,5vw,88px)', alignItems: 'stretch'}}>
        <div
          data-reveal="0"
          className="lm-zoom"
          style={{flex: '6 1 420px', height: 'clamp(360px,44vw,640px)', backgroundSize: `${Math.round(90 + cur.zoom * 40)}%`, backgroundPosition: '62% 58%'}}
        >
          <div className="lm-caption">
            <span className="lm-serif" style={{fontSize: 20, letterSpacing: 0}}>
              {cur.t}
            </span>
            {cur.label}
          </div>
        </div>
        <div className="lm-col" style={{flex: '4 1 300px', justifyContent: 'space-between', gap: 40}}>
          <div className="lm-col">
            {points.map((p, idx) => (
              <button key={p.t} type="button" className="lm-pick" aria-pressed={idx === i} onClick={() => setI(idx)}>
                <span className="lm-pick__big">{p.t}</span>
                <span className="lm-pick__d">{p.b}</span>
              </button>
            ))}
          </div>
          <div className="lm-row" style={{gap: 12}}>
            {cover && (
              <Link to={productPath(cover.product.handle)} prefetch="intent" className="lm-btn lm-btn--dark">
                Discover duvet covers
              </Link>
            )}
            {sheet && (
              <Link to={collectionPath(sheet.collectionHandle)} prefetch="intent" className="lm-btn lm-btn--ghost">
                Discover bedsheets
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function TowelSection({towels}: {towels: Placed[]}) {
  const [ti, setTi] = useState(() => Math.max(0, towels.findIndex((t) => /bath/i.test(t.product.productType))));
  const towel = towels[ti] || towels[0];
  const colours = colourValues(towel.product);
  const [colour, setColour] = useState<string | null>(null);
  const activeColour = colour && colours.includes(colour) ? colour : colours[0] || null;
  const variant =
    (activeColour &&
      towel.product.variants.nodes.find((v) => v.selectedOptions.some((o) => /colou?r/i.test(o.name) && o.value === activeColour))) ||
    findVariant(towel.product.variants.nodes, {}) ||
    towel.product.variants.nodes[0];
  const label = (t: LoomProduct) => t.productType.replace(/\s*towels?$/i, '') || nameOf(t);
  const weight = (t: LoomProduct) => productCopy(t.productType)?.specs.find(([k]) => k === 'Weight')?.[1] || '';

  return (
    <section data-screen-label="Home · Towels" className="lm-pad" style={{paddingBlock: 'clamp(100px,12vw,180px)'}}>
      <div className="lm-row" style={{justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, marginBottom: 'clamp(48px,6vw,88px)'}}>
        <div data-reveal="0" className="lm-col" style={{maxWidth: 640, gap: 20}}>
          <span className="lm-tag">Towels</span>
          <h2 className="lm-h-xl">Weight you can feel.</h2>
        </div>
        <p data-reveal="120" className="lm-lede" style={{maxWidth: 380}}>
          Ring-spun cotton terry, from a quick-drying 150 GSM hand towel to a plush 650 GSM bath towel.
        </p>
      </div>
      <div className="lm-row" style={{gap: 'clamp(32px,5vw,88px)', alignItems: 'stretch'}}>
        <Link
          to={productPath(towel.product.handle)}
          data-reveal="0"
          className="lm-frame"
          style={{flex: '7 1 440px', height: 'clamp(440px,50vw,680px)', backgroundColor: swatchColor(activeColour || 'white')}}
        >
          <div className="lm-frame__zoom">
            <LoomImage image={variant?.image || towel.product.featuredImage} alt={nameOf(towel.product)} sizes="(min-width: 900px) 60vw, 100vw" />
          </div>
          <div className="lm-caption lm-caption--top">
            {[activeColour, 'Cotton terry', `${label(towel.product)} ${weight(towel.product)}`.trim()].filter(Boolean).join(' · ')}
          </div>
        </Link>
        <div className="lm-col" style={{flex: '4 1 300px', gap: 36}}>
          <div className="lm-col">
            <div className="lm-label-sm" style={{marginBottom: 8}}>
              Towel
            </div>
            {towels.map((t, idx) => (
              <button key={t.product.id} type="button" className="lm-pick lm-pick--row" aria-pressed={idx === ti} onClick={() => setTi(idx)}>
                <span className="lm-pick__big">{label(t.product)}</span>
                <span style={{fontSize: 14}}>
                  {[weight(t.product), formatMoneyV2(t.product.priceRange.minVariantPrice)].filter(Boolean).join(' · ')}
                </span>
              </button>
            ))}
          </div>
          {colours.length > 0 && (
            <div className="lm-col" style={{gap: 14}}>
              <div className="lm-label-sm">
                Colour · <span style={{color: 'var(--lm-ink)'}}>{activeColour}</span>
              </div>
              <div className="lm-swatches">
                {colours.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className="lm-swatch"
                    aria-label={c}
                    aria-pressed={c === activeColour}
                    style={{backgroundColor: swatchColor(c)}}
                    onClick={() => setColour(c)}
                  />
                ))}
              </div>
            </div>
          )}
          <div className="lm-row" style={{alignItems: 'center', gap: 22, marginTop: 'auto'}}>
            <Link to={collectionPath(towel.collectionHandle)} prefetch="intent" className="lm-btn lm-btn--dark">
              Discover towels
            </Link>
            <span style={{fontSize: 16}}>{formatMoneyV2(variant?.price || towel.product.priceRange.minVariantPrice)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const HOME_QUERY = `#graphql
  query HomeCollections {
    collections(first: 20) {
      nodes {
        id
        handle
        title
        description
        products(first: 12) {
          nodes { ...LoomProduct }
        }
      }
    }
  }
  ${LOOM_PRODUCT_FRAGMENT}
`;
