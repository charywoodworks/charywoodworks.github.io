# Design Document

## Overview

This document defines the technical architecture and design for a static business website serving a woodworking and contracting business in Hyderabad, India. The site is built with Astro as the static site generator, Tailwind CSS for styling, content managed through Markdown/JSON files with Decap CMS (formerly Netlify CMS) as the admin interface, and deployed on Netlify.

## Architecture

### Technology Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Static Site Generator | Astro 4.x | Zero-JS by default, partial hydration, content collections, excellent build performance |
| Styling | Tailwind CSS 3.x | Utility-first, mobile-first responsive, small production bundle with purging |
| Content Management | Decap CMS (git-based) | No database needed, commits to repo, free, visual editor for non-technical users |
| Content Format | Markdown + JSON | Human-readable, git-friendly, easy to edit manually or via CMS |
| Hosting | Netlify | Free tier, automatic deploys from git, form handling, CDN, custom domain, HTTPS |
| Image Optimization | Astro Image (sharp) | Build-time WebP conversion, responsive sizes, lazy loading |
| Icons | Lucide Icons (SVG) | Lightweight, tree-shakeable, consistent design language |

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        VISITOR BROWSER                        │
│  ┌─────────┐  ┌──────────┐  ┌───────────┐  ┌───────────┐  │
│  │ Static  │  │ Tailwind │  │  Minimal  │  │  WhatsApp  │  │
│  │  HTML   │  │   CSS    │  │    JS     │  │  wa.me     │  │
│  └─────────┘  └──────────┘  └───────────┘  └───────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────▼──────────┐
                    │   Netlify CDN      │
                    │   (Static Files)   │
                    └─────────┬──────────┘
                              │
              ┌───────────────▼───────────────┐
              │        Build Pipeline          │
              │  Astro Build → Static Output   │
              └───────────────┬───────────────┘
                              │
         ┌────────────────────▼────────────────────┐
         │              Git Repository              │
         │  ┌──────────┐  ┌──────────┐  ┌───────┐ │
         │  │ src/     │  │ content/ │  │public/│ │
         │  │ (code)   │  │ (data)   │  │(assets)│ │
         │  └──────────┘  └──────────┘  └───────┘ │
         └────────────────────┬────────────────────┘
                              │
                    ┌─────────▼──────────┐
                    │    Decap CMS       │
                    │  (Admin Panel at   │
                    │  /admin route)     │
                    └────────────────────┘
