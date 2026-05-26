# Section: Admin Order Management

## What we did
Added full order management to the admin panel — admins can now mark orders as processing, shipped, delivered, or cancelled. Also fixed the demo store to use file-based persistence (`/tmp/`) instead of in-memory, so orders survive across serverless function instances.

## Concepts covered
- **File-based persistence**: In Vercel serverless functions, `/tmp/` is writable and persists within a deployment. Use `fs.writeFileSync`/`fs.readFileSync` with JSON serialization for simple data storage.
- **Serverless instance model**: Each function invocation can hit a different serverless instance. In-memory stores (module-level Maps/arrays) don't share state between instances. File-based `/tmp/` does within the same deployment region.
- **PATCH API pattern**: `PATCH /api/orders/[id]` with a `{ status }` body — standard REST pattern for partial updates.
- **Graceful Supabase fallback**: The demo store is always written to AND queried. If Supabase is configured but tables don't exist, the app falls back to the file-based store instead of crashing with 500.
- **Auto-refresh**: Admin panel polls `/api/orders` every 30 seconds to show new orders without manual refresh.
- **Status workflow**: pending → processing → shipped → delivered (or cancelled from any state except delivered).
- **Status-aware UI**: Each status has a distinct color (amber/blue/purple/green/red) and only valid next-status transitions are shown as buttons.

## You asked about
- Admin order management (chose this as the next feature)

## Key takeaways
- `/tmp/` in Vercel functions is the right place for demo data — it persists across requests to the same function (within a deployment's lifecycle) but is lost on redeploy.
- Always have a fallback for Supabase operations — the demo store should be a safety net, not an afterthought.
- API route params in Next.js 16 use `params: Promise<{ id: string }>` — must `await params` to access.
- Auto-polling (every 30s) is a simple alternative to WebSockets for near-real-time admin panels.
- The order status flow with buttons only showing valid transitions prevents invalid state changes (e.g., delivered → processing).
