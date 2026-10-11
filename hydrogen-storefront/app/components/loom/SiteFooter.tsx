import {Link} from '@remix-run/react';
import type {NavItem} from './SiteHeader';

export function SiteFooter({shop, help}: {shop: NavItem[]; help: NavItem[]}) {
  return (
    <>
      <section className="lm-pad" style={{paddingBottom: 'clamp(64px,8vw,110px)'}}>
        <div className="lm-services">
          <div>
            <b>Delivery across India</b>
            <span>Shipping options and delivery timing for your address are confirmed at checkout.</span>
          </div>
          <div>
            <b>Secure checkout</b>
            <span>Payment is processed through Shopify&rsquo;s secure, encrypted checkout.</span>
          </div>
          <div>
            <b>Care, included</b>
            <span>Washing and storage guidance for every piece, so it lasts for years.</span>
          </div>
        </div>
      </section>
      <footer className="lm-footer lm-satin lm-satin--dark">
        <div className="lm-row" style={{gap: 48, justifyContent: 'space-between'}}>
          <div className="lm-col" style={{flex: '2 1 280px', gap: 20}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <img src="/images/v3/logo-mark-128.webp" alt="" width={38} height={40} />
              <span className="lm-serif" style={{fontSize: 28, letterSpacing: '.05em', color: 'var(--lm-paper)'}}>
                Daily Loom
              </span>
            </div>
            <p style={{maxWidth: 340, fontSize: 15, lineHeight: 1.6, fontWeight: 300, color: '#B8AE9E'}}>
              Duvets, linens, pillows and towels for everyday rest.
            </p>
          </div>
          {shop.length > 0 && (
            <div className="lm-col" style={{flex: '1 1 160px', gap: 12}}>
              <h4>Shop</h4>
              {shop.map((l) => (
                <FooterLink key={l.href} item={l} />
              ))}
            </div>
          )}
          {help.length > 0 && (
            <div className="lm-col" style={{flex: '1 1 160px', gap: 12}}>
              <h4>Help</h4>
              {help.map((l) => (
                <FooterLink key={l.href} item={l} />
              ))}
            </div>
          )}
        </div>
        <div
          className="lm-row"
          style={{justifyContent: 'space-between', gap: 16, marginTop: 72, paddingTop: 24, borderTop: '1.5px dashed rgba(200,146,94,.3)', fontSize: 13, color: '#B8AE9E'}}
        >
          <span>© {new Date().getFullYear()} Daily Loom. All rights reserved.</span>
          <span>Prices in INR. Taxes and shipping are shown at checkout.</span>
        </div>
      </footer>
    </>
  );
}

function FooterLink({item}: {item: NavItem}) {
  return item.external ? (
    <a href={item.href} rel="noopener">
      {item.title}
    </a>
  ) : (
    <Link to={item.href} prefetch="intent">
      {item.title}
    </Link>
  );
}