```

## Project Structure

```
woodworking-website/
├── astro.config.mjs          # Astro configuration
├── tailwind.config.mjs       # Tailwind configuration with design tokens
├── package.json
├── public/
│   ├── admin/
│   │   ├── index.html        # Decap CMS admin panel entry
│   │   └── config.yml        # Decap CMS configuration
│   ├── robots.txt
│   ├── favicon.svg
│   └── images/
│       ├── gallery/          # Project photos
│       ├── categories/       # Category representative images
│       └── placeholders/     # Placeholder images
├── src/
│   ├── components/
│   │   ├── WhatsAppCTA.astro         # Reusable WhatsApp button
│   │   ├── StickyWhatsApp.astro      # Floating sticky button
│   │   ├── Header.astro              # Navigation header
│   │   ├── Footer.astro              # Site footer
│   │   ├── HeroSection.astro         # Homepage hero
│   │   ├── CategoryCard.astro        # Product category card
│   │   ├── ProjectCard.astro         # Gallery project card
│   │   ├── ReviewCard.astro          # Testimonial card
│   │   ├── ProcessStep.astro         # Workflow step item
│   │   ├── FAQAccordion.astro        # Expandable FAQ (client JS)
│   │   ├── GalleryFilter.astro       # Gallery category filter
│   │   ├── MaterialCard.astro        # Material info card
│   │   ├── ServiceCard.astro         # Small works service card
│   │   └── SEOHead.astro             # Meta tags, OG, schema
│   ├── layouts/
│   │   └── BaseLayout.astro          # Shared layout (head, nav, footer)
│   ├── pages/
│   │   ├── index.astro               # Homepage
│   │   ├── about.astro               # About page
│   │   ├── services.astro            # Services overview
│   │   ├── products/
│   │   │   ├── index.astro           # All categories listing
│   │   │   └── [slug].astro          # Dynamic category pages
│   │   ├── gallery.astro             # Gallery with filtering
│   │   ├── hire-carpenter.astro      # Hire a carpenter page
│   │   ├── reviews.astro             # Reviews/testimonials
│   │   ├── contact.astro             # Contact page
│   │   ├── faq.astro                 # FAQ page
│   │   └── 404.astro                 # Custom 404 page
│   ├── content/
│   │   ├── config.ts                 # Astro content collection schemas
│   │   ├── categories/               # Markdown files per category
│   │   ├── gallery/                  # Markdown files per project
│   │   ├── reviews/                  # Markdown files per review
│   │   └── materials/                # Markdown files per material
│   ├── data/
│   │   ├── site.json                 # Global site config (phone, name, hours)
│   │   ├── navigation.json           # Nav menu structure
│   │   ├── faq.json                  # FAQ questions and answers
│   │   ├── process-steps.json        # Business workflow steps
│   │   └── homepage.json             # Homepage section content
│   └── styles/
│       └── global.css                # Tailwind directives + custom utilities
└── netlify.toml                      # Netlify build configuration
```

## Data Models

### Site Configuration (`src/data/site.json`)

```json
{
  "businessName": "string",
  "phone": "string (with country code, e.g., +91XXXXXXXXXX)",
  "whatsappNumber": "string (without + prefix for wa.me URL)",
  "email": "string",
  "address": "string",
  "serviceArea": "string",
  "googleMapsEmbedUrl": "string",
  "googleMapsLink": "string",
  "googleBusinessProfileUrl": "string",
  "socialLinks": {
    "instagram": "string | null",
    "facebook": "string | null",
    "youtube": "string | null"
  },
  "operatingHours": [
    { "day": "string", "hours": "string" }
  ]
}
```

### Product Category Content Collection Schema

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const categoriesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    shortDescription: z.string().max(100),
    image: z.string(),
    imageAlt: z.string().min(5).max(125),
    isPlaceholder: z.boolean().default(true),
    customizationOptions: z.array(z.string()).min(2),
    materials: z.array(z.string()).min(2),
    whatsappMessage: z.string(),
    order: z.number(),
  }),
});
```

### Gallery Project Content Collection Schema

```typescript
const galleryCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.string(), // references category slug
    image: z.string(),
    imageAlt: z.string().min(5).max(125),
    isPlaceholder: z.boolean().default(true),
    materialType: z.string(),
    dimensions: z.string(), // e.g., "6ft x 4ft"
    finishType: z.string(),
    location: z.string(), // area in Hyderabad
    whatsappMessage: z.string(),
    date: z.date().optional(),
  }),
});
```

### Reviews Content Collection Schema

```typescript
const reviewsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    customerName: z.string(),
    projectType: z.string(),
    rating: z.number().min(1).max(5).optional(),
    date: z.date().optional(),
    source: z.enum(['manual', 'google']).default('manual'),
  }),
});
```

### Materials Content Collection Schema

```typescript
const materialsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    budgetTier: z.enum(['Budget', 'Mid-Range', 'Premium']),
    applicableCategories: z.array(z.string()),
    order: z.number(),
    isPlaceholder: z.boolean().default(false),
  }),
});
```

### FAQ Data (`src/data/faq.json`)

```json
[
  {
    "question": "string",
    "answer": "string",
    "topic": "pricing | materials | timeline | serviceArea | payment | warranty"
  }
]
```

### Process Steps Data (`src/data/process-steps.json`)

```json
[
  {
    "step": 1,
    "title": "string (max 50 chars)",
    "description": "string",
    "icon": "string (lucide icon name)"
  }
]
```

## Component Design

## Components and Interfaces

### WhatsAppCTA Component

The core conversion component used across all pages.

```astro
---
// src/components/WhatsAppCTA.astro
interface Props {
  message: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  class?: string;
}

const { message, label, variant = 'primary', size = 'md', fullWidth = false } = Astro.props;

// Import phone number from site config
import siteData from '../data/site.json';
const whatsappUrl = `https://wa.me/${siteData.whatsappNumber}?text=${encodeURIComponent(message)}`;
---

<a
  href={whatsappUrl}
  target="_blank"
  rel="noopener noreferrer"
  class:list={[
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors',
    'min-h-[44px] min-w-[44px]', /* WCAG touch target */
    variant === 'primary' && 'bg-green-600 text-white hover:bg-green-700',
    variant === 'secondary' && 'bg-amber-700 text-white hover:bg-amber-800',
    variant === 'outline' && 'border-2 border-green-600 text-green-700 hover:bg-green-50',
    size === 'sm' && 'px-4 py-2 text-sm',
    size === 'md' && 'px-6 py-3 text-base',
    size === 'lg' && 'px-8 py-4 text-lg',
    fullWidth && 'w-full',
  ]}
  aria-label={`Contact via WhatsApp: ${label}`}
>
  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><!-- WhatsApp icon SVG --></svg>
  {label}
</a>
```

### StickyWhatsApp Component

```astro
---
// src/components/StickyWhatsApp.astro
import siteData from '../data/site.json';
const message = "Hi, I am visiting your website and would like to enquire about your woodworking services.";
const whatsappUrl = `https://wa.me/${siteData.whatsappNumber}?text=${encodeURIComponent(message)}`;
---

<a
  href={whatsappUrl}
  target="_blank"
  rel="noopener noreferrer"
  class="fixed bottom-4 right-4 z-50 flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-colors"
  aria-label="Chat on WhatsApp"
>
  <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
    <!-- WhatsApp icon SVG path -->
  </svg>
</a>
```

### ProjectCard Component

```astro
---
// src/components/ProjectCard.astro
interface Props {
  title: string;
  image: string;
  imageAlt: string;
  isPlaceholder: boolean;
  materialType: string;
  dimensions: string;
  finishType: string;
  location: string;
  category: string;
  whatsappMessage: string;
}
const props = Astro.props;
import siteData from '../data/site.json';
const whatsappUrl = `https://wa.me/${siteData.whatsappNumber}?text=${encodeURIComponent(props.whatsappMessage)}`;
---

<article class="bg-white rounded-xl shadow-sm overflow-hidden border border-stone-200 hover:shadow-md transition-shadow">
  <div class="relative aspect-[4/3]">
    <img
      src={props.image}
      alt={props.imageAlt}
      class="w-full h-full object-cover"
      loading="lazy"
      decoding="async"
    />
    {props.isPlaceholder && (
      <span class="absolute top-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded">
        Sample
      </span>
    )}
  </div>
  <div class="p-4">
    <h3 class="font-semibold text-stone-800 text-lg">{props.title}</h3>
    <div class="mt-2 grid grid-cols-2 gap-1 text-sm text-stone-600">
      <span>📐 {props.dimensions}</span>
      <span>🪵 {props.materialType}</span>
      <span>✨ {props.finishType}</span>
      <span>📍 {props.location}</span>
    </div>
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      class="mt-4 block w-full text-center bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 min-h-[44px]"
    >
      Request Similar Design
    </a>
  </div>
</article>
```

### FAQAccordion Component

This component requires minimal client-side JavaScript for expand/collapse behavior.

```astro
---
// src/components/FAQAccordion.astro
interface Props {
  faqs: Array<{ question: string; answer: string }>;
}
const { faqs } = Astro.props;
---

<div class="space-y-3" id="faq-accordion">
  {faqs.map((faq, index) => (
    <details class="group border border-stone-200 rounded-lg">
      <summary class="flex items-center justify-between p-4 cursor-pointer font-medium text-stone-800 min-h-[44px]">
        {faq.question}
        <svg class="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div class="px-4 pb-4 text-stone-600 leading-relaxed">
        {faq.answer}
      </div>
    </details>
  ))}
</div>

<script>
  // Single-open accordion behavior
  document.querySelectorAll('#faq-accordion details').forEach((detail) => {
    detail.addEventListener('toggle', (e) => {
      if (detail.open) {
        document.querySelectorAll('#faq-accordion details').forEach((other) => {
          if (other !== detail) other.removeAttribute('open');
        });
      }
    });
  });
