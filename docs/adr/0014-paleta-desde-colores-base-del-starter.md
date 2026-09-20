# 0014 — Paleta desde los colores base del starter, con roles que se adaptan al modo oscuro

- **Fecha:** 2026-09-20
- **Estado:** Vigente
- **Sustituye a:** el *mecanismo* del [0009](0009-token-governance-colores.md) (descartado). La paleta objetivo del [0002](0002-paleta-radical-clarity.md) sigue vigente.

## Contexto

El 0009 intentó fijar la paleta de Stitch como literales hex en `@theme static` (`tailwind.css`) y se descartó: mantenía dos sistemas de color a la vez (`@theme` y las rampas derivadas de `_root.scss`). La base volvió al starter, que genera los colores así: unos pocos colores base (`--brand-*`) producen las rampas (`--color-neutral-100…900`, `--color-primary-100…500`…), y de ellas salen los *roles* (`--foreground-color`, `--background-color`, `--border-color`, `--link-color`…) con `light-dark()`, es decir, con el modo oscuro resuelto.

Había que acercar el diseño de Stitch a esa base sin perder lo que aporta el starter (modo oscuro, alto contraste, foco visible) y sin duplicar valores. Al construir navbar, footer y CTA aparecieron problemas concretos:

- Los colores fijos (`text-neutral-800`, `bg-neutral-50`, el rosa) no cambian en modo oscuro: texto secundario a 1,4:1 y texto blanco sobre el rosa a 1,9:1.
- `--color-neutral-100` es blanco puro (alimenta `--background-color`), no un gris: un `hover:bg-neutral-100` sobre la barra blanca no se ve.
- `--link-color` del starter usa `primary-400` (L 60 %), que sobre blanco da 4,07:1 con el rosa: no llega a AA.
- El punto de partida del starter era `--brand-neutral: #b9bec4` (gris con matiz azul) y `--brand-primary: #d648ff` (morado).

## Decisión

1. **Una sola fuente: `src/styles/base/_root.scss`.** Sin `@theme`, sin literales de color repetidos en componentes.
2. **Colores base propios:** `--brand-neutral: #808080` (gris puro, sin croma) y `--brand-primary: oklch(81.5% 0.0616 0.86)` (el rosa apagado de acento). `--brand-secondary` pasa a `#808080` (gris puro, igual que el neutro) para que los botones y etiquetas secundarias del starter sean monocromos; `--brand-outline` (naranja del anillo de foco) sigue siendo el del starter, pendiente de decidir.
3. **Los colores de Stitch se traducen al escalón de la rampa más cercano**, no se copian como literales. La diferencia es de 1 a 12 sobre 255 (ver la skill `stitch-to-starter`). Texto principal `neutral-900` (`#0b0b0b`, a 1/255 del `#0A0A0A` que define `DESIGN.md`), secundario `neutral-700`, superficies `neutral-200`/`neutral-300`, acento `primary-200`, acento oscuro `primary-500`.
4. **Roles nuevos en `_root.scss`, definidos con `light-dark()` a partir de la rampa:**
   - `--color-on-surface-variant` (texto secundario): `neutral-700` / `neutral-400`.
   - `--color-on-accent` (texto sobre el rosa): `neutral-900`, en los dos modos porque el rosa no cambia.
   - `--color-accent-rose`: alias de `primary-200`. `--color-accent-rose-dark`: `primary-500` / `primary-200`.
   - `--color-surface-container-low` y `-high`: `neutral-200` / `neutral-800` y `neutral-300` / `neutral-700`.
   - Las celdas y bandas secundarias (tagline, banda y pie de las tarjetas) usan `--color-surface-container-low`. Un `--color-surface` a `#fafafa` (como Stitch) se probó y se quitó: apenas se distinguía del blanco.
5. **Roles del starter reasignados:** `--foreground-color` a `neutral-900` en claro; `--link-color` a `primary-500` / `primary-200`; `--link-hover-color` a `neutral-900` / `primary-100`.
6. **Los componentes usan roles, no escalones fijos,** siempre que el color deba cambiar en modo oscuro.

## Alternativas consideradas

- **Tokens exactos de Stitch como literales** (hex u `oklch`): se probaron cuatro (`accent-rose`, `accent-rose-dark`, `surface-container-low/high`) y se revirtieron a alias de la rampa. Son exactos, pero un segundo sistema de color y sin modo oscuro propio.
- **`@theme static` con la paleta completa (0009):** descartado por duplicar la definición del color.
- **Evitar `oklch(from …)` y calcular las rampas una vez como valores fijos:** bajaría el suelo de navegadores solo a Chrome 123, Firefox 128 y Safari 17,5, a cambio de perder la derivación automática desde los colores base. No compensa.
- **Quitar los roles y repetir `text-neutral-700 dark:text-neutral-400` en cada uso:** el resultado visual es el mismo, pero obliga a repetir el par claro/oscuro unas 16 veces y a acordarse del `dark:` cada vez. Un rol expresa la intención («texto sobre el acento») y permite cambiar el color en un solo sitio.

## Consecuencias

- **Los colores son aproximados** frente a Stitch (1 a 12 de 255).
- **La rampa no garantiza AA.** No valen como texto en claro `neutral-500` (≈1,9:1), `neutral-600` (≈3,95:1) ni `primary-400` (≈4,07:1); en oscuro, `neutral-700` (≈2,15:1). Cada combinación nueva se calcula.
- **El modo oscuro de estos componentes se validó por cálculo** de contraste, no renderizado (el script del toggle no se activa en Chrome sin ventana).
- **Otros componentes siguen con colores fijos** y se migran al reconstruir cada página: `Feature.astro`, `SitemapView.astro` y a revisar `PageHeader.astro`.
- **Suelo de navegadores: Chrome 125+, Firefox 128+ y Safari 18+.** Lo fija `oklch(from …)` (colores relativos, Baseline «recientemente disponible» desde 2024-09-16; datos del paquete `web-features` 3.39.0, consultados el 2026-09-20). Tailwind 4 exige menos (Safari 16.4, Chrome 111, Firefox 128). `light-dark()` (Chrome 123, Firefox 120, Safari 17,5) y `subgrid` quedan por debajo. `text-wrap: balance`, `interpolate-size` y `@view-transition` son mejoras opcionales del starter: si no se soportan, se ignoran. Por debajo del suelo las variables de color no se resuelven y la web cae a los colores por defecto del navegador (degradación sin probar).
- **Trampa de especificidad:** `#main-navigation a { color: var(--foreground-color) }` gana a cualquier clase de componente. Las reglas de color de un elemento dentro del navbar deben colgar de `#main-navigation` (en Astro, `:global(#main-navigation) .clase`).
- **El rosa está decidido:** se mantiene el actual, más apagado que `#F5CCD4`/`#ffd5dd` de Stitch, por decisión propia.
- **Quedan por decidir:** `--brand-outline` y los radios a 0 (ADR 0005).

## Archivos que fijan la decisión

- `web/src/styles/base/_root.scss` — colores base, rampas y roles.
- `web/src/components/{Logo,Navigation,LanguagePicker,ResponsiveToggle,Footer,CallToAction}.astro` — usos de los roles.
- `.agents/skills/stitch-to-starter/SKILL.md` — cómo aplicarlo a cada página.
