# Requirements Document

## Introduction

A static business website for a woodworking, carpentry, interior wood solutions, and contract-based custom furniture/services business operating in Hyderabad, India. The website's primary conversion goal is to drive customer enquiries through WhatsApp. The site serves homeowners, renovators, interior designers, and commercial clients seeking custom furniture, woodwork, or small carpentry repairs. The website must be mobile-first, SEO-optimized for local Hyderabad discovery, low-maintenance, and statically hosted.

## Glossary

- **Website**: The static business website for the woodworking and contracting business
- **Visitor**: A person browsing the Website
- **WhatsApp_CTA**: A call-to-action button or link that opens WhatsApp with a prefilled message relevant to the context
- **Sticky_WhatsApp_Button**: A persistent floating WhatsApp button visible on all pages regardless of scroll position
- **Gallery**: A filterable collection of project images organized by product category
- **Hire_Carpenter_Section**: A dedicated section enabling Visitors to request a carpenter for small household works via WhatsApp
- **Product_Category**: One of the defined furniture or woodwork categories offered by the business (e.g., Beds, Cupboards, TV Units, Dining Tables, Tea Tables, Dressing Tables, Pooja Units, Shoe Racks, Shelves and Storage Racks, Doors, Plywood Works, WPC Panel Works, MDF Works, Other Custom Works)
- **Admin_Panel**: An interface for the business owner to manage website content without code changes
- **CMS**: Content Management System used to manage and update website content
- **Prefilled_Message**: A WhatsApp message template pre-populated with context-specific text based on the Visitor's action
- **Schema_Markup**: Structured data markup (JSON-LD) embedded in pages to improve search engine understanding
- **Hero_Section**: The prominent top section of the homepage featuring headline, value proposition, and primary CTA
- **Process_Section**: A section describing the business workflow from enquiry to delivery
- **Static_Site**: A website composed of pre-built HTML, CSS, and JavaScript files served without server-side processing
- **Mobile_First_Design**: A design approach where the mobile experience is designed first, then progressively enhanced for larger screens
- **Google_Business_Profile**: The Google business listing that appears in Google Maps and local search results
- **Project_Card**: A gallery item displaying project image along with metadata such as material type, dimensions, finish, and location

## Requirements

### Requirement 1: WhatsApp-First Conversion Architecture

**User Story:** As a Visitor, I want to easily initiate WhatsApp conversations with the business from any page, so that I can quickly get information, request quotes, or hire services without filling complex forms.

#### Acceptance Criteria

1. THE Website SHALL display a Sticky_WhatsApp_Button on every page, positioned in the bottom-right corner with a minimum offset of 16 pixels from screen edges, that remains visible regardless of scroll position and does not overlap primary page content or navigation elements
2. WHEN a Visitor taps the Sticky_WhatsApp_Button, THE Website SHALL open WhatsApp with a general enquiry Prefilled_Message containing the business phone number
3. THE Website SHALL provide distinct WhatsApp_CTA buttons for each conversion flow: quote request, site visit request, hire carpenter, material enquiry, and general contact, each distinguished by unique label text identifying the specific flow
4. WHEN a Visitor taps a context-specific WhatsApp_CTA, THE Website SHALL open WhatsApp with a Prefilled_Message that includes the flow type and any relevant context from the current page (e.g., category name, project reference, or service type)
5. THE Website SHALL render all WhatsApp_CTA buttons with a minimum tap area of 44x44 pixels and a contrast ratio of at least 3:1 against adjacent background colors for the button element, conforming to WCAG 2.1 Level AA non-text contrast requirements
6. THE Website SHALL place at least one WhatsApp_CTA fully visible within the initial viewport (without scrolling) on the homepage for mobile screens of 320px width and above
7. IF WhatsApp is not available on the Visitor's device, THEN THE Website SHALL fall back to opening the WhatsApp Web URL (web.whatsapp.com) in a new browser tab with the same Prefilled_Message and business phone number

### Requirement 2: Homepage Structure

**User Story:** As a Visitor, I want to quickly understand what the business offers and how to engage, so that I can decide whether to proceed with an enquiry.

#### Acceptance Criteria

