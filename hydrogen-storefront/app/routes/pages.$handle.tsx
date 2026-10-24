// /pages/<handle>: the earlier theme's pages, moved to this site's equivalents.
import {redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {PAGES} from '~/dl/seo/legacy';

export async function loader({params}: LoaderFunctionArgs) {
  const to = PAGES[params.handle || ''];
  if (!to) throw new Response('Not found', {status: 404});
  return redirect(to, 301);
}
