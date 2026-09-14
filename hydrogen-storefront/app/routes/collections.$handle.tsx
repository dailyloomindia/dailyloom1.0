import {redirect, type LoaderFunctionArgs, type MetaFunction} from '@shopify/remix-oxygen';
import {useLoaderData, useSearchParams, Link} from '@remix-run/react';
import {Image, getPaginationVariables, Pagination, Money} from '@shopify/hydrogen';
import {useState} from 'react';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  const collection = data?.collection;
  return [
    {title: `${collection?.title || 'Collection'} | Daily Loom`},
    {name: 'description', content: collection?.description || 'Premium handloom textiles crafted with 100% pure cotton.'},
  ];
};

export async function loader({params, context, request}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;
  const url = new URL(request.url);
  const sortKey = url.searchParams.get('sort') || 'COLLECTION_DEFAULT';
  const reverse = url.searchParams.get('reverse') === 'true';

  const paginationVariables = getPaginationVariables(request, {
    pageBy: 12,
  });

  if (!handle) {
    throw new Response('Collection not found', {status: 404});
  }

  const {collection} = await storefront.query(COLLECTION_QUERY, {
    variables: {
      handle,
      sortKey,
      reverse,
      ...paginationVariables,
    },
  });

  if (!collection) {
    throw new Response('Collection not found', {status: 404});
  }

  // A category with exactly one product (Bedding, Duvets today) has no
  // real listing to browse — send visitors straight to that product instead
  // of a one-item grid they'd have to click through anyway. This self-heals
  // once a second product is added: pageInfo stops matching and the normal
  // collection grid takes over automatically, no manual re-wiring needed.
  const products = collection.products?.nodes || [];
  const pageInfo = collection.products?.pageInfo;
  if (
    products.length === 1 &&
    !pageInfo?.hasNextPage &&
    !pageInfo?.hasPreviousPage
  ) {
    throw redirect(`/products/${products[0].handle}`);
  }

  return {collection};
}

