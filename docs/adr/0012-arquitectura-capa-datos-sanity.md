# 0012 — Arquitectura de la capa de datos Sanity

- **Fecha:** 2026-09-18
- **Estado:** Vigente

## Contexto

La web consume contenido de Sanity desde varios componentes (listados, destacados, ficha de detalle, mapa del sitio, footer). Antes de que esa capa creciera más (Materials, Formacions, Tallers, Bio), hacía falta fijar tres decisiones estructurales que ya se habían tomado de facto durante la conexión Sanity↔Astro (sesión 2026-09-17) pero nunca se habían documentado como decisión permanente, solo como proceso en `daily.md`.

## Decisión

### 1. `src/lib/` para integración con servicios externos, `src/utils/` para ayudantes genéricos

`src/utils/` contiene funciones sin dependencia de ningún servicio externo (`slugify.ts`, `i18n.ts`, `defineThemeConfig.ts`). `src/lib/` contiene la integración con Sanity (`sanity/client.ts`, `sanity/catalogItemsQuery.ts`, `sanity/siteSettingsQuery.ts`, `sanity/renders/portableTextRender.ts`). Un archivo cambia de sitio si cambia de motivo: lógica genérica reutilizable vs. acoplamiento a la API/schema de un servicio concreto.

### 2. Los datos se remodelan a `{slug, data}`, nunca se exponen tal cual vienen de Sanity

`CatalogItem` (`catalogItemsQuery.ts`) no es el documento crudo de Sanity (que mezcla `_id`/`_type`/`_rev`/`_createdAt` con los campos de contenido) — la proyección GROQ (`catalogItemProjection`) lo reforma a `{slug: string, data: {title, subtitle, category, tags, image, imageAlt, descriptionLong, ...}}`. Separa "cómo se identifica el item" de "su contenido", para que el resto del front (`Card`, `getTags`, componentes de listado) no necesite conocer los campos internos de Sanity.

### 3. Una función parametrizada por categoría, no una función por categoría

`getCatalogItemsByCategory(locale, category)` sustituye a lo que habrían sido `getProjects()`/`getMaterials()`/`getFormations()`/`getWorkshops()` por separado — las cuatro categorías comparten exactamente la misma query, cambiando solo el filtro. Mismo criterio para `getFeaturedCatalogItems(locale)` (cross-categoría, vía `featured == true`).

### 4. El `_type` de Sanity es `catalogItem`, no `project`

El tipo de documento cubre las 4 categorías del sitio (`projects`/`materials`/`formations`/`workshops`) desde su creación, pero se llamaba `project` — coincidía casi textualmente con `category: 'projects'` (el valor de una categoría concreta), lo que llevaba a confusión real al leer schema, `structure.ts` o las queries. Renombrado a `catalogItem` en todo el código (schema, desk structure del Studio, plugin de i18n, queries) y migrado en los datos (2026-09-18) — ver `daily.md` de esa fecha para el detalle de la migración.

## Alternativas consideradas

- **Fusionar `src/lib/` y `src/utils/` en una sola carpeta**: menos que decidir, pero mezcla ayudantes genéricos con código acoplado a Sanity — dificulta ver de un vistazo qué depende de un servicio externo y qué no. Descartado.
- **Exponer el documento de Sanity tal cual (sin remodelar a `{slug, data}`)**: ahorra la proyección GROQ, pero filtra el modelo interno de Sanity (`_id`, `_rev`, `_type`...) a componentes que no deberían necesitar saber nada de eso, y ata el front al schema exacto de Sanity sin capa intermedia. Descartado.
- **Una función de consulta por categoría** (`getProjects`, `getMaterials`...): más explícito por nombre, pero cuatro funciones idénticas salvo el filtro — duplicación pura. Descartado (YAGNI/DRY).
- **Mantener el `_type` como `project`**: coste cero de migración, pero perpetúa la confusión con `category: 'projects'` y se vuelve más cara de arreglar cuanto más contenido real haya. Se decidió pagar el coste de migración ahora, con el dataset aún casi vacío de contenido real, en vez de más adelante.

## Consecuencias

- Cualquier función nueva de consulta a Sanity debe seguir el mismo patrón: parametrizada por lo que varía, no una función por caso.
- Cualquier dato nuevo expuesto al front desde Sanity debe pasar por una proyección GROQ explícita (forma `{slug, data}` o equivalente), nunca el documento crudo.
- El `_type` `catalogItem` es ahora la única fuente de contenido de catálogo del sitio — Materials/Formacions/Tallers, cuando se construyan sus vistas, reutilizan `getCatalogItemsByCategory` y `CatalogItem`, no crean su propio tipo ni su propia función de consulta.
- Documentos ya existentes en `production` bajo `_type: "project"` fueron migrados (2026-09-18); cualquier backup o dataset anterior a esa fecha sigue teniendo el tipo antiguo.

## Nota (2026-09-20): dos proyecciones, tarjeta y detalle

`CatalogItem` (`catalogItemsQuery.ts`) es ahora solo la forma de **tarjeta**: `title`, `subtitle`, `image`, `imageAlt`, `category`, `subcategory`, `tags`, `myWork` y `author`. El documento completo es `CatalogItemDetail` (`catalogItemDetailQuery.ts`), que se construye a partir de los mismos campos de tarjeta (`catalogItemCardFields`) y añade descripción larga, autoría institucional, año, enlace externo, vídeos, galería, documentos, botón, `createdBy`, `designedBy` y secciones (los campos de archivo llegan resueltos a su URL). Las listas y las páginas de tarjeta usan `getCatalogItemsByCategory` / `getFeaturedCatalogItems`; la ficha usa `getCatalogItemDetailsByCategory`, una consulta por categoría e idioma. Sigue vigente la forma `{slug, data}`.

