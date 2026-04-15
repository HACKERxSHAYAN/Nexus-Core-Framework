# NEXUS PORTFOLIO - Technical Specification

## Project Overview
- **Name**: NEXUS - Elite Portfolio
- **Type**: 15-page portfolio website
- **Core Functionality**: Full-stack portfolio showcasing projects, services, and skills with dark cyber aesthetic
- **Target Users**: Potential clients, employers, collaborators

## Visual & Rendering Specification

### Style System
- **Theme**: Dark Cyber/High-Tech with neon accents
- **Primary Colors**:
  - Background: `#0a0a0f` (deep black)
  - Surface: `#12121a` (card backgrounds)
  - Primary: `#00f0ff` (cyan neon)
  - Secondary: `#ff00aa` (magenta neon)
  - Accent: `#8b5cf6` (purple)
- **Typography**:
  - Headings: "Orbitron" (Google Fonts)
  - Body: "Rajdhani" (Google Fonts)
  - Code/Mono: "JetBrains Mono"

### Layout & Grid
- CSS Grid for main layouts
- Flexbox for components
- Breakpoints: 320px, 768px, 1024px, 1440px, 1920px

### Animations
- Page load: Staggered fade-in reveals
- Scroll: Intersection Observer triggered animations
- Hover: Scale, glow, color shift micro-interactions
- Cursor: Custom magnetic cursor effect
- Parallax: Subtle depth on scroll

## Page Structure

### 1. index.html - Home
- Hero with 3D particle background (Canvas)
- Dynamic typing effect ("Full-Stack Developer | Security Expert | UI Designer")
- Featured projects grid (3 cards)
- CTA buttons with glow effect

### 2. about.html - About
- Timeline/story layout
- Interactive skills hexagon (CSS)
- Progress bars with animated fill

### 3. services.html - Services
- 6 service cards with SVG icons
- Hover reveals with details
- Pricing teaser

### 4. portfolio.html - Portfolio
- Filter buttons (All, Web, Design, Security)
- Masonry-style grid
- Modal popup for case studies
- Category color coding

### 5. testimonial.html - Testimonials
- Auto-scrolling marquee
- Client cards with avatars
- Star ratings

### 6. blog.html - Blog/Insights
- Grid layout from JSON data
- Article cards with hover effects
- Category tags

### 7. contact.html - Contact
- Form with validation (name, email, message)
- Success animation (checkmark)
- localStorage save for submissions
- Social links

### 8. pricing.html - Pricing
- Monthly/Yearly toggle
- 3 pricing tiers
- "Most Popular" highlight
- Feature lists

### 9. faq.html - FAQ
- Accordion with smooth transitions
- Search filter
- Category grouping

### 10. 404.html - 404 Page
- Glitch effect text
- Animated 3D cube or particles
- Return home CTA

### 11-15. Inner Case Studies
- case-study-1.html: E-commerce Platform
- case-study-2.html: Admin Dashboard
- case-study-3.html: Security Audit Tool
- case-study-4.html: AI Analytics Dashboard
- case-study-5.html: Mobile Banking App

## Technical Features

### JavaScript Functionality
- Custom cursor with magnetic effect on interactive elements
- Smooth scroll with easing
- Intersection Observer for reveal animations
- Form validation with real-time feedback
- localStorage for favorites and form data
- Dynamic content loading from JSON
- Modal system with animations
- Filter system for portfolio

### CSS Features
- CSS Variables for theming
- Glassmorphism effects
- Neon glow effects
- Grid layouts
- Custom scrollbar
- Responsive breakpoints

## File Structure
```
/
├── index.html
├── about.html
├── services.html
├── portfolio.html
├── testimonial.html
├── blog.html
├── contact.html
├── pricing.html
├── faq.html
├── 404.html
├── case-study-1.html
├── case-study-2.html
├── case-study-3.html
├── case-study-4.html
├── case-study-5.html
├── css/
│   └── main.css
├── js/
│   └── main.js
├── data/
│   └── projects.json
└── assets/
    └── (placeholder images via picsum)
```

## Performance Targets
- Lighthouse score: 90+
- First Contentful Paint: < 1.5s
- Lazy load images
- Optimized CSS/JS delivery