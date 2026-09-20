# 0011 — Submenús del menú móvil: acordeón en flujo, nunca overlay

- **Fecha:** 2026-09-16
- **Estado:** Vigente

## Contexto

El starter base (`accessible-astro-starter`) posiciona los paneles desplegables con `position: absolute`, pensado para un menú de escritorio con espacio libre alrededor.

Stitch (el prototipo de referencia del navbar) no resuelve el comportamiento responsive — es una maqueta de una sola pantalla de escritorio — así que cómo se abre un desplegable dentro del menú móvil es una decisión propia del proyecto, no algo copiado del prototipo.

Al reutilizar `position: absolute` también en móvil, el panel heredaba el ancho fijo de escritorio (`16rem`), dejando espacio en blanco a la derecha dentro de un contenedor a ancho completo, y el ítem siguiente del menú ("Formacions") quedaba descuadrado.

## Decisión

Dentro del menú móvil (`.mobile-menu`), los submenús se abren **siempre en flujo normal** (`position: relative`, ancho 100%), empujando el resto de ítems hacia abajo — patrón "disclosure/accordion" — nunca superpuestos.

El comportamiento absoluto/flotante se reserva exclusivamente para desktop, donde sí hay espacio libre alrededor del botón y no hay riesgo de tapar el resto del menú.

## Por qué

La primera idea para quitar el hueco en blanco era que el desplegable se abriera "hacia la derecha" o se superpusiera sin desplazar "Formacions" hacia abajo — más compacto visualmente, y más parecido a como ya se comporta en escritorio. Pero un panel superpuesto en una pantalla estrecha entra en el terreno de WCAG 1.4.13 (contenido en hover/foco: tiene que poder descartarse, no interferir con el resto del contenido ni taparlo), y complica algo que el patrón estándar de acordeón — recomendado por WAI-ARIA Authoring Practices para navegación móvil — resuelve de forma nativa y sin ese riesgo. Entre compacidad visual y el patrón accesible reconocido, gana el patrón accesible.

## Alternativas

- **Overlay igual que en escritorio (absolute, superpuesto):** fue el comportamiento heredado por defecto del starter; descartado por lo anterior — en pantallas estrechas puede tapar el resto de ítems del menú o el contenido de la página.
- **Ancho fijo del panel en vez de 100%:** descartado — es la causa original del espacio en blanco; un ancho pensado para desktop no tiene sentido dentro de un contenedor de ancho variable como el menú móvil.

## Consecuencias

- Cualquier futuro desplegable dentro de `.mobile-menu` hereda automáticamente el patrón vía el selector `.mobile-menu > ul ul`; no hace falta repetirlo por ítem.
- El `<li>` que contiene un desplegable necesita `flex-direction: column` explícito en móvil (el resto de `<li>` del menú son fila por defecto, heredado del layout de escritorio) — documentado aquí para no repetir la investigación si se vuelve a tocar el CSS del navbar.
- Debe reflejarse en la declaración de accesibilidad del sitio (`/declaracio-accessibilitat` · `/es/declaracion-accesibilidad`) como criterio cumplido: sin contenido superpuesto en hover/foco en móvil (1.4.13).

## Archivos que fijan la decisión

- `src/components/Navigation.astro` — bloque `.mobile-menu`, selectores `> ul ul` y `li.has-dropdown`.
