# Qalb Fragrances — Agent Instructions

## Project
Qalb Fragrances — perfume e-commerce site.  
Live: https://qalb-fragrances.vercel.app  
GitHub: https://github.com/faraz9398/qalb-fragrances

## Stack
- Next.js 16 (App Router, webpack)
- Tailwind CSS v4
- Sanity CMS (content, not yet wired to frontend)
- Supabase (backend, demo mode fallback when env vars missing)
- Vercel (deployment, auto-deploys from `main`)

## Key Conventions
- `src/app/` — routes (App Router convention)
- `src/components/` — shared components
- `src/context/` — React context providers
- `src/lib/` — client libs (sanity.ts, supabase.ts, env.ts)
- `src/data/` — hardcoded fallback data
- `src/types/` — TypeScript types
- No comments in code unless asked
- Concise responses, no emojis/preamble
- After each major section, create a learn file in `learn/`

## Commands
- `npm run dev` — start dev server
- `npm run build` — full build (lint + TypeScript + webpack)
- `npm run lint` — lint only
- `npx vercel deploy --prod --yes` — deploy to Vercel (requires Vercel CLI login)

## Environment Variables (set on Vercel)
```
NEXT_PUBLIC_SANITY_PROJECT_ID=63pmc3t8
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_SITE_URL=https://qalb-fragrances.vercel.app
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_...
RAZORPAY_KEY_SECRET=...
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...
ADMIN_PASSWORD=qalb2024
```

## Workflow (for any AI agent)
1. Read this file first
2. Read `docs/AGENTS-COMPLETE.md` for full instructions
3. Understand the codebase before making changes
4. Build, lint, verify
5. Push to `main` (auto-deploys to Vercel)
6. Create learn file for the section

## See also
- `docs/AGENTS-COMPLETE.md` — full system prompt with detailed conventions
- `learn/` — learning journal (one file per section)
