# Configurar Turnstile en el formulario de contacto

El código ya está preparado. Estos son los pasos que tiene que hacer usted, en orden.

## 1. Crear el widget en Cloudflare

1. Entre en el panel de Cloudflare → **Turnstile** → **Add widget**.
2. **Widget name:** `CDI Contacto`.
3. **Hostnames:** `cdimaquinarias.com` y `www.cdimaquinarias.com`.
4. **Widget mode:** `Managed`.
5. Guarde y copie las dos claves:
   - **Site Key** (pública).
   - **Secret Key** (privada, no la comparta ni la suba a git).

## 2. Guardar la clave secreta en el Worker

```bash
npx wrangler secret put TURNSTILE_SECRET_KEY
```

Pegue la **Secret Key** cuando lo pida.

## 3. Guardar la clave pública para el build

Cree un archivo `.env` en la raíz del proyecto con:

```bash
TURNSTILE_SITE_KEY=<su Site Key>
```

`.env` está en `.gitignore`, así que no se sube al repositorio. `npm run deploy` compila en su equipo y Astro lee ese archivo durante el build. Si algún día despliega desde otro sitio (por ejemplo, un CI), defina la misma variable allí.

## 4. Desplegar

```bash
npm run deploy
```

Hay que volver a desplegar cada vez que cambie `TURNSTILE_SITE_KEY`, porque la clave pública se incluye en el build.

## 5. Probar

1. Abra `https://www.cdimaquinarias.com/contacto/`. Debe aparecer el widget de Turnstile encima del botón **Enviar**.
2. Envíe un mensaje de prueba. Debe llegar a `cdi@cdimaquinarias.com`.
3. Si algo falla, abra los logs en tiempo real mientras envía:

   ```bash
   npx wrangler tail
   ```

   | Mensaje en el log | Causa probable |
   |-------------------|----------------|
   | `Turnstile is not configured` | Falta `TURNSTILE_SECRET_KEY` en el Worker (paso 2). |
   | `human check failed` | El widget no cargó o el token no es válido. Revise el paso 1 (hostnames) y el paso 3 (Site Key). |

## Notas

- **Local:** `npm run dev` y `npm run preview` usan las claves de prueba de `.dev.vars.example`, que siempre pasan. Las claves reales no funcionan en `localhost` porque el widget solo acepta los hostnames del paso 1.
- **Sin JavaScript:** el widget necesita JavaScript. Quien lo tenga desactivado no podrá enviar el formulario y verá el mensaje de verificación fallida.
