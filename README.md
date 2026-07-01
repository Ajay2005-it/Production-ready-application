# KEYSTROKE — Product Catalog Capstone

A production-ready e-commerce product catalog: a modular vanilla-JS single-page
app with client-side routing, a persistent cart, and zero build step required
to run or deploy it.

**Live demo:** deploy it yourself in under a minute — see [Deploy](#deploy) below.

## Why no framework / no bundler

The app is plain HTML/CSS/JS using native ES modules. That's a deliberate
architecture choice for this brief, not a shortcut:

- **Zero build step** — what you preview locally is exactly what ships.
- **No dependency risk** — nothing can break from an upstream package update.
- **Fast by default** — no framework runtime to download, parse, or hydrate.

If you want to layer in a bundler (Vite, esbuild) for further minification or
TypeScript later, the module boundaries below make that a drop-in change —
nothing here relies on globals.

## Architecture

```
production-ready/
├── index.html            # single HTML shell; #app is the router outlet
├── css/styles.css         # design tokens + component styles
├── js/
│   ├── app.js              # entry point — registers routes, mounts header
│   ├── router.js            # History API router (path params, link interception)
│   ├── cart.js               # cart state, localStorage-backed, pub/sub
│   ├── data.js                 # product catalog (swap for a real API later)
│   ├── productArt.js            # generates inline SVG product art (see Assets)
│   ├── components/
│   │   ├── header.js               # cart badge, subscribes to cart state
│   │   ├── productCard.js           # product card + grid markup
│   │   └── toast.js                  # "added to cart" notification
│   └── pages/
│       ├── home.js                     # hero + featured products
│       ├── catalog.js                   # filterable full catalog
│       ├── productDetail.js              # single product + add-to-cart
│       ├── cart.js                        # cart table, quantity, checkout
│       └── notFound.js                     # 404
├── sw.js                  # cache-first service worker for repeat visits
├── manifest.json          # PWA install metadata
├── vercel.json / netlify.toml / render.yaml   # SPA rewrite + cache headers
└── package.json           # local dev server scripts only, no build deps
```

**Routing:** `router.js` matches paths like `/product/:sku` against
registered patterns, intercepts in-app link clicks to avoid full reloads,
and re-renders into a single `#app` outlet on both `pushState` and
`popstate` (so back/forward buttons work correctly). Routes:

| Path | Page |
|---|---|
| `/` | Home — hero + featured products |
| `/catalog` | Full catalog |
| `/catalog/:category` | Catalog filtered by category |
| `/product/:sku` | Product detail |
| `/cart` | Cart + checkout |
| anything else | 404 |

**State:** the cart lives in `cart.js` as a small pub/sub store backed by
`localStorage`, so it survives refreshes without a backend. Any component
(header badge, cart page) subscribes and re-renders on change.

## Asset optimization

Rather than shipping compressed raster images, product imagery is generated
as **inline SVG** at render time (`productArt.js`). This is the project's
core performance decision:

- Every product visual is well under 1KB of markup — no image requests,
  no responsive `srcset` juggling, no layout shift while images load.
- Vector art stays crisp at any zoom/DPI with no extra bytes.
- If you replace this with real product photography, add `loading="lazy"`
  to `<img>` tags, serve WebP/AVIF with a JPEG fallback, and size images
  to their rendered dimensions before shipping.

Other performance choices already in place:

- Fonts load with `display=swap` and only the weights actually used.
- CSS and JS are hand-written to be lean rather than run through a minifier
  that would fight against the zero-build-step goal — for a stricter
  production pipeline, run `npx esbuild js/app.js --bundle --minify` and
  point `index.html` at the output, or add Vite for automatic bundling +
  hashing.
- `sw.js` precaches core assets and serves cache-first on repeat visits.
- `vercel.json` / `netlify.toml` / `render.yaml` all set `immutable`
  long-lived cache headers on `/js/*` and `/css/*`.

## Run locally

No install required beyond Node (for the one-line static server):

```bash
npx serve . -l 5173
# then open http://localhost:5173
```

Or open `index.html` directly in a browser for a quick look — routing works
via `file://` too, though the service worker won't register (browsers block
SW registration on `file://`; this is handled gracefully in `app.js`).

## Deploy

All three configs are already in this folder — pick one platform.

### Vercel
```bash
npx vercel --prod
```
`vercel.json` handles the SPA rewrite (all paths → `index.html`) and cache
headers automatically.

### Netlify
```bash
npx netlify-cli deploy --prod
```
Or drag the whole folder into the Netlify dashboard's manual deploy zone.
`netlify.toml` provides the redirect rule and headers.

### Render
Create a new **Static Site**, point it at this repo, leave the build command
empty, and set the publish directory to `.`. `render.yaml` already encodes
this if you use Render's Blueprint deploy.

No environment variables or secrets are required — this is a fully static
site with client-only state.

## Extending toward a real backend

`data.js` and `cart.js` are the two seams to swap for a real store:

1. Replace the static `PRODUCTS` array in `data.js` with a `fetch()` call
   to your product API, keeping the same shape (`sku`, `name`, `price`, …).
2. Replace `cart.js`'s `localStorage` persistence with API calls if you
   want carts to sync across devices, keeping the same `subscribe`/`notify`
   interface so the UI code doesn't change.
3. Point the checkout button in `js/pages/cart.js` at a real payment
   provider instead of the current `clearCart()` demo flow.
