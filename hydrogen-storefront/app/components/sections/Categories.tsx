import {Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {motion} from 'framer-motion';
import {fadeInUp, staggerContainer} from '~/components/animations/PageTransition';

interface Category {
  title: string;
  handle: string;
  description: string;
  image?: {
    url: string;
    altText?: string;
  };
}

interface CategoriesProps {
  collections: Category[];
}

const defaultCategories: Category[] = [
  {
    title: 'Duvet Covers',
    handle: 'duvet-covers',
    description: 'Luxuriously soft 100% cotton covers',
  },
  {
    title: 'Bedsheets',
    handle: 'bedsheets',
    description: 'Crisp, breathable comfort',
  },
  {
    title: 'Towels',
    handle: 'towels',
    description: 'Plush, absorbent luxury',
  },
  {
    title: 'Pillows',
    handle: 'pillows',
    description: 'Natural latex support',
  },
];

export function Categories({collections = defaultCategories}: CategoriesProps) {
  return (
    <section className="section-padding bg-cream-100">
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
            Shop by Category
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="font-display text-display-lg text-charcoal-950"
          >
            Explore Our Collections
          </motion.h2>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{once: true}}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {collections.map((category, index) => (
            <CategoryCard key={category.handle} category={category} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CategoryCard({category, index}: {category: Category; index: number}) {
  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      whileHover={{y: -8}}
      transition={{duration: 0.3}}
    >
      <Link to={`/collections/${category.handle}`} className="group block">
        <div className="relative aspect-[3/4] bg-cream-200 overflow-hidden mb-4">
          {category.image ? (
            <Image
              data={category.image}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-cream-100 to-primary-100 flex items-center justify-center">
              <span className="font-display text-4xl text-primary-300">
                {category.title.charAt(0)}
              </span>
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-charcoal-950/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* View button */}
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileHover={{opacity: 1, y: 0}}
            className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <span className="block w-full py-3 bg-cream-50 text-charcoal-950 text-center text-sm font-medium tracking-wide uppercase">
              View Collection
            </span>
          </motion.div>
        </div>

        <h3 className="font-display text-xl text-charcoal-950 mb-1 group-hover:text-primary-600 transition-colors">
          {category.title}
        </h3>
        <p className="text-sm text-charcoal-500">{category.description}</p>
      </Link>
    </motion.div>
  );
}
