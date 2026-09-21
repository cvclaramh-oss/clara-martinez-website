# 0017 — Listados de catálogo

- **Fecha:** 2026-09-22
- **Estado:** Vigente

## Contexto

El catálogo tiene cuatro categorías (`projects`, `materials`, `formations`, `workshops`) y `materials` tiene cinco subcategorías (guías, juegos, publicaciones, campañas y audiovisuales). Hasta ahora solo existía el listado de proyectos, con un filtro por etiquetas (`/projectes/etiqueta/<slug>`) y una paginación de 6 fichas; el resto de rutas mostraba una página «próximamente».

El prototipo `MATERIALS_1` propone además una barra de subcategorías, una barra de filtros con etiquetas, buscador y selector de orden, y una paginación con botones. Ese prototipo no coincide del todo con el resto de páginas ya construidas (Home, ficha de detalle).

## Decisión

1. **Una sola vista para todos los listados.** `CatalogsView.astro` recibe la página del catálogo (`projects`, `materials`, `materials-guides`, `materials-games`, `materials-publications`, `materials-campaigns`, `materials-audiovisual`, `formations`, `workshops`) y de ella salen los datos, el título, el subtítulo, las migas y la ruta de la paginación. La configuración de cada página vive en `constants/constCatalog.ts` (`CATALOG_PAGES`) y `getCatalogPageItems` (`lib/sanity/catalogItemsQuery.ts`) filtra por subcategoría en el código. `[...slug].astro` genera con un solo bucle las páginas de cada catálogo.
2. **URLs planas para las subcategorías de Materials** (`/jocs`, `/es/juegos`…), sin anidarlas bajo `/materials`. Las claves canónicas son `materials-<subcategoría>` en `i18n/routes.ts`. Las fichas de todo Materials siguen en `/materials/<slug>`. `/materials` lista todos los materiales y su tarjeta muestra la subcategoría; en las páginas de una subcategoría la banda de la tarjeta se oculta y las migas son «Inici / Materials / <subcategoría>».
3. **Sin barra de filtros.** No hay etiquetas, buscador ni selector de orden en ningún listado. Se retiran el filtro de etiquetas del listado de proyectos (ruta `tag`, `getTags`, `filterByTagSlug` y sus textos). Las etiquetas siguen como texto en tarjetas y fichas. La barra de subcategorías de Materials no se construye por ahora: el desplegable del menú ya las enlaza.
4. **Paginación de 12 fichas por página**, con `CATALOGS_PAGE_SIZE` en `constants/constCatalog.ts` como única fuente para la vista y para `getStaticPaths`. El componente `CatalogPagination.astro` solo se pinta si hay más de una página; las páginas siguientes viven en `/<catálogo>/<n>` y el título añade «Pàgina N» desde la segunda.
5. **Estado vacío** en lugar de «próximamente» cuando un catálogo no tiene fichas en un idioma. Solo `bio` conserva `ComingSoonView`.
6. **Consulta a Sanity por lotes de 50** (`fetchAllInBatches`), con orden determinista (`slug` y `_id`), para no depender del límite de tamaño de una respuesta.
7. **Subtítulo propio por catálogo** (`*.subtitle` en `ui.ts`). Mientras no estén confirmados por la clienta, valen los marcadores `[PENDENT] …`.

Criterio general: donde el prototipo no responde o se contradice, manda la coherencia con lo ya construido (banda del título, migas y tarjetas iguales a las de la Home y la ficha).

## Alternativas consideradas

- **Una vista por catálogo:** duplica migas, paginación y estado vacío cuatro veces; descartada.
- **Subcategorías anidadas bajo `/materials/<subcategoría>`:** más ordenadas, pero chocan con las fichas (`/materials/<slug>`) y obligarían a reescribir rutas, menú y tarjetas. Se eligió avanzar sin riesgo con lo que ya funcionaba.
- **Filtro de etiquetas, buscador y orden en el navegador (como el prototipo):** con páginas de 12 solo vería las fichas de la página actual; con ~10 fichas por catálogo no aporta. El filtro por etiquetas anterior solo cubría proyectos y sus páginas no se traducían entre idiomas.
- **Etiquetas como páginas por catálogo (`/etiqueta/<slug>`):** se mantenían los problemas de traducción y de datos sucios; se sustituye por una decisión aparte (etiquetas como documentos de Sanity).
- **Paginación de 6:** dejaba dos páginas con 9 fichas; con 12 no aparece hasta que el catálogo crece.
- **Sin paginación:** válida mientras el catálogo sea pequeño, pero cargaría todas las imágenes de un catálogo grande en una sola página.
- **Fondo gris con hueco entre tarjetas (prototipo):** obligaba a tocar `CatalogCard`, que también usa la Home, por el `gap` sobre sus filas compartidas.

## Consecuencias

- **Un solo sitio que cambiar:** añadir un catálogo o una subcategoría es una entrada en `CATALOG_PAGES`, una clave en `routes.ts` y sus textos.
- **Colisión posible entre página y ficha:** `/formacions/2` (página) y `/formacions/<slug>` (ficha) comparten forma; solo chocarían con un slug puramente numérico.
- **Los `[PENDENT]` son visibles** en las páginas de Materials, sus subcategorías, Formacions y Tallers, y también en su meta descripción, hasta que se confirmen los textos (`grep -rn PENDENT web/src` debe salir vacío antes de publicar).
- **Catálogos vacíos:** muestran el estado vacío; no hay ya páginas «próximamente» salvo Bio.
- **En una ficha de Materials** el menú marca «Veure-ho tot» y el botón «Materials», no la subcategoría concreta, porque las fichas no cuelgan de la subcategoría.
- **Las etiquetas quedan sin filtro** hasta que se decida su modelo definitivo. La opción B del ADR 0008 (etiqueta como documento) se retoma en un ADR nuevo que sustituirá a este punto.
- **Coste de build:** una consulta por categoría e idioma y una más por página de catálogo; con el volumen actual es despreciable.

## Archivos que fijan la decisión

- `web/src/views/CatalogsView.astro` y `web/src/components/CatalogPagination.astro` — la vista y la paginación.
- `web/src/constants/constCatalog.ts` — `CATALOG_PAGES` y `CATALOGS_PAGE_SIZE`.
- `web/src/lib/sanity/catalogItemsQuery.ts` y `fetchAllInBatchesQuery.ts` — datos y lotes.
- `web/src/pages/[...slug].astro` — generación de las páginas de cada catálogo.
- `web/src/i18n/routes.ts` y `ui.ts` — rutas y textos.
