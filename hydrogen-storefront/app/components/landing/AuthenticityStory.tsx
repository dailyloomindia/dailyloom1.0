const cards = [
  {
    title: "100% Pure Cotton, Zero Compromise",
    content: `Every thread of our bedsheets is authentically pure cotton — no polyester, no blends, no shortcuts.

    We source only premium cotton fabrics from certified, sustainable mills — never recycled, never mixed.

    The difference is tangible: in the softness you feel, in the breathable comfort through every night,and in how the fabric becomes more beautiful with every wash.
    
    Real cotton doesn’t just cover you — it adapts, comforts, and endures.`,
  },
  {
    title: "How to Spot Pure Cotton",
    items: [
      {
        label: "LUSTRE",
        description:
          "Pure cotton has a warm, subtle sheen that feels soft to the eye, unlike synthetic fabrics that can appear shiny or artificial.",
      },
      {
        label: "TOUCH",
        description:
          "From the first touch, cotton feels smooth, gentle, and inviting — truly comforting against your skin. Poly-blends may feel crisp, stiff, or synthetic.",
      },
      {
        label: "PILLING",
        description:
          "High-quality cotton resists pilling, retains its softness, and becomes more beautiful with every wash. Blends with synthetic fibers often show small pills sooner, especially with frequent use.",
      },
      {
        label: "AGING",
        description:
          "Pure cotton improves with every wash — softer, richer, more inviting. Blended fabrics can feel stiff or flat as they age.",
      },
      // {
      //   label: "Breathability & Comfort",
      //   description:
      //     "Cotton naturally regulates temperature, letting your skin breathe and keeping you comfortable all night.",
      // },
      // {
      //   label: "Moisture Absorption",
      //   description:
      //     "Absorbs sweat and moisture, leaving you dry, fresh, and cozy — unlike polyester blends that can feel clammy.",
      // }
    ],
  },
  {
    title: "Sourcing & Transparency",
    content: `We believe you deserve to know where your cotton comes from.

Our premium cotton fabrics are sourced from certified sustainable mills in India, crafted using traditional, water-efficient methods. We partner with the same trusted mills year after year, ensuring consistency, quality, and sustainability.

Every batch of fabric is rigorously tested for fiber authenticity, weave integrity, and color consistency before it reaches our facilities, so you can experience the true luxury of 100% cotton in every thread of your bedsheet.`,
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
            <div key={card.title} className="card-luxury p-8">
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
