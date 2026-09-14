import {useEffect, useMemo, useState} from 'react';
import {useFetcher} from '@remix-run/react';
import {Money} from '@shopify/hydrogen';
import type {CurrencyCode} from '@shopify/hydrogen/storefront-api-types';
import {WeaveCanvas} from './WeaveCanvas';
import type {ProductStoryContent} from '~/data/productStoryContent';

interface MoneyAmount {
  amount: string;
  currencyCode: CurrencyCode;
}

interface ImageNode {
  url: string;
  altText?: string | null;
  width?: number;
  height?: number;
}

interface VariantNode {
  id: string;
  title: string;
  availableForSale: boolean;
  price: MoneyAmount;
  selectedOptions: {name: string; value: string}[];
}

interface ProductOption {
  name: string;
  optionValues: {name: string}[];
}

interface StoryProduct {
  id: string;
  title: string;
  handle: string;
  description?: string | null;
  productType?: string | null;
  priceRange: {minVariantPrice: MoneyAmount};
  compareAtPriceRange?: {minVariantPrice: MoneyAmount} | null;
  images: {nodes: ImageNode[]};
  variants: {nodes: VariantNode[]};
  options?: ProductOption[];
  availableForSale: boolean;
}

const FALLBACK_HERO = '/images/product-story/fallback-hero.webp';
const FALLBACK_STORY = '/images/product-story/fallback-story.webp';
const FALLBACK_BOX = '/images/product-story/fallback-box.webp';

function pickImage(images: ImageNode[], index: number, fallback: string, alt: string) {
  const img = images[index];
  if (img) return {src: img.url, alt: img.altText || alt, width: img.width, height: img.height};
  return {src: fallback, alt, width: undefined, height: undefined};
}

function findVariant(variants: VariantNode[], selected: Record<string, string>) {
  return (
    variants.find((v) => v.selectedOptions.every((o) => selected[o.name] === o.value)) ||
    variants[0]
  );
}

