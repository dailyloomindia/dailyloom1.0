// 404 / error page body, built from v4 pieces (the Help page heading and the primary button).
import {useShell} from './Shell';

export function NotFoundView({notFound}: {notFound: boolean}) {
  const {base} = useShell();
  return (
    <main data-screen-label="Not found" style={{padding: 'clamp(120px,14vw,190px) clamp(20px,5vw,80px) clamp(60px,8vw,100px)', minHeight: '60vh', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '28px'}}>
      <span style={{display: 'inline-flex', alignSelf: 'flex-start', padding: '7px 12px 6px', backgroundColor: '#E9DCC3', backgroundImage: 'repeating-linear-gradient(90deg, rgba(126,82,50,.14) 0 1px, transparent 1px 2.5px)', outline: '1px dashed rgba(126,82,50,.5)', outlineOffset: '-3px', fontSize: '11px', letterSpacing: '.24em', textTransform: 'uppercase', color: '#6B4528'}}>{notFound ? '404' : 'Error'}</span>
      <h1 style={{margin: '0', fontFamily: "'Marcellus',serif", fontWeight: '400', fontSize: 'clamp(52px,7vw,112px)', lineHeight: '.98', letterSpacing: '-.015em', maxWidth: '900px'}}>{notFound ? 'This page does not exist.' : 'Something went wrong.'}</h1>
      <button onClick={base.goHome} style={{alignSelf: 'flex-start', backgroundColor: '#221E18', backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,.07) 0 1px, transparent 1px 3px),linear-gradient(180deg, rgba(255,255,255,.1), rgba(0,0,0,.18))', color: '#F4EFE6', border: '0', borderRadius: '999px', outline: '1px dashed rgba(244,239,230,.42)', outlineOffset: '-5px', padding: '15px 28px', fontSize: '14px', letterSpacing: '.05em', cursor: 'pointer', transition: 'background-color .4s,outline-offset .4s,transform .3s'}} className="scp2 scp3">Return home</button>
    </main>
  );
}
