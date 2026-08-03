# ASPIRE Landing Page

Official landing page for PT Anugerah Surya Pacific Resources (ASPIRE) — an integrated green nickel mining and processing company in Konawe Utara, Southeast Sulawesi, Indonesia.

## Tech Stack

- Next.js 16 (App Router, Static Export / SSG)
- React 19 + Tailwind CSS v4
- GSAP 3 + ScrollTrigger (entrance & scroll-triggered reveal animations)
- TypeScript (strict mode)
- Bun (runtime & package manager)

## Features

- Bilingual routing `/en` & `/id` with static export generation.
- Prerendered static pages, Next/Image optimization.
- GSAP animations respecting `prefers-reduced-motion`.
- Responsive layout, mobile navbar drawer, interactive project pages.
- Dynamic per-page metadata, JSON-LD Organization, sitemap.xml, robots.txt.
- Baseline accessibility: skip link, focus ring, reduced-motion guard.

## Getting Started

Requires Bun (recommended) or Node.js 20+.

```bash
# Install
bun install

# Dev server
bun dev
# open http://localhost:3000 — redirects to /en

# Production build (static export to out/)
bun run build

# Type-check & lint
bun run typecheck
bun run lint
bun run check-data   # validate JSON structure in content/
```

## Content & Translations

All site text lives in the `content/` folder:

- `content/en/site.json` & `content/id/site.json` — navigation, address, social media, UI strings.
- `content/en/about.json` & `content/id/about.json` — About page text (purpose, vision, values, timeline).
- `content/en/projects/*.json` & `content/id/projects/*.json` — per-project detail content (slugs stay consistent across locales).

Edit the JSON, rebuild. No code changes needed to update text.

## License

Private © PT Anugerah Surya Pacific Resources (ASPIRE). All rights reserved.
