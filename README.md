# CDI Maquinarias — Sitio web

Sitio corporativo estático de CDI Maquinarias (distribuidores de STILL en Las Palmas de Gran Canaria).

## Stack

- [Astro](https://astro.build) 7 (generación estática, sin JavaScript en cliente)
- Tailwind CSS 4 mediante `@tailwindcss/vite`
- TypeScript en modo estricto
- `@astrojs/sitemap` para `sitemap-index.xml`

Requisitos: Node.js >= 22.12.

## Scripts

| Comando           | Acción                                          |
| ----------------- | ----------------------------------------------- |
| `npm install`     | Instala dependencias                            |
| `npm run dev`     | Servidor de desarrollo en `localhost:4321`      |
| `npm run build`   | Genera el sitio estático en `dist/`             |
| `npm run preview` | Sirve localmente el resultado de `dist/`        |
| `npm run check`   | Diagnóstico de tipos y plantillas (astro check) |

## Arquitectura

```text
src/
├── types/         Tipos de dominio (Service, ContactInfo, SiteMeta, NavLink…)
├── data/          Única fuente de verdad de los datos del negocio
├── lib/           Funciones puras (p. ej. JSON-LD LocalBusiness)
├── components/
│   ├── ui/        Átomos reutilizables sin datos de negocio (Button, Card, Icon…)
│   ├── layout/    Navbar y Footer
│   └── sections/  Secciones de la página de inicio
├── layouts/       BaseLayout con metadatos SEO, Open Graph y JSON-LD
├── pages/         Rutas (index.astro solo orquesta secciones)
└── styles/        global.css con tokens de Tailwind (@theme)
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