</script>
```

### GalleryFilter Component

Client-side filtering using data attributes, no framework needed.

```astro
---
// src/components/GalleryFilter.astro
interface Props {
  categories: string[];
}
const { categories } = Astro.props;
---

<div class="flex flex-wrap gap-2 mb-8" id="gallery-filters" role="tablist">
  <button
    class="filter-btn active px-4 py-2 rounded-full text-sm font-medium bg-amber-700 text-white min-h-[44px]"
    data-filter="all"
    role="tab"
    aria-selected="true"
  >
    All
  </button>
  {categories.map((cat) => (
    <button
      class="filter-btn px-4 py-2 rounded-full text-sm font-medium bg-stone-100 text-stone-700 hover:bg-stone-200 min-h-[44px]"
      data-filter={cat}
      role="tab"
      aria-selected="false"
    >
      {cat}
    </button>
  ))}
</div>

<script>
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('[data-category]');
  const emptyState = document.getElementById('gallery-empty');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      filterBtns.forEach((b) => {
        b.classList.remove('active', 'bg-amber-700', 'text-white');
        b.classList.add('bg-stone-100', 'text-stone-700');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active', 'bg-amber-700', 'text-white');
      btn.classList.remove('bg-stone-100', 'text-stone-700');
      btn.setAttribute('aria-selected', 'true');

      let visibleCount = 0;
      galleryItems.forEach((item) => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.style.display = show ? '' : 'none';
        if (show) visibleCount++;
      });

      if (emptyState) {
        emptyState.style.display = visibleCount === 0 ? '' : 'none';
      }
    });
  });
</script>
```

## Design Tokens (Tailwind Configuration)

```javascript
// tailwind.config.mjs
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        wood: {
          50: '#fdf8f0',
          100: '#f5e6d3',
          200: '#e8c9a0',
          300: '#d4a373',
          400: '#b8834f',
          500: '#8B5E3C', // Primary wood brown
          600: '#6d4a2f',
          700: '#523723',
          800: '#3a2718',
          900: '#2a1c11',
        },
        accent: {
          DEFAULT: '#1B5E20', // Deep green (trust, nature)
          light: '#2E7D32',
          dark: '#0D3B11',
        },
        whatsapp: {
          DEFAULT: '#25D366',
          hover: '#1FAD53',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        'touch': '44px', // Minimum touch target
      },
    },
  },
};
```

## SEO Implementation

### Schema Markup Strategy

Each page type gets specific JSON-LD schema:

**Homepage / About / Contact — LocalBusiness:**
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "{{businessName}}",
  "description": "Custom woodworking, carpentry, and interior solutions in Hyderabad",
  "url": "{{siteUrl}}",
  "telephone": "{{phone}}",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Hyderabad",
    "addressRegion": "Telangana",
    "addressCountry": "IN"
  },
  "areaServed": "Hyderabad",
  "sameAs": ["{{googleBusinessProfileUrl}}"]
}
```

**Category Pages — Service:**
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Custom {{categoryName}} in Hyderabad",
  "provider": { "@type": "LocalBusiness", "name": "{{businessName}}" },
  "areaServed": "Hyderabad",
  "description": "{{categoryDescription}}"
}
```

**Gallery Pages — Product:**
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "{{projectTitle}}",
  "description": "{{materialType}} {{category}} - {{dimensions}}",
  "manufacturer": { "@type": "LocalBusiness", "name": "{{businessName}}" }
}
```

### Meta Tag Template (SEOHead Component)

```astro
---
interface Props {
  title: string;
  description: string;
  image?: string;
  url: string;
  type?: string;
}
const { title, description, image, url, type = 'website' } = Astro.props;
import siteData from '../data/site.json';
---

<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={url} />

<!-- Open Graph -->
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={url} />
<meta property="og:type" content={type} />
{image && <meta property="og:image" content={image} />}

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
{image && <meta name="twitter:image" content={image} />}
```

## Admin Panel (Decap CMS)

### Configuration (`public/admin/config.yml`)

Decap CMS provides a git-based admin interface accessible at `/admin`. It commits content changes directly to the repository, triggering Netlify auto-deploys.

