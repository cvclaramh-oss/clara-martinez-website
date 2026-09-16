# 0010 — Ítems de navegación con subpáginas: solo dropdown, nunca link+dropdown combinados

- **Fecha:** 2026-09-16
- **Estado:** Vigente

## Contexto

El navbar se construyó a partir del prototipo Stitch (`docs/private/design/stitch_design/HOME_final_code.html`), donde el ítem "Materials" es un único `<a>` que combina texto de enlace y flecha de desplegable, activado por `group-hover:flex` (solo ratón).

La primera implementación real reprodujo esa doble función con un "control dividido" (split button): un `<a>` de texto que navega directamente a `/materials` + un `<button>` separado, solo con la flecha, para desplegar la lista — cada uno con su propio `aria-*`.

## Decisión

Cuando un ítem de navegación tiene subpáginas, es **siempre un desplegable único** (`<button aria-haspopup="true" aria-expanded="...">`), nunca un enlace directo y un desplegable combinados en el mismo control o celda.

Si hace falta poder navegar a una vista "todas las subpáginas", ese enlace se añade como **primer elemento de la propia lista desplegada** (p. ej. "Ver todo" / "Veure-ho tot" → `/materials`), no como control aparte.

## Por qué

La preferencia inicial era que "Materials" funcionara como enlace directo al catálogo y como desplegable a la vez, en un único ítem visual — así se pidió y así se implementó primero (control dividido: link de texto + botón de flecha aparte). Pero WCAG 2.2 AA es un requisito fijado del proyecto (ver `AGENTS.md`), no una preferencia de diseño negociable: un control dividido mete dos elementos focables bajo una misma etiqueta visual, lo que puede confundir a quien navega por teclado o con lector de pantalla sobre qué hace cada `Tab`, y el hover-only del prototipo original directamente no es operable por teclado (criterio 2.1.1). Entre mantener el control combinado — más fiel al prototipo y a la idea original — o simplificarlo a un desplegable único con "Ver todo" como primer elemento, gana la opción accesible.

## Alternativas

- **Control dividido (link + botón separado):** fue la primera implementación; descartado por lo anterior — dos focables por ítem, complejidad de estilos para diferenciarlos visualmente dentro de la misma celda.
- **Hover-only como en Stitch:** descartado de entrada — no operable por teclado (2.1.1), sin alternativa.
- **Hover como disparador añadido** (sin quitar clic/teclado): valorado a petición del usuario; es compatible con WCAG 2.2 (1.4.13) si se implementa con margen de salida y `Esc`, pero se descartó por complejidad añadida (gestión de retardo, comportamiento distinto en touch) sin necesidad real.
- **Desplegable siempre visible (sin colapsar) en desktop:** descartado — ocuparía espacio permanente en la barra y rompe el patrón "disclosure" que ya usa el resto del starter (`aria-expanded` + botón).

## Consecuencias

- Los ítems de tipo `dropdown` en `theme.config.ts` ya no aceptan `href` propio (se quitó del tipo en `defineThemeConfig.ts`); solo los elementos de `items[]` llevan `href`.
- Cualquier futuro ítem de menú que necesite "ver todo + subcategorías" replica el mismo patrón: primer elemento del listado = enlace "Ver todo".
- Debe reflejarse en la declaración de accesibilidad del sitio (`/declaracio-accessibilitat` · `/es/declaracion-accesibilidad`) como criterio cumplido: navegación operable por teclado (2.1.1), sin patrón hover-only.

## Archivos que fijan la decisión

- `theme.config.ts` / `src/utils/defineThemeConfig.ts` — tipo `NavigationItem`, sin `href` en `dropdown`.
- `src/components/NavigationItems.astro` — render del botón único.
- `src/components/Navigation.astro` — CSS y lógica de apertura/cierre `.has-dropdown`.
