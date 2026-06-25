# Woodworking Business Website

A static business website for a woodworking, carpentry, and interior solutions business in Hyderabad, India. Built with Astro, Tailwind CSS, and Decap CMS.

## Tech Stack

- **Static Site Generator:** Astro 4.x
- **Styling:** Tailwind CSS 3.x
- **CMS:** Decap CMS (git-based)
- **Hosting:** Netlify

## Getting Started

```bash
npm install
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
```

## Admin Panel (Content Management)

### Accessing the Admin Panel

Navigate to `/admin` on the deployed site (e.g., `https://your-site.netlify.app/admin`).

During local development, run `npm run dev` and visit `http://localhost:4321/admin`.

### Authentication

The admin panel uses **Netlify Identity** for authentication:

1. Enable Netlify Identity in your Netlify site dashboard (Site Settings → Identity)
2. Invite users via the Netlify Identity panel or enable open registration
3. The CMS uses the **git-gateway** backend — enable Git Gateway under Identity → Services
4. Invited users log in at `/admin` with their email and password

### Managing Content

The CMS provides a visual editor for all site content. Changes are committed directly to the git repository, triggering automatic rebuilds on Netlify.

#### Product Categories

- **Location:** `src/content/categories/`
- **Fields:** title, category slug, short description (max 100 chars), image, image alt text, placeholder flag, customization options (list), materials (list), WhatsApp message, display order, body (markdown description)
- Use the "Customization Options" and "Materials" list fields to add multiple items

#### Gallery Projects

- **Location:** `src/content/gallery/`
- **Fields:** title, category (linked to categories), image, image alt text, placeholder flag, material type, dimensions (e.g., "6ft x 4ft"), finish type, location (area in Hyderabad), WhatsApp message, date, body
- The "Category" field is a relation that links to existing product categories

#### Customer Reviews

- **Location:** `src/content/reviews/`
- **Fields:** customer name, project type, rating (1–5), date, source (manual/google), body (review text in markdown)

#### Materials

- **Location:** `src/content/materials/`
- **Fields:** name, budget tier (Budget/Mid-Range/Premium), applicable categories (list), display order, placeholder flag, body (description)

#### FAQ

- **Location:** `src/data/faq.json`
- **Fields:** question, answer, topic (pricing/materials/timeline/serviceArea/payment/warranty)
- Managed under Site Settings → FAQ in the admin panel

#### Homepage Content

- **Location:** `src/data/homepage.json`
- **Fields:** hero headline, hero subheadline, hero CTA text, hero CTA message
- Managed under Site Settings → Homepage in the admin panel

### How Content Changes Trigger Rebuilds

1. An admin edits content in the CMS and clicks "Publish"
2. Decap CMS commits the change to the `main` branch via git-gateway
3. Netlify detects the new commit and triggers a build
4. Astro processes content collections and generates static HTML
5. The updated site is deployed to the CDN (typically within 2 minutes)

### Image Upload Guidelines

- **Supported formats:** JPEG, PNG, WebP
- **Maximum file size:** 5 MB
- **Recommended dimensions:**
  - Gallery images: 800px wide, 4:3 aspect ratio
  - Category cover images: 600px wide, 1:1 aspect ratio
  - Hero/banner images: 1920px wide, 16:9 aspect ratio
- Images are uploaded to `public/images/` and served from `/images/`
- Use descriptive alt text (5–125 characters) for accessibility

### Contact Information Field Formats

- **Phone number:** Include country code, e.g., `+919XXXXXXXXX`
- **WhatsApp number:** Digits only without `+` prefix, e.g., `919XXXXXXXXX` (used in wa.me URLs)
- **Email:** Standard email format
- **Address:** Full street address with city and postal code
- **Operating hours:** Day name and time range, e.g., `Monday` / `9:00 AM - 7:00 PM`

## Project Structure

```
├── public/
│   ├── admin/          # Decap CMS admin panel
│   │   ├── index.html  # CMS entry point
│   │   └── config.yml  # CMS configuration
│   └── images/         # Uploaded media
├── src/
│   ├── components/     # Astro components
│   ├── content/        # Content collections (markdown)
│   │   ├── categories/
│   │   ├── gallery/
│   │   ├── reviews/
│   │   └── materials/
│   ├── data/           # JSON data files
│   ├── layouts/        # Page layouts
│   ├── pages/          # Route pages
│   └── styles/         # Global styles
├── astro.config.mjs
├── tailwind.config.mjs
└── netlify.toml
```

## Deployment

The site is configured for Netlify deployment. Push to `main` to trigger automatic builds.

Build settings are defined in `netlify.toml`:
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 20