```yaml
backend:
  name: git-gateway
  branch: main

media_folder: "public/images"
public_folder: "/images"

collections:
  - name: "categories"
    label: "Product Categories"
    folder: "src/content/categories"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Slug", name: "slug", widget: "string" }
      - { label: "Short Description", name: "shortDescription", widget: "string" }
      - { label: "Image", name: "image", widget: "image" }
      - { label: "Image Alt Text", name: "imageAlt", widget: "string" }
      - { label: "Is Placeholder", name: "isPlaceholder", widget: "boolean", default: true }
      - { label: "Customization Options", name: "customizationOptions", widget: "list" }
      - { label: "Materials", name: "materials", widget: "list" }
      - { label: "WhatsApp Message", name: "whatsappMessage", widget: "string" }
      - { label: "Display Order", name: "order", widget: "number" }
      - { label: "Body", name: "body", widget: "markdown" }

  - name: "gallery"
    label: "Gallery Projects"
    folder: "src/content/gallery"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Category", name: "category", widget: "relation", collection: "categories", value_field: "slug", search_fields: ["title"] }
      - { label: "Image", name: "image", widget: "image" }
      - { label: "Image Alt Text", name: "imageAlt", widget: "string" }
      - { label: "Is Placeholder", name: "isPlaceholder", widget: "boolean", default: true }
      - { label: "Material Type", name: "materialType", widget: "string" }
      - { label: "Dimensions", name: "dimensions", widget: "string" }
      - { label: "Finish Type", name: "finishType", widget: "string" }
      - { label: "Location", name: "location", widget: "string" }
      - { label: "WhatsApp Message", name: "whatsappMessage", widget: "string" }

  - name: "reviews"
    label: "Customer Reviews"
    folder: "src/content/reviews"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Customer Name", name: "customerName", widget: "string" }
      - { label: "Project Type", name: "projectType", widget: "string" }
      - { label: "Rating", name: "rating", widget: "number", min: 1, max: 5 }
      - { label: "Source", name: "source", widget: "select", options: ["manual", "google"] }
      - { label: "Body", name: "body", widget: "markdown" }

  - name: "materials"
    label: "Materials"
    folder: "src/content/materials"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Name", name: "name", widget: "string" }
      - { label: "Budget Tier", name: "budgetTier", widget: "select", options: ["Budget", "Mid-Range", "Premium"] }
      - { label: "Applicable Categories", name: "applicableCategories", widget: "list" }
      - { label: "Display Order", name: "order", widget: "number" }
      - { label: "Is Placeholder", name: "isPlaceholder", widget: "boolean", default: false }
      - { label: "Body", name: "body", widget: "markdown" }

  - name: "site-data"
    label: "Site Settings"
    files:
      - label: "FAQ"
        name: "faq"
        file: "src/data/faq.json"
        fields:
          - label: "FAQs"
            name: "faqs"
            widget: "list"
            fields:
              - { label: "Question", name: "question", widget: "string" }
              - { label: "Answer", name: "answer", widget: "text" }
              - { label: "Topic", name: "topic", widget: "select", options: ["pricing", "materials", "timeline", "serviceArea", "payment", "warranty"] }
      - label: "Homepage"
        name: "homepage"
        file: "src/data/homepage.json"
        fields:
          - { label: "Hero Headline", name: "heroHeadline", widget: "string" }
          - { label: "Hero Subheadline", name: "heroSubheadline", widget: "string" }
          - { label: "Hero CTA Text", name: "heroCTAText", widget: "string" }
          - { label: "Hero CTA Message", name: "heroCTAMessage", widget: "string" }
```

## Responsive Layout Strategy

### Breakpoints

| Breakpoint | Width | Columns | Layout Behavior |
|-----------|-------|---------|-----------------|
| Mobile | 320px–767px | 1 | Single column, stacked layout, hamburger nav |
| Tablet | 768px–1023px | 2 | Two-column grid, sidebar nav visible |
| Desktop | 1024px+ | 3–4 | Full multi-column layout, horizontal nav |

### Navigation Behavior

- **Desktop (≥768px):** Horizontal nav bar with all section links visible
- **Mobile (<768px):** Hamburger icon → full-screen overlay menu with all links
- Active page highlighted with underline + color change
- Navigation remains sticky at top on scroll (desktop only, to preserve mobile viewport)

