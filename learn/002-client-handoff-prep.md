# Section: Client Handoff Preparation

## What we did
Wired the frontend to fetch from Sanity CMS (with graceful fallback to hardcoded data), secured the admin panel password via a server API endpoint and env variable, cleaned up exposed secrets in `.env.example`, and updated the handoff document to reflect the actual state.

## Concepts covered
- **Data access layer**: Creating a `src/lib/products.ts` that abstracts data source — tries Sanity first, falls back to hardcoded data. Pages don't know where data comes from.
- **Server vs Client components**: The homepage (`page.tsx`) is a server component so it can use `async` directly. The products pages are `"use client"` so they need `useEffect` + `useState`.
- **Password security**: Never hardcode passwords in client code. Use an API endpoint (`/api/verify-admin`) that reads from a server-only env variable (`ADMIN_PASSWORD`). Client sends the password, server validates it.
- **Secrets exposure**: `.env.example` had real Supabase credentials committed. Any file with `.example` in the name is still tracked by git and publicly visible. Real credentials must never be in committed files.
- **Graceful degradation**: Site works in "demo mode" when Supabase env vars are missing — orders are accepted but not stored, form submissions log to console.

## You asked about
- What still needed to be done before client handoff
- CMS data not wired to frontend (the Sanity schemas existed but no page fetched from them)
- Admin password security (was hardcoded `qalb2024` in client source code)
- `.env.example` having real credentials

## Key takeaways
- A "data access layer" (one file that fetches data, with fallbacks) keeps pages clean and makes switching data sources easy.
- Server-only env vars (without `NEXT_PUBLIC_` prefix) are never exposed to the browser. Use them for secrets.
- Always check `.env.example` before committing — it's public on GitHub.
- The CLI command `vercel env add NAME production < value` is the non-interactive way to set env vars.
- When writing a client handoff doc, verify every claim is actually true (e.g., "products appear when published" — this was false before this section).
