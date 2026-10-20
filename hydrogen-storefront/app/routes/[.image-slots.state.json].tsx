// Image-slot crop sidecar fetched by /image-slot.js, served unchanged.
import state from '~/design/.image-slots.state.json?raw';

export async function loader() {
  return new Response(state, {
    headers: {'Content-Type': 'application/json; charset=utf-8'},
  });
}
