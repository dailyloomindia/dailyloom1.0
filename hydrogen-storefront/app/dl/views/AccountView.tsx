// @ts-nocheck
/* eslint-disable */
// Generated from "Daily Loom v4.dc.html" by the dc → React converter.
// Mirrors the element tree the dc-runtime renders for this part of the page.
import {Fragment} from 'react';
import {css, I, L, S, VAL} from '../runtime';

export function AccountView({vals}: {vals: any}) {
  return (
    <>
      <main data-screen-label="Account" style={{padding: "clamp(110px,12vw,160px) clamp(20px,5vw,80px) clamp(60px,8vw,110px)"}}>
        {"\n  "}
        {vals.acAuth ? (
          <>
          {"\n    "}
          <div data-reveal="0" style={{maxWidth: "440px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "34px"}}>
            {"\n      "}
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "16px"}}>
              {"\n        "}
              <img src="/assets/logo-mark.png" alt="" style={{width: "52px", height: "auto"}} />
              {"\n        "}
              <h1 style={{margin: "0", fontFamily: "'Marcellus',serif", fontWeight: "400", fontSize: "clamp(40px,5vw,60px)", lineHeight: "1.02", letterSpacing: "-.01em"}}>
                {I(vals.acTitle)}
              </h1>
              {"\n        "}
              <p style={{margin: "0", fontSize: "16px", lineHeight: "1.6", fontWeight: "300", color: "#5F574B", maxWidth: "360px"}}>
                {I(vals.acLede)}
              </p>
              {"\n      "}
            </div>
            {"\n      "}
            {vals.acIsSignin ? (
              <>
              {"\n        "}
              <form onSubmit={vals.acSignin} style={{display: "flex", flexDirection: "column", gap: "22px"}}>
                {"\n          "}
                <label style={{display: "flex", flexDirection: "column", gap: "6px"}}>
                  <span style={{fontSize: "13px", letterSpacing: ".06em", color: "#5F574B"}}>
                    {"Email"}
                  </span>
                  <input value={VAL(vals.acEmailIn)} onChange={vals.acOnEmail} type="email" autoComplete="email" style={{background: "transparent", border: "0", borderBottom: "1.5px dashed rgba(34,30,24,.4)", outline: "none", padding: "10px 0 9px", fontSize: "17px", color: "#221E18"}} className="scpl" />
                </label>
                {"\n          "}
                <button type="submit" style={{backgroundColor: "#221E18", backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,.07) 0 1px, transparent 1px 3px),linear-gradient(180deg, rgba(255,255,255,.1), rgba(0,0,0,.18))", color: "#F4EFE6", border: "0", borderRadius: "999px", outline: "1px dashed rgba(244,239,230,.42)", outlineOffset: "-5px", letterSpacing: ".05em", cursor: "pointer", transition: "background-color .5s,outline-offset .4s,transform .3s", height: "54px", fontSize: "15px"}} className="scpa">
                  {"Sign in"}
                </button>
                {"\n        "}
              </form>
              {"\n        "}
              <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", paddingTop: "26px", borderTop: "1.5px dashed rgba(126,82,50,.28)"}}>
                {"\n          "}
                <span style={{fontSize: "14px", color: "#5F574B"}}>
                  {"New to Daily Loom?"}
                </span>
                {"\n          "}
                <button onClick={vals.acToSignup} style={{background: "transparent", color: "#221E18", border: "1px solid rgba(34,30,24,.35)", borderRadius: "999px", letterSpacing: ".04em", cursor: "pointer", transition: "border-color .35s,background .35s", height: "50px", padding: "0 26px", fontSize: "14px"}} className="scpm">
                  {"Create an account"}
                </button>
                {"\n        "}
              </div>
              {"\n      "}
              </>
            ) : null}
            {"\n      "}
            {vals.acIsSignup ? (
              <>
              {"\n        "}
              <form onSubmit={vals.acSignup} style={{display: "flex", flexDirection: "column", gap: "22px"}}>
                {"\n          "}
                <label style={{display: "flex", flexDirection: "column", gap: "6px"}}>
                  <span style={{fontSize: "13px", letterSpacing: ".06em", color: "#5F574B"}}>
                    {"Full name"}
                  </span>
                  <input value={VAL(vals.acNameIn)} onChange={vals.acOnName} type="text" autoComplete="name" style={{background: "transparent", border: "0", borderBottom: "1.5px dashed rgba(34,30,24,.4)", outline: "none", padding: "10px 0 9px", fontSize: "17px", color: "#221E18"}} className="scpl" />
                </label>
                {"\n          "}
                <label style={{display: "flex", flexDirection: "column", gap: "6px"}}>
                  <span style={{fontSize: "13px", letterSpacing: ".06em", color: "#5F574B"}}>
                    {"Email"}
                  </span>
                  <input value={VAL(vals.acEmailIn)} onChange={vals.acOnEmail} type="email" autoComplete="email" style={{background: "transparent", border: "0", borderBottom: "1.5px dashed rgba(34,30,24,.4)", outline: "none", padding: "10px 0 9px", fontSize: "17px", color: "#221E18"}} className="scpl" />
                </label>
                {"\n          "}
                <label style={{display: "flex", flexDirection: "column", gap: "6px"}}>
                  <span style={{fontSize: "13px", letterSpacing: ".06em", color: "#5F574B"}}>
                    {"Password · at least 8 characters"}
                  </span>
                  <input value={VAL(vals.acPassIn)} onChange={vals.acOnPass} type="password" autoComplete="new-password" style={{background: "transparent", border: "0", borderBottom: "1.5px dashed rgba(34,30,24,.4)", outline: "none", padding: "10px 0 9px", fontSize: "17px", color: "#221E18"}} className="scpl" />
                </label>
                {"\n          "}
                <button type="submit" style={{backgroundColor: "#221E18", backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,.07) 0 1px, transparent 1px 3px),linear-gradient(180deg, rgba(255,255,255,.1), rgba(0,0,0,.18))", color: "#F4EFE6", border: "0", borderRadius: "999px", outline: "1px dashed rgba(244,239,230,.42)", outlineOffset: "-5px", letterSpacing: ".05em", cursor: "pointer", transition: "background-color .5s,outline-offset .4s,transform .3s", height: "54px", fontSize: "15px", marginTop: "6px"}} className="scpa">
                  {"Create account"}
                </button>
                {"\n        "}
              </form>
              {"\n        "}
              <div style={{display: "flex", justifyContent: "center", gap: "8px", fontSize: "14px", color: "#5F574B", paddingTop: "22px", borderTop: "1.5px dashed rgba(126,82,50,.28)"}}>
                {"Already have an account?"}
                <button onClick={vals.acToSignin} style={{background: "none", border: "0", padding: "0", cursor: "pointer", fontSize: "14px", color: "#7E5232", backgroundImage: "repeating-linear-gradient(90deg, #7E5232 0 5px, transparent 5px 8px)", backgroundRepeat: "no-repeat", backgroundPosition: "0 100%", backgroundSize: "0% 1.5px", transition: "background-size .6s cubic-bezier(.2,.7,.2,1)"}}>
                  {"Sign in"}
                </button>
              </div>
              {"\n      "}
              </>
            ) : null}
            {"\n      "}
            {vals.acIsForgot ? (
              <>
              {"\n        "}
              <form onSubmit={vals.acForgot} style={{display: "flex", flexDirection: "column", gap: "22px"}}>
                {"\n          "}
                <label style={{display: "flex", flexDirection: "column", gap: "6px"}}>
                  <span style={{fontSize: "13px", letterSpacing: ".06em", color: "#5F574B"}}>
                    {"Email"}
                  </span>
                  <input value={VAL(vals.acEmailIn)} onChange={vals.acOnEmail} type="email" autoComplete="email" style={{background: "transparent", border: "0", borderBottom: "1.5px dashed rgba(34,30,24,.4)", outline: "none", padding: "10px 0 9px", fontSize: "17px", color: "#221E18"}} className="scpl" />
                </label>
                {"\n          "}
                <button type="submit" style={{backgroundColor: "#221E18", backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,.07) 0 1px, transparent 1px 3px),linear-gradient(180deg, rgba(255,255,255,.1), rgba(0,0,0,.18))", color: "#F4EFE6", border: "0", borderRadius: "999px", outline: "1px dashed rgba(244,239,230,.42)", outlineOffset: "-5px", letterSpacing: ".05em", cursor: "pointer", transition: "background-color .5s,outline-offset .4s,transform .3s", height: "54px", fontSize: "15px"}} className="scpa">
                  {"Send reset link"}
                </button>
                {"\n        "}
              </form>
              {"\n        "}
              <button onClick={vals.acToSignin} style={{alignSelf: "center", background: "none", border: "0", padding: "4px 0", cursor: "pointer", fontSize: "14px", color: "#7E5232", backgroundImage: "repeating-linear-gradient(90deg, #7E5232 0 5px, transparent 5px 8px)", backgroundRepeat: "no-repeat", backgroundPosition: "0 100%", backgroundSize: "0% 1.5px", transition: "background-size .6s cubic-bezier(.2,.7,.2,1)"}}>
                {"← Back to sign in"}
              </button>
              {"\n      "}
              </>
            ) : null}
            {"\n      "}
            {vals.acIsSent ? (
              <>
              {"\n        "}
              <div style={{display: "flex", flexDirection: "column", gap: "12px", padding: "24px", backgroundColor: "#EAE2D4", outline: "1px dashed rgba(126,82,50,.45)", outlineOffset: "-7px", textAlign: "center"}}>
                {"\n          "}
                <span style={{fontFamily: "'Marcellus',serif", fontSize: "22px"}}>
                  {"Check your inbox."}
                </span>
                {"\n          "}
                <span style={{fontSize: "15px", lineHeight: "1.6", fontWeight: "300", color: "#3B342B"}}>
                  {"If an account exists for "}{I(vals.acEmailIn)}{", a link to set a new password is on its way. It expires in 24 hours."}
                </span>
                {"\n        "}
              </div>
              {"\n        "}
              <button onClick={vals.acToSignin} style={{background: "transparent", color: "#221E18", border: "1px solid rgba(34,30,24,.35)", borderRadius: "999px", letterSpacing: ".04em", cursor: "pointer", transition: "border-color .35s,background .35s", height: "50px", fontSize: "14px"}} className="scpm">
                {"Back to sign in"}
              </button>
              {"\n      "}
              </>
            ) : null}
            {"\n      "}
            {vals.acHasErr ? (
              <>
              <span style={{marginTop: "-18px", textAlign: "center", fontSize: "14px", color: "#8A3B2A"}}>
                {I(vals.acErr)}
              </span>
              </>
            ) : null}
            {"\n      "}
            {vals.devNotes ? (
              <>
              <span style={{alignSelf: "center", fontSize: "11px", letterSpacing: ".06em", color: "#7E5232", background: "#FBF6EC", border: "1px dashed #C8925E", borderRadius: "4px", padding: "6px 8px"}}>
                {"Customer Account API · new accounts use Shopify-hosted login (email + one-time code). Classic: customerAccessTokenCreate / customerCreate / customerRecover"}
              </span>
              </>
            ) : null}
            {"\n    "}
          </div>
          {"\n  "}
          </>
        ) : null}
        {"\n\n  "}
        {vals.acIsOrders ? (
          <>
          {"\n    "}
          <div data-reveal="0" style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "24px", marginBottom: "clamp(44px,6vw,80px)"}}>
            {"\n      "}
            <div style={{display: "flex", flexDirection: "column", gap: "18px"}}>
              {"\n        "}
              <span style={{display: "inline-flex", alignSelf: "flex-start", padding: "7px 12px 6px", backgroundColor: "#E9DCC3", backgroundImage: "repeating-linear-gradient(90deg, rgba(126,82,50,.14) 0 1px, transparent 1px 2.5px)", outline: "1px dashed rgba(126,82,50,.5)", outlineOffset: "-3px", fontSize: "11px", letterSpacing: ".24em", textTransform: "uppercase", color: "#6B4528"}}>
                {"Your account"}
              </span>
              {"\n        "}
              <h1 style={{margin: "0", fontFamily: "'Marcellus',serif", fontWeight: "400", fontSize: "clamp(48px,6.4vw,100px)", lineHeight: ".98", letterSpacing: "-.015em"}}>
                {"Hello, "}{I(vals.acFirst)}{"."}
              </h1>
              {"\n      "}
            </div>
            {"\n      "}
            <div style={{display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px 22px", fontSize: "14px", color: "#5F574B"}}>
              <span>
                {I(vals.acEmail)}
              </span>
              <button onClick={vals.acSignout} style={{background: "none", border: "0", padding: "4px 0", cursor: "pointer", fontSize: "14px", color: "#7E5232", backgroundImage: "repeating-linear-gradient(90deg, #7E5232 0 5px, transparent 5px 8px)", backgroundRepeat: "no-repeat", backgroundPosition: "0 100%", backgroundSize: "0% 1.5px", transition: "background-size .6s cubic-bezier(.2,.7,.2,1)"}}>
                {"Sign out"}
              </button>
            </div>
            {"\n    "}
          </div>
          {"\n    "}
          <div style={{display: "flex", flexWrap: "wrap", gap: "clamp(32px,5vw,88px)", alignItems: "flex-start"}}>
            {"\n      "}
            <section style={{flex: "7 1 460px", minWidth: "0", display: "flex", flexDirection: "column"}}>
              {"\n        "}
              <h2 style={{margin: "0 0 18px", fontFamily: "'Marcellus',serif", fontWeight: "400", fontSize: "clamp(28px,2.8vw,38px)"}}>
                {"Your orders"}
              </h2>
              {"\n        "}
              <div style={{display: "flex", flexDirection: "column", borderBottom: "1.5px dashed rgba(126,82,50,.28)"}}>
                {"\n          "}
                {L(vals.acOrders).map((o, i0) => (
                  <Fragment key={i0}>
                    {"\n            "}
                    <button onClick={o?.open} style={{display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px 24px", width: "100%", textAlign: "left", background: "none", border: "0", borderTop: "1.5px dashed rgba(126,82,50,.28)", padding: "26px 0", cursor: "pointer", color: "#221E18", transition: "background .4s"}} className="scpn">
                      {"\n              "}
                      <div style={{display: "flex", gap: "8px", flex: "none"}}>
                        {"\n                "}
                        {L(o?.thumbs).map((th, i1) => (
                          <Fragment key={i1}>
                            {"\n                  "}
                            <div style={css(`width:60px;height:74px;background-color:${S(th?.tint)};background-image:${S(th?.bg)};background-size:cover;background-position:center`)} />
                            {"\n                "}
                          </Fragment>
                        ))}
                        {"\n              "}
                      </div>
                      {"\n              "}
                      <div style={{flex: "1 1 200px", minWidth: "0", display: "flex", flexDirection: "column", gap: "6px"}}>
                        {"\n                "}
                        <span style={{fontFamily: "'Marcellus',serif", fontSize: "22px"}}>
                          {"Order "}{I(o?.no)}
                        </span>
                        {"\n                "}
                        <span style={{fontSize: "14px", lineHeight: "1.5", color: "#5F574B"}}>
                          {I(o?.placed)}{" · "}{I(o?.itemsText)}
                        </span>
                        {"\n              "}
                      </div>
                      {"\n              "}
                      <div style={{flex: "1 1 180px", minWidth: "0", display: "flex", flexDirection: "column", gap: "6px"}}>
                        {"\n                "}
                        <span style={{display: "flex", alignItems: "center", gap: "8px", fontSize: "15px"}}>
                          <span style={css(`width:7px;height:7px;border-radius:50%;flex:none;background:${S(o?.dot)}`)} />
                          {I(o?.status)}
                        </span>
                        {"\n                "}
                        <span style={{fontSize: "13px", color: "#5F574B"}}>
                          {I(o?.statusSub)}
                        </span>
                        {"\n              "}
                      </div>
                      {"\n              "}
                      <span style={{flex: "none", fontSize: "16px"}}>
                        {I(o?.total)}
                      </span>
                      {"\n              "}
                      <span style={{flex: "none", fontSize: "18px", color: "#7E5232"}}>
                        {"→"}
                      </span>
                      {"\n            "}
                    </button>
                    {"\n          "}
                  </Fragment>
                ))}
                {"\n          "}
                {vals.acNoOrders ? (
                  <>
                  <span style={{borderTop: "1.5px dashed rgba(126,82,50,.28)", padding: "26px 0", fontSize: "14px", lineHeight: "1.5", color: "#5F574B"}}>
                    {"No orders yet."}
                  </span>
                  </>
                ) : null}
                {"\n        "}
              </div>
              {"\n        "}
              {vals.devNotes ? (
                <>
                <span style={{alignSelf: "flex-start", marginTop: "16px", fontSize: "11px", letterSpacing: ".06em", color: "#7E5232", background: "#FBF6EC", border: "1px dashed #C8925E", borderRadius: "4px", padding: "6px 8px"}}>
                  {"customer { orders(first: 20, reverse: true) { name processedAt totalPrice fulfillments { status estimatedDeliveryAt } } }"}
                </span>
                </>
              ) : null}
              {"\n      "}
            </section>
            {"\n      "}
            <aside style={{flex: "4 1 300px", minWidth: "0", display: "flex", flexDirection: "column", gap: "18px", padding: "26px", backgroundColor: "#EAE2D4", outline: "1px dashed rgba(126,82,50,.45)", outlineOffset: "-8px"}}>
              {"\n        "}
              <span style={{fontFamily: "'Marcellus',serif", fontSize: "24px"}}>
                {"Your details"}
              </span>
              {"\n        "}
              <div style={{display: "flex", flexDirection: "column"}}>
                {"\n          "}
                {L(vals.acDetails).map((d, i0) => (
                  <Fragment key={i0}>
                    {"\n            "}
                    <div style={{display: "flex", flexDirection: "column", gap: "4px", padding: "14px 0", borderTop: "1.5px dashed rgba(126,82,50,.28)"}}>
                      {"\n              "}
                      <span style={{fontSize: "12px", letterSpacing: ".14em", textTransform: "uppercase", color: "#6B4528"}}>
                        {I(d?.k)}
                      </span>
                      {"\n              "}
                      <span style={{fontSize: "15px", lineHeight: "1.5", color: "#221E18"}}>
                        {I(d?.v)}
                      </span>
                      {"\n            "}
                    </div>
                    {"\n          "}
                  </Fragment>
                ))}
                {"\n        "}
              </div>
              {"\n        "}
              <span style={{fontSize: "13px", lineHeight: "1.55", color: "#554D42"}}>
                {"Questions about an order? Write to "}
                <a href="mailto:contact@dailyloom.in" style={{color: "#7E5232"}}>
                  {"contact@dailyloom.in"}
                </a>
              </span>
              {"\n      "}
            </aside>
            {"\n    "}
          </div>
          {"\n  "}
          </>
        ) : null}
        {"\n\n  "}
        {vals.acIsOrder ? (
          <>
          {"\n    "}
          <div style={{display: "flex", flexWrap: "wrap", gap: "10px", fontSize: "13px", letterSpacing: ".04em", color: "#5F574B", marginBottom: "26px"}}>
            {"\n      "}
            <button onClick={vals.acToOrders} style={{background: "none", border: "0", padding: "0", cursor: "pointer", color: "#5F574B"}} className="scpc">
              {"Your account"}
            </button>
            <span>
              {"/"}
            </span>
            <span style={{color: "#221E18"}}>
              {"Order "}{I(vals.od?.no)}
            </span>
            {"\n    "}
          </div>
          {"\n    "}
          <div data-reveal="0" style={{display: "flex", flexDirection: "column", gap: "12px", marginBottom: "clamp(40px,5vw,64px)"}}>
            {"\n      "}
            <h1 style={{margin: "0", fontFamily: "'Marcellus',serif", fontWeight: "400", fontSize: "clamp(44px,5.6vw,84px)", lineHeight: "1", letterSpacing: "-.01em"}}>
              {"Order "}{I(vals.od?.no)}
            </h1>
            {"\n      "}
            <span style={{fontSize: "15px", color: "#5F574B"}}>
              {"Placed on "}{I(vals.od?.placed)}{" · "}{I(vals.od?.countText)}
            </span>
            {"\n    "}
          </div>
          {"\n    "}
          <div style={{display: "flex", flexWrap: "wrap", gap: "clamp(32px,5vw,88px)", alignItems: "flex-start"}}>
            {"\n      "}
            <div style={{flex: "7 1 460px", minWidth: "0", display: "flex", flexDirection: "column", gap: "clamp(48px,6vw,72px)"}}>
              {"\n        "}
              <section style={{display: "flex", flexDirection: "column", gap: "26px"}}>
                {"\n          "}
                <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
                  {"\n            "}
                  <span style={{fontFamily: "'Marcellus',serif", fontSize: "clamp(28px,3vw,40px)", lineHeight: "1.1"}}>
                    {I(vals.od?.headline)}
                  </span>
                  {"\n            "}
                  <span style={{fontSize: "14px", color: "#5F574B"}}>
                    {I(vals.od?.courierLine)}
                  </span>
                  {"\n          "}
                </div>
                {"\n          "}
                <div style={{display: "flex", flexDirection: "column"}}>
                  {"\n            "}
                  {L(vals.od?.steps).map((st, i0) => (
                    <Fragment key={i0}>
                      {"\n              "}
                      <div style={{display: "flex", gap: "18px"}}>
                        {"\n                "}
                        <div style={{flex: "none", width: "14px", display: "flex", flexDirection: "column", alignItems: "center"}}>
                          {"\n                  "}
                          <span style={css(`width:11px;height:11px;border-radius:50%;margin-top:5px;box-sizing:border-box;background:${S(st?.fill)};border:1.5px solid ${S(st?.ring)}`)} />
                          {"\n                  "}
                          <span style={css(`flex:1;width:0;border-left:1.5px dashed ${S(st?.line)};margin:4px 0;min-height:22px`)} />
                          {"\n                "}
                        </div>
                        {"\n                "}
                        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "4px 16px", flex: "1", paddingBottom: "20px"}}>
                          {"\n                  "}
                          <span style={css(`font-size:16px;color:${S(st?.ink)}`)}>
                            {I(st?.label)}
                          </span>
                          {"\n                  "}
                          <span style={{fontSize: "14px", color: "#5F574B"}}>
                            {I(st?.when)}
                          </span>
                          {"\n                "}
                        </div>
                        {"\n              "}
                      </div>
                      {"\n            "}
                    </Fragment>
                  ))}
                  {"\n          "}
                </div>
                {"\n          "}
                <a href={vals.od?.trackUrl} target="_blank" rel="noopener" style={{alignSelf: "flex-start", fontSize: "14px", color: "#7E5232", backgroundImage: "repeating-linear-gradient(90deg, #7E5232 0 5px, transparent 5px 8px)", backgroundRepeat: "no-repeat", backgroundPosition: "0 100%", backgroundSize: "100% 1.5px", paddingBottom: "3px"}}>
                  {"Track with our delivery partner →"}
                </a>
                {"\n          "}
                {vals.devNotes ? (
                  <>
                  <span style={{alignSelf: "flex-start", fontSize: "11px", letterSpacing: ".06em", color: "#7E5232", background: "#FBF6EC", border: "1px dashed #C8925E", borderRadius: "4px", padding: "6px 8px"}}>
                    {"fulfillments { trackingInformation { company number url } events { status happenedAt } } · synced by the delivery partner's Shopify app"}
                  </span>
                  </>
                ) : null}
                {"\n        "}
              </section>
              {"\n        "}
              <section style={{display: "flex", flexDirection: "column"}}>
                {"\n          "}
                <h2 style={{margin: "0 0 14px", fontFamily: "'Marcellus',serif", fontWeight: "400", fontSize: "clamp(26px,2.6vw,34px)"}}>
                  {"In this order"}
                </h2>
                {"\n          "}
                <div style={{display: "flex", flexDirection: "column", borderBottom: "1.5px dashed rgba(126,82,50,.28)"}}>
                  {"\n            "}
                  {L(vals.od?.items).map((it, i0) => (
                    <Fragment key={i0}>
                      {"\n              "}
                      <div style={{display: "flex", gap: "20px", alignItems: "center", padding: "22px 0", borderTop: "1.5px dashed rgba(126,82,50,.28)"}}>
                        {"\n                "}
                        <div style={css(`flex:none;width:76px;height:94px;background-color:${S(it?.tint)};background-image:${S(it?.bg)};background-size:cover;background-position:center`)} />
                        {"\n                "}
                        <div style={{flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "6px"}}>
                          {"\n                  "}
                          <span style={{fontFamily: "'Marcellus',serif", fontSize: "21px"}}>
                            {I(it?.name)}
                          </span>
                          {"\n                  "}
                          <span style={{fontSize: "14px", lineHeight: "1.5", color: "#5F574B"}}>
                            {I(it?.opts)}
                          </span>
                          {"\n                  "}
                          <span style={{fontSize: "13px", color: "#5F574B"}}>
                            {"Qty "}{I(it?.qty)}
                          </span>
                          {"\n                "}
                        </div>
                        {"\n                "}
                        <span style={{flex: "none", fontSize: "16px"}}>
                          {I(it?.price)}
                        </span>
                        {"\n              "}
                      </div>
                      {"\n            "}
                    </Fragment>
                  ))}
                  {"\n          "}
                </div>
                {"\n        "}
              </section>
              {"\n      "}
            </div>
            {"\n\n      "}
            <aside style={css(`flex:4 1 320px;min-width:0;position:${S(vals.odAsidePos)};top:88px;display:flex;flex-direction:column;gap:26px`)}>
              {"\n        "}
              <div style={{display: "flex", flexDirection: "column", gap: "14px", padding: "26px", backgroundColor: "#EAE2D4", outline: "1px dashed rgba(126,82,50,.45)", outlineOffset: "-8px"}}>
                {"\n          "}
                <span style={{fontFamily: "'Marcellus',serif", fontSize: "24px"}}>
                  {I(vals.od?.retTitle)}
                </span>
                {"\n          "}
                <span style={{fontSize: "15px", lineHeight: "1.6", fontWeight: "300", color: "#3B342B"}}>
                  {I(vals.od?.retText)}
                </span>
                {"\n          "}
                {vals.od?.retCan ? (
                  <>
                  {"\n            "}
                  <button onClick={vals.acRetToggle} style={{background: "transparent", color: "#221E18", border: "1px solid rgba(34,30,24,.35)", borderRadius: "999px", letterSpacing: ".04em", cursor: "pointer", transition: "border-color .35s,background .35s", height: "48px", fontSize: "14px", marginTop: "4px"}} className="scp6">
                    {I(vals.acRetToggleLabel)}
                  </button>
                  {"\n            "}
                  <div style={css(`display:grid;grid-template-rows:${S(vals.acRetRows)};transition:grid-template-rows .6s cubic-bezier(.2,.7,.2,1)`)}>
                    {"\n              "}
                    <div style={{overflow: "hidden"}}>
                      {"\n                "}
                      <div style={{display: "flex", flexDirection: "column", gap: "16px", paddingTop: "10px"}}>
                        {"\n                  "}
                        {L(vals.od?.retSteps).map((r, i0) => (
                          <Fragment key={i0}>
                            {"\n                    "}
                            <div style={{display: "flex", gap: "14px", paddingTop: "14px", borderTop: "1.5px dashed rgba(126,82,50,.28)"}}>
                              {"\n                      "}
                              <span style={{flex: "none", fontFamily: "'Marcellus',serif", fontSize: "20px", color: "#7E5232", width: "18px"}}>
                                {I(r?.n)}
                              </span>
                              {"\n                      "}
                              <div style={{display: "flex", flexDirection: "column", gap: "4px"}}>
                                <span style={{fontSize: "15px"}}>
                                  {I(r?.t)}
                                </span>
                                <span style={{fontSize: "14px", lineHeight: "1.55", fontWeight: "300", color: "#3B342B"}}>
                                  {I(r?.b)}
                                </span>
                              </div>
                              {"\n                    "}
                            </div>
                            {"\n                  "}
                          </Fragment>
                        ))}
                        {"\n                  "}
                        <a href={vals.od?.mailto} style={{display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#221E18", backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,.07) 0 1px, transparent 1px 3px),linear-gradient(180deg, rgba(255,255,255,.1), rgba(0,0,0,.18))", color: "#F4EFE6", border: "0", borderRadius: "999px", outline: "1px dashed rgba(244,239,230,.42)", outlineOffset: "-5px", letterSpacing: ".05em", cursor: "pointer", transition: "background-color .5s,outline-offset .4s,transform .3s", height: "52px", fontSize: "14px", textDecoration: "none", marginTop: "6px"}} className="scpa">
                          {"Email the video"}
                        </a>
                        {"\n                  "}
                        <button onClick={vals.acRetSent} style={{alignSelf: "center", background: "none", border: "0", padding: "4px 0", cursor: "pointer", fontSize: "14px", color: "#7E5232", backgroundImage: "repeating-linear-gradient(90deg, #7E5232 0 5px, transparent 5px 8px)", backgroundRepeat: "no-repeat", backgroundPosition: "0 100%", backgroundSize: "0% 1.5px", transition: "background-size .6s cubic-bezier(.2,.7,.2,1)"}}>
                          {"I have emailed the video"}
                        </button>
                        {"\n                "}
                      </div>
                      {"\n              "}
                    </div>
                    {"\n            "}
                  </div>
                  {"\n          "}
                  </>
                ) : null}
                {"\n          "}
                {vals.devNotes ? (
                  <>
                  <span style={{alignSelf: "flex-start", fontSize: "11px", letterSpacing: ".06em", color: "#7E5232", background: "#FBF6EC", border: "1px dashed #C8925E", borderRadius: "4px", padding: "6px 8px"}}>
                    {"Return button shown only while delivered and within 7 days of fulfillment deliveredAt. Request = email; tag order \"return-requested\" in admin."}
                  </span>
                  </>
                ) : null}
                {"\n        "}
              </div>
              {"\n        "}
              <div style={{display: "flex", flexDirection: "column"}}>
                {"\n          "}
                {L(vals.od?.facts).map((f, i0) => (
                  <Fragment key={i0}>
                    {"\n            "}
                    <div style={{display: "flex", flexDirection: "column", gap: "5px", padding: "16px 0", borderTop: "1.5px dashed rgba(126,82,50,.28)"}}>
                      {"\n              "}
                      <span style={{fontSize: "12px", letterSpacing: ".14em", textTransform: "uppercase", color: "#6B4528"}}>
                        {I(f?.k)}
                      </span>
                      {"\n              "}
                      <span style={{fontSize: "15px", lineHeight: "1.55", color: "#221E18"}}>
                        {I(f?.v)}
                      </span>
                      {"\n            "}
                    </div>
                    {"\n          "}
                  </Fragment>
                ))}
                {"\n          "}
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "18px 0", borderTop: "1.5px dashed rgba(126,82,50,.28)", borderBottom: "1.5px dashed rgba(126,82,50,.28)"}}>
                  {"\n            "}
                  <span style={{fontSize: "15px"}}>
                    {"Total "}
                    <span style={{fontSize: "13px", color: "#5F574B"}}>
                      {"· inclusive of GST"}
                    </span>
                  </span>
                  {"\n            "}
                  <span style={{fontFamily: "'Marcellus',serif", fontSize: "24px"}}>
                    {I(vals.od?.total)}
                  </span>
                  {"\n          "}
                </div>
                {"\n        "}
              </div>
              {"\n        "}
              <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "12px", fontSize: "14px"}}>
                {"\n          "}
                <a href="#" style={{color: "#7E5232"}}>
                  {"Download invoice"}
                </a>
                {"\n          "}
                <a href="mailto:contact@dailyloom.in" style={{color: "#7E5232"}}>
                  {"contact@dailyloom.in"}
                </a>
                {"\n        "}
              </div>
              {"\n      "}
            </aside>
            {"\n    "}
          </div>
          {"\n  "}
          </>
        ) : null}
      </main>
    </>
  );
}
