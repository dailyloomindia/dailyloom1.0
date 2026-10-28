// @ts-nocheck
/* eslint-disable */
// Generated from "Daily Loom v4.dc.html" by the dc → React converter.
// Mirrors the element tree the dc-runtime renders for this part of the page.
import {Fragment, type ReactNode} from 'react';
import {css, I, L, S, VAL} from '../runtime';

export function ShellView({vals, children}: {vals: any; children: ReactNode}) {
  return (
    <div ref={vals.rootRef} style={{fontFamily: "'Jost',sans-serif", color: "#221E18", backgroundColor: "#F4EFE6", backgroundImage: "linear-gradient(rgba(244,239,230,0.5),rgba(244,239,230,0.5)),url(/assets/satin.jpg)", backgroundSize: "cover,cover", backgroundPosition: "center,center", backgroundBlendMode: "normal,multiply", backgroundAttachment: "fixed,fixed", minHeight: "100vh", overflowX: "clip"}}>
      <header ref={vals.navRef} style={{position: "fixed", top: "0", left: "0", right: "0", zIndex: "50", height: "56px", display: "flex", alignItems: "center", gap: "24px", padding: "0 clamp(20px,4vw,56px)", backgroundColor: "rgba(244,239,230,.8)", backdropFilter: "saturate(1.4) blur(18px)", WebkitBackdropFilter: "saturate(1.4) blur(18px)"}}>
        {"\n  "}
        <button onClick={vals.goHome} style={{display: "flex", alignItems: "center", gap: "10px", background: "none", border: "0", padding: "0", cursor: "pointer", flex: "none"}}>
          {"\n    "}
          <img src="/assets/logo-mark.png" alt="" style={{height: "28px", width: "auto", display: "block"}} />
          {"\n    "}
          <span style={{fontFamily: "'Marcellus',serif", fontSize: "19px", letterSpacing: ".06em", color: "#221E18"}}>
            {"Daily Loom"}
          </span>
          {"\n  "}
        </button>
        {"\n  "}
        <nav style={css(`flex:1;display:${S(vals.navDisp)};justify-content:center;gap:clamp(16px,2.6vw,36px);overflow-x:auto;scrollbar-width:none`)}>
          {"\n    "}
          {L(vals.cats).map((c, i0) => (
            <Fragment key={i0}>
              {"\n      "}
              <button onClick={c?.onClick} style={css(`flex:none;background:none;border:0;padding:6px 0;cursor:pointer;font-size:13px;letter-spacing:.08em;color:${S(c?.navColor)};background-image:repeating-linear-gradient(90deg, #C8925E 0 4px, transparent 4px 7px);background-repeat:no-repeat;background-position:0 100%;background-size:0% 1.5px;transition:background-size .6s cubic-bezier(.2,.7,.2,1),color .3s`)} className="scp0">
                {I(c?.name)}
              </button>
              {"\n    "}
            </Fragment>
          ))}
          {"\n  "}
        </nav>
        {"\n  "}
        <span style={css(`flex:1;display:${S(vals.menuDisp)}`)} />
        {"\n  "}
        <button onClick={vals.toggleMenu} aria-label="Menu" style={css(`flex:none;width:44px;height:44px;display:${S(vals.menuDisp)};place-items:center;background:none;border:0;cursor:pointer;color:#221E18;margin-right:-4px`)}>
          {"\n    "}
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" stroke="currentColor" strokeWidth="1.3">
            <path d={vals.menuIcon1} style={{transition: "d .4s"}} />
            <path d={vals.menuIcon2} style={{transition: "d .4s"}} />
          </svg>
          {"\n  "}
        </button>
        {"\n  "}
        <button ref={vals.bagBtnRef} onClick={vals.openBag} aria-label="Bag" style={{position: "relative", flex: "none", width: "40px", height: "40px", display: "grid", placeItems: "center", background: "none", border: "0", cursor: "pointer", color: "#221E18", borderRadius: "999px", transition: "background .3s"}} className="scp1">
          {"\n    "}
          <svg width="18" height="20" viewBox="0 0 18 20" fill="none" stroke="currentColor" strokeWidth="1.3">
            <path d="M2.5 6.5h13l-1 12h-11l-1-12Z" />
            <path d="M6 6.5V5a3 3 0 0 1 6 0v1.5" />
          </svg>
          {"\n    "}
          {vals.hasBag ? (
            <>
            {"\n      "}
            <span style={{position: "absolute", top: "4px", right: "2px", minWidth: "16px", height: "16px", padding: "0 4px", boxSizing: "border-box", borderRadius: "999px", background: "#7E5232", color: "#F4EFE6", fontSize: "10px", fontWeight: "500", display: "grid", placeItems: "center"}}>
              {I(vals.bagCount)}
            </span>
            {"\n    "}
            </>
          ) : null}
          {"\n  "}
        </button>
        {"\n  "}
        <button onClick={vals.acOpen} aria-label="Account" style={{flex: "none", width: "40px", height: "40px", marginLeft: "-16px", display: "grid", placeItems: "center", background: "none", border: "0", cursor: "pointer", color: "#221E18", borderRadius: "999px", transition: "background .3s"}} className="scp1">
          {"\n    "}
          <svg width="18" height="19" viewBox="0 0 18 19" fill="none" stroke="currentColor" strokeWidth="1.3">
            <circle cx="9" cy="5.5" r="3.6" />
            <path d="M1.8 18c.6-3.9 3.6-6.4 7.2-6.4s6.6 2.5 7.2 6.4" />
          </svg>
          {"\n  "}
        </button>
        {"\n  "}
        <div style={{position: "absolute", left: "0", right: "0", bottom: "0", height: "1.5px", background: "repeating-linear-gradient(90deg, rgba(126,82,50,.32) 0 6px, transparent 6px 10px)"}} />
      </header>
      <div data-screen-label="Mobile menu" style={css(`position:fixed;top:56px;left:0;right:0;bottom:0;z-index:49;overflow-y:auto;background-color:#F4EFE6;background-image:repeating-linear-gradient(0deg, rgba(126,82,50,.05) 0 1px, transparent 1px 3px),repeating-linear-gradient(90deg, rgba(85,87,63,.05) 0 1px, transparent 1px 3px);transform:${S(vals.menuTf)};opacity:${S(vals.menuOp)};pointer-events:${S(vals.menuPe)};transition:transform .7s cubic-bezier(.2,.8,.2,1),opacity .5s;padding:20px 24px 40px;box-sizing:border-box;display:flex;flex-direction:column;gap:36px`)}>
        {"\n  "}
        <nav style={{display: "flex", flexDirection: "column"}}>
          {"\n    "}
          {L(vals.cats).map((c, i0) => (
            <Fragment key={i0}>
              {"\n      "}
              <button onClick={c?.onClick} style={css(`display:flex;justify-content:space-between;align-items:baseline;background:none;border:0;border-bottom:1.5px dashed rgba(126,82,50,.28);padding:20px 0;cursor:pointer;text-align:left;font-family:'Marcellus',serif;font-size:34px;line-height:1.05;color:${S(c?.navColor)}`)}>
                {I(c?.name)}
                <span style={{fontFamily: "'Jost',sans-serif", fontSize: "18px", color: "#7E5232"}}>
                  {"→"}
                </span>
              </button>
              {"\n    "}
            </Fragment>
          ))}
          {"\n  "}
        </nav>
        {"\n  "}
        <div style={{display: "flex", flexWrap: "wrap", gap: "10px"}}>
          {"\n    "}
          {L(vals.helpLinks).map((h, i0) => (
            <Fragment key={i0}>
              {"\n      "}
              <button onClick={h?.go} style={{borderRadius: "999px", padding: "12px 18px", fontSize: "14px", cursor: "pointer", background: "transparent", color: "#221E18", border: "1px solid rgba(34,30,24,.25)"}}>
                {I(h?.label)}
              </button>
              {"\n    "}
            </Fragment>
          ))}
          {"\n  "}
        </div>
        {"\n  "}
        <a href="https://www.instagram.com/dailyloom.in" target="_blank" rel="noopener" style={{display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", color: "#5F574B"}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4.2" />
            <circle cx="17.4" cy="6.6" r=".9" fill="currentColor" stroke="none" />
          </svg>
          {"@dailyloom.in"}
        </a>
      </div>
      {children}
      <section style={{padding: "0 clamp(20px,5vw,80px) clamp(64px,8vw,110px)"}}>
        {"\n  "}
        <div style={{display: "flex", flexWrap: "wrap", gap: "32px", borderTop: "1.5px dashed rgba(126,82,50,.3)", paddingTop: "40px"}}>
          {"\n    "}
          <div style={{flex: "1 1 220px", minWidth: "0", display: "flex", flexDirection: "column", gap: "8px"}}>
            <span style={{fontFamily: "'Marcellus',serif", fontSize: "22px"}}>
              {"Tracked delivery"}
            </span>
            <span style={{fontSize: "15px", lineHeight: "1.55", fontWeight: "300", color: "#5F574B"}}>
              {"Across India, with an estimate for your pincode before you order."}
            </span>
          </div>
          {"\n    "}
          <div style={{flex: "1 1 220px", minWidth: "0", display: "flex", flexDirection: "column", gap: "8px"}}>
            <span style={{fontFamily: "'Marcellus',serif", fontSize: "22px"}}>
              {"Secure checkout"}
            </span>
            <span style={{fontSize: "15px", lineHeight: "1.55", fontWeight: "300", color: "#5F574B"}}>
              {"UPI, cards and net banking, processed through our payment partner."}
            </span>
          </div>
          {"\n    "}
          <div style={{flex: "1 1 220px", minWidth: "0", display: "flex", flexDirection: "column", gap: "8px"}}>
            <span style={{fontFamily: "'Marcellus',serif", fontSize: "22px"}}>
              {"Care, included"}
            </span>
            <span style={{fontSize: "15px", lineHeight: "1.55", fontWeight: "300", color: "#5F574B"}}>
              {"Washing and storage guidance for every piece, so it lasts for years."}
            </span>
          </div>
          {"\n  "}
        </div>
      </section>
      <footer style={{position: "relative", isolation: "isolate", overflow: "hidden", backgroundColor: "#3B342B", backgroundImage: "url(/assets/satin.jpg)", backgroundSize: "cover", backgroundPosition: "center", backgroundBlendMode: "multiply", color: "#EDE6D8", padding: "clamp(64px,8vw,110px) clamp(20px,5vw,80px) 36px"}}>
        {"\n  "}
        <div style={{position: "absolute", left: "0", right: "0", top: "0", height: "10px", background: "repeating-linear-gradient(90deg, #C8925E 0 2px, #7E5232 2px 4px, transparent 4px 6px)", opacity: ".55"}} />
        {"\n  "}
        <div style={{display: "flex", flexWrap: "wrap", gap: "48px", justifyContent: "space-between"}}>
          {"\n    "}
          <div style={{flex: "2 1 280px", minWidth: "0", display: "flex", flexDirection: "column", gap: "20px"}}>
            {"\n      "}
            <div style={{display: "flex", alignItems: "center", gap: "12px"}}>
              {"\n        "}
              <img src="/assets/logo-mark.png" alt="" style={{height: "40px", width: "auto"}} />
              {"\n        "}
              <span style={{fontFamily: "'Marcellus',serif", fontSize: "28px", letterSpacing: ".05em", color: "#F4EFE6"}}>
                {"Daily Loom"}
              </span>
              {"\n      "}
            </div>
            {"\n      "}
            <p style={{margin: "0", maxWidth: "340px", fontSize: "15px", lineHeight: "1.6", fontWeight: "300", color: "#B8AE9E"}}>
              {"Handloom duvets, linens, pillows and towels for everyday rest."}
            </p>
            {"\n      "}
            <a href="https://www.instagram.com/dailyloom.in" target="_blank" rel="noopener" style={{alignSelf: "flex-start", display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", color: "#EDE6D8", transition: "color .3s"}} className="scpk">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4.2" />
                <circle cx="17.4" cy="6.6" r=".9" fill="currentColor" stroke="none" />
              </svg>
              <span>
                {"@dailyloom.in"}
              </span>
            </a>
            {"\n    "}
          </div>
          {"\n    "}
          <div style={{flex: "1 1 160px", minWidth: "0", display: "flex", flexDirection: "column", gap: "12px"}}>
            {"\n      "}
            <div style={{fontSize: "12px", letterSpacing: ".2em", textTransform: "uppercase", color: "#C8925E", marginBottom: "6px"}}>
              {"Shop"}
            </div>
            {"\n      "}
            {L(vals.cats).map((c, i0) => (
              <Fragment key={i0}>
                {"\n        "}
                <button onClick={c?.onClick} style={{alignSelf: "flex-start", background: "none", border: "0", padding: "0", cursor: "pointer", fontSize: "15px", color: "#EDE6D8", transition: "color .3s"}} className="scpk">
                  {I(c?.name)}
                </button>
                {"\n      "}
              </Fragment>
            ))}
            {"\n    "}
          </div>
          {"\n    "}
          <div style={{flex: "1 1 160px", minWidth: "0", display: "flex", flexDirection: "column", gap: "12px", fontSize: "15px"}}>
            {"\n      "}
            <div style={{fontSize: "12px", letterSpacing: ".2em", textTransform: "uppercase", color: "#C8925E", marginBottom: "6px"}}>
              {"Help"}
            </div>
            {"\n      "}
            {L(vals.helpLinks).map((h, i0) => (
              <Fragment key={i0}>
                {"\n        "}
                <button onClick={h?.go} style={{alignSelf: "flex-start", background: "none", border: "0", padding: "0", cursor: "pointer", fontSize: "15px", color: "#EDE6D8", transition: "color .3s"}} className="scpk">
                  {I(h?.label)}
                </button>
                {"\n      "}
              </Fragment>
            ))}
            {"\n    "}
          </div>
          {"\n  "}
        </div>
        {"\n  "}
        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "16px", marginTop: "72px", paddingTop: "24px", borderTop: "1.5px dashed rgba(200,146,94,.3)", fontSize: "13px", color: "#B8AE9E"}}>
          {"\n    "}
          <span>
            {"© 2026 Daily Loom. All rights reserved. · "}
            <a href="/policies/privacy-policy" style={{color: "#B8AE9E", transition: "color .3s"}} className="scpk">
              {"Privacy policy"}
            </a>
            {" · "}
            <a href="/policies/terms-of-service" style={{color: "#B8AE9E", transition: "color .3s"}} className="scpk">
              {"Terms"}
            </a>
            {" · "}
            <a href="/policies/refund-policy" style={{color: "#B8AE9E", transition: "color .3s"}} className="scpk">
              {"Refund policy"}
            </a>
            {" · "}
            <a href="/policies/shipping-policy" style={{color: "#B8AE9E", transition: "color .3s"}} className="scpk">
              {"Shipping policy"}
            </a>
          </span>
          {"\n    "}
          <span>
            {"Prices in INR, inclusive of GST."}
          </span>
          {"\n  "}
        </div>
      </footer>
      <div onClick={vals.closeBag} style={css(`position:fixed;inset:0;z-index:80;background:rgba(20,17,13,.42);opacity:${S(vals.bagOverlayOp)};pointer-events:${S(vals.bagPe)};transition:opacity .6s cubic-bezier(.2,.7,.2,1)`)} />
      <aside data-screen-label="Bag" style={css(`position:fixed;top:0;right:0;bottom:0;z-index:90;width:min(460px,100vw);isolation:isolate;overflow:hidden;background-color:#F1E9DB;background-image:linear-gradient(rgba(244,239,230,0.3),rgba(244,239,230,0.3)),url(/assets/satin.jpg);background-size:cover,cover;background-position:center,center;background-blend-mode:normal,multiply;display:flex;flex-direction:column;transform:${S(vals.bagX)};transition:transform .75s cubic-bezier(.2,.8,.2,1);box-shadow:-30px 0 80px rgba(20,17,13,.14)`)}>
        {"\n  "}
        <div style={{position: "absolute", left: "10px", top: "0", bottom: "0", width: "1.5px", background: "repeating-linear-gradient(0deg, rgba(126,82,50,.4) 0 6px, transparent 6px 10px)"}} />
        {"\n  "}
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 28px", borderBottom: "1.5px dashed rgba(126,82,50,.25)"}}>
          {"\n    "}
          <span style={{fontFamily: "'Marcellus',serif", fontSize: "26px"}}>
            {"Your bag"}
          </span>
          {"\n    "}
          <button onClick={vals.closeBag} aria-label="Close" style={{width: "40px", height: "40px", borderRadius: "50%", border: "0", background: "rgba(34,30,24,.06)", cursor: "pointer", fontSize: "18px", transition: "background .3s"}} className="scpj">
            {"×"}
          </button>
          {"\n  "}
        </div>
        {"\n  "}
        <div style={{flex: "1", overflowY: "auto", padding: "8px 28px"}}>
          {"\n    "}
          {vals.bagEmpty ? (
            <>
            {"\n      "}
            <div style={{padding: "64px 0", display: "flex", flexDirection: "column", gap: "18px", alignItems: "flex-start"}}>
              {"\n        "}
              <span style={{fontFamily: "'Marcellus',serif", fontSize: "30px", lineHeight: "1.1"}}>
                {"Your bag is empty."}
              </span>
              {"\n        "}
              <button onClick={vals.closeBagHome} style={{background: "none", border: "0", padding: "4px 0", cursor: "pointer", fontSize: "15px", color: "#7E5232"}}>
                {"Continue browsing →"}
              </button>
              {"\n      "}
            </div>
            {"\n    "}
            </>
          ) : null}
          {"\n    "}
          {L(vals.bagItems).map((b, i0) => (
            <Fragment key={i0}>
              {"\n      "}
              <div style={{display: "flex", gap: "18px", padding: "22px 0", borderBottom: "1.5px dashed rgba(126,82,50,.22)"}}>
                {"\n        "}
                <div style={css(`width:72px;height:88px;flex:none;background-color:${S(b?.chip)};background-image:${S(b?.photo)};background-size:cover;background-position:center;outline:1px dashed rgba(34,30,24,.25);outline-offset:-5px`)} />
                {"\n        "}
                <div style={{flex: "1", display: "flex", flexDirection: "column", gap: "6px", minWidth: "0"}}>
                  {"\n          "}
                  <div style={{display: "flex", justifyContent: "space-between", gap: "12px"}}>
                    <span style={{fontSize: "16px"}}>
                      {I(b?.name)}
                    </span>
                    <span style={{fontSize: "15px"}}>
                      {I(b?.line)}
                    </span>
                  </div>
                  {"\n          "}
                  <span style={{fontSize: "13px", lineHeight: "1.5", color: "#5F574B"}}>
                    {I(b?.desc)}
                  </span>
                  {"\n          "}
                  <div style={{display: "flex", alignItems: "center", gap: "16px", marginTop: "6px"}}>
                    {"\n            "}
                    <div style={{display: "flex", alignItems: "center", border: "1px solid rgba(34,30,24,.2)", borderRadius: "999px"}}>
                      {"\n              "}
                      <button onClick={b?.dec} aria-label="Decrease" style={{width: "32px", height: "32px", background: "none", border: "0", cursor: "pointer"}}>
                        {"−"}
                      </button>
                      {"\n              "}
                      <span style={{minWidth: "16px", textAlign: "center", fontSize: "14px"}}>
                        {I(b?.qty)}
                      </span>
                      {"\n              "}
                      <button onClick={b?.inc} aria-label="Increase" style={{width: "32px", height: "32px", background: "none", border: "0", cursor: "pointer"}}>
                        {"+"}
                      </button>
                      {"\n            "}
                    </div>
                    {"\n            "}
                    <button onClick={b?.remove} style={{background: "none", border: "0", padding: "0", cursor: "pointer", fontSize: "13px", color: "#5F574B"}} className="scpc">
                      {"Remove"}
                    </button>
                    {"\n          "}
                  </div>
                  {"\n        "}
                </div>
                {"\n      "}
              </div>
              {"\n    "}
            </Fragment>
          ))}
          {"\n  "}
        </div>
        {"\n  "}
        {vals.hasBag ? (
          <>
          {"\n    "}
          <div style={{padding: "24px 28px 28px", borderTop: "1.5px dashed rgba(126,82,50,.25)", display: "flex", flexDirection: "column", gap: "14px"}}>
            {"\n      "}
            <div style={{display: "flex", justifyContent: "space-between", fontSize: "17px"}}>
              <span>
                {"Subtotal"}
              </span>
              <span>
                {I(vals.subtotal)}
              </span>
            </div>
            {"\n      "}
            <span style={{fontSize: "13px", color: "#5F574B"}}>
              {"Delivery and payment are completed at secure checkout."}
            </span>
            {"\n      "}
            <button onClick={vals.checkout} style={{height: "56px", borderRadius: "999px", border: "0", backgroundColor: "#221E18", backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,.07) 0 1px, transparent 1px 3px),linear-gradient(180deg, rgba(255,255,255,.1), rgba(0,0,0,.18))", outline: "1px dashed rgba(244,239,230,.42)", outlineOffset: "-5px", color: "#F4EFE6", fontSize: "15px", letterSpacing: ".05em", cursor: "pointer", transition: "background-color .4s,transform .3s"}} className="scpa scpi">
              {I(vals.checkoutLabel)}
            </button>
            {"\n      "}
            {vals.devNotes ? (
              <>
              <span style={{alignSelf: "flex-start", fontSize: "11px", letterSpacing: ".06em", color: "#7E5232", background: "#FBF6EC", border: "1px dashed #C8925E", borderRadius: "4px", padding: "6px 8px"}}>
                {"Redirect to cart.checkoutUrl · Shopify Checkout + payment gateway"}
              </span>
              </>
            ) : null}
            {"\n    "}
          </div>
          {"\n  "}
          </>
        ) : null}
      </aside>
      <div onClick={vals.nfClose} style={css(`position:fixed;inset:0;z-index:95;background:rgba(20,17,13,.42);opacity:${S(vals.nfOp)};pointer-events:${S(vals.nfPe)};transition:opacity .6s cubic-bezier(.2,.7,.2,1)`)} />
      <div data-screen-label="Notify me" role="dialog" aria-label="Notify me" style={css(`position:fixed;left:50%;top:50%;z-index:96;width:min(440px,calc(100vw - 32px));box-sizing:border-box;isolation:isolate;overflow:hidden;background-color:#F1E9DB;background-image:linear-gradient(rgba(244,239,230,0.3),rgba(244,239,230,0.3)),url(/assets/satin.jpg);background-size:cover,cover;background-position:center,center;background-blend-mode:normal,multiply;outline:1px dashed rgba(126,82,50,.4);outline-offset:-8px;box-shadow:0 30px 80px rgba(20,17,13,.18);padding:30px 28px 28px;display:flex;flex-direction:column;gap:16px;opacity:${S(vals.nfOp)};pointer-events:${S(vals.nfPe)};transform:${S(vals.nfTf)};transition:opacity .5s cubic-bezier(.2,.7,.2,1),transform .6s cubic-bezier(.2,.8,.2,1)`)}>
        {"\n  "}
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px"}}>
          {"\n    "}
          <span style={{fontFamily: "'Marcellus',serif", fontSize: "28px", lineHeight: "1.1"}}>
            {I(vals.nfTitle)}
          </span>
          {"\n    "}
          <button onClick={vals.nfClose} aria-label="Close" style={{flex: "none", width: "40px", height: "40px", borderRadius: "50%", border: "0", background: "rgba(34,30,24,.06)", cursor: "pointer", fontSize: "18px", transition: "background .3s"}} className="scpj">
            {"×"}
          </button>
          {"\n  "}
        </div>
        {"\n  "}
        <span style={{fontSize: "15px", lineHeight: "1.55", fontWeight: "300", color: "#5F574B"}}>
          {I(vals.nfText)}
        </span>
        {"\n  "}
        {vals.nfAsk ? (
          <>
          {"\n    "}
          <div style={{display: "flex", gap: "10px", alignItems: "stretch"}}>
            {"\n      "}
            <input value={VAL(vals.nfEmail)} onChange={vals.onNfEmail} type="email" placeholder="Email address" style={{flex: "1", minWidth: "0", background: "transparent", border: "1px solid rgba(34,30,24,.25)", borderRadius: "999px", outline: "none", padding: "0 20px", height: "52px", fontSize: "15px"}} />
            {"\n      "}
            <button onClick={vals.nfSend} style={{backgroundColor: "#221E18", backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,.07) 0 1px, transparent 1px 3px),linear-gradient(180deg, rgba(255,255,255,.1), rgba(0,0,0,.18))", color: "#F4EFE6", border: "0", borderRadius: "999px", outline: "1px dashed rgba(244,239,230,.42)", outlineOffset: "-5px", letterSpacing: ".05em", cursor: "pointer", transition: "background-color .5s,outline-offset .4s,transform .3s", padding: "0 22px", height: "54px", fontSize: "14px"}} className="scpa">
              {I(vals.nfLabel)}
            </button>
            {"\n    "}
          </div>
          {"\n  "}
          </>
        ) : null}
        {"\n  "}
        {vals.nfHasErr ? (
          <>
          <span style={{fontSize: "14px", color: "#8A3B2A"}}>
            {I(vals.nfErr)}
          </span>
          </>
        ) : null}
      </div>
      {vals.fabric ? (
        <>
        {"\n  "}
        <div ref={vals.trackRef} onPointerDown={vals.onTrackDown} title="Scroll" style={{position: "fixed", right: "8px", top: "70px", bottom: "14px", width: "30px", zIndex: "60", cursor: "grab", touchAction: "none", opacity: "0", transition: "opacity .5s"}}>
          {"\n    "}
          <div style={{position: "absolute", left: "50%", top: "8px", bottom: "0", width: "1px", background: "repeating-linear-gradient(to bottom, rgba(126,82,50,.4) 0 4px, transparent 4px 8px)"}} />
          {"\n    "}
          <div ref={vals.clothRef} style={{position: "absolute", top: "8px", left: "6px", right: "6px", height: "0", overflow: "hidden", backgroundColor: "#EFE3CC", backgroundImage: "linear-gradient(90deg, rgba(60,42,24,.32), rgba(255,255,255,.35) 32%, rgba(255,255,255,0) 60%, rgba(60,42,24,.36)),url(/assets/satin.jpg)", backgroundSize: "100% 100%,240px auto", backgroundPosition: "0 0,40% 0", backgroundBlendMode: "normal,multiply", boxShadow: "0 3px 10px rgba(34,30,24,.22)"}}>
            {"\n      "}
            <div style={{position: "absolute", left: "0", top: "0", bottom: "0", width: "2px", background: "repeating-linear-gradient(0deg, #B57C4A 0 3px, #E3B98A 3px 5px)"}} />
            {"\n      "}
            <div style={{position: "absolute", right: "0", top: "0", bottom: "0", width: "2px", background: "repeating-linear-gradient(0deg, #B57C4A 0 3px, #E3B98A 3px 5px)"}} />
            {"\n    "}
          </div>
          {"\n    "}
          <div style={{position: "absolute", top: "0", left: "2px", right: "2px", height: "9px", borderRadius: "5px", background: "linear-gradient(to bottom,#E8C094,#B57C4A 70%,#8E5C33)", boxShadow: "0 2px 3px rgba(34,30,24,.25)"}} />
          {"\n    "}
          <div style={{position: "absolute", top: "-1px", left: "-2px", width: "11px", height: "11px", borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #F0CDA2, #9A6438 75%)", boxShadow: "0 1px 2px rgba(34,30,24,.3)"}} />
          {"\n    "}
          <div style={{position: "absolute", top: "-1px", right: "-2px", width: "11px", height: "11px", borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #F0CDA2, #9A6438 75%)", boxShadow: "0 1px 2px rgba(34,30,24,.3)"}} />
          {"\n    "}
          <div ref={vals.rollRef} style={{position: "absolute", left: "3px", right: "3px", top: "8px", height: "24px", borderRadius: "999px", backgroundColor: "#EADBC0", backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,.65), rgba(255,255,255,0) 38%, rgba(70,45,25,.42)),url(/assets/satin.jpg)", backgroundSize: "100% 100%,160px auto", backgroundBlendMode: "normal,multiply", boxShadow: "0 4px 8px rgba(34,30,24,.3)"}}>
            {"\n      "}
            <div style={{position: "absolute", left: "-3px", top: "0", bottom: "0", width: "7px", borderRadius: "50%", background: "repeating-radial-gradient(circle at 50% 50%, #B99A6C 0 1px, #EADBC0 1px 2.2px)", boxShadow: "inset 0 0 0 1px rgba(126,82,50,.4)"}} />
            {"\n      "}
            <div style={{position: "absolute", right: "-3px", top: "0", bottom: "0", width: "7px", borderRadius: "50%", background: "repeating-radial-gradient(circle at 50% 50%, #B99A6C 0 1px, #EADBC0 1px 2.2px)", boxShadow: "inset 0 0 0 1px rgba(126,82,50,.4)"}} />
            {"\n    "}
          </div>
          {"\n    "}
          <div ref={vals.tagRef} style={{position: "absolute", right: "36px", top: "0", opacity: "0", transition: "opacity .5s", pointerEvents: "none", whiteSpace: "nowrap", padding: "6px 10px 5px", backgroundColor: "#F4EFE6", backgroundImage: "repeating-linear-gradient(90deg, rgba(126,82,50,.12) 0 1px, transparent 1px 2.5px)", outline: "1px dashed rgba(126,82,50,.5)", outlineOffset: "-3px", fontSize: "11px", letterSpacing: ".14em", color: "#6B4528", boxShadow: "0 2px 8px rgba(34,30,24,.12)"}}>
            {"0%"}
          </div>
          {"\n  "}
        </div>
        </>
      ) : null}
      <div ref={vals.curtainRef} style={{position: "fixed", inset: "0", zIndex: "100", pointerEvents: "none", transform: "translateY(calc(-100% - 48px))", isolation: "isolate", backgroundColor: "#EADFCB", backgroundImage: "url(/assets/satin.jpg)", backgroundSize: "cover", backgroundPosition: "center", backgroundBlendMode: "multiply", display: "flex", alignItems: "center", justifyContent: "center"}}>
        {"\n  "}
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", padding: "30px 40px", backgroundColor: "#F4EFE6", backgroundImage: "repeating-linear-gradient(90deg, rgba(126,82,50,.1) 0 1px, transparent 1px 2.5px)", outline: "1px dashed rgba(126,82,50,.55)", outlineOffset: "-8px", boxShadow: "0 10px 30px rgba(60,40,20,.18)"}}>
          {"\n    "}
          <img src="/assets/logo-mark.png" alt="" style={{width: "68px", height: "auto"}} />
          {"\n    "}
          <span style={{fontFamily: "'Marcellus',serif", fontSize: "20px", letterSpacing: ".14em", color: "#221E18"}}>
            {"DAILY LOOM"}
          </span>
          {"\n  "}
        </div>
        {"\n  "}
        <div style={{position: "absolute", left: "0", right: "0", bottom: "0", height: "16px", background: "repeating-linear-gradient(90deg, #B57C4A 0 3px, #D7B58A 3px 6px)", opacity: ".7"}} />
        {"\n  "}
        <div style={{position: "absolute", left: "0", right: "0", bottom: "-40px", height: "40px", background: "repeating-linear-gradient(90deg, #CDB894 0 1.5px, transparent 1.5px 5px)", WebkitMaskImage: "linear-gradient(to bottom,#000 40%,transparent)", maskImage: "linear-gradient(to bottom,#000 40%,transparent)"}} />
      </div>
    </div>
  );
}
