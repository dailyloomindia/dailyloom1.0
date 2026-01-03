export function DeceptionReveal() {
  return (
    <section className="section-padding bg-cream-100">
      <div className="container-luxury">
        <div className="grid-two-col items-start">
          {/* Left Column - The Deception */}
          <div className="reveal-left">
            {/* Image Placeholder */}
            <div className="relative aspect-[3/2] overflow-hidden mb-8">
              <div className="image-placeholder h-full" style={{filter: 'blur(1px)'}}>
                <span>Tangled, chaotic polyester-cotton threads<br />Muted colors, blurred effect</span>
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-6">
              <h3 className="text-display-md font-display text-charcoal-500 font-light">
                The Cotton Industry's Open Secret
              </h3>

              <div className="space-y-4 text-charcoal-900 leading-relaxed">
                <p>
                  Most brands mix 40-60% polyester with cotton.
                </p>
                <p>
                  The law allows them to label it "100% cotton."
                </p>
                <p>
                  Why? Because mixing threads reduces production costs by 60%,
                  allowing brands to sell at "attractive prices" with higher margins.
                </p>
                <p>
                  They create three product tiers—labeled as "Basic Cotton," "Premium Cotton,"
                  and "Luxury Cotton"—using the <em>same blend</em> of threads. Only the price changes.
                </p>
                <p>
                  The mixing stays consistent across all tiers. You're buying the same
                  low-grade blend at three different price points.
                </p>
                <p className="text-charcoal-500 text-sm mt-6 pt-4 border-t border-border-light">
                  You can legally label 40% cotton as "100% cotton bedsheet."
                  It's not a bug in the system. It's the system working as intended.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - The Truth */}
          <div className="reveal-right">
            {/* Image Placeholder */}
            <div className="relative aspect-[3/2] overflow-hidden mb-8">
              <div className="image-placeholder h-full">
                <span>Pristine, aligned pure cotton threads<br />Warm cream tones, sharp focus</span>
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-6">
              <h3 className="text-display-md font-display text-charcoal-950 font-light">
                What We Actually Deliver
              </h3>

              <div className="space-y-4 text-charcoal-900 leading-relaxed">
                <p>
                  We use 100% pure cotton. No polyester. No blending. No compromise.
                </p>
                <p>
                  Every thread in our bedsheets is verified pure cotton from start to finish.
                </p>

                <p className="font-medium text-charcoal-950 mt-6">What this means for you:</p>

                <ul className="feature-list text-charcoal-900">
                  <li>Natural breathability (temperature-regulating)</li>
                  <li>Softness that improves with every wash</li>
                  <li>Durability: 500+ washes without pilling or fading</li>
                  <li>No harsh synthetic feel against your skin</li>
                  <li>Fabric that becomes more beautiful over time</li>
                </ul>

                <p className="mt-6">
                  We don't create "tiers" to charge different prices for the same product.
                  We create one product: pure cotton. You decide the set (single, double, queen, king).
                </p>

                <p className="text-primary-600 font-medium mt-6 pt-4 border-t border-primary-200">
                  100% pure cotton. Verified. No exceptions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
