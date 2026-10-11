import {useState} from 'react';
import {Link, useLoaderData} from '@remix-run/react';
import type {LoaderFunctionArgs, MetaFunction} from '@shopify/remix-oxygen';
import {LoomImage} from '~/components/loom/LoomImage';
import {CATEGORY_STORY, productCopy, type CategoryStory} from '~/data/loomContent';
import {
  LOOM_PRODUCT_FRAGMENT,
  formatMoneyV2,
  productPath,
  shortenTitle,
  type LoomCollection,
  type LoomImage as LoomImageData,
  type LoomProduct,
} from '~/lib/loom';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  const c = data?.collection;
  const story = c ? CATEGORY_STORY[c.handle] : undefined;
  return [
    {title: `${c?.title || 'Collection'} | Daily Loom`},
    {name: 'description', content: c?.description || story?.intro || 'Daily Loom bed and bath essentials.'},
  ];
};

export async function loader({params, context}: LoaderFunctionArgs) {
  const {handle} = params;
  if (!handle) throw new Response('Collection not found', {status: 404});
  const {collection} = await context.storefront.query(COLLECTION_QUERY, {
    variables: {handle},
    cache: context.storefront.CacheShort(),
  });
  if (!collection) throw new Response('Collection not found', {status: 404});
  return {collection: collection as LoomCollection};
}

const nameOf = (p: LoomProduct) => productCopy(p.productType)?.name || shortenTitle(p.title);

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({top: el.getBoundingClientRect().top + window.scrollY - 107, behavior: reduce ? 'auto' : 'smooth'});
}

