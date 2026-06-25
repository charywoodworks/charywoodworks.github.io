# Implementation Plan:

## Overview

This implementation plan covers building a static business website for a Hyderabad-based woodworking business using Astro, Tailwind CSS, and Decap CMS deployed on Netlify. Tasks are ordered by dependency: foundational setup first, then core components, then pages, then optimization and deployment.

## Tasks

- [x] 1. Initialize Astro project with Tailwind CSS, configure design tokens (wood colors, fonts, spacing), create project structure with `src/components/`, `src/content/`, `src/data/`, `src/layouts/`, `src/pages/`, `public/admin/`, create `netlify.toml` with build config and security headers, create `robots.txt`, verify build succeeds
  - Requirements: R13, R15

- [x] 2. Create content data layer: define Zod schemas in `src/content/config.ts` for categories, gallery, reviews, and materials collections; create `src/data/site.json` (business info, phone, hours), `faq.json` (6 entries), `process-steps.json` (11 steps), `homepage.json`, `navigation.json`; create sample content files for all 14 categories, 5 gallery projects, 5 reviews, 7 materials; verify collections parse on build
  - Requirements: R3, R4, R8, R17

- [x] 3. Create BaseLayout with SEOHead component (meta title/description, OG tags, Twitter Cards, JSON-LD schema slot), responsive HTML document structure, and slots for nav/main/footer content
  - Requirements: R12, R18

- [x] 4. Build Header component with responsive navigation (horizontal on ≥768px, hamburger menu on <768px with toggle script), active page highlighting, and Footer component with business info, WhatsApp CTA link, email, service area, quick links matching nav sections, social media links
  - Requirements: R18, R11

- [x] 5. Build WhatsAppCTA component (props: message, label, variant, size, fullWidth) generating wa.me URLs with encoded prefilled text, meeting 44x44px touch targets and WCAG AA contrast; build StickyWhatsApp component (fixed bottom-right, z-50, 16px offset, general enquiry message); add StickyWhatsApp to BaseLayout
  - Requirements: R1

- [x] 6. Build Homepage: HeroSection with headline, value proposition (≤30 words), primary WhatsApp CTA above fold on 320px mobile; services overview grid linking to category pages; "How It Works" summary (4+ numbered steps); "Why Choose Us" (3+ differentiators); secondary WhatsApp CTA before footer; LocalBusiness schema; meta tags with Hyderabad keywords
  - Requirements: R2, R1, R6

- [x] 7. Build Product Categories: index page with grid of CategoryCard components linking to individual pages; dynamic `[slug].astro` route generating 14 pages from content collection; each page shows description (≥2 sentences), customization options (≥2), materials (≥2), image or labeled placeholder, category-specific WhatsApp CTA with prefilled message; Service schema per page
  - Requirements: R3, R17

- [x] 8. Build Gallery page: GalleryFilter component with "All" default + category buttons; ProjectCard component showing image, material, dimensions (ft), finish, location, "Sample" label on placeholders, "Request Similar Design" WhatsApp CTA; client-side filter script using data-category attributes; empty state with WhatsApp CTA; Product schema
  - Requirements: R4

- [x] 9. Build Hire a Carpenter page: list ≥6 common small works with ServiceCard components (1-2 sentence descriptions); display response time, service area coverage, pricing model indication; WhatsApp CTA with prefilled hire-carpenter message; Service schema; meta tags with "hire carpenter Hyderabad" keywords
  - Requirements: R5

- [x] 10. Build About page: business background narrative, years-of-experience indicator, expertise list (≥3 items), service philosophy statement, geographic service area, WhatsApp CTA with engagement message; LocalBusiness schema
  - Requirements: R7

- [x] 11. Build Reviews page: fetch reviews collection, display ReviewCard components (name/initial, project type, text, optional rating); responsive grid layout; WhatsApp CTA for convinced visitors; Google Reviews link to Google Business Profile; handle empty state with static testimonials
  - Requirements: R8

- [x] 12. Build Contact page: WhatsApp CTA as most prominent element; phone (tap-to-call), email (tap-to-email), service area, operating hours per day; Google Maps iframe embed with fallback link; Google Business Profile link; LocalBusiness schema with consistent NAP
  - Requirements: R9, R16

