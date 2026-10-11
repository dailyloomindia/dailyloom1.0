import {redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';

/** Options, quantity and add-to-bag now live on the product page itself;
 * keep old /buy links working. */
export async function loader({params, request}: LoaderFunctionArgs) {
  const variant = new URL(request.url).searchParams.get('variant');
  const qs = variant ? `?variant=${encodeURIComponent(variant)}` : '';
  return redirect(`/products/${params.handle}${qs}`, 301);
}
