# Qalb Fragrances — Client Handoff Guide

## Quick Start

### 1. Create a Sanity Project (Free)
1. Go to https://sanity.io and sign up
2. Create a new project → note the **Project ID**
3. Copy `.env.example` to `.env.local` and fill in:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```

### 2. (Optional) Create a Supabase Project (Free)
1. Go to https://supabase.com and sign up
2. Create a new project
3. Go to SQL Editor → paste contents of `supabase-schema.sql` → Run
4. Copy your project URL and anon key into `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your_project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

### 3. Deploy to Vercel (Free)
1. Push code to GitHub
2. Go to https://vercel.com → Import repo
3. Add the same env variables from `.env.local`
4. Deploy → you get a live URL

---

## How the Client Manages Content

### Adding a Product
1. Go to `https://yoursite.com/studio`
2. Click **Product** → **Create new**
3. Fill in: Name, Price, Upload Images, Description, Category
4. Click **Publish** → appears on site instantly

### Changing Homepage Text
1. Go to `/studio`
2. Click **Site Settings**
3. Edit hero headline, brand story, newsletter text
4. Click **Publish**

### Adding a New Page (About, FAQ, etc.)
1. Go to `/studio`
2. Click **Page** → **Create new**
3. Enter title, slug (e.g., "about"), write content
4. The page will be live at `/about`

### Viewing Orders
1. Go to `https://yoursite.com/admin/orders`
2. Password: `qalb2024`
3. See all customer orders with details

---

## Site Structure

| URL | What it is |
|---|---|
| `/` | Homepage |
| `/products` | All products with filters |
| `/products/[slug]` | Individual product |
| `/cart` | Shopping cart |
| `/checkout` | Multi-step checkout |
| `/order-confirmation` | Thank you page |
| `/studio` | Admin CMS dashboard |
| `/admin/orders` | View customer orders |

## Tech Stack
- **Next.js 16** — Framework
- **Tailwind CSS 4** — Styling
- **Sanity CMS** — Content management
- **Supabase** — Database
- **Lucide React** — Icons
