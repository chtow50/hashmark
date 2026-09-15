# Vercel environment variables (HASHMARK)

Do **not** put secrets in the repo or prefix them with `VITE_`. Only `VITE_*` vars reach the browser.

## `STRIPE_SECRET_KEY` — required for `/edge/unlock`

Used by the server to retrieve a Stripe Checkout Session and confirm `payment_status=paid` before serving the CLEARed Week 3 pack from `data/edge-packs/current/` (markdown + JSON). Without this key the unlock page stays closed.

1. Stripe Dashboard → Developers → API keys → **Secret key** (`sk_live_…` for production).
2. Vercel → Project **hashmark** (hashmarkcfb.com) → **Settings → Environment Variables**.
3. Name: `STRIPE_SECRET_KEY`
4. Value: the secret key. Encrypt / sensitive.
5. Environments: **Production**. Add **Preview** as well if you test Payment Links in Stripe test mode (`sk_test_…` on Preview only).
6. Redeploy after saving so serverless functions pick up the new env.

Payment Links already return to:

`https://hashmarkcfb.com/edge/unlock?session_id={CHECKOUT_SESSION_ID}`

There is no login wall. The Checkout Session id is the capability; the pack is not on a public static URL.

Checkout button URLs (already wired, public Payment Links):

- `VITE_EDGE_CHECKOUT_WEEK_URL` — $9 week sample
- `VITE_EDGE_CHECKOUT_URL` — $29/mo
