# 0002 — Paleta Radical Clarity

- **Fecha:** 2026-09-09
- **Estado:** Vigente

## Contexto

Sistema de diseño Minimalist-Brutalist Contemporary con monochrome + rosa carne. Se hizo análisis WCAG completo antes de implementar.

## Decisión

Usar paleta de DESIGN.md. Tokens problemáticos (`outline-variant`, `outline`, `#FAFAFA/#F5CCD4`) solo para bordes decorativos, nunca como texto informativo.

## Alternativas

- **Paleta del starter (OKLCH):** El sistema de colores del starter genera paleta desde 4 colores base. Más automático, pero no se ajusta al diseño Radical Clarity.
- **Paleta completa de DESIGN.md con todos los tokens:** Aplicar todos los tokens de DESIGN.md desde el inicio. Más preciso, pero mayor superficie de error en la implementación.
