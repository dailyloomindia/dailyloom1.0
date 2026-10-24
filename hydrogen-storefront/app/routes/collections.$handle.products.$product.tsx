// /collections/<collection>/products/<shopify handle>: the earlier theme's product address, moved to its buy page.
import {redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {productPath} from '~/dl/seo/legacy';

export async function loader({params}: LoaderFunctionArgs) {
  const to = productPath(params.product || '');
  if (!to) throw new Response('Not found', {status: 404});
  return redirect(to, 301);
}
