# Section: Payment, Contact Page, Analytics

## What we did
Added Razorpay online payment integration (with Cash on Delivery fallback), built a contact page with form, added Google Analytics infrastructure, linked contact in navbar, and updated sitemap.

## Concepts covered
- **Payment flow**: Client requests order → server creates Razorpay order → client opens Razorpay checkout modal with `order_id` → Razorpay calls handler on success → server verifies payment signature using HMAC SHA256
- **HMAC verification**: `crypto.createHmac("sha256", secret).update(${orderId}|${paymentId}).digest("hex")` — comparing the generated signature with Razorpay's response ensures the payment wasn't tampered with
- **Server-only env vars**: `RAZORPAY_KEY_SECRET` (no `NEXT_PUBLIC_` prefix) is only accessible on the server — used in API routes. `NEXT_PUBLIC_RAZORPAY_KEY_ID` is safe for the client (it's just an identifier).
- **Graceful degradation**: If Razorpay env vars are missing, the checkout shows "Configure Razorpay keys to enable" instead of crashing.
- **Razorpay checkout SDK**: `new window.Razorpay(options)` — the modal handles the entire payment UX. Developer provides `order_id`, `key`, `prefill`, and callback handlers.
- **Google Analytics Script**: Using Next.js `Script` component with `strategy="afterInteractive"` ensures GA loads after page content without blocking rendering.
- **HMAC**: Hash-based Message Authentication Code — a way to verify data integrity and authenticity using a shared secret key.
- **API route organization**: Each API endpoint gets its own folder (`/api/create-razorpay-order`, `/api/verify-razorpay-payment`) with its own `route.ts` — clean separation.

## You asked about
- Payment provider preference (chose Razorpay)
- API keys (chose placeholder keys to add later)
- Analytics tool (chose free option → Google Analytics)

## Key takeaways
- Payment integration follows a 3-step flow: create order → open modal → verify signature
- Never expose server-only env vars (like `RAZORPAY_KEY_SECRET`) to the client
- Placeholder keys let you build the full integration now and configure it later
- The `Script` component from Next.js is preferred over manual `<script>` tags for performance
- Contact page + sitemap update + navbar link = standard "new page" workflow
