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
                So many bedsheets feel stiff, hot, or wear out quickly
              </p>

              <div className="space-y-2">
                <p className="font-medium text-charcoal-950">Why?</p>
                <ul className="feature-list text-charcoal-900 text-sm">
                  <li>
                    <b>Price vs. Perception:</b> Higher prices don’t always mean
                    better fabric.
                  </li>

                  <li>
                    <b>Cost Efficiency:</b> Blends and lower-grade fabrics
                    reduce production costs.
                  </li>
                  <li>
                    <b>Tier Illusion:</b> Labels and marketing create multiple
                    price tiers with minimal material difference.
                  </li>
                  <li>
                    <b>Consumer Guesswork:</b> Buyers rely on look, unaware of
                    the fabric inside.
                  </li>
                  <li>
                    <b>Pressure on Honest Brands</b> Verified pure cotton
                    fabrics come at a higher cost, making competition tough.
                  </li>
                </ul>
              </div>

              <p className="text-charcoal-900 leading-relaxed">
                The result: Comfort, durability, and trust are compromised — and
                real cotton quality becomes hard to find.
              </p>

              {/* Timeline */}
              <div className="pt-6 mt-6 border-t border-border-light">
                <p className="font-medium text-charcoal-950 mb-4">
                  What Actually Happens:
                </p>
                <div className="space-y-1">
                  <div className="timeline-item">
                    <span className="text-sm text-charcoal-600">Week 1:</span>
                    <p className="text-sm text-charcoal-900">
                      Feels soft. You're excited.
                    </p>
                  </div>
                  <div className="timeline-item">
                    <span className="text-sm text-charcoal-600">Month 1:</span>
                    <p className="text-sm text-charcoal-900">
                      Starting to feel stiff.
                    </p>
                  </div>
                  <div className="timeline-item">
                    <span className="text-sm text-charcoal-600">Month 3:</span>
                    <p className="text-sm text-charcoal-900">
                      Visible pilling begins.
                    </p>
                  </div>
                  <div className="timeline-item">
                    <span className="text-sm text-charcoal-600">Month 6:</span>
                    <p className="text-sm text-charcoal-900">
                      Color fading. Fabric feels harsh.
                    </p>
                  </div>
                  <div className="timeline-item">
                    <span className="text-sm text-charcoal-600">Year 2:</span>
                    <p className="text-sm text-charcoal-900">
                      Ends up in the donation pile.
                    </p>
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
                Our bedsheets are made from 100% pure cotton fabrics, never
                recycled, With a GSM range of 300–600 to suit comfort and
                durability preferences.
              </p>

              <ul className="feature-list text-charcoal-900 text-sm">
                <li>
                  <b>Higher Thread Count:</b> Provides a richer, more luxurious
                  feel than most blended alternatives.
                </li>
                <li>
                  <b>Natural Breathability:</b> Cotton regulates temperature,
                  keeping you cool and comfortable all night.
                </li>
                <li>
                  <b>Softness That Grows:</b> Fabric becomes softer and more
                  inviting with every wash.
                </li>
                <li>
                  <b>Long-Lasting Durability:</b> Designed to maintain softness,
                  color, and structure over years of use.
                </li>
                <li>
                  <b>Premium Lifespan:</b> With proper care, these bedsheets
                  offer many years of comfort and quality.
                </li>
              </ul>

              {/* Price Comparison */}
              <div className="bg-primary-50 p-6 rounded-medium mt-6">
                <p className="font-medium text-charcoal-950 mb-4 text-lg">
                  The Math is Simple
                </p>
                <p className="text-charcoal-700 mb-6">
                  Premium cotton may cost more upfront, but it delivers{" "}
                  <span className="font-semibold">
                    years of unmatched comfort, softness, and durability
                  </span>
                  .
                </p>

                <div className="grid grid-cols-2 gap-6 text-sm">
                  {/* Typical Cotton Bedsheet */}
                  <div className="space-y-3 p-4 bg-white rounded-medium shadow-sm">
                    <div className="flex items-center space-x-2">
                      <p className="text-charcoal-600 font-medium">
                        Typical "Cotton" Bedsheet
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">💰</span>
                      <p className="text-charcoal-950 font-semibold">
                        ₹699 – ₹1,300
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>📅</span>
                      <p>Lifespan: 1–2 years</p>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>💸</span>
                      <p>Cost per year: ₹350–1,300</p>
                    </div>
                    <div className="mt-2">
                      <div className="h-2 w-full bg-gray-200 rounded-full">
                        <div className="h-2 bg-gray-400 rounded-full w-20/100"></div>
                      </div>
                      <p className="text-gray-400 text-xs mt-1">
                        Comfort & Durability
                      </p>
                    </div>
                  </div>

                  {/* Daily Loom Bedsheet */}
                  <div className="space-y-3 p-4 bg-white rounded-medium shadow-sm border-2 border-primary-600">
                    <div className="flex items-center space-x-2">
                      <p className="text-primary-600 font-medium">
                        Daily Loom 100% Pure Cotton
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-primary-600">💰</span>
                      <p className="text-charcoal-950 font-semibold">
                        From ₹3,500
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>📅</span>
                      <p>Lifespan: 5–7 years</p>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>💸</span>
                      <p>Cost per year: ₹530–740</p>
                    </div>
                    <div className="mt-2">
                      <div className="h-2 w-full bg-gray-200 rounded-full">
                        <div className="h-2 bg-primary-600 rounded-full w-80/100"></div>
                      </div>
                      <p className="text-gray-400 text-xs mt-1">
                        Comfort & Durability
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-primary-700 text-sm mt-6 font-medium">
                  Investing once in premium cotton delivers{" "}
                  <span className="font-semibold">
                    years of unmatched comfort
                  </span>{" "}
                  — better than replacing multiple cheaper alternatives.
                </p>
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
                And rewards it generously, over time.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
                {[
                  { icon: "💧", text: "Wash in cool water" },
                  { icon: "🚫", text: "Skip the bleach" },
                  { icon: "🌀", text: "Tumble dry on low" },
                  { icon: "✨", text: "Iron on medium (optional)" },
                ].map((item) => (
                  <div key={item.text} className="text-center p-4">
                    <span className="text-2xl mb-3 block">{item.icon}</span>
                    <p className="text-sm text-charcoal-900">{item.text}</p>
                  </div>
                ))}
              </div>

              <p className="text-charcoal-600 text-sm mt-8 italic">
                A 90-second ritual every time you wash. A small investment that
                pays dividends every night you sleep.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
