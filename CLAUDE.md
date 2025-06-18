# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern Japanese company website for Ludo Technologies built with Astro, showcasing tech services in Web3, AI, and cloud infrastructure. The site features advanced animations, form submissions to MongoDB, and is deployed to Vercel.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type check and build
npm run build

# Preview production build
npm run preview
```

## Architecture

### Tech Stack
- **Astro 5** - Static site generator with server-side rendering enabled
- **React** - Interactive components (ProjectCard, TechCategory, etc.)
- **TypeScript** - Type safety throughout
- **Tailwind CSS** - Styling with custom theme and animations
- **GSAP** - Advanced animations and interactions
- **MongoDB** - Contact form submissions
- **Vercel** - Deployment platform

### Project Structure
```
src/
├── components/         # React components (.tsx)
├── layouts/           # Astro layout components
├── pages/             # Astro pages and API routes
│   └── api/          # Server-side API endpoints
├── utils/            # Animation utilities and helpers
└── assets/           # Images and static assets
```

### Key Components
- `Layout.astro` - Main layout with navigation, footer, theme toggle
- `ProjectCard.tsx` - Animated project showcase cards with GSAP
- `pages/api/contact.ts` - MongoDB contact form handler
- `utils/animations.ts` - Comprehensive GSAP animation library

### Styling System
- Custom Tailwind theme with primary/accent color schemes
- Extensive custom animations and keyframes
- Dark mode support via CSS classes
- Japanese typography with Noto Sans JP fonts

### Animation Architecture
The site uses GSAP for sophisticated animations:
- Mouse followers and particle effects
- Scroll-triggered animations with ScrollTrigger
- 3D transformations and parallax effects
- Interactive hover states and magnetic buttons
- Staggered text reveals and counters

### API Integration
- Contact form posts to `/api/contact.ts`
- MongoDB integration for inquiry storage
- Server-side form validation and error handling

## Important Notes

- Site language: Japanese (navigation, content, form labels)
- Server output mode enabled for MongoDB API routes
- Environment variable MONGODB_URI required for contact forms
- All images use Astro's optimized Image component
- Extensive use of GSAP plugins (ScrollTrigger, MorphSVG, etc.)