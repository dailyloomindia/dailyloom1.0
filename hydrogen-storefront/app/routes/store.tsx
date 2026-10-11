import type {LoaderFunctionArgs, MetaFunction} from '@shopify/remix-oxygen';
import {useLoaderData, useSearchParams, Link} from '@remix-run/react';
import {Image, getPaginationVariables, Pagination, Money} from '@shopify/hydrogen';
import {useState} from 'react';

export const meta: MetaFunction = () => {
  return [
    {title: 'Store | Daily Loom'},
    {name: 'description', content: 'Shop our complete collection of premium handloom textiles. 100% pure cotton bedsheets, duvets, and towels.'},
  ];
};

export async function loader({context, request}: LoaderFunctionArgs) {
  const {storefront} = context;
  const url = new URL(request.url);
  const sortKey = url.searchParams.get('sort') || 'BEST_SELLING';
  const reverse = url.searchParams.get('reverse') === 'true';
  const productType = url.searchParams.get('type') || '';

  const paginationVariables = getPaginationVariables(request, {
    pageBy: 12,
  });

  // Build query string for filtering by product type
  const query = productType ? `product_type:${productType}` : '';

  const {products} = await storefront.query(PRODUCTS_QUERY, {
    variables: {
      query,
      sortKey,
      reverse,
      ...paginationVariables,
    },
  });

  // Get available product types for filtering
  const {productTypes} = await storefront.query(PRODUCT_TYPES_QUERY);

  return {
    products,
    productTypes: productTypes?.edges?.map((e: any) => e.node) || [],
    currentType: productType,
  };
}

export default function StorePage() {
  const {products, productTypes, currentType} = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const sortOptions = [
    {label: 'Best Selling', value: 'BEST_SELLING', reverse: false},
    {label: 'Price: Low to High', value: 'PRICE', reverse: false},
    {label: 'Price: High to Low', value: 'PRICE', reverse: true},
    {label: 'Newest', value: 'CREATED_AT', reverse: true},
    {label: 'A-Z', value: 'TITLE', reverse: false},
  ];

  const currentSort = sortOptions.find(
    (opt) =>
      opt.value === (searchParams.get('sort') || 'BEST_SELLING') &&
      opt.reverse === (searchParams.get('reverse') === 'true'),
  );

  const handleSort = (option: (typeof sortOptions)[0]) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', option.value);
    params.set('reverse', String(option.reverse));
    setSearchParams(params);
    setSortOpen(false);
  };

  const handleFilter = (type: string) => {
    const params = new URLSearchParams(searchParams);
    if (type) {
      params.set('type', type);
    } else {
      params.delete('type');
    }
    setSearchParams(params);
    setFilterOpen(false);
  };

  const productNodes = products?.nodes || [];

  return (
    <div className="pt-[56px]">
      {/* Store Hero */}
      <section className="py-16 md:py-24 bg-[#FFF9F3]">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6">
          <div className="max-w-2xl fade-in-up">
            <span className="inline-block text-[10px] uppercase tracking-[0.15em] text-[#6B8E72] mb-4 font-medium">
              Our Store
            </span>
            <h1 className="font-['Playfair_Display'] text-[clamp(32px,5vw,48px)] text-[#1A1A1A] mb-4 font-light leading-tight">
              Premium Home Textiles
            </h1>
            <p className="text-[#666666] leading-relaxed text-[15px]">
              100% pure cotton, handcrafted with care. Each piece is designed to bring comfort and elegance to your home.
            </p>
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <section className="border-b border-[rgba(0,0,0,0.06)] sticky top-[56px] bg-[rgba(255,249,243,0.97)] backdrop-blur-[12px] z-30">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="flex items-center gap-2 text-[13px] text-[#2B2B2B] hover:text-[#6B8E72] transition-colors"
                >
                  Filter{currentType && `: ${currentType}`}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {filterOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setFilterOpen(false)} />
                    <div className="absolute left-0 top-full mt-2 w-48 bg-[#FFF9F3] border border-[rgba(0,0,0,0.08)] shadow-lg z-50 rounded-md overflow-hidden">
                      <button
                        onClick={() => handleFilter('')}
                        className={`block w-full text-left px-4 py-3 text-[13px] hover:bg-[rgba(0,0,0,0.03)] transition-colors ${
                          !currentType ? 'text-[#6B8E72] font-medium' : 'text-[#2B2B2B]'
                        }`}
                      >
                        All Products
                      </button>
                      {productTypes.map((type: string) => (
                        <button
                          key={type}
                          onClick={() => handleFilter(type)}
                          className={`block w-full text-left px-4 py-3 text-[13px] hover:bg-[rgba(0,0,0,0.03)] transition-colors ${
                            currentType === type ? 'text-[#6B8E72] font-medium' : 'text-[#2B2B2B]'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <span className="text-[13px] text-[#999]">|</span>
              <span className="text-[13px] text-[#666666]">
                {productNodes.length} Products
              </span>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 text-[13px] text-[#2B2B2B] hover:text-[#6B8E72] transition-colors"
              >
                Sort: {currentSort?.label || 'Best Selling'}
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
          {productNodes.length > 0 ? (
            <Pagination connection={products}>
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
          ) : (
            <div className="text-center py-16 fade-in-up">
              <div className="w-20 h-20 mx-auto mb-6 bg-[#f5f0eb] rounded-full flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.2">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <h2 className="font-['Playfair_Display'] text-[24px] text-[#1A1A1A] mb-4">
                No products found
              </h2>
              <p className="text-[#666666] mb-8 text-[15px]">
                {currentType
                  ? `No products found in "${currentType}" category.`
                  : 'Products will appear here once added to your store.'}
              </p>
              {currentType && (
                <button
                  onClick={() => handleFilter('')}
                  className="inline-block px-8 py-3 bg-[#1A1A1A] text-[#FFF9F3] text-[13px] font-medium tracking-wide uppercase hover:bg-[#2B2B2B] transition-colors"
                >
                  View All Products
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-12 bg-[#FFF9F3] border-t border-[rgba(0,0,0,0.06)]">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6">
          <h3 className="font-['Playfair_Display'] text-[20px] text-[#1A1A1A] text-center mb-8">
            Shop by Category
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['Bedsheets', 'Duvets', 'Towels', 'Pillows'].map((category) => (
              <button
                key={category}
                onClick={() => handleFilter(category)}
                className={`px-6 py-3 border text-[13px] transition-colors ${
                  currentType === category
                    ? 'border-[#1A1A1A] bg-[#1A1A1A] text-[#FFF9F3]'
                    : 'border-[#ccc] hover:border-[#1A1A1A]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
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

          {/* Quick View */}
          <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="block w-full py-2 bg-white/95 text-[#1A1A1A] text-center text-[12px] font-medium tracking-wide">
              View Details
            </span>
          </div>
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

const PRODUCTS_QUERY = `#graphql
  query Products(
    $query: String
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
    $sortKey: ProductSortKeys
    $reverse: Boolean
  ) {
    products(
      query: $query
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
`;

const PRODUCT_TYPES_QUERY = `#graphql
  query ProductTypes {
    productTypes(first: 20) {
      edges {
        node
      }
    }
  }
`;