- [x] 13. Build FAQ page: load faq.json, render FAQAccordion component using HTML details/summary elements; single-open behavior via script; all collapsed by default; ≥6 FAQs covering required topics; WhatsApp CTA below with "question not in FAQ" message; FAQPage schema for rich results
  - Requirements: R10

- [x] 14. Build Services overview page: group all categories logically (Furniture, Woodwork, Small Works); link to category pages; Materials section with MaterialCard components showing name, description, budget tier, applicable categories, material enquiry WhatsApp CTA; handle placeholder materials
  - Requirements: R3, R17

- [x] 15. Build 404 page: friendly message, navigation links to homepage and major sections, WhatsApp CTA for assistance; verify Netlify redirect serves this page for unmatched URLs
  - Requirements: R13

- [x] 16. Create placeholder images for all 14 categories (800px+ width, "Placeholder" labeled), hero background (1920px, 16:9), configure Astro Image for WebP conversion with JPEG fallback, responsive srcset (400w/800w/1200w), lazy loading, explicit dimensions; verify no image exceeds 200KB in build output
  - Requirements: R15, R12, R4

- [x] 17. Install @astrojs/sitemap, configure sitemap generation, verify sitemap includes all public pages, verify robots.txt references sitemap; audit all pages for heading hierarchy, unique meta titles/descriptions, OG/Twitter tags, schema markup correctness
  - Requirements: R12

- [x] 18. Set up Decap CMS: create `public/admin/index.html` and `config.yml` with git-gateway backend, all collections (categories, gallery, reviews, materials, site-data/FAQ/homepage); document admin usage in README.md
  - Requirements: R14

- [x] 19. Responsive design verification: test all pages at 320px/375px/768px/1024px/1440px; verify no horizontal overflow, hamburger menu works, sticky button non-overlap, 44px tap targets, 16px body font, 1.4 line-height, color palette consistency (≤5 colors via CSS vars), WCAG AA contrast, font fallback without layout shift, touch operability for gallery filters and FAQ accordion
  - Requirements: R11, R15

- [x] 20. Performance optimization: run production build, verify output <50MB; run Lighthouse mobile audit targeting ≥90 performance (FCP <1.5s, LCP <2.5s, TBT <200ms, CLS <0.1); add critical font/image preload hints; verify CSS purging; verify HTML renders without JS execution; verify all content accessible in static HTML
  - Requirements: R13, R11

- [x] 21. Deploy to Netlify: init git repo, push to GitHub, connect to Netlify, configure custom domain with HTTPS, enable Netlify Identity + Git Gateway for CMS auth; test all WhatsApp links on real mobile devices; test CMS login and content editing on production; run final Lighthouse audit; verify security headers; create Google Business Profile setup guide in `docs/google-business-setup.md`
  - Requirements: R13, R14, R16

## Task Dependency Graph

```json
{
  "waves": [
    {
      "wave": 1,
      "tasks": [1],
      "description": "Project initialization and configuration"
    },
    {
      "wave": 2,
      "tasks": [2, 3],
      "description": "Content data layer and base layout setup"
    },
    {
      "wave": 3,
      "tasks": [4, 5],
      "description": "Navigation components and WhatsApp CTA system"
    },
    {
      "wave": 4,
      "tasks": [6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      "description": "All page implementations (parallelizable)"
    },
    {
      "wave": 5,
      "tasks": [16, 17, 18],
      "description": "Images, sitemap/SEO audit, and CMS setup"
    },
    {
      "wave": 6,
      "tasks": [19, 20],
      "description": "Responsive verification and performance optimization"
    },
    {
      "wave": 7,
      "tasks": [21],
      "description": "Deployment and final testing"
    }
  ]
}
```

## Notes

- Tasks 6-15 (page builds) can be parallelized once tasks 2-5 are complete
- Task 16 (images) can start alongside page development but must complete before task 20
- Task 18 (CMS) is independent of page development and can be done in parallel with tasks 6-15
- The phone number in `site.json` should use format `919XXXXXXXXX` (country code + number, no + or spaces) for wa.me URL compatibility
- Placeholder content should be clearly marked so the business owner knows what to replace via CMS