export function ProductStory({
  product,
  content,
}: {
  product: StoryProduct;
  content: ProductStoryContent;
}) {
  const images = product.images?.nodes || [];
  const variants = product.variants?.nodes || [];
  const options = product.options || [];
  const hasRealOptions = options.length > 0 && !(options.length === 1 && options[0].name === 'Title');

  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const first = variants[0];
    const init: Record<string, string> = {};
    first?.selectedOptions.forEach((o) => {
      init[o.name] = o.value;
    });
    return init;
  });

  const selectedVariant = useMemo(() => findVariant(variants, selected), [variants, selected]);
  const fetcher = useFetcher();
  const isAdding = fetcher.state === 'submitting';
  const justAdded = fetcher.state === 'idle' && fetcher.data && (fetcher.data as {success?: boolean}).success;

  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolledPastHero(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll('.dl-reveal');
    if (!('IntersectionObserver' in window) || els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      {threshold: 0.25},
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [product.id]);

  const addToCart = () => {
    if (!selectedVariant?.availableForSale) return;
    fetcher.submit({variantId: selectedVariant.id, quantity: '1'}, {method: 'post'});
  };

  const hero = pickImage(images, 0, FALLBACK_HERO, product.title);
  const story = pickImage(images, 1, FALLBACK_STORY, content.storyHeading);
  const box = pickImage(images, 2, FALLBACK_BOX, content.boxHeading || 'In the box');

  return (
    <div className="dl-story">
      <section className="dl-hero">
        <div className="dl-hero__media">
          <img src={hero.src} alt={hero.alt} width={hero.width} height={hero.height} loading="eager" fetchPriority="high" />
        </div>
        <div className="dl-hero__scrim" />
        <div className="dl-hero__content">
          <div className="dl-hero__kicker">{content.heroKicker}</div>
          <h1>{product.title}</h1>
          {product.description && <p>{product.description.slice(0, 220)}</p>}

          {hasRealOptions &&
            options.map((opt) => (
              <div className="dl-swatches" key={opt.name} role="group" aria-label={opt.name}>
                {opt.optionValues.map((val) => {
                  const isSelected = selected[opt.name] === val.name;
                  const wouldBeVariant = findVariant(variants, {...selected, [opt.name]: val.name});
                  const available = wouldBeVariant?.availableForSale ?? true;
                  return (
                    <button
                      key={val.name}
                      type="button"
                      className="dl-swatch"
                      data-selected={isSelected}
                      disabled={!available}
                      title={val.name}
                      onClick={() => setSelected((s) => ({...s, [opt.name]: val.name}))}
                    >
                      <span
                        className="dl-swatch__dot"
                        style={{background: swatchColor(val.name)}}
                        aria-hidden="true"
                      />
                      <span className="visually-hidden">{val.name}</span>
                    </button>
                  );
                })}
              </div>
            ))}

          <div className="dl-hero__ctas">
            <button
              type="button"
              className="dl-btn dl-btn--light"
              onClick={addToCart}
              disabled={!selectedVariant?.availableForSale || isAdding}
            >
              {isAdding
                ? 'Adding…'
                : justAdded
                  ? 'Added ✓'
                  : selectedVariant?.availableForSale
                    ? `Buy — `
                    : 'Sold out'}
              {!isAdding && !justAdded && selectedVariant?.availableForSale && (
                <Money data={selectedVariant.price} />
              )}
            </button>
            {(content.comparisonRows || content.specRows) && (
              <a href="#detail" className="dl-btn dl-btn--outline">
                Read the details
              </a>
            )}
          </div>
        </div>
      </section>

      {content.showWeave && <WeaveCanvas label={content.weaveLabel || 'Keep scrolling'} />}

      <section className="dl-section dl-section--cream">
        <div className="dl-wrap dl-story-grid">
          <div className="dl-reveal">
            <div className="dl-eyebrow">{content.storyEyebrow}</div>
            <h2 className="dl-h2">{content.storyHeading}</h2>
            {content.storyParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="dl-media-frame">
            <img src={story.src} alt={story.alt} width={story.width} height={story.height} loading="lazy" decoding="async" />
          </div>
        </div>
      </section>

      {content.comparisonRows && content.comparisonRows.length > 0 && (
        <section id="detail" className="dl-section dl-section--cream dl-section--rule">
          <div className="dl-wrap">
            <div className="dl-eyebrow">{content.comparisonEyebrow}</div>
            <h2 className="dl-h2" style={{marginBottom: 48}}>
              {content.comparisonHeading}
            </h2>
            <div className="dl-compare">
              <div className="dl-compare__head dl-compare__head--first" />
              <div className="dl-compare__head">{content.comparisonMarketLabel || 'Market standard'}</div>
              <div className="dl-compare__head dl-compare__head--loom">Daily Loom</div>
              {content.comparisonRows.map((row) => (
                <div key={row.label} style={{display: 'contents'}}>
                  <div className="dl-compare__label">{row.label}</div>
                  <div className="dl-compare__cell">{row.market}</div>
                  <div className="dl-compare__cell dl-compare__cell--loom">{row.loom}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {content.materials && content.materials.length > 0 && (
        <section className="dl-section dl-section--clay dl-section--rule">
          <div className="dl-wrap">
            <div className="dl-eyebrow">{content.materialsEyebrow}</div>
            <h2 className="dl-h2">{content.materialsHeading}</h2>
            <div className="dl-cards">
              {content.materials.map((m) => (
                <div className="dl-card" key={m.number}>
                  <div className="dl-card__n">{m.number}</div>
                  <div className="dl-card__t">{m.title}</div>
                  <div className="dl-card__d">{m.text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {content.benefits && content.benefits.length > 0 && (
        <section className="dl-section dl-section--cream">
          <div className="dl-wrap">
            <div className="dl-eyebrow">{content.benefitsEyebrow}</div>
            <div className="dl-benefits">
              {content.benefits.map((b) => (
                <div className="dl-benefit" key={b.title}>
                  <div className="dl-benefit__t">{b.title}</div>
                  <div className="dl-benefit__d">{b.text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {content.steps && content.steps.length > 0 && (
        <section className="dl-section dl-section--ink">
          <div className="dl-wrap">
            <div className="dl-eyebrow">{content.stepsEyebrow}</div>
            <h2 className="dl-h2" style={{color: 'var(--dl-cream)'}}>
              {content.stepsHeading}
            </h2>
            <div className="dl-steps">
              {content.steps.map((s) => (
                <div className="dl-step" key={s.number}>
                  <div className="dl-step__rule" />
                  <div className="dl-step__n">{s.number}</div>
                  <div className="dl-step__t">{s.title}</div>
                  <div className="dl-step__d">{s.text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {(content.specRows?.length || content.careItems?.length) && (
        <section className="dl-section dl-section--clay dl-section--rule">
          <div className="dl-wrap dl-specs-grid">
            {content.specRows && content.specRows.length > 0 && (
              <div>
                <h2>{content.specsHeading || 'Specification'}</h2>
                <div>
                  {content.specRows.map((row) => (
                    <div className="dl-spec-row" key={row.label}>
                      <span className="dl-spec-row__k">{row.label}</span>
                      <span className="dl-spec-row__v">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {content.careItems && content.careItems.length > 0 && (
              <div>
                <h2>{content.careHeading || 'Care'}</h2>
                <div className="dl-care">
                  {content.careItems.map((c) => (
                    <div className="dl-care-row" key={c.number}>
                      <span className="dl-care-row__n">{c.number}</span>
                      <span className="dl-care-row__d">{c.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {content.boxItems && content.boxItems.length > 0 && (
        <section className="dl-section dl-section--cream dl-section--rule" style={{paddingBottom: 'clamp(80px,11vw,140px)'}}>
          <div className="dl-wrap dl-getbox-grid">
            <div>
              <div className="dl-eyebrow">{content.boxEyebrow}</div>
              <h2>{content.boxHeading}</h2>
              <ul className="dl-list">
                {content.boxItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <button
                type="button"
                className="dl-btn dl-btn--dark"
                style={{marginTop: 32}}
                onClick={addToCart}
                disabled={!selectedVariant?.availableForSale || isAdding}
              >
                {selectedVariant?.availableForSale ? 'Buy now' : 'Sold out'}
              </button>
            </div>
            <div className="dl-media-frame">
              <img src={box.src} alt={box.alt} width={box.width} height={box.height} loading="lazy" decoding="async" />
            </div>
          </div>
        </section>
      )}

      {scrolledPastHero && (
        <div className="dl-stickybar">
          <button
            type="button"
            className="dl-stickybar__inner"
            onClick={addToCart}
            disabled={!selectedVariant?.availableForSale || isAdding}
          >
            <span className="dl-stickybar__name">{product.title}</span>
            <span className="dl-stickybar__price">
              {selectedVariant ? <Money data={selectedVariant.price} /> : <Money data={product.priceRange.minVariantPrice} />}
            </span>
            <span className="dl-stickybar__cta">
              {isAdding ? 'Adding…' : justAdded ? 'Added ✓' : selectedVariant?.availableForSale ? 'Buy now' : 'Sold out'}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

/** Best-effort colour swatch fill from a variant option value's name — this
 * is decorative only (the option button's title/label carries the real
 * value for screen readers and sighted users alike). Unrecognised names
 * fall back to a neutral chip rather than guessing wrong. */
function swatchColor(name: string): string {
  const n = name.toLowerCase();
  const map: Record<string, string> = {
    white: '#f7f3eb',
    black: '#23241f',
    gray: '#8b8a86',
    grey: '#8b8a86',
    'dark gray': '#5a5954',
    'dark grey': '#5a5954',
    charcoal: '#3a3a36',
    brown: '#6b4a35',
    'dark brown': '#4a3326',
    beige: '#e4d9c4',
    cream: '#f7f3eb',
    navy: '#2b3345',
    blue: '#3f5a78',
    green: '#5c6e4f',
    sage: '#8b9a7a',
    gold: '#b8985a',
    red: '#8a3b32',
    pink: '#d9a9a0',
  };
  // Longest key first so "dark gray" matches before the shorter "gray".
  const keys = Object.keys(map).sort((a, b) => b.length - a.length);
  for (const key of keys) {
    if (n.includes(key)) return map[key];
  }
  return '#b8985a';
}
