# 0002 — Paleta Radical Clarity

- **Fecha:** 2026-09-09
- **Estado:** Vigente

## Contexto

Sistema de diseño Minimalist-Brutalist Contemporary con monochrome + rosa carne. Se hizo análisis WCAG completo antes de implementar.

## Decisión

Usar paleta de DESIGN.md (Radical Clarity). Tokens problemáticos (`outline-variant`, `outline`, `#FAFAFA/#F5CCD4`) solo para bordes decorativos, nunca como texto informativo. Actualizado en ADR-0009: el *mecanismo* de implementación dejó de ser la generación OKLCH del starter y ahora es una paleta literal en `@theme static` (`tailwind.css`), fuente única de tokens.

## Alternativas

- **Paleta del starter (OKLCH):** El sistema de colores del starter genera paleta desde 4 colores base. Más automático, pero no se ajusta al diseño Radical Clarity. **Descartado en implementación (ADR-0009).**
- **Paleta completa de DESIGN.md con todos los tokens:** Aplicar todos los tokens de DESIGN.md desde el inicio. Más preciso, pero mayor superficie de error en la implementación.

## Nota (2026-09-20)

El mecanismo que cita la sección «Decisión» (paleta literal en `@theme static`, ADR-0009) se descartó. La paleta objetivo no cambia; hoy se implementa con los colores base del starter y roles con modo oscuro, ver [0014](0014-paleta-desde-colores-base-del-starter.md).
