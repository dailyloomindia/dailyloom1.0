// @ts-nocheck
/* eslint-disable */
// Generated from "Daily Loom v4.dc.html" by the dc → React converter.
// Mirrors the element tree the dc-runtime renders for this part of the page.
import {Fragment} from 'react';
import {css, I, L, S, VAL} from '../runtime';

export function ProductView({vals}: {vals: any}) {
  return (
    <>
      <main data-screen-label="Product" style={{padding: "84px clamp(20px,5vw,80px) 0"}}>
        {"\n  "}
        <div style={{display: "flex", flexWrap: "wrap", gap: "10px", fontSize: "13px", letterSpacing: ".04em", color: "#5F574B", marginBottom: "24px"}}>
          {"\n    "}
          <button onClick={vals.goHome} style={{background: "none", border: "0", padding: "0", cursor: "pointer", color: "#5F574B"}} className="scpc">
            {"Home"}
          </button>
          <span>
            {"/"}
          </span>
          {"\n    "}
          <button onClick={vals.goPCat} style={{background: "none", border: "0", padding: "0", cursor: "pointer", color: "#5F574B"}} className="scpc">
            {I(vals.pCatName)}
          </button>
          <span>
            {"/"}
          </span>
          {"\n    "}
          <span style={{color: "#221E18"}}>
            {I(vals.pName)}
          </span>
          {"\n  "}
        </div>
        {"\n  "}
        <div style={{display: "flex", flexWrap: "wrap", gap: "clamp(32px,5vw,88px)", alignItems: "flex-start"}}>
          {"\n\n    "}
          <div style={css(`flex:7 1 460px;min-width:0;position:${S(vals.stagePos)};top:${S(vals.stageTop)};display:flex;flex-direction:column;gap:16px`)}>
            {"\n      "}
            <div style={css(`position:relative;height:${S(vals.stageH)};min-height:380px;overflow:hidden;background-color:#E9DFCD;outline:1px dashed rgba(126,82,50,.4);outline-offset:8px`)}>
              {"\n        "}
              {vals.pLoading ? (
                <>
                {"\n          "}
                <div style={{position: "absolute", inset: "0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", backgroundImage: "repeating-linear-gradient(0deg, rgba(126,82,50,.06) 0 1px, transparent 1px 3px),repeating-linear-gradient(90deg, rgba(85,87,63,.06) 0 1px, transparent 1px 3px)"}}>
                  {"\n            "}
                  <img src="/assets/logo-mark.png" alt="" style={{width: "56px", height: "auto", opacity: ".55"}} />
                  {"\n            "}
                  <span style={{fontSize: "12px", letterSpacing: ".18em", textTransform: "uppercase", color: "#857A6A"}}>
                    {"Loading images"}
                  </span>
                  {"\n          "}
                </div>
                {"\n        "}
                </>
              ) : null}
              {"\n        "}
              {vals.pReady ? (
                <>
                {"\n          "}
                {L(vals.gAll).map((g, i0) => (
                  <Fragment key={i0}>
                    {"\n            "}
                    <div style={css(`position:absolute;inset:0;opacity:${S(g?.op)};transform:${S(g?.tf)};transition:opacity .8s cubic-bezier(.2,.7,.2,1),transform 1.6s cubic-bezier(.2,.7,.2,1);pointer-events:none`)}>
                      {"\n              "}
                      {g?.hasUrl ? (
                        <>
                        <div aria-hidden="true" style={css(`position:absolute;inset:-8%;background-image:${S(g?.bg)};background-size:cover;background-position:center;filter:blur(30px) saturate(1.05);opacity:.85`)} />
                        <div role="img" aria-label={g?.alt} style={css(`position:relative;width:100%;height:100%;background-image:${S(g?.bg)};background-size:contain;background-repeat:no-repeat;background-position:center`)} />
                        </>
                      ) : null}
                      {"\n              "}
                      {g?.noUrl ? (
                        <>
                        {"\n                "}
                        <div style={css(`position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;text-align:center;padding:32px;box-sizing:border-box;background-color:${S(g?.tint)};background-image:repeating-linear-gradient(0deg, rgba(255,255,255,.07) 0 1px, transparent 1px 3px),repeating-linear-gradient(90deg, rgba(0,0,0,.05) 0 1px, transparent 1px 3px)`)}>
                          {"\n                  "}
                          <img src="/assets/logo-mark.png" alt="" style={{width: "52px", height: "auto", opacity: ".7"}} />
                          {"\n                  "}
                          <span style={css(`font-family:'Marcellus',serif;font-size:24px;color:${S(g?.ink)}`)}>
                            {I(g?.alt)}
                          </span>
                          {"\n                  "}
                          <span style={css(`font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:${S(g?.ink)};opacity:.8`)}>
                            {"Image from Shopify"}
                          </span>
                          {"\n                "}
                        </div>
                        {"\n              "}
                        </>
                      ) : null}
                      {"\n            "}
                    </div>
                    {"\n          "}
                  </Fragment>
                ))}
                {"\n          "}
                <button onClick={vals.gZoom} aria-label="Zoom image" style={{position: "absolute", inset: "0", width: "100%", height: "100%", padding: "0", border: "0", background: "transparent", cursor: "zoom-in"}} />
                {"\n          "}
                <div style={{position: "absolute", left: "18px", bottom: "18px", padding: "9px 14px 8px", backgroundColor: "rgba(244,239,230,.94)", backgroundImage: "repeating-linear-gradient(90deg, rgba(126,82,50,.1) 0 1px, transparent 1px 2.5px)", outline: "1px dashed rgba(126,82,50,.5)", outlineOffset: "-4px", fontSize: "12px", letterSpacing: ".08em", color: "#221E18"}}>
                  {I(vals.gCaption)}
                </div>
                {"\n          "}
                {vals.gMulti ? (
                  <>
                  {"\n            "}
                  <div style={{position: "absolute", right: "18px", bottom: "18px", display: "flex", alignItems: "center", gap: "10px"}}>
                    {"\n              "}
                    <button onClick={vals.gPrev} aria-label="Previous image" style={{width: "40px", height: "40px", borderRadius: "50%", border: "0", background: "rgba(244,239,230,.94)", cursor: "pointer", fontSize: "18px", color: "#221E18", transition: "background .3s,transform .3s"}} className="scpd">
                      {"‹"}
                    </button>
                    {"\n              "}
                    <button onClick={vals.gNext} aria-label="Next image" style={{width: "40px", height: "40px", borderRadius: "50%", border: "0", background: "rgba(244,239,230,.94)", cursor: "pointer", fontSize: "18px", color: "#221E18", transition: "background .3s,transform .3s"}} className="scpe">
                      {"›"}
                    </button>
                    {"\n            "}
                  </div>
                  {"\n          "}
                  </>
                ) : null}
                {"\n        "}
                </>
              ) : null}
              {"\n      "}
            </div>
            {"\n      "}
            {vals.gMulti ? (
              <>
              {"\n        "}
              <div style={{display: "flex", gap: "10px", overflowX: "auto", scrollbarWidth: "none", padding: "12px 4px 4px"}}>
                {"\n          "}
                {L(vals.gThumbs).map((th, i0) => (
                  <Fragment key={i0}>
                    {"\n            "}
                    <button onClick={th?.pick} aria-label={th?.alt} style={css(`flex:none;width:64px;height:80px;padding:0;border:0;cursor:pointer;overflow:hidden;background-color:${S(th?.tint)};opacity:${S(th?.op)};outline:${S(th?.ring)};outline-offset:3px;transition:opacity .4s,outline-color .4s`)} className="scpf">
                      {"\n              "}
                      {th?.hasUrl ? (
                        <>
                        <div style={css(`width:100%;height:100%;background-image:${S(th?.bg)};background-size:cover;background-position:center`)} />
                        </>
                      ) : null}
                      {"\n            "}
                    </button>
                    {"\n          "}
                  </Fragment>
                ))}
                {"\n        "}
              </div>
              {"\n      "}
              </>
            ) : null}
            {"\n      "}
            {vals.devNotes ? (
              <>
              <span style={{alignSelf: "flex-start", fontSize: "11px", letterSpacing: ".06em", color: "#7E5232", background: "#FBF6EC", border: "1px dashed #C8925E", borderRadius: "4px", padding: "6px 8px"}}>
                {"product.media · shown when altText is empty or matches a selected option (\"Dark taupe\", \"Bath\"). variant.image is shown first on change."}
              </span>
              </>
            ) : null}
            {"\n    "}
          </div>
          {"\n\n    "}
          <aside style={{flex: "4 1 340px", minWidth: "0", display: "flex", flexDirection: "column", gap: "34px", paddingBottom: "40px"}}>
            {"\n      "}
            {vals.pLoading ? (
              <>
              {"\n        "}
              <div style={{display: "flex", flexDirection: "column", gap: "16px"}}>
                {"\n          "}
                <span style={{width: "96px", height: "22px", background: "#E5DACB"}} />
                {"\n          "}
                <span style={{width: "80%", height: "52px", background: "#E5DACB"}} />
                {"\n          "}
                <span style={{width: "100%", height: "16px", background: "#ECE3D6"}} />
                {"\n          "}
                <span style={{width: "70%", height: "16px", background: "#ECE3D6"}} />
                {"\n          "}
                <span style={{width: "120px", height: "26px", background: "#E5DACB", marginTop: "10px"}} />
                {"\n          "}
                <span style={{width: "100%", height: "76px", background: "#ECE3D6", marginTop: "22px"}} />
                {"\n          "}
                <span style={{width: "100%", height: "76px", background: "#ECE3D6"}} />
                {"\n          "}
                <span style={{width: "100%", height: "54px", borderRadius: "999px", background: "#E5DACB", marginTop: "16px"}} />
                {"\n        "}
              </div>
              {"\n      "}
              </>
            ) : null}
            {"\n      "}
            {vals.pReady ? (
              <>
              {"\n      "}
              <div style={{display: "flex", flexDirection: "column", gap: "34px"}}>
                {"\n        "}
                <div style={{display: "flex", flexDirection: "column", gap: "14px"}}>
                  {"\n          "}
                  <span style={{display: "inline-flex", alignSelf: "flex-start", padding: "7px 12px 6px", backgroundColor: "#E9DCC3", backgroundImage: "repeating-linear-gradient(90deg, rgba(126,82,50,.14) 0 1px, transparent 1px 2.5px)", outline: "1px dashed rgba(126,82,50,.5)", outlineOffset: "-3px", fontSize: "11px", letterSpacing: ".24em", textTransform: "uppercase", color: "#6B4528"}}>
                    {I(vals.pCatName)}
                  </span>
                  {"\n          "}
                  <h1 style={{margin: "0", fontFamily: "'Marcellus',serif", fontWeight: "400", fontSize: "clamp(40px,4vw,60px)", lineHeight: "1.02", letterSpacing: "-.01em"}}>
                    {I(vals.pName)}
                  </h1>
                  {"\n          "}
                  <p style={{margin: "0", fontSize: "17px", lineHeight: "1.6", fontWeight: "300", color: "#5F574B"}}>
                    {I(vals.pShort)}
                  </p>
                  {"\n          "}
                  <div style={{display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "12px", marginTop: "6px"}}>
                    {"\n            "}
                    <span style={{fontSize: "26px"}}>
                      {I(vals.pPrice)}
                    </span>
                    {"\n            "}
                    {vals.pHasCompare ? (
                      <>
                      <span style={{fontSize: "16px", color: "#857A6A", textDecoration: "line-through"}}>
                        {I(vals.pCompare)}
                      </span>
                      <span style={{fontSize: "13px", letterSpacing: ".04em", color: "#7E5232"}}>
                        {I(vals.pOff)}
                      </span>
                      </>
                    ) : null}
                    {"\n            "}
                    <span style={{fontSize: "13px", color: "#5F574B"}}>
                      {"Inclusive of all taxes"}
                    </span>
                    {"\n          "}
                  </div>
                  {"\n        "}
                </div>
                {"\n\n        "}
                {L(vals.opts).map((o, i0) => (
                  <Fragment key={i0}>
                    {"\n          "}
                    <div style={{display: "flex", flexDirection: "column", gap: "14px", paddingTop: "24px", borderTop: "1.5px dashed rgba(126,82,50,.28)"}}>
                      {"\n            "}
                      <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "16px"}}>
                        {"\n              "}
                        <span style={{fontFamily: "'Marcellus',serif", fontSize: "24px"}}>
                          {I(o?.name)}
                        </span>
                        {"\n              "}
                        <span style={{fontSize: "14px", color: "#5F574B", textAlign: "right"}}>
                          {I(o?.current)}
                        </span>
                        {"\n            "}
                      </div>
                      {"\n            "}
                      {o?.single ? (
                        <>
                        {"\n              "}
                        <div style={{fontSize: "15px", lineHeight: "1.5", color: "#221E18"}}>
                          {I(o?.singleText)}
                        </div>
                        {"\n            "}
                        </>
                      ) : null}
                      {"\n            "}
                      {o?.swatch ? (
                        <>
                        {"\n              "}
                        <div style={{display: "flex", flexWrap: "wrap", gap: "16px", padding: "4px"}}>
                          {"\n                "}
                          {L(o?.vals).map((v, i1) => (
                            <Fragment key={i1}>
                              {"\n                  "}
                              <button onClick={v?.pick} disabled={v?.disabled} aria-label={v?.label} title={v?.label} style={css(`position:relative;width:42px;height:42px;border-radius:50%;border:0;cursor:${S(v?.cursor)};background-color:${S(v?.hex)};background-image:repeating-linear-gradient(45deg, rgba(255,255,255,.18) 0 1px, transparent 1px 3px),repeating-linear-gradient(-45deg, rgba(0,0,0,.08) 0 1px, transparent 1px 3px);box-shadow:${S(v?.ring)};opacity:${S(v?.op)};transition:box-shadow .35s,transform .35s`)} className="scpg" />
                              {"\n                "}
                            </Fragment>
                          ))}
                          {"\n              "}
                        </div>
                        {"\n            "}
                        </>
                      ) : null}
                      {"\n            "}
                      {o?.tiles ? (
                        <>
                        {"\n              "}
                        <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: "10px"}}>
                          {"\n                "}
                          {L(o?.vals).map((v, i1) => (
                            <Fragment key={i1}>
                              {"\n                  "}
                              <button onClick={v?.pick} disabled={v?.disabled} style={css(`display:flex;flex-direction:column;align-items:flex-start;gap:6px;text-align:left;padding:16px 16px 15px;border-radius:4px;cursor:${S(v?.cursor)};background:${S(v?.bg)};border:1px solid ${S(v?.bd)};outline:${S(v?.outline)};outline-offset:-6px;color:${S(v?.fg)};transition:border-color .35s,background .35s,outline-color .35s`)} className="scph">
                                {"\n                    "}
                                <span style={{display: "flex", justifyContent: "space-between", alignItems: "baseline", width: "100%", gap: "10px"}}>
                                  <span style={{fontFamily: "'Marcellus',serif", fontSize: "19px"}}>
                                    {I(v?.label)}
                                  </span>
                                  <span style={{fontSize: "13px"}}>
                                    {I(v?.price)}
                                  </span>
                                </span>
                                {"\n                    "}
                                <span style={css(`font-size:13px;line-height:1.45;color:${S(v?.subColor)}`)}>
                                  {I(v?.sub)}
                                </span>
                                {"\n                    "}
                                {v?.hasNf ? (
                                  <>
                                  <span style={{display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "11px", letterSpacing: ".03em", color: "#7E5232"}}>
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{flex: "none"}}>
                                      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                                      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                                    </svg>
                                    {I(v?.nfLabel)}
                                  </span>
                                  </>
                                ) : null}
                                {"\n                  "}
                              </button>
                              {"\n                "}
                            </Fragment>
                          ))}
                          {"\n              "}
                        </div>
                        {"\n            "}
                        </>
                      ) : null}
                      {"\n          "}
                    </div>
                    {"\n        "}
                  </Fragment>
                ))}
                {"\n\n        "}
                {vals.showMono ? (
                  <>
                  {"\n          "}
                  <div style={{display: "flex", flexDirection: "column", gap: "8px", marginTop: "-10px"}}>
                    {"\n            "}
                    <div style={{fontSize: "13px", letterSpacing: ".06em", color: "#5F574B"}}>
                      {"Initials · up to three letters"}
                    </div>
                    {"\n            "}
                    <input value={VAL(vals.mono)} onChange={vals.onMono} placeholder="e.g. ADK" maxLength="3" style={{background: "transparent", border: "0", borderBottom: "1.5px dashed rgba(34,30,24,.35)", outline: "none", padding: "10px 0", fontFamily: "'Marcellus',serif", fontSize: "22px", letterSpacing: ".3em"}} />
                    {"\n            "}
                    <span style={{fontSize: "12px", color: "#857A6A"}}>
                      {I(vals.monoNote)}
                    </span>
                    {"\n          "}
                  </div>
                  {"\n        "}
                  </>
                ) : null}
                {"\n\n        "}
                <div ref={vals.ctaRef} style={{display: "flex", flexDirection: "column", gap: "14px", paddingTop: "24px", borderTop: "1.5px dashed rgba(126,82,50,.28)"}}>
                  {"\n          "}
                  {vals.pAvail ? (
                    <>
                    {"\n            "}
                    <div style={{display: "flex", gap: "12px", alignItems: "stretch"}}>
                      {"\n              "}
                      <div style={{display: "flex", alignItems: "center", border: "1px solid rgba(34,30,24,.22)", borderRadius: "999px", outline: "1px dashed rgba(126,82,50,.3)", outlineOffset: "-5px"}}>
                        {"\n                "}
                        <button onClick={vals.qtyDec} aria-label="Decrease" style={{width: "44px", height: "52px", background: "none", border: "0", cursor: "pointer", fontSize: "18px"}}>
                          {"−"}
                        </button>
                        {"\n                "}
                        <span style={{minWidth: "20px", textAlign: "center", fontSize: "15px"}}>
                          {I(vals.qty)}
                        </span>
                        {"\n                "}
                        <button onClick={vals.qtyInc} aria-label="Increase" style={{width: "44px", height: "52px", background: "none", border: "0", cursor: "pointer", fontSize: "18px"}}>
                          {"+"}
                        </button>
                        {"\n              "}
                      </div>
                      {"\n              "}
                      <button onClick={vals.addToBag} style={css(`flex:1;background-color:#221E18;background-image:repeating-linear-gradient(135deg, rgba(255,255,255,.07) 0 1px, transparent 1px 3px),linear-gradient(180deg, rgba(255,255,255,.1), rgba(0,0,0,.18));color:#F4EFE6;border:0;border-radius:999px;outline:1px dashed rgba(244,239,230,.42);outline-offset:-5px;letter-spacing:.05em;cursor:pointer;transition:background-color .5s,outline-offset .4s,transform .3s;background-color:${S(vals.addBg)};padding:0 24px;height:54px;font-size:15px`)} className="scp2 scpi">
                        {I(vals.addLabel)}
                      </button>
                      {"\n            "}
                    </div>
                    {"\n          "}
                    </>
                  ) : null}
                  {"\n          "}
                  {vals.pSoldOut ? (
                    <>
                    {"\n            "}
                    <div style={{display: "flex", flexDirection: "column", gap: "12px"}}>
                      {"\n              "}
                      <span style={{fontFamily: "'Marcellus',serif", fontSize: "22px"}}>
                        {"Sold out in this selection."}
                      </span>
                      {"\n              "}
                      <span style={{fontSize: "14px", lineHeight: "1.5", color: "#5F574B"}}>
                        {I(vals.notifyLede)}
                      </span>
                      {"\n              "}
                      <div style={{display: "flex", gap: "10px", alignItems: "stretch"}}>
                        {"\n                "}
                        {vals.notifyAsk ? (
                          <>
                          <input value={VAL(vals.notifyEmail)} onChange={vals.onNotifyEmail} type="email" placeholder="Email address" style={{flex: "1", minWidth: "0", background: "transparent", border: "1px solid rgba(34,30,24,.25)", borderRadius: "999px", outline: "none", padding: "0 20px", height: "52px", fontSize: "15px"}} />
                          </>
                        ) : null}
                        {"\n                "}
                        <button onClick={vals.notifyMe} style={{backgroundColor: "#221E18", backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,.07) 0 1px, transparent 1px 3px),linear-gradient(180deg, rgba(255,255,255,.1), rgba(0,0,0,.18))", color: "#F4EFE6", border: "0", borderRadius: "999px", outline: "1px dashed rgba(244,239,230,.42)", outlineOffset: "-5px", letterSpacing: ".05em", cursor: "pointer", transition: "background-color .5s,outline-offset .4s,transform .3s", padding: "0 22px", height: "54px", fontSize: "14px"}} className="scpa">
                          {I(vals.notifyLabel)}
                        </button>
                        {"\n              "}
                      </div>
                      {"\n              "}
                      {vals.notifyHasErr ? (
                        <>
                        <span style={{fontSize: "14px", color: "#8A3B2A"}}>
                          {I(vals.notifyErr)}
                        </span>
                        </>
                      ) : null}
                      {"\n            "}
                    </div>
                    {"\n          "}
                    </>
                  ) : null}
                  {"\n          "}
                  <div style={{display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px", lineHeight: "1.5", color: "#5F574B"}}>
                    {"\n            "}
                    <span>
                      {"Complimentary delivery, dispatched within 48 hours · Secure checkout with UPI, cards and net banking"}
                    </span>
                    {"\n            "}
                    {vals.festiveDelay ? (
                      <>
                      <span style={{color: "#7E5232"}}>
                        {"Due to the festive season, we are experiencing a delay in shipping pillows."}
                      </span>
                      </>
                    ) : null}
                    {"\n            "}
                    <span>
                      {"Need help choosing? Write to "}
                      <a href="mailto:contact@dailyloom.in" style={{color: "#7E5232"}}>
                        {"contact@dailyloom.in"}
                      </a>
                      {" or "}
                      <a href="https://wa.me/919220442722" target="_blank" rel="noopener" style={{color: "#7E5232"}}>
                        {"WhatsApp us"}
                      </a>
                    </span>
                    {"\n          "}
                  </div>
                  {"\n          "}
                  {vals.devNotes ? (
                    <>
                    <span style={{alignSelf: "flex-start", fontSize: "11px", letterSpacing: ".06em", color: "#7E5232", background: "#FBF6EC", border: "1px dashed #C8925E", borderRadius: "4px", padding: "6px 8px"}}>
                      {"CartForm LinesAdd · sc-camel-merchandise-id = selected variant.id · monogram as line attribute"}
                    </span>
                    </>
                  ) : null}
                  {"\n        "}
                </div>
                {"\n\n        "}
                <div style={{position: "relative", isolation: "isolate", overflow: "hidden", display: "flex", flexDirection: "column", gap: "10px", padding: "22px", backgroundColor: "#EAE2D4", outline: "1px dashed rgba(126,82,50,.45)", outlineOffset: "-7px"}}>
                  {"\n          "}
                  <div style={{fontSize: "13px", letterSpacing: ".06em", color: "#554D42"}}>
                    {"Check delivery"}
                  </div>
                  {"\n          "}
                  <div style={{display: "flex", gap: "8px", borderBottom: "1.5px dashed rgba(34,30,24,.35)"}}>
                    {"\n            "}
                    <input value={VAL(vals.pin)} onChange={vals.onPin} onKeyDown={vals.onPinKey} inputMode="numeric" placeholder="Pincode" style={{flex: "1", minWidth: "0", background: "transparent", border: "0", outline: "none", padding: "10px 0", fontSize: "16px", letterSpacing: ".12em"}} />
                    {"\n            "}
                    <button onClick={vals.checkPin} style={{background: "none", border: "0", cursor: "pointer", fontSize: "14px", color: "#7E5232", padding: "0 2px"}}>
                      {"Check"}
                    </button>
                    {"\n          "}
                  </div>
                  {"\n          "}
                  {vals.hasPinMsg ? (
                    <>
                    <div style={{fontSize: "14px", lineHeight: "1.5", color: "#221E18"}}>
                      {I(vals.pinMsg)}
                    </div>
                    </>
                  ) : null}
                  {"\n          "}
                  {vals.devNotes ? (
                    <>
                    <span style={{alignSelf: "flex-start", fontSize: "11px", letterSpacing: ".06em", color: "#7E5232", background: "#FBF6EC", border: "1px dashed #C8925E", borderRadius: "4px", padding: "6px 8px"}}>
                      {"Logistics API · serviceability + EDD by pincode"}
                    </span>
                    </>
                  ) : null}
                  {"\n        "}
                </div>
                {"\n\n        "}
                <div style={{display: "flex", flexDirection: "column", borderBottom: "1.5px dashed rgba(126,82,50,.28)"}}>
                  {"\n          "}
                  {L(vals.acc).map((a, i0) => (
                    <Fragment key={i0}>
                      {"\n            "}
                      <div style={{borderTop: "1.5px dashed rgba(126,82,50,.28)"}}>
                        {"\n              "}
                        <button onClick={a?.toggle} style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "0", padding: "18px 0", cursor: "pointer", fontSize: "15px", textAlign: "left"}}>
                          {"\n                "}{I(a?.title)}{"\n                "}
                          <span style={css(`font-size:20px;font-weight:300;line-height:1;transform:${S(a?.rot)};transition:transform .45s cubic-bezier(.2,.7,.2,1)`)}>
                            {"+"}
                          </span>
                          {"\n              "}
                        </button>
                        {"\n              "}
                        <div style={css(`display:grid;grid-template-rows:${S(a?.rows)};transition:grid-template-rows .55s cubic-bezier(.2,.7,.2,1)`)}>
                          {"\n                "}
                          <div style={{overflow: "hidden"}}>
                            {"\n                  "}
                            <div style={{padding: "0 0 20px", fontSize: "15px", lineHeight: "1.65", fontWeight: "300", color: "#5F574B"}}>
                              {I(a?.body)}
                            </div>
                            {"\n                "}
                          </div>
                          {"\n              "}
                        </div>
                        {"\n            "}
                      </div>
                      {"\n          "}
                    </Fragment>
                  ))}
                  {"\n        "}
                </div>
                {"\n        "}
                <button onClick={vals.goPCat} style={{alignSelf: "flex-start", background: "none", border: "0", padding: "4px 0", cursor: "pointer", fontSize: "15px", color: "#7E5232", backgroundImage: "repeating-linear-gradient(90deg, #7E5232 0 5px, transparent 5px 8px)", backgroundRepeat: "no-repeat", backgroundPosition: "0 100%", backgroundSize: "0% 1.5px", transition: "background-size .6s cubic-bezier(.2,.7,.2,1)"}} className="scp5">
                  {"Why "}{I(vals.pName)}{" is different →"}
                </button>
                {"\n        "}
                {vals.devNotes ? (
                  <>
                  {"\n          "}
                  <pre style={{margin: "0", whiteSpace: "pre-wrap", fontSize: "11px", lineHeight: "1.55", color: "#7E5232", background: "#FBF6EC", border: "1px dashed #C8925E", borderRadius: "4px", padding: "12px"}}>
                    {"product(handle: $handle) {\n  title  descriptionHtml\n  options { name optionValues { name swatch { color } } }\n  variants(first: 100) {\n    nodes { id availableForSale\n      selectedOptions { name value }\n      price { amount currencyCode }\n      compareAtPrice { amount }\n      image { url altText width height } } }\n  media(first: 30) { nodes { ... on MediaImage {\n    image { url altText width height } } } }\n}"}
                  </pre>
                  {"\n        "}
                  </>
                ) : null}
                {"\n      "}
              </div>
              {"\n      "}
              </>
            ) : null}
            {"\n    "}
          </aside>
          {"\n  "}
        </div>
        {"\n\n  "}
        <section style={{padding: "clamp(100px,12vw,170px) 0 clamp(80px,10vw,140px)"}}>
          {"\n    "}
          <h2 data-reveal="0" style={{margin: "0 0 clamp(36px,4vw,56px)", fontFamily: "'Marcellus',serif", fontWeight: "400", fontSize: "clamp(34px,3.6vw,54px)", lineHeight: "1.05"}}>
            {"Complete the set."}
          </h2>
          {"\n    "}
          <div style={{display: "flex", flexWrap: "wrap", gap: "clamp(24px,2.8vw,40px)"}}>
            {"\n      "}
            {L(vals.recs).map((r, i0) => (
              <Fragment key={i0}>
                {"\n        "}
                <div data-reveal={r?.delay} onClick={r?.onClick} style={{flex: "1 1 260px", minWidth: "0", display: "flex", flexDirection: "column", gap: "20px", cursor: "pointer"}}>
                  {"\n          "}
                  <div style={{height: "clamp(300px,30vw,440px)", position: "relative", overflow: "hidden", background: "#E5DCCB", outline: "1px dashed rgba(126,82,50,.4)", outlineOffset: "8px"}}>
                    {"\n            "}
                    <div style={{position: "absolute", inset: "0", transition: "transform 1.6s cubic-bezier(.2,.7,.2,1)"}} className="scp7">
                      <image-slot id={r?.slotId} src={r?.src} shape="rect" placeholder={r?.ph} />
                    </div>
                    {"\n          "}
                  </div>
                  {"\n          "}
                  <div style={{display: "flex", justifyContent: "space-between", gap: "16px", alignItems: "baseline"}}>
                    {"\n            "}
                    <span style={{fontFamily: "'Marcellus',serif", fontSize: "24px"}}>
                      {I(r?.name)}
                    </span>
                    {"\n            "}
                    <span style={{fontSize: "14px", color: "#5F574B"}}>
                      {I(r?.price)}
                      {r?.deal?.has ? (
                        <>
                        <span style={{marginLeft: "10px", color: "#857A6A", textDecoration: "line-through"}}>
                          {I(r?.deal?.cmp)}
                        </span>
                        <span style={{marginLeft: "10px", fontSize: "13px", letterSpacing: ".04em", color: "#7E5232"}}>
                          {I(r?.deal?.off)}
                        </span>
                        </>
                      ) : null}
                    </span>
                    {"\n          "}
                  </div>
                  {"\n        "}
                </div>
                {"\n      "}
              </Fragment>
            ))}
            {"\n    "}
          </div>
          {"\n  "}
        </section>
      </main>
      <div style={css(`position:fixed;left:50%;bottom:${S(vals.barBottom)};z-index:55;width:${S(vals.barW)};transform:${S(vals.barTf)};opacity:${S(vals.barOp)};pointer-events:${S(vals.barPe)};transition:transform .6s cubic-bezier(.2,.8,.2,1),opacity .4s;display:flex;align-items:center;gap:${S(vals.barGap)};padding:${S(vals.barPad)};box-sizing:border-box;border-radius:999px;background-color:rgba(244,239,230,.9);background-image:repeating-linear-gradient(0deg, rgba(126,82,50,.05) 0 1px, transparent 1px 3px),repeating-linear-gradient(90deg, rgba(85,87,63,.05) 0 1px, transparent 1px 3px);backdrop-filter:saturate(1.4) blur(18px);-webkit-backdrop-filter:saturate(1.4) blur(18px);outline:1px dashed rgba(126,82,50,.4);outline-offset:-5px;box-shadow:0 14px 40px rgba(34,30,24,.16)`)}>
        {"\n  "}
        <div style={css(`flex:none;width:${S(vals.barThumb)};height:${S(vals.barThumb)};border-radius:50%;overflow:hidden;display:${S(vals.barThumbDisp)};background-color:${S(vals.barTint)}`)}>
          {"\n    "}
          {vals.barHasImg ? (
            <>
            <div style={css(`width:100%;height:100%;background-image:${S(vals.barBg)};background-size:cover;background-position:center`)} />
            </>
          ) : null}
          {"\n  "}
        </div>
        {"\n  "}
        <div style={{flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "2px"}}>
          {"\n    "}
          <span style={css(`font-family:'Marcellus',serif;font-size:${S(vals.barNameSize)};line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>
            {I(vals.pName)}
          </span>
          {"\n    "}
          <span style={{fontSize: "12px", color: "#5F574B", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
            {I(vals.barSub)}
          </span>
          {"\n  "}
        </div>
        {"\n  "}
        <span style={css(`flex:none;font-size:16px;display:${S(vals.barPriceDisp)}`)}>
          {I(vals.pPrice)}
        </span>
        {"\n  "}
        <button onClick={vals.barAction} style={css(`flex:none;background-color:#221E18;background-image:repeating-linear-gradient(135deg, rgba(255,255,255,.07) 0 1px, transparent 1px 3px),linear-gradient(180deg, rgba(255,255,255,.1), rgba(0,0,0,.18));color:#F4EFE6;border:0;border-radius:999px;outline:1px dashed rgba(244,239,230,.42);outline-offset:-5px;letter-spacing:.05em;cursor:pointer;transition:background-color .5s,outline-offset .4s,transform .3s;padding:${S(vals.barBtnPad)};height:${S(vals.barBtnH)};font-size:${S(vals.barBtnFont)};white-space:nowrap`)} className="scpa">
          {I(vals.barLabel)}
        </button>
        {"\n  "}
        <button onClick={vals.barClose} aria-label="Close" style={css(`flex:none;width:${S(vals.barClose_)};height:${S(vals.barClose_)};margin-left:-6px;border-radius:50%;border:0;background:rgba(34,30,24,.06);cursor:pointer;font-size:17px;line-height:1;color:#221E18;transition:background .3s`)} className="scpj">
          {"×"}
        </button>
      </div>
    </>
  );
}
