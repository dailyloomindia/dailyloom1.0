import type {LoaderFunctionArgs, MetaFunction} from '@shopify/remix-oxygen';
import {useLoaderData, Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {motion} from 'framer-motion';
import {fadeInUp, staggerContainer} from '~/components/animations/PageTransition';

export const meta: MetaFunction = () => {
  return [
    {title: 'All Collections | Daily Loom'},
    {name: 'description', content: 'Explore our curated collections of premium handloom textiles.'},
  ];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {collections} = await context.storefront.query(COLLECTIONS_QUERY);
  return {collections: collections?.nodes || []};
}

export default function CollectionsIndex() {
  const {collections} = useLoaderData<typeof loader>();

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-cream-100">
        <div className="container-premium">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="text-center max-w-2xl mx-auto"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block text-2xs uppercase tracking-extra-wide text-primary-600 mb-4"
            >
              Our Collections
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="font-display text-display-lg text-charcoal-950 mb-4"
            >
              Curated for Comfort
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-charcoal-600"
            >
              Each collection is thoughtfully designed to bring luxury and craftsmanship into your home.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="section-padding">
        <div className="container-premium">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{once: true}}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {collections.map((collection: any, index: number) => (
              <CollectionCard key={collection.id} collection={collection} index={index} />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function CollectionCard({collection, index}: {collection: any; index: number}) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{y: -8}}
      transition={{duration: 0.3}}
    >
      <Link to={`/collections/${collection.handle}`} className="group block">
        <div className="relative aspect-[4/5] bg-cream-100 overflow-hidden mb-4">
          {collection.image ? (
            <Image
              data={collection.image}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-cream-100 to-primary-100 flex items-center justify-center">
              <span className="font-display text-6xl text-primary-200">
                {collection.title.charAt(0)}
              </span>
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-charcoal-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Content */}
          <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <span className="inline-block px-4 py-2 bg-cream-50 text-charcoal-950 text-sm font-medium tracking-wide">
              View Collection
            </span>
          </div>
        </div>

        <h2 className="font-display text-2xl text-charcoal-950 mb-2 group-hover:text-primary-600 transition-colors">
          {collection.title}
        </h2>
        {collection.description && (
          <p className="text-sm text-charcoal-500 line-clamp-2">
            {collection.description}
          </p>
        )}
      </Link>
    </motion.div>
  );
}

const COLLECTIONS_QUERY = `#graphql
  query Collections {
    collections(first: 20) {
      nodes {
        id
        title
        handle
        description
        image {
          url
          altText
          width
          height
        }
      }
    }
  }
`;
