import { useOutletContext } from "@remix-run/react";
import { useEffect, useState, useRef } from "react";

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
  const context = useOutletContext<{ brandAssets?: BrandAssets }>();
  const video = context?.brandAssets?.video;
  const posterImage = context?.brandAssets?.videoPreviewImage;
  const videoRef = useRef<HTMLVideoElement>(null);

  const [scrollY, setScrollY] = useState(0);
  const [hideScrollIndicator, setHideScrollIndicator] = useState(false);

  // Start true (muted) to guarantee autoplay works on browser load.
  const [isMuted, setIsMuted] = useState(true);

  // Handle Autoplay on Mount
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl || !video?.url) return;

    const ensurePlay = async () => {
      // Always start muted to comply with browser autoplay policies
      videoEl.muted = true;
      try {
        await videoEl.play();
      } catch (e) {
        console.warn("Autoplay failed:", e);
      }
    };
    ensurePlay();
  }, [video?.url]);

  // Handle Side Effects when Mute State Changes
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    // Sync property
    videoEl.muted = isMuted;

    // Safety check: If unmuting caused a pause (browser policy), force play
    if (!isMuted && videoEl.paused) {
      videoEl
        .play()
        .catch((e) => console.warn("Playback after unmute failed:", e));
    }
  }, [isMuted]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollY(currentScroll);
      setHideScrollIndicator(currentScroll > 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    // Stop all propagation to ensure the button receives the click
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    e.preventDefault();

    // Toggle state
    setIsMuted((prev) => !prev);
  };

  // Parallax: background moves at 0.5x scroll speed
  const parallaxOffset = scrollY * 0.5;

  return (
    <section className="hero-redesign relative w-full h-screen overflow-hidden">
      {/* LAYER 1: Background Video/Image (z-0)
         pointer-events-none ensures it never captures clicks
      */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        {video?.url ? (
          <video
            ref={videoRef}
            className="hero-bg-media w-full h-full object-cover"
            autoPlay
            playsInline
            loop
            muted={isMuted} // Controlled by React state
            preload="auto"
            poster={posterImage?.url}
          >
            <source src={video.url} type={video.mimeType || "video/mp4"} />
          </video>
        ) : posterImage?.url ? (
          <img
            src={posterImage.url}
            alt={posterImage.altText || "Daily Loom - Pure Cotton Textiles"}
            className="hero-bg-media w-full h-full object-cover"
          />
        ) : (
          <div className="hero-bg-placeholder w-full h-full flex items-center justify-center bg-gray-200">
            <span>Premium Cotton Textiles</span>
          </div>
        )}
      </div>

      {/* LAYER 2: Gradient Overlay (z-10)
         pointer-events-none ensures clicks pass through to background or are ignored
      */}
      <div className="hero-gradient-overlay absolute inset-0 z-10 pointer-events-none" />

      {/* LAYER 3: Centered Content (z-20)
         pointer-events-none on container so it doesn't block the video layer if we need it,
         but text should be visible.
      */}
      <div className="hero-center-content relative z-20 pointer-events-none h-full flex flex-col justify-center items-center">
        <h1 className="hero-brand-title">DAILY LOOM</h1>
        <p className="hero-brand-tagline">Handcrafted Luxury Textiles</p>
        <p className="hero-brand-subtext">Experience Natural Luxury</p>
      </div>

      {/* LAYER 4: Interactive Controls (z-50)
         Explicit pointer-events-auto to capture clicks
      */}
      {video?.url && (
        <button
          onClick={toggleMute}
          // Using inline zIndex to guarantee it sits on top, and pointer-events-auto to re-enable clicks
          style={{ zIndex: 100 }}
          className="absolute bottom-8 right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-cream-100 transition-all duration-300 group border border-white/20 cursor-pointer shadow-lg pointer-events-auto"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          type="button"
        >
          {isMuted ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pointer-events-none"
            >
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pointer-events-none"
            >
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>
      )}

      {/* Scroll Indicator (z-50) */}
      <div
        className={`hero-scroll-cta absolute bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto cursor-pointer ${hideScrollIndicator ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        onClick={() =>
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
        }
        // Ensure this is also clickable
        style={{ zIndex: 100 }}
      >
        <span className="hero-scroll-label block text-center mb-2 text-white/80 text-xs tracking-widest">
          SCROLL TO DISCOVER
        </span>
        <div className="hero-scroll-arrow-container flex justify-center">
          <svg
            className="hero-scroll-arrow-icon text-white/80"
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
