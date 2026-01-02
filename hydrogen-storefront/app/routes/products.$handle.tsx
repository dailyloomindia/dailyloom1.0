import type {LoaderFunctionArgs, MetaFunction} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {Image, Money, ShopPayButton} from '@shopify/hydrogen';
import {motion} from 'framer-motion';
import {useState, lazy, Suspense} from 'react';
import {fadeInUp, slideInLeft, slideInRight} from '~/components/animations/PageTransition';
import {ProductCard} from '~/components/product/ProductCard';

// Lazy load 3D viewer
const FabricPreview = lazy(() =>
  import('~/components/three/FabricScene').then((mod) => ({default: mod.FabricPreview})),
);

export const meta: MetaFunction<typeof loader> = ({data}) => {
  const product = data?.product;
  return [
    {title: `${product?.title || 'Product'} | Daily Loom`},
    {name: 'description', content: product?.description || ''},
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
  const {collection} = await storefront.query(RELATED_PRODUCTS_QUERY, {
    variables: {handle: product.collections?.nodes?.[0]?.handle || 'all'},
  });

  const relatedProducts =
    collection?.products?.nodes?.filter((p: any) => p.id !== product.id).slice(0, 4) || [];

  return {product, relatedProducts};
}

export default function ProductPage() {
  const {product, relatedProducts} = useLoaderData<typeof loader>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.nodes?.[0]);
  const [quantity, setQuantity] = useState(1);

  const images = product.images?.nodes || [];

  return (
    <div className="pt-24">
      {/* Product Section */}
      <section className="section-padding">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Gallery */}
            <motion.div
              variants={slideInLeft}
              initial="initial"
              animate="animate"
              className="space-y-4"
            >
              {/* Main Image */}
              <div className="relative aspect-[3/4] bg-cream-100 overflow-hidden">
                {images[selectedImage] && (
                  <motion.div
                    key={selectedImage}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.3}}
                    className="w-full h-full"
                  >
                    <Image
                      data={images[selectedImage]}
                      className="w-full h-full object-cover"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  </motion.div>
                )}

                {/* 3D Preview Toggle */}
                <button className="absolute bottom-4 right-4 px-4 py-2 bg-charcoal-950/80 text-cream-50 text-xs uppercase tracking-wide backdrop-blur-sm hover:bg-charcoal-950 transition-colors">
                  View in 3D
                </button>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto hide-scrollbar">
                  {images.map((image: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-24 bg-cream-100 overflow-hidden border-2 transition-colors ${
                        selectedImage === index
                          ? 'border-charcoal-950'
                          : 'border-transparent hover:border-charcoal-300'
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
            </motion.div>

            {/* Product Info */}
            <motion.div
              variants={slideInRight}
              initial="initial"
              animate="animate"
              className="lg:sticky lg:top-32 lg:self-start"
            >
              {/* Breadcrumb */}
              <nav className="text-sm text-charcoal-500 mb-6">
                <a href="/" className="hover:text-charcoal-950">
                  Home
                </a>
                <span className="mx-2">/</span>
                <a
                  href={`/collections/${product.collections?.nodes?.[0]?.handle || 'all'}`}
                  className="hover:text-charcoal-950"
                >
                  {product.collections?.nodes?.[0]?.title || 'Shop'}
                </a>
                <span className="mx-2">/</span>
                <span className="text-charcoal-950">{product.title}</span>
              </nav>

              {/* Title */}
              <h1 className="font-display text-display-md text-charcoal-950 mb-4">
                {product.title}
              </h1>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <Money
                  data={selectedVariant?.price || product.priceRange.minVariantPrice}
                  className="text-2xl font-display text-charcoal-950"
                />
                {product.compareAtPriceRange?.minVariantPrice?.amount &&
                  parseFloat(product.compareAtPriceRange.minVariantPrice.amount) >
                    parseFloat(product.priceRange.minVariantPrice.amount) && (
                    <Money
                      data={product.compareAtPriceRange.minVariantPrice}
                      className="text-lg text-charcoal-400 line-through"
                    />
                  )}
              </div>

              {/* Short Description */}
              <p className="text-charcoal-600 leading-relaxed mb-8">
                {product.description?.slice(0, 200)}
                {product.description?.length > 200 && '...'}
              </p>

              {/* Variants */}
              {product.variants?.nodes?.length > 1 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-charcoal-950 mb-3">
                    Options
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.nodes.map((variant: any) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        disabled={!variant.availableForSale}
                        className={`px-4 py-2 border text-sm transition-colors ${
                          selectedVariant?.id === variant.id
                            ? 'border-charcoal-950 bg-charcoal-950 text-cream-50'
                            : variant.availableForSale
                            ? 'border-charcoal-300 hover:border-charcoal-950'
                            : 'border-charcoal-200 text-charcoal-300 cursor-not-allowed'
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
                <label className="block text-sm font-medium text-charcoal-950 mb-3">
                  Quantity
                </label>
                <div className="flex items-center border border-charcoal-300 w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-charcoal-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 h-12 flex items-center justify-center border-x border-charcoal-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-charcoal-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="space-y-3 mb-8">
                <button
                  disabled={!selectedVariant?.availableForSale}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {selectedVariant?.availableForSale ? 'Add to Cart' : 'Sold Out'}
                </button>

                <ShopPayButton
                  storeDomain={`dailyloom.myshopify.com`}
                  variantIds={[selectedVariant?.id]}
                  className="w-full"
                />
              </div>

              {/* Features */}
              <div className="border-t border-charcoal-200 pt-6 space-y-4">
                {[
                  {icon: '✓', text: '100% Pure Cotton'},
                  {icon: '✓', text: 'Handwoven by Artisans'},
                  {icon: '✓', text: 'Free Shipping on Orders Over ₹2000'},
                  {icon: '✓', text: '30-Day Return Policy'},
                ].map((feature) => (
                  <div key={feature.text} className="flex items-center gap-3 text-sm text-charcoal-600">
                    <span className="text-primary-600">{feature.icon}</span>
                    {feature.text}
                  </div>
                ))}
              </div>

              {/* Accordion Details */}
              <div className="mt-8 border-t border-charcoal-200">
                <ProductAccordion
                  title="Product Details"
                  content={product.description || 'No description available.'}
                />
                <ProductAccordion
                  title="Care Instructions"
                  content="Machine wash cold with like colors. Tumble dry low. Do not bleach. Iron on low heat if needed."
                />
                <ProductAccordion
                  title="Shipping & Returns"
                  content="Free shipping on orders over ₹2000. International shipping available. 30-day hassle-free returns."
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section-padding bg-cream-100">
          <div className="container-premium">
            <motion.h2
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{once: true}}
              className="font-display text-display-md text-charcoal-950 text-center mb-12"
            >
              You May Also Like
            </motion.h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {relatedProducts.map((product: any, index: number) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function ProductAccordion({title, content}: {title: string; content: string}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-charcoal-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-medium text-charcoal-950">{title}</span>
        <motion.span
          animate={{rotate: isOpen ? 180 : 0}}
          transition={{duration: 0.2}}
          className="text-charcoal-500"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0}}
        transition={{duration: 0.3}}
        className="overflow-hidden"
      >
        <p className="pb-4 text-sm text-charcoal-600 leading-relaxed">{content}</p>
      </motion.div>
    </div>
  );
}

const PRODUCT_QUERY = `#graphql
  query Product($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
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
          compareAtPrice {
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
      tags
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
          images(first: 2) {
            nodes {
              url
              altText
            }
          }
        }
      }
    }
  }
`;
