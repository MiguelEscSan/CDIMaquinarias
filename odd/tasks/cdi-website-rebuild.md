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
- [x] T2 — Types + data layer (`types/index.ts`, `data/siteInfo.ts`, `data/services.ts`, `data/navigation.ts`). Route: delegated writer.
- [ ] T3 — UI atoms (Button, Card, Badge, SectionHeader, FloatingContact) + layout (Navbar, Footer). Route: delegated writer.
- [ ] T4 — BaseLayout with SEO meta, OG/Twitter, JSON-LD. Route: delegated writer.
- [ ] T5 — Sections (Hero, ServicesSection, BrandTrust, ContactSection, MapSection) + `pages/index.astro`. Route: delegated writer.

## Acceptance criteria
- `npm run build` and `npx astro check` pass with 0 errors.
- Built `dist/index.html`: exactly one `<h1>`, valid JSON-LD, `tel:` links, title/description length limits respected.

## Checks
- Test-first exception: greenfield static marketing site with no runnable deterministic test runner; verification is structural (astro check, build, dist inspection).

## Progress / Evidence
- T1 scaffold: astro 7.3.8, tailwindcss 4.3.3 + @tailwindcss/vite 4.3.3, @astrojs/sitemap 3.7.4, @astrojs/check 0.9.10, typescript 6.0.3 (TS 7.0.2 is latest but @astrojs/check peer range is ^5 || ^6). Added devDependency @emnapi/runtime 1.11.3: @astrojs/astro2tsx 0.1.2 imports it at runtime but only lists it as a devDependency, so `astro check` failed to load @astrojs/check without it.
  - `npm run build`: Complete, 1 page built; sitemap-index.xml created.
  - `npm run check`: 0 errors, 0 warnings, 0 hints.
  - Commit: `fd4b2b8` chore: scaffold astro project with tailwind v4 (a minimal placeholder `src/pages/index.astro` was included so the build passes; replaced in T5).
- T2 data layer: `src/types/index.ts`, `src/data/siteInfo.ts`, `src/data/services.ts`, `src/data/navigation.ts`, plus `src/data/homeContent.ts` (section copy so components hold no copy). Trust chip uses "Distribuidor STILL" (not "oficial": not stated in the SSOT).
  - `npx tsc --noEmit -p .`: no output (0 errors).
  - `npm run check`: 0 errors, 0 warnings, 0 hints.
  - Commit: recorded in T3 entry.

## Next step
T3.
