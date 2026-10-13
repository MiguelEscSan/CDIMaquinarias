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
- [x] T3 — UI atoms (Button, Card, Badge, SectionHeader, FloatingContact) + layout (Navbar, Footer). Route: delegated writer.
- [x] T4 — BaseLayout with SEO meta, OG/Twitter, JSON-LD. Route: delegated writer.
- [x] T5 — Sections (Hero, ServicesSection, BrandTrust, ContactSection, MapSection) + `pages/index.astro`. Route: delegated writer.

### Phase 2 — multi-page parity with original site (user request 2026-10-13)
Rationale: user asked to mirror the original multi-page structure, add Quiénes somos, and move location into Contacto. Hosting decided: Vercel; contact form via Astro Actions + Nodemailer SMTP (user rejected third-party form services in favor of a TS solution).
- [x] T6 — Extend data layer: per-page SEO meta, about, products/STILL, renting categories, legal company data; multi-page navigation; "Distribuidor oficial STILL" (the claim appears on the original site). Route: delegated writer.
- [x] T7 — Multi-page routing with original slugs (`/quienes-somos/`, `/servicios/`, `/productos/`, `/renting/`, `/contacto/`), PageHero + breadcrumbs (BreadcrumbList JSON-LD), per-path `aria-current`, location merged into Contacto. Route: delegated writer.
- [x] T8 — Contact form: Vercel adapter, `contact` Astro Action (zod), hexagonal core (`MailSender` port, Nodemailer adapter, use case), honeypot, progressive enhancement, Vitest unit tests (test-first). Route: delegated writer.
- [ ] T9 — Consent-gated (click-to-load) Google Map in Contacto; legal pages `/aviso-legal/`, `/politica-de-datos/`, `/politica-de-cookies-1/` ported and adapted. Route: delegated writer.
- [ ] T10 — Verification: check, build, vitest, one h1 per page, unique titles/descriptions, sitemap lists all pages. Route: delegated writer.

Delivery note: running count exceeds ~400 lines; repo has no remote yet, so the PR chain strategy is deferred until a remote exists.

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
  - Commit: `eab9d7b` feat(data): add typed business data layer.
- T3 UI atoms + layout: `src/components/ui/{Button,Card,Badge,SectionHeader,Icon,FloatingContact}.astro`, `src/components/layout/{Navbar,Footer}.astro`. Atoms are props-driven; Navbar/Footer act as containers that read `src/data`. Mobile menu is `<details>`/`<summary>`; a 3-line inline script only closes the menu after tapping a link (progressive enhancement, menu works without JS).
  - `npm run check`: 16 files, 0 errors, 0 warnings, 0 hints.
  - Commit: `3740334` feat(ui): add reusable ui atoms and layout components.
- T4 SEO layout: `src/layouts/BaseLayout.astro` (canonical, robots, theme-color, OG, Twitter `summary_large_image`, favicon, skip link, header/footer slots), pure builder `src/lib/schema.ts` (LocalBusiness + PostalAddress + openingHours/openingHoursSpecification + Brand STILL + OfferCatalog of 5 Services), `public/favicon.svg`, `public/robots.txt`. Placeholder index now renders through BaseLayout.
  - `npm run check`: 0 errors, 0 warnings, 0 hints.
  - `npm run build`: Complete; JSON-LD in `dist/index.html` parses (`openingHours` "Mo-Fr 08:00-16:00", telephone ["+34928133851","+34625444646"]).
  - Pending asset: `/og-image.jpg` is referenced (OG/Twitter/JSON-LD `image`) but not yet provided.
  - Commit: `0cedf3a` feat(seo): add base layout with meta tags and local business schema.
- T5 home: `src/components/sections/{Hero,ServicesSection,BrandTrust,ContactSection,MapSection}.astro`, final `src/pages/index.astro`; Button gained an `inverse` variant for dark backgrounds; `floatingContact` props added to `src/data/navigation.ts` (the page, as composition root, imports this one data object to feed the props-only FloatingContact atom).
  - `npm run check`: 0 errors, 0 warnings, 0 hints.
  - `npm run build`: Complete, 1 page built.
  - dist inspection: h1=1; title 49 chars; description 129 chars; ld+json parses (`LocalBusiness`, 5 offers); `href="tel:` = 9; heading sequence 1,2,3…; section ids inicio/servicios/still/contacto/ubicacion; 1 non-JSON-LD script (inline menu closer).
  - `rg "928|625|cdi@|Simón|35214" src/components src/layouts`: 0 matches.
  - Not run: visual/browser check, Lighthouse.
  - Commit: `45e42eb` feat(home): compose home page sections.