1. THE Website SHALL display a Hero_Section containing a headline, value proposition text of no more than 30 words, and a primary WhatsApp_CTA
2. THE Website SHALL display a services overview section listing all 15 Product_Category items with a description of no more than 20 words each
3. THE Website SHALL display a "How It Works" summary showing the business workflow as a minimum of 4 numbered steps derived from the Process_Section
4. THE Website SHALL display a "Why Choose Us" section highlighting at least 3 differentiators, each with a heading and a supporting statement of no more than 25 words
5. THE Website SHALL display a secondary WhatsApp_CTA at the bottom of the homepage before the footer
6. THE Website SHALL display homepage sections in the following order from top to bottom: Hero_Section, services overview, "How It Works", "Why Choose Us", secondary WhatsApp_CTA

### Requirement 3: Product Categories

**User Story:** As a Visitor, I want to browse all available product and service categories with details, so that I can identify what I need and request a quote for it.

#### Acceptance Criteria

1. THE Website SHALL display all 14 Product_Category items (Beds, Cupboards, TV Units, Dining Tables, Tea Tables, Dressing Tables, Pooja Units, Shoe Racks, Shelves and Storage Racks, Doors, Plywood Works, WPC Panel Works, MDF Works, Other Custom Works) as individually navigable entries, each linking to its own category page
2. WHEN a Visitor views a Product_Category page, THE Website SHALL display a text description (minimum 2 sentences), at least 2 listed customization options, at least 2 material choices referencing materials from the Materials Information section, and a WhatsApp_CTA specific to that category
3. WHEN a Visitor taps the WhatsApp_CTA on a Product_Category page, THE Website SHALL open WhatsApp with a Prefilled_Message mentioning the specific category name (e.g., "Hi, I am interested in custom Beds. Please share details.")
4. THE Website SHALL display at least 1 representative image or a labeled placeholder image (indicating "Image coming soon") for each Product_Category
5. IF WhatsApp cannot be opened on the Visitor's device, THEN THE Website SHALL fall back to opening a web-based WhatsApp link (web.whatsapp.com or wa.me) with the same Prefilled_Message

### Requirement 4: Gallery and Portfolio

**User Story:** As a Visitor, I want to browse completed projects filtered by category, so that I can see the quality of work and request similar designs.

#### Acceptance Criteria

1. THE Gallery SHALL display project images organized by Product_Category with a filtering mechanism that includes an "All" option showing projects from every category as the default view on page load
2. WHEN a Visitor selects a category filter, THE Gallery SHALL display only projects belonging to that selected category
3. IF the selected category contains no projects, THEN THE Gallery SHALL display a message indicating no projects are available for that category along with a WhatsApp_CTA to enquire about that category
4. THE Gallery SHALL display each project as a Project_Card showing the image, material type, approximate dimensions in feet (width x height format, e.g., "6ft x 4ft"), finish type, and location (area in Hyderabad)
5. WHEN a Visitor taps the "Request Similar Design" button on a Project_Card, THE Website SHALL open WhatsApp with a Prefilled_Message referencing that specific project (e.g., "Hi, I liked the [category] project [project name]. I would like something similar.")
6. THE Gallery SHALL support a placeholder strategy displaying sample/stock images with a visible "Sample" label overlaid on the image until real project photos are available

### Requirement 5: Hire a Carpenter

**User Story:** As a homeowner, I want to hire a carpenter for small household repairs and fixes through the website, so that I can get quick help for minor woodwork jobs.

#### Acceptance Criteria

1. THE Website SHALL include a dedicated Hire_Carpenter_Section accessible from the main navigation
2. THE Hire_Carpenter_Section SHALL list at least 6 common small works (repairs, fittings, adjustments, shelf fixing, door alignment, minor woodwork jobs) each with a 1-2 sentence description explaining the scope of that service
3. WHEN a Visitor taps the "Hire a Carpenter" WhatsApp_CTA, THE Website SHALL open WhatsApp with a Prefilled_Message template (e.g., "Hi, I need a carpenter for [describe your requirement]. My location is [area in Hyderabad].")
4. THE Hire_Carpenter_Section SHALL display the expected response time (e.g., "We respond within 4 hours during business hours"), the service area coverage listing supported areas within Hyderabad, and an indication of the pricing model (e.g., hourly rate, per-job basis, or "pricing shared after requirement discussion")
5. THE Hire_Carpenter_Section SHALL include a WhatsApp_CTA button with a minimum tap area of 44x44 pixels positioned below the service listings

