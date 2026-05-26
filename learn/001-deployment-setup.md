# Section: Deployment Setup & 404 Fix

## What we did
Fixed a broken Vercel deployment (all pages returning 404), set up the repo correctly, and deployed the Qalb Fragrances e-commerce site live.

## Concepts covered
- **Git repo structure**: where you initialize `git init` matters. If you init one folder too high, all files get nested inside a subdirectory on GitHub.
- **Vercel framework detection**: Vercel looks for `package.json` at the repo root to detect Next.js. If it can't find it, it falls back to "Other" preset and serves nothing.
- **Environment variables**: `.env.local` is local-only. Vercel needs each `NEXT_PUBLIC_*` var manually added in Project Settings → Environment Variables.
- **Build pipeline**: `lint → TypeScript check → webpack build → static generation → deploy`. All stages must pass.
- **vercel.json**: can override framework preset, build commands, and output directory.

## You asked about
- What caused the 404 on Vercel (nested repo structure + wrong framework preset)
- How to check the repo structure on GitHub (`Invoke-WebRequest` to GitHub API)
- How to add env vars to Vercel via CLI (`vercel env add`)
- How to check a project's Vercel settings (`vercel project inspect`)

## Key takeaways
- Always check `git rev-parse --show-toplevel` to confirm where your git root is.
- Always check `github.com/yourname/repo` to confirm file structure looks right.
- On Vercel, `Framework Preset` must be "Next.js" (not "Other") for Next.js apps.
- All `NEXT_PUBLIC_*` vars must be set in two places: local `.env.local` for dev, and Vercel dashboard for production.
- `vercel.json` with `"framework": "nextjs"` is the simplest fix for wrong framework detection.
