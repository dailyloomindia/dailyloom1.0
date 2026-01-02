import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';
import {motion} from 'framer-motion';
import clsx from 'clsx';

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    handle: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    compareAtPriceRange?: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    featuredImage?: {
      url: string;
      altText?: string;
      width?: number;
      height?: number;
    };
    images?: {
      nodes: Array<{
        url: string;
        altText?: string;
      }>;
    };
    tags?: string[];
    availableForSale?: boolean;
  };
  index?: number;
  size?: 'default' | 'large';
}

export function ProductCard({product, index = 0, size = 'default'}: ProductCardProps) {
  const {title, handle, priceRange, compareAtPriceRange, featuredImage, images, tags, availableForSale = true} =
    product;

  // Get secondary image for hover effect
  const secondaryImage = images?.nodes?.[1];

  // Check for sale
  const isOnSale =
    compareAtPriceRange?.minVariantPrice?.amount &&
    parseFloat(compareAtPriceRange.minVariantPrice.amount) >
      parseFloat(priceRange.minVariantPrice.amount);

  // Check for new tag
  const isNew = tags?.includes('new') || tags?.includes('New');

  return (
    <motion.article
      initial={{opacity: 0, y: 30}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, margin: '-50px'}}
      transition={{duration: 0.5, delay: index * 0.1}}
      className="group"
    >
      <Link to={`/products/${handle}`} className="block">
        {/* Image Container */}
        <div
          className={clsx(
            'relative overflow-hidden bg-cream-100 mb-4',
            size === 'large' ? 'aspect-[3/4]' : 'aspect-product',
          )}
        >
          {/* Primary Image */}
          {featuredImage && (
            <motion.div
              className="absolute inset-0"
              whileHover={{scale: 1.03}}
              transition={{duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94]}}
            >
              <Image
                data={featuredImage}
                className="w-full h-full object-cover"
                sizes={size === 'large' ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 33vw, 50vw'}
              />
            </motion.div>
          )}

          {/* Secondary Image (hover) */}
          {secondaryImage && (
            <motion.div
              initial={{opacity: 0}}
              whileHover={{opacity: 1}}
              transition={{duration: 0.4}}
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
            >
              <Image
                data={secondaryImage}
                className="w-full h-full object-cover"
                sizes={size === 'large' ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 33vw, 50vw'}
              />
            </motion.div>
          )}

          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {isNew && (
              <span className="px-3 py-1 bg-charcoal-950 text-cream-50 text-2xs uppercase tracking-wider">
                New
              </span>
            )}
            {isOnSale && (
              <span className="px-3 py-1 bg-primary-600 text-cream-50 text-2xs uppercase tracking-wider">
                Sale
              </span>
            )}
            {!availableForSale && (
              <span className="px-3 py-1 bg-charcoal-400 text-cream-50 text-2xs uppercase tracking-wider">
                Sold Out
              </span>
            )}
          </div>

          {/* Quick view button */}
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileHover={{opacity: 1, y: 0}}
            className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <button className="w-full py-3 bg-cream-50/95 backdrop-blur-sm text-charcoal-950 text-sm font-medium tracking-wide uppercase hover:bg-cream-50 transition-colors">
              Quick View
            </button>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          {/* Title */}
          <h3 className="font-display text-lg text-charcoal-950 group-hover:text-primary-700 transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2">
            <Money
              data={priceRange.minVariantPrice}
              className="text-charcoal-950 font-medium"
            />
            {isOnSale && compareAtPriceRange && (
              <Money
                data={compareAtPriceRange.minVariantPrice}
                className="text-charcoal-400 line-through text-sm"
              />
            )}
          </div>

          {/* Underline animation */}
          <div className="h-px bg-charcoal-200 w-0 group-hover:w-full transition-all duration-500 ease-premium" />
        </div>
      </Link>
    </motion.article>
  );
}

// Skeleton loader for product cards
export function ProductCardSkeleton({size = 'default'}: {size?: 'default' | 'large'}) {
  return (
    <div className="animate-pulse">
      <div
        className={clsx(
          'bg-cream-200 mb-4',
          size === 'large' ? 'aspect-[3/4]' : 'aspect-product',
        )}
      />
      <div className="space-y-2">
        <div className="h-5 bg-cream-200 rounded w-3/4" />
        <div className="h-4 bg-cream-200 rounded w-1/4" />
      </div>
    </div>
  );
}
