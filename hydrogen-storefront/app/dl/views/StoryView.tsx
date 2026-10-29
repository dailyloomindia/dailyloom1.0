// @ts-nocheck
/* eslint-disable */
// Generated from "Daily Loom v4.dc.html" by the dc → React converter.
// Mirrors the element tree the dc-runtime renders for this part of the page.
import {Fragment} from 'react';
import {css, I, L, S, VAL} from '../runtime';

export function StoryView({vals}: {vals: any}) {
  return (
    <>
      <main data-screen-label="Story" style={{paddingTop: "56px"}}>
        {"\n  "}
        <div style={{position: "sticky", top: "56px", zIndex: "40", height: "52px", display: "flex", alignItems: "center", gap: "24px", padding: "0 clamp(20px,5vw,80px)", backgroundColor: "rgba(234,226,212,.86)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)"}}>
          {"\n    "}
          <div style={{flex: "1"}} />
          {"\n    "}
          <span style={{flex: "none", fontSize: "14px", letterSpacing: ".02em", color: "#554D42"}}>
            {I(vals.stFrom)}
            {vals.stDeal?.has ? (
              <>
              <span style={{marginLeft: "10px", color: "#857A6A", textDecoration: "line-through"}}>
                {I(vals.stDeal?.cmp)}
              </span>
              <span style={{marginLeft: "10px", fontSize: "13px", letterSpacing: ".04em", color: "#7E5232"}}>
                {I(vals.stDeal?.off)}
              </span>
              </>
            ) : null}
          </span>
          {"\n    "}
          <button onClick={vals.stBuyScroll} style={{flex: "none", backgroundColor: "#221E18", backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,.07) 0 1px, transparent 1px 3px)", color: "#F4EFE6", border: "0", borderRadius: "999px", outline: "1px dashed rgba(244,239,230,.42)", outlineOffset: "-4px", padding: "8px 18px", fontSize: "13px", letterSpacing: ".04em", cursor: "pointer", transition: "background-color .4s"}} className="scpa">
            {"Buy"}
          </button>
          {"\n    "}
          <div style={{position: "absolute", left: "0", right: "0", bottom: "0", height: "1.5px", background: "repeating-linear-gradient(90deg, rgba(126,82,50,.32) 0 6px, transparent 6px 10px)"}} />
          {"\n  "}
        </div>
        {"\n\n  "}
        <section id="st-overview" style={{position: "relative", height: "calc(100vh - 108px)", minHeight: "560px", background: "#2A251E", overflow: "hidden"}}>
          {"\n    "}
          <div style={{position: "absolute", inset: "0"}}>
            <image-slot id={vals.stHeroSlot} src={vals.stHeroSrc} shape="rect" placeholder={vals.stHeroPh} />
          </div>
          {"\n    "}
          <div style={{position: "absolute", inset: "0", pointerEvents: "none", background: "linear-gradient(to top, rgba(22,19,15,.8) 0%, rgba(22,19,15,.3) 45%, rgba(22,19,15,0) 72%)"}} />
          {"\n    "}
          <div data-reveal="100" style={{position: "absolute", left: "clamp(20px,5vw,80px)", right: "clamp(20px,5vw,80px)", bottom: "clamp(40px,8vh,88px)", display: "flex", flexDirection: "column", gap: "18px", pointerEvents: "none", maxWidth: "900px"}}>
            {"\n      "}
            <span style={{display: "inline-flex", alignSelf: "flex-start", padding: "7px 12px 6px", backgroundColor: "#2C2820", backgroundImage: "repeating-linear-gradient(90deg, rgba(237,230,216,.09) 0 1px, transparent 1px 2.5px)", outline: "1px dashed rgba(200,146,94,.7)", outlineOffset: "-3px", fontSize: "11px", letterSpacing: ".24em", textTransform: "uppercase", color: "#E3C9A6"}}>
              {I(vals.stTitle)}
            </span>
            {"\n      "}
            <h1 style={{margin: "0", fontFamily: "'Marcellus',serif", fontWeight: "400", fontSize: "clamp(52px,7.6vw,120px)", lineHeight: ".98", letterSpacing: "-.015em", color: "#F4EFE6", textWrap: "balance"}}>
              {I(vals.stTagline)}
            </h1>
            {"\n    "}
          </div>
          {"\n  "}
        </section>
        {"\n\n  "}
        <section style={{position: "relative", isolation: "isolate", overflow: "hidden", backgroundColor: "#F4EFE6", backgroundImage: "linear-gradient(rgba(244,239,230,0.45),rgba(244,239,230,0.45)),url(/assets/satin.jpg)", backgroundSize: "cover,cover", backgroundPosition: "center,center", backgroundBlendMode: "normal,multiply", padding: "clamp(100px,14vw,190px) clamp(20px,5vw,80px)"}}>
          {"\n    "}
          <p data-reveal="0" style={{margin: "0 0 0 auto", maxWidth: "1040px", fontFamily: "'Marcellus',serif", fontSize: "clamp(30px,3.8vw,58px)", lineHeight: "1.2", textWrap: "pretty"}}>
            {I(vals.stIntro)}{" "}
            <span style={{color: "#857A6A"}}>
              {I(vals.stIntroAccent)}
            </span>
          </p>
          {"\n  "}
        </section>
        {"\n\n  "}
        <section id="st-why" style={{padding: "0 clamp(20px,5vw,80px) clamp(60px,8vw,120px)", display: "flex", flexDirection: "column", gap: "clamp(100px,12vw,180px)"}}>
          {"\n    "}
          {L(vals.stWhy).map((w, i0) => (
            <Fragment key={i0}>
              {"\n      "}
              <div style={css(`display:flex;flex-wrap:wrap;flex-direction:${S(w?.dir)};gap:clamp(32px,5vw,88px);align-items:center`)}>
                {"\n        "}
                <div data-reveal="0" style={{flex: "7 1 460px", minWidth: "0", aspectRatio: "1 / 1", maxHeight: "1000px", position: "relative", WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,.85) 0%, #000 4%, #000 88%, rgba(0,0,0,.6) 96%, rgba(0,0,0,.25) 100%), linear-gradient(to right, rgba(0,0,0,.6) 0%, #000 4%, #000 96%, rgba(0,0,0,.6) 100%)", WebkitMaskComposite: "source-in", maskImage: "linear-gradient(to bottom, rgba(0,0,0,.85) 0%, #000 4%, #000 88%, rgba(0,0,0,.6) 96%, rgba(0,0,0,.25) 100%), linear-gradient(to right, rgba(0,0,0,.6) 0%, #000 4%, #000 96%, rgba(0,0,0,.6) 100%)", maskComposite: "intersect"}}>
                  {"\n          "}
                  <image-slot id={w?.slot} src={w?.src} shape="rect" placeholder={w?.ph} />
                  {"\n        "}
                </div>
                {"\n        "}
                <div data-reveal="160" style={{flex: "4 1 320px", minWidth: "0", display: "flex", flexDirection: "column", gap: "22px"}}>
                  {"\n          "}
                  <span style={{display: "inline-flex", alignSelf: "flex-start", padding: "7px 12px 6px", backgroundColor: "#E9DCC3", backgroundImage: "repeating-linear-gradient(90deg, rgba(126,82,50,.14) 0 1px, transparent 1px 2.5px)", outline: "1px dashed rgba(126,82,50,.5)", outlineOffset: "-3px", fontSize: "11px", letterSpacing: ".24em", textTransform: "uppercase", color: "#6B4528"}}>
                    {I(w?.tag)}
                  </span>
                  {"\n          "}
                  <h2 style={{margin: "0", fontFamily: "'Marcellus',serif", fontWeight: "400", fontSize: "clamp(34px,3.8vw,56px)", lineHeight: "1.05", letterSpacing: "-.01em"}}>
                    {I(w?.t)}
                  </h2>
                  {"\n          "}
                  {w?.hasB ? (
                    <>
                    <p style={{margin: "0", fontSize: "18px", lineHeight: "1.65", fontWeight: "300", color: "#5F574B", maxWidth: "440px"}}>
                      {I(w?.b)}
                    </p>
                    </>
                  ) : null}
                  {"\n          "}
                  {w?.hasCmp ? (
                    <>
                    {"\n            "}
                    <div style={{display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", columnGap: "clamp(16px,2vw,28px)", maxWidth: "520px"}}>
                      {"\n              "}
                      {L(w?.cmpCols).map((c, i1) => (
                        <Fragment key={i1}>
                          {"\n                "}
                          <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "10px", paddingBottom: "16px"}}>
                            {"\n                  "}
                            {c?.hasImg ? (
                              <>
                              {"\n                    "}
                              <div style={{display: "flex", flexDirection: "column", gap: "6px", width: "100%"}}>
                                {"\n                      "}
                                <div role="img" aria-label={c?.imgLabel} style={css(`width:100%;aspect-ratio:4 / 3;background-image:${S(c?.imgBg)};background-size:cover;background-position:center`)} />
                                {"\n                      "}
                                <span style={{fontSize: "12px", color: "#857A6A"}}>
                                  {I(c?.imgLabel)}
                                </span>
                                {"\n                    "}
                              </div>
                              {"\n                  "}
                              </>
                            ) : null}
                            {"\n                  "}
                            <span style={{fontFamily: "'Marcellus',serif", fontSize: "clamp(19px,1.6vw,22px)", lineHeight: "1.2"}}>
                              {I(c?.name)}
                            </span>
                            {"\n                  "}
                            {c?.hasBadge ? (
                              <>
                              <span style={{display: "inline-flex", padding: "5px 9px 4px", backgroundColor: "#221E18", backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,.08) 0 1px, transparent 1px 2.5px)", outline: "1px dashed rgba(244,239,230,.45)", outlineOffset: "-3px", fontSize: "10px", letterSpacing: ".22em", textTransform: "uppercase", color: "#F4EFE6"}}>
                                {I(c?.badge)}
                              </span>
                              </>
                            ) : null}
                            {"\n                "}
                          </div>
                          {"\n              "}
                        </Fragment>
                      ))}
                      {"\n              "}
                      {L(w?.cmpRows).map((r, i1) => (
                        <Fragment key={i1}>
                          {"\n                "}
                          <div style={{gridColumn: "1 / -1", paddingTop: "14px", borderTop: "1.5px dashed rgba(126,82,50,.28)", fontSize: "11px", letterSpacing: ".2em", textTransform: "uppercase", color: "#857A6A"}}>
                            {I(r?.k)}
                          </div>
                          {"\n                "}
                          <div style={{padding: "8px 0 16px", fontSize: "15px", lineHeight: "1.55", fontWeight: "300", color: "#3F382F"}}>
                            {I(r?.a)}
                          </div>
                          {"\n                "}
                          <div style={{padding: "8px 0 16px", fontSize: "15px", lineHeight: "1.55", fontWeight: "300", color: "#3F382F"}}>
                            {I(r?.b)}
                          </div>
                          {"\n              "}
                        </Fragment>
                      ))}
                      {"\n              "}
                      {L(w?.cmpCols).map((c, i1) => (
                        <Fragment key={i1}>
                          {"\n                "}
                          <div style={{display: "flex", flexDirection: "column", gap: "10px", paddingTop: "16px", borderTop: "1.5px dashed rgba(126,82,50,.28)"}}>
                            {"\n                  "}
                            <div style={{display: "flex", flexWrap: "wrap", gap: "8px"}}>
                              {"\n                    "}
                              {L(c?.sw).map((s, i2) => (
                                <Fragment key={i2}>
                                  {"\n                      "}
                                  <span title={s?.label} style={css(`width:20px;height:20px;border-radius:50%;background-color:${S(s?.hex)};background-image:repeating-linear-gradient(45deg, rgba(255,255,255,.18) 0 1px, transparent 1px 3px),repeating-linear-gradient(-45deg, rgba(0,0,0,.08) 0 1px, transparent 1px 3px);box-shadow:inset 0 0 0 1px rgba(34,30,24,.18)`)} />
                                  {"\n                    "}
                                </Fragment>
                              ))}
                              {"\n                  "}
                            </div>
                            {"\n                  "}
                            <span style={{fontSize: "12px", lineHeight: "1.5", color: "#5F574B"}}>
                              {I(c?.swNames)}
                            </span>
                            {"\n                "}
                          </div>
                          {"\n              "}
                        </Fragment>
                      ))}
                      {"\n            "}
                    </div>
                    {"\n          "}
                    </>
                  ) : null}
                  {"\n        "}
                </div>
                {"\n      "}
              </div>
              {"\n    "}
            </Fragment>
          ))}
          {"\n  "}
        </section>
        {"\n\n  "}
        {vals.hasLayers ? (
          <>
          {"\n  "}
          <section id="st-layers" data-screen-label="Story · Layers" style={{padding: "clamp(20px,4vw,60px) clamp(20px,5vw,80px) clamp(100px,12vw,170px)"}}>
            {"\n    "}
            <div data-reveal="0" style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "28px", marginBottom: "clamp(40px,5vw,72px)"}}>
              {"\n      "}
              <div style={{display: "flex", flexDirection: "column", gap: "20px", maxWidth: "640px"}}>
                {"\n        "}
                <span style={{display: "inline-flex", alignSelf: "flex-start", padding: "7px 12px 6px", backgroundColor: "#E9DCC3", backgroundImage: "repeating-linear-gradient(90deg, rgba(126,82,50,.14) 0 1px, transparent 1px 2.5px)", outline: "1px dashed rgba(126,82,50,.5)", outlineOffset: "-3px", fontSize: "11px", letterSpacing: ".24em", textTransform: "uppercase", color: "#6B4528"}}>
                  {"Choose your warmth"}
                </span>
                {"\n        "}
                <h2 style={{margin: "0", fontFamily: "'Marcellus',serif", fontWeight: "400", fontSize: "clamp(40px,5vw,76px)", lineHeight: "1.02", letterSpacing: "-.01em"}}>
                  {I(vals.layersTitle)}
                </h2>
                {"\n      "}
              </div>
              {"\n      "}
              <p style={{margin: "0", maxWidth: "380px", fontSize: "18px", lineHeight: "1.6", fontWeight: "300", color: "#5F574B"}}>
                {I(vals.layersLede)}
              </p>
              {"\n    "}
            </div>
            {"\n    "}
            <div style={{display: "flex", flexWrap: "wrap", gap: "clamp(20px,2.4vw,32px)"}}>
              {"\n      "}
              {L(vals.layerOpts).map((l, i0) => (
                <Fragment key={i0}>
                  {"\n        "}
                  <div data-reveal={l?.delay} style={{flex: "1 1 320px", minWidth: "0", display: "flex", flexDirection: "column", gap: "22px", padding: "clamp(28px,3.4vw,48px)", background: "rgba(244,239,230,.72)", outline: "1px dashed rgba(126,82,50,.42)", outlineOffset: "-10px"}}>
                    {"\n          "}
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px"}}>
                      {"\n            "}
                      <span style={{fontFamily: "'Marcellus',serif", fontSize: "clamp(88px,9vw,132px)", lineHeight: ".8", color: "#221E18"}}>
                        {I(l?.n)}
                      </span>
                      {"\n            "}
                      <span style={css(`font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:${S(l?.tagColor)};padding-top:8px`)}>
                        {I(l?.tag)}
                      </span>
                      {"\n          "}
                    </div>
                    {"\n          "}
                    <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                      {"\n            "}
                      <span style={{fontFamily: "'Marcellus',serif", fontSize: "clamp(28px,2.6vw,38px)", lineHeight: "1.1"}}>
                        {I(l?.t)}
                      </span>
                      {"\n            "}
                      <span style={{fontSize: "15px", letterSpacing: ".02em", color: "#6B4528"}}>
                        {I(l?.fill)}
                      </span>
                      {"\n            "}
                      <p style={{margin: "0", fontSize: "17px", lineHeight: "1.6", fontWeight: "300", color: "#5F574B", maxWidth: "420px"}}>
                        {I(l?.where)}
                      </p>
                      {"\n          "}
                    </div>
                    {"\n          "}
                    <div style={{marginTop: "auto", paddingTop: "20px", borderTop: "1.5px dashed rgba(126,82,50,.3)"}}>
                      {"\n            "}
                      {l?.isBuy ? (
                        <>
                        {"\n              "}
                        <button onClick={l?.buy} style={{backgroundColor: "#221E18", backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,.07) 0 1px, transparent 1px 3px),linear-gradient(180deg, rgba(255,255,255,.1), rgba(0,0,0,.18))", color: "#F4EFE6", border: "0", borderRadius: "999px", outline: "1px dashed rgba(244,239,230,.42)", outlineOffset: "-5px", padding: "14px 26px", fontSize: "14px", letterSpacing: ".05em", cursor: "pointer", transition: "background-color .4s,outline-offset .4s,transform .3s"}} className="scp2 scp3">
                          {I(l?.cta)}
                        </button>
                        {"\n            "}
                        </>
                      ) : null}
                      {"\n            "}
                      {l?.isRequest ? (
                        <>
                        {"\n              "}
                        <a href={l?.href} style={{display: "inline-flex", padding: "13px 24px", borderRadius: "999px", border: "1px solid rgba(34,30,24,.4)", color: "#221E18", fontSize: "14px", letterSpacing: ".05em", transition: "border-color .35s,background .35s"}} className="scp6">
                          {I(l?.cta)}
                        </a>
                        {"\n            "}
                        </>
                      ) : null}
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
          {"\n  "}
          </>
        ) : null}
        {"\n\n  "}
        {vals.hasCloser ? (
          <>
          {"\n  "}
          <section id="st-closer" style={{position: "relative", isolation: "isolate", overflow: "hidden", backgroundColor: "#3B342B", backgroundImage: "url(/assets/satin.jpg)", backgroundSize: "cover", backgroundPosition: "center", backgroundBlendMode: "multiply", color: "#EDE6D8", padding: "clamp(100px,12vw,170px) clamp(20px,5vw,80px)"}}>
            {"\n    "}
            <div data-reveal="0" style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "28px", marginBottom: "clamp(48px,6vw,80px)"}}>
              {"\n      "}
              <div style={{display: "flex", flexDirection: "column", gap: "20px", maxWidth: "640px"}}>
                {"\n        "}
                <span style={{display: "inline-flex", alignSelf: "flex-start", padding: "7px 12px 6px", backgroundColor: "#2C2820", backgroundImage: "repeating-linear-gradient(90deg, rgba(237,230,216,.09) 0 1px, transparent 1px 2.5px)", outline: "1px dashed rgba(200,146,94,.7)", outlineOffset: "-3px", fontSize: "11px", letterSpacing: ".24em", textTransform: "uppercase", color: "#E3C9A6"}}>
                  {"A closer look"}
                </span>
                {"\n        "}
                <h2 style={{margin: "0", fontFamily: "'Marcellus',serif", fontWeight: "400", fontSize: "clamp(40px,5vw,76px)", lineHeight: "1.02", letterSpacing: "-.01em", color: "#F4EFE6"}}>
                  {I(vals.stCloserTitle)}
                </h2>
                {"\n      "}
              </div>
              {"\n      "}
              <p style={{margin: "0", maxWidth: "360px", fontSize: "17px", lineHeight: "1.6", fontWeight: "300", color: "#B8AE9E"}}>
                {I(vals.stCloserLede)}
              </p>
              {"\n    "}
            </div>
            {"\n    "}
            <div style={{display: "flex", flexWrap: "wrap", gap: "clamp(32px,5vw,88px)", alignItems: "stretch"}}>
              {"\n      "}
              <div style={{flex: "4 1 300px", minWidth: "0", display: "flex", flexDirection: "column"}}>
                {"\n        "}
                {L(vals.stPoints).map((p, i0) => (
                  <Fragment key={i0}>
                    {"\n          "}
                    <button onClick={p?.pick} style={css(`display:flex;flex-direction:column;gap:10px;text-align:left;background:none;border:0;border-top:1.5px dashed rgba(200,146,94,.3);padding:26px 0;cursor:pointer;color:${S(p?.color)};transition:color .4s`)}>
                      {"\n            "}
                      <span style={{fontFamily: "'Marcellus',serif", fontSize: "clamp(28px,2.8vw,40px)", lineHeight: "1.05"}}>
                        {I(p?.t)}
                      </span>
                      {"\n            "}
                      <span style={{fontSize: "16px", lineHeight: "1.6", fontWeight: "300", maxWidth: "380px"}}>
                        {I(p?.b)}
                      </span>
                      {"\n          "}
                    </button>
                    {"\n        "}
                  </Fragment>
                ))}
                {"\n      "}
              </div>
              {"\n      "}
              <div data-reveal="0" style={css(`flex:6 1 420px;min-width:0;position:relative;height:clamp(380px,46vw,640px);overflow:hidden;background-color:${S(vals.stCloserBase)};background-image:url(/assets/satin.jpg);background-size:${S(vals.stCloserScale)};background-position:${S(vals.stCloserPos)};background-blend-mode:multiply;transition:background-size 1.4s cubic-bezier(.2,.7,.2,1),background-position 1.4s cubic-bezier(.2,.7,.2,1);outline:1px dashed rgba(200,146,94,.5);outline-offset:8px`)}>
                {"\n        "}
                {vals.hasCloserSrc ? (
                  <>
                  <div role="img" aria-label="Duvet fill" style={css(`background-image:${S(vals.stCloserBg)};background-size:cover;background-position:center;position:absolute;inset:0;opacity:${S(vals.stCloserImgOp)};transform:${S(vals.stCloserImgZ)};transition:opacity .9s cubic-bezier(.2,.7,.2,1),transform 1.4s cubic-bezier(.2,.7,.2,1)`)} />
                  </>
                ) : null}
                {"\n        "}
                <div style={css(`position:absolute;inset:0;pointer-events:none;opacity:${S(vals.stCloserShadeOp)};transition:opacity .9s;background:radial-gradient(120% 90% at 30% 20%, rgba(255,255,255,.3), rgba(255,255,255,0) 55%),radial-gradient(100% 100% at 50% 50%, rgba(40,28,15,0) 55%, rgba(40,28,15,.28))`)} />
                {"\n        "}
                <div style={{position: "absolute", left: "20px", bottom: "20px", backgroundColor: "#F4EFE6", backgroundImage: "repeating-linear-gradient(90deg, rgba(126,82,50,.1) 0 1px, transparent 1px 2.5px)", outline: "1px dashed rgba(126,82,50,.5)", outlineOffset: "-4px", padding: "10px 16px", fontSize: "12px", letterSpacing: ".08em", color: "#221E18"}}>
                  {I(vals.stCloserLabel)}
                </div>
                {"\n      "}
              </div>
              {"\n    "}
            </div>
            {"\n  "}
          </section>
          {"\n  "}
          </>
        ) : null}
        {"\n\n  "}
        <section id="st-compare" style={{position: "relative", isolation: "isolate", overflow: "hidden", backgroundColor: "#EAE2D4", backgroundImage: "linear-gradient(rgba(244,239,230,0.3),rgba(244,239,230,0.3)),url(/assets/satin.jpg)", backgroundSize: "cover,cover", backgroundPosition: "center,center", backgroundBlendMode: "normal,multiply", padding: "clamp(100px,12vw,170px) clamp(20px,5vw,80px)"}}>
          {"\n    "}
          <div data-reveal="0" style={{display: "flex", flexDirection: "column", gap: "20px", marginBottom: "clamp(40px,5vw,72px)"}}>
            {"\n      "}
            <span style={{display: "inline-flex", alignSelf: "flex-start", padding: "7px 12px 6px", backgroundColor: "#F4EFE6", backgroundImage: "repeating-linear-gradient(90deg, rgba(126,82,50,.12) 0 1px, transparent 1px 2.5px)", outline: "1px dashed rgba(126,82,50,.5)", outlineOffset: "-3px", fontSize: "11px", letterSpacing: ".24em", textTransform: "uppercase", color: "#6B4528"}}>
              {"Why Daily Loom"}
            </span>
            {"\n      "}
            <h2 style={{margin: "0", fontFamily: "'Marcellus',serif", fontWeight: "400", fontSize: "clamp(40px,5vw,76px)", lineHeight: "1.02", letterSpacing: "-.01em"}}>
              {vals.notStandard ? (
                <>
                {"How we compare."}
                </>
              ) : null}
              {vals.isStandard ? (
                <>
                {"The standard we hold."}
                </>
              ) : null}
            </h2>
            {"\n    "}
          </div>
          {"\n    "}
          {vals.isStandard ? (
            <>
            {"\n    "}
            <div data-reveal="120" style={{display: "flex", flexDirection: "column", maxWidth: "1160px"}}>
              {"\n      "}
              {L(vals.stCompare).map((r, i0) => (
                <Fragment key={i0}>
                  {"\n        "}
                  <div style={{display: "flex", flexWrap: "wrap", gap: "12px 32px", alignItems: "baseline", padding: "26px 0", borderTop: "1.5px dashed rgba(126,82,50,.3)"}}>
                    {"\n          "}
                    <span style={{flex: "1 1 180px", minWidth: "0", fontSize: "12px", letterSpacing: ".2em", textTransform: "uppercase", color: "#5F574B"}}>
                      {I(r?.k)}
                    </span>
                    {"\n          "}
                    <div style={{flex: "3 1 420px", minWidth: "0", display: "flex", flexDirection: "column", gap: "8px"}}>
                      {"\n            "}
                      <span style={{fontFamily: "'Marcellus',serif", fontSize: "clamp(22px,2.2vw,32px)", lineHeight: "1.2"}}>
                        {I(r?.a)}
                      </span>
                      {"\n            "}
                      {r?.hasNote ? (
                        <>
                        <span style={{fontSize: "13px", lineHeight: "1.5", color: "#857A6A"}}>
                          {I(r?.note)}
                        </span>
                        </>
                      ) : null}
                      {"\n          "}
                    </div>
                    {"\n        "}
                  </div>
                  {"\n      "}
                </Fragment>
              ))}
              {"\n    "}
            </div>
            {"\n    "}
            </>
          ) : null}
          {"\n    "}
          {vals.notStandard ? (
            <>
            {"\n    "}
            <div data-reveal="120" style={{display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.3fr) minmax(0,1.3fr)", maxWidth: "1160px"}}>
              {"\n      "}
              <div style={{padding: "0 16px 18px 0"}} />
              {"\n      "}
              <div style={{padding: "0 16px 18px", background: "rgba(244,239,230,.55)"}}>
                <span style={{display: "inline-flex", marginTop: "16px", padding: "7px 12px 6px", backgroundColor: "#221E18", backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,.08) 0 1px, transparent 1px 2.5px)", outline: "1px dashed rgba(244,239,230,.45)", outlineOffset: "-3px", fontSize: "11px", letterSpacing: ".22em", textTransform: "uppercase", color: "#F4EFE6"}}>
                  {"Daily Loom"}
                </span>
              </div>
              {"\n      "}
              <div style={{padding: "34px 16px 18px", fontSize: "12px", letterSpacing: ".2em", textTransform: "uppercase", color: "#5F574B"}}>
                {"Typical"}
              </div>
              {"\n      "}
              {L(vals.stCompare).map((r, i0) => (
                <Fragment key={i0}>
                  {"\n        "}
                  <div style={{padding: "24px 16px 24px 0", borderTop: "1.5px dashed rgba(126,82,50,.3)", fontSize: "15px", color: "#5F574B"}}>
                    {I(r?.k)}
                  </div>
                  {"\n        "}
                  <div style={{padding: "24px 16px", borderTop: "1.5px dashed rgba(126,82,50,.3)", background: "rgba(244,239,230,.55)", fontFamily: "'Marcellus',serif", fontSize: "clamp(19px,1.7vw,24px)", lineHeight: "1.25"}}>
                    {I(r?.a)}
                    {r?.hasNote ? (
                      <>
                      <span style={{display: "block", marginTop: "8px", fontFamily: "'Jost',sans-serif", fontSize: "12px", lineHeight: "1.5", letterSpacing: ".02em", color: "#857A6A"}}>
                        {I(r?.note)}
                      </span>
                      </>
                    ) : null}
                  </div>
                  {"\n        "}
                  <div style={{padding: "24px 16px", borderTop: "1.5px dashed rgba(126,82,50,.3)", fontSize: "16px", lineHeight: "1.45", fontWeight: "300", color: "#5F574B"}}>
                    {I(r?.b)}
                  </div>
                  {"\n      "}
                </Fragment>
              ))}
              {"\n    "}
            </div>
            {"\n    "}
            </>
          ) : null}
          {"\n    "}
          {vals.hasCareText ? (
            <>
            {"\n    "}
            <div data-reveal="0" style={{display: "flex", flexWrap: "wrap", gap: "28px", marginTop: "clamp(64px,7vw,100px)", maxWidth: "1160px", alignItems: "baseline"}}>
              {"\n      "}
              <span style={{flex: "1 1 200px", minWidth: "0", fontFamily: "'Marcellus',serif", fontSize: "28px"}}>
                {"Caring for it"}
              </span>
              {"\n      "}
              <p style={{flex: "3 1 420px", minWidth: "0", margin: "0", fontSize: "17px", lineHeight: "1.65", fontWeight: "300", color: "#554D42"}}>
                {I(vals.stCare)}
              </p>
              {"\n    "}
            </div>
            {"\n    "}
            </>
          ) : null}
          {"\n    "}
          {vals.hasRitual ? (
            <>
            {"\n    "}
            <div data-reveal="0" style={{display: "flex", flexWrap: "wrap", gap: "28px", marginTop: "clamp(64px,7vw,100px)", maxWidth: "1160px", alignItems: "flex-start"}}>
              {"\n      "}
              <div style={{flex: "1 1 200px", minWidth: "0", display: "flex", flexDirection: "column", gap: "12px"}}>
                {"\n        "}
                <span style={{fontFamily: "'Marcellus',serif", fontSize: "28px", lineHeight: "1.15"}}>
                  {I(vals.ritTitle)}
                </span>
                {"\n        "}
                <span style={{fontSize: "15px", lineHeight: "1.6", fontWeight: "300", color: "#554D42", maxWidth: "260px"}}>
                  {I(vals.ritLede)}
                </span>
                {"\n      "}
              </div>
              {"\n      "}
              <div style={{flex: "3 1 420px", minWidth: "0", display: "flex", flexDirection: "column", gap: "22px"}}>
                {"\n        "}
                {vals.hasRitKey ? (
                  <>
                  {"\n          "}
                  <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: "clamp(20px,2.6vw,36px)"}}>
                    {"\n            "}
                    {L(vals.ritKey).map((x, i0) => (
                      <Fragment key={i0}>
                        {"\n              "}
                        <div style={{display: "flex", flexDirection: "column", gap: "6px", paddingTop: "16px", borderTop: "1.5px dashed rgba(126,82,50,.3)"}}>
                          {"\n                "}
                          <span style={{fontFamily: "'Marcellus',serif", fontSize: "21px", lineHeight: "1.2", color: "#221E18"}}>
                            {I(x?.t)}
                          </span>
                          {"\n                "}
                          <span style={{fontSize: "14px", lineHeight: "1.55", fontWeight: "300", color: "#554D42"}}>
                            {I(x?.b)}
                          </span>
                          {"\n              "}
                        </div>
                        {"\n            "}
                      </Fragment>
                    ))}
                    {"\n          "}
                  </div>
                  {"\n          "}
                  <button onClick={vals.ritToggle} style={{alignSelf: "flex-start", background: "none", border: "0", padding: "4px 0", cursor: "pointer", fontSize: "15px", color: "#7E5232", backgroundImage: "repeating-linear-gradient(90deg, #7E5232 0 5px, transparent 5px 8px)", backgroundRepeat: "no-repeat", backgroundPosition: "0 100%", backgroundSize: "0% 1.5px", transition: "background-size .6s cubic-bezier(.2,.7,.2,1)"}} className="scp5">
                    {I(vals.ritToggleLabel)}
                  </button>
                  {"\n        "}
                  </>
                ) : null}
                {"\n        "}
                <div style={css(`display:grid;grid-template-rows:${S(vals.ritRows)};transition:grid-template-rows .6s cubic-bezier(.2,.7,.2,1)`)}>
                  <div style={{overflow: "hidden", display: "flex", flexDirection: "column", gap: "24px"}}>
                    {"\n        "}
                    <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "clamp(24px,3vw,40px)", paddingTop: "8px"}}>
                      {"\n          "}
                      {L(vals.ritGroups).map((g, i0) => (
                        <Fragment key={i0}>
                          {"\n            "}
                          <div style={{display: "flex", flexDirection: "column"}}>
                            {"\n              "}
                            <span style={{fontSize: "11px", letterSpacing: ".22em", textTransform: "uppercase", color: "#6B4528", paddingBottom: "12px"}}>
                              {I(g?.t)}
                            </span>
                            {"\n              "}
                            {L(g?.items).map((x, i1) => (
                              <Fragment key={i1}>
                                {"\n                "}
                                <div style={{display: "flex", flexDirection: "column", gap: "4px", padding: "14px 0", borderTop: "1.5px dashed rgba(126,82,50,.28)"}}>
                                  {"\n                  "}
                                  <span style={{fontSize: "16px", color: "#221E18"}}>
                                    {I(x?.t)}
                                  </span>
                                  {"\n                  "}
                                  <span style={{fontSize: "14px", lineHeight: "1.55", fontWeight: "300", color: "#554D42"}}>
                                    {I(x?.b)}
                                  </span>
                                  {"\n                "}
                                </div>
                                {"\n              "}
                              </Fragment>
                            ))}
                            {"\n            "}
                          </div>
                          {"\n          "}
                        </Fragment>
                      ))}
                      {"\n        "}
                    </div>
                    {"\n        "}
                    <span style={{fontSize: "14px", lineHeight: "1.6", color: "#554D42"}}>
                      {I(vals.ritNote)}
                    </span>
                    {"\n        "}
                  </div>
                </div>
                {"\n      "}
              </div>
              {"\n    "}
            </div>
            {"\n    "}
            </>
          ) : null}
          {"\n  "}
        </section>
        {"\n\n  "}
        <section id="st-buy" data-screen-label="Story · Buy" style={{position: "relative", isolation: "isolate", overflow: "hidden", backgroundColor: "#F4EFE6", backgroundImage: "linear-gradient(rgba(244,239,230,0.45),rgba(244,239,230,0.45)),url(/assets/satin.jpg)", backgroundSize: "cover,cover", backgroundPosition: "center,center", backgroundBlendMode: "normal,multiply", padding: "clamp(100px,12vw,170px) clamp(20px,5vw,80px)"}}>
          {"\n    "}
          <div data-reveal="0" style={{display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "18px", marginBottom: "clamp(56px,6vw,96px)"}}>
            {"\n      "}
            <img src="/assets/logo-mark.png" alt="" style={{width: "60px", height: "auto"}} />
            {"\n      "}
            <h2 style={{margin: "0", fontFamily: "'Marcellus',serif", fontWeight: "400", fontSize: "clamp(44px,5.6vw,88px)", lineHeight: "1", letterSpacing: "-.01em"}}>
              {"Bring it home."}
            </h2>
            {"\n      "}
            <p style={{margin: "0", maxWidth: "460px", fontSize: "17px", lineHeight: "1.6", fontWeight: "300", color: "#5F574B"}}>
              {I(vals.stBuyLede)}
            </p>
            {"\n    "}
          </div>
          {"\n    "}
          <div style={{display: "flex", flexWrap: "wrap", gap: "clamp(24px,2.8vw,40px)", justifyContent: "center"}}>
            {"\n      "}
            {L(vals.stItems).map((it, i0) => (
              <Fragment key={i0}>
                {"\n        "}
                <div data-reveal={it?.delay} style={{flex: "1 1 280px", minWidth: "0", maxWidth: "520px", display: "flex", flexDirection: "column", gap: "20px"}}>
                  {"\n          "}
                  {it?.notSoon ? (
                    <>
                    {"\n            "}
                    <div onClick={it?.buy} style={{height: "clamp(320px,32vw,480px)", position: "relative", overflow: "hidden", cursor: "pointer", background: "#E5DCCB", outline: "1px dashed rgba(126,82,50,.4)", outlineOffset: "8px"}}>
                      {"\n              "}
                      <div style={{position: "absolute", inset: "0", transition: "transform 1.6s cubic-bezier(.2,.7,.2,1)"}} className="scp7">
                        <image-slot id={it?.slotId} src={it?.src} shape="rect" placeholder={it?.ph} />
                      </div>
                      {"\n              "}
                      {it?.hasBadge ? (
                        <>
                        <span style={{position: "absolute", top: "16px", left: "16px", zIndex: "2", display: "inline-flex", padding: "5px 9px 4px", backgroundColor: "#221E18", backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,.08) 0 1px, transparent 1px 2.5px)", outline: "1px dashed rgba(244,239,230,.45)", outlineOffset: "-3px", fontSize: "10px", letterSpacing: ".22em", textTransform: "uppercase", color: "#F4EFE6"}}>
                          {I(it?.badge)}
                        </span>
                        </>
                      ) : null}
                      {"\n            "}
                    </div>
                    {"\n          "}
                    </>
                  ) : null}
                  {"\n          "}
                  {it?.soon ? (
                    <>
                    {"\n            "}
                    <div style={{height: "clamp(320px,32vw,480px)", position: "relative", isolation: "isolate", overflow: "hidden", backgroundColor: "#EAE2D4", backgroundImage: "linear-gradient(rgba(244,239,230,0.3),rgba(244,239,230,0.3)),url(/assets/satin.jpg)", backgroundSize: "cover,cover", backgroundPosition: "center,center", backgroundBlendMode: "normal,multiply", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "14px", outline: "1px dashed rgba(126,82,50,.4)", outlineOffset: "8px"}}>
                      {"\n              "}
                      <img src="/assets/logo-mark.png" alt="" style={{width: "56px", height: "auto", opacity: ".85"}} />
                      {"\n              "}
                      <span style={{fontSize: "13px", letterSpacing: ".18em", textTransform: "uppercase", color: "#5F574B"}}>
                        {"Coming soon"}
                      </span>
                      {"\n            "}
                    </div>
                    {"\n          "}
                    </>
                  ) : null}
                  {"\n          "}
                  <div style={{display: "flex", flexDirection: "column", gap: "6px"}}>
                    {"\n            \n            "}
                    <span style={{fontFamily: "'Marcellus',serif", fontSize: "clamp(24px,2.2vw,32px)"}}>
                      {I(it?.title)}
                    </span>
                    {"\n            "}
                    <span style={{fontSize: "15px", color: "#5F574B"}}>
                      {I(it?.label)}
                    </span>
                    {"\n            "}
                    {it?.soon ? (
                      <>
                      <span style={{marginTop: "6px"}}>
                        <button onClick={it?.nf?.go} style={{display: "inline-flex", alignItems: "center", gap: "6px", background: "none", border: "0", padding: "2px 0", cursor: "pointer", fontSize: "14px", letterSpacing: ".02em", color: "#7E5232", backgroundImage: "repeating-linear-gradient(90deg, #7E5232 0 5px, transparent 5px 8px)", backgroundRepeat: "no-repeat", backgroundPosition: "0 100%", backgroundSize: "0% 1.5px", transition: "background-size .6s cubic-bezier(.2,.7,.2,1)"}} className="scp5">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{flex: "none"}}>
                            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                          </svg>
                          {I(it?.nf?.label)}
                        </button>
                      </span>
                      </>
                    ) : null}
                    {"\n            "}
                    {it?.hasSizes ? (
                      <>
                      <span style={{fontSize: "14px", lineHeight: "1.6", color: "#221E18"}}>
                        {I(it?.sizes)}
                      </span>
                      </>
                    ) : null}
                    {"\n            "}
                    {it?.hasCols ? (
                      <>
                      <div style={{display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px", marginTop: "8px"}}>
                        {L(it?.cols).map((c, i1) => (
                          <Fragment key={i1}>
                            <button onClick={c?.pick} aria-label={c?.label} title={c?.label} style={css(`width:24px;height:24px;padding:0;border-radius:50%;border:0;cursor:pointer;background-color:${S(c?.hex)};background-image:repeating-linear-gradient(45deg, rgba(255,255,255,.18) 0 1px, transparent 1px 3px),repeating-linear-gradient(-45deg, rgba(0,0,0,.08) 0 1px, transparent 1px 3px);box-shadow:${S(c?.ring)};transition:box-shadow .35s,transform .35s`)} className="scp9" />
                          </Fragment>
                        ))}
                        <span style={{fontSize: "14px", color: "#5F574B"}}>
                          {I(it?.colName)}
                        </span>
                      </div>
                      </>
                    ) : null}
                    {"\n          "}
                  </div>
                  {"\n          "}
                  {it?.notSoon ? (
                    <>
                    {"\n            "}
                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", paddingTop: "18px", borderTop: "1.5px dashed rgba(126,82,50,.3)"}}>
                      {"\n              "}
                      <span style={{fontSize: "16px"}}>
                        {I(it?.price)}
                        {it?.deal?.has ? (
                          <>
                          <span style={{marginLeft: "10px", color: "#857A6A", textDecoration: "line-through"}}>
                            {I(it?.deal?.cmp)}
                          </span>
                          <span style={{marginLeft: "10px", fontSize: "13px", letterSpacing: ".04em", color: "#7E5232"}}>
                            {I(it?.deal?.off)}
                          </span>
                          </>
                        ) : null}
                      </span>
                      {"\n              "}
                      <button onClick={it?.buy} style={{backgroundColor: "#221E18", backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,.07) 0 1px, transparent 1px 3px),linear-gradient(180deg, rgba(255,255,255,.1), rgba(0,0,0,.18))", color: "#F4EFE6", border: "0", borderRadius: "999px", outline: "1px dashed rgba(244,239,230,.42)", outlineOffset: "-5px", padding: "14px 26px", fontSize: "14px", letterSpacing: ".05em", cursor: "pointer", transition: "background-color .4s,outline-offset .4s,transform .3s"}} className="scp2 scp3">
                        {"Buy now"}
                      </button>
                      {"\n            "}
                    </div>
                    {"\n          "}
                    </>
                  ) : null}
                  {"\n        "}
                </div>
                {"\n      "}
              </Fragment>
            ))}
            {"\n    "}
          </div>
          {"\n    "}
          {vals.hasPair ? (
            <>
            {"\n      "}
            <div data-reveal="0" onClick={vals.pairOpen} style={{maxWidth: "860px", margin: "clamp(72px,8vw,120px) auto 0", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "clamp(20px,3vw,40px)", cursor: "pointer"}}>
              {"\n        "}
              <div style={{flex: "0 0 clamp(160px,22vw,240px)", aspectRatio: "4 / 3", position: "relative", overflow: "hidden", background: "#E5DCCB"}}>
                {"\n          "}
                <div style={{position: "absolute", inset: "0", transition: "transform 1.6s cubic-bezier(.2,.7,.2,1)"}} className="scpb">
                  <image-slot id={vals.pairSlot} src={vals.pairSrc} shape="rect" placeholder={vals.pairName} />
                </div>
                {"\n        "}
              </div>
              {"\n        "}
              <div style={{flex: "1 1 260px", minWidth: "0", display: "flex", flexDirection: "column", gap: "8px"}}>
                {"\n          "}
                <span style={{fontSize: "11px", letterSpacing: ".22em", textTransform: "uppercase", color: "#6B4528"}}>
                  {"Pairs well with"}
                </span>
                {"\n          "}
                <span style={{fontFamily: "'Marcellus',serif", fontSize: "clamp(26px,2.4vw,34px)", lineHeight: "1.1"}}>
                  {I(vals.pairName)}
                </span>
                {"\n          "}
                <span style={{fontSize: "15px", lineHeight: "1.55", fontWeight: "300", color: "#5F574B"}}>
                  {I(vals.pairShort)}
                </span>
                {"\n        "}
              </div>
              {"\n        "}
              <div style={{flex: "none", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px"}}>
                {"\n          "}
                <span style={{fontSize: "15px"}}>
                  {I(vals.pairPrice)}
                  {vals.pairDeal?.has ? (
                    <>
                    <span style={{marginLeft: "10px", color: "#857A6A", textDecoration: "line-through"}}>
                      {I(vals.pairDeal?.cmp)}
                    </span>
                    <span style={{marginLeft: "10px", fontSize: "13px", letterSpacing: ".04em", color: "#7E5232"}}>
                      {I(vals.pairDeal?.off)}
                    </span>
                    </>
                  ) : null}
                </span>
                {"\n          "}
                <span style={{fontSize: "15px", color: "#7E5232", backgroundImage: "repeating-linear-gradient(90deg, #7E5232 0 5px, transparent 5px 8px)", backgroundRepeat: "no-repeat", backgroundPosition: "0 100%", backgroundSize: "100% 1.5px", paddingBottom: "3px"}}>
                  {"View →"}
                </span>
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n    "}
            </>
          ) : null}
          {"\n    "}
          {vals.devNotes ? (
            <>
            <div style={{marginTop: "32px", textAlign: "center"}}>
              <span style={{fontSize: "11px", letterSpacing: ".06em", color: "#7E5232", background: "#FBF6EC", border: "1px dashed #C8925E", borderRadius: "4px", padding: "6px 8px"}}>
                {"Route /"}{I(vals.stHandle)}{" · story copy from metaobject \"category_story\" · products from collection(handle:\""}{I(vals.stHandle)}{"\")"}
              </span>
            </div>
            </>
          ) : null}
          {"\n  "}
        </section>
      </main>
    </>
  );
}
