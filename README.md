# ph-address-demo

Live demo of [`@ph-dev-utils/address-react`](https://www.npmjs.com/package/@ph-dev-utils/address-react) — a cascading Philippine address picker (region → province → city/municipality → ZIP) for React.

Single-page Vite + React + Tailwind app that installs the published package from npm and showcases the edge cases it handles (NCR with no provinces, independent cities, multi-ZIP cities like Manila).

```bash
npm install
npm run dev      # local
npm run build    # production build → dist/
```

## Deploy (Vercel)

Vite is Vercel-native — connect this repo at [vercel.com/new](https://vercel.com/new) (framework auto-detected, build `npm run build`, output `dist`). No config needed.

Part of the [@ph-dev-utils](https://github.com/kon2raya24/ph-dev-utils) family.
