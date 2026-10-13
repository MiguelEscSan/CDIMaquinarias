# CDI Maquinarias — Sitio web

Sitio corporativo de CDI Maquinarias (distribuidores de STILL en Las Palmas de Gran Canaria), en español (por defecto, sin prefijo) e inglés (`/en/`). Páginas estáticas más el formulario de contacto (`/contacto/` y `/en/contact/`), que se renderiza bajo demanda en Cloudflare Workers.

## Stack

- [Astro](https://astro.build) 7 (generación estática; el único JavaScript en cliente es el aviso de cookies y la carga del mapa)
- [vanilla-cookieconsent](https://github.com/orestbida/cookieconsent) 3.1.0 para el consentimiento de cookies (Google Maps), alojado con el sitio
- Tailwind CSS 4 mediante `@tailwindcss/vite`
- TypeScript en modo estricto
- `@astrojs/sitemap` para `sitemap-index.xml` (con alternativas `hreflang` por idioma)
- i18n nativo de Astro (`es` por defecto sin prefijo, `en` bajo `/en/`) con diccionarios tipados en `src/content/i18n/`
- `@astrojs/cloudflare` + Wrangler: despliegue en Cloudflare Workers (recursos estáticos + Worker para `/contacto/`)
- Nodemailer (SMTP) para el formulario de contacto; límite de envíos en memoria o, opcionalmente, en Workers KV

Requisitos: Node.js >= 22.12.

## Scripts

| Comando           | Acción                                                           |
| ----------------- | ---------------------------------------------------------------- |
| `npm install`     | Instala dependencias                                             |
| `npm run dev`     | Servidor de desarrollo en `localhost:4321`                       |
| `npm run build`   | Genera `dist/client` (estático) y `dist/server` (Worker)         |
| `npm run preview` | Compila y sirve el resultado con `wrangler dev` (runtime workerd) |
| `npm run deploy`  | Compila y publica en Cloudflare con `wrangler deploy`            |
| `npm run check`   | Diagnóstico de tipos y plantillas (astro check)                  |
| `npm test`        | Pruebas unitarias (Vitest)                                       |

## Desarrollo local

Copie `.dev.vars.example` a `.dev.vars` (no se versiona) y complete los valores SMTP; `npm run dev` y `npm run preview` los leen desde ahí. Sin `SMTP_HOST`, `SMTP_USER` y `SMTP_PASS` el formulario muestra un error genérico y el servidor registra "[contact] SMTP is not configured". Mientras el enlace KV esté comentado en `wrangler.jsonc`, el limitador usa memoria; si lo activa, Wrangler simula el espacio KV en local.

## Despliegue en Cloudflare

Requiere una cuenta de Cloudflare (el plan gratuito basta) e iniciar sesión una vez con `npx wrangler login`.

1. Opcional (recomendado): límite de envíos compartido en Workers KV. El despliegue funciona sin este paso; sin el enlace se usa un límite en memoria por instancia. Para activarlo, cree el espacio KV, pegue el `id` devuelto en el bloque comentado `kv_namespaces` de `wrangler.jsonc` y descoméntelo:

   ```sh
   npx wrangler kv namespace create CONTACT_RATE_LIMIT
   ```

2. Defina los secretos (cada comando pide el valor):

   ```sh
   npx wrangler secret put SMTP_HOST    # IONOS: smtp.ionos.es
   npx wrangler secret put SMTP_PORT    # 465
   npx wrangler secret put SMTP_SECURE  # true
   npx wrangler secret put SMTP_USER    # buzón completo
   npx wrangler secret put SMTP_PASS
   npx wrangler secret put CONTACT_TO   # opcional; por defecto cdi@cdimaquinarias.com
   ```

3. Publique con `npm run deploy`.
4. Dominio propio: añada `cdimaquinarias.com` como sitio en Cloudflare, sustituya en IONOS los servidores DNS por los que indique Cloudflare (conserve los registros MX y demás registros del correo de IONOS al importar la zona) y, cuando el dominio esté activo, asígnelo al Worker en *Workers & Pages → cdi-maquinarias → Settings → Domains & Routes → Custom domain* (`www.cdimaquinarias.com`, y redirija el dominio raíz a `www`).
5. Envíe una consulta real desde `/contacto/` y compruebe que llega.

Límites del plan gratuito relevantes: 10 ms de CPU por petición (la espera de red no cuenta) y 1.000 escrituras KV al día (cada envío aceptado usa hasta 2).

## Arquitectura

```text
src/
├── pages/              Rutas: español en la raíz, inglés en pages/en/ (solo renderizan una vista)
├── presentation/       Capa visual
│   ├── components/
│   │   ├── ui/         Átomos reutilizables sin datos de negocio (Button, Card, Icon…)
│   │   ├── layout/     Navbar, Footer, selector de idioma y aviso de cookies
│   │   └── sections/   Secciones de las páginas
│   ├── layouts/        BaseLayout con metadatos SEO, hreflang, Open Graph y JSON-LD
│   └── views/          Cuerpo de cada página, compartido por ambos idiomas (prop `locale`)
├── server/             Backend: nada de esto llega al navegador
│   ├── actions/        Acción de Astro del formulario (raíz de composición)
│   ├── core/           Casos de uso y puertos del formulario de contacto
│   ├── infrastructure/ Adaptadores (SMTP con Nodemailer, limitadores KV y en memoria)
│   └── config/         Límites y plazos del formulario de contacto
├── content/            Datos y textos
│   ├── data/           Datos del negocio sin idioma + selectores por idioma (getPage, getServices…)
│   └── i18n/           Idiomas: configuración, mapa de rutas y diccionarios es/en/de (todos los textos)
└── shared/             Transversal, sin dependencias de capa
    ├── lib/            Funciones puras (rutas, enlaces inline, clave de cliente, JSON-LD)
    ├── scripts/        Scripts de cliente (aviso de cookies)
    ├── styles/         global.css con tokens de Tailwind (@theme)
    └── types/          Tipos de dominio (Service, ContactInfo, SiteMeta, NavLink…)
```

Alias de importación (definidos en `tsconfig.json`; `vitest.config.ts` los replica para los tests): `@presentation/*`, `@server/*`, `@content/*` y `@shared/*`.

Los componentes no contienen datos del negocio ni textos: todo se recibe por `Props` o se lee de `src/content/data` y `src/content/i18n` según el idioma.

## Dónde editar los datos del negocio

- `src/content/data/siteInfo.ts`: nombre, teléfonos, email, dirección, CIF, horas de apertura, URL. Sin textos traducibles.
- `src/content/data/services.ts`: qué servicios hay, su ancla e icono (los textos están en `src/content/i18n/<idioma>/services.ts`).
- `src/content/data/navigation.ts`: qué páginas aparecen en el menú y en el pie.
- `src/content/data/cookieConsent.ts`: categorías y cookie del aviso de cookies. Si cambia la política de cookies de forma relevante, incremente `CONSENT_REVISION` para volver a pedir el consentimiento.

## Idiomas y textos

Todos los textos visibles (menús, botones, etiquetas `aria`, títulos y descripciones SEO, errores del formulario, aviso de cookies, textos legales y JSON-LD) viven en `src/content/i18n/`. El español es la referencia: el inglés tiene que tener exactamente las mismas claves.

| Archivo | Qué contiene |
|---------|--------------|
| `src/content/i18n/config.ts` | Idiomas (`es`, `en`), idioma por defecto y metadatos (`lang`, `og:locale`, `hreflang`, nombre) |
| `src/content/i18n/routes.ts` | URL de cada página en cada idioma (`/quienes-somos/` ↔ `/en/about-us/`) |
| `src/content/i18n/es/*.ts`, `src/content/i18n/en/*.ts` | Diccionarios por área: `common`, `home`, `about`, `services`, `products`, `rental`, `contact`, `legal`, `cookies`, `seo` |
| `src/content/i18n/index.ts` | `getDictionary`, `localizedPath`, `alternatesFor`, `getLocaleFromUrl`, `pageIdFromPath` |

### Editar un texto

1. Busque el texto en `src/content/i18n/es/` y cámbielo.
2. Cambie la misma clave en `src/content/i18n/en/`.
3. Ejecute `npm run check` y `npm test` (comprueban que ambos idiomas tienen las mismas claves, que no hay textos vacíos y que títulos y descripciones cumplen las longitudes).

### Añadir un texto nuevo

1. Añada la clave en el archivo del área en `src/content/i18n/es/`. Si incluye un dato del negocio (teléfono, email…), use una plantilla con el valor de `siteInfo` en lugar de copiarlo.
2. Añada la misma clave en `src/content/i18n/en/`: `astro check` falla si falta.
3. En el componente, lea el texto con `getDictionary(locale)`. Los átomos de `components/ui` reciben el texto por `Props`.

### Añadir un idioma

1. Añada el código en `locales` y sus metadatos en `src/content/i18n/config.ts`, y en `i18n.locales` de `astro.config.mjs`.
2. Añada la ruta de cada página en `src/content/i18n/routes.ts`.
3. Cree `src/content/i18n/<idioma>/` copiando `en/` (tipado como `Dictionary`) y regístrelo en `src/content/i18n/index.ts` y en `translations` de `src/shared/scripts/cookieConsent.ts`.
4. Cree `src/pages/<idioma>/` con una página por ruta que renderice la vista correspondiente (`<AboutPage locale="…" />`); la de contacto lleva `prerender = false`, como `src/pages/en/contact.astro`.

### Reglas

- Ningún texto fijo en `src/presentation/components`, `src/presentation/views`, `src/presentation/layouts` ni `src/pages`: lo comprueba `tests/i18n/noHardcodedCopy.test.ts` (permite solo `STILL` y `CDI`).
- Los datos del negocio solo están en `src/content/data/siteInfo.ts`; los diccionarios los interpolan.
- Los `slug` de renting (`?equipo=`) y las anclas de servicios son iguales en todos los idiomas.
- El correo que recibe el negocio siempre está en español e indica el idioma del visitante.
- Los textos legales en inglés son una traducción de cortesía (prevalece el español) y deben revisarlos la asesora.

## Recursos pendientes

- `public/og-image.jpg` (1200×630, JPG/PNG): imagen para redes sociales. Está referenciada en `src/content/data/siteInfo.ts` pero aún no existe; los rastreadores no admiten SVG como imagen Open Graph.
- Fotografías reales de maquinaria, instalaciones y equipo técnico.
- Logotipo oficial de CDI Maquinarias (actualmente se usa un logotipo tipográfico).
