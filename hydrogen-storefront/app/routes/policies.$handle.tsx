// A store policy written in Shopify admin (Settings → Policies): /policies/privacy-policy,
// /policies/terms-of-service, /policies/refund-policy, /policies/shipping-policy.
import {useLoaderData} from '@remix-run/react';
import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {seo} from '~/dl/seo/meta';

const FIELD: Record<string, string> = {
  'privacy-policy': 'privacyPolicy', 'terms-of-service': 'termsOfService', 'refund-policy': 'refundPolicy', 'shipping-policy': 'shippingPolicy',
};

const POLICY_QUERY = `#graphql
  query DlPolicy($privacy: Boolean!, $terms: Boolean!, $refund: Boolean!, $shipping: Boolean!) {
    shop {
      privacyPolicy @include(if: $privacy) { title body }
      termsOfService @include(if: $terms) { title body }
      refundPolicy @include(if: $refund) { title body }
      shippingPolicy @include(if: $shipping) { title body }
    }
  }`;

export async function loader({params, context}: LoaderFunctionArgs) {
  const field = FIELD[params.handle || ''];
  if (!field) throw new Response('Not found', {status: 404});
  const {shop} = await (context as any).storefront.query(POLICY_QUERY, {
    variables: {privacy: field === 'privacyPolicy', terms: field === 'termsOfService', refund: field === 'refundPolicy', shipping: field === 'shippingPolicy'},
  });
  const policy = shop && shop[field];
  if (!policy || !policy.body) throw new Response('Not found', {status: 404});
  return json({title: policy.title as string, body: policy.body as string});
}

export const meta = ({data, params}: any) => seo({title: data ? data.title : undefined, path: '/policies/' + params.handle});

// The policy text in the Help page's type: Marcellus headings, light Jost body.
const POLICY_CSS = `
.dl-policy{max-width:760px;font-size:17px;line-height:1.7;font-weight:300;color:#5F574B}
.dl-policy h2,.dl-policy h3{margin:48px 0 14px;font-family:'Marcellus',serif;font-weight:400;font-size:clamp(26px,2.4vw,34px);line-height:1.15;color:#221E18}
.dl-policy h3{font-size:clamp(21px,1.8vw,25px)}
.dl-policy p,.dl-policy ul,.dl-policy ol{margin:0 0 16px}
.dl-policy ul,.dl-policy ol{padding-left:22px}
.dl-policy li{margin-bottom:6px}
.dl-policy strong,.dl-policy b{font-weight:500;color:#221E18}
.dl-policy a{color:#7E5232;word-break:break-word}
`;

export default function Policy() {
  const {title, body} = useLoaderData<typeof loader>();
  return (
    <main data-screen-label="Policy" style={{padding: 'clamp(120px,14vw,190px) clamp(20px,5vw,80px) clamp(60px,8vw,100px)', display: 'flex', flexDirection: 'column', gap: 'clamp(48px,6vw,80px)'}}>
      <style dangerouslySetInnerHTML={{__html: POLICY_CSS}} />
      <div style={{display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '760px'}}>
        <span style={{display: 'inline-flex', alignSelf: 'flex-start', padding: '7px 12px 6px', backgroundColor: '#E9DCC3', backgroundImage: 'repeating-linear-gradient(90deg, rgba(126,82,50,.14) 0 1px, transparent 1px 2.5px)', outline: '1px dashed rgba(126,82,50,.5)', outlineOffset: '-3px', fontSize: '11px', letterSpacing: '.24em', textTransform: 'uppercase', color: '#6B4528'}}>Policies</span>
        <h1 style={{margin: '0', fontFamily: "'Marcellus',serif", fontWeight: '400', fontSize: 'clamp(52px,7vw,112px)', lineHeight: '.98', letterSpacing: '-.015em'}}>{title}</h1>
      </div>
      <div className="dl-policy" dangerouslySetInnerHTML={{__html: body}} />
    </main>
  );
}