### Requirement 6: Business Process Display

**User Story:** As a Visitor, I want to understand the complete business workflow from enquiry to delivery, so that I can set expectations before engaging.

#### Acceptance Criteria

1. THE Website SHALL display the complete business workflow as a numbered sequence of steps: enquiry, requirement understanding, site visit arrangement, plan discussion, material selection, quotation, contract finalization, timeline sharing, work execution, delivery/installation, and feedback collection
2. THE Website SHALL present each workflow step with a description of no more than 50 characters and a distinct icon or visual indicator representing the nature of that step
3. WHEN a Visitor taps the WhatsApp_CTA at the end of the Process_Section, THE Website SHALL open WhatsApp with a Prefilled_Message to initiate an enquiry (e.g., "Hi, I would like to start a new project enquiry. Please guide me through the process.")

### Requirement 7: About Page

**User Story:** As a Visitor, I want to learn about the business background, expertise, and values, so that I can build trust before engaging.

#### Acceptance Criteria

1. THE Website SHALL display an About page containing the following distinct content sections: business background narrative, a numeric years-of-experience indicator, a list of areas of expertise (minimum 3 items), and a service philosophy statement describing the business's approach to quality, customer service, and craftsmanship
2. THE Website SHALL display the geographic service area (Hyderabad and surrounding areas) on the About page
3. THE Website SHALL include a WhatsApp_CTA at the end of the About page content that opens WhatsApp with a Prefilled_Message relevant to general engagement (e.g., "Hi, I visited your About page and would like to discuss a project.")

### Requirement 8: Reviews and Testimonials

**User Story:** As a Visitor, I want to read reviews from previous customers, so that I can evaluate the quality and reliability of the business.

#### Acceptance Criteria

1. THE Website SHALL display customer testimonials in a dedicated Reviews section
2. THE Website SHALL support embedding or displaying Google Reviews from the business's Google_Business_Profile
3. THE Website SHALL display each review with customer name (or initial), project type, and review text
4. THE Website SHALL include a WhatsApp_CTA in the Reviews section for Visitors convinced by testimonials to initiate contact
5. WHEN no Google Reviews are available, THE Website SHALL display manually added testimonials as static content

### Requirement 9: Contact Information

**User Story:** As a Visitor, I want to find all contact details and business location information in one place, so that I can reach the business through my preferred channel.

#### Acceptance Criteria

1. THE Website SHALL display a Contact page with the business phone number, WhatsApp number, email address, and service area within Hyderabad, where the phone number and email address are rendered as actionable links (tap-to-call and tap-to-email respectively)
2. THE Website SHALL display business operating hours on the Contact page, showing availability for each day of the week
3. THE Website SHALL display the WhatsApp_CTA as the visually most prominent contact method on the Contact page, positioned above all other contact details and rendered larger than secondary contact options
4. THE Website SHALL display a Google Maps embed showing the business location or service area on the Contact page
5. IF the Google Maps embed fails to load, THEN THE Website SHALL display a link to the business location on Google Maps as a fallback

### Requirement 10: FAQ Section

**User Story:** As a Visitor, I want answers to common questions about pricing, materials, timelines, and processes, so that I can make informed decisions before contacting the business.

#### Acceptance Criteria

1. THE Website SHALL display a FAQ section with a minimum of 6 questions and answers, including at least one question covering each of the following topics: pricing approach, material options, timeline estimates, service area, payment terms, and warranty/guarantee information
2. THE Website SHALL present FAQs in an expandable/collapsible accordion format with all items collapsed by default, displaying only the question text until a Visitor interacts with an item
3. WHEN a Visitor taps a collapsed FAQ question, THE Website SHALL expand that item to reveal its answer and collapse any previously expanded item
4. THE Website SHALL include a WhatsApp_CTA below the FAQ section with a Prefilled_Message indicating the Visitor has a question not covered in the FAQ (e.g., "Hi, I have a question that is not listed in your FAQ. I would like to know about [describe your question].")

### Requirement 11: Mobile-First Responsive Design

**User Story:** As a mobile user, I want the website to be fully functional and easy to use on my phone, so that I can browse and contact the business from any device.

#### Acceptance Criteria

