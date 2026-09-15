# 0006 — i18n CAT/ES — Implementación

- **Fecha:** 2026-09-09
- **Estado:** Implementado (parcialmente)

## Contexto

El sitio necesita soporte para catalán (principal) y español. Los textos estaban mezclados (catalán, castellano, inglés del starter). Había que decidir cómo implementar el i18n en Astro 7 con SSG.

## Decisión

- **idioma por defecto:** catalán, sin prefijo de URL (`/`)
- **idioma secundario:** español, con prefijo `/es/`
- **Sin cookie de persistencia:** cada visita empieza en catalán salvo que la URL indique lo contrario
- **Textos en JSONs:** `src/i18n/ca.json` y `src/i18n/es.json` con todas las claves traducidas
- **Helper:** `getLangFromUrl()` detecta idioma desde URL, `useTranslations()` devuelve función `t()`
- **LanguagePicker:** componente que detecta idioma actual y genera el enlace al otro idioma añadiendo/quita el prefijo `/es/`

## Alternativas

- **SSR a Cloudflare Pages:** El middleware de i18n de Astro funciona automáticamente. Pero rompe ADR-003 (el sitio es estático).
- **getStaticPaths:** Generar rutes ES dinámicament. Intentado però no va funcionar correctament (pendent d'investigació).
- **Librería externa (astro-i18n-aut):** Más features, pero añade dependencia innecesaria para un sitio pequeño.

## Limitaciones

- Las rutas ES (`/es/projects`, `/es/contact`) repiten el nombre en inglés. Las rutas traduïdes (`/es/proyectos`) requereixen fitxers duplicats o getStaticPaths.
- El directori `src/pages/es/` conté fitxers duplicats (index.astro, contact.astro). No escala amb moltes pàgines.

## Pla futur

Migrar a `[...slug].astro` + `getStaticPaths` per generar les rutes ES dinàmicament sense duplicar fitxers. Pendente de investigar por qué no va funcionar l'intent anterior.
