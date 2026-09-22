# 0016 — Tipografías autoalojadas

- **Fecha:** 2026-09-21
- **Estado:** Vigente

## Contexto

- El diseño usa dos familias: Hanken Grotesk (texto) y Space Grotesk (títulos y etiquetas).
- Se cargaban desde Google Fonts con `<link>` en `DefaultLayout.astro`, y `public/fonts/` guardaba además Atkinson Hyperlegible Next (14 archivos del starter) que ya no se usaba.
- Cada visita hacía peticiones a un tercero (`fonts.googleapis.com` y `fonts.gstatic.com`) y esa dependencia exigía tratarla en la política de privacidad y en el consentimiento.

## Decisión

1. **Las dos familias se sirven desde el propio sitio**, en `web/public/fonts/`, como fuentes variables `woff2` con pesos 300–700: un archivo por subconjunto Unicode (`latin` y `latin-ext`) y familia, cuatro en total.
2. **`@font-face` en `styles/base/_font.scss`**, con `font-display: swap` y `unicode-range` para que el navegador solo descargue el subconjunto que la página usa (el catalán y el español caben en `latin`; `latin-ext` cubre, por ejemplo, la `l·l`).
3. **Van en `public/` y no en `src/assets/`** porque se referencian por URL desde el CSS y su ruta debe ser estable, sin hash.
4. **Se conservan las licencias:** `OFL-HankenGrotesk.txt` y `OFL-SpaceGrotesk.txt` junto a las fuentes (SIL Open Font License, uso y redistribución permitidos).
5. **Sin `<link rel="preload">`.** Se probaron para las dos fuentes `latin`, pero Firefox avisaba de que se precargaban y no se usaban en pocos segundos. Al quitarlos, el aviso desapareció y no se apreció ningún salto de texto. La causa del aviso no se averiguó; el preload solo es una optimización del primer pintado, y con `swap` la web funciona igual sin él.
6. **Atkinson Hyperlegible Next y sus 14 archivos se eliminan**, junto con su `OFL.txt` (sustituido por los dos nuevos).

## Alternativas consideradas

- **Seguir con Google Fonts:** más simple de mantener, pero mete un tercero en cada visita y complica la privacidad. Descartada.
- **Paquete npm (`@fontsource-variable/*`):** habría dado los archivos y el CSS ya hechos, pero añade dependencias y AGENTS.md pide consultar antes de añadirlas; con cuatro archivos fijos no compensa.
- **Mantener el preload:** descartado por el aviso de Firefox, sin beneficio medido.
- **Un solo archivo con todos los caracteres:** más simple, pero pesa más para quien solo usa `latin`.

## Consecuencias

- Sin peticiones a terceros por las fuentes; no hay que declararlas en la política de privacidad.
- Las fuentes quedan fijadas en la versión descargada: no cambian solas, y solo se sustituyen si se quiere una versión nueva.
- Si en el futuro se vuelve a pedir un preload, hay que probarlo en Firefox además de en Chrome.
- Los textos que salgan de `latin` y `latin-ext` (alfabetos distintos) caerían a `sans-serif`: hoy no aplica al catalán ni al español.
