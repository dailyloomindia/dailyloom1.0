import {motion, AnimatePresence} from 'framer-motion';
import {useState, useEffect} from 'react';
import {fadeInUp} from '~/components/animations/PageTransition';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah M.',
    location: 'London, UK',
    quote:
      'The quality of these bedsheets is exceptional. The cotton is so soft and breathable. I\'ve never slept better!',
    rating: 5,
  },
  {
    id: '2',
    name: 'James R.',
    location: 'New York, USA',
    quote:
      'Daily Loom\'s duvet covers have transformed our bedroom. The craftsmanship is visible in every stitch.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Priya K.',
    location: 'Mumbai, India',
    quote:
      'As someone who values handcrafted products, I\'m impressed by the attention to detail. These are heirloom pieces.',
    rating: 5,
  },
  {
    id: '4',
    name: 'Emma L.',
    location: 'Sydney, Australia',
    quote:
      'The towels are incredibly plush and absorbent. They feel like a luxury spa experience at home.',
    rating: 5,
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section-padding bg-cream-50 overflow-hidden">
      <div className="container-premium">
        {/* Header */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{once: true}}
          className="text-center mb-12 md:mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block text-2xs uppercase tracking-extra-wide text-primary-600 mb-4"
          >
            What Our Customers Say
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="font-display text-display-lg text-charcoal-950"
          >
            Loved Worldwide
          </motion.h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -30}}
                transition={{duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94]}}
                className="text-center px-4"
              >
                {/* Quote icon */}
                <div className="mb-8">
                  <svg
                    className="w-12 h-12 mx-auto text-primary-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L9.373 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.004zm9.124 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.692-1.327-.817-.56-.124-1.074-.13-1.54-.022-.16-.94.09-1.95.75-3.02.66-1.06 1.514-1.86 2.557-2.4L18.49 5c-.8.396-1.555.898-2.26 1.505-.708.607-1.34 1.305-1.894 2.094-.556.79-.97 1.68-1.24 2.69-.273 1-.345 2.04-.217 3.1.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.004z" />
                  </svg>
                </div>

                {/* Rating */}
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({length: 5}).map((_, i) => (
                    <StarIcon
                      key={i}
                      filled={i < testimonials[activeIndex].rating}
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="font-display text-2xl md:text-3xl text-charcoal-950 mb-8 leading-relaxed">
                  "{testimonials[activeIndex].quote}"
                </blockquote>

                {/* Author */}
                <div>
                  <p className="font-medium text-charcoal-950">
                    {testimonials[activeIndex].name}
                  </p>
                  <p className="text-sm text-charcoal-500">
                    {testimonials[activeIndex].location}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'w-8 bg-primary-600'
                    : 'bg-charcoal-300 hover:bg-charcoal-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StarIcon({filled}: {filled: boolean}) {
  return (
    <svg
      className={`w-5 h-5 ${filled ? 'text-gold-500' : 'text-charcoal-200'}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}
