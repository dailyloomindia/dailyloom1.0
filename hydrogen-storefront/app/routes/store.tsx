// /store[?type=<type>]: the earlier theme's shop page, moved to this site's collection pages.
import {redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {STORE_TYPES} from '~/dl/seo/legacy';

export async function loader({request}: LoaderFunctionArgs) {
  const type = (new URL(request.url).searchParams.get('type') || '').trim().toLowerCase();
  return redirect(STORE_TYPES[type] || '/', 301);
}
