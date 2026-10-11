import {Image} from '@shopify/hydrogen';
import type {LoomImage as LoomImageData} from '~/lib/loom';

/** Fills its positioned parent. Shopify CDN images get a responsive srcset;
 * a missing image falls back to the satin weave instead of an empty box. */
export function LoomImage({
  image,
  alt,
  sizes,
  eager = false,
}: {
  image: LoomImageData | null | undefined;
  alt: string;
  sizes: string;
  eager?: boolean;
}) {
  if (!image?.url) {
    return (
      <div className="lm-texture" role="img" aria-label={alt}>
        <div className="lm-texture__mark">
          <img src="/images/v3/logo-mark-128.webp" alt="" width={120} height={128} />
        </div>
      </div>
    );
  }
  return (
    <Image
      data={{
        url: image.url,
        altText: image.altText || alt,
        width: image.width ?? undefined,
        height: image.height ?? undefined,
      }}
      sizes={sizes}
      loading={eager ? 'eager' : 'lazy'}
      className="lm-fill"
    />
  );
}
