# 0015 — Escala de breakpoints

- **Fecha:** 2026-09-21
- **Estado:** Vigente

## Contexto

Los saltos del responsive vivían en dos sistemas paralelos más valores sueltos, y cada componente había elegido el suyo sobre la marcha:

- El mapa SCSS del starter (`styles/base/_breakpoint.scss`): `xs` 320, `s` 480, `m` 768, `l` 1024, `xl` 1280, `2xl` 1536 y `nav` 1050.
- Los prefijos de Tailwind, sin configuración propia: `sm` 640, `md` 768, `lg` 1024, `xl` 1280 y `2xl` 1536.
- Valores escritos a mano: el 1440 del tagline (dos veces en `Logo.astro`, en el SCSS y en una clase `min-[1440px]`), `48rem` y `64rem` en `Footer.astro`, `48rem` en `_list.scss`, y el salto `sm` (640) en el hero y en la barra del footer.
- Un desajuste de 26 px: el contenido pasaba a diseño de escritorio a 1024 y el navbar seguía con la hamburguesa hasta 1050.
- Márgenes laterales distintos en cada bloque (16, 24, 32 px y el `.container` del starter).

## Decisión

1. **Escala de contenido: 768 y 1024.** Móvil <768, tablet 768–1023 (`md`), escritorio ≥1024 (`lg`). Es la de `DESIGN.md` y la de Tailwind. Se trabaja mobile-first. `sm` (640) no se usa.
2. **Los saltos propios del navbar se definen por el espacio que hay, y solo en el mapa de `_breakpoint.scss`:**
   - `nav` = 1024: donde el menú de escritorio sustituye al móvil. Coincide con `lg`.
   - `tagline` = 1440: donde sobra sitio para una celda más junto al menú.
   - El tagline sigue una regla, «¿hay sitio?»: apilado bajo el nombre en móvil; celda propia en tablet (menú colapsado); apilado entre `nav` y `tagline` (el menú ocupa el sitio); celda propia desde `tagline`.
3. **Un nombre por salto y en un solo sitio.** No se escriben valores literales (`48rem`, `min-[1440px]:`). En SCSS se usa `@include breakpoint('m')`, `('l')`, `('nav')` o `('tagline')`; en clases, `md:` y `lg:`. `m` y `l` del mapa valen lo mismo que `md` y `lg`.
4. **Margen lateral común: `px-4 md:px-6 lg:px-8`** (16, 24 y 32 px) en hero, destacados, CTA y footer (celdas y barra). La CTA centra su contenido en `max-w-6xl`, como el prototipo, y no usa el `.container` del starter. El navbar queda fuera: el nombre empieza a 16 px.
5. **El padding fluido de los ítems del menú se calcula desde `nav`:** 0,6 rem en el salto, hasta 1 rem 130 px después, para que el menú quepa justo donde empieza.

## Alternativas consideradas

- **Mantener `nav` en 1050 (valor del starter):** deja un tramo de 26 px con el contenido ya en escritorio y el navbar aún colapsado. Descartada; a 1024 el navbar cabe en catalán y español con el padding fluido.
- **Definir los saltos en Tailwind con `@theme`:** descartado, no usamos `@theme` (ADR 0009 y 0014). Sin él, Tailwind usa sus valores por defecto, que ya coinciden en `md` y `lg`.
- **Un `@custom-variant` de Tailwind para el tagline:** duplicaría el valor del mapa SCSS, que es justo lo que se quería quitar. El tagline se controla desde el SCSS de `Logo.astro`.
- **Conservar `sm`:** no aportaba un cambio que `md` no cubriera.
- **Margen común también en el navbar:** con `px-8` en la marca el navbar dejaría de caber a 1024.

## Consecuencias

- **El ajuste del navbar depende de la longitud de los textos.** Medido con Puppeteer sobre el build, sin tagline en celda necesita ~1110–1140 px y con ella ~1350–1400 px; a 1024 el español justo cabe. Añadir un ítem o alargar un texto del menú puede romperlo: repetir la medición a 1024, 1050, 1439 y 1440 en catalán y español.
- **Un salto nuevo se añade al mapa y a esta escala,** no a un componente.
- **La constante `0.0492` del padding fluido** (6,4 px repartidos en 130 px) solo vale para ese tramo; si cambia `nav`, se recalcula.
- **Sin tocar, por venir del starter:** `xl` y `2xl` en `_utility.scss` (`.container`) y `Feature.astro`.
- **Verificado con capturas y medidas en Chrome** (390 a 1440 px, dos idiomas). No en Safari ni Firefox, y el modo oscuro de estos cambios no se ha renderizado.

## Archivos que fijan la decisión

- `web/src/styles/base/_breakpoint.scss` — el mapa, con `nav` y `tagline`.
- `web/src/components/Logo.astro` y `Navigation.astro` — los usos del navbar.
- `web/src/components/Footer.astro`, `Hero.astro`, `CallToAction.astro` y `styles/base/_list.scss` — sin saltos a mano ni `sm`.
- `.agents/skills/stitch-to-starter/SKILL.md` — cómo aplicarlo a cada página.
