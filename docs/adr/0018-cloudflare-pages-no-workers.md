# 0018 — Despliegue en Cloudflare Pages, no Workers

- **Fecha:** 2026-09-22
- **Estado:** Vigente

## Contexto

Sitio estático (Astro, sin backend propio ni lógica de servidor — ver `AGENTS.md`, sección Backend y tests). Hacía falta un hosting con despliegue automático desde Git, entornos de preview por rama y variables de entorno separadas por entorno (producción/preview). La documentación oficial de Astro para Cloudflare muestra ejemplos centrados en Workers; en el dashboard actual, Pages aparece marcado como «Legacy», dentro de Compute → Workers and Pages, no como sección propia del menú.

## Decisión

Cloudflare Pages (Git-integrado) para el hosting, tal como ya recogía el ADR 0003. Producción = rama `main`, con el despliegue automático desactivado (deploy manual hasta el lanzamiento real); `dev` se despliega automáticamente como preview en cada push. Variables `PUBLIC_SANITY_*` configuradas por entorno (Preview con el dataset `testing`; Production sin variables por ahora). Proceso completo de configuración en `docs/private/daily.md`, entradas del 2026-09-21 y 2026-09-22.

## Alternativas consideradas

- **Workers (con activos estáticos):** es el camino que Cloudflare promueve hoy para proyectos nuevos, y Pages aparece marcado como «Legacy» en el dashboard. Pero Workers está pensado para proyectos con lógica de servidor (funciones, *bindings*), que este sitio no tiene. Adoptarlo añadiría conceptos (`wrangler.toml`, *bindings*) sin necesidad real.
- **Otro hosting estático (Netlify, Vercel):** no evaluado a fondo — Cloudflare ya estaba decidido en el ADR 0003 junto con Sanity y Web3Forms, sin motivo para revisarlo ahora.

## Consecuencias

- El dashboard aloja Pages bajo «Legacy Pages», lo que sugiere que Cloudflare podría ir retirando Pages a medio plazo en favor de Workers con activos estáticos — revisar si Cloudflare anuncia un cambio de rumbo antes del lanzamiento.
- El primer despliegue de un proyecto de Pages siempre construye la rama de producción antes de poder configurar el control de rama (Branch control) — a tener en cuenta en futuros proyectos.
- Proteger con Cloudflare Access el dominio de producción `*.pages.dev` (no solo los previews) requiere un paso aparte, que la propia documentación de Cloudflare lista como «known issue», y necesita el plan de Zero Trust activo en la cuenta — pendiente en este proyecto (ver `daily.md`).
