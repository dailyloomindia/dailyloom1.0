import {useState, useEffect} from 'react';

const testimonials = [
  {
    id: 1,
    quote: `I couldn't believe the difference from day one. I put these sheets on my bed and... they just felt different. Better. More luxurious. Like I'd bought something actually premium.

I was worried they'd feel stiff at first. But they didn't. They were soft immediately. And now, a month in? Even better.

I recommend these to everyone. Not because I'm paid to. But because they're actually good.`,
    author: 'Priya S.',
    location: 'Mumbai',
    timeframe: 'After 1 month',
  },
  {
    id: 2,
    quote: `I had these regular bedsheets I bought for ₹500. After a few months, they were pilling like crazy. They felt harsh. I was replacing them every season.

Then I got Daily Loom. I was nervous about the price. But I did the math. I was spending ₹1,500-2,000 a year replacing cheap sheets anyway.

Six months in, I'm convinced. These will last years. And they're actually getting softer, not harsher.

It's not an expensive purchase. It's a smart purchase.`,
    author: 'Rahul M.',
    location: 'Delhi',
    timeframe: 'After 6 months',
  },
  {
    id: 3,
    quote: `I've had these sheets for three years now. I sleep on them every single night. I wash them weekly.

They're softer than they were when I bought them. The color hasn't faded. There's zero pilling. They feel like an investment that's paying dividends.

My friends ask me about them all the time because they notice how good my bed looks and feels.

Best purchase I've made. Period.`,
    author: 'Ananya K.',
    location: 'Bangalore',
    timeframe: 'After 3 years',
  },
];

const timelineQuotes = [
  {year: 'Year 0', quote: 'Looks premium, feels premium.'},
  {year: 'Year 1', quote: 'They feel better every time I wash them!'},
  {year: 'Year 3', quote: 'My favorite sheets in the entire house.'},
  {year: 'Year 5', quote: 'Why would I replace something this good?'},
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  return (
    <section className="section-padding bg-cream-100">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-display-lg font-display text-charcoal-950 font-light mb-4">
            What Our Customers Say
          </h2>
          <div className="divider mx-auto" />
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-3xl mx-auto">
          <div
            className="relative min-h-[350px]"
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
          >
            <div className="testimonial-card">
              {/* Quote Icon */}
              <div className="text-primary-300 mb-6">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L9.373 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.004zm9.124 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.692-1.327-.817-.56-.124-1.074-.13-1.54-.022-.16-.94.09-1.95.75-3.02.66-1.06 1.514-1.86 2.557-2.4L18.49 5c-.8.396-1.555.898-2.26 1.505-.708.607-1.34 1.305-1.894 2.094-.556.79-.97 1.68-1.24 2.69-.273 1-.345 2.04-.217 3.1.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.004z" />
                </svg>
              </div>

              {/* Quote Text */}
              <blockquote className="text-charcoal-900 leading-relaxed whitespace-pre-line mb-8">
                {testimonials[currentIndex].quote}
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-between border-t border-border-light pt-6">
                <div>
                  <p className="font-medium text-charcoal-950">
                    {testimonials[currentIndex].author}
                  </p>
                  <p className="text-sm text-charcoal-500">
                    {testimonials[currentIndex].location}
                  </p>
                </div>
                <span className="text-primary-600 text-sm font-medium">
                  {testimonials[currentIndex].timeframe}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`testimonial-dot ${index === currentIndex ? 'active' : ''}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Timeline Quotes */}
        <div className="mt-20 pt-16 border-t border-border-light">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {timelineQuotes.map((item) => (
              <div key={item.year} className="text-center">
                <span className="text-primary-600 text-xs uppercase tracking-wider font-medium">
                  {item.year}
                </span>
                <p className="font-display text-lg text-charcoal-950 mt-2 italic">
                  "{item.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantee */}
        <div className="mt-20 text-center max-w-2xl mx-auto">
          <div className="bg-white p-10 rounded-medium shadow-subtle">
            <h4 className="font-display text-2xl text-charcoal-950 mb-4">
              We're Confident in What We Make.
            </h4>
            <p className="text-charcoal-900 leading-relaxed mb-6">
              If your Daily Loom sheets don't feel like the most
              luxurious fabric you own within 30 days,
              we'll refund you completely.
            </p>
            <p className="text-charcoal-600 text-sm">
              No questions. No asterisks. No catch.
              <br />
              We'll trust your experience over our pitch.
            </p>
            <p className="text-primary-600 text-sm mt-6 font-medium italic">
              (We've never had to issue a single refund.)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
