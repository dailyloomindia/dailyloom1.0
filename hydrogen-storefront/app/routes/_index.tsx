import type {LoaderFunctionArgs, MetaFunction} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {Hero} from '~/components/sections/Hero';
import {FeaturedCollection} from '~/components/sections/FeaturedCollection';
import {Categories} from '~/components/sections/Categories';
import {CraftSection} from '~/components/sections/CraftSection';
import {Testimonials} from '~/components/sections/Testimonials';

export const meta: MetaFunction = () => {
  return [
    {title: 'Daily Loom | Premium Handloom Home Textiles'},
    {
      name: 'description',
      content:
        'Discover luxury handloom textiles crafted from 100% pure cotton. Premium bedding, duvet covers, bedsheets, towels & pillows. Handcrafted in India, shipped worldwide.',
    },
  ];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;

  // Fetch featured products
  const {collection: featuredCollection} = await storefront.query(FEATURED_COLLECTION_QUERY, {
    variables: {handle: 'featured'},
  });

  // Fetch best sellers
  const {collection: bestSellers} = await storefront.query(FEATURED_COLLECTION_QUERY, {
    variables: {handle: 'best-sellers'},
  });

  // Fetch categories/collections
  const {collections} = await storefront.query(COLLECTIONS_QUERY);

  return {
    featuredCollection,
    bestSellers,
    collections: collections?.nodes || [],
  };
}

export default function Homepage() {
  const {featuredCollection, bestSellers, collections} = useLoaderData<typeof loader>();

  // Map collections to category format
  const categories = collections.slice(0, 4).map((collection: any) => ({
    title: collection.title,
    handle: collection.handle,
    description: collection.description || 'Explore our collection',
    image: collection.image,
  }));

  return (
    <>
      {/* Hero Section with 3D */}
      <Hero />

      {/* Categories */}
      <Categories collections={categories} />

      {/* Featured Collection */}
      {featuredCollection && (
        <FeaturedCollection
          title="Featured Collection"
          description="Handpicked pieces that embody the essence of Daily Loom - exceptional quality, timeless design."
          products={featuredCollection.products?.nodes || []}
          collectionHandle="featured"
        />
      )}

      {/* Our Craft Section */}
      <CraftSection />

      {/* Best Sellers */}
      {bestSellers && (
        <FeaturedCollection
          title="Best Sellers"
          description="Our most loved pieces, chosen by customers around the world."
          products={bestSellers.products?.nodes || []}
          collectionHandle="best-sellers"
        />
      )}

      {/* Testimonials */}
      <Testimonials />

      {/* Value Props Banner */}
      <ValuePropsSection />
    </>
  );
}

function ValuePropsSection() {
  const props = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: 'Premium Quality',
      description: '100% pure cotton, rigorously tested for excellence',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      title: 'Artisan Crafted',
      description: 'Handwoven by skilled craftspeople with generations of expertise',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      ),
      title: 'Global Shipping',
      description: 'Delivered to your doorstep, anywhere in the world',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      title: 'Dedicated Support',
      description: 'Personal assistance for retail, export & B2B orders',
    },
  ];

  return (
    <section className="py-16 border-t border-charcoal-100">
      <div className="container-premium">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {props.map((prop) => (
            <div key={prop.title} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 text-primary-600">
                {prop.icon}
              </div>
              <h3 className="font-display text-lg text-charcoal-950 mb-2">{prop.title}</h3>
              <p className="text-sm text-charcoal-500">{prop.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  query FeaturedCollection($handle: String!) {
    collection(handle: $handle) {
      id
      title
      handle
      products(first: 8) {
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
      }
    }
  }
`;

const COLLECTIONS_QUERY = `#graphql
  query Collections {
    collections(first: 8) {
      nodes {
        id
        title
        handle
        description
        image {
          url
          altText
        }
      }
    }
  }
`;
