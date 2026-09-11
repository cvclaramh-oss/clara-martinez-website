# 0004 — i18n desde el inicio

- **Fecha:** 2026-09-09
- **Estado:** Vigente

## Contexto

Sitio principal en catalán, pero preparado para español futuro.

## Decisión

Configurar estructura i18n (CAT/ES) desde el inicio, con fallback automático a CAT.

## Alternativas

- **Solo catalán:** Más simple, pero habría que reestructurar todo cuando se añada español.
- **i18n con librería externa (astro-i18n-aut):** Más features, pero añade dependencia y complejidad para un sitio pequeño.
