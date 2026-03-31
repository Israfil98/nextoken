# NexToken — Crypto Analytics Dashboard

A real-time cryptocurrency analytics dashboard built with React 19 and TypeScript. Fetches live market data from the CoinGecko API with intelligent caching via TanStack Query.

**Live:** [nextoken-six.vercel.app](https://nextoken-six.vercel.app)

## Features

- **Overview page** — global market stats, highlight cards (BTC, ETH, top gainer/loser), trending coins, and a top 10 coins table
- **Coins table** — sortable columns, search with debounce, pagination, 7-day sparkline charts per row
- **Coin detail page** — interactive price chart with time range toggles (24h, 7d, 30d, 90d, 1y), key stats grid (market cap, supply, ATH/ATL)
- **Watchlist** — star any coin to save it, persisted in localStorage
- **Dark/light theme** — full theme system via CSS custom properties, respects OS preference, persisted in localStorage
- **Collapsible sidebar** — expand/collapse on desktop, slide-in overlay on mobile
- **Skeleton loading** — shimmer placeholders matching page layout on all pages
- **Responsive** — progressive column hiding, mobile-first design

## Tech Stack

- **React 19** + **TypeScript** + **Vite 7**
- **Sass/SCSS** with CSS Modules — scoped component styles, global design system with variables and mixins
- **TanStack Query v5** — data fetching, caching, background refetching, deduplication
- **Recharts** — interactive area charts with tooltips and gradient fills
- **Zustand** — global state (theme, sidebar, watchlist)
- **React Router v7** — client-side routing with layout route pattern
- **lucide-react** — icon library

## Architecture

```
src/
  components/       # Shared/reusable components (Layout, Logo, Skeleton, etc.)
  pages/            # Route-level pages with page-specific components
  hooks/            # Custom hooks (useCoins, useSort, useDebounce)
  stores/           # Zustand stores (theme, sidebar, watchlist)
  lib/              # API service, formatters, query client config
  data/             # Static data (navigation, chart ranges)
  types/            # Shared TypeScript interfaces and types
  styles/           # Global SCSS design system (variables, mixins, reset, base)
```

## Key Patterns

- **Presentational component pattern** — pages own data and handlers, child components render via props
- **CSS Modules** — scoped styles per component, no class name collisions
- **Custom hooks** — `useCoins`, `useTrendingCoins`, `useGlobalData`, `useCoinDetail`, `useCoinChart`, `useSort`, `useDebounce`
- **React Query caching** — 2-minute stale time, 5-minute garbage collection, conservative for free API tier
- **Theme system** — SCSS variables for static values (spacing, breakpoints), CSS custom properties for runtime values (colors)
- **Lazy loading** — `React.lazy()` + `Suspense` for code-split pages
- **Vendor chunk splitting** — separate bundles for React, Recharts, and TanStack Query

## Getting Started

```bash
git clone https://github.com/Israfil98/nextoken.git
cd nextoken
npm install
npm run dev
```

No API keys needed — CoinGecko's free tier is used. Rate limited to ~30 requests/min.

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Type check + production build
npm run lint         # ESLint
npm run format       # Prettier
npm run format:check # Check formatting
npm run preview      # Preview production build
```

## Code Quality

- ESLint 9 (flat config)
- Prettier with consistent formatting
- Husky + lint-staged (pre-commit hooks)
- GitHub Actions CI (type check, lint, format check on every PR)
