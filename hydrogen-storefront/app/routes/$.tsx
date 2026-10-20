// The v4 design is a single page that navigates internally, so every other
// path (old /collections, /products, /pages links) goes back to it.
import {redirect} from '@shopify/remix-oxygen';

export async function loader() {
  return redirect('/', 301);
}
