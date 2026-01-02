# Daily Loom - Premium Hydrogen Storefront

A premium, high-quality e-commerce storefront for Daily Loom, built with Shopify Hydrogen, React, Three.js, and Framer Motion.

## Features

- **Shopify Hydrogen** - Headless commerce framework
- **React 18** - Modern React with hooks
- **Three.js & React Three Fiber** - 3D fabric visualizations
- **Framer Motion** - Smooth page transitions and animations
- **TailwindCSS** - Utility-first styling with premium design tokens
- **TypeScript** - Type-safe development

## Premium Design Elements

- Elegant typography with Cormorant Garamond display font
- Premium color palette (earthy tones, gold accents)
- Smooth page transitions
- 3D floating fabric hero section
- Product card hover effects
- Parallax scrolling
- Custom cursor effects

## Getting Started

### Prerequisites

- Node.js 18+
- Shopify store with Storefront API access

### Installation

```bash
cd hydrogen-storefront
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in your Shopify credentials:

```env
SESSION_SECRET="your-session-secret"
PUBLIC_STOREFRONT_API_TOKEN="your-public-storefront-api-token"
PRIVATE_STOREFRONT_API_TOKEN="your-private-storefront-api-token"
PUBLIC_STORE_DOMAIN="your-store.myshopify.com"
PUBLIC_STOREFRONT_ID="your-storefront-id"
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Project Structure

```
hydrogen-storefront/
├── app/
│   ├── components/
│   │   ├── animations/     # Page transitions, motion components
│   │   ├── layout/         # Header, Footer
│   │   ├── product/        # Product cards, gallery
│   │   ├── sections/       # Hero, Featured, Categories, etc.
│   │   ├── three/          # Three.js 3D components
│   │   └── ui/             # Buttons, inputs, etc.
│   ├── lib/                # Utilities and helpers
│   ├── routes/             # Page routes
│   └── styles/             # Global CSS
├── public/
│   ├── fonts/
│   ├── images/
│   └── textures/
└── ...config files
```

## Collections Required

Set up these collections in your Shopify store:

- `featured` - Featured products for homepage
- `best-sellers` - Best selling products
- `duvet-covers` - Duvet cover products
- `bedsheets` - Bedsheet products
- `towels` - Towel products
- `pillows` - Pillow products

## Deployment

This project is configured for deployment to Shopify Oxygen. You can also deploy to:

- Vercel
- Netlify
- Cloudflare Pages

## License

Private - Daily Loom
