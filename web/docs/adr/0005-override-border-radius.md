# 0005 — Override global de border-radius (temporal)

- **Fecha:** 2026-09-09
- **Estado:** Temporal — pendiente de reemplazo por componentes propios

## Contexto

El paquete `accessible-astro-components` tiene `border-radius` hardcodeado en sus estilos inline (`.5rem`, `.25rem`). Las variables CSS están a `0` pero los componentes no las usan.

## Decisión

Añadir `* { border-radius: 0 !important }` global en `_general.scss` para forzar el estilo Radical Clarity.

## Alternativas

- **Reemplazar componentes por propios:** Crear componentes customizados con `border-radius: 0` desde el inicio. Más limpio, pero mucho más trabajo.
- **Usar `class`/`style` por props:** Comprobar si los componentes aceptan props para personalizar estilos. Más elegante, pero depende de la API del paquete.