- Native review (base `fd4b2b8`..`45e42eb`, risk medium, consent granted): approved, lens review-reliability, authority acknowledged/burned (lineage review-a98acb168a80b042). Advisory, non-blocking: R3-001 missing `/og-image.jpg`; R3-002 `toOpeningHoursString` assumes contiguous days; R3-003 no unit tests for `formatHours`/schema builder.
- Fix (browser check at 375px): header overflowed 22px because Button base `inline-flex` overrode the passed `hidden`; Navbar now passes `max-sm:hidden`. After fix scrollWidth = clientWidth = 375; build and check pass. Commit: HEAD (fix(nav): hide header call button on small screens).
- T6 data layer (Phase 2): types `PageMeta`, `BreadcrumbItem`, `SectionCopy`, `AboutContent`, `ProductsContent`, `RentingCategory`, `LegalInfo`, `LegalDocument`; `Service` gained `detail` + optional `link`. New `src/data/{pages,about,products,renting,contactContent,legal}.ts`; `legalInfo` in `siteInfo.ts` (CIF and domicilio social from the original aviso legal; privacy email and controller from the original política de datos). Service titles are now the original ones (Reparación y mantenimiento, Ventas, Alquiler, Asesoramiento) + Climatización. Trust chip/badge: "Distribuidor oficial STILL". `quoteCta` now points to `/contacto/`. Route: delegated writer.
  - `npm run check`: 0 errors, 0 warnings (17 deprecation hints for the transitional `sectionIds`, removed in T7). `npm run build`: Complete.
  - Deviation: this commit also carries the T8 dependency install (package.json/lockfile).
  - Commit: `2bcfc4e` feat(data): add multi-page content and legal data.
- T7 pages: `src/pages/{index,quienes-somos,servicios,productos,renting,contacto}.astro`; `src/layouts/PageLayout.astro` (Navbar + PageHero + Footer + FloatingContact); `PageHero` (single h1, `nav[aria-label=Breadcrumb]`, `aria-current="page"` on the last crumb); sections `AboutSection`, `ServiceDetailList` (anchor per service slug), `ProductsSection` (external STILL catalog, `noopener noreferrer`, `_blank`), `RentingGrid` (7 cards → `/contacto/?equipo=<slug>`), `CtaBand`. BaseLayout emits BreadcrumbList JSON-LD (`buildBreadcrumbSchema` in `src/lib/schema.ts`) on inner pages; Navbar `aria-current` via `src/lib/paths.ts` (desktop + mobile); legal links in the footer; `trailingSlash: "always"`; `sectionIds`/`quoteMailto` removed; MapSection moved from home to Contacto; Navbar badge uses `max-xl:hidden` (Badge base `inline-flex` would override `hidden`). Route: delegated writer.
  - `npm run check`: 42 files, 0 errors, 0 warnings, 0 hints. `npm run build`: 6 pages built.
  - dist inspection: every page h1=1, titles 47–56 chars and unique, descriptions 129–141 chars, JSON-LD parses (LocalBusiness + BreadcrumbList on inner pages); sitemap lists 6 URLs with trailing slashes.
  - Commit: `865becb` feat(pages): split site into original multi-page structure.
- T8 contact form: deps `@astrojs/vercel` 11.0.14 (peer astro ^7), `nodemailer` 10.0.11 (ships its own types, so `@types/nodemailer` was not kept; 10.1.0 is 3 days old), dev `vitest` 5.0.4; `"test": "vitest run"`, `vitest.config.ts`. Core: `src/core/contact/{ContactMessage,MailSender,sendContactMessage}.ts` (use case builds to/replyTo/subject/plain-text body, strips CR/LF from subject parts, honeypot → `discarded` without sending, sender failure → `ContactDeliveryError` with `cause`). Adapter: `src/infrastructure/mail/NodemailerMailSender.ts` (SMTP config injected, timeouts). Action: `src/actions/index.ts` (`accept: "form"`, zod from `astro/zod`: name 2–100, email ≤254 + `z.email`, message 10–5000, `privacy` literal `"on"`, optional `website` honeypot and `equipo`; equipo slug resolved to the renting category name server-side; failures → `ActionError` INTERNAL_SERVER_ERROR with the Spanish copy, SMTP error only logged server-side). Env via `astro:env` (all `server`/`secret`; SMTP_HOST/USER/PASS optional so builds work without them, missing config → generic failure + server log). `.env.example` with IONOS hint; `.vercel/` ignored. `src/pages/contacto.astro` is `prerender = false`; `ContactForm.astro` renders field errors (`aria-invalid`, `aria-describedby`), preserved values (re-read from the cloned request body), hidden `equipo`, `sr-only` + `aria-hidden` honeypot, `role="status"` success, `role="alert"` failure. Route: delegated writer.
  - Test-first: RED 1 — `npm test` failed: "Cannot find module '../../src/core/contact/sendContactMessage'". RED 2 (stub) — 6 failed (6): "Error: Not implemented" / "expected Error: Not implemented to be an instance of ContactDeliveryError". GREEN — 6 passed (6).
  - `npm run check`: 50 files, 0 errors. `npm run build`: Complete with `@astrojs/vercel` (`.vercel/output/static` + `_render.func`).
  - Dev smoke (`astro dev --port 4333`): GET `/contacto/?equipo=recogepedidos` → form with `action="?_action=contact"`, message prefilled and hidden equipo; POST invalid → HTTP 400 with 4 Spanish field errors and preserved values; POST valid without SMTP env → HTTP 500 with the generic alert and server log "[contact] SMTP is not configured". Real SMTP delivery not exercised (no credentials).
  - Commit: see T9 entry.

## Next step
Native review / delivery decision by the user (push and PR are human decisions). Provide `public/og-image.jpg`, real photos and logo.
