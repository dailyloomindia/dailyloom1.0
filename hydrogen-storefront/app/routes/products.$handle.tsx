import type {LoaderFunctionArgs, MetaFunction} from '@shopify/remix-oxygen';
import {useLoaderData, Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';
import {ProductStory} from '~/components/product/ProductStory';
import {getProductStoryContent} from '~/data/productStoryContent';
import productStoryStyles from '~/styles/product-story.css?url';

export function links() {
  return [{rel: 'stylesheet', href: productStoryStyles}];
}

export const meta: MetaFunction<typeof loader> = ({data}) => {
  const product = data?.product;
  return [
    {title: `${product?.title || 'Product'} | Daily Loom`},
    {name: 'description', content: product?.description?.slice(0, 160) || 'Premium handloom textile'},
  ];
};

export async function loader({params, context}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Response('Product not found', {status: 404});
  }

  const {product} = await storefront.query(PRODUCT_QUERY, {
    variables: {handle},
  });

  if (!product) {
    throw new Response('Product not found', {status: 404});
  }

  // Get related products
  const collectionHandle = product.collections?.nodes?.[0]?.handle || 'all';
  const {collection} = await storefront.query(RELATED_PRODUCTS_QUERY, {
    variables: {handle: collectionHandle},
  });

  const relatedProducts =
    collection?.products?.nodes?.filter((p: any) => p.id !== product.id).slice(0, 4) || [];

  return {product, relatedProducts};
}

// Cart mutations happen on the dedicated Buy page (/products/[handle]/buy)
// now — this route is the read-only story/overview page, so it has no
// action of its own.

export default function ProductPage() {
  const {product, relatedProducts} = useLoaderData<typeof loader>();
  const content = getProductStoryContent(product.productType, product.title);

  return (
    <>
      <ProductStory product={product} content={content} />

      {relatedProducts.length > 0 && (
        <section className="py-12 md:py-20 bg-[#FFF9F3]">
          <div className="max-w-[1100px] mx-auto px-4 md:px-6">
            <h2 className="font-['Playfair_Display'] text-[clamp(24px,4vw,32px)] text-[#1A1A1A] text-center mb-10 font-light">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p: any, index: number) => (
                <RelatedProductCard key={p.id} product={p} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function RelatedProductCard({product, index}: {product: any; index: number}) {
  return (
    <article
      className="group fade-in-up"
      style={{animationDelay: `${index * 50}ms`}}
    >
      <Link to={`/products/${product.handle}`} className="block">
        <div className="relative aspect-[3/4] bg-[#f5f0eb] overflow-hidden mb-3">
          {product.featuredImage && (
            <Image
              data={product.featuredImage}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(min-width: 1024px) 25vw, 50vw"
            />
          )}
        </div>
        <h3 className="font-['Playfair_Display'] text-[15px] text-[#1A1A1A] group-hover:text-[#6B8E72] transition-colors line-clamp-2">
          {product.title}
        </h3>
        <Money
          data={product.priceRange.minVariantPrice}
          className="text-[14px] text-[#1A1A1A] font-medium mt-1"
        />
      </Link>
    </article>
  );
}

const PRODUCT_QUERY = `#graphql
  query Product($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      productType
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        nodes {
          url
          altText
          width
          height
        }
      }
      options {
        name
        optionValues {
          name
        }
      }
      variants(first: 20) {
        nodes {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
        }
      }
      collections(first: 1) {
        nodes {
          title
          handle
        }
      }
      availableForSale
    }
  }
`;

const RELATED_PRODUCTS_QUERY = `#graphql
  query RelatedProducts($handle: String!) {
    collection(handle: $handle) {
      products(first: 5) {
        nodes {
          id
          title
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          featuredImage {
            url
            altText
          }
        }
      }
    }
  }
`;