1. THE Website SHALL render without horizontal overflow and without requiring pinch-to-zoom for text readability on viewports from 320px width and above
2. THE Website SHALL use responsive breakpoints that adapt layout for mobile (320px–767px), tablet (768px–1023px), and desktop (1024px and above) screens
3. THE Website SHALL load the initial viewport content within 3 seconds on a 4G mobile connection (10 Mbps downlink, 50ms round-trip latency)
4. THE Website SHALL use touch-friendly navigation with a hamburger menu on viewports below 768px, minimum 44x44 pixel tap targets for all interactive elements, and a minimum font size of 16px for body text
5. THE Website SHALL display the Sticky_WhatsApp_Button and at least one contextual WhatsApp_CTA within the first visible viewport on mobile without overlapping page content or navigation elements
6. THE Website SHALL ensure all interactive features (Gallery filtering, FAQ expand/collapse, navigation menu, and all WhatsApp_CTA buttons) are operable via touch input on mobile viewports

### Requirement 12: SEO and Local Discovery

**User Story:** As a business owner, I want my website to rank well in local Hyderabad search results for woodworking and carpentry queries, so that potential customers can find me organically.

#### Acceptance Criteria

1. THE Website SHALL include Schema_Markup (JSON-LD) for LocalBusiness type on the Homepage, About, and Contact pages, Service type on each Product_Category page, and Product type on Gallery project pages
2. THE Website SHALL include a meta title (maximum 60 characters) and meta description (maximum 160 characters) for each page, each containing at least one location keyword ("Hyderabad") and one service keyword (e.g., "woodworking", "carpentry", "custom furniture")
3. THE Website SHALL generate semantic HTML with exactly one h1 element per page, no skipped heading levels (e.g., h2 must not be followed directly by h4), and heading text describing page or section content
4. THE Website SHALL include an XML sitemap listing all public pages and a robots.txt file that permits search engine crawling of all public pages
5. THE Website SHALL optimize all images with alt text describing the image content (minimum 5 characters, maximum 125 characters), compressed file sizes not exceeding 200 KB per image, and served in WebP format with JPEG or PNG fallback for unsupported browsers
6. THE Website SHALL include Open Graph meta tags (og:title, og:description, og:image, og:url) and Twitter Card meta tags (twitter:card, twitter:title, twitter:description, twitter:image) on every page

### Requirement 13: Static Site Architecture

**User Story:** As a business owner, I want the website to be a static site that is fast, secure, low-cost to host, and easy to maintain, so that I can focus on my business without technical overhead.

#### Acceptance Criteria

1. THE Website SHALL be built as a Static_Site generating pre-rendered HTML, CSS, and JavaScript files
2. THE Website SHALL be deployable to static hosting platforms (Netlify, Cloudflare Pages, Vercel, or GitHub Pages) without server-side processing
3. THE Website SHALL function without a database or backend server for the public-facing pages, and SHALL render all text content and navigation in pre-rendered HTML accessible without JavaScript execution
4. THE Website SHALL achieve a Lighthouse performance score of 90 or above on mobile when tested using Lighthouse in navigation mode with simulated mobile throttling (slow 4G) and default mobile device emulation
5. IF a Visitor navigates to a URL that does not match any existing page, THEN THE Website SHALL display a custom 404 page containing a message indicating the page was not found, navigation links to the homepage and major sections, and a WhatsApp_CTA for assistance
6. THE Website SHALL produce a total build output (all HTML, CSS, JavaScript, images, and fonts) not exceeding 50 MB in combined file size

### Requirement 14: Admin Content Management

**User Story:** As a business owner, I want to update website content (images, text, gallery projects, reviews, categories) without modifying code, so that I can keep the website current as my business grows.

#### Acceptance Criteria

1. THE Admin_Panel SHALL allow the business owner to upload and remove product/project images in JPEG, PNG, or WebP format with a maximum file size of 5 MB per image
2. THE Admin_Panel SHALL allow the business owner to edit page text content including headings, descriptions, and section body text for all public-facing pages
3. THE Admin_Panel SHALL allow the business owner to manage Gallery projects (add, edit, remove Project_Cards) with editable fields for project image, material type, approximate size, finish type, location within Hyderabad, and associated Product_Category
4. THE Admin_Panel SHALL allow the business owner to manage customer reviews (add, edit, remove testimonials) with editable fields for customer name or initial, project type, and review text up to 500 characters
5. THE Admin_Panel SHALL allow the business owner to update Product_Category information including category description, available customization options, material choices, and representative images
6. THE Admin_Panel SHALL be accessible through a web interface requiring password-based authentication for a single business owner account
7. WHEN content is updated through the Admin_Panel, THE Website SHALL reflect changes within 5 minutes after a site rebuild or deploy trigger is initiated
8. IF an image upload or content save operation fails, THEN THE Admin_Panel SHALL display an error message indicating the failure reason and preserve the previously entered data so the business owner can retry without re-entering content

