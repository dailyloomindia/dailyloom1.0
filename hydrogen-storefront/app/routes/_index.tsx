import type {MetaFunction} from '@shopify/remix-oxygen';
import {HeroSection} from '~/components/landing/HeroSection';
import {DeceptionReveal} from '~/components/landing/DeceptionReveal';
import {AuthenticityStory} from '~/components/landing/AuthenticityStory';
import {ProductBedsheets} from '~/components/landing/ProductBedsheets';
import {ProductDuvets, ProductTowels} from '~/components/landing/ProductDuvetsTowels';
import {Testimonials} from '~/components/landing/Testimonials';
import {CTASection} from '~/components/landing/CTASection';

export const meta: MetaFunction = () => {
  return [
    {title: 'Daily Loom | 100% Pure Cotton Home Textiles'},
    {
      name: 'description',
      content:
        'Discover 100% pure cotton home textiles that last 5-7 years. Premium bedsheets, duvet covers, and towels. No synthetic blends, no compromises. Handcrafted in India, shipped worldwide.',
    },
    {
      name: 'keywords',
      content:
        'pure cotton bedsheets, cotton duvet covers, organic towels, handloom textiles, premium bedding, Indian cotton, sustainable textiles',
    },
    {
      property: 'og:title',
      content: 'Daily Loom | 100% Pure Cotton Home Textiles',
    },
    {
      property: 'og:description',
      content:
        'Pure cotton home textiles that improve with every wash. Built to last 5-7 years.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
  ];
};

export default function Homepage() {
  return (
    <main>
      {/* Section 1: Hero with Video/Image Background */}
      <HeroSection />

      {/* Section 2: The Deception Reveal */}
      <DeceptionReveal />

      {/* Section 3: Our Authenticity Story */}
      <AuthenticityStory />

      {/* Section 4: Product Storytelling - Bedsheets */}
      <ProductBedsheets />

      {/* Section 5: Product Storytelling - Duvets */}
      <ProductDuvets />

      {/* Section 6: Product Storytelling - Towels */}
      <ProductTowels />

      {/* Section 7: Social Proof / Testimonials */}
      <Testimonials />

      {/* Section 8: Final CTA + Email Signup */}
      <CTASection />
    </main>
  );
}
