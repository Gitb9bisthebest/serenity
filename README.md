# Serenity Suites - Luxury Staycation Hotel

A stunning, modern luxury hotel website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- 🏨 **Luxury Design**: Material UI-inspired aesthetic with soft neutral tones
- 🎬 **Smooth Animations**: Framer Motion powered transitions and parallax effects
- 📱 **Fully Responsive**: Mobile-first design that works on all devices
- 🖼️ **Bento Grid Gallery**: Modern Instagram-style image layout
- 🏠 **Room Showcase**: Interactive carousel with detailed room information
- ⚡ **Performance Optimized**: Next.js Image optimization and lazy loading
- 🎨 **TypeScript**: Full type safety throughout the application
- 🎯 **SEO Optimized**: Meta tags, Open Graph, and structured data

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Images**: Next.js Image with Unsplash

## Getting Started

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd serenity-suites
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

\`\`\`
serenity-suites/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       └── badge.tsx
├── hooks/
│   └── use-mobile.tsx
├── lib/
│   └── utils.ts
├── types/
│   └── index.ts
├── next.config.mjs
├── tailwind.config.js
├── tsconfig.json
└── package.json
\`\`\`

## Key Components

- **Hero Section**: Full-screen parallax background with elegant typography
- **About Section**: Split layout with fade-in animations
- **Gallery**: Bento grid with hover effects and staggered animations
- **Rooms**: Interactive carousel showcasing luxury suites
- **Amenities**: Service cards with icon animations
- **Footer**: Contact information and social links

## Customization

### Colors
The color scheme uses warm stone and amber tones. Modify the colors in `tailwind.config.js`:

\`\`\`js
colors: {
  stone: { /* custom stone palette */ },
  amber: { /* custom amber palette */ },
}
\`\`\`

### Typography
The site uses system fonts with serif headings. Update font families in `tailwind.config.js`.

### Images
Replace Unsplash URLs with your own images in the component files.

## Performance

- **Image Optimization**: Next.js Image component with proper sizing
- **Lazy Loading**: Images load as they enter the viewport
- **Code Splitting**: Automatic code splitting with Next.js
- **SEO**: Comprehensive meta tags and Open Graph data

## Deployment

Deploy easily on Vercel:

\`\`\`bash
npm run build
\`\`\`

Or deploy to Vercel with one click:
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<your-repo-url>)

## License

This project is licensed under the MIT License.
