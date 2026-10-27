# CDI — cambios pedidos por el cliente

## Objetivo
Aplicar en la web las indicaciones del cliente sobre marcas, servicios, contacto y redes sociales.

## Alcance
Textos en `src/content/i18n/{es,en,de}.ts`, datos de contacto en `src/content/data/siteInfo.ts`, bloque de contacto en `MapSection.astro`, pie de página en `Footer.astro`.

## Criterios de aceptación
- [x] Venta y renting: sin lenguaje multimarca; se dice que trabajan con STILL.
- [x] Reparaciones: se dice de forma explícita que son multimarca.
- [x] Climatización: solo para maquinaria industrial (sin oficinas ni locales comerciales).
- [x] Renting y leasing: se presentan como servicios a través de STILL.
- [x] Postventa: el texto de venta del servicio postventa es más claro y fuerte.
- [x] Contacto: además de la dirección, se muestran el correo y el teléfono.
- [x] Contacto: el título pasa de "Envíenos un mensaje" a "Contacta con nosotros" (es, en, de).
- [x] Pie de página: enlaces a Instagram y Facebook.

## Tareas
- [x] T1 · Textos de marca (venta, renting, reparación) en es/en/de.
- [x] T2 · Climatización solo industrial en es/en/de.
- [x] T3 · Renting y leasing a través de STILL en es/en/de.
- [x] T4 · Postventa en es/en/de.
- [x] T5 · Correo y teléfono en la página de contacto, con etiquetas traducidas.
- [x] T6 · Título del formulario "Contacta con nosotros" en es/en/de.
- [x] T7 · Redes sociales en el pie (`socialLinks` en `siteInfo.ts`: Instagram y Facebook).

## Verificación
- `npm test` (149 tests), `npm run check` (0 errores) y `npm run build`: en verde.
- Pendiente: revisión visual y traducción por hablante nativo (los textos nuevos son propuestos).

## Progreso
- Hecho: T1 a T7.
- Pendiente: revisión visual y traducción por hablante nativo.
