# Estado del proyecto — Web CDI Maquinarias

> Actualizado el 13 de octubre de 2026 · Rama `feat/cdi-website-rebuild` (29 commits, sin repositorio remoto)

La nueva web está **funcionalmente completa en local**: tiene 9 páginas con las mismas URL que la web original, las mismas 9 páginas en inglés bajo `/en/`, formulario de contacto con envío por SMTP, límite de envíos, aviso de cookies y despliegue preparado para Cloudflare Workers. **Todavía no puede publicarse**: faltan la revisión legal (también de la traducción inglesa), la configuración de Cloudflare, una prueba real de envío de correo y las imágenes.

## Resumen rápido

| Área | Estado |
|------|--------|
| Páginas y contenido | ✅ Listo |
| SEO técnico y local | ✅ Listo (falta la imagen para redes sociales) |
| Formulario de contacto | ✅ Listo en local · ⚠️ falta probarlo con el SMTP real de IONOS |
| Límite de envíos y tiempo máximo | ✅ Listo |
| Aviso de cookies | ✅ Listo · ⚠️ 1 fallo menor abierto (F7) |
| Despliegue en Cloudflare | ✅ Configurado · ⏳ falta la cuenta, los secretos y el DNS |
| Textos legales | ⚠️ Adaptados; **pendientes de revisión por la asesora** |
| Imágenes, logo y foto para redes | ❌ No existen todavía (ver [Próximas mejoras](#próximas-mejoras)) |
| Cambio de idioma | ✅ Español e inglés (`/en/`) · ⚠️ falta revisar la traducción inglesa (textos legales por la asesora y el resto por un nativo) |
| Revisión SEO completa | ⏳ Hay base técnica; falta auditarla con herramientas reales |

## Qué hay que hacer para publicar

1. **Revisión legal.** La asesora revisa las adaptaciones A1 a A8 de los textos legales y su traducción al inglés (ver [Textos legales](#textos-legales-pendientes-de-revisión)).
2. **Imágenes.** Hay que aportar el logo, las fotos y `public/og-image.jpg` (1200×630), que es la imagen que se muestra al compartir la web en redes y buscadores. El plan está en [Próximas mejoras](#próximas-mejoras).
3. **Cuenta de Cloudflare.** Hay que iniciar sesión con `npx wrangler login`. Crear el namespace de KV es opcional, pero recomendable.
4. **Secretos.** Con `npx wrangler secret put <NOMBRE>` se cargan `SMTP_HOST` (`smtp.ionos.es`), `SMTP_PORT` (`465`), `SMTP_SECURE` (`true`), `SMTP_USER`, `SMTP_PASS` y, si hace falta, `CONTACT_TO`.
5. **Desplegar.** Ejecutar `npm run deploy`.
6. **DNS.** Hay que mover el DNS de `cdimaquinarias.com` de IONOS a Cloudflare, **conservando los registros MX del correo de IONOS**. Después, conectar `www` como dominio del Worker y redirigir el dominio sin `www` hacia `www`.
7. **Prueba real.** Enviar un mensaje desde `/contacto/` y comprobar que llega a `cdi@cdimaquinarias.com`.

## Qué está hecho

| Bloque | Contenido |
|--------|-----------|
| Estructura | Inicio, Quiénes somos, Servicios, Productos, Renting, Contacto y 3 páginas legales, con las mismas URL que la web actual |
| Idiomas | Español sin prefijo (URL de siempre) e inglés en `/en/` con URL traducidas (`/en/about-us/`, `/en/rental/`…). Selector de idioma en el menú que lleva a la misma página en el otro idioma, sin JavaScript. Todos los textos están en `src/i18n/` (ver [README](../README.md#idiomas-y-textos)) |
| Arquitectura | Los datos del negocio solo viven en `src/data/`. Los componentes son reutilizables. El formulario sigue una arquitectura hexagonal: casos de uso en `src/core/` y adaptadores en `src/infrastructure/` |
| SEO | Un solo `<h1>` por página, títulos de menos de 60 caracteres y descripciones de menos de 155 (todos únicos en los dos idiomas), JSON-LD `LocalBusiness` + `BreadcrumbList` + `WebPage` traducido, `hreflang` es/en/x-default, sitemap con las 18 URL y sus alternativas, y `robots.txt` |
| Formulario | Astro Action con validación Zod. Funciona sin JavaScript, tiene un campo trampa contra bots y conserva los datos escritos si hay un error |
| Antiabuso | Máximo 3 envíos cada 10 min por visitante y 30 por hora en total. La IP solo se guarda como hash SHA-256. El límite se lleva en memoria o, si se configura, en Workers KV, y si KV falla se vuelve a la memoria |
| Tiempo máximo | El envío SMTP se corta a los 8 s y se muestra un mensaje que no invita a reenviar, para evitar duplicados |
| Cookies | `vanilla-cookieconsent` con dos categorías: necesarias y Google Maps. Los botones Aceptar y Rechazar tienen el mismo peso, como exige la guía de la AEPD de 2023. El mapa solo se carga con consentimiento |
| Calidad | 149 tests (Vitest), incluido uno que impide textos fijos en los componentes, `astro check` sin errores ni avisos, y sin scroll horizontal a 375 px en ninguna página |

## Errores encontrados y corregidos

| # | Error | Impacto | Corrección |
|---|-------|---------|------------|
| 1 | La cabecera desbordaba 22 px en móvil: la clase base `inline-flex` del botón anulaba la clase `hidden` | Scroll horizontal en todos los móviles | `399b802` |
| 2 | El mismo problema en la etiqueta "Distribuidor oficial STILL" | Riesgo de desborde | `865becb` |
| 3 | El formulario no tenía límite de envíos | Un script podía saturar el buzón y hacer que IONOS bloqueara la cuenta SMTP | `a8dd1e7` |
| 4 | El envío SMTP no tenía tiempo máximo global (podía tardar más de 35 s) | Error 504 de la plataforma, pérdida de lo escrito y posibles mensajes duplicados | `8fb0173` |
| 5 | El campo trampa se comprobaba después de la configuración SMTP | Los bots generaban errores y ruido en los logs | `a8dd1e7` |
| 6 | `wrangler.jsonc` publicaba la carpeta `./dist` completa | Riesgo de servir el código del servidor como archivo público | `7b6e645` |
| 7 | El identificador de KV de ejemplo (todo ceros) estaba activo | `wrangler deploy` habría fallado | `7b6e645` |
| 8 | Las llamadas a KV no tenían tiempo máximo | Un KV lento bloqueaba el formulario | `7b6e645` |
| 9 | Pie de página con doble punto: "S.L.." | Error visible | `024f785` |
| 10 | La primera versión omitía "oficial" en "Distribuidor STILL" | Se perdía una afirmación que sí está en la web original | `2bcfc4e` |
| 11 | Textos legales originales con errores: plantilla rota "sede de (España)", línea vacía del Registro Mercantil y 6 enlaces "haga clic aquí" que no funcionan | Textos legales incorrectos | `1d90931` (A1, A2, A5) |

## Errores y riesgos abiertos

### Antes de publicar

| # | Problema | Riesgo | Propuesta |
|---|----------|--------|-----------|
| F7 | "Cargar mapa" se puede pulsar antes de que termine de iniciarse el gestor de cookies | Al hacer clic muy rápido, puede que no pase nada o que no se guarde el consentimiento | Esperar a que el gestor arranque y capturar el error (pocas líneas) |
| C1 | El botón principal usa blanco sobre `#EA580C` (contraste 3,56:1) | No cumple WCAG AA para texto de 16–18 px | Usar `#C2410C` como fondo (5,18:1); el aviso de cookies ya lo usa |
| L1 | Los textos legales no están revisados | Riesgo legal (RGPD y LSSI) | Revisión por la asesora (ver abajo) |
| L2 | Los textos legales en inglés son una traducción propia, no revisada | Que la traducción diga algo distinto del original | Revisión por la asesora; mientras tanto, el aviso de cortesía indica que prevalece el español |
| T1 | Toda la web en inglés es una traducción propia (inglés británico) | Errores de tono o de terminología técnica | Revisión por un hablante nativo, idealmente con conocimientos del sector |
| S1 | El envío por SMTP con TLS en el puerto 465 no se ha probado | Que el formulario falle en producción | Envío real después del despliegue |

### Pueden esperar

| # | Problema | Propuesta |
|---|----------|-----------|
| F3 | Los límites de validación (nombre 2–100, mensaje 10–5000) están repetidos en el esquema, el HTML y los textos | Centralizarlos en una constante |
| F4 | Algunas frases legales de `src/data/legal.ts` solo terminan bien porque el nombre legal acaba en "." | Poner la puntuación en la plantilla |
| F5 | `contacto.astro` vuelve a leer el formulario dentro de un `catch` vacío (línea 41) | Registrar el error y extraer una función pura con test |
| F8 | El módulo de consentimiento de cookies no tiene tests | Tests con Vitest simulando la librería |
| F9 | Si guardar en KV tarda demasiado, un envío puede contarse dos veces | Documentarlo o descontarlo en la memoria |
| F10 | Con KV lento, el límite puede sumar unos 3 s antes del envío | Un presupuesto de tiempo común para KV y SMTP |
| R1 | El texto del horario para el JSON-LD da por hecho que los días son consecutivos | Válido para Lun–Vie; revisar si cambia el horario |
| P1 | El contador en memoria solo borra los hashes caducados cuando llega un envío nuevo | Puede incumplir el "se elimina en 1 hora" de la política de privacidad; usar KV o barrido periódico |

### Dependencias y herramientas

| # | Situación | Impacto |
|---|-----------|---------|
| D1 | `npm audit`: 5 vulnerabilidades altas que vienen de `sharp` (CVE-2026-96889, librsvg) a través de `miniflare` y `wrangler` | Afectan a las herramientas locales de desarrollo y despliegue, no al Worker publicado. Actualizar cuando haya versión corregida |
| D2 | `@astrojs/check` 0.9.10 no admite TypeScript 7 | Se usa TypeScript 6.0.3 |
| D3 | `astro check` necesita instalar `@emnapi/runtime` aparte (fallo de empaquetado de `@astrojs/astro2tsx`) | Ya está como dependencia de desarrollo |
| D4 | `overrides` fija `@cloudflare/vite-plugin` en 1.62.3 para no usar versiones publicadas el mismo día | Revisarlo en la próxima actualización |
| D5 | No hay `.gitattributes`, así que Git avisa de la conversión LF/CRLF en cada commit | Solo es molesto; conviene añadir `* text=auto eol=lf` |

## Próximas mejoras

### 1. Imágenes del negocio

La web actual tiene unas 17 imágenes: 1 en Inicio, 2 en Quiénes somos, 4 en Servicios, 3 en Productos y 7 en Renting. La nueva todavía no tiene ninguna.

| Paso | Detalle |
|------|---------|
| Conseguir los originales | Pedir al negocio las fotos en máxima calidad (las de la web actual vienen recortadas y comprimidas) y el logo en SVG o PNG con fondo transparente |
| Derechos de uso | Las fotos de producto y los logotipos de STILL pueden tener restricciones de marca: confirmar con STILL qué material puede usar un distribuidor |
| Optimizar | Usar `<Image>`/`<Picture>` de `astro:assets` con AVIF/WebP, `width`/`height` fijos y `loading="lazy"` fuera de la primera pantalla. Hay que cambiar `imageService: "passthrough"` a `"compile"` en `astro.config.mjs`, para optimizar en build sin el binding de Cloudflare Images |
| Imagen para redes | Crear `public/og-image.jpg` (1200×630). Ya la usan Open Graph, Twitter y el JSON-LD |
| Accesibilidad | Un texto `alt` descriptivo por imagen, guardado en `src/data/` junto al contenido |
| Peso | Objetivo orientativo: menos de 200 KB por imagen grande |

### 2. Cambio de idioma ✅ hecho

Implementado como estaba previsto: español sin prefijo, inglés en `/en/` con URL traducidas, selector en el menú, `hreflang` + `x-default`, `<html lang>`, sitemap con alternativas, JSON-LD, aviso de cookies y errores del formulario traducidos. Los textos legales en inglés llevan el aviso "This is a courtesy translation. In case of discrepancy, the Spanish version prevails." El correo que recibe el negocio sigue en español e indica el idioma del visitante.

### 3. Revisión SEO

| Área | Qué revisar |
|------|-------------|
| Rendimiento | Lighthouse / PageSpeed Insights en móvil y escritorio, Core Web Vitals (LCP, CLS, INP), sobre todo después de añadir las imágenes |
| Indexación | Google Search Console: verificar el dominio, enviar `sitemap-index.xml` y revisar la cobertura después del cambio de hosting |
| Migración | Las URL coinciden con la web actual, pero hay que comprobar las variantes sin barra final, sin `www` y `http`, que deben redirigir con 301 a la URL canónica. También buscar URL antiguas indexadas que no existan en la nueva web |
| Datos estructurados | Validar `LocalBusiness`, `BreadcrumbList` y `WebPage` con la prueba de resultados enriquecidos de Google, en los dos idiomas |
| Multilingüe | En Search Console, revisar que Google reconoce los `hreflang` (sin errores de "falta enlace de retorno") y que indexa las páginas `/en/` |
| SEO local | Que el nombre, la dirección, el teléfono y el horario coincidan con Google Business Profile y con los directorios; enlazar la ficha de Google |
| Contenido | Revisar palabras clave por página (carretillas, alquiler, reparación, Las Palmas, Gran Canaria), títulos, descripciones y enlaces internos |
| Imágenes | Nombres de archivo y `alt` descriptivos, `og-image` presente |
| Seguimiento | Si se añade analítica, Cloudflare Web Analytics no usa cookies y no obliga a ampliar el aviso de cookies |

## Textos legales pendientes de revisión

| Ref. | Cambio respecto a la web original |
|------|-----------------------------------|
| A1 | Aviso legal §2: se quitó la línea vacía del Registro Mercantil (**falta ese dato**) |
| A2 | Aviso legal §5: se corrigió la plantilla rota de juzgados ("más cercanos a su sede") |
| A3 | Privacidad §2: nueva finalidad, atender las consultas del formulario |
| A4 | Privacidad §5: Cloudflare, Inc. como hosting y el proveedor SMTP como encargados; **transferencia fuera del EEE** |
| A5 | Privacidad §6: los derechos se ejercen escribiendo a administracion2@cdimaquinarias.com |
| A6 | Cookies: se eliminó la analítica de IONOS, porque la nueva web no tiene |
| A7 | Privacidad §4: hash de la IP para el límite de envíos. **Dice "anonimizado", pero según el RGPD es un dato seudonimizado** |
| A8 | Cookies: tabla con `cc_cookie`, `__cf_bm` (si Cloudflare lo activa) y las cookies de Google Maps; se aclara que el formulario no usa cookies |

La **traducción inglesa** de los tres textos (`src/i18n/en/legal.ts`) también debe revisarla la asesora (L2).

También falta definir el **plazo de conservación** de los mensajes del formulario. Las guías para navegadores de la política de cookies son las de la web original y están anticuadas (mencionan Internet Explorer).

## Qué no se ha verificado

- El envío real por SMTP con IONOS (puerto 465).
- Lighthouse (rendimiento y accesibilidad) y la vista de escritorio del aviso de cookies.
- La animación de cierre del aviso de cookies.
- La traducción inglesa por un hablante nativo y por la asesora (textos legales).
- Cómo interpreta Google los `hreflang` (solo se puede ver en Search Console tras publicar).

## Revisiones de código (Gentle AI)

| Fase | Commits | Resultado |
|------|---------|-----------|
| 1 · Web de una página | `fd4b2b8`..`45e42eb` | Aprobada |
| 2 · Varias páginas y formulario | `45e42eb`..`a801fa2` | Aprobada (4 revisores) |
| 3 · Límite de envíos y tiempo máximo | `fa080b0`..`8fb0173` | **Omitida por decisión del usuario** |
| 4 · Migración a Cloudflare | `8941df4`..`afe36c7` | Aprobada |
| 5 · Cookies y correcciones | `903fb84`..`024f785` | Aprobada |

## Incidencias durante el desarrollo

- Un agente ejecutó por error comandos de `wrangler` (`kv namespace create`, `secret put`) por un fallo de comillas en la terminal. **Todos fallaron por falta de credenciales y no se modificó nada en Cloudflare.**
- Durante una limpieza de procesos se pudo cerrar el servidor de desarrollo del puerto 4321. Se volvió a arrancar y funciona.

## Más detalle

- Evidencias por tarea, commits y decisiones: [`odd/tasks/cdi-website-rebuild.md`](../odd/tasks/cdi-website-rebuild.md)
- Instalación, scripts y despliegue: [`README.md`](../README.md)
