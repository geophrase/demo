# Geophrase Demo Store

A minimal Next.js 16 storefront demonstrating how to integrate [Geophrase](https://geophrase.com) for verified address collection at checkout.

The flow is intentionally small so the integration is easy to read:

- **`/`** — product listing, add/remove items.
- **`/cart`** — review items.
- **`/login`** — collect a phone number (stored locally; no real OTP for the demo).
- **`/checkout`** — opens the Geophrase widget via `useGeophrase`, displays the verified address on success.

The Geophrase integration lives entirely in [src/app/checkout/page.js](src/app/checkout/page.js).

## Prerequisites

1. **Create a Geophrase business account** at [geophrase.com](https://geophrase.com).
2. **Generate an API key** — follow the guide at [https://geophrase.com/docs/api-keys](https://geophrase.com/docs/api-keys).
   - For local development, leave the key **unrestricted** (no origin allowlist) so `http://localhost:3000` can call the API.
   - When you deploy, restrict the key to your production origin to prevent misuse.

## Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root with your API key:

```
NEXT_PUBLIC_GEOPHRASE_API_KEY=your_api_key_here
```

The `NEXT_PUBLIC_` prefix exposes the variable to the browser, which is required because the Geophrase widget runs client-side.

## Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How the Geophrase integration works

In [src/app/checkout/page.js](src/app/checkout/page.js):

```js
const { open } = useGeophrase({
    key: GEOPHRASE_API_KEY,
    theme: 'system',
    phone,
    onSuccess: (result) => { /* result contains the verified address */ },
    onClose: () => router.push('/cart'),
});
```

- `key` — your API key.
- `theme` — `'light'`, `'dark'`, or `'system'`. Passing this avoids a flash on first paint.
- `phone` — pre-fills the widget if the user is already known.
- `onSuccess` / `onClose` — callbacks for the merchant app.

Call `open()` to launch the widget overlay.

## Project structure

```
src/
├── app/
│   ├── layout.js           # Root layout: theme, cart provider, color-scheme script
│   ├── page.js             # Home / product listing
│   ├── cart/page.js
│   ├── checkout/page.js    # Geophrase integration
│   └── login/page.js
├── components/
│   ├── Header.js           # Shared AppBar with login/logout
│   ├── ThemeRegistry.js    # MUI ThemeProvider (client boundary)
│   └── CustomListItemText.js
├── context/
│   └── CartContext.js
├── hooks/
│   └── useAuth.js          # localStorage-backed phone via useSyncExternalStore
└── constants/constants.js
```

## Deployment notes

- Restrict the API key to your production origin in the Geophrase dashboard.
- The app follows the system color scheme automatically. To add a manual toggle, use MUI's `useColorScheme()` hook.
