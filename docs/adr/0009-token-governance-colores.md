# 0009 — Gobernanza de tokens de color (fuente única)

- **Fecha:** 2026-09-15
- **Estado:** Descartado (2026-09-20) — ver «Nota de descarte» al final
- **Sustituido por:** [0014](0014-paleta-desde-colores-base-del-starter.md) (el mecanismo; la paleta objetivo sigue en el 0002)

## Contexto

Los colores estaban definidos en **tres sitios distintos** que había que mantener a mano:

1. `theme.config.ts` con 4 colores neón (`#d648ff`, `#00d1b7`, `#b9bec4`, `#ff4500`) heredados del starter.
2. `src/layouts/DefaultLayout.astro` con un bloque `<style define:vars>` que inyectaba esos 4 colores como variables CSS en `:root`.
3. `src/assets/scss/base/_root.scss`, que definía `--brand-*` y derivaba 22 rampas de color con `oklch(from var(--brand-*) ...)`.

Esas 4 fuentes convertían la **misma marca** en valores distintos y dejaban rastro del neón del starter pese a que la paleta real (Radical Clarity, ver ADR-0002) es monochrome + rosa. Cualquier cambio de color obligaba a tocar 3 ficheros.

## Decisión

Establecer **una única fuente de verdad de color**: el bloque `@theme static` de `src/styles/tailwind.css`, con los ~50 tokens de DESIGN_v2.md escritos como **literales hex** (`--color-surface: #f9f9f9`, `--color-primary: #000000`, etc.).

Y eliminar las capas intermedias:

- `theme.config.ts`: se quita `colors` (y su tipo pasa a `colors?` opcional, vacío por defecto).
- `DefaultLayout.astro`: se elimina el bloque `<style define:vars>`.
- `_root.scss`: las derivaciones oklch apuntan **directamente** a los tokens `@theme` (`oklch(from var(--color-primary) 90% c h)`), sin `--brand-*` intermedio.

El resto de tokens (tipografía, espaciado, radios) se añadirán también a `@theme` en la fase de diseño base.

## Por qué

- **Una sola fuente** eliminable a mano: cambiar un color = cambiar un literal en un fichero.
- **Tailwind 4 genera las class utilities y las variables** desde `@theme`; el CSS derivado en `_root.scss` las consume por `var()`. No hay valores duplicados que puedan divergir.
- **Se elimina el neón residual** del starter, que filtró por descuido en una fase anterior.
- **El sistema de accesibilidad del starter se conserva**: usa variables CSS (`--color-*`, `--foreground-color` con `light-dark()`), que ahora se alimentan desde `@theme`.

## Alternativas

- **`@theme` sin `static` (emisión perezosa):** Tailwind 4 por defecto solo emite las variables `@theme` que usan utilidades. Si `_root.scss` referencia `var(--color-primary)` sin que exista aún ninguna clase `bg-primary`, la variable se rompería en silencio en producción. Se eligió `@theme static` para forzar la emisión de **todas** las variables, aunque alguna no tenga utilidad todavía.
- **`theme.config.ts` como fuente única (los 4 brand colors):** Se probó reducir a este fichero + `@theme` para el resto, pero Laura rechazó tener "dos sitios". Con `@theme` completo hay uno solo.
- **CSS custom properties (SCSS) como fuente única:** Más tradicional, pero pierde la integración con utilidades Tailwind 4, duplica el "cómo se define" de color y obliga a mantener manualmente el mapeo de nombres.

## Consecuencias

- **`oklch(from var(--color-*) …)` requiere `var()` como color origen.** Verificado contra caniuse/MDN: soportado en Chrome/Edge 125+, Firefox 128+ y Safari 18+. El fallo histórico de Safari 16.4–17.6 solo afectaba a `calc()` sobre hue; aquí los canales L/C/H son literales, por lo que es seguro. Los componentes conservados del paquete (`accessible-astro-components`) tienen además fallbacks `hsl()` en su CSS por si algún navegador viejo no resuelve las variables.
- **Con `--color-primary: #000`, las rampas derivadas (primary-100…500) se vuelven grises** en los componentes conservados del paquete (botones, notificaciones…). Es lo esperado en un diseño monocromo; pendiente de verificación visual en el preview de Cloudflare y, si hace falta, de ajustar qué tokens alimentan los 4 slots de marca de esos componentes (`accessible-astro-components`), porque ya no existen `--brand-*`.
- **`outline` subido a `#666666`** (ratio 5.45:1 sobre `surface`, apto para texto/bordes). Ver ADR-0002.
- Doc/Git: la herramienta de gobierno de código (AGENTS.md) solo referencia la fuente de verdad de token en DESIGN_v2.md; este ADR fija el *mecanismo* de implementación (dónde viven y cómo se emiten).

## Archivos que fijan la decisión

- `src/styles/tailwind.css` — `@theme static` con la paleta (fuente única).
- `src/assets/scss/base/_root.scss` — derivaciones oklch apuntando a `@theme`.
- `theme.config.ts` / `src/utils/defineThemeConfig.ts` — `colors` eliminado/opcional.
- `src/layouts/DefaultLayout.astro` — `define:vars` eliminado.

## Nota de descarte (2026-09-20)

Mantener los tokens de color en `@theme` y, a la vez, derivar rampas en `_root.scss` obligaba a mantener dos sistemas de color al mismo tiempo, y esa mezcla bloqueaba el avance del diseño. Se vuelve a la base de estilos original y se limpia de forma incremental. El bloque `@theme static` de `tailwind.css` que describe este ADR ya no existe en el código. La paleta objetivo (ver ADR-0002) no cambia; lo descartado es esta forma de implementarla.
