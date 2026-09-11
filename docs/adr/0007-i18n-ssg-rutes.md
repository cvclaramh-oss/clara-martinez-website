# 0007 — i18n SSG: Estrategia de rutas

- **Fecha:** 2026-09-10
- **Estado:** Implementado (temporal)

## Contexto

Con Astro 7 en modo SSG y `prefixDefaultLocale: false`, las rutas del idioma por defecto (CAT) se generan normalmente (`/projects`, `/contact`), pero las rutas del idioma secundario (ES) NO se generan automáticamente. No hay middleware en runtime para manejarlas.

## Decisión

Duplicar temporalmente las páginas principales en `src/pages/es/` (index.astro, contact.astro) para generar las rutas ES (`/es/projects`, `/es/contact`). El LanguagePicker detecta el idioma actual y genera el enlace correcto añadiendo o quitando el prefijo `/es/`.

## Limitaciones

- **Duplicación de código:** Cada página nueva en CA requiere una copia en ES.
- **No escala:** Con muchas páginas, mantener dos copias es insostenible.
- **Rutas sin traducir:** `/es/projects` en vez de `/es/proyectos` (el nombre del directori es en inglés).

## Pla futur

Migrar a `[...slug].astro` + `getStaticPaths` per generar les rutes ES dinàmicament. Cada pàgina exportaria les seves rutes en els dos idiomes sense duplicar fitxers.

### Com funcionaria

```astro
---
export function getStaticPaths() {
  return [
    { params: { locale: undefined } }, // CA: /projects
    { params: { locale: 'es' } },      // ES: /es/projects
  ]
}

const locale = Astro.params.locale || getLangFromUrl(Astro.url)
---
```

### Pendente

Investigar per què l'intent anterior de getStaticPaths no va generar les rutes ES. Possible causa: configuració d'i18n a astro.config.mjs o estructura de params.

## Alternatives

- **SSR a Cloudflare Pages:** Funciona perfectament, però trenca ADR-003 (estic del projecte és estátic, més ràpid, més barat).
- **Middleware custom:** Redirigir les rutes ES manualment. Més control, però més manteniment.
