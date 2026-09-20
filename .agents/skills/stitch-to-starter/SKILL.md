---
name: stitch-to-starter
description: Cómo traducir un diseño de Stitch (HTML con clases de Tailwind y tokens M3) a componentes de este proyecto sin perder lo que aporta el starter. Úsala SIEMPRE antes de construir o rehacer un componente o página a partir de un prototipo de Stitch, y cuando haya que elegir un color, un tamaño de texto, un espaciado o un breakpoint.
---

# De Stitch al starter — Radical Clarity

Referencias locales (fuera de git, `docs/private/design/`): `DESIGN.md` (sistema de Stitch), `stitch_design/HOME_2_code.html` (original) y `stitch_design/HOME_final_code.html` (ya traducido a las clases de este proyecto; solo lectura, no se compila). Decisión de fondo: ADR 0014.

## 1. Reglas

- **Un solo sitio para el color: `web/src/styles/base/_root.scss`.** Sin `@theme`, sin literales de color en componentes, sin tokens paralelos. Un color nuevo se define allí, con `light-dark()` y a partir de la rampa.
- **Roles, no escalones fijos,** para lo que deba cambiar en modo oscuro. `text-neutral-800` no se invierte; `--color-on-surface-variant` sí.
- **Todo par de colores nuevo se calcula** (AA: 4,5:1 texto normal, 3:1 texto grande y elementos gráficos) en claro y en oscuro.
- **Un componente a la vez.** Antes de tocar un componente, renderizar y comprobar; nunca dar por bueno un cambio de color sin mirar el modo oscuro.
- **Suelo de navegadores: Chrome 125+, Firefox 128+, Safari 18+** (ADR 0014). Antes de usar una función CSS nueva, comprobar su estado Baseline (paquete `web-features` o caniuse): si exige más que el suelo, usarla solo como mejora opcional que, si no se soporta, se ignora.
- **No perder del starter:** modo oscuro y alto contraste, foco visible (anillo `outline` del mixin), `prefers-reduced-motion`, skip link. Ver §6.

## 2. Colores: traducción Stitch → proyecto

Colores base (`_root.scss`): `--brand-neutral: #808080` (gris puro), `--brand-primary: oklch(81.5% 0.0616 0.86)` (rosa). Los valores siguientes son de cálculo, no de medición en pantalla.

| Stitch | Se escribe en el proyecto | Diferencia |
|---|---|---|
| `text-primary`, `border-primary` (`#000` / `#0A0A0A`) | `text-(--foreground-color)` / `border-(--border-color)` (`neutral-900`, `#0b0b0b`) | 1/255 de `#0A0A0A` |
| `text-on-surface-variant` (`#444748`) | `text-(--color-on-surface-variant)` (`neutral-700`, `#484848`) | 4/255 |
| `bg-surface-container-low` (`#f3f3f3`) | `bg-(--color-surface-container-low)` (`neutral-200`, `#eeeeee`) | 5/255 |
| `bg-surface-container-high` (`#e8e8e8`) | `bg-(--color-surface-container-high)` (`neutral-300`, `#dedede`) | 10/255 |
| `bg-surface` (`#f9f9f9`) | `bg-(--color-surface-container-low)` (`neutral-200`): con `#fafafa` apenas se distingue del blanco | 15/255 |
| `bg-surface-container-lowest` (`#fff`) | `bg-(--background-color)` | 0 |
| `bg-secondary-container` (`#ffd5dd`) | `bg-(--color-accent-rose)` (`primary-200`, `#e0aebb`) | Decisión: rosa más apagado que el de Stitch |
| `text-secondary` (`#75565d`) | `text-(--color-accent-rose-dark)` (`primary-500`, `#815461` en claro) | 12/255 |
| `text-on-primary` (`#fff`) | `text-white`, solo sobre fondos que sean oscuros en los dos modos | 0 |
| `bg-primary` (botones, cuadrados) | `bg-(--color-on-accent)` si va sobre el rosa; si no, `bg-(--foreground-color)` | según contexto |
| `text-outline` (`#666666`) | No hay escalón equivalente. Como texto, `--color-on-surface-variant`; como raya, `--border-color-subtle` | — |

