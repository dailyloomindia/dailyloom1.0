import {useEffect, useMemo, useRef, useState} from 'react';
import {Link, useFetcher, useLoaderData, useSearchParams} from '@remix-run/react';
import type {LoaderFunctionArgs, MetaFunction} from '@shopify/remix-oxygen';
import {LoomImage} from '~/components/loom/LoomImage';
import {useBag} from '~/components/loom/Bag';
import {CATEGORY_STORY, productCopy} from '~/data/loomContent';
import {
  LOOM_PRODUCT_FRAGMENT,
  collectionPath,
  findVariant,
  formatMoney,
  formatMoneyV2,
  isColourOption,
  productPath,
  realOptions,
  selectionOf,
  shortenTitle,
  swatchColor,
  type LoomProduct,
} from '~/lib/loom';

type PageProduct = LoomProduct & {collections: {nodes: {handle: string; title: string}[]}};
type Policy = {title: string; url: string} | null;

export const meta: MetaFunction<typeof loader> = ({data}) => {
  const p = data?.product;
  if (!p) return [{title: 'Daily Loom'}];
  return [
    {title: `${productCopy(p.productType)?.name || shortenTitle(p.title)} | Daily Loom`},
    {name: 'description', content: (p.description || p.title).slice(0, 155)},
    {property: 'og:title', content: p.title},
    ...(p.featuredImage ? [{property: 'og:image', content: p.featuredImage.url}] : []),
  ];
};

export async function loader({params, context}: LoaderFunctionArgs) {
  const {handle} = params;
  if (!handle) throw new Response('Product not found', {status: 404});
  const {storefront} = context;
  const {product, shop} = await storefront.query(PRODUCT_QUERY, {variables: {handle}});
  if (!product) throw new Response('Product not found', {status: 404});

  const {productRecommendations, products} = await storefront.query(RECOMMENDATIONS_QUERY, {
    variables: {productId: product.id},
    cache: storefront.CacheShort(),
  });
  const seen = new Set<string>([product.id]);
  const recs: LoomProduct[] = [];
  for (const p of [...(productRecommendations || []), ...(products?.nodes || [])] as LoomProduct[]) {
    if (seen.has(p.id)) continue;
    seen.add(p.id);
    recs.push(p);
    if (recs.length === 3) break;
  }

  return {
    product: product as PageProduct,
    recs,
    policies: {shipping: shop?.shippingPolicy as Policy, refund: shop?.refundPolicy as Policy},
  };
}

const nameOf = (p: LoomProduct) => productCopy(p.productType)?.name || shortenTitle(p.title);
const MAX_QTY = 10;

