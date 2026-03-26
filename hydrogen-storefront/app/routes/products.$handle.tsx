import type {LoaderFunctionArgs, MetaFunction, ActionFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, Link, useFetcher} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';
import {useState} from 'react';

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

export async function action({request, context}: ActionFunctionArgs) {
  const formData = await request.formData();
  const variantId = formData.get('variantId') as string;
  const quantity = parseInt(formData.get('quantity') as string) || 1;

  const {cart} = context;

  const result = await cart.addLines([
    {merchandiseId: variantId, quantity},
  ]);

  return {success: true, cart: result};
}

export default function ProductPage() {
  const {product, relatedProducts} = useLoaderData<typeof loader>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.nodes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const fetcher = useFetcher();

  const images = product.images?.nodes || [];
  const isAddingToCart = fetcher.state === 'submitting';

  const handleAddToCart = () => {
    if (!selectedVariant?.availableForSale) return;

    fetcher.submit(
      {variantId: selectedVariant.id, quantity: quantity.toString()},
      {method: 'post'}
    );
  };

  return (
    <div className="pt-[44px]">
      {/* Product Section */}
      <section className="py-8 md:py-16">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Gallery */}
            <div className="space-y-4 fade-in-up">
              {/* Main Image */}
              <div className="relative aspect-[3/4] bg-[#f5f0eb] overflow-hidden">
                {images[selectedImage] && (
                  <Image
                    key={selectedImage}
                    data={images[selectedImage]}
                    className="w-full h-full object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((image: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-24 bg-[#f5f0eb] overflow-hidden border-2 transition-colors ${
                        selectedImage === index
                          ? 'border-[#1A1A1A]'
                          : 'border-transparent hover:border-[#ccc]'
                      }`}
                    >
                      <Image
                        data={image}
                        className="w-full h-full object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="lg:sticky lg:top-20 lg:self-start fade-in-up delay-200">
              {/* Breadcrumb */}
              <nav className="text-[13px] text-[#666666] mb-6 flex items-center gap-2">
                <Link to="/" className="hover:text-[#1A1A1A] transition-colors">
                  Home
                </Link>
                <span>/</span>
                <Link
                  to={`/collections/${product.collections?.nodes?.[0]?.handle || 'all'}`}
                  className="hover:text-[#1A1A1A] transition-colors"
                >
                  {product.collections?.nodes?.[0]?.title || 'Shop'}
                </Link>
                <span>/</span>
                <span className="text-[#1A1A1A]">{product.title}</span>
              </nav>

              {/* Title */}
              <h1 className="font-['Playfair_Display'] text-[clamp(24px,4vw,36px)] text-[#1A1A1A] mb-4 font-light leading-tight">
                {product.title}
              </h1>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <Money
                  data={selectedVariant?.price || product.priceRange.minVariantPrice}
                  className="text-[24px] font-['Playfair_Display'] text-[#1A1A1A]"
                />
                {product.compareAtPriceRange?.minVariantPrice?.amount &&
                  parseFloat(product.compareAtPriceRange.minVariantPrice.amount) >
                    parseFloat(product.priceRange.minVariantPrice.amount) && (
                    <Money
                      data={product.compareAtPriceRange.minVariantPrice}
                      className="text-[18px] text-[#999] line-through"
                    />
                  )}
              </div>

              {/* Short Description */}
              <p className="text-[#666666] leading-relaxed mb-8 text-[15px]">
                {product.description?.slice(0, 200)}
                {product.description?.length > 200 && '...'}
              </p>

              {/* Variants */}
              {product.variants?.nodes?.length > 1 && (
                <div className="mb-6">
                  <label className="block text-[13px] font-medium text-[#1A1A1A] mb-3 uppercase tracking-wide">
                    Options
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.nodes.map((variant: any) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        disabled={!variant.availableForSale}
                        className={`px-4 py-2 border text-[13px] transition-colors ${
                          selectedVariant?.id === variant.id
                            ? 'border-[#1A1A1A] bg-[#1A1A1A] text-[#FFF9F3]'
                            : variant.availableForSale
                            ? 'border-[#ccc] hover:border-[#1A1A1A]'
                            : 'border-[#e5e5e5] text-[#ccc] cursor-not-allowed'
                        }`}
                      >
                        {variant.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-8">
                <label className="block text-[13px] font-medium text-[#1A1A1A] mb-3 uppercase tracking-wide">
                  Quantity
                </label>
                <div className="flex items-center border border-[#ccc] w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-[#f5f0eb] transition-colors text-[18px]"
                  >
                    −
                  </button>
                  <span className="w-12 h-12 flex items-center justify-center border-x border-[#ccc] text-[15px]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-[#f5f0eb] transition-colors text-[18px]"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="space-y-3 mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedVariant?.availableForSale || isAddingToCart}
                  className="w-full py-4 bg-[#1A1A1A] text-[#FFF9F3] text-[13px] font-medium tracking-wide uppercase hover:bg-[#2B2B2B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAddingToCart
                    ? 'Adding...'
                    : selectedVariant?.availableForSale
                      ? 'Add to Cart'
                      : 'Sold Out'
                  }
                </button>
              </div>

              {/* Features */}
              <div className="border-t border-[#e5e5e5] pt-6 space-y-3">
                {[
                  '100% Pure Cotton',
                  'Handwoven by Artisans',
                  'Free Shipping on Orders Over ₹2000',
                  '30-Day Return Policy',
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-[14px] text-[#666666]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B8E72" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>

              {/* Accordion Details */}
              <div className="mt-8 border-t border-[#e5e5e5]">
                <AccordionItem
                  title="Product Details"
                  content={product.description || 'No description available.'}
                  isOpen={openAccordion === 'details'}
                  onToggle={() => setOpenAccordion(openAccordion === 'details' ? null : 'details')}
                />
                <AccordionItem
                  title="Care Instructions"
                  content="Machine wash cold with like colors. Tumble dry low. Do not bleach. Iron on low heat if needed."
                  isOpen={openAccordion === 'care'}
                  onToggle={() => setOpenAccordion(openAccordion === 'care' ? null : 'care')}
                />
                <AccordionItem
                  title="Shipping & Returns"
                  content="Free shipping on orders over ₹2000. International shipping available. 30-day hassle-free returns."
                  isOpen={openAccordion === 'shipping'}
                  onToggle={() => setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
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
    </div>
  );
}

function AccordionItem({
  title,
  content,
  isOpen,
  onToggle,
}: {
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[#e5e5e5]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-medium text-[#1A1A1A] text-[14px]">{title}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`text-[#666666] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 pb-4' : 'max-h-0'
        }`}
      >
        <p className="text-[14px] text-[#666666] leading-relaxed">{content}</p>
      </div>
    </div>
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
      variants(first: 20) {
        nodes {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
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
