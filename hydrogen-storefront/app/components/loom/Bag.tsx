import {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {Link, useFetcher, useLocation} from '@remix-run/react';
import {LoomImage} from './LoomImage';
import {formatMoneyV2, shortenTitle, type LoomImage as LoomImageData, type MoneyV2} from '~/lib/loom';

export interface BagLine {
  id: string;
  quantity: number;
  cost: {totalAmount: MoneyV2};
  merchandise: {
    id: string;
    title: string;
    image: LoomImageData | null;
    product: {handle: string; title: string};
    selectedOptions: {name: string; value: string}[];
  };
}

export interface BagCart {
  checkoutUrl: string;
  totalQuantity: number;
  cost: {subtotalAmount: MoneyV2};
  lines: {edges?: {node: BagLine}[]; nodes?: BagLine[]};
}

/** Hydrogen's default cart query returns lines as edges, not nodes. */
export function bagLines(cart: BagCart | null | undefined): BagLine[] {
  const lines = cart?.lines;
  return lines?.nodes ?? lines?.edges?.map((e) => e.node) ?? [];
}

const BagContext = createContext<{open: boolean; setOpen: (v: boolean) => void}>({
  open: false,
  setOpen: () => {},
});

export function BagProvider({children}: {children: React.ReactNode}) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  const value = useMemo(() => ({open, setOpen}), [open]);
  return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
}

export function useBag() {
  return useContext(BagContext);
}

function lineDescription(line: BagLine) {
  return line.merchandise.selectedOptions
    .filter((o) => !(o.name === 'Title' && o.value === 'Default Title'))
    .map((o) => o.value)
    .join(' · ');
}

function BagLineRow({line}: {line: BagLine}) {
  const fetcher = useFetcher();
  const busy = fetcher.state !== 'idle';
  const pendingQty = fetcher.formData ? Number(fetcher.formData.get('quantity')) : null;
  const qty = pendingQty ?? line.quantity;
  if (pendingQty === 0) return null;

  const setQty = (quantity: number) =>
    fetcher.submit({action: 'update', lineId: line.id, quantity: String(quantity)}, {method: 'post', action: '/cart'});
  const name = shortenTitle(line.merchandise.product.title);

  return (
    <div className="lm-bag__line" data-busy={busy}>
      <Link to={`/products/${line.merchandise.product.handle}`} className="lm-bag__thumb" aria-label={name}>
        <LoomImage image={line.merchandise.image} alt={name} sizes="72px" />
      </Link>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0}}>
        <div style={{display: 'flex', justifyContent: 'space-between', gap: 12}}>
          <Link to={`/products/${line.merchandise.product.handle}`} style={{fontSize: 16}}>
            {name}
          </Link>
          <span style={{fontSize: 15, flex: 'none'}}>{formatMoneyV2(line.cost.totalAmount)}</span>
        </div>
        {lineDescription(line) && (
          <span style={{fontSize: 13, lineHeight: 1.5, color: 'var(--lm-muted)'}}>{lineDescription(line)}</span>
        )}
        <div style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 6}}>
          <div className="lm-qty lm-qty--sm">
            <button type="button" aria-label="Decrease" disabled={busy} onClick={() => setQty(qty - 1)}>
              −
            </button>
            <span>{qty}</span>
            <button type="button" aria-label="Increase" disabled={busy} onClick={() => setQty(qty + 1)}>
              +
            </button>
          </div>
          <button type="button" className="lm-textbtn" disabled={busy} onClick={() => setQty(0)}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export function BagContents({cart, onContinue}: {cart: BagCart | null; onContinue?: () => void}) {
  const lines = bagLines(cart);
  if (lines.length === 0) {
    return (
      <div style={{padding: '64px 0', display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'flex-start'}}>
        <span className="lm-serif" style={{fontSize: 30, lineHeight: 1.1}}>
          Your bag is empty.
        </span>
        <Link to="/" className="lm-link" onClick={onContinue}>
          Continue browsing →
        </Link>
      </div>
    );
  }
  return (
    <>
      {lines.map((line) => (
        <BagLineRow key={line.id} line={line} />
      ))}
    </>
  );
}

export function BagCheckout({cart}: {cart: BagCart | null}) {
  const [leaving, setLeaving] = useState(false);
  if (!cart || bagLines(cart).length === 0) return null;
  return (
    <div className="lm-bag__foot">
      <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 17}}>
        <span>Subtotal</span>
        <span>{formatMoneyV2(cart.cost?.subtotalAmount)}</span>
      </div>
      <span style={{fontSize: 13, color: 'var(--lm-muted)'}}>
        Delivery, taxes and payment are completed at secure checkout.
      </span>
      <a href={cart.checkoutUrl} className="lm-btn lm-btn--dark" style={{height: 56, padding: 0}} onClick={() => setLeaving(true)}>
        {leaving ? 'Opening secure checkout…' : 'Checkout'}
      </a>
    </div>
  );
}

export function BagDrawer({cart}: {cart: BagCart | null}) {
  const {open, setOpen} = useBag();
  const close = useCallback(() => setOpen(false), [setOpen]);
  return (
    <>
      <div className="lm-scrim" data-open={open} onClick={close} aria-hidden="true" />
      <aside className="lm-bag lm-satin lm-satin--linen" data-open={open} aria-label="Your bag" aria-hidden={!open}>
        <div className="lm-bag__head">
          <span className="lm-serif" style={{fontSize: 26}}>
            Your bag
          </span>
          <button type="button" className="lm-bag__close" aria-label="Close bag" onClick={close}>
            ×
          </button>
        </div>
        <div className="lm-bag__lines">
          <BagContents cart={cart} onContinue={close} />
        </div>
        <BagCheckout cart={cart} />
      </aside>
    </>
  );
}
