# Vercel environment variables (HASHMARK)

Do **not** put secrets in the repo or prefix them with `VITE_`. Only `VITE_*` vars reach the browser.

## `STRIPE_SECRET_KEY` — required for `/edge/unlock` and `/api/edge/pack`

Used by the server to retrieve a Stripe Checkout Session and confirm `payment_status=paid` before serving the CLEARed Week 3 pack from `data/edge-packs/current/` (markdown + JSON downloads). Without this key the unlock page stays closed.

1. Stripe Dashboard → Developers → API keys → **Secret key** (`sk_live_…` for production). A restricted key (`rk_live_…`) with Checkout Session **read** is preferred.
2. Vercel → HASHMARK project (hashmarkcfb.com) → **Settings → Environment Variables**.
3. Name: `STRIPE_SECRET_KEY`
4. Value: the secret or restricted key. Mark **Sensitive**.
5. Environments: **Production** and **Preview** (use `sk_test_…` / `rk_test_…` on Preview if you test Payment Links in test mode).
6. Redeploy / Re-Publish after saving so the prebuilt serverless function can read it at runtime.

Do **not** prefix with `VITE_`. Payment Links already return to:

`https://hashmarkcfb.com/edge/unlock?session_id={CHECKOUT_SESSION_ID}`

There is no login wall. The Checkout Session id is the capability; pack files are not public static assets.

Checkout button URLs (already wired, public Payment Links):

- `VITE_EDGE_CHECKOUT_WEEK_URL` — $9 week sample
- `VITE_EDGE_CHECKOUT_URL` — $29/mo