### Requirement 15: Visual Design and Branding

**User Story:** As a business owner, I want my website to look professional, trustworthy, and modern while being accessible to Indian customers, so that visitors feel confident engaging with my business.

#### Acceptance Criteria

1. THE Website SHALL use a defined color palette consisting of no more than 5 primary colors (wood-inspired warm tones with complementary accent colors), applied consistently across all pages via shared design tokens or CSS variables
2. THE Website SHALL use web fonts (or system font stack fallbacks) for English content with a minimum rendered body text size of 16px on mobile and 16px on desktop, and a minimum line height of 1.4
3. THE Website SHALL maintain consistent visual styling across all pages by applying a single set of design tokens governing spacing scale, color values, typography sizes, and border treatments
4. THE Website SHALL display imagery at a minimum resolution of 800px width for content images, compressed to under 200KB per image, using modern formats (WebP with fallback) and displaying professional placeholder images labeled "Placeholder" where real project photos are unavailable
5. THE Website SHALL meet WCAG 2.1 Level AA contrast ratio requirements (minimum 4.5:1 for normal text, 3:1 for large text and UI components) for all text and interactive elements
6. IF a web font fails to load, THEN THE Website SHALL render text using a legible system font fallback without layout shift

### Requirement 16: Google Business Profile Integration

**User Story:** As a business owner, I want my website integrated with Google Business Profile, so that my online presence is consistent and discoverable in Google Maps and local search.

#### Acceptance Criteria

1. THE Website SHALL include a link to the Google_Business_Profile on the Contact page and footer
2. THE Website SHALL use consistent NAP (Name, Address, Phone) information matching the Google_Business_Profile
3. THE Website SHALL include Schema_Markup referencing the Google_Business_Profile URL
4. THE Website SHALL provide setup guidance documentation for creating and optimizing the Google_Business_Profile

### Requirement 17: Materials Information

**User Story:** As a Visitor, I want to understand the materials available for my project, so that I can make informed choices based on my budget and design preferences.

#### Acceptance Criteria

1. THE Website SHALL display information about each available material (Solid Wood, Plywood, MDF, WPC, Laminates, Veneers, and other materials) including a description of 1 to 3 sentences covering characteristics, common uses, and relative durability
2. THE Website SHALL present material suitability by mapping each material to its applicable Product_Category items and indicating a budget tier (Budget, Mid-Range, or Premium) for each material
3. WHEN a Visitor taps the material enquiry WhatsApp_CTA, THE Website SHALL open WhatsApp with a Prefilled_Message about material consultation (e.g., "Hi, I would like to know more about materials suitable for [project type]. My budget range is [range].")
4. IF a material entry has no description or suitability information available, THEN THE Website SHALL display the material name with a placeholder label indicating content is coming soon

### Requirement 18: Footer and Navigation

**User Story:** As a Visitor, I want clear navigation and a comprehensive footer, so that I can easily find any section of the website and access key information from any page.

#### Acceptance Criteria

1. THE Website SHALL display a main navigation menu with links to all major sections (Home, About, Services, Products, Gallery, Hire a Carpenter, Reviews, Contact, FAQ)
2. THE Website SHALL display a footer on every page containing business name, WhatsApp number (as a tappable WhatsApp_CTA), email, service area, quick links to all sections, and social media links (minimum 1 platform link)
3. WHILE the viewport width is 768px or below, THE Website SHALL collapse the navigation into a hamburger menu icon that expands a full navigation list on tap and collapses on a second tap or when a link is selected
4. THE Website SHALL indicate the current active page in the navigation menu using a visually distinct style (such as a different color, underline, or font weight) that meets WCAG 2.1 Level AA contrast requirements against adjacent inactive items
5. THE Website SHALL display the footer navigation and main navigation with consistent section links so that all sections listed in the main navigation are also reachable from the footer
