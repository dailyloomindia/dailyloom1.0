import {Link} from '@remix-run/react';
import {motion} from 'framer-motion';
import {ProductCard, ProductCardSkeleton} from '~/components/product/ProductCard';
import {fadeInUp, staggerContainer} from '~/components/animations/PageTransition';

interface FeaturedCollectionProps {
  title: string;
  description?: string;
  products: Array<{
    id: string;
    title: string;
    handle: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    featuredImage?: {
      url: string;
      altText?: string;
    };
    images?: {
      nodes: Array<{
        url: string;
        altText?: string;
      }>;
    };
  }>;
  collectionHandle?: string;
  layout?: 'grid' | 'carousel';
}

export function FeaturedCollection({
  title,
  description,
  products,
  collectionHandle,
  layout = 'grid',
}: FeaturedCollectionProps) {
  return (
    <section className="section-padding bg-cream-50">
      <div className="container-premium">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{once: true}}
          className="text-center mb-12 md:mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block text-2xs uppercase tracking-extra-wide text-primary-600 mb-4"
          >
            Curated Selection
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="font-display text-display-lg text-charcoal-950 mb-4"
          >
            {title}
          </motion.h2>
          {description && (
            <motion.p
              variants={fadeInUp}
              className="text-charcoal-600 max-w-2xl mx-auto"
            >
              {description}
            </motion.p>
          )}
        </motion.div>

        {/* Products Grid */}
        {layout === 'grid' ? (
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{once: true}}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>
        ) : (
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-4">
              {products.map((product, index) => (
                <div key={product.id} className="flex-shrink-0 w-72">
                  <ProductCard product={product} index={index} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View All Link */}
        {collectionHandle && (
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{delay: 0.3}}
            className="text-center mt-12"
          >
            <Link
              to={`/collections/${collectionHandle}`}
              className="inline-flex items-center gap-2 text-sm uppercase tracking-wide text-charcoal-950 hover:text-primary-600 transition-colors group"
            >
              View All Products
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="transform group-hover:translate-x-1 transition-transform"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export function FeaturedCollectionSkeleton() {
  return (
    <section className="section-padding bg-cream-50">
      <div className="container-premium">
        <div className="text-center mb-16 animate-pulse">
          <div className="h-3 bg-cream-200 rounded w-24 mx-auto mb-4" />
          <div className="h-10 bg-cream-200 rounded w-64 mx-auto mb-4" />
          <div className="h-4 bg-cream-200 rounded w-96 mx-auto" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({length: 4}).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