export default function ProductPage() {
  const {product, recs, policies} = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const variants = product.variants.nodes;
  const options = realOptions(product);
  const copy = productCopy(product.productType);
  const name = nameOf(product);
  const category = product.collections.nodes.find((c) => CATEGORY_STORY[c.handle]) || product.collections.nodes[0];

  const initialVariant =
    variants.find((v) => v.id === searchParams.get('variant')) || variants.find((v) => v.availableForSale) || variants[0];
  const [selected, setSelected] = useState(() => selectionOf(initialVariant));
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [openAcc, setOpenAcc] = useState('Details');
  const [pin, setPin] = useState('');
  const [pinMsg, setPinMsg] = useState('');

  useEffect(() => {
    setSelected(selectionOf(initialVariant));
    setQty(1);
    setAdded(false);
    setOpenAcc('Details');
    setPinMsg('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  const variant = useMemo(() => findVariant(variants, selected), [variants, selected]);
  const fetcher = useFetcher<{ok: boolean; error: string | null}>();
  const {setOpen} = useBag();
  const adding = fetcher.state !== 'idle';
  // Seeded with any existing result so revisiting a product never re-opens the bag.
  const lastHandled = useRef<unknown>(fetcher.data);

  useEffect(() => {
    if (fetcher.state !== 'idle' || !fetcher.data || lastHandled.current === fetcher.data) return;
    lastHandled.current = fetcher.data;
    if (!fetcher.data.ok) return;
    setAdded(true);
    const t = window.setTimeout(() => setOpen(true), 650);
    return () => window.clearTimeout(t);
  }, [fetcher.state, fetcher.data, setOpen]);

  const pick = (optName: string, value: string) => {
    setSelected((s) => ({...s, [optName]: value}));
    setAdded(false);
  };

  const changeQty = (delta: number) => {
    setQty((q) => Math.min(MAX_QTY, Math.max(1, q + delta)));
    setAdded(false);
  };

  const addToBag = () => {
    if (!variant?.availableForSale || adding) return;
    fetcher.submit({action: 'add', variantId: variant.id, quantity: String(qty)}, {method: 'post', action: '/cart'});
  };

  const checkPin = () => {
    if (!/^[1-9]\d{5}$/.test(pin)) {
      setPinMsg('Please enter a valid 6-digit pincode.');
      return;
    }
    setPinMsg(`We deliver across India. Shipping options and timing for ${pin} are confirmed at checkout.`);
  };

  const images = product.images.nodes;
  const mainImage = variant?.image || product.featuredImage || images[0];
  const rest = images.filter((img) => img.url !== mainImage?.url);
  const unit = variant?.price || product.priceRange.minVariantPrice;
  const compare = variant?.compareAtPrice;
  const onSale = compare && Number(compare.amount) > Number(unit.amount);
  const descParas = (product.description || '').split(/\n+/).map((s) => s.trim()).filter(Boolean);

  const accordions: [string, React.ReactNode][] = [
    [
      'Details',
      <>
        {copy?.specs.map(([k, v]) => (
          <div key={k} className="lm-spec">
            <span>{k}</span>
            <b>{v}</b>
          </div>
        ))}
        {descParas.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </>,
    ],
    ...(copy ? ([['Care', <p key="care">{copy.care}</p>]] as [string, React.ReactNode][]) : []),
    [
      'Delivery & returns',
      <>
        <p>Delivered across India. Shipping options and costs are shown at checkout before you pay.</p>
        {policies.shipping && (
          <a className="lm-link" href={policies.shipping.url} rel="noopener">
            {policies.shipping.title} →
          </a>
        )}
        {policies.refund && (
          <a className="lm-link" href={policies.refund.url} rel="noopener">
            {policies.refund.title} →
          </a>
        )}
      </>,
    ],
  ];

  return (
    <main data-screen-label="Product" className="lm-pad" style={{paddingTop: 96}}>
      <nav className="lm-crumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        {category && (
          <>
            <Link to={collectionPath(category.handle)}>{category.title}</Link>
            <span>/</span>
          </>
        )}
        <span style={{color: 'var(--lm-ink)'}}>{name}</span>
      </nav>

      <div className="lm-row" style={{gap: 'clamp(32px,5vw,88px)', alignItems: 'flex-start'}}>
        <div className="lm-col" style={{flex: '7 1 460px', gap: 20}}>
          <div data-reveal="0" className="lm-frame" style={{height: 'clamp(420px,62vw,860px)'}}>
            <LoomImage image={mainImage} alt={name} sizes="(min-width: 900px) 60vw, 100vw" eager />
          </div>
          {rest.length >= 2 && (
            <div className="lm-row" style={{gap: 20}}>
              {rest.slice(0, 2).map((img, i) => (
                <div key={img.url} data-reveal={String(i * 120)} className="lm-frame" style={{flex: '1 1 220px', height: 'clamp(280px,30vw,460px)'}}>
                  <LoomImage image={img} alt={`${name}, detail`} sizes="(min-width: 900px) 30vw, 100vw" />
                </div>
              ))}
            </div>
          )}
          {rest.length === 1 && (
            <div data-reveal="0" className="lm-frame" style={{height: 'clamp(360px,40vw,600px)'}}>
              <LoomImage image={rest[0]} alt={`${name}, detail`} sizes="(min-width: 900px) 60vw, 100vw" />
            </div>
          )}
          {rest[2] && (
            <div data-reveal="0" className="lm-frame" style={{height: 'clamp(360px,40vw,600px)'}}>
              <LoomImage image={rest[2]} alt={`${name}, in the room`} sizes="(min-width: 900px) 60vw, 100vw" />
            </div>
          )}
        </div>

        <aside className="lm-aside">
          <div className="lm-col" style={{gap: 14}}>
            {category && <span className="lm-tag">{category.title}</span>}
            <h1 className="lm-h-lg" style={{fontSize: 'clamp(38px,4vw,60px)'}}>
              {name}
            </h1>
            <p className="lm-lede" style={{fontSize: 17}}>
              {copy?.short || descParas[0]}
            </p>
            <div style={{display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: 12, marginTop: 6}}>
              <span style={{fontSize: 24}}>{formatMoney(Number(unit.amount) * qty, unit.currencyCode)}</span>
              {onSale && <span className="lm-strike">{formatMoney(Number(compare.amount) * qty, compare.currencyCode)}</span>}
              {qty > 1 && (
                <span style={{fontSize: 13, color: 'var(--lm-muted)'}}>
                  {qty} × {formatMoneyV2(unit)}
                </span>
              )}
            </div>
          </div>

          {options.map((opt) => {
            const swatch = isColourOption(opt.name);
            const current = selected[opt.name];
            return (
              <div key={opt.name} className="lm-col" style={{gap: 14}}>
                <div style={{fontSize: 13, letterSpacing: '.06em', color: 'var(--lm-muted)'}}>
                  {opt.name} · <span style={{color: 'var(--lm-ink)'}}>{current}</span>
                </div>
                <div className={swatch ? 'lm-swatches' : 'lm-row'} style={swatch ? undefined : {gap: 10}}>
                  {opt.optionValues.map(({name: value}) => {
                    const would = findVariant(variants, {...selected, [opt.name]: value});
                    const disabled = !would || !would.availableForSale;
                    return swatch ? (
                      <button
                        key={value}
                        type="button"
                        className="lm-swatch lm-swatch--lg"
                        aria-label={`${value}${disabled ? ' (sold out)' : ''}`}
                        title={value}
                        aria-pressed={current === value}
                        disabled={disabled}
                        style={{backgroundColor: swatchColor(value)}}
                        onClick={() => pick(opt.name, value)}
                      />
                    ) : (
                      <button
                        key={value}
                        type="button"
                        className="lm-pill"
                        aria-pressed={current === value}
                        disabled={disabled}
                        onClick={() => pick(opt.name, value)}
                      >
                        {value}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="lm-col" style={{gap: 10}}>
            <div style={{display: 'flex', gap: 12, alignItems: 'stretch'}}>
              <div className="lm-qty">
                <button type="button" aria-label="Decrease quantity" disabled={qty <= 1} onClick={() => changeQty(-1)}>
                  −
                </button>
                <span aria-live="polite">{qty}</span>
                <button type="button" aria-label="Increase quantity" disabled={qty >= MAX_QTY} onClick={() => changeQty(1)}>
                  +
                </button>
              </div>
              <button
                type="button"
                className="lm-btn lm-btn--dark lm-add"
                data-added={added}
                disabled={!variant?.availableForSale || adding}
                onClick={addToBag}
              >
                {!variant ? 'Unavailable' : !variant.availableForSale ? 'Sold out' : adding ? 'Adding…' : added ? 'Added to bag ✓' : 'Add to bag'}
              </button>
            </div>
            {fetcher.data && !fetcher.data.ok && fetcher.state === 'idle' && (
              <span role="alert" style={{fontSize: 14, color: '#8A3B32'}}>
                {fetcher.data.error}
              </span>
            )}
          </div>

          <div className="lm-pin">
            <label htmlFor="lm-pin" style={{fontSize: 13, letterSpacing: '.06em', color: '#554D42'}}>
              Check delivery
            </label>
            <div className="lm-pin__row">
              <input
                id="lm-pin"
                value={pin}
                inputMode="numeric"
                autoComplete="postal-code"
                placeholder="Pincode"
                onChange={(e) => {
                  setPin(e.target.value.replace(/\D/g, '').slice(0, 6));
                  setPinMsg('');
                }}
                onKeyDown={(e) => e.key === 'Enter' && checkPin()}
              />
              <button type="button" onClick={checkPin}>
                Check
              </button>
            </div>
            {pinMsg && (
              <div role="status" style={{fontSize: 14, lineHeight: 1.5}}>
                {pinMsg}
              </div>
            )}
          </div>

          <div className="lm-col">
            {accordions.map(([title, body]) => {
              const open = openAcc === title;
              const id = `acc-${title.replace(/\W+/g, '-').toLowerCase()}`;
              return (
                <div key={title} className="lm-acc">
                  <button type="button" className="lm-acc__btn" aria-expanded={open} aria-controls={id} onClick={() => setOpenAcc(open ? '' : title)}>
                    {title}
                    <span aria-hidden="true">+</span>
                  </button>
                  <div id={id} className="lm-acc__panel" data-open={open}>
                    <div>
                      <div className="lm-acc__body">{body}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {category && CATEGORY_STORY[category.handle] && (
            <Link to={collectionPath(category.handle)} prefetch="intent" className="lm-link">
              Why {name} is different →
            </Link>
          )}
        </aside>
      </div>

      {recs.length > 0 && (
        <section style={{paddingBlock: 'clamp(100px,12vw,170px) clamp(80px,10vw,140px)'}}>
          <h2 data-reveal="0" className="lm-h-md" style={{marginBottom: 'clamp(36px,4vw,56px)', fontSize: 'clamp(34px,3.6vw,54px)'}}>
            Complete the set.
          </h2>
          <div className="lm-row" style={{gap: 'clamp(24px,2.8vw,40px)'}}>
            {recs.map((r, i) => (
              <Link key={r.id} to={productPath(r.handle)} prefetch="intent" data-reveal={String(i * 120)} className="lm-col" style={{flex: '1 1 260px', gap: 20}}>
                <div className="lm-frame" style={{height: 'clamp(300px,30vw,440px)'}}>
                  <div className="lm-frame__zoom">
                    <LoomImage image={r.featuredImage} alt={nameOf(r)} sizes="(min-width: 900px) 33vw, 100vw" />
                  </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'baseline'}}>
                  <span className="lm-serif" style={{fontSize: 24}}>
                    {nameOf(r)}
                  </span>
                  <span style={{fontSize: 14, color: 'var(--lm-muted)', flex: 'none'}}>
                    {r.variants.nodes.length > 1 ? 'From ' : ''}
                    {formatMoneyV2(r.priceRange.minVariantPrice)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

const PRODUCT_QUERY = `#graphql
  query LoomProductPage($handle: String!) {
    product(handle: $handle) {
      ...LoomProduct
      collections(first: 5) { nodes { handle title } }
    }
    shop {
      shippingPolicy { title url }
      refundPolicy { title url }
    }
  }
  ${LOOM_PRODUCT_FRAGMENT}
`;

const RECOMMENDATIONS_QUERY = `#graphql
  query LoomRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) { ...LoomProduct }
    products(first: 8) { nodes { ...LoomProduct } }
  }
  ${LOOM_PRODUCT_FRAGMENT}
`;