Roles con modo oscuro ya definidos: `--foreground-color`, `--background-color`, `--border-color`, `--border-color-subtle`, `--icon-color`, `--link-color`, `--link-hover-color`, `--color-on-surface-variant`, `--color-on-accent`, `--color-surface-container-low/high`, `--color-accent-rose`, `--color-accent-rose-dark`.

**Texto sobre el rosa: siempre `--color-on-accent`** (oscuro, 10,3:1). El texto blanco sobre el rosa da 1,9:1 y no pasa.

### Contrastes de referencia

| Claro (sobre blanco) | Ratio | Oscuro (sobre `neutral-900`) | Ratio |
|---|---|---|---|
| `neutral-900` | ≈ 19,7 | `neutral-100` | 19,7 |
| `neutral-700` | 9,15 | `neutral-400` | 12,5 |
| `primary-500` | 6,22 | `neutral-500` | 10,6 |
| `primary-400` | 4,07 ✗ | `neutral-600` | 4,98 |
| `neutral-600` | 3,95 ✗ | `neutral-700` | 2,15 ✗ |
| `neutral-500` | ≈ 1,9 ✗ | `primary-200` | 10,3 |

## 3. Tipografía: clases exactas

Familias: `font-(family-name:--font-family-special)` (Space Grotesk: `display`, `headline`, `label`) y `--font-family-default` (Hanken Grotesk: `body`). Las clases `text-*` de Stitch además fijan **peso y tracking**: hay que añadirlos salvo que el elemento ya los defina (`_font.scss` da `h3`–`h6` peso 500).

| Stitch | Clases | Peso / tracking del token |
|---|---|---|
| `label-sm` | `text-[0.6875rem] leading-3.5` | 700 / 0,12em |
| `label-md` | `text-xs` | 600 / `tracking-widest` |
| `label-lg` | `text-sm leading-4.5` | 600 / 0,08em |
| `body-sm` | `text-sm` | 400 / 0,01em |
| `body-md` | `text-base` | 400 / 0 |
| `body-lg` | `text-lg` | 400 / −0,01em |
| `headline-sm` | `text-xl leading-6.5` | 600 / 0 |
| `headline-md` | `text-[1.75rem] leading-8.5` | 600 / −0,01em |
| `headline-lg` | `text-4xl leading-10.5` | 700 / −0,02em |
| `display-lg` | `text-7xl leading-19` | 700 / −0,04em |
| `display-lg-mobile` | `text-[2.75rem] leading-12` | 700 / −0,03em |

Si el elemento lleva un `tracking-*` propio, gana al del token (es lo que hace Stitch): copiar el `tracking-*` del elemento, no el del token.

## 4. Espaciado y breakpoints

- Espaciado: `space-xs/sm/md/lg/xl` y `margin` de Stitch son `1/2/4/6/10/8` de la escala de Tailwind (`px-space-md lg:px-margin` → `px-4 lg:px-8`).
- **Márgenes por ancho (`DESIGN.md`):** móvil 1 rem (`px-4`), tablet 768–1023 px 1,5 rem (`md:px-6`), escritorio 2 rem (`lg:px-8`). Hero, destacados, CTA y footer (celdas y barra) comparten `px-4 md:px-6 lg:px-8`; la CTA centra su contenido en `max-w-6xl`, como el prototipo. El navbar queda fuera: el nombre empieza a 16 px porque un margen de 32 px no cabe a 1024. Los contenedores nuevos llevan las mismas clases (no el `.container` del starter).
- **Escala única (ADR 0015):** móvil <768, tablet 768–1023 (`md`), escritorio ≥1024 (`lg`). Los prefijos de Tailwind (`md:`, `lg:`) y el mapa SCSS (`m`, `l`) valen lo mismo; `sm` (640) no se usa. No escribir `48rem`/`64rem` a mano: en SCSS, `@include breakpoint('m')` o `('l')`.
- **Saltos propios del navbar, en un solo sitio (`styles/base/_breakpoint.scss`):** `nav` (1024, menú de escritorio) y `tagline` (1440, celda propia junto al menú). El tagline es celda en tablet (`m` hasta `nav`) y desde `tagline`, y va apilado bajo el nombre en móvil y entre `nav` y `tagline`. El padding fluido de los ítems parte de `nav` (`Navigation.astro`).

## 5. Sintaxis y trampas de clases (Tailwind 4)

