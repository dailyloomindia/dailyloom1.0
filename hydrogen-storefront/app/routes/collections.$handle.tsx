import type {LoaderFunctionArgs, MetaFunction} from '@shopify/remix-oxygen';
import {useLoaderData, useSearchParams} from '@remix-run/react';
import {Image, getPaginationVariables, Pagination} from '@shopify/hydrogen';
import {motion} from 'framer-motion';
import {useState} from 'react';
import {fadeInUp, staggerContainer} from '~/components/animations/PageTransition';
import {ProductCard} from '~/components/product/ProductCard';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  const collection = data?.collection;
  return [
    {title: `${collection?.title || 'Collection'} | Daily Loom`},
    {name: 'description', content: collection?.description || ''},
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

  return {collection};
}

export default function CollectionPage() {
  const {collection} = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
  };

  return (
    <div className="pt-24">
      {/* Collection Hero */}
      <section className="relative py-16 md:py-24 bg-cream-100 overflow-hidden">
        {collection.image && (
          <div className="absolute inset-0 opacity-20">
            <Image
              data={collection.image}
              className="w-full h-full object-cover"
              sizes="100vw"
            />
          </div>
        )}
        <div className="container-premium relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="max-w-2xl"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block text-2xs uppercase tracking-extra-wide text-primary-600 mb-4"
            >
              Collection
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="font-display text-display-lg text-charcoal-950 mb-4"
            >
              {collection.title}
            </motion.h1>
            {collection.description && (
              <motion.p
                variants={fadeInUp}
                className="text-charcoal-600 leading-relaxed"
              >
                {collection.description}
              </motion.p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Toolbar */}
      <section className="border-b border-charcoal-100 sticky top-20 md:top-24 bg-cream-50/95 backdrop-blur-md z-30">
        <div className="container-premium py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 text-sm text-charcoal-700 hover:text-charcoal-950 transition-colors lg:hidden"
              >
                <FilterIcon />
                Filters
              </button>
              <span className="text-sm text-charcoal-500">
                {collection.products?.nodes?.length || 0} Products
              </span>
            </div>

            {/* Sort Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 text-sm text-charcoal-700 hover:text-charcoal-950 transition-colors">
                Sort: {currentSort?.label || 'Featured'}
                <ChevronIcon />
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-cream-50 border border-charcoal-100 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-40">
                {sortOptions.map((option) => (
                  <button
                    key={`${option.value}-${option.reverse}`}
                    onClick={() => handleSort(option)}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-charcoal-50 transition-colors ${
                      currentSort?.label === option.label
                        ? 'text-primary-600'
                        : 'text-charcoal-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding">
        <div className="container-premium">
          <Pagination connection={collection.products}>
            {({nodes, isLoading, NextLink, PreviousLink}) => (
              <>
                <div className="flex justify-center mb-8">
                  <PreviousLink className="px-6 py-2 border border-charcoal-300 text-sm hover:bg-charcoal-50 transition-colors">
                    {isLoading ? 'Loading...' : 'Load Previous'}
                  </PreviousLink>
                </div>

                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{once: true}}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
                >
                  {nodes.map((product: any, index: number) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </motion.div>

                <div className="flex justify-center mt-12">
                  <NextLink className="btn-secondary">
                    {isLoading ? 'Loading...' : 'Load More'}
                  </NextLink>
                </div>
              </>
            )}
          </Pagination>
        </div>
      </section>
    </div>
  );
}

function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6 9 12 15 18 9" />
    </svg>
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
          images(first: 2) {
            nodes {
              url
              altText
            }
          }
          tags
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
