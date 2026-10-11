import type {LoaderFunctionArgs, MetaFunction} from '@shopify/remix-oxygen';
import {useLoaderData, Link, useSearchParams, Form} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';
import {useState} from 'react';

export const meta: MetaFunction = () => {
  return [
    {title: 'Search | Daily Loom'},
    {name: 'description', content: 'Search our collection of premium handloom textiles'},
  ];
};

export async function loader({request, context}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get('q') || '';
  const {storefront} = context;

  if (!query) {
    return {searchResults: null, query: ''};
  }

  const {products} = await storefront.query(SEARCH_QUERY, {
    variables: {query, first: 20},
  });

  return {
    searchResults: products?.nodes || [],
    query,
  };
}

export default function SearchPage() {
  const {searchResults, query} = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(query || '');

  return (
    <div className="pt-[56px] min-h-screen">
      {/* Search Header */}
      <section className="py-12 md:py-16 bg-[#FFF9F3]">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6">
          <div className="max-w-xl mx-auto text-center fade-in-up">
            <h1 className="font-['Playfair_Display'] text-[clamp(28px,5vw,40px)] text-[#1A1A1A] mb-6 font-light">
              Search
            </h1>

            <Form method="get" className="relative">
              <input
                type="search"
                name="q"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search for bedsheets, duvets, towels..."
                className="w-full px-5 py-4 pr-12 text-[15px] bg-white border border-[rgba(0,0,0,0.1)] focus:border-[#6B8E72] focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666666] hover:text-[#1A1A1A] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>
            </Form>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 md:py-20">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6">
          {query && (
            <p className="text-[14px] text-[#666666] mb-8 fade-in-up">
              {searchResults && searchResults.length > 0 ? (
                <>
                  Showing {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{query}"
                </>
              ) : (
                <>No results found for "{query}"</>
              )}
            </p>
          )}

          {searchResults && searchResults.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {searchResults.map((product: any, index: number) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-16 fade-in-up">
              <div className="w-20 h-20 mx-auto mb-6 bg-[#f5f0eb] rounded-full flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <h2 className="font-['Playfair_Display'] text-[24px] text-[#1A1A1A] mb-4">
                No products found
              </h2>
              <p className="text-[#666666] mb-8 text-[15px]">
                Try searching with different keywords or browse our collections.
              </p>
              <Link
                to="/collections/all"
                className="inline-block px-8 py-3 bg-[#1A1A1A] text-[#FFF9F3] text-[13px] font-medium tracking-wide uppercase hover:bg-[#2B2B2B] transition-colors"
              >
                View All Products
              </Link>
            </div>
          ) : (
            <div className="text-center py-16 fade-in-up">
              <p className="text-[#666666] text-[15px] mb-8">
                Enter a search term to find products.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {['Bedsheets', 'Duvets', 'Towels', 'Cotton'].map((term) => (
                  <Link
                    key={term}
                    to={`/search?q=${term}`}
                    className="px-4 py-2 border border-[#ccc] text-[13px] text-[#666666] hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors"
                  >
                    {term}
                  </Link>
                ))}
              </div>
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

          {isOnSale && (
            <span className="absolute top-3 left-3 px-2 py-1 bg-[#6B8E72] text-white text-[10px] uppercase tracking-wide">
              Sale
            </span>
          )}

          {!availableForSale && (
            <span className="absolute top-3 left-3 px-2 py-1 bg-[#999] text-white text-[10px] uppercase tracking-wide">
              Sold Out
            </span>
          )}
        </div>

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

const SEARCH_QUERY = `#graphql
  query SearchProducts($query: String!, $first: Int) {
    products(first: $first, query: $query) {
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
    }
  }
`;
