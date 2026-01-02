import {motion} from 'framer-motion';
import {useInView} from 'framer-motion';
import {useRef} from 'react';

export function ProductDuvets() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {once: true, margin: '-100px'});

  return (
    <section ref={sectionRef} className="section-padding bg-cream-100">
      <div className="container-luxury">
        <div className="grid-two-col items-center">
          {/* Left - Problem */}
          <motion.div
            initial={{opacity: 0, x: -40}}
            animate={isInView ? {opacity: 1, x: 0} : {}}
            transition={{duration: 0.6}}
            className="space-y-6"
          >
            <span className="text-charcoal-500 text-xs uppercase tracking-wider">
              Duvets
            </span>
            <h3 className="text-display-md font-display text-charcoal-950 font-light">
              The Heavy Duvet Lie
            </h3>

            <p className="text-charcoal-900 leading-relaxed">
              Every brand tells you: "Heavy duvet = warm duvet."
              <br />
              <span className="text-charcoal-600">It's not true. And they know it.</span>
            </p>

            <p className="text-charcoal-900 leading-relaxed">
              A heavy duvet traps your body heat. That feels warm... for about 30 minutes.
              Then you overheat, kick it off, and sleep poorly.
            </p>

            <p className="text-charcoal-900 leading-relaxed">
              Lighter duvets with better insulation keep you warm WITHOUT the weight.
              But that's harder to market. So brands add cheap, low-quality filling
              and make them heavy to <em>feel</em> premium.
            </p>

            <p className="text-charcoal-600 text-sm italic mt-4">
              The result: You're sleeping under a weighted blanket that overheats you.
            </p>
          </motion.div>

          {/* Right - Solution */}
          <motion.div
            initial={{opacity: 0, x: 40}}
            animate={isInView ? {opacity: 1, x: 0} : {}}
            transition={{duration: 0.6, delay: 0.1}}
            className="bg-white p-8 md:p-10 rounded-medium shadow-subtle"
          >
            <span className="text-primary-600 text-xs uppercase tracking-wider">
              Our Solution
            </span>
            <h4 className="font-display text-2xl text-charcoal-950 mt-2 mb-6">
              2.25kg of Warmth Without Weight
            </h4>

            <p className="text-charcoal-900 leading-relaxed mb-6">
              Our duvets are incredibly light: approximately 2.25kg.
              But they're warm. Here's why:
            </p>

            <ul className="feature-list text-charcoal-900 text-sm space-y-4">
              <li>
                <span className="font-medium text-charcoal-950">Two-layer super soft thermobond microfiber (150 GSM each)</span>
                <br />
                <span className="text-charcoal-600">These layers trap air, creating insulation</span>
              </li>
              <li>
                <span className="font-medium text-charcoal-950">Polypeach outer fabric (skin-friendly, doesn't pill)</span>
                <br />
                <span className="text-charcoal-600">This fabric doesn't let heat escape</span>
              </li>
              <li>
                <span className="font-medium text-charcoal-950">Stacked layer design (microfiber on microfiber)</span>
                <br />
                <span className="text-charcoal-600">Creates an air gap = better insulation = more warmth</span>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-border-light">
              <p className="text-primary-700 font-medium">
                Warmth without weight. Comfort without burden.
              </p>
              <p className="text-charcoal-600 text-sm mt-2">
                You sleep through the night. You don't overheat. You wake up rested.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function ProductTowels() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {once: true, margin: '-100px'});

  return (
    <section ref={sectionRef} className="section-padding bg-white">
      <div className="container-luxury">
        <div className="grid-two-col items-center">
          {/* Left - Image Placeholder */}
          <motion.div
            initial={{opacity: 0, x: -40}}
            animate={isInView ? {opacity: 1, x: 0} : {}}
            transition={{duration: 0.6}}
            className="aspect-square"
          >
            <div className="image-placeholder h-full rounded-medium">
              <span>Pristine white cotton towels<br />Soft, luxurious texture</span>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{opacity: 0, x: 40}}
            animate={isInView ? {opacity: 1, x: 0} : {}}
            transition={{duration: 0.6, delay: 0.1}}
            className="space-y-8"
          >
            <div>
              <span className="text-charcoal-500 text-xs uppercase tracking-wider">
                Towels
              </span>
              <h3 className="text-display-md font-display text-charcoal-950 font-light mt-2">
                The Lint Trap
              </h3>
            </div>

            <div className="space-y-4 text-charcoal-900 leading-relaxed">
              <p>
                Most towels are 60-70% cotton mixed with polyester.
                This creates a problem: lint. Lots of it.
              </p>
              <p className="text-charcoal-600">
                That lint on your skin? Those are synthetic fibers escaping.
                <br />
                That lint on your clothes? Same thing.
                <br />
                That lint damaging your washing machine? Preventable.
              </p>
              <p>
                But mixing is cheaper. So brands accept the lint problem and sell anyway.
              </p>
            </div>

            <div className="h-px bg-border-light" />

            <div>
              <span className="text-primary-600 text-xs uppercase tracking-wider">
                Our Solution
              </span>
              <h4 className="font-display text-2xl text-charcoal-950 mt-2 mb-4">
                100% Pure Cotton, Zero Lint
              </h4>

              <p className="text-charcoal-900 leading-relaxed mb-4">
                Our towels are 100% pure cotton. No synthetic blending.
                This simple choice eliminates the lint problem entirely.
              </p>

              <ul className="feature-list text-charcoal-900 text-sm">
                <li>Zero synthetic fibers = zero lint</li>
                <li>Pure cotton is naturally soft = no harsh feel</li>
                <li>Sustainable sourcing = guilt-free comfort</li>
                <li>Durability = your towels last years, not months</li>
              </ul>

              <p className="text-primary-700 font-medium mt-6">
                Wrap yourself in something pure. Feel the difference.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