export default function CollectionPage() {
  const {collection} = useLoaderData<typeof loader>();
  const story = CATEGORY_STORY[collection.handle];
  const products = collection.products.nodes;
  if (!story) return <PlainCollection collection={collection} />;

  const images: LoomImageData[] = products.flatMap((p) => p.images.nodes);
  const hero = products[0]?.featuredImage || images[0];
  const pool = images.length > 1 ? images.slice(1) : images;

  return (
    <main data-screen-label="Story" style={{paddingTop: 'var(--lm-nav-h)'}}>
      <div className="lm-subnav">
        <span className="lm-subnav__title">{collection.title}</span>
        <div className="lm-subnav__links">
          {[
            ['Overview', 'st-overview'],
            ['Why Daily Loom', 'st-why'],
            ['Closer look', 'st-closer'],
            ['Compare', 'st-compare'],
          ].map(([label, id]) => (
            <button key={id} type="button" onClick={() => scrollToId(id)}>
              {label}
            </button>
          ))}
        </div>
        <button type="button" className="lm-btn lm-btn--dark lm-btn--sm" onClick={() => scrollToId('st-buy')}>
          Buy
        </button>
      </div>

      <section id="st-overview" className="lm-hero" style={{height: 'calc(100svh - 108px)', minHeight: 560}}>
        <div style={{position: 'absolute', inset: 0}}>
          <LoomImage image={hero} alt={collection.title} sizes="100vw" eager />
        </div>
        <div className="lm-hero__shade" />
        <div
          data-reveal="100"
          className="lm-col"
          style={{position: 'absolute', left: 'var(--lm-gutter)', right: 'var(--lm-gutter)', bottom: 'clamp(40px,8vh,88px)', gap: 18, maxWidth: 900}}
        >
          <span className="lm-tag lm-tag--dark">{collection.title}</span>
          <h1 className="lm-h-hero" style={{fontSize: 'clamp(48px,7.6vw,120px)', letterSpacing: '-.015em', color: 'var(--lm-paper)'}}>
            {story.tagline}
          </h1>
        </div>
      </section>

      <section className="lm-satin lm-pad" style={{paddingBlock: 'clamp(100px,14vw,190px)'}}>
        <p data-reveal="0" className="lm-statement" style={{margin: '0 0 0 auto', maxWidth: 1040, fontSize: 'clamp(30px,3.8vw,58px)', lineHeight: 1.2}}>
          {story.intro} <span>{story.accent}</span>
        </p>
      </section>

      <section id="st-why" className="lm-pad lm-col" style={{paddingBottom: 'clamp(60px,8vw,120px)', gap: 'clamp(100px,12vw,180px)'}}>
        {story.why.map((w, i) => (
          <div key={w.tag} className="lm-row" style={{flexDirection: i % 2 ? 'row-reverse' : 'row', gap: 'clamp(32px,5vw,88px)', alignItems: 'center'}}>
            <div data-reveal="0" className="lm-frame" style={{flex: '7 1 460px', height: 'clamp(420px,54vw,740px)'}}>
              <LoomImage image={pool[i % Math.max(1, pool.length)]} alt={`${collection.title} · ${w.tag}`} sizes="(min-width: 900px) 60vw, 100vw" />
            </div>
            <div data-reveal="160" className="lm-col" style={{flex: '4 1 320px', gap: 22}}>
              <span className="lm-tag">{w.tag}</span>
              <h2 className="lm-h-md">{w.t}</h2>
              <p className="lm-lede" style={{lineHeight: 1.65, maxWidth: 440}}>
                {w.b}
              </p>
            </div>
          </div>
        ))}
      </section>

      <CloserLook story={story} />

      <section id="st-compare" className="lm-satin lm-satin--linen lm-pad" style={{paddingBlock: 'clamp(100px,12vw,170px)'}}>
        <div data-reveal="0" className="lm-col" style={{gap: 20, marginBottom: 'clamp(40px,5vw,72px)'}}>
          <span className="lm-tag lm-tag--paper">Why Daily Loom</span>
          <h2 className="lm-h-xl">How we compare.</h2>
        </div>
        <div data-reveal="120" className="lm-compare">
          <div className="lm-compare__head" />
          <div className="lm-compare__head lm-compare__a">
            <span className="lm-tag lm-tag--ink" style={{marginTop: 16}}>
              Daily Loom
            </span>
          </div>
          <div className="lm-compare__head lm-label-sm" style={{paddingTop: 34, letterSpacing: '.2em'}}>
            Typical
          </div>
          {story.compare.map(([k, a, b]) => (
            <div key={k} style={{display: 'contents'}}>
              <div className="lm-compare__k">{k}</div>
              <div className="lm-compare__a">{a}</div>
              <div className="lm-compare__b">{b}</div>
            </div>
          ))}
        </div>
        <div data-reveal="0" className="lm-row" style={{gap: 28, marginTop: 'clamp(64px,7vw,100px)', maxWidth: 1160, alignItems: 'baseline'}}>
          <span className="lm-serif" style={{flex: '1 1 200px', fontSize: 28}}>
            Caring for it
          </span>
          <p className="lm-lede" style={{flex: '3 1 420px', fontSize: 17, lineHeight: 1.65, color: '#554D42'}}>
            {story.care}
          </p>
        </div>
      </section>

      <section id="st-buy" data-screen-label="Story · Buy" className="lm-satin lm-pad" style={{paddingBlock: 'clamp(100px,12vw,170px)'}}>
        <div data-reveal="0" className="lm-col" style={{alignItems: 'center', textAlign: 'center', gap: 18, marginBottom: 'clamp(56px,6vw,96px)'}}>
          <img src="/images/v3/logo-mark-128.webp" alt="" width={60} height={64} />
          <h2 className="lm-h-xl" style={{fontSize: 'clamp(44px,5.6vw,88px)', lineHeight: 1}}>
            Bring it home.
          </h2>
          <p className="lm-lede" style={{maxWidth: 460, fontSize: 17}}>
            {story.buyLede}
          </p>
        </div>
        <ProductGrid products={products} />
      </section>
    </main>
  );
}

