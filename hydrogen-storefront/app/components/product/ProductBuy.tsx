import {useMemo, useState} from 'react';
import {Form, Link, useNavigation, useSearchParams} from '@remix-run/react';
import {Money} from '@shopify/hydrogen';
import {findVariant, type StoryProduct} from './types';
import {swatchColor} from './swatchColor';
import type {ProductStoryContent} from '~/data/productStoryContent';

const FALLBACK_IMAGE = '/images/product-story/fallback-hero.webp';
const COLOR_OPTION_RE = /colou?r/i;

function clampQty(n: number) {
  return Math.max(1, Math.min(9, n));
}

export function ProductBuy({
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

  const [searchParams] = useSearchParams();
  const preselectVariantId = searchParams.get('variant');
  const preselect = preselectVariantId ? variants.find((v) => v.id === preselectVariantId) : null;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const first = preselect || variants[0];
    const init: Record<string, string> = {};
    first?.selectedOptions.forEach((o) => {
      init[o.name] = o.value;
    });
    return init;
  });
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = useMemo(() => findVariant(variants, selected), [variants, selected]);
  const navigation = useNavigation();
  const isAdding = navigation.state !== 'idle';

  const mainImage = images[selectedImage] || null;
  const thumbs = images.slice(0, 3);
  const price = selectedVariant?.price || product.priceRange.minVariantPrice;
  const unitAmount = parseFloat(price.amount) || 0;
  const total = {amount: String(unitAmount * quantity), currencyCode: price.currencyCode};

  return (
    <div className="dl-story">
      <section className="dl-buy">
        <div className="dl-buy-grid">
          <div className="dl-buy-gallery">
            <div className="dl-buy-main">
              <img
                src={mainImage?.url || FALLBACK_IMAGE}
                alt={mainImage?.altText || content.displayName}
                loading="eager"
                fetchPriority="high"
              />
            </div>
            {thumbs.length > 1 && (
              <div className="dl-buy-thumbs">
                {thumbs.map((img, i) => (
                  <button
                    key={img.url}
                    type="button"
                    className="dl-buy-thumb"
                    onClick={() => setSelectedImage(i)}
                  >
                    <img src={img.url} alt={img.altText || `${content.displayName} ${i + 1}`} loading="lazy" />
                  </button>
                ))}
              </div>
            )}
            {selectedVariant && (
              <div className="dl-buy-caption">Shown in {selectedVariant.title}</div>
            )}
          </div>

          <div>
            <div className="dl-eyebrow">Buy · {content.heroKicker}</div>
            <h1 className="dl-buy-title">{content.displayName}</h1>
            {product.description && <p className="dl-buy-desc">{product.description.slice(0, 200)}</p>}

            {hasRealOptions &&
              options.map((opt) => {
                const isColor = COLOR_OPTION_RE.test(opt.name);
                return (
                  <div className="dl-buy-step" key={opt.name}>
                    <div className="dl-buy-step__head">
                      <div className="dl-buy-step__label">{opt.name}</div>
                      <div className="dl-buy-step__value">{selected[opt.name]}</div>
                    </div>
                    {isColor ? (
                      <div className="dl-buy-swatches" role="group" aria-label={opt.name}>
                        {opt.optionValues.map((val) => {
                          const isSelected = selected[opt.name] === val.name;
                          const wouldBe = findVariant(variants, {...selected, [opt.name]: val.name});
                          const available = wouldBe?.availableForSale ?? true;
                          return (
                            <button
                              key={val.name}
                              type="button"
                              className="dl-buy-swatch"
                              data-selected={isSelected}
                              disabled={!available}
                              title={val.name}
                              style={{background: swatchColor(val.name)}}
                              onClick={() => setSelected((s) => ({...s, [opt.name]: val.name}))}
                            >
                              <span className="visually-hidden">{val.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="dl-buy-rows">
                        {opt.optionValues.map((val) => {
                          const isSelected = selected[opt.name] === val.name;
                          const wouldBe = findVariant(variants, {...selected, [opt.name]: val.name});
                          const available = wouldBe?.availableForSale ?? true;
                          return (
                            <button
                              key={val.name}
                              type="button"
                              className="dl-buy-row"
                              data-selected={isSelected}
                              disabled={!available}
                              onClick={() => setSelected((s) => ({...s, [opt.name]: val.name}))}
                            >
                              <span>{val.name}</span>
                              {wouldBe && <Money data={wouldBe.price} />}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

            <div className="dl-buy-step">
              <div className="dl-buy-step__label">Quantity</div>
              <div className="dl-buy-qty">
                <button type="button" onClick={() => setQuantity((q) => clampQty(q - 1))} disabled={quantity <= 1}>
                  −
                </button>
                <div className="dl-buy-qty__n">{quantity}</div>
                <button type="button" onClick={() => setQuantity((q) => clampQty(q + 1))} disabled={quantity >= 9}>
                  +
                </button>
              </div>
            </div>

            {content.boxItems && content.boxItems.length > 0 && (
              <div className="dl-buy-step">
                <div className="dl-buy-step__label">What you get</div>
                <ul className="dl-buy-included">
                  {content.boxItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="dl-buy-total">
              <div className="dl-buy-step__label">Total</div>
              <div className="dl-buy-total__n">
                <Money data={total} />
              </div>
            </div>

            <Form method="post">
              <input type="hidden" name="variantId" value={selectedVariant?.id} />
              <input type="hidden" name="quantity" value={quantity} />
              <button
                type="submit"
                className="dl-buy-cta"
                disabled={!selectedVariant?.availableForSale || isAdding}
              >
                {isAdding ? 'Adding…' : selectedVariant?.availableForSale ? 'Add to bag' : 'Sold out'}
              </button>
            </Form>
            <div className="dl-buy-delivery">Free delivery in 3–5 days · easy returns</div>
            <div style={{marginTop: 14}}>
              <Link to={`/products/${product.handle}`} style={{fontSize: 12, color: 'var(--dl-taupe)'}}>
                ← Back to overview
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
