# 0020 — Barra de subcategorías de Materials

- **Fecha:** 2026-09-22
- **Estado:** Temporal

## Contexto

El ADR 0017 (punto 3) decidía no construir una barra de subcategorías en el listado de Materials: "el desplegable del menú ya las enlaza". En esta rama (`feat/tags-catalog-filter`) se ha construido de todos modos, junto con el filtro de etiquetas, para probar en el propio listado cómo queda una navegación directa entre Materials y sus 5 subcategorías, sin depender del desplegable del navbar. Laura la mantiene mientras evalúa el resultado, sin decisión cerrada todavía — de ahí el estado `Temporal`.

Durante la construcción aparecieron dos fallos de responsive, ya corregidos en esta misma rama:

1. Las pestañas usaban `flex flex-wrap` con `-mt-px -ml-px` por pestaña (colapso de bordes pensado para una rejilla fija) para evitar bordes dobles; con un número de pestañas variable por fila según el ancho e idioma, el punto de salto de línea era impredecible y la primera pestaña de cada fila quedaba desplazada 1px fuera del contenedor.
2. La pestaña "Tots" reutilizaba la clave de traducción `materials.all.label`, compartida con el ítem "Veure-ho tot" del desplegable del navbar (`theme.config.ts`) — alargar el texto para que encajara como pestaña cambiaba también el texto del desplegable.

## Decisión

1. **Construir `MaterialsSubcategoryBar.astro`**: una barra de ancho completo con las 6 páginas de Materials (Tots + Guies, Jocs, Publicacions, Campanyes, Audiovisuals), bajo la banda de título del listado y encima del filtro de etiquetas.
2. **Reutilizar el patrón de rejilla ya usado en `CatalogCard.astro`** en vez de inventar uno nuevo: `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6` con `-mr-px` en el contenedor, y cada pestaña con `border-r border-b` (sin margen negativo por celda). Así la barra rellena siempre la fila completa, con columnas iguales y sin bordes descuadrados, en cualquier ancho e idioma.
3. **Clave de traducción propia** para la pestaña "Tots": `materials.all_tab.label` ("Tots els materials" / "Todos los materiales"), independiente de `materials.all.label` ("Veure-ho tot" / "Ver todo"), que se queda solo para el desplegable del navbar.

## Alternativas consideradas

- **Mantener solo el desplegable del menú (la decisión original del punto 3 de 0017):** es la alternativa por defecto si la prueba no convence; volver a ella es barato — quitar el componente y su `import` en `CatalogsView.astro`, sin tocar datos, rutas ni el resto del listado.
- **`flex flex-wrap` con margen negativo por celda:** fue la primera implementación; descartada por los fallos de responsive del punto 1 de más arriba.
- **Reutilizar `materials.all.label` en ambos sitios:** descartada — acopla dos textos con requisitos distintos (un ítem de menú desplegable de ancho fijo vs. una pestaña de barra de ancho variable).

## Consecuencias

- El punto 3 del ADR 0017 queda **sustituido en parte**: solo en lo referente a la barra de subcategorías de Materials. El resto de ese punto (sin buscador, sin selector de orden en los listados) sigue vigente; el filtro de etiquetas ya estaba cubierto por el ADR 0019.
- Mientras el estado de este ADR sea `Temporal`, un cambio de rumbo (quitar la barra) no necesita un ADR nuevo — basta con actualizar este a `Descartado` o `Vigente` según lo que decida Laura tras ver el resultado.
- Verificado visualmente en Chrome headless a 375, 480, 768, 1024 y 1280px, en catalán. No verificado en Safari/Firefox reales ni en modo oscuro.

## Archivos que fijan la decisión

- `web/src/components/MaterialsSubcategoryBar.astro` — el componente.
- `web/src/views/CatalogsView.astro` — dónde se integra.
- `web/src/i18n/ui.ts` — `materials.all_tab.label` frente a `materials.all.label`.
