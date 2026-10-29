// @ts-nocheck
/* eslint-disable */
// Generated from "Daily Loom v4.dc.html" by the dc → React converter.
// Mirrors the element tree the dc-runtime renders for this part of the page.
import {Fragment} from 'react';
import {css, I, L, S, VAL} from '../runtime';

export function HelpView({vals}: {vals: any}) {
  return (
    <>
      <main data-screen-label="Help" style={{padding: "clamp(120px,14vw,190px) clamp(20px,5vw,80px) clamp(60px,8vw,100px)", display: "flex", flexDirection: "column", gap: "clamp(90px,11vw,150px)"}}>
        {"\n  "}
        <div data-reveal="0" style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "28px"}}>
          {"\n    "}
          <div style={{display: "flex", flexDirection: "column", gap: "20px", maxWidth: "760px"}}>
            {"\n      "}
            <span style={{display: "inline-flex", alignSelf: "flex-start", padding: "7px 12px 6px", backgroundColor: "#E9DCC3", backgroundImage: "repeating-linear-gradient(90deg, rgba(126,82,50,.14) 0 1px, transparent 1px 2.5px)", outline: "1px dashed rgba(126,82,50,.5)", outlineOffset: "-3px", fontSize: "11px", letterSpacing: ".24em", textTransform: "uppercase", color: "#6B4528"}}>
              {"Help"}
            </span>
            {"\n      "}
            <h1 style={{margin: "0", fontFamily: "'Marcellus',serif", fontWeight: "400", fontSize: "clamp(52px,7vw,112px)", lineHeight: ".98", letterSpacing: "-.015em"}}>
              {"Returns, care and contact."}
            </h1>
            {"\n    "}
          </div>
          {"\n    "}
          <div style={{display: "flex", flexWrap: "wrap", gap: "10px"}}>
            {"\n      "}
            {L(vals.helpLinks).map((h, i0) => (
              <Fragment key={i0}>
                {"\n        "}
                <button onClick={h?.go} style={{borderRadius: "999px", padding: "10px 18px", fontSize: "13px", letterSpacing: ".04em", cursor: "pointer", background: "transparent", color: "#221E18", border: "1px solid rgba(34,30,24,.25)", transition: "border-color .3s,background .3s"}} className="scp6">
                  {I(h?.label)}
                </button>
                {"\n      "}
              </Fragment>
            ))}
            {"\n    "}
          </div>
          {"\n  "}
        </div>
        {"\n\n  "}
        <section id="help-returns" style={{display: "flex", flexWrap: "wrap", gap: "clamp(32px,5vw,88px)", alignItems: "flex-start"}}>
          {"\n    "}
          <div data-reveal="0" style={{flex: "4 1 300px", minWidth: "0", display: "flex", flexDirection: "column", gap: "18px"}}>
            {"\n      "}
            <span style={{display: "inline-flex", alignSelf: "flex-start", padding: "7px 12px 6px", backgroundColor: "#E9DCC3", backgroundImage: "repeating-linear-gradient(90deg, rgba(126,82,50,.14) 0 1px, transparent 1px 2.5px)", outline: "1px dashed rgba(126,82,50,.5)", outlineOffset: "-3px", fontSize: "11px", letterSpacing: ".24em", textTransform: "uppercase", color: "#6B4528"}}>
              {"Returns"}
            </span>
            {"\n      "}
            <h2 style={{margin: "0", fontFamily: "'Marcellus',serif", fontWeight: "400", fontSize: "clamp(40px,4.6vw,68px)", lineHeight: "1.02", letterSpacing: "-.01em"}}>
              {"Our returns policy."}
            </h2>
            {"\n      "}
            <p style={{margin: "0", fontSize: "17px", lineHeight: "1.65", fontWeight: "300", color: "#5F574B", maxWidth: "420px"}}>
              {"Every piece is checked before it leaves our workshop. If something arrives damaged, we will put it right."}
            </p>
            {"\n    "}
          </div>
          {"\n    "}
          <div data-reveal="120" style={{flex: "7 1 420px", minWidth: "0", display: "flex", flexDirection: "column", borderBottom: "1.5px dashed rgba(126,82,50,.28)"}}>
            {"\n      "}
            {L(vals.helpReturns).map((r, i0) => (
              <Fragment key={i0}>
                {"\n        "}
                <div style={{display: "flex", flexWrap: "wrap", gap: "8px 32px", padding: "24px 0", borderTop: "1.5px dashed rgba(126,82,50,.28)"}}>
                  {"\n          "}
                  <span style={{flex: "0 1 200px", minWidth: "0", fontFamily: "'Marcellus',serif", fontSize: "22px", lineHeight: "1.25"}}>
                    {I(r?.k)}
                  </span>
                  {"\n          "}
                  <span style={{flex: "1 1 300px", minWidth: "0", fontSize: "16px", lineHeight: "1.65", fontWeight: "300", color: "#3B342B"}}>
                    {I(r?.v)}
                  </span>
                  {"\n        "}
                </div>
                {"\n      "}
              </Fragment>
            ))}
            {"\n    "}
          </div>
          {"\n  "}
        </section>
        {"\n\n  "}
        <section id="help-care" style={{display: "flex", flexDirection: "column", gap: "clamp(40px,5vw,64px)"}}>
          {"\n    "}
          <div data-reveal="0" style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "24px"}}>
            {"\n      "}
            <div style={{display: "flex", flexDirection: "column", gap: "18px", maxWidth: "640px"}}>
              {"\n        "}
              <span style={{display: "inline-flex", alignSelf: "flex-start", padding: "7px 12px 6px", backgroundColor: "#E9DCC3", backgroundImage: "repeating-linear-gradient(90deg, rgba(126,82,50,.14) 0 1px, transparent 1px 2.5px)", outline: "1px dashed rgba(126,82,50,.5)", outlineOffset: "-3px", fontSize: "11px", letterSpacing: ".24em", textTransform: "uppercase", color: "#6B4528"}}>
                {"Care guide"}
              </span>
              {"\n        "}
              <h2 style={{margin: "0", fontFamily: "'Marcellus',serif", fontWeight: "400", fontSize: "clamp(40px,4.6vw,68px)", lineHeight: "1.02", letterSpacing: "-.01em"}}>
                {"Caring for every piece."}
              </h2>
              {"\n      "}
            </div>
            {"\n      "}
            <p style={{margin: "0", maxWidth: "380px", fontSize: "17px", lineHeight: "1.6", fontWeight: "300", color: "#5F574B"}}>
              {"A little care keeps natural fibres soft, bright and comfortable for years."}
            </p>
            {"\n    "}
          </div>
          {"\n    "}
          <div style={{display: "flex", flexDirection: "column"}}>
            {"\n      "}
            {L(vals.careGuide).map((g, i0) => (
              <Fragment key={i0}>
                {"\n        "}
                <div data-reveal="0" style={{display: "flex", flexWrap: "wrap", gap: "20px clamp(32px,5vw,88px)", padding: "clamp(28px,3.4vw,44px) 0", borderTop: "1.5px dashed rgba(126,82,50,.3)"}}>
                  {"\n          "}
                  <div style={{flex: "4 1 280px", minWidth: "0", display: "flex", flexDirection: "column", gap: "10px"}}>
                    {"\n            "}
                    <span style={{fontFamily: "'Marcellus',serif", fontSize: "clamp(28px,2.8vw,40px)", lineHeight: "1.08"}}>
                      {I(g?.t)}
                    </span>
                    {"\n            "}
                    <span style={{fontSize: "14px", lineHeight: "1.5", color: "#5F574B"}}>
                      {I(g?.products)}
                    </span>
                    {"\n            "}
                    <button onClick={g?.go} style={{alignSelf: "flex-start", marginTop: "6px", background: "none", border: "0", padding: "4px 0", cursor: "pointer", fontSize: "14px", color: "#7E5232", backgroundImage: "repeating-linear-gradient(90deg, #7E5232 0 5px, transparent 5px 8px)", backgroundRepeat: "no-repeat", backgroundPosition: "0 100%", backgroundSize: "0% 1.5px", transition: "background-size .6s cubic-bezier(.2,.7,.2,1)"}} className="scp5">
                      {"Discover →"}
                    </button>
                    {"\n          "}
                  </div>
                  {"\n          "}
                  <div style={{flex: "7 1 420px", minWidth: "0", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "24px 32px"}}>
                    {"\n            "}
                    {L(g?.items).map((it, i1) => (
                      <Fragment key={i1}>
                        {"\n              "}
                        <div style={{display: "flex", flexDirection: "column", gap: "6px"}}>
                          {"\n                "}
                          <span style={{fontSize: "16px", color: "#221E18"}}>
                            {I(it?.t)}
                          </span>
                          {"\n                "}
                          <span style={{fontSize: "15px", lineHeight: "1.6", fontWeight: "300", color: "#5F574B"}}>
                            {I(it?.b)}
                          </span>
                          {"\n              "}
                        </div>
                        {"\n            "}
                      </Fragment>
                    ))}
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
        {"\n\n  "}
        <section id="help-contact" style={{position: "relative", isolation: "isolate", overflow: "hidden", backgroundColor: "#3B342B", backgroundImage: "url(/assets/satin.jpg)", backgroundSize: "cover", backgroundPosition: "center", backgroundBlendMode: "multiply", color: "#EDE6D8", padding: "clamp(56px,7vw,100px) clamp(24px,5vw,80px)", display: "flex", flexWrap: "wrap", gap: "clamp(32px,5vw,88px)", alignItems: "flex-end"}}>
          {"\n    "}
          <div data-reveal="0" style={{flex: "5 1 320px", minWidth: "0", display: "flex", flexDirection: "column", gap: "20px"}}>
            {"\n      "}
            <span style={{display: "inline-flex", alignSelf: "flex-start", padding: "7px 12px 6px", backgroundColor: "#2C2820", backgroundImage: "repeating-linear-gradient(90deg, rgba(237,230,216,.09) 0 1px, transparent 1px 2.5px)", outline: "1px dashed rgba(200,146,94,.7)", outlineOffset: "-3px", fontSize: "11px", letterSpacing: ".24em", textTransform: "uppercase", color: "#E3C9A6"}}>
              {"Contact"}
            </span>
            {"\n      "}
            <h2 style={{margin: "0", fontFamily: "'Marcellus',serif", fontWeight: "400", fontSize: "clamp(40px,4.6vw,68px)", lineHeight: "1.02", letterSpacing: "-.01em", color: "#F4EFE6"}}>
              {"Write to us."}
            </h2>
            {"\n      "}
            <p style={{margin: "0", fontSize: "17px", lineHeight: "1.6", fontWeight: "300", color: "#B8AE9E", maxWidth: "420px"}}>
              {"For orders, returns, monogramming or help choosing, email or WhatsApp us with your order number if you have one."}
            </p>
            {"\n    "}
          </div>
          {"\n    "}
          <div data-reveal="120" style={{flex: "6 1 340px", minWidth: "0", display: "flex", flexDirection: "column"}}>
            {"\n      "}
            <a href="mailto:contact@dailyloom.in" style={{display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "16px", padding: "22px 0", borderTop: "1.5px dashed rgba(200,146,94,.35)", color: "#F4EFE6"}} className="scpk">
              <span style={{fontSize: "13px", letterSpacing: ".14em", textTransform: "uppercase", color: "#C8925E"}}>
                {"Email"}
              </span>
              <span style={{fontFamily: "'Marcellus',serif", fontSize: "clamp(22px,2.4vw,32px)"}}>
                {"contact@dailyloom.in"}
              </span>
            </a>
            {"\n      "}
            <a href="https://wa.me/919220442722" target="_blank" rel="noopener" style={{display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "16px", padding: "22px 0", borderTop: "1.5px dashed rgba(200,146,94,.35)", color: "#F4EFE6"}} className="scpk">
              <span style={{fontSize: "13px", letterSpacing: ".14em", textTransform: "uppercase", color: "#C8925E"}}>
                {"WhatsApp"}
              </span>
              <span style={{fontFamily: "'Marcellus',serif", fontSize: "clamp(22px,2.4vw,32px)"}}>
                {"+91 92204 42722"}
              </span>
            </a>
            {"\n      "}
            <a href="https://www.instagram.com/dailyloom.in" target="_blank" rel="noopener" style={{display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "16px", padding: "22px 0", borderTop: "1.5px dashed rgba(200,146,94,.35)", borderBottom: "1.5px dashed rgba(200,146,94,.35)", color: "#F4EFE6"}} className="scpk">
              <span style={{fontSize: "13px", letterSpacing: ".14em", textTransform: "uppercase", color: "#C8925E"}}>
                {"Instagram"}
              </span>
              <span style={{fontFamily: "'Marcellus',serif", fontSize: "clamp(22px,2.4vw,32px)"}}>
                {"@dailyloom.in"}
              </span>
            </a>
            {"\n    "}
          </div>
          {"\n  "}
        </section>
      </main>
    </>
  );
}