- Variables CSS: `text-(--foreground-color)`, `border-(--border-color)`, `bg-(--color-surface-container-low)`.
- `neutral-*` funciona como clase (`bg-neutral-200`) y toma la rampa del proyecto. **`primary-*` no:** Tailwind no lo conoce; se escribe `bg-(--color-primary-200)`.
- `bg-neutral-100` es **blanco** (alimenta `--background-color`); no es el gris de Stitch. El gris es `--color-surface-container-low`.
- Un `border` sin color usa `currentColor`: siempre con `border-(--border-color)`.
- Tailwind escanea también comentarios: evitar en ellos palabras que sean utilidades (`visible`, `block`, `flex`, `hidden`…).
- **Sobrescribir un componente del starter (p. ej. `Link isButton`) exige `!`** en la utilidad (`rounded-none!`, `bg-(--x)!`): sus estilos van sin capa y ganan a la capa `utilities` de Tailwind aunque usen `:where()`. Es lo que ya hace `CallToAction.astro`.
- **Especificidad en el navbar:** `#main-navigation a { color: var(--foreground-color) }` gana a cualquier clase de componente. Reglas de color dentro del navbar: `:global(#main-navigation) .clase { … }`.

## 6. Starter: qué conservar y qué sobrescribir

Conservar: modo oscuro y alto contraste, anillo de foco de 3 px punteado (`--outline-color`, más visible que el de 1 px que sugiere `DESIGN.md`), `prefers-reduced-motion`, skip link, estructura y ARIA de los componentes de `accessible-astro-components`.

Sobrescribir (`DESIGN.md`: sin radios, sin sombras, sin degradados, bordes de 1 px):
- `--radius-*` y `--elevation-*` de `_root.scss` siguen con valores del starter; fijar los radios a 0 (ADR 0005).
- `Link isButton`: borde de 3 px, radio y desplazamiento de 3 px al pasar el ratón; reajustar a botón plano de borde 1 px.
- `--brand-secondary` ya es gris (`#808080`); `--brand-outline` (naranja del foco: 6,3:1 sobre blanco en claro, 7,5:1 en oscuro) sigue siendo el del starter, pendiente de decidir.

## 7. Verificar

- `npm run build` (debe dar `43 page(s) built` o el número actual) y `npm run check`.
- Todas las clases de un HTML de referencia generan CSS: compilar con `compile()` de `tailwindcss` (4.x) contra `tailwindcss/utilities.css` y `theme.css`. Las que no generan nada (`light`, `material-symbols-outlined`, `text-on-surface`, `bg-primary`) son de Stitch, no del proyecto.
- Capturas con Chrome sin ventana (`google-chrome --headless=new --screenshot=… --window-size=ANCHOxALTO`) sobre `dist/` servido con `python3 -m http.server`. **El modo oscuro no se activa así** (el script del toggle quita la clase): validar por cálculo de contraste y en el navegador.
- Probar los anchos 1050, 1280, 1440 y 1920 en catalán **y** español (las etiquetas en español son más largas).
- **Repaso en varios navegadores** (Chrome, Firefox y Safari/WebKit, en claro y oscuro y con teclado) cuando haya más páginas; en Linux no hay Safari real.
- **Accesibilidad automática con `axe-core`, a medida que se construyan páginas:** instalar `puppeteer-core` y `axe-core` en una carpeta temporal (no en el proyecto), servir `dist/` con `python3 -m http.server` y ejecutar `axe.run` con las etiquetas `wcag2a`, `wcag2aa`, `wcag21aa`, `wcag22aa` y `best-practice` sobre todas las páginas en claro y oscuro (forzar oscuro con `localStorage.setItem('darkMode','enabled')` antes de cargar) y a 1440 y 390 px. Un aviso de contraste de Firefox sobre el `h1` puede ser falso positivo (líneas solapadas); `axe` calcula con los colores CSS. Probar el sitio construido (`npm run preview`), no `npm run dev`: la barra de desarrollo de Astro añade nodos y avisos.

## 8. Pendientes conocidos

Ver «Pendientes acumuladas» de `docs/private/daily.md`. Los más relevantes al diseñar páginas: hover perdido entre 1050 y 1439 px, hover en móvil (una pantalla táctil no tiene hover), tipografía y medidas del footer y la CTA sin alinear con Stitch, `body` a 1,15 rem frente a 16 px, revisión de `PageHeader`, `Feature` y `SitemapView`.
