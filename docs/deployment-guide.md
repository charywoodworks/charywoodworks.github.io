# Deployment Guide

Step-by-step instructions for deploying the woodworking business website to Netlify.

---

## Prerequisites

- GitHub account
- Netlify account (free tier is sufficient)
- Git installed locally
- Custom domain (optional but recommended)

---

## 1. Push to GitHub

### Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name the repository (e.g., `woodworking-website`)
3. Set visibility to **Private** (recommended)
4. Do NOT initialize with README (we already have one)
5. Click **Create repository**

### Push Local Code

```bash
# In the project root directory
git add .
git commit -m "Initial commit: woodworking business website"

# Add the GitHub remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/woodworking-website.git

# Push to main branch
git push -u origin main
```

---

## 2. Connect to Netlify

1. Log in to [app.netlify.com](https://app.netlify.com)
2. Click **Add new site → Import an existing project**
3. Select **GitHub** as the Git provider
4. Authorize Netlify to access your GitHub account
5. Select the `woodworking-website` repository

### Build Settings

Netlify will auto-detect settings from `netlify.toml`. Verify:

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node version | 20 |

6. Click **Deploy site**

The first deploy will take 1–2 minutes. Netlify assigns a random subdomain like `random-name-123.netlify.app`.

---

## 3. Configure Custom Domain

### Add Domain in Netlify

1. Go to **Site settings → Domain management**
2. Click **Add custom domain**
3. Enter your domain (e.g., `yourbusiness.com`)
4. Click **Verify** → **Add domain**

### Update DNS Records

At your domain registrar (GoDaddy, Namecheap, Google Domains, etc.):

**Option A: Netlify DNS (Recommended)**
- Point your domain's nameservers to Netlify's nameservers:
  - `dns1.p01.nsone.net`
  - `dns2.p01.nsone.net`
  - `dns3.p01.nsone.net`
  - `dns4.p01.nsone.net`

**Option B: External DNS**
- Add an `A` record pointing to Netlify's load balancer IP: `75.2.60.5`
- Add a `CNAME` record for `www` pointing to `your-site-name.netlify.app`

### HTTPS Certificate

- Netlify automatically provisions a free Let's Encrypt SSL certificate
- After DNS propagation (up to 48 hours), HTTPS will be active
- Force HTTPS: **Site settings → Domain management → HTTPS → Force HTTPS** (enable)

---

## 4. Enable Netlify Identity (CMS Authentication)

Netlify Identity provides user authentication for the Decap CMS admin panel.

1. Go to **Site settings → Identity**
2. Click **Enable Identity**
3. Under **Registration preferences**, select **Invite only** (recommended for security)
4. Under **External providers**, optionally enable Google for easier login

---

## 5. Enable Git Gateway

Git Gateway allows the CMS to commit changes to the repository.

1. Go to **Site settings → Identity → Services**
2. Under **Git Gateway**, click **Enable Git Gateway**
3. This connects Netlify Identity users to the GitHub repository

---

## 6. Invite Admin User

1. Go to **Site settings → Identity → Invite users**
2. Enter the business owner's email address
3. Click **Send**
4. The user receives an email with a link to set their password
5. After setting the password, they can log in at `/admin`

---

## 7. Testing Checklist

After deployment, verify everything works correctly:

### WhatsApp Links (Test on Real Mobile Devices)

- [ ] Sticky WhatsApp button (bottom-right) opens WhatsApp with prefilled message
- [ ] Homepage hero CTA opens WhatsApp
- [ ] Category page "Get a Quote" buttons open WhatsApp with category-specific message
- [ ] Gallery project "Request Similar Design" buttons open WhatsApp
- [ ] Contact page WhatsApp link works
- [ ] Hire a Carpenter page CTA works
- [ ] FAQ page "Ask via WhatsApp" link works
- [ ] All `wa.me` URLs include the correct phone number
- [ ] Prefilled messages are readable (properly URL-encoded)

### CMS Login and Content Editing

- [ ] Navigate to `https://yourdomain.com/admin`
- [ ] Login screen appears (Netlify Identity widget)
- [ ] Admin user can log in with email/password
- [ ] CMS dashboard loads with all collections visible
- [ ] Create a test category entry → save → verify it appears on site after rebuild
- [ ] Edit an existing entry → publish → verify changes appear (within ~2 minutes)
- [ ] Upload an image via CMS → verify it displays correctly
- [ ] Delete the test entry → verify it's removed after rebuild

### Security Headers

Verify headers are present using browser DevTools (Network tab) or [securityheaders.com](https://securityheaders.com):

- [ ] `X-Frame-Options: DENY`
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `Referrer-Policy: strict-origin-when-cross-origin`
- [ ] HTTPS active (padlock icon in browser)
- [ ] HTTP redirects to HTTPS

### Lighthouse Audit

Run Lighthouse in Chrome DevTools (Incognito mode) on the homepage:

- [ ] Performance score ≥ 90
- [ ] Accessibility score ≥ 90
- [ ] Best Practices score ≥ 90
- [ ] SEO score ≥ 90

If scores are below target:
- Performance: Check image sizes, reduce unused CSS
- Accessibility: Check color contrast, alt text, ARIA labels
- SEO: Check meta descriptions, canonical URLs, structured data

### General Functionality

- [ ] All pages load without errors (check browser console)
- [ ] Navigation works on mobile and desktop
- [ ] Mobile hamburger menu opens/closes correctly
- [ ] Gallery category filtering works
- [ ] FAQ accordion expands/collapses
- [ ] Google Maps embed loads on contact page
- [ ] 404 page displays for invalid URLs
- [ ] Images load with correct aspect ratios (no layout shift)
- [ ] Site is responsive across phone, tablet, and desktop viewports

---

## Troubleshooting

### Build Fails on Netlify

- Check the deploy log in Netlify for error messages
- Ensure `node_modules` is not committed (should be in `.gitignore`)
- Verify Node version is 20 in `netlify.toml`
- Run `npm run build` locally to reproduce the error

### CMS Login Not Working

- Verify Netlify Identity is enabled
- Verify Git Gateway is enabled
- Check that the user has accepted the invite email
- Clear browser cache and try again
- Check that `public/admin/index.html` includes the Netlify Identity widget script

### WhatsApp Links Not Working

- Verify the WhatsApp number in `src/data/site.json` is digits only (no `+` prefix)
- Format: `919XXXXXXXXX` (country code + number)
- Test the URL directly: `https://wa.me/919XXXXXXXXX`

### Custom Domain Not Working

- DNS propagation can take up to 48 hours
- Verify DNS records are correct using `dig yourdomain.com` or [dnschecker.org](https://dnschecker.org)
- If using external DNS, ensure the CNAME or A record points to Netlify

### HTTPS Certificate Error

- Wait for DNS to fully propagate before requesting a certificate
- In Netlify: **Domain management → HTTPS → Renew certificate**
- If using a proxy (like Cloudflare), set SSL mode to "Full (Strict)"

---

## Ongoing Maintenance

- **Content updates:** Use the CMS at `/admin` — changes auto-deploy
- **Code changes:** Push to `main` branch — Netlify auto-builds
- **Dependencies:** Run `npm update` periodically and push changes
- **Monitoring:** Check Netlify Analytics (if enabled) for traffic patterns
- **Backups:** The git repository IS the backup — content and code are version-controlled
