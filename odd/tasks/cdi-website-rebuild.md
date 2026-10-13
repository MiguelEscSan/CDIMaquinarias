# CDI Maquinarias — Website Rebuild

## Objective
Rebuild cdimaquinarias.com as a static Astro + Tailwind site with clean architecture, typed data layer, reusable UI atoms, and local SEO (JSON-LD LocalBusiness).

## Problem / Why
Current site looks like an old template; business data is not structured; local SEO is weak.

## Scope
- Astro (SSG) + Tailwind CSS + TypeScript strict.
- `src/types`, `src/data` (siteInfo, services, navigation), `src/components/{ui,layout,sections}`, `src/layouts/BaseLayout.astro`, `src/pages/index.astro`.
- Spanish UI copy (requested by user, neutral/professional register).

## Constraints
- Zero hardcoded business data in views; everything from `src/data/`.
- Single `<h1>`; title < 60 chars; description < 155 chars.
- Zero blocking JS; mobile-first; accessible nav.
- Business data must match the user-provided SSOT exactly.

## Delivery strategy
`ask-on-risk`. Forecast: greenfield scaffold, ~900 authored lines (config/lockfile excluded).

## Tasks
- [x] T1 — Scaffold Astro + Tailwind + TS strict; `npm run build` passes. Route: delegated writer (2+ non-trivial files).
- [ ] T2 — Types + data layer (`types/index.ts`, `data/siteInfo.ts`, `data/services.ts`, `data/navigation.ts`). Route: delegated writer.
- [ ] T3 — UI atoms (Button, Card, Badge, SectionHeader, FloatingContact) + layout (Navbar, Footer). Route: delegated writer.
- [ ] T4 — BaseLayout with SEO meta, OG/Twitter, JSON-LD. Route: delegated writer.
- [ ] T5 — Sections (Hero, ServicesSection, BrandTrust, ContactSection, MapSection) + `pages/index.astro`. Route: delegated writer.

## Acceptance criteria
- `npm run build` and `npx astro check` pass with 0 errors.
- Built `dist/index.html`: exactly one `<h1>`, valid JSON-LD, `tel:` links, title/description length limits respected.

## Checks
- Test-first exception: greenfield static marketing site with no runnable deterministic test runner; verification is structural (astro check, build, dist inspection).

## Progress / Evidence
- T1 scaffold: astro 7.3.8, tailwindcss 4.3.3 + @tailwindcss/vite 4.3.3, @astrojs/sitemap 3.7.4, @astrojs/check 0.9.10, typescript 6.0.3 (TS 7.0.2 is latest but @astrojs/check peer range is ^5 || ^6). Added devDependency @emnapi/runtime 1.11.3: @astrojs/astro2tsx 0.1.2 imports it at runtime but only lists it as a devDependency, so  failed to load @astrojs/check without it.
  - : Complete, 1 page built; sitemap-index.xml created.
  - : 0 errors, 0 warnings, 0 hints.

## Next step
T2.
