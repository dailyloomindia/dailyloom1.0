// Any path without a route is a 404.
export async function loader() {
  throw new Response('Not found', {status: 404});
}

export default function NotFound() {
  return null;
}