export default function CollectionPage() {
  const {collection} = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortOpen, setSortOpen] = useState(false);

  const sortOptions = [
    {label: 'Featured', value: 'COLLECTION_DEFAULT', reverse: false},
    {label: 'Price: Low to High', value: 'PRICE', reverse: false},
    {label: 'Price: High to Low', value: 'PRICE', reverse: true},
    {label: 'Newest', value: 'CREATED', reverse: true},
    {label: 'Best Selling', value: 'BEST_SELLING', reverse: false},
  ];

  const currentSort = sortOptions.find(
    (opt) =>
      opt.value === (searchParams.get('sort') || 'COLLECTION_DEFAULT') &&
      opt.reverse === (searchParams.get('reverse') === 'true'),
  );

  const handleSort = (option: (typeof sortOptions)[0]) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', option.value);
    params.set('reverse', String(option.reverse));
    setSearchParams(params);
    setSortOpen(false);
  };

  return (
    <div className="pt-[44px]">
      {/* Collection Hero */}
      <section className="relative py-16 md:py-24 bg-[#FFF9F3] overflow-hidden">
        {collection.image && (
          <div className="absolute inset-0 opacity-10">
            <Image
              data={collection.image}
              className="w-full h-full object-cover"
              sizes="100vw"
            />
          </div>
        )}
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-2xl fade-in-up">
            <span className="inline-block text-[10px] uppercase tracking-[0.15em] text-[#6B8E72] mb-4 font-medium">
              Collection
            </span>
            <h1 className="font-['Playfair_Display'] text-[clamp(32px,5vw,48px)] text-[#1A1A1A] mb-4 font-light leading-tight">
              {collection.title}
            </h1>
            {collection.description && (
              <p className="text-[#666666] leading-relaxed text-[15px]">
                {collection.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <section className="border-b border-[rgba(0,0,0,0.06)] sticky top-[44px] bg-[rgba(255,249,243,0.97)] backdrop-blur-[12px] z-30">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-[#666666]">
              {collection.products?.nodes?.length || 0} Products
            </span>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 text-[13px] text-[#2B2B2B] hover:text-[#6B8E72] transition-colors"
              >
                Sort: {currentSort?.label || 'Featured'}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {sortOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setSortOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-48 bg-[#FFF9F3] border border-[rgba(0,0,0,0.08)] shadow-lg z-50 rounded-md overflow-hidden">
                    {sortOptions.map((option) => (
                      <button
                        key={`${option.value}-${option.reverse}`}
                        onClick={() => handleSort(option)}
                        className={`block w-full text-left px-4 py-3 text-[13px] hover:bg-[rgba(0,0,0,0.03)] transition-colors ${
                          currentSort?.label === option.label
                            ? 'text-[#6B8E72] font-medium'
                            : 'text-[#2B2B2B]'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 md:py-20">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6">
          <Pagination connection={collection.products}>
            {({nodes, isLoading, NextLink}) => (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {nodes.map((product: any, index: number) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>

                {nodes.length > 0 && (
                  <div className="flex justify-center mt-12">
                    <NextLink className="px-8 py-3 bg-[#1A1A1A] text-[#FFF9F3] text-[13px] font-medium tracking-wide hover:bg-[#2B2B2B] transition-colors">
                      {isLoading ? 'Loading...' : 'Load More'}
                    </NextLink>
                  </div>
                )}
              </>
            )}
          </Pagination>

          {collection.products?.nodes?.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#666666] mb-6">No products found in this collection.</p>
              <Link to="/collections/all" className="text-[#6B8E72] underline hover:no-underline">
                View all products
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function ProductCard({product, index}: {product: any; index: number}) {
  const {title, handle, priceRange, compareAtPriceRange, featuredImage, availableForSale = true} = product;

  const isOnSale =
    compareAtPriceRange?.minVariantPrice?.amount &&
    parseFloat(compareAtPriceRange.minVariantPrice.amount) >
      parseFloat(priceRange.minVariantPrice.amount);

  return (
    <article
      className="group fade-in-up"
      style={{animationDelay: `${index * 50}ms`}}
    >
      <Link to={`/products/${handle}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[3/4] bg-[#f5f0eb] overflow-hidden mb-3">
          {featuredImage ? (
            <Image
              data={featuredImage}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#999]">
              <span className="text-[13px]">No image</span>
            </div>
          )}

          {/* Sale Badge */}
          {isOnSale && (
            <span className="absolute top-3 left-3 px-2 py-1 bg-[#6B8E72] text-white text-[10px] uppercase tracking-wide">
              Sale
            </span>
          )}

          {/* Sold Out Badge */}
          {!availableForSale && (
            <span className="absolute top-3 left-3 px-2 py-1 bg-[#999] text-white text-[10px] uppercase tracking-wide">
              Sold Out
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-1">
          <h3 className="font-['Playfair_Display'] text-[15px] text-[#1A1A1A] group-hover:text-[#6B8E72] transition-colors line-clamp-2 leading-snug">
            {title}
          </h3>
          <div className="flex items-center gap-2">
            <Money
              data={priceRange.minVariantPrice}
              className="text-[14px] text-[#1A1A1A] font-medium"
            />
            {isOnSale && compareAtPriceRange && (
              <Money
                data={compareAtPriceRange.minVariantPrice}
                className="text-[13px] text-[#999] line-through"
              />
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}

const COLLECTION_QUERY = `#graphql
  query Collection(
    $handle: String!
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
  ) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      image {
        url
        altText
      }
      products(
        first: $first
        last: $last
        before: $startCursor
        after: $endCursor
        sortKey: $sortKey
        reverse: $reverse
      ) {
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
          compareAtPriceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          featuredImage {
            url
            altText
            width
            height
          }
          availableForSale
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
  }
`;
