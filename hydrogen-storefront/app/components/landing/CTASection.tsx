import { useState } from "react";
import { Link } from "@remix-run/react";

export function CTASection() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSuccess(true);
    setIsSubmitting(false);
    setEmail("");
  };

  return (
    <section className="bg-charcoal-950">
      {/* Decision Summary */}
      <div className="section-padding">
        <div className="container-luxury">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-display-lg font-display text-cream-100 font-light mb-8">
              Choosing Daily Loom Means Choosing
            </h2>

            <ul className="space-y-4 text-cream-100 text-lg">
              {[
                "Pure cotton, used without blending or shortcuts",
                "Materials designed to endure, season after season",
                "Textiles that soften and mature with time",
                "A commitment to responsible, sustainable sourcing",
                "Objects made for daily ritual, not disposability",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center justify-center gap-3"
                >
                  <span className="text-primary-400">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <Link
                to="/collections/all"
                className="btn-luxury bg-primary-500 text-cream-100 hover:bg-primary-600"
              >
                Explore the Collection
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Email Signup */}
      <div className="py-16 border-t border-charcoal-800">
        <div className="container-luxury">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-display text-2xl text-cream-100 mb-3">
              Beginning with Better Materials
            </h3>

            <p className="text-cream-200 mb-8">A considered way to start.</p>

            <p className="text-cream-300 text-sm mb-6">
              Receive our guide on transitioning to pure cotton, along with
              insights on care, comfort, and longevity.
            </p>

            {success ? (
              <div className="bg-primary-500/20 text-primary-300 p-4 rounded-medium">
                <p className="font-medium">Welcome to Daily Loom.</p>
                <p className="text-sm mt-1 opacity-80">
                  Your guide and welcome note will arrive shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="flex-1 px-5 py-4 bg-charcoal-900 border border-charcoal-700 text-cream-100 placeholder:text-charcoal-500 focus:outline-none focus:border-primary-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-luxury bg-primary-500 text-cream-100 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending…" : "Join Us"}
                </button>
              </form>
            )}

            {error && <p className="text-red-400 text-sm mt-3">{error}</p>}

            <p className="text-charcoal-500 text-xs mt-4">
              We value your privacy. Leave anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