function CloserLook({story}: {story: CategoryStory}) {
  const [i, setI] = useState(0);
  const points = story.closer.points;
  const cur = points[i] || points[0];
  return (
    <section id="st-closer" className="lm-satin lm-satin--dark lm-pad" style={{paddingBlock: 'clamp(100px,12vw,170px)'}}>
      <div data-reveal="0" className="lm-row" style={{justifyContent: 'space-between', alignItems: 'flex-end', gap: 28, marginBottom: 'clamp(48px,6vw,80px)'}}>
        <div className="lm-col" style={{gap: 20, maxWidth: 640}}>
          <span className="lm-tag lm-tag--dark">A closer look</span>
          <h2 className="lm-h-xl" style={{color: 'var(--lm-paper)'}}>
            {story.closer.title}
          </h2>
        </div>
        <p style={{maxWidth: 360, fontSize: 17, lineHeight: 1.6, fontWeight: 300, color: '#B8AE9E'}}>{story.closer.lede}</p>
      </div>
      <div className="lm-row" style={{gap: 'clamp(32px,5vw,88px)', alignItems: 'stretch'}}>
        <div className="lm-col" style={{flex: '4 1 300px'}}>
          {points.map((p, idx) => (
            <button key={p.t} type="button" className="lm-pick lm-pick--stack" aria-pressed={idx === i} onClick={() => setI(idx)}>
              <span className="lm-pick__big">{p.t}</span>
              <span className="lm-pick__d">{p.b}</span>
            </button>
          ))}
        </div>
        <div
          data-reveal="0"
          className="lm-zoom"
          style={{
            flex: '6 1 420px',
            height: 'clamp(380px,46vw,640px)',
            backgroundColor: story.closer.base,
            backgroundSize: `${Math.round(90 + cur.zoom * 40)}%`,
            backgroundPosition: ['30% 40%', '62% 58%', '80% 30%'][i] || '50% 50%',
            outlineColor: 'rgba(200,146,94,.5)',
          }}
        >
          <div className="lm-caption">{cur.label}</div>
        </div>
      </div>
    </section>
  );
}

function ProductGrid({products}: {products: LoomProduct[]}) {
  if (products.length === 0) {
    return (
      <p className="lm-lede" style={{textAlign: 'center'}}>
        New pieces are on their way to this collection.
      </p>
    );
  }
  return (
    <div className="lm-row" style={{gap: 'clamp(24px,2.8vw,40px)', justifyContent: 'center'}}>
      {products.map((p, i) => {
        const href = productPath(p.handle);
        const compare = p.compareAtPriceRange?.minVariantPrice;
        const onSale = compare && Number(compare.amount) > Number(p.priceRange.minVariantPrice.amount);
        return (
          <div key={p.id} data-reveal={String(i * 120)} className="lm-col" style={{flex: '1 1 280px', maxWidth: 520, gap: 20}}>
            <Link to={href} prefetch="intent" style={{display: 'block'}}>
              <div className="lm-frame" style={{height: 'clamp(320px,32vw,480px)'}}>
                <div className="lm-frame__zoom">
                  <LoomImage image={p.featuredImage} alt={nameOf(p)} sizes="(min-width: 900px) 33vw, 100vw" />
                </div>
              </div>
            </Link>
            <div className="lm-col" style={{gap: 6}}>
              <Link to={href} className="lm-serif" style={{fontSize: 'clamp(24px,2.2vw,32px)'}}>
                {nameOf(p)}
              </Link>
              <span style={{fontSize: 15, color: 'var(--lm-muted)'}}>{productCopy(p.productType)?.short}</span>
            </div>
            <div className="lm-hr-top" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, paddingTop: 18}}>
              <span style={{fontSize: 16}}>
                {p.variants.nodes.length > 1 ? 'From ' : ''}
                {formatMoneyV2(p.priceRange.minVariantPrice)}
                {onSale && <span className="lm-strike">{formatMoneyV2(compare)}</span>}
              </span>
              <Link to={href} prefetch="intent" className="lm-btn lm-btn--dark" style={{padding: '14px 26px'}}>
                {p.availableForSale ? 'Buy now' : 'Sold out'}
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PlainCollection({collection}: {collection: LoomCollection}) {
  return (
    <main className="lm-satin lm-pad" style={{paddingTop: 'calc(var(--lm-nav-h) + clamp(64px,9vw,120px))', paddingBottom: 'clamp(100px,12vw,170px)'}}>
      <div data-reveal="0" className="lm-col" style={{gap: 20, marginBottom: 'clamp(48px,6vw,88px)', maxWidth: 760}}>
        <span className="lm-tag">Collection</span>
        <h1 className="lm-h-xl">{collection.title}</h1>
        {collection.description && <p className="lm-lede">{collection.description}</p>}
      </div>
      <ProductGrid products={collection.products.nodes} />
    </main>
  );
}

const COLLECTION_QUERY = `#graphql
  query LoomCollection($handle: String!) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(first: 24) {
        nodes { ...LoomProduct }
      }
    }
  }
  ${LOOM_PRODUCT_FRAGMENT}
`;
