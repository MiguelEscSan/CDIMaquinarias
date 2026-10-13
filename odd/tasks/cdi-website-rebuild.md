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
- [x] T9 — Consent-gated (click-to-load) Google Map in Contacto; legal pages `/aviso-legal/`, `/politica-de-datos/`, `/politica-de-cookies-1/` ported and adapted. Route: delegated writer.
- [x] T10 — Verification: check, build, vitest, one h1 per page, unique titles/descriptions, sitemap lists all pages. Route: delegated writer.

Delivery note: running count exceeds ~400 lines; repo has no remote yet, so the PR chain strategy is deferred until a remote exists.

## Acceptance criteria
- `npm run build` and `npx astro check` pass with 0 errors.
- Built `dist/index.html`: exactly one `<h1>`, valid JSON-LD, `tel:` links, title/description length limits respected.

## Checks
- Phase 1 test-first exception: no runnable deterministic test runner; verification was structural (astro check, build, dist inspection).
- Phase 2: Vitest (`npm test`) covers the contact use case and pure helpers (test-first); pages verified structurally from `.vercel/output/static`.

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
  - Commit: `f7f07c3` feat(contact): add contact form with astro action and smtp sender.
- T9 map + legal: `MapSection` renders a consent placeholder (address, Google cookies notice, link to política de cookies, "Abrir en Google Maps" link that works without JS); the "Cargar mapa" button ships `hidden` and an inline script reveals it and swaps in the iframe (`loading="lazy"`, `title`, `referrerpolicy="strict-origin-when-cross-origin"`) only on click. Button atom gained `hidden` + `data-*` passthrough. Legal texts as typed data in `src/data/legal.ts` (inline links `[label](href)` parsed by `src/lib/inlineLinks.ts`, rendered by `src/components/ui/InlineText.astro`), `src/layouts/LegalLayout.astro` with minimal `.legal-prose` styles in `global.css`, visible "Última actualización: 13 de octubre de 2026"; pages `src/pages/{aviso-legal,politica-de-datos,politica-de-cookies-1}.astro` (indexable, footer-only links). Route: delegated writer.
  - Legal adaptations (everything else is the original text with light cleanup: spacing, typos, tú/usted consistency, "de de" duplicates):
    - A1 Aviso legal §2: the empty "Inscripción al registro mercantil" line was omitted (no data on the original); "medios especificados en la política de privacidad" now links to `/politica-de-datos/`.
    - A2 Aviso legal §5: the broken placeholder "Juzgados y Tribunales más cercanos a la sede de (España)" became "más cercanos a su sede (España)".
    - A3 Privacidad §2: added the finality "Atender las consultas y solicitudes de presupuesto que nos envíe a través del formulario de contacto" (the new form exists).
    - A4 Privacidad §5: "No comparto los datos con terceros" replaced by: no cessions save legal obligation; processors = hosting provider (Vercel Inc.) and the company's email/SMTP provider that relays the form data by email.
    - A5 Privacidad §6: the six "haga clic aquí" links (forms of the previous provider, not available) replaced by "escríbanos a administracion2@cdimaquinarias.com indicando el derecho que desea ejercer".
    - A6 Cookies: removed the statements about advertising, segmentation, analytics/measurement and tracking cookies (the new site has no IONOS SiteAnalytics and no cookies by default); new section "Cookies que utiliza este sitio web": no own/advertising/analytics cookies; Google Maps loads only after "Cargar mapa", then Google may set cookies (link to Google's privacy policy); the change-notice sentence now refers to updating this policy. Browser how-to guides kept as in the original (they are outdated: IE, old Chrome menus).
    - Needs review by the business / legal advisor before go-live (processors, possible international transfer to Vercel, retention period, Registro Mercantil data).
  - Tests (test-first): `tests/lib/inlineLinks.test.ts` RED "Cannot find module '../../src/lib/inlineLinks'", then GREEN; `tests/lib/paths.test.ts` added. `npm test`: 3 files, 12 passed.
  - `npm run check`: 0 errors, 0 warnings, 0 hints. `npm run build`: Complete; 8 prerendered pages + on-demand `/contacto/`; no `<iframe` in any built HTML.
  - Browser (dev, 375px emulation): scrollWidth = clientWidth on all 9 pages; `aria-current` correct per page; clicking "Cargar mapa" inserts exactly one iframe with lazy loading, title and strict-origin-when-cross-origin.
  - Commit: `1d90931` feat(legal): add legal pages and consent-gated map.
- T10 verification (no code changes; folded into a docs commit). Route: delegated writer.
  - `npm run check`: 0 errors, 0 warnings, 0 hints.
  - `npm test`: 3 files, 12 tests passed.
  - `npm run build`: Complete with adapter `@astrojs/vercel`; output `.vercel/output/static` + `functions/_render.func`.
  - Node inspection of `.vercel/output/static` (8 prerendered pages): each exactly one `<h1`; titles 29–56 chars, unique; descriptions 129–142 chars, unique; every JSON-LD block parses; sitemap lists 9 URLs (incl. on-demand `/contacto/`), all with trailing slash. Contacto (dev render): h1=1, title 56, desc 139, LocalBusiness + BreadcrumbList.
  - `rg "928|625|cdi@|Simón|35214|B76075506" src/components src/layouts src/pages`: 0 matches (exit 1).
  - `astro preview`: not usable with `@astrojs/vercel` (adapter has no preview entrypoint; a pre-existing preview server on 4321 also blocked a second instance). `astro dev --port 4333` + `curl /contacto/`: 200, one `<form method="POST">`; server stopped afterwards.
  - Not run: real SMTP delivery, Lighthouse, screenshots (pane screenshot timed out).

## Deployment notes (Vercel)
Set in Vercel project env (server-side): `SMTP_HOST` (IONOS: `smtp.ionos.es`), `SMTP_PORT` (465), `SMTP_SECURE` (true), `SMTP_USER` (full mailbox), `SMTP_PASS`, optional `CONTACT_TO` (default `cdi@cdimaquinarias.com`). Without SMTP vars the form shows the generic failure and logs "[contact] SMTP is not configured".

## Next step
Native review of Phase 2 (`399b802`..HEAD) / delivery decision by the user (push and PR are human decisions). Legal texts need review by the business/legal advisor. Configure SMTP env vars in Vercel and test a real submission. Provide `public/og-image.jpg`, real photos and logo. `.claude/launch.json` still runs `npm run preview`, which cannot serve on-demand routes with the Vercel adapter; switch it to `npm run dev`.

## Phase 2 native review
- Range `45e42eb`..`a801fa2` (includes `399b802`), risk high, consent granted, 4 lenses: approved, acknowledged/burned (lineage review-4b8339ac6978cbe5).
- Advisory follow-ups (non-blocking): F1 rate limit / anti-abuse on contact action (R1-001, R4-002); F2 overall SMTP send deadline below Vercel maxDuration (R4-001); F3 single source for form validation limits (R2-001); F4 legal template punctuation depends on legal name ending in "." (R2-002); F5 action boundary + contacto page-state tests (R3-001, R3-002); F6 honeypot check before SMTP config check (R3-003).

### Phase 3 — contact hardening (user request 2026-10-13, follow-ups F1 + F2)
- Scope change (2026-10-13): hosting moves from Vercel to Cloudflare; the Upstash adapter and Vercel `maxDuration` were dropped. Only platform-agnostic parts are implemented.
- [x] T11 — Rate limiting: `RateLimiter` port; in-memory adapter (best-effort per instance); per-client and global caps; 429 with Spanish message and values preserved; honeypot short-circuits before limiter/SMTP (also closes F6). Test-first (Vitest). Route: delegated writer.
  - Core: `src/core/contact/RateLimiter.ts` (port + policy), `src/core/contact/errors.ts` (`ContactDeliveryError` moved here, `ContactRateLimitedError`, `ContactMailNotConfiguredError`), `src/core/contact/handleContactSubmission.ts` (honeypot → per-client limit → global limit `contact:global` → mail config → send). Policy single source: `src/config/contactLimits.ts` (3 / 10 min per client, 30 / h global).
  - Adapter: `src/infrastructure/rateLimit/InMemoryRateLimiter.ts` (fixed window, injectable clock, sweep of expired keys once per window, `maxKeys` 10 000 oldest-first eviction). Module-scope instances in the action.
  - Client key: `src/lib/clientKey.ts` — `context.clientAddress`, fallback first `x-forwarded-for`, else `unknown`; key `contact:<sha256 hex>` via Web Crypto (no raw IP stored, runtime-agnostic).
  - Mapping: `src/lib/contactFeedback.ts` (`contactFailureFor` → `TOO_MANY_REQUESTS` / `INTERNAL_SERVER_ERROR`; `contactErrorFeedback` → page status 429 / 500 + copy). Copy `contactFormCopy.rateLimited` uses `primaryPhone` from `siteInfo`.
  - A7 Privacidad §4: added one sentence — legitimate interest in preventing abuse of the contact form; temporary anonymised connection identifier derived from the IP, deleted automatically within 1 hour. Needs legal-advisor review (a hash of an IP is pseudonymised rather than anonymised data under GDPR).
  - RED: 5 new test files failed with "Cannot find module" (`errors`, `InMemoryRateLimiter`, `clientKey`, …). GREEN: `npm test` 7 files, 32 passed.
  - Dev smoke (`astro dev --port 4334`, no SMTP env, `?_action=contact`): honeypot POST → 200 success; next 3 valid POSTs → 500 generic failure + "[contact] SMTP is not configured"; 4th → 429 with the rate-limit alert and values preserved; log "[contact] rate limited (retry after 600s)".
- [x] T12 — Send deadline: overall timeout, tighter Nodemailer timeouts, typed timeout error mapped to a "could not confirm delivery" message that avoids duplicate resubmits. Vercel `maxDuration` dropped by the Cloudflare scope change (the hosting limit must be checked on the new platform). Test-first with fake timers. Route: delegated writer.
  - `src/core/shared/withDeadline.ts` (`AbortController` + `setTimeout`, timer always cleared, `DeadlineExceededError`); `SEND_DEADLINE_MS = 8000` in `src/config/contactLimits.ts`; `MailSender.send(email, { signal })`; `sendContactMessage` maps the deadline to `ContactDeliveryTimeoutError` (distinct from `ContactDeliveryError`); `handleContactSubmission` requires `deadlineMs`.
  - Nodemailer: `connectionTimeout` 5000, `greetingTimeout` 5000, `socketTimeout` 8000; transport closed after every send and on abort (a session already past DATA may still deliver — documented in the adapter and the error).
  - Mapping: `GATEWAY_TIMEOUT` → page HTTP 504 with `contactFormCopy.deliveryUnconfirmed` (phone from `primaryPhone`); generic failure stays 500.
  - RED: `withDeadline.test.ts` "Cannot find module"; 6 failing tests (timeout not raised, `ContactDeliveryTimeoutError` undefined, no 504 mapping). GREEN: `npm test` 8 files, 41 passed.
  - Dev smoke with a local fake SMTP answering each command after 3 s (`SMTP_HOST=127.0.0.1:2526`, insecure): POST → HTTP 504 after 8.17 s, unconfirmed-delivery alert, values preserved, log "[contact] delivery not confirmed within 8000ms; it may still arrive."
- Phase 3 verification: `npm run check` 0 errors/0 warnings/0 hints; `npm test` 8 files, 41 passed; `npm run build` Complete; `rg "928|625|cdi@" src/actions src/core src/infrastructure src/pages src/components` 0 matches.
- Follow-ups resolved: F1 (T11), F2 (T12; platform time limit to be set on Cloudflare), F6 (T11, honeypot before limiter and SMTP config).
- Commits: T11 `a8dd1e7` feat(contact): rate limit contact submissions; T12 = HEAD feat(contact): bound smtp send time.

Phase 3 native review: range `fa080b0`..`8fb0173` assessed medium (slice_budget_reached, 811 lines); user declined review for this candidate (2026-10-13).

### Phase 4 — Cloudflare migration (user request 2026-10-13)
Rationale: user moves hosting from Vercel to Cloudflare (free plan allows commercial use; Vercel Hobby does not). Target: Cloudflare Workers with static assets (Cloudflare's recommendation for new projects), `@astrojs/cloudflare` 14.x.
- [ ] T13 — Swap adapter to `@astrojs/cloudflare` + `wrangler.jsonc` (`nodejs_compat`), secrets via `.dev.vars`/Wrangler secrets, local preview via `wrangler dev`; prove Nodemailer SMTP runs on workerd. Route: delegated writer.
- [ ] T14 — `KvRateLimiter` adapter (Workers KV binding), fail-open to in-memory, client IP from Cloudflare. Test-first. Route: delegated writer.
- [ ] T15 — Replace Vercel references (privacy §5 processor, README, deployment notes). Route: delegated writer.
