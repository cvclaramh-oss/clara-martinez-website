# 0023 — Responsive fluido con la escala de Utopia: a sangre, tipografía, espaciado y breakpoints imprescindibles

- **Fecha:** 2026-09-23
- **Estado:** Implementado
- **Relacionado con:** [0015](0015-escala-de-breakpoints.md) (breakpoints), [0022](0022-utilidades-propias-de-tailwind-para-estilos-combinados.md) (`micro-label`)

## Contexto

La auditoría de estilos del 2026-09-23 (`docs/private/styles-audit_v2.md`, fuera del repositorio) encontró que el responsive se veía incoherente por tres causas:

- **Dos sistemas de maquetación a la vez:** el `.container` del starter (centrado, 1200px) en las páginas secundarias y bandas a sangre con el margen lateral escrito a mano (`px-4 md:px-6 lg:px-8`, 15 veces en 10 archivos) en el resto. En las páginas que mezclaban los dos, título y contenido no se alineaban en pantallas anchas.
- **Tres escalas tipográficas:** la fluida del starter (`--font-size-N`), los tamaños fijos de Tailwind (`text-xs`… `text-xl`, que saltan en cada breakpoint) y valores escritos a mano (`text-[0.6875rem]`, `font-size: 0.75rem`…).
- **Espaciado vertical a saltos:** rellenos y márgenes que cambiaban de golpe en `md:`/`lg:` (`py-12 lg:py-16`, `pt-10 lg:pt-16`…) y separadores de altura fija.

El starter ya traía la solución y no se estaba usando: tokens fluidos generados con Utopia (320→1240px, base 16→18px) para tipografía (`--font-size-N`), espacio (`--space-*`) y margen (`--grid-gutter`).

## Decisión

1. **Maquetación a sangre en todo el sitio**, con un único margen lateral fluido: `--grid-gutter: clamp(1rem, 0.6522rem + 1.7391vw, 2rem)` (16px a 320, 32px a 1240; mismos extremos que antes, sin saltos), aplicado con `px-(--grid-gutter)`. Las páginas secundarias dejan `.container` y usan `PageTitleBand` (con botón opcional) y `max-w-(--font-measure)` para limitar la longitud de las líneas de texto.
2. **Tipografía:** todo tamaño sale de la escala `--font-size-N` (`text-(length:--font-size-N)` en clases, `var(--font-size-N)` en SCSS), incluido el `body` (`--font-size-0`). Equivalencias usadas: 10–12px → `--font-size--2`, 14px → `--font-size--1`, 16px → `--font-size-0`, 20px → `--font-size-1`. Única excepción: el nombre del Hero, con su `clamp()` propio de exhibición. Los interlineados de texto fluido son relativos (`leading-tight`, `leading-relaxed`) o el paso siguiente de la escala, no píxeles fijos.
3. **Espaciado vertical:** pasos `--space-*` y, donde el espacio debe crecer más que el texto, **pares de Utopia** con la misma configuración: `--space-s-m` (16→27px), `--space-m-l` (24→36px), `--space-m-xl` (24→54px), `--space-xl-2xl` (48→72px). Se añaden solo cuando un sitio real los necesita.
4. **Breakpoints solo imprescindibles**, para cambios de **disposición** (que no pueden ser fluidos), y **medidos con el contenido real**, no estándar: la tagline de la cabecera pasa a celda propia a partir de `tagline-s: 620px` y `tagline: 1400px` (medido con el texto en español, el más largo). Los breakpoints que solo cambiaban tamaños se eliminan.
5. **Alto de la cabecera fija en un token:** `--header-height: 4rem`, usado por la barra, el hueco de `<main>`, el `scroll-padding` y el alto máximo del menú móvil.

## Alternativas consideradas

- **Ancho máximo centrado (`.container`) en todo el sitio:** descartado; la mayoría del sitio (Home, listados, fichas, contacto, cabecera, pie) ya era a sangre y su rejilla de celdas con bordes compartidos es la identidad del diseño.
- **Un solo paso `--space-*` por sitio:** la escala crece ~12% entre móvil y escritorio y habría quitado bastante aire en escritorio respecto a los saltos anteriores; los pares mantienen la jerarquía.
- **`clamp()` propio para cada valor:** fiel a los extremos anteriores, pero serían valores sueltos fuera de un sistema.
- **Redefinir `text-sm`, `text-xs`… en el `@theme` de Tailwind:** menos cambios, pero las clases dejarían de significar lo que dice la documentación de Tailwind y el proyecto ya evita `@theme` (0009, 0015).
- **Decidir la posición de la tagline con JavaScript (`ResizeObserver`):** exacto en cualquier idioma, pero añade JS a algo de presentación y un salto visual al cargar.

## Consecuencias

- Ya no quedan tamaños de letra fijos de Tailwind ni `font-size` escritos a mano fuera de la escala; el margen lateral y el ritmo vertical salen de tokens.
- Cambiar el aire o el tamaño de un nivel es tocar un token en `_root.scss`.
- Los breakpoints de la tagline dependen de la longitud del texto: si cambia la tagline o el tamaño de letra, hay que volver a medir (el valor medido está anotado junto a cada breakpoint).
- La cabecera sigue fija; el menú móvil tiene scroll propio (`max-block-size` con `100dvh`) y `scroll-padding-block-start` evita que el foco quede tapado (WCAG 1.4.10 y 2.4.11).

## Archivos que fijan la decisión

- `web/src/styles/base/_root.scss` — `--grid-gutter`, pares de espacio, `--header-height`.
- `web/src/styles/base/_breakpoint.scss` — `tagline-s`, `tagline`.
- `web/src/components/PageTitleBand.astro` — banda de título común con botón opcional.
