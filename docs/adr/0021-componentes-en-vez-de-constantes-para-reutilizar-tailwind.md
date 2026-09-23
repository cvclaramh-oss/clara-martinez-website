# 0021 — Componentes en vez de constantes para reutilizar clases de Tailwind

- **Fecha:** 2026-09-22
- **Estado:** Vigente

## Contexto

Durante la unificación de botones y tipografía de esta sesión (rama `refactor/unify-buttons`) apareció un patrón repetido: la misma cadena de clases Tailwind (familia de letra, tamaño micro, negrita, mayúsculas, espaciado) copiada a mano en varios componentes y vistas — labels de "eyebrow" (rótulo encima de un título), migas de pan, insignias de categoría, celdas de paginación, términos de la fitxa tècnica.

Se empezó centralizando esas cadenas en constantes de TypeScript exportadas (`src/constants/constClassNames.ts`, `linkResetClassName`/`microLabelClassName`), siguiendo el patrón ya existente en el proyecto para `constLabels.ts`/`constCatalog.ts`. Al ampliar ese enfoque a un caso con más variedad estructural (varios sitios donde el bloque duplicado no era solo una clase, sino icono + texto + margen, siempre igual entre sí), Laura preguntó si ese era el enfoque correcto según buenas prácticas.

Se consultó la documentación oficial de Tailwind CSS (`ctx7`, `/tailwindlabs/tailwindcss.com`, sección "Styling with utility classes — Managing duplication"), no de memoria:

> "Si necesitas reutilizar estilos entre varios archivos, la mejor estrategia es crear un **componente**... Esto mantiene juntos el estilo y la estructura, que es el enfoque más limpio."

La misma documentación desaconseja abstraer antes de tiempo: si la duplicación es local a un archivo y se puede editar con selección multi-cursor a la vez, no hace falta ninguna abstracción.

## Decisión

1. **Cuando el mismo bloque de marcado + estilo se repite igual en varios archivos** (misma estructura HTML, no solo las mismas clases), se extrae un **componente Astro**, no una constante de JS. Así se creó `Eyebrow.astro` (icono opcional + texto rosa, usado en `FeaturedCatalogItems`, `PageTitleBand`, `ContactView`, `ContactForm`, `CatalogItemDetailView`) e `Insignia.astro` (insignia con borde + relleno, prop `tone` para los colores reales que sí varían entre sitios, usada en `CatalogCard`, `VideoEmbed` y el contador de galería de `CatalogItemDetailView`).
2. **Cuando lo que se repite es solo el valor tipográfico/visual, pero cada sitio ya tiene su propia estructura distinta** (una migas de pan, una celda de paginación, un término de definición, una fila con icono y badge), se mantiene como constante de TypeScript en `src/constants/constClassNames.ts` (`linkResetClassName`, `microLabelClassName`) — ahí no hay un componente único razonable que sustituya a `Breadcrumb.astro`, `CatalogPagination.astro`, etc., que ya existen y controlan su propio marcado.
3. **No se usa `@apply`** (clases CSS con nombre propio en una hoja de estilos) para este caso — introduciría un mecanismo nuevo sin precedente en el proyecto (todo el CSS es Tailwind directo en el marcado, o reglas por etiqueta en `_font.scss`), y la propia documentación de Tailwind lo deja como alternativa, no como primera opción.

## Alternativas consideradas

- **Solo constantes de TypeScript** (lo que se estaba haciendo antes de esta decisión): mecánico y sin riesgo cuando el valor es idéntico, pero no resuelve la duplicación real cuando lo que se repite es una estructura completa (icono + texto + margen) — forzaría a reconstruir esa estructura a mano en cada sitio igualmente, solo que con clases importadas en vez de escritas.
- **`@apply` en una hoja de estilos** (`_utility.scss` o similar): es la vía "clásica" de CSS, pero introduce un patrón sin precedente en este proyecto (nunca se ha usado una clase CSS con nombre propio para estilo, solo utilidades de Tailwind o reglas por etiqueta HTML). Descartada por coherencia con el resto del código, no por ser mala práctica en sí.
- **Edición multi-cursor sin ninguna abstracción**: válida según la propia documentación de Tailwind cuando la duplicación es pequeña y local a un archivo — no encaja aquí porque el mismo bloque estaba copiado en 4-10 archivos distintos, no en varias líneas de un mismo archivo.

## Consecuencias

- Los componentes nuevos (`Eyebrow.astro`, `Insignia.astro`) sustituyen bloques de marcado antes duplicados; las constantes existentes (`linkResetClassName`, `microLabelClassName`) se mantienen como la capa de valor compartido que esos y otros componentes usan por dentro, no como sustituto de construir un componente.
- Antes de añadir una constante nueva a `constClassNames.ts`, comprobar primero si lo que se repite es un bloque de marcado completo (→ componente) o solo un valor tipográfico que cada sitio ya envuelve con su propia estructura (→ constante).
- Quedan sin decidir todavía los usos "mezclados" de `microLabelClassName` (clase compartida combinada con clases propias de cada sitio, vía *template literal*, en `FeaturedCatalogItems`, `ContactForm`, `CatalogCard`) — no está claro si merecen su propio componente o si se quedan como están; análisis hecho, sin aplicar.
- Relacionado con el ADR 0005 (border-radius): `Button.astro`, ya construido en esta misma sesión antes de esta decisión, es un ejemplo temprano del mismo criterio (componente propio en vez de intentar sobreescribir clases del paquete `accessible-astro-components`).

## Archivos que fijan la decisión

- `web/src/components/Eyebrow.astro`, `web/src/components/Insignia.astro` — los componentes.
- `web/src/constants/constClassNames.ts` — la capa de constantes que queda para el otro caso.
