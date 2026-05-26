# Qalb Fragrances — Complete Agent Instructions

## 1. Communication Rules

- **Be concise**. Answer in 1-4 lines unless asked for detail. No introductions, conclusions, or summaries of what you just did.
- **No emojis** unless the user explicitly asks.
- **No code comments** unless asked. Code should be self-documenting.
- When referencing code, use `file:line` format. Example: `src/lib/env.ts:7`
- Always read the file before editing it.
- Do NOT add explanation after making changes. Just stop.

## 2. Project Conventions

### Folder Structure
```
src/
  app/           — App Router pages and API routes
  components/    — Reusable React components
  context/       — React context providers
  lib/           — Client libraries (sanity, supabase, env)
  data/          — Hardcoded fallback data
  types/         — TypeScript type definitions
  sanity/        — Sanity schema definitions
docs/            — Documentation
learn/           — Learning journal (one file per section)
```

### Naming
- Files: `PascalCase` for components, `kebab-case` for routes and libs
- Exports: named exports for components, default exports for pages
- CSS: Tailwind utility classes only (no CSS modules or styled-components)
- Types: `interface` over `type` where possible, defined in `src/types/`

### Component Pattern
```tsx
// Always "use client" if using hooks or browser APIs
// Prefer inline Tailwind classes over extracted classes
// No PropTypes — use TypeScript interfaces
// Default export for page components, named export for shared
```

### Import Order
1. React / Next.js
2. Third-party libraries (lucide-react, sanity, etc.)
3. Local components (`@/components/...`)
4. Context (`@/context/...`)
5. Libs (`@/lib/...`)
6. Types (`@/types/...`)

## 3. Workflow

Every feature follows this sequence:

### Step 1 — Understand
Explore the codebase. Find related files, similar patterns, existing conventions.

### Step 2 — Plan
State what you'll do in 1-2 sentences before touching any files.

### Step 3 — Build
- Create only the files needed. Prefer editing existing files over new ones.
- Use the existing tech stack. Never introduce new dependencies without asking.
- Follow existing component patterns exactly.

### Step 4 — Verify
Always run these before finishing:
1. `npm run lint` — 0 errors
2. `npm run build` — compiles cleanly

### Step 5 — Deploy (if asked)
- `npx vercel deploy --prod --yes` (requires Vercel CLI login)
- Or just push to `main` (auto-deploys)

### Step 6 — Learn File
Create a learn file in `learn/` covering what was done, what concepts were involved, and what the user asked about.

## 4. Environment Variables

- All public env vars are prefixed `NEXT_PUBLIC_`
- Defined in `src/lib/env.ts` with fallback defaults
- **Never hardcode secrets**. Never commit `.env.local` or real values.
- Vercel env vars are set in project dashboard. The CLI can also add them.

Current required vars:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=63pmc3t8
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SUPABASE_URL=<set on Vercel>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<set on Vercel>
NEXT_PUBLIC_SITE_URL=https://qalb-fragrances.vercel.app
```

## 5. Sanity CMS

- Sanity schemas: `src/sanity/schemas/` (Product, Page, SiteSettings)
- Client: `src/lib/sanity.ts` — exports `client` and helper functions
- **Not yet wired to frontend**. Pages use hardcoded data in `src/data/products.ts`
- Studio route at `/studio` redirects to sanity.io/manage (React 19 incompatibility)
- To enable CMS data: switch `fetchProducts` / `fetchProductBySlug` calls from data to Sanity

## 6. Supabase

- Client: `src/lib/supabase.ts`
- Schema: `supabase-schema.sql` (orders, subscribers, messages tables)
- API routes: `/api/orders`, `/api/newsletter`, `/api/contact`
- Graceful demo mode: when env vars are missing, routes respond with demo messages instead of crashing

## 7. Deployment

- Auto-deploys from `main` branch via Vercel GitHub integration
- Or manual deploy with `npx vercel deploy --prod --yes`
- After deploying, verify with `curl` or browser: all key pages should return 200
- Vercel project must have all env vars set (see section 4)
- Framework preset must be "Next.js" (set via `vercel.json` or Vercel dashboard)

## 8. Learn File Format

After each major section, create `learn/NNN-description.md`:

```markdown
# Section: [Name]

## What we did
1-2 lines summary.

## Concepts covered
- Concept 1
- Concept 2

## You asked about
- Topic A
- Topic B

## Key takeaways
- What to review
- Common pitfalls
```

## 9. Security Rules

- Never commit `.env.local`, `.env`, or any file containing real secrets
- Never log secrets or keys in console output
- Never expose API keys to the client unnecessarily
- If you see a secret in code, flag it immediately

## 10. Git Rules

- Only commit when explicitly asked
- Before committing: check `git status`, `git diff`, `git log --oneline -10`
- Write concise commit messages matching existing style
- Do NOT force push, amend, or use interactive flags
- Push to `main` only when asked
