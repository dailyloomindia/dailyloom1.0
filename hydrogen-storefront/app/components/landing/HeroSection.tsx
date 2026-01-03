import {useOutletContext} from '@remix-run/react';
import {useEffect, useState} from 'react';

interface BrandAssets {
  video?: {
    url: string;
    mimeType?: string;
  } | null;
  videoPreviewImage?: {
    url: string;
    altText?: string;
  } | null;
}

export function HeroSection() {
  const context = useOutletContext<{brandAssets?: BrandAssets}>();
  const video = context?.brandAssets?.video;
  const posterImage = context?.brandAssets?.videoPreviewImage;

  const [scrollY, setScrollY] = useState(0);
  const [hideScrollIndicator, setHideScrollIndicator] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollY(currentScroll);
      setHideScrollIndicator(currentScroll > 80);
    };

    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax: background moves at 0.5x scroll speed
  const parallaxOffset = scrollY * 0.5;

  return (
    <section className="hero-redesign">
      {/* Background Video/Image with Parallax */}
      <div
        className="hero-bg-container"
        style={{transform: `translateY(${parallaxOffset}px)`}}
      >
        {video?.url ? (
          <video
            className="hero-bg-media"
            autoPlay
            muted
            loop
            playsInline
            poster={posterImage?.url}
          >
            <source src={video.url} type={video.mimeType || 'video/mp4'} />
          </video>
        ) : posterImage?.url ? (
          <img
            src={posterImage.url}
            alt={posterImage.altText || 'Daily Loom - Pure Cotton Textiles'}
            className="hero-bg-media"
          />
        ) : (
          <div className="hero-bg-placeholder">
            <span>Premium Cotton Textiles</span>
          </div>
        )}
      </div>

      {/* Gradient Overlay */}
      <div className="hero-gradient-overlay" />

      {/* Centered Content */}
      <div className="hero-center-content">
        <h1 className="hero-brand-title">
          DAILY LOOM
        </h1>
        <p className="hero-brand-tagline">
          Handcrafted Luxury Textiles
        </p>
        <p className="hero-brand-subtext">
          Experience Natural Luxury
        </p>
      </div>

      {/* Bottom Center Scroll Indicator */}
      <div
        className={`hero-scroll-cta ${hideScrollIndicator ? 'hidden' : ''}`}
        onClick={() => window.scrollTo({top: window.innerHeight, behavior: 'smooth'})}
      >
        <span className="hero-scroll-label">SCROLL TO DISCOVER</span>
        <div className="hero-scroll-arrow-container">
          <svg
            className="hero-scroll-arrow-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
