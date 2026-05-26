# Qalb Fragrances — Client Handoff Guide

## Live Site
**URL**: https://qalb-fragrances.vercel.app  
**GitHub**: https://github.com/faraz9398/qalb-fragrances  
**Tech**: Next.js 16 + Tailwind CSS v4 + Sanity CMS + Supabase

---

## 1. Setup Checklist

### Sanity CMS (Content Management)
A Sanity project already exists with ID `63pmc3t8`.

**To get access**:
1. Go to https://sanity.io/manage
2. Sign up or log in
3. Ask the developer to add your email as a contributor to project `63pmc3t8`
4. Once added, go to https://63pmc3t8.sanity.studio to manage content

**To create products in Sanity**:
1. Go to the Sanity Studio URL above
2. Click **Product** → **Create new**
3. Fill in: Name, Price, Upload Images, Description, Category
4. Click **Publish**
5. The product will appear on the live site

> **Note**: If no products are published in Sanity, the site falls back to sample hardcoded products. Publish products in Sanity to override them.

### Supabase (Database — Optional)
Supabase is optional. If you don't set it up, the site runs in **demo mode**:
- Orders are accepted but not stored
- Newsletter signups are printed to console instead of saved
- Contact messages are printed to console instead of saved

**To set up your own Supabase**:
1. Go to https://supabase.com → Sign up → Create a new project
2. Go to **SQL Editor**, paste the contents of `supabase-schema.sql`, click **Run**
3. Go to **Project Settings** → **API** → copy your URL and anon key
4. Give these to your developer to set as environment variables on Vercel

### Custom Domain
1. Go to https://vercel.com/faraz9398s-projects/qalb-fragrances/settings/domains
2. Add your domain and follow Vercel's DNS instructions
3. Ask your developer to update `NEXT_PUBLIC_SITE_URL` to your new domain

---

## 2. How to Manage Your Site

### Add or Edit Products
1. Go to https://63pmc3t8.sanity.studio
2. Click **Products** → select a product or **Create new**
3. Edit the fields
4. Click **Publish**

### View Customer Orders
1. Go to https://qalb-fragrances.vercel.app/admin/orders
2. Enter the admin password (default: `qalb2024`, changeable via `ADMIN_PASSWORD` env var)
3. See all orders with customer details

### Change Homepage Text
Currently the homepage text (hero, brand story) is hardcoded. To make it editable:
1. Ask your developer to wire the homepage to use Sanity's **Site Settings** schema
2. Then you'll be able to edit text at `/studio` under **Site Settings**

---

## 3. Site Map

| URL | Description |
|---|---|
| `/` | Homepage with featured products |
| `/products` | All products with search and filters |
| `/products/[slug]` | Individual product detail |
| `/cart` | Shopping cart |
| `/checkout` | Multi-step checkout (Cash on Delivery) |
| `/order-confirmation` | Thank-you page after order |
| `/admin/orders` | View customer orders (password protected) |
| `/studio` | Redirects to Sanity CMS dashboard |

---

## 4. Environment Variables (Vercel)

These are already set on Vercel. If you switch to your own accounts, update them:

| Variable | Current Value | Notes |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `63pmc3t8` | The existing Sanity project |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | |
| `NEXT_PUBLIC_SUPABASE_URL` | (set) | Replace with your own Supabase URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (set) | Replace with your own Supabase anon key |
| `NEXT_PUBLIC_SITE_URL` | `https://qalb-fragrances.vercel.app` | Update after adding custom domain |
| `ADMIN_PASSWORD` | `qalb2024` (default) | The admin panel password |

---

## 5. Future Enhancements

These weren't built yet but can be added later:
- **Online payment** (Stripe / Razorpay) — currently Cash on Delivery only
- **Order confirmation emails** — auto-email customer when order is placed
- **Analytics** — Google Analytics or Plausible for visitor tracking
- **Dynamic homepage** — edit hero text and brand story from Sanity
- **Customer accounts** — login, order history, wishlist

---

## 6. Developer Notes

- **Build**: `npm run build` (runs lint + TypeScript + webpack)
- **Deploy**: Auto-deploys from `main` branch on GitHub
- **CMS data**: Frontend tries Sanity first, falls back to hardcoded data in `src/data/products.ts`
- **Admin password**: Set via `ADMIN_PASSWORD` env var on Vercel. Default is `qalb2024`
