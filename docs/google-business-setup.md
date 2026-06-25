# Google Business Profile Setup Guide

This guide walks through creating and optimizing a Google Business Profile for your woodworking business. A well-maintained profile improves local search visibility, builds trust through reviews, and drives enquiries.

---

## 1. Create Your Google Business Profile

1. Go to [Google Business Profile Manager](https://business.google.com/)
2. Sign in with a Google account (use the business email if possible)
3. Click **Add your business to Google**
4. Search for your business name — if it doesn't exist, select **Add your business**
5. Follow the prompts to enter your details

---

## 2. Required Business Information

Fill in all fields completely and accurately:

| Field | What to Enter |
|-------|---------------|
| **Business Name** | Exact business name as shown on the website |
| **Category** | Primary: "Carpenter" or "Woodworker". Additional: "Interior Designer", "Furniture Store" |
| **Address** | Full street address with city, state, and PIN code |
| **Service Area** | Select "Hyderabad" and surrounding areas you serve |
| **Phone** | Same phone number displayed on your website (with +91) |
| **Website** | Your website URL (e.g., `https://yourdomain.com`) |
| **Hours** | Match the operating hours shown on your website exactly |

> **Important:** Your Name, Address, and Phone (NAP) must be identical everywhere — website, Google profile, social media, directories. Even small differences (like "Rd" vs "Road") can hurt local rankings.

---

## 3. Verify Your Business

Google requires verification to confirm you own/operate the business. Options include:

- **Postcard by mail** — Google sends a postcard with a verification code to your address (5–14 days)
- **Phone verification** — Automated call or SMS with a code (available for some businesses)
- **Email verification** — Code sent to a business email (if eligible)
- **Video verification** — Record a short video showing your business location and signage

After receiving your code, log into Google Business Profile Manager and enter it to complete verification.

---

## 4. Add Photos and Descriptions

Photos significantly increase engagement. Add:

- **Logo** — Your business logo (square, at least 250×250px)
- **Cover photo** — Best showcase of your workshop or a completed project (landscape, 1080×608px)
- **Interior photos** — Your workshop, tools, materials
- **Work samples** — Completed projects (kitchens, wardrobes, furniture)
- **Team photos** — Carpenters at work

### Business Description

Write a clear description (750 characters max). Include:
- What you do (custom woodworking, carpentry, interiors)
- Where you operate (Hyderabad, Telangana)
- Key specialties (modular kitchens, wardrobes, wooden furniture)
- What makes you different (custom designs, quality materials, on-time delivery)

Example:
> Custom woodworking and carpentry services in Hyderabad. We design and build modular kitchens, wardrobes, wooden furniture, doors, and complete interior solutions using premium materials. Over X years of experience delivering quality craftsmanship with on-time completion. Free site visits and consultations available across Hyderabad.

---

## 5. Collect and Respond to Reviews

Reviews are the single most important ranking factor for local businesses.

### How to Get Reviews

1. After completing a project, send the customer your review link
2. To get your review link: Google Business Profile → Home → "Get more reviews" → copy the link
3. Share via WhatsApp message: "Thank you for choosing us! If you're happy with the work, a Google review would mean a lot: [link]"
4. Add a "Review us on Google" link on your website (contact page or footer)

### Responding to Reviews

- **Positive reviews:** Thank the customer by name, mention the specific project if possible
- **Negative reviews:** Respond professionally, acknowledge the issue, offer to resolve it offline
- **Always respond within 24–48 hours**

Example response to a positive review:
> Thank you, [Name]! It was great working on your [project type]. We're glad you love the result. Looking forward to helping with future projects!

---

## 6. Link Your Profile to the Website

1. In Google Business Profile Manager, go to **Info → Website**
2. Enter your full website URL (e.g., `https://yourdomain.com`)
3. Click **Apply**

Also add your Google Business Profile URL to the website's `site.json` configuration:
```json
{
  "googleBusinessProfileUrl": "https://g.page/your-business-name"
}
```

This enables the "Reviews" link on your website to point to your Google profile.

---

## 7. Enable Google Reviews on Your Website

The website is configured to display reviews from `src/content/reviews/`. To showcase Google reviews:

1. When a customer leaves a Google review, create a matching entry in the CMS:
   - Go to `/admin` → Customer Reviews → New Review
   - Set **Source** to "google"
   - Copy the review text, customer name, and rating
2. This keeps your website's review section current without requiring API integration

---

## 8. NAP Consistency

NAP (Name, Address, Phone) consistency across the web is critical for local SEO.

**Ensure these are identical everywhere:**

| Platform | Check |
|----------|-------|
| Website footer | ✓ Same name, address, phone |
| Website contact page | ✓ Same name, address, phone |
| Google Business Profile | ✓ Same name, address, phone |
| Social media profiles | ✓ Same name, address, phone |
| Online directories (JustDial, Sulekha, IndiaMART) | ✓ Same name, address, phone |

If you change your phone number or address, update it everywhere on the same day.

---

## 9. Tips for Local SEO

### Regular Updates
- Post at least once a week using Google Business Profile **Posts** feature
- Share completed projects, offers, tips, or behind-the-scenes content
- Posts expire after 7 days, so regular posting keeps your profile active

### Respond to All Reviews
- Reply to every review (positive and negative) within 48 hours
- Use keywords naturally in responses (e.g., "custom wardrobe", "Hyderabad")

### Add Products / Services
- In your profile, go to **Products** or **Services**
- Add each category (Modular Kitchens, Wardrobes, TV Units, etc.)
- Include descriptions and price ranges if possible

### Use Google Q&A
- Monitor the "Questions & Answers" section on your profile
- Answer questions promptly
- Pre-seed common questions (like "Do you offer free site visits?")

### Track Performance
- Check **Insights** in Google Business Profile monthly:
  - How customers find you (search vs. maps)
  - What keywords they use
  - How many called, visited website, or requested directions
- Use this data to refine your website content and target new keywords

### Seasonal Content
- Update photos seasonally (festival-themed projects, summer/winter materials)
- Create Google Posts around festive seasons (Diwali offers, housewarming specials)

---

## Checklist

- [ ] Google Business Profile created
- [ ] All business information filled in accurately
- [ ] Business verified (postcard/phone/email/video)
- [ ] Logo and cover photo uploaded
- [ ] At least 10 work sample photos added
- [ ] Business description written with keywords
- [ ] Website URL linked in profile
- [ ] Review link shared with past customers
- [ ] First 5 Google reviews collected
- [ ] NAP consistency verified across all platforms
- [ ] First Google Post published
- [ ] Products/Services section filled in
