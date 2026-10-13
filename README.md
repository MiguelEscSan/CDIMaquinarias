# CDI Maquinarias — Sitio web

Sitio corporativo de CDI Maquinarias (distribuidores de STILL en Las Palmas de Gran Canaria). Páginas estáticas más el formulario de `/contacto/`, que se renderiza bajo demanda en Cloudflare Workers.

## Stack

- [Astro](https://astro.build) 7 (generación estática, sin JavaScript en cliente)
- Tailwind CSS 4 mediante `@tailwindcss/vite`
- TypeScript en modo estricto
- `@astrojs/sitemap` para `sitemap-index.xml`
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
├── types/          Tipos de dominio (Service, ContactInfo, SiteMeta, NavLink…)
├── data/           Única fuente de verdad de los datos del negocio
├── lib/            Funciones puras (p. ej. JSON-LD LocalBusiness)
├── core/           Casos de uso y puertos del formulario de contacto
├── infrastructure/ Adaptadores (SMTP con Nodemailer, limitadores KV y en memoria)
├── actions/        Acción de Astro del formulario (raíz de composición)
├── components/
│   ├── ui/         Átomos reutilizables sin datos de negocio (Button, Card, Icon…)
│   ├── layout/     Navbar y Footer
│   └── sections/   Secciones de las páginas
├── layouts/        BaseLayout con metadatos SEO, Open Graph y JSON-LD
├── pages/          Rutas (las páginas solo orquestan secciones)
└── styles/         global.css con tokens de Tailwind (@theme)
```

Los componentes no contienen datos del negocio: todo se recibe por `Props` o se importa desde `src/data`.

## Dónde editar los datos del negocio

- `src/data/siteInfo.ts`: nombre, metadatos SEO, teléfonos, email, dirección, horario.
- `src/data/services.ts`: catálogo de servicios.
- `src/data/navigation.ts`: enlaces del menú y CTA principal.

## Recursos pendientes

- `public/og-image.jpg` (1200×630, JPG/PNG): imagen para redes sociales. Está referenciada en `src/data/siteInfo.ts` pero aún no existe; los rastreadores no admiten SVG como imagen Open Graph.
- Fotografías reales de maquinaria, instalaciones y equipo técnico.
- Logotipo oficial de CDI Maquinarias (actualmente se usa un logotipo tipográfico).
