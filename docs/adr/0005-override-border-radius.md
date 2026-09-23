# 0005 — Override global de border-radius (temporal)

- **Fecha:** 2026-09-09
- **Estado:** Implementado

## Actualización (2026-09-22)

La alternativa "reemplazar componentes por propios" es la que se ha aplicado: `Button.astro` sustituye a `Link isButton` del starter en los 9 sitios que lo usaban, con esquinas rectas construidas en el propio componente (esquina fija, no depende de ninguna variable compartida). Mismo criterio que formaliza el [ADR 0021](0021-componentes-en-vez-de-constantes-para-reutilizar-tailwind.md) para otros casos de duplicación: componente propio en vez de sobreescribir el paquete `accessible-astro-components`.

**El `* { border-radius: 0 !important }` global de la decisión original ya no existe** — comprobado, no queda ni en `_general.scss` ni en ningún otro `.scss` del proyecto. En su lugar, `_root.scss` pone a `0` los tokens `--radius-xs/s/m/l/h` (comentario explícito "ADR 0005"). **Pendiente de comprobar:** el paquete `accessible-astro-components` define esos mismos nombres de variable en su propio `layout.css` con valores redondeados (no en `0`) — es la misma colisión de cascada ya confirmada con `--font-size-8` (el CSS del paquete se carga después del `_root.scss` del proyecto, así que su valor gana en silencio). No se ha verificado todavía si algún componente del paquete que siga sin sustituto propio (`Notification`, etc.) muestra esquinas redondeadas por esta causa — anotado en `daily.md` para comprobar.

## Contexto

El paquete `accessible-astro-components` tiene `border-radius` hardcodeado en sus estilos inline (`.5rem`, `.25rem`). Las variables CSS están a `0` pero los componentes no las usan.

## Decisión

Añadir `* { border-radius: 0 !important }` global en `_general.scss` para forzar el estilo Radical Clarity.

## Alternativas

- **Reemplazar componentes por propios:** Crear componentes customizados con `border-radius: 0` desde el inicio. Más limpio, pero mucho más trabajo.
- **Usar `class`/`style` por props:** Comprobar si los componentes aceptan props para personalizar estilos. Más elegante, pero depende de la API del paquete.
