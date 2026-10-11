import type {LoaderFunctionArgs, MetaFunction} from '@shopify/remix-oxygen';
import {useLoaderData, Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';

export const meta: MetaFunction = () => {
  return [
    {title: 'All Collections | Daily Loom'},
    {name: 'description', content: 'Explore our curated collections of premium handloom textiles. 100% pure cotton bedsheets, duvets, and towels.'},
  ];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {collections} = await context.storefront.query(COLLECTIONS_QUERY);
  return {collections: collections?.nodes || []};
}

export default function CollectionsIndex() {
  const {collections} = useLoaderData<typeof loader>();

  return (
    <div className="pt-[56px]">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-[#FFF9F3]">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto fade-in-up">
            <span className="inline-block text-[10px] uppercase tracking-[0.15em] text-[#6B8E72] mb-4 font-medium">
              Our Collections
            </span>
            <h1 className="font-['Playfair_Display'] text-[clamp(32px,5vw,48px)] text-[#1A1A1A] mb-4 font-light leading-tight">
              Curated for Comfort
            </h1>
            <p className="text-[#666666] text-[15px] leading-relaxed">
              Each collection is thoughtfully designed to bring luxury and craftsmanship into your home.
            </p>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-12 md:py-20">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {collections.map((collection: any, index: number) => (
              <CollectionCard key={collection.id} collection={collection} index={index} />
            ))}
          </div>

          {collections.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#666666]">No collections available.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function CollectionCard({collection, index}: {collection: any; index: number}) {
  return (
    <div
      className="fade-in-up"
      style={{animationDelay: `${index * 100}ms`}}
    >
      <Link to={`/collections/${collection.handle}`} className="group block">
        <div className="relative aspect-[4/5] bg-[#f5f0eb] overflow-hidden mb-4">
          {collection.image ? (
            <Image
              data={collection.image}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#FFF9F3] to-[#e8e0d8] flex items-center justify-center">
              <span className="font-['Playfair_Display'] text-6xl text-[#6B8E72]/30">
                {collection.title.charAt(0)}
              </span>
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/60 via-[#1A1A1A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Content */}
          <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <span className="inline-block px-4 py-2 bg-[#FFF9F3] text-[#1A1A1A] text-[12px] font-medium tracking-wide">
              View Collection
            </span>
          </div>
        </div>

        <h2 className="font-['Playfair_Display'] text-[22px] text-[#1A1A1A] mb-2 group-hover:text-[#6B8E72] transition-colors">
          {collection.title}
        </h2>
        {collection.description && (
          <p className="text-[14px] text-[#666666] line-clamp-2">
            {collection.description}
          </p>
        )}
      </Link>
    </div>
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
