import type { EntryContext, AppLoadContext } from "@shopify/remix-oxygen";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  context: AppLoadContext
) {
  const body = await renderToReadableStream(
    <RemixServer context={remixContext} url={request.url} />,
    {
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      },
    }
  );

  if (isbot(request.headers.get("user-agent"))) {
    await body.allReady;
  }

  responseHeaders.set("Content-Type", "text/html");
  // No other site may show these pages in a frame (stops click-jacking), plugins and <base> tricks are off,
  // and the camera, microphone and location are never asked for.
  responseHeaders.set("Content-Security-Policy", "frame-ancestors 'self'; base-uri 'self'; object-src 'none'");
  responseHeaders.set("X-Frame-Options", "SAMEORIGIN");
  responseHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");
  responseHeaders.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
