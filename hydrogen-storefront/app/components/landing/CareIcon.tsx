export default function WashIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="w-full h-full text-charcoal-700 group-hover:text-charcoal-950 transition-colors"
    >
      <path d="M3 6h18M5 6l1 14h12l1-14" />
      <circle cx="12" cy="14" r="4" />
    </svg>
  );
}

export function NoBleachIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      <path d="M12 3l6 14H6l6-14z" />
      <path d="M5 5l14 14" />
    </svg>
  );
}

export function AirDryIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      <path d="M3 12h10" />
      <path d="M3 8h6" />
      <path d="M3 16h8" />
      <path d="M15 9c2 0 4 1.5 4 3s-2 3-4 3" />
    </svg>
  );
}

export function IronIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      <path d="M3 16h15a3 3 0 003-3v-2H9a6 6 0 00-6 6z" />
      <circle cx="16" cy="14" r="1" />
    </svg>
  );
}

export function NoSoftenerIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      <path d="M7 3h10l-1 18H8L7 3z" />
      <path d="M5 5l14 14" />
    </svg>
  );
}

export function LatexLeafIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      <path d="M4 14c6-8 12-8 16-8-2 10-8 14-12 14-2 0-4-2-4-6z" />
      <path d="M8 14c2 2 4 3 6 4" />
    </svg>
  );
}

export function LowDryIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      {/* Drum */}
      <circle cx="12" cy="13" r="6" />

      {/* Gentle tumble motion */}
      <path d="M9 12c1 1 2 2 3 2s2-1 3-2" />

      {/* Low heat indicator (single dot) */}
      <circle cx="12" cy="5" r="1" />
    </svg>
  );
}

export function SpotCleanIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      {/* Droplet */}
      <path d="M12 3s4 5 4 8a4 4 0 01-8 0c0-3 4-8 4-8z" />
      {/* Spot */}
      <circle cx="12" cy="14" r="1.5" />
    </svg>
  );
}

export function NoWashIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      {/* Wash tub */}
      <path d="M3 6h18M5 6l1 14h12l1-14" />
      {/* Strike-through */}
      <path d="M5 5l14 14" />
    </svg>
  );
}

export function ShadeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      {/* Sun */}
      <circle cx="17" cy="7" r="3" />
      {/* Shade line */}
      <path d="M3 21L21 3" />
      {/* Air line */}
      <path d="M4 14h6" />
    </svg>
  );
}

export function CoverIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      {/* Pillow */}
      <rect x="4" y="7" width="16" height="10" rx="3" />
      {/* Protective layer */}
      <path d="M6 9h12" />
    </svg>
  );
}
