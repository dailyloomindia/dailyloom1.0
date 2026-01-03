const cards = [
  {
    title: '100% Pure Cotton, Zero Compromise',
    content: `Every thread in our bedsheets is pure cotton. No polyester. No blending. No compromise.

We source directly from certified sustainable cotton farms that grow exclusively natural cotton—never recycled, never blended.

The difference? In your hands, in your sleep, in how the fabric ages. Real cotton breathes, adapts to your body, improves with every wash.`,
  },
  {
    title: 'How to Spot Pure Cotton',
    items: [
      {
        label: 'LUSTRE',
        description: 'Pure cotton has a warm, natural sheen. Poly-blends look dull and plastic-like.',
      },
      {
        label: 'TOUCH',
        description: 'Pure cotton feels soft immediately. Poly-blends feel crisp and harsh initially.',
      },
      {
        label: 'PILLING',
        description: 'Pure cotton resists pilling for years. Poly-blends pill within weeks.',
      },
      {
        label: 'AGING',
        description: 'Pure cotton becomes softer and more beautiful. Poly-blends become stiff and lose color.',
      },
    ],
  },
  {
    title: 'Sourcing & Transparency',
    content: `We believe you deserve to know where your cotton comes from.

Our cotton is sourced from certified sustainable farms in India, where cotton is grown using traditional water-efficient methods. We work with the same farmers year after year.

Every batch is tested for fiber quality, dye consistency, and purity before reaching our facilities.`,
  },
];

export function AuthenticityStory() {
  return (
    <section className="section-padding bg-white">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-display-lg font-display text-charcoal-950 font-light mb-4">
            Our Promise of Authenticity
          </h2>
          <div className="divider mx-auto" />
        </div>

        {/* Three-Card Grid */}
        <div className="grid-three-col">
          {cards.map((card) => (
            <div
              key={card.title}
              className="card-luxury p-8"
            >
              <h4 className="font-display text-xl text-charcoal-950 mb-6">
                {card.title}
              </h4>

              {card.content && (
                <div className="text-charcoal-900 leading-relaxed whitespace-pre-line text-sm">
                  {card.content}
                </div>
              )}

              {card.items && (
                <div className="space-y-5">
                  {card.items.map((item) => (
                    <div key={item.label}>
                      <span className="block text-primary-600 text-xs font-medium tracking-wider uppercase mb-1">
                        {item.label}
                      </span>
                      <p className="text-charcoal-900 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
