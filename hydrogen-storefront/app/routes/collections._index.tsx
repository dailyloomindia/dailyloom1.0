// /collections on its own is not a page.
export async function loader() {
  throw new Response('Not found', {status: 404});
}

export default function Collections() {
  return null;
}