### Grid System

- Gallery: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` (responsive masonry-like)
- Categories: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- Process steps: Horizontal scroll on mobile, grid on desktop
- Reviews: Single column carousel on mobile, 3-column grid on desktop

## Image Optimization Strategy

### Build-Time Processing

Astro's built-in `<Image>` component handles:
- Format conversion to WebP with JPEG fallback
- Responsive `srcset` generation (400w, 800w, 1200w)
- Lazy loading via `loading="lazy"` attribute
- Dimension attributes to prevent layout shift

### Image Sizing Guidelines

| Context | Max Width | Aspect Ratio | Quality |
|---------|-----------|--------------|---------|
| Hero background | 1920px | 16:9 | 80% |
| Gallery card | 800px | 4:3 | 80% |
| Category card | 600px | 1:1 | 80% |
| Thumbnail | 400px | 1:1 | 75% |

### Naming Convention

```
/images/gallery/[category]-[project-name]-[material].webp
/images/categories/[category-slug]-cover.webp
/images/placeholders/placeholder-[category].webp
```

Alt text format: `"Custom [material] [category] with [finish] finish - [location], Hyderabad"`

## WhatsApp Integration Pattern

### URL Format

All WhatsApp links use the `wa.me` API:

```
https://wa.me/{phoneNumber}?text={encodedMessage}
```

- `phoneNumber`: Country code + number without spaces or symbols (e.g., `919XXXXXXXXX`)
- `text`: URL-encoded prefilled message

### Prefilled Message Templates

| Flow | Message Template |
|------|-----------------|
| General enquiry (sticky) | "Hi, I am visiting your website and would like to enquire about your woodworking services." |
| Quote request | "Hi, I would like a quote for custom {category}. Please share details about pricing and options." |
| Site visit | "Hi, I would like to schedule a site visit for my project. My location is {area}, Hyderabad." |
| Hire carpenter | "Hi, I need a carpenter for {service type}. My location is {area}, Hyderabad." |
| Material enquiry | "Hi, I would like to know about materials suitable for {project type}. My budget range is {range}." |
| Request similar design | "Hi, I liked the {category} project '{project name}'. I would like something similar. Please share details." |
| FAQ not answered | "Hi, I have a question not covered in your FAQ. I would like to know about {topic}." |

### Fallback Strategy

The `wa.me` URL format works universally:
- On mobile with WhatsApp installed → opens WhatsApp app directly
- On mobile without WhatsApp → opens Play Store / App Store
- On desktop → opens web.whatsapp.com in browser

No additional fallback code is needed since `wa.me` handles redirection natively.

## Deployment Configuration

### Netlify Configuration (`netlify.toml`)

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/404"
  status = 404

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### Build Pipeline

1. Developer/Admin pushes content change (via Decap CMS or git)
2. Netlify detects push to `main` branch
3. Netlify runs `npm run build` (Astro static build)
4. Astro processes content collections, optimizes images, generates static HTML
5. Built files deployed to Netlify CDN globally
6. Site live within ~2 minutes of content change

## Performance Budget

| Metric | Target | Strategy |
|--------|--------|----------|
| Lighthouse Performance | ≥90 | Static HTML, minimal JS, optimized images |
| First Contentful Paint | <1.5s | Inline critical CSS, preload fonts |
| Largest Contentful Paint | <2.5s | Optimized hero image, responsive sizes |
| Total Blocking Time | <200ms | No heavy JS frameworks, async scripts |
| Cumulative Layout Shift | <0.1 | Explicit image dimensions, font-display: swap |
| Total page weight | <500KB | Tailwind purging, WebP images, no unused JS |

## Security Considerations

- No server-side code → minimal attack surface
- Netlify provides automatic HTTPS via Let's Encrypt
- Security headers configured in `netlify.toml`
- Decap CMS authentication via Netlify Identity (OAuth)
- No user data stored on site (WhatsApp handles all communication)
- CSP headers can be added to restrict resource loading
- No third-party scripts except Google Maps embed (lazy-loaded)

## Error Handling

### WhatsApp Link Failures
- The `wa.me` URL format handles redirection natively across platforms. No JavaScript error handling needed.
- If WhatsApp is not installed on mobile, the device redirects to the app store.
- On desktop browsers, `wa.me` opens `web.whatsapp.com`.

### Image Loading Failures
- All images use explicit `width` and `height` attributes to prevent layout shift on load failure.
- Placeholder images are stored locally (not CDN-dependent) as fallback.
- The `<img>` tag's `alt` attribute provides meaningful text when images fail to render.

### Google Maps Embed Failure
- Contact page includes a fallback direct link to Google Maps below the iframe.
- The iframe is lazy-loaded; failure doesn't block page content.

### CMS Content Errors
- Astro content collection schemas validate data at build time via Zod.
- Invalid content (missing required fields, wrong types) causes build failure with descriptive error messages.
- Admin panel (Decap CMS) provides field-level validation before save.
- If image upload fails, CMS preserves form data and shows error message.

### Font Loading Failures
- `font-display: swap` ensures text is visible immediately with system font.
- No layout shift due to explicit fallback font stack with similar metrics.

### 404 Handling
- Netlify redirect rule catches all unmatched URLs and serves custom 404 page.
- 404 page includes navigation links and WhatsApp CTA for recovery.

## Testing Strategy

### Build-Time Validation
- Astro content collections validate all Markdown frontmatter against Zod schemas during build
- TypeScript strict mode catches type errors in component props
- Tailwind CSS purging ensures no unused styles in production

### Manual Testing Checklist
- Responsive testing at 320px, 375px, 768px, 1024px, 1440px viewports
- WhatsApp CTA links verified on Android and iOS devices
- Hamburger menu open/close behavior on mobile
- FAQ accordion expand/collapse single-open behavior
- Gallery filter functionality across all categories
- Sticky WhatsApp button visibility and non-overlap verification
- Touch target size verification (44x44px minimum)
- Color contrast verification using browser accessibility tools

### Automated Checks
- Lighthouse CI in GitHub Actions: Performance ≥90, Accessibility ≥90, Best Practices ≥90, SEO ≥90
- HTML validation: W3C validator on built pages
- Sitemap validation: verify all public pages listed
- Schema markup validation: Google Rich Results Test

### Accessibility Testing
- Screen reader navigation testing (VoiceOver/NVDA)
- Keyboard navigation for all interactive elements
- WCAG 2.1 AA compliance verification (contrast, focus indicators, alt text)
- Note: Full WCAG validation requires manual testing with assistive technologies and expert accessibility review

## Correctness Properties

### Property 1: Single H1 Per Page
Every public page has exactly one `<h1>` element with no heading levels skipped.
**Validates: Requirements 12.3**

### Property 2: Valid WhatsApp URLs
Every WhatsApp CTA generates a valid `wa.me` URL with properly URL-encoded text parameter and correct phone number format.
**Validates: Requirements 1.2, 1.4**

### Property 3: Meta Tag Completeness
Every page includes meta title (≤60 chars) and meta description (≤160 chars) containing at least one location keyword and one service keyword.
**Validates: Requirements 12.2**

### Property 4: Sticky Button Presence
The Sticky WhatsApp button renders on every page within the BaseLayout without overlapping primary content.
**Validates: Requirements 1.1**

### Property 5: Navigation Consistency
Navigation links in header match footer links exactly — all sections listed in main nav are reachable from footer.
**Validates: Requirements 18.5**

### Property 6: Content Schema Validation
Content collection entries validate against Zod schema at build time; invalid entries cause build failure.
**Validates: Requirements 14.7**

### Property 7: Gallery Category Integrity
All category slugs referenced in gallery entries exist in the categories collection.
**Validates: Requirements 4.1**

### Property 8: Build Size Constraint
Total build output (HTML, CSS, JS, images, fonts) does not exceed 50MB.
**Validates: Requirements 13.6**

### Property 9: Image Alt Text Compliance
Every `<img>` element has an `alt` attribute between 5 and 125 characters.
**Validates: Requirements 12.5**

### Property 10: Touch Target Minimum
All interactive elements (buttons, links, form controls) have minimum 44x44px tap area.
**Validates: Requirements 1.5, 11.4**
