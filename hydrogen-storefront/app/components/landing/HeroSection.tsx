import {useOutletContext} from '@remix-run/react';

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

  return (
    <section className="hero-section">
      {/* Background Video/Image - CSS-based parallax */}
      <div className="hero-background">
        {video?.url ? (
          <video
            className="hero-video"
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
            className="hero-image"
          />
        ) : (
          <div className="hero-placeholder">
            <span className="hero-placeholder-text">
              Video Placeholder
            </span>
            <span className="hero-placeholder-subtext">
              Macro photography of pristine cotton threads
            </span>
          </div>
        )}
      </div>

      {/* Dark gradient overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="hero-content">
        {/* Main content - positioned top-right */}
        <div className="hero-text-container">
          <div className="hero-text">
            <h1 className="hero-title fade-in-up">
              DAILY LOOM
            </h1>
            <p className="hero-tagline fade-in-up delay-200">
              Experience Natural Luxury
            </p>
          </div>
        </div>

        {/* Scroll indicator - bottom center */}
        <div className="hero-scroll-indicator fade-in delay-600">
          <span className="hero-scroll-text">
            Scroll to Discover
          </span>
          <div className="hero-scroll-arrow">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
