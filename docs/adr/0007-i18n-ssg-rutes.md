# 0007 — i18n SSG: Estrategia de rutas

- **Fecha:** 2026-09-10
- **Estado:** Implementado (2026-09-11)
- **Estado previo:** Implementado (temporal)

## Contexto

Con Astro 7 en modo SSG y `prefixDefaultLocale: false`, las rutas del idioma por defecto (CAT) se generan normalmente (`/projects`, `/contact`), pero las rutas del idioma secundario (ES) NO se generan automáticamente. No hay middleware en runtime para manejarlas.

## Decisión

Duplicar temporalmente las páginas principales en `src/pages/es/` (index.astro, contact.astro) para generar las rutas ES (`/es/projects`, `/es/contact`). El LanguagePicker detecta el idioma actual y genera el enlace correcto añadiendo o quitando el prefijo `/es/`.

## Limitaciones

- **Duplicación de código:** Cada página nueva en CA requiere una copia en ES.
- **No escala:** Con muchas páginas, mantener dos copias es insostenible.
- **Rutas sin traducir:** `/es/projects` en vez de `/es/proyectos` (el nombre del directori es en inglés).

## Implementación completada (2026-09-11)

El "Pla futur" quedó implementado: se migró a `src/pages/[...slug].astro` + `getStaticPaths` para generar todas las rutas en ambos idiomas desde `routes.ts`. El router unificado gestiona también las rutas dinámicas de proyectos (`/projectes/...` en CA y `/es/proyectos/...` en ES), eliminando la duplicación de páginas y el conflicto con `src/pages/es/projects/`. La duplicación temporal descrita en este ADR ya no existe; el plan inicial y el problema de `getStaticPaths` que aquí se documentaban quedaron superados.

## Alternatives

- **SSR a Cloudflare Pages:** Funciona perfectament, però trenca ADR-003 (estic del projecte és estátic, més ràpid, més barat).
- **Middleware custom:** Redirigir les rutes ES manualment. Més control, però més manteniment.
