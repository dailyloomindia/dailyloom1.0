export function ProductBedsheets() {
  return (
    <section className="bg-cream-100">
      {/* Hero Quote */}
      <div className="section-padding bg-charcoal-950">
        <div className="container-luxury">
          <blockquote className="quote-luxury text-cream-100 text-center max-w-3xl mx-auto fade-in-up">
            "Sleep isn't rest. It's where your body rebuilds itself.
            <br />
            Your bedsheet is part of that ritual."
          </blockquote>
        </div>
      </div>

      {/* Problem Section */}
      <div className="section-padding">
        <div className="container-luxury">
          <div className="grid-two-col items-start">
            {/* Left - Problem */}
            <div className="space-y-6 fade-in-up">
              <span className="text-charcoal-500 text-xs uppercase tracking-wider">
                The Problem
              </span>
              <h3 className="text-display-md font-display text-charcoal-950 font-light">
                Bedsheets: The Mixing Game
              </h3>

              <p className="text-charcoal-900 leading-relaxed">
                Most brands mix 40-60% polyester with cotton bedsheets.
              </p>

              <div className="space-y-2">
                <p className="font-medium text-charcoal-950">Why?</p>
                <ul className="feature-list text-charcoal-900 text-sm">
                  <li>Cost reduction: 60% cheaper production</li>
                  <li>Price attraction: "Sale" psychology</li>
                  <li>Volume play: Create three tiers of the same product</li>
                </ul>
              </div>

              <p className="text-charcoal-900 leading-relaxed">
                The result: You feel the stiffness. You feel the heat retention problems.
                You feel the pilling starting in month 3. But the brand made their margin.
              </p>

              {/* Timeline */}
              <div className="pt-6 mt-6 border-t border-border-light">
                <p className="font-medium text-charcoal-950 mb-4">What Actually Happens:</p>
                <div className="space-y-1">
                  <div className="timeline-item">
                    <span className="text-sm text-charcoal-600">Week 1:</span>
                    <p className="text-sm text-charcoal-900">Feels soft. You're excited.</p>
                  </div>
                  <div className="timeline-item">
                    <span className="text-sm text-charcoal-600">Month 1:</span>
                    <p className="text-sm text-charcoal-900">Starting to feel stiff.</p>
                  </div>
                  <div className="timeline-item">
                    <span className="text-sm text-charcoal-600">Month 3:</span>
                    <p className="text-sm text-charcoal-900">Visible pilling begins.</p>
                  </div>
                  <div className="timeline-item">
                    <span className="text-sm text-charcoal-600">Month 6:</span>
                    <p className="text-sm text-charcoal-900">Color fading. Fabric feels harsh.</p>
                  </div>
                  <div className="timeline-item">
                    <span className="text-sm text-charcoal-600">Year 2:</span>
                    <p className="text-sm text-charcoal-900">Ends up in the donation pile.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Solution */}
            <div className="space-y-6 fade-in-up delay-200">
              <span className="text-primary-600 text-xs uppercase tracking-wider">
                Our Solution
              </span>
              <h3 className="text-display-md font-display text-charcoal-950 font-light">
                Pure Cotton Designed to Improve Over Time
              </h3>

              <p className="text-charcoal-900 leading-relaxed">
                Our bedsheets start with pure cotton yarn, never recycled.
                We use 300-400 GSM 100% pure cotton.
              </p>

              <ul className="feature-list text-charcoal-900 text-sm">
                <li>Higher thread count than blended alternatives</li>
                <li>Natural breathability (temperature-regulating)</li>
                <li>Softness improves with every wash</li>
                <li>Durability: 500+ washes without pilling or fading</li>
                <li>Lifespan: 5-7 years minimum</li>
              </ul>

              {/* Price Comparison */}
              <div className="bg-primary-50 p-6 rounded-medium mt-6">
                <p className="font-medium text-charcoal-950 mb-4">The Math is Simple:</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <p className="text-charcoal-600">Typical "cotton" bedsheet:</p>
                    <p className="text-charcoal-950 font-medium">₹499-799</p>
                    <p className="text-charcoal-500 text-xs">Lifespan: 1-2 years</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-primary-600">Daily Loom bedsheet:</p>
                    <p className="text-charcoal-950 font-medium">₹1,499</p>
                    <p className="text-charcoal-500 text-xs">Lifespan: 5-7 years</p>
                  </div>
                </div>
                <p className="text-primary-700 text-sm mt-4 font-medium">
                  Cost per year: ₹214-299 vs buying 3-4 cheap ones
                </p>
              </div>

              {/* Features */}
              <div className="pt-6 mt-6 border-t border-border-light">
                <p className="font-medium text-charcoal-950 mb-3">Features:</p>
                <ul className="check-list text-charcoal-900 text-sm grid grid-cols-2 gap-2">
                  <li>100% pure cotton</li>
                  <li>300-400 GSM weight</li>
                  <li>Natural dyes</li>
                  <li>500+ wash durability</li>
                  <li>5-7 year lifespan</li>
                  <li>Improves with washing</li>
                  <li>All mattress sizes</li>
                  <li>Lifetime care support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Care Section */}
      <div className="section-padding bg-white">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto text-center">
            <div className="space-y-6 fade-in-up">
              <h3 className="text-display-md font-display text-charcoal-950 font-light">
                Pure Cotton Asks for a Little Care
              </h3>
              <p className="text-charcoal-600">
                And rewards it generously.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
                {[
                  {icon: '💧', text: 'Wash in cool water'},
                  {icon: '🚫', text: 'Skip the bleach'},
                  {icon: '🌀', text: 'Tumble dry on low'},
                  {icon: '✨', text: 'Iron on medium (optional)'},
                ].map((item) => (
                  <div key={item.text} className="text-center p-4">
                    <span className="text-2xl mb-3 block">{item.icon}</span>
                    <p className="text-sm text-charcoal-900">{item.text}</p>
                  </div>
                ))}
              </div>

              <p className="text-charcoal-600 text-sm mt-8 italic">
                A 90-second ritual every time you wash.
                A small investment that pays dividends every night you sleep.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
