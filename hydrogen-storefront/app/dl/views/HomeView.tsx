// @ts-nocheck
/* eslint-disable */
// Generated from "Daily Loom v4.dc.html" by the dc → React converter.
// Mirrors the element tree the dc-runtime renders for this part of the page.
import {Fragment} from 'react';
import {css, I, L, S, VAL} from '../runtime';

export function HomeView({vals}: {vals: any}) {
  return (
    <>
      <main>
        {"\n  "}
        <section data-screen-label="Home · Hero" style={{position: "relative", height: "100vh", minHeight: "640px", overflow: "hidden"}}>
          {"\n    "}
          <div style={css(`position:absolute;top:0;left:0;right:0;bottom:${S(vals.heroBottom)};-webkit-mask-image:${S(vals.mHero)};mask-image:${S(vals.mHero)};mix-blend-mode:${S(vals.pBlend)}`)}>
            <image-slot id="home-hero-mobile" shape="rect" src="https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-hero-bed-mobile.jpg?v=1792532664" placeholder="Hero · phones · 1080 × 1920 (9:16)" style={css(`display:${S(vals.heroMobDisp)}`)} />
            <image-slot id="home-hero" shape="rect" src="https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-hero-bed.jpg?v=1792532665" style={css(`display:${S(vals.heroDeskDisp)}`)} placeholder="Hero · 3200 × 1800 (16:9) · made bed, morning light, ivory walls" />
          </div>
          {"\n    "}
          <div style={{position: "absolute", inset: "0", pointerEvents: "none", background: "linear-gradient(to top, rgba(244,239,230,.7) 0%, rgba(244,239,230,.35) 24%, rgba(244,239,230,0) 46%)"}} />
          {"\n    "}
          <div style={{position: "absolute", left: "clamp(20px,5vw,80px)", right: "clamp(20px,5vw,80px)", bottom: "clamp(40px,9vh,96px)", display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "32px", pointerEvents: "none"}}>
            {"\n      "}
            <div data-reveal="80" style={{maxWidth: "820px", display: "flex", flexDirection: "column", gap: "22px"}}>
              {"\n        "}
              <span style={{display: "inline-flex", alignSelf: "flex-start", padding: "7px 12px 6px", backgroundColor: "#E9DCC3", backgroundImage: "repeating-linear-gradient(90deg, rgba(126,82,50,.14) 0 1px, transparent 1px 2.5px)", outline: "1px dashed rgba(126,82,50,.5)", outlineOffset: "-3px", fontSize: "11px", letterSpacing: ".24em", textTransform: "uppercase", color: "#6B4528"}}>
                {"Handloom · Bed & Bath"}
              </span>
              {"\n        "}
              <h1 style={{margin: "0", fontFamily: "'Marcellus',serif", fontWeight: "400", fontSize: "clamp(52px,7.4vw,116px)", lineHeight: ".98", letterSpacing: "-.01em", color: "#221E18", textWrap: "balance"}}>
                {"Woven for the hours you rest."}
              </h1>
              {"\n      "}
            </div>
            {"\n      "}
            <div data-reveal="320" style={{display: "flex", flexDirection: "column", gap: "22px", maxWidth: "340px", pointerEvents: "auto"}}>
              {"\n        "}
              <p style={{margin: "0", fontSize: "17px", lineHeight: "1.6", fontWeight: "300", color: "#554D42"}}>
                {"Duvets, cotton linens, natural latex pillows and towels, made for the Indian home."}
              </p>
              {"\n        "}
              <div style={{display: "flex", flexWrap: "wrap", gap: "12px"}}>
                {"\n          "}
                <button onClick={vals.storyCovers} style={{backgroundColor: "#221E18", backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,.07) 0 1px, transparent 1px 3px),linear-gradient(180deg, rgba(255,255,255,.1), rgba(0,0,0,.18))", color: "#F4EFE6", border: "0", borderRadius: "999px", outline: "1px dashed rgba(244,239,230,.42)", outlineOffset: "-5px", padding: "15px 28px", fontSize: "14px", letterSpacing: ".05em", cursor: "pointer", transition: "background-color .4s,outline-offset .4s,transform .3s"}} className="scp2 scp3">
                  {"Explore the bedroom"}
                </button>
                {"\n          "}
                <button onClick={vals.storyTowels} style={{background: "transparent", color: "#221E18", border: "1px solid rgba(34,30,24,.4)", borderRadius: "999px", padding: "14px 24px", fontSize: "14px", letterSpacing: ".05em", cursor: "pointer", transition: "background .35s,border-color .35s"}} className="scp4">
                  {"Towels"}
                </button>
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n    "}
          </div>
          {"\n    "}
          {vals.devNotes ? (
            <>
            <span style={{position: "absolute", top: "76px", left: "clamp(20px,5vw,80px)", fontSize: "11px", letterSpacing: ".06em", color: "#7E5232", background: "#FBF6EC", border: "1px dashed #C8925E", borderRadius: "4px", padding: "6px 8px"}}>
              {"Hydrogen route \"/\" · hero media from Shopify metaobject \"home_hero\""}
            </span>
            </>
          ) : null}
          {"\n  "}
        </section>
        {"\n\n  "}
        <section style={{position: "relative", isolation: "isolate", overflow: "hidden", padding: "clamp(100px,14vw,180px) clamp(20px,5vw,80px) clamp(80px,10vw,140px)", display: "flex", flexWrap: "wrap", gap: "40px"}}>
          {"\n    "}
          <div style={{flex: "1 1 200px", minWidth: "0", paddingTop: "14px"}}>
            <span style={{display: "inline-flex", padding: "7px 12px 6px", backgroundColor: "#E9DCC3", backgroundImage: "repeating-linear-gradient(90deg, rgba(126,82,50,.14) 0 1px, transparent 1px 2.5px)", outline: "1px dashed rgba(126,82,50,.5)", outlineOffset: "-3px", fontSize: "11px", letterSpacing: ".24em", textTransform: "uppercase", color: "#6B4528"}}>
              {"Daily Loom"}
            </span>
          </div>
          {"\n    "}
          <p data-reveal="0" style={{flex: "3 1 520px", minWidth: "0", margin: "0", fontFamily: "'Marcellus',serif", fontSize: "clamp(28px,3.3vw,48px)", lineHeight: "1.24", color: "#221E18", textWrap: "pretty"}}>
            {"Five essentials for the bed and bath, woven from 100% cotton, natural latex and bamboo. "}
            <span style={{color: "#857A6A"}}>
              {"Made to be used every day, and to feel better each time."}
            </span>
          </p>
          {"\n  "}
        </section>
        {"\n\n  "}
        <section data-screen-label="Home · Duvets" style={{padding: "0 clamp(20px,5vw,80px) clamp(100px,12vw,180px)", display: "flex", flexWrap: "wrap", gap: "clamp(32px,5vw,88px)", alignItems: "flex-end"}}>
          {"\n    "}
          <div data-reveal="0" style={css(`flex:7 1 460px;min-width:0;height:clamp(420px,60vw,800px);position:relative;-webkit-mask-image:${S(vals.mEdge)};mask-image:${S(vals.mEdge)};-webkit-mask-composite:source-in;mask-composite:intersect;mix-blend-mode:${S(vals.pBlend)};outline:${S(vals.pFrame)};outline-offset:8px`)}>
            {"\n      "}
            <image-slot id="home-duvet" shape="rect" src="https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-duvet-home.png?v=1792532732" placeholder="Duvet · 2400 × 2000 (6:5) · folded duvet at foot of bed" />
            {"\n    "}
          </div>
          {"\n    "}
          <div data-reveal="160" style={{flex: "4 1 320px", minWidth: "0", display: "flex", flexDirection: "column", gap: "22px", paddingBottom: "20px"}}>
            {"\n      "}
            <span style={{display: "inline-flex", alignSelf: "flex-start", padding: "7px 12px 6px", backgroundColor: "#E9DCC3", backgroundImage: "repeating-linear-gradient(90deg, rgba(126,82,50,.14) 0 1px, transparent 1px 2.5px)", outline: "1px dashed rgba(126,82,50,.5)", outlineOffset: "-3px", fontSize: "11px", letterSpacing: ".24em", textTransform: "uppercase", color: "#6B4528"}}>
              {"Duvets"}
            </span>
            {"\n      "}
            <h2 style={{margin: "0", fontFamily: "'Marcellus',serif", fontWeight: "400", fontSize: "clamp(40px,4.6vw,68px)", lineHeight: "1.02", letterSpacing: "-.01em"}}>
              {"The Winter Duvet."}
            </h2>
            {"\n      "}
            <p style={{margin: "0", fontSize: "18px", lineHeight: "1.6", fontWeight: "300", color: "#5F574B", maxWidth: "420px"}}>
              {"Warmth that breathes. A peach skin fabric shell, box-stitched so the fill stays even through the coldest months."}
            </p>
            {"\n      "}
            <div style={{fontSize: "15px"}}>
              {"From "}{I(vals.duvetFrom)}
              {vals.duvetDeal?.has ? (
                <>
                <span style={{marginLeft: "10px", color: "#857A6A", textDecoration: "line-through"}}>
                  {I(vals.duvetDeal?.cmp)}
                </span>
                <span style={{marginLeft: "10px", fontSize: "13px", letterSpacing: ".04em", color: "#7E5232"}}>
                  {I(vals.duvetDeal?.off)}
                </span>
                </>
              ) : null}
            </div>
            {"\n      "}
            <div style={{display: "flex", flexWrap: "wrap", alignItems: "center", gap: "24px"}}>
              {"\n        "}
              <button onClick={vals.storyDuvets} style={{backgroundColor: "#221E18", backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,.07) 0 1px, transparent 1px 3px),linear-gradient(180deg, rgba(255,255,255,.1), rgba(0,0,0,.18))", color: "#F4EFE6", border: "0", borderRadius: "999px", outline: "1px dashed rgba(244,239,230,.42)", outlineOffset: "-5px", padding: "15px 28px", fontSize: "14px", letterSpacing: ".05em", cursor: "pointer", transition: "background-color .4s,outline-offset .4s,transform .3s"}} className="scp2 scp3">
                {"Discover duvets"}
              </button>
              {"\n        "}
              <button onClick={vals.openDuvet} style={{background: "none", border: "0", padding: "4px 0", cursor: "pointer", fontSize: "15px", color: "#7E5232", backgroundImage: "repeating-linear-gradient(90deg, #7E5232 0 5px, transparent 5px 8px)", backgroundRepeat: "no-repeat", backgroundPosition: "0 100%", backgroundSize: "0% 1.5px", transition: "background-size .6s cubic-bezier(.2,.7,.2,1)"}} className="scp5">
                {"Buy →"}
              </button>
              {"\n      "}
            </div>
            {"\n      "}
            <div style={{display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px 12px", marginTop: "18px", paddingTop: "22px", borderTop: "1.5px dashed rgba(126,82,50,.28)", fontSize: "14px", color: "#5F574B"}}>
              {"\n        "}
              <span style={{width: "7px", height: "7px", borderRadius: "50%", background: "#A3A585", flex: "none"}} />
              {"Summer Comforter · coming for the warmer months\n        "}
              <span style={{flex: "1"}} />
              <button onClick={vals.nfSummer?.go} style={{display: "inline-flex", alignItems: "center", gap: "6px", background: "none", border: "0", padding: "2px 0", cursor: "pointer", fontSize: "14px", letterSpacing: ".02em", color: "#7E5232", backgroundImage: "repeating-linear-gradient(90deg, #7E5232 0 5px, transparent 5px 8px)", backgroundRepeat: "no-repeat", backgroundPosition: "0 100%", backgroundSize: "0% 1.5px", transition: "background-size .6s cubic-bezier(.2,.7,.2,1)"}} className="scp5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{flex: "none"}}>
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
                {I(vals.nfSummer?.label)}
              </button>
              {"\n      "}
            </div>
            {"\n    "}
          </div>
          {"\n  "}
        </section>
        {"\n\n  "}
        <section data-screen-label="Home · Thread count" style={{position: "relative", isolation: "isolate", overflow: "hidden", backgroundColor: "#EAE2D4", backgroundImage: "linear-gradient(rgba(244,239,230,0.3),rgba(244,239,230,0.3)),url(/assets/satin.jpg)", backgroundSize: "cover,cover", backgroundPosition: "center,center", backgroundBlendMode: "normal,multiply", padding: "clamp(100px,12vw,170px) clamp(20px,5vw,80px)"}}>
          {"\n    "}
          <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "32px", marginBottom: "clamp(48px,6vw,88px)"}}>
            {"\n      "}
            <div data-reveal="0" style={{maxWidth: "640px", display: "flex", flexDirection: "column", gap: "20px"}}>
              {"\n        "}
              <span style={{display: "inline-flex", alignSelf: "flex-start", padding: "7px 12px 6px", backgroundColor: "#F4EFE6", backgroundImage: "repeating-linear-gradient(90deg, rgba(126,82,50,.12) 0 1px, transparent 1px 2.5px)", outline: "1px dashed rgba(126,82,50,.5)", outlineOffset: "-3px", fontSize: "11px", letterSpacing: ".24em", textTransform: "uppercase", color: "#6B4528"}}>
                {"Duvet Covers & Bedsheets"}
              </span>
              {"\n        "}
              <h2 style={{margin: "0", fontFamily: "'Marcellus',serif", fontWeight: "400", fontSize: "clamp(40px,5vw,76px)", lineHeight: "1.02", letterSpacing: "-.01em"}}>
                {"Choose your thread count."}
              </h2>
              {"\n      "}
            </div>
            {"\n      "}
            <p data-reveal="120" style={{margin: "0", maxWidth: "380px", fontSize: "18px", lineHeight: "1.6", fontWeight: "300", color: "#554D42"}}>
              {"Every cover and sheet is 100% cotton, starting at 300 threads per square inch. More threads, a denser and smoother cloth."}
            </p>
            {"\n    "}
          </div>
          {"\n    "}
          <div style={{display: "flex", flexWrap: "wrap", gap: "clamp(32px,5vw,88px)", alignItems: "stretch"}}>
            {"\n      "}
            <div data-reveal="0" style={{flex: "6 1 420px", minWidth: "0", position: "relative", height: "clamp(360px,44vw,640px)", overflow: "hidden", backgroundColor: "#6E665C", boxShadow: "0 30px 60px -30px rgba(40,30,20,.45)"}}>
              {"\n        "}
              {L(vals.tcImgs).map((im, i0) => (
                <Fragment key={i0}>
                  {"\n          "}
                  <div style={css(`position:absolute;inset:0;opacity:${S(im?.op)};transform:${S(im?.tf)};transition:opacity 1.1s cubic-bezier(.2,.7,.2,1),transform 1.6s cubic-bezier(.2,.7,.2,1)`)}>
                    {"\n            "}
                    <image-slot id={im?.id} src={im?.src} shape="rect" placeholder={im?.ph} />
                    {"\n          "}
                  </div>
                  {"\n        "}
                </Fragment>
              ))}
              {"\n        "}
              <div style={{position: "absolute", left: "20px", bottom: "20px", display: "flex", gap: "10px", alignItems: "center", backgroundColor: "#F4EFE6", padding: "10px 16px", fontSize: "12px", letterSpacing: ".08em", color: "#221E18"}}>
                {"\n          "}
                <span style={{fontFamily: "'Marcellus',serif", fontSize: "20px", letterSpacing: "0"}}>
                  {I(vals.tcNow)}
                </span>
                {" TC · dark taupe percale\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n      "}
            <div style={{flex: "4 1 300px", minWidth: "0", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "40px"}}>
              {"\n        "}
              <div style={{display: "flex", flexDirection: "column"}}>
                {"\n          "}
                {L(vals.tcs).map((t, i0) => (
                  <Fragment key={i0}>
                    {"\n            "}
                    <button onClick={t?.pick} style={css(`display:flex;align-items:baseline;gap:22px;text-align:left;background:none;border:0;border-top:1.5px dashed rgba(126,82,50,.3);padding:26px 0;cursor:pointer;color:${S(t?.color)};transition:color .4s`)}>
                      {"\n              "}
                      <span style={{fontFamily: "'Marcellus',serif", fontSize: "clamp(48px,5vw,72px)", lineHeight: "1", minWidth: "2.4em"}}>
                        {I(t?.n)}
                        <span style={{fontSize: ".32em", letterSpacing: ".12em", marginLeft: "6px"}}>
                          {"TC"}
                        </span>
                        <span style={{fontFamily: "'Jost',sans-serif", fontSize: ".22em", verticalAlign: "super", marginLeft: "2px", color: "#A39886"}}>
                          {I(t?.star)}
                        </span>
                      </span>
                      {"\n              "}
                      <span style={{fontSize: "16px", lineHeight: "1.5", fontWeight: "300", maxWidth: "260px"}}>
                        {I(t?.d)}
                      </span>
                      {"\n            "}
                    </button>
                    {"\n          "}
                  </Fragment>
                ))}
                {"\n          "}
                <span style={{display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "6px 16px", paddingTop: "10px", borderTop: "1.5px dashed rgba(126,82,50,.3)", fontSize: "10px", letterSpacing: ".06em", color: "#A39886"}}>
                  <span>
                    {"* 400 TC, 600 TC and 800 TC coming soon."}
                  </span>
                  <button onClick={vals.nfTc?.go} style={{display: "inline-flex", alignItems: "center", gap: "6px", background: "none", border: "0", padding: "2px 0", cursor: "pointer", fontSize: "12px", letterSpacing: ".02em", color: "#7E5232", backgroundImage: "repeating-linear-gradient(90deg, #7E5232 0 5px, transparent 5px 8px)", backgroundRepeat: "no-repeat", backgroundPosition: "0 100%", backgroundSize: "0% 1.5px", transition: "background-size .6s cubic-bezier(.2,.7,.2,1)"}} className="scp5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{flex: "none"}}>
                      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                    </svg>
                    {I(vals.nfTc?.label)}
                  </button>
                </span>
                {"\n        "}
              </div>
              {"\n        "}
              <div style={{display: "flex", flexWrap: "wrap", gap: "12px"}}>
                {"\n          "}
                <button onClick={vals.storyCovers} style={{backgroundColor: "#221E18", backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,.07) 0 1px, transparent 1px 3px),linear-gradient(180deg, rgba(255,255,255,.1), rgba(0,0,0,.18))", color: "#F4EFE6", border: "0", borderRadius: "999px", outline: "1px dashed rgba(244,239,230,.42)", outlineOffset: "-5px", padding: "15px 26px", fontSize: "14px", letterSpacing: ".05em", cursor: "pointer", transition: "background-color .4s,outline-offset .4s,transform .3s"}} className="scp2 scp3">
                  {"Discover duvet covers"}
                </button>
                {"\n          "}
                <button onClick={vals.storySheets} style={{background: "transparent", color: "#221E18", border: "1px solid rgba(34,30,24,.4)", borderRadius: "999px", padding: "14px 22px", fontSize: "14px", letterSpacing: ".05em", cursor: "pointer", transition: "border-color .35s,background .35s"}} className="scp6">
                  {"Discover bedsheets"}
                </button>
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n    "}
          </div>
          {"\n  "}
        </section>
        {"\n\n  "}
        <section data-screen-label="Home · Covers & Sheets" style={{padding: "clamp(100px,12vw,180px) clamp(20px,5vw,80px)", display: "flex", flexWrap: "wrap", gap: "clamp(24px,2.8vw,40px)", alignItems: "flex-start"}}>
          {"\n    "}
          <div data-reveal="0" style={{flex: "5 1 340px", minWidth: "0", display: "flex", flexDirection: "column", gap: "30px"}}>
            {"\n      "}
            <div onClick={vals.storyCovers} style={css(`height:clamp(480px,54vw,760px);position:relative;overflow:hidden;cursor:pointer;-webkit-mask-image:${S(vals.mEdgeSoft)};mask-image:${S(vals.mEdgeSoft)};-webkit-mask-composite:source-in;mask-composite:intersect;mix-blend-mode:${S(vals.pBlend)};outline:${S(vals.pFrame)};outline-offset:8px`)}>
              {"\n        "}
              <div style={{position: "absolute", inset: "0", transition: "transform 1.6s cubic-bezier(.2,.7,.2,1)"}} className="scp7">
                <image-slot id="home-covers" shape="rect" src="https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-covers-why-1.png?v=1792532717" placeholder="Duvet cover · 1800 × 2400 (3:4) · turned-down corner" />
              </div>
              {"\n      "}
            </div>
            {"\n      "}
            <div style={{display: "flex", flexDirection: "column", gap: "12px", maxWidth: "440px"}}>
              {"\n        "}
              <span style={{display: "inline-flex", alignSelf: "flex-start", padding: "7px 12px 6px", backgroundColor: "#E9DCC3", backgroundImage: "repeating-linear-gradient(90deg, rgba(126,82,50,.14) 0 1px, transparent 1px 2.5px)", outline: "1px dashed rgba(126,82,50,.5)", outlineOffset: "-3px", fontSize: "11px", letterSpacing: ".24em", textTransform: "uppercase", color: "#6B4528"}}>
                {"Duvet Covers"}
              </span>
              {"\n        "}
              <h3 style={{margin: "0", fontFamily: "'Marcellus',serif", fontWeight: "400", fontSize: "clamp(28px,2.6vw,38px)", lineHeight: "1.1"}}>
                {"Covers that soften with every wash."}
              </h3>
              {"\n        "}
              <div style={{fontSize: "15px", color: "#5F574B"}}>
                {"From "}{I(vals.coverFrom)}
                {vals.coverDeal?.has ? (
                  <>
                  <span style={{marginLeft: "10px", color: "#857A6A", textDecoration: "line-through"}}>
                    {I(vals.coverDeal?.cmp)}
                  </span>
                  <span style={{marginLeft: "10px", fontSize: "13px", letterSpacing: ".04em", color: "#7E5232"}}>
                    {I(vals.coverDeal?.off)}
                  </span>
                  </>
                ) : null}
                {" · 300 TC"}
              </div>
              {"\n        "}
              <button onClick={vals.storyCovers} style={{alignSelf: "flex-start", background: "none", border: "0", padding: "4px 0", cursor: "pointer", fontSize: "15px", color: "#7E5232", backgroundImage: "repeating-linear-gradient(90deg, #7E5232 0 5px, transparent 5px 8px)", backgroundRepeat: "no-repeat", backgroundPosition: "0 100%", backgroundSize: "0% 1.5px", transition: "background-size .6s cubic-bezier(.2,.7,.2,1)"}} className="scp5">
                {"Discover →"}
              </button>
              {"\n      "}
            </div>
            {"\n    "}
          </div>
          {"\n    "}
          <div data-reveal="180" style={{flex: "7 1 440px", minWidth: "0", display: "flex", flexDirection: "column", gap: "30px", marginTop: "clamp(0px,9vw,160px)"}}>
            {"\n      "}
            <div onClick={vals.storySheets} style={css(`height:clamp(440px,48vw,680px);position:relative;overflow:hidden;cursor:pointer;-webkit-mask-image:${S(vals.mEdgeSoft)};mask-image:${S(vals.mEdgeSoft)};-webkit-mask-composite:source-in;mask-composite:intersect;mix-blend-mode:${S(vals.pBlend)};outline:${S(vals.pFrame)};outline-offset:8px`)}>
              {"\n        "}
              <div style={{position: "absolute", inset: "0", transition: "transform 1.6s cubic-bezier(.2,.7,.2,1)"}} className="scp7">
                <image-slot id="home-sheets" shape="rect" src="https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-sheets-taupe.jpg?v=1792532663" placeholder="Bedsheet · 2600 × 1950 (4:3) · made bed, side light" />
              </div>
              {"\n      "}
            </div>
            {"\n      "}
            <div style={{display: "flex", flexDirection: "column", gap: "12px", maxWidth: "440px"}}>
              {"\n        "}
              <span style={{display: "inline-flex", alignSelf: "flex-start", padding: "7px 12px 6px", backgroundColor: "#E9DCC3", backgroundImage: "repeating-linear-gradient(90deg, rgba(126,82,50,.14) 0 1px, transparent 1px 2.5px)", outline: "1px dashed rgba(126,82,50,.5)", outlineOffset: "-3px", fontSize: "11px", letterSpacing: ".24em", textTransform: "uppercase", color: "#6B4528"}}>
                {"Bedsheets"}
              </span>
              {"\n        "}
              <h3 style={{margin: "0", fontFamily: "'Marcellus',serif", fontWeight: "400", fontSize: "clamp(28px,2.6vw,38px)", lineHeight: "1.1"}}>
                {"Cool, soft, 100% cotton."}
              </h3>
              {"\n        "}
              <div style={{fontSize: "15px", color: "#5F574B"}}>
                {"From "}{I(vals.sheetFrom)}
                {vals.sheetDeal?.has ? (
                  <>
                  <span style={{marginLeft: "10px", color: "#857A6A", textDecoration: "line-through"}}>
                    {I(vals.sheetDeal?.cmp)}
                  </span>
                  <span style={{marginLeft: "10px", fontSize: "13px", letterSpacing: ".04em", color: "#7E5232"}}>
                    {I(vals.sheetDeal?.off)}
                  </span>
                  </>
                ) : null}
                {" · with two pillow covers"}
              </div>
              {"\n        "}
              <button onClick={vals.storySheets} style={{alignSelf: "flex-start", background: "none", border: "0", padding: "4px 0", cursor: "pointer", fontSize: "15px", color: "#7E5232", backgroundImage: "repeating-linear-gradient(90deg, #7E5232 0 5px, transparent 5px 8px)", backgroundRepeat: "no-repeat", backgroundPosition: "0 100%", backgroundSize: "0% 1.5px", transition: "background-size .6s cubic-bezier(.2,.7,.2,1)"}} className="scp5">
                {"Discover →"}
              </button>
              {"\n      "}
            </div>
            {"\n    "}
          </div>
          {"\n  "}
        </section>
        {"\n\n  "}
        <section data-screen-label="Home · Pillow" style={{position: "relative", isolation: "isolate", overflow: "hidden", backgroundColor: "#3B342B", backgroundImage: "url(/assets/satin.jpg)", backgroundSize: "cover", backgroundPosition: "center", backgroundBlendMode: "multiply", color: "#EDE6D8", display: "flex", flexWrap: "wrap", minHeight: "100vh"}}>
          {"\n    "}
          <div style={{flex: "4 1 360px", minWidth: "0", padding: "clamp(100px,12vw,170px) clamp(20px,5vw,80px)", display: "flex", flexDirection: "column", justifyContent: "center", gap: "26px", boxSizing: "border-box"}}>
            {"\n      "}
            <div data-reveal="0" style={{display: "flex", flexDirection: "column", gap: "22px"}}>
              {"\n        "}
              <span style={{display: "inline-flex", alignSelf: "flex-start", padding: "7px 12px 6px", backgroundColor: "#2C2820", backgroundImage: "repeating-linear-gradient(90deg, rgba(237,230,216,.09) 0 1px, transparent 1px 2.5px)", outline: "1px dashed rgba(200,146,94,.7)", outlineOffset: "-3px", fontSize: "11px", letterSpacing: ".24em", textTransform: "uppercase", color: "#E3C9A6"}}>
                {"Pillows"}
              </span>
              {"\n        "}
              <h2 style={{margin: "0", fontFamily: "'Marcellus',serif", fontWeight: "400", fontSize: "clamp(40px,4.6vw,68px)", lineHeight: "1.02", letterSpacing: "-.01em", color: "#F4EFE6"}}>
                {"Natural latex. Naturally supportive."}
              </h2>
              {"\n        "}
              <p style={{margin: "0", fontSize: "18px", lineHeight: "1.6", fontWeight: "300", color: "#B8AE9E", maxWidth: "420px"}}>
                {"One solid piece of pure natural latex that keeps its shape for years. Pin-core cooled, in a soft knitted cover."}
              </p>
              {"\n      "}
            </div>
            {"\n      "}
            <div data-reveal="220" style={{display: "flex", flexWrap: "wrap", alignItems: "center", gap: "24px", marginTop: "10px"}}>
              {"\n        "}
              <button onClick={vals.storyPillows} style={{backgroundColor: "#F4EFE6", backgroundImage: "repeating-linear-gradient(135deg, rgba(126,82,50,.09) 0 1px, transparent 1px 3px),linear-gradient(180deg, rgba(255,255,255,.4), rgba(126,82,50,.08))", color: "#221E18", border: "0", borderRadius: "999px", outline: "1px dashed rgba(34,30,24,.38)", outlineOffset: "-5px", padding: "15px 28px", fontSize: "14px", letterSpacing: ".05em", cursor: "pointer", transition: "background-color .4s,outline-offset .4s,transform .3s"}} className="scp8 scp3">
                {"Discover the pillow"}
              </button>
              {"\n        "}
              <span style={{fontSize: "15px", color: "#B8AE9E"}}>
                {"From "}{I(vals.pillowFrom)}
                {vals.pillowDeal?.has ? (
                  <>
                  <span style={{marginLeft: "10px", color: "#8E8576", textDecoration: "line-through"}}>
                    {I(vals.pillowDeal?.cmp)}
                  </span>
                  <span style={{marginLeft: "10px", fontSize: "13px", letterSpacing: ".04em", color: "#E3C9A6"}}>
                    {I(vals.pillowDeal?.off)}
                  </span>
                  </>
                ) : null}
              </span>
              {"\n      "}
            </div>
            {"\n    "}
          </div>
          {"\n    "}
          <div data-reveal="0" style={css(`flex:6 1 460px;min-width:0;min-height:clamp(520px,60vw,100vh);position:relative;-webkit-mask-image:${S(vals.mLeft)};mask-image:${S(vals.mLeft)};-webkit-mask-composite:source-in;mask-composite:intersect;filter:sepia(.18) saturate(1.05)`)}>
            {"\n      "}
            <image-slot id="home-pillow" shape="rect" src="https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-pillow-home-latex.png?v=1792532711" placeholder="Pillow · 2400 × 2400 (1:1) · low-key, subject right of centre" />
            {"\n    "}
          </div>
          {"\n  "}
        </section>
        {"\n\n  "}
        <section data-screen-label="Home · Towels" style={{padding: "clamp(100px,12vw,180px) clamp(20px,5vw,80px)"}}>
          {"\n    "}
          <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "32px", marginBottom: "clamp(48px,6vw,88px)"}}>
            {"\n      "}
            <div data-reveal="0" style={{maxWidth: "640px", display: "flex", flexDirection: "column", gap: "20px"}}>
              {"\n        "}
              <span style={{display: "inline-flex", alignSelf: "flex-start", padding: "7px 12px 6px", backgroundColor: "#E9DCC3", backgroundImage: "repeating-linear-gradient(90deg, rgba(126,82,50,.14) 0 1px, transparent 1px 2.5px)", outline: "1px dashed rgba(126,82,50,.5)", outlineOffset: "-3px", fontSize: "11px", letterSpacing: ".24em", textTransform: "uppercase", color: "#6B4528"}}>
                {"Towels"}
              </span>
              {"\n        "}
              <h2 style={{margin: "0", fontFamily: "'Marcellus',serif", fontWeight: "400", fontSize: "clamp(40px,5vw,76px)", lineHeight: "1.02", letterSpacing: "-.01em"}}>
                {"Full width. Full length."}
              </h2>
              {"\n      "}
            </div>
            {"\n      "}
            <p data-reveal="120" style={{margin: "0", maxWidth: "380px", fontSize: "18px", lineHeight: "1.6", fontWeight: "300", color: "#5F574B"}}>
              {"Bath, hand and face towels in pure white cotton terry, and bamboo bath towels in sand brown, ash grey, lilac grey, dark blue and dark brown."}
            </p>
            {"\n    "}
          </div>
          {"\n    "}
          <div style={{display: "flex", flexDirection: "column", gap: "clamp(40px,5vw,72px)"}}>
            {"\n      "}
            <div data-reveal="0" style={css(`width:100%;position:relative;height:clamp(420px,52vw,760px);-webkit-mask-image:${S(vals.mEdge)};mask-image:${S(vals.mEdge)};-webkit-mask-composite:source-in;mask-composite:intersect;mix-blend-mode:${S(vals.pBlend)};outline:${S(vals.pFrame)};outline-offset:8px`)}>
              {"\n        "}
              {L(vals.towelImgs).map((im, i0) => (
                <Fragment key={i0}>
                  {"\n          "}
                  <div style={css(`position:absolute;inset:0;opacity:${S(im?.op)};transform:${S(im?.tf)};transition:opacity 1s cubic-bezier(.2,.7,.2,1),transform 1.5s cubic-bezier(.2,.7,.2,1)`)}>
                    {"\n            "}
                    <image-slot id={im?.id} src={im?.src} shape="rect" placeholder={im?.ph} />
                    {"\n          "}
                  </div>
                  {"\n        "}
                </Fragment>
              ))}
              {"\n      "}
            </div>
            {"\n      "}
            <div data-reveal="80" style={{display: "flex", flexDirection: "column", gap: "36px", width: "100%", maxWidth: "460px"}}>
              {"\n        "}
              <div style={{display: "flex", flexDirection: "column", gap: "14px"}}>
                {"\n          "}
                <div style={{fontSize: "12px", letterSpacing: ".18em", textTransform: "uppercase", color: "#5F574B"}}>
                  {"Material"}
                </div>
                {"\n          "}
                <div style={{display: "flex", padding: "4px", borderRadius: "999px", backgroundColor: "#EAE2D4", backgroundImage: "repeating-linear-gradient(90deg, rgba(126,82,50,.08) 0 1px, transparent 1px 3px)", alignSelf: "flex-start"}}>
                  {"\n            "}
                  {L(vals.towelMats).map((m, i0) => (
                    <Fragment key={i0}>
                      {"\n              "}
                      <button onClick={m?.pick} style={css(`border:0;border-radius:999px;padding:10px 22px;font-size:14px;cursor:pointer;background:${S(m?.bg)};color:#221E18;box-shadow:${S(m?.shadow)};outline:${S(m?.outline)};outline-offset:-4px;transition:background .35s,box-shadow .35s`)}>
                        {I(m?.label)}
                      </button>
                      {"\n            "}
                    </Fragment>
                  ))}
                  {"\n          "}
                </div>
                {"\n        "}
              </div>
              {"\n        "}
              <div style={{display: "flex", flexDirection: "column"}}>
                {"\n          "}
                <div style={{fontSize: "12px", letterSpacing: ".18em", textTransform: "uppercase", color: "#5F574B", marginBottom: "8px"}}>
                  {"Size"}
                </div>
                {"\n          "}
                {L(vals.towelTypes).map((t, i0) => (
                  <Fragment key={i0}>
                    {"\n            "}
                    <button onClick={t?.pick} style={css(`display:flex;justify-content:space-between;align-items:baseline;gap:16px;background:none;border:0;border-top:1.5px dashed rgba(126,82,50,.28);padding:16px 0;cursor:pointer;text-align:left;color:${S(t?.color)};transition:color .35s`)}>
                      {"\n              "}
                      <span style={{fontFamily: "'Marcellus',serif", fontSize: "26px"}}>
                        {I(t?.label)}
                      </span>
                      {"\n              "}
                      <span style={{fontSize: "14px"}}>
                        {I(t?.d)}
                      </span>
                      {"\n            "}
                    </button>
                    {"\n          "}
                  </Fragment>
                ))}
                {"\n        "}
              </div>
              {"\n        "}
              <div style={{display: "flex", flexDirection: "column", gap: "14px"}}>
                {"\n          "}
                <div style={{fontSize: "12px", letterSpacing: ".18em", textTransform: "uppercase", color: "#5F574B"}}>
                  {"Colour · "}
                  <span style={{color: "#221E18"}}>
                    {I(vals.towelColourName)}
                  </span>
                </div>
                {"\n          "}
                <div style={{display: "flex", flexWrap: "wrap", gap: "14px"}}>
                  {"\n            "}
                  {L(vals.towelColours).map((c, i0) => (
                    <Fragment key={i0}>
                      {"\n              "}
                      <button onClick={c?.pick} aria-label={c?.label} style={css(`width:30px;height:30px;border-radius:50%;border:0;cursor:pointer;background-color:${S(c?.hex)};background-image:repeating-linear-gradient(45deg, rgba(255,255,255,.18) 0 1px, transparent 1px 3px),repeating-linear-gradient(-45deg, rgba(0,0,0,.08) 0 1px, transparent 1px 3px);box-shadow:${S(c?.ring)};transition:box-shadow .35s,transform .35s`)} className="scp9" />
                      {"\n            "}
                    </Fragment>
                  ))}
                  {"\n          "}
                </div>
                {"\n        "}
              </div>
              {"\n        "}
              <div style={{display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "20px", paddingTop: "28px", borderTop: "1.5px dashed rgba(126,82,50,.28)"}}>
                {"\n          "}
                <span style={{display: "inline-flex", flexWrap: "wrap", alignItems: "center", gap: "6px 14px", fontSize: "16px"}}>
                  <span>
                    {I(vals.towelPrice)}
                    {vals.towelDeal?.has ? (
                      <>
                      <span style={{marginLeft: "10px", color: "#857A6A", textDecoration: "line-through"}}>
                        {I(vals.towelDeal?.cmp)}
                      </span>
                      <span style={{marginLeft: "10px", fontSize: "13px", letterSpacing: ".04em", color: "#7E5232"}}>
                        {I(vals.towelDeal?.off)}
                      </span>
                      </>
                    ) : null}
                  </span>
                  {vals.towelSoon ? (
                    <>
                    <button onClick={vals.nfTowel?.go} style={{display: "inline-flex", alignItems: "center", gap: "6px", background: "none", border: "0", padding: "2px 0", cursor: "pointer", fontSize: "14px", letterSpacing: ".02em", color: "#7E5232", backgroundImage: "repeating-linear-gradient(90deg, #7E5232 0 5px, transparent 5px 8px)", backgroundRepeat: "no-repeat", backgroundPosition: "0 100%", backgroundSize: "0% 1.5px", transition: "background-size .6s cubic-bezier(.2,.7,.2,1)"}} className="scp5">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{flex: "none"}}>
                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                      </svg>
                      {I(vals.nfTowel?.label)}
                    </button>
                    </>
                  ) : null}
                </span>
                {"\n          "}
                <button onClick={vals.storyTowels} style={{backgroundColor: "#221E18", backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,.07) 0 1px, transparent 1px 3px),linear-gradient(180deg, rgba(255,255,255,.1), rgba(0,0,0,.18))", color: "#F4EFE6", border: "0", borderRadius: "999px", outline: "1px dashed rgba(244,239,230,.42)", outlineOffset: "-5px", padding: "15px 28px", fontSize: "14px", letterSpacing: ".05em", cursor: "pointer", transition: "background-color .4s,outline-offset .4s,transform .3s"}} className="scp2 scp3">
                  {"Discover towels"}
                </button>
                {"\n        "}
              </div>
              {"\n      "}
            </div>
            {"\n    "}
          </div>
          {"\n  "}
        </section>
        {"\n\n  "}
        <section data-screen-label="Home · Story" style={{position: "relative", paddingBottom: "clamp(80px,10vw,140px)"}}>
          {"\n    "}
          <div data-reveal="0" style={css(`height:clamp(460px,80vh,900px);position:relative;-webkit-mask-image:${S(vals.mTB)};mask-image:${S(vals.mTB)};mix-blend-mode:${S(vals.pBlend)}`)}>
            {"\n      "}
            <image-slot id="home-story" shape="rect" src="https://cdn.shopify.com/s/files/1/0787/0883/4541/files/web-story-mill.jpg?v=1792532662" placeholder="Story · 3600 × 1600 (9:4) · hands at the loom" />
            {"\n    "}
          </div>
          {"\n    "}
          <div data-reveal="120" style={{position: "relative", isolation: "isolate", overflow: "hidden", margin: "clamp(-200px,-12vw,-80px) clamp(20px,5vw,80px) 0 auto", maxWidth: "560px", backgroundColor: "#F4EFE6", padding: "clamp(32px,4.5vw,64px)", display: "flex", flexDirection: "column", gap: "22px", outline: "1px dashed rgba(126,82,50,.45)", outlineOffset: "-12px"}}>
            {"\n      "}
            <img src="/assets/logo-mark.png" alt="" style={{width: "56px", height: "auto"}} />
            {"\n      "}
            <h2 style={{margin: "0", fontFamily: "'Marcellus',serif", fontWeight: "400", fontSize: "clamp(34px,3.6vw,54px)", lineHeight: "1.05"}}>
              {"Made on the loom, for everyday use."}
            </h2>
            {"\n      "}
            <p style={{margin: "0", fontSize: "17px", lineHeight: "1.65", fontWeight: "300", color: "#5F574B"}}>
              {"Every Daily Loom piece begins as yarn on a loom. We keep the materials simple, cotton, natural latex and bamboo, so what reaches your home is comfortable from the first night and stays that way."}
            </p>
            {"\n    "}
          </div>
          {"\n  "}
        </section>
      </main>
    </>
  );
}
