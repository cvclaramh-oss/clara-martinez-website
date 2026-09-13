# Modelo de datos y decisiones — Sanity Studio

Estado: **aprobado, fase 1 ejecutada** (schemas + estructura). Fecha: 2026-09-13.

Contexto: sitio de Clara Martínez. Repo del cliente `cvclaramh-oss/clara-martinez-website`. Studio: projectId `o65rl8jj`, dataset `production`, idiomas `ca`/`es`. Clara edita el contenido; Laura mantiene el código. **El frontend Astro todavía NO consume Sanity** (fase 2 pendiente).

## 1. Modelo de datos aprobado

### `project` — tipo único de contenido

Un solo tipo de documento para Proyectos, Materiales (4 subcategorías), Formaciones y Talleres. Todos se agrupan por `category`/`subcategory` pero comparten estructura → una sola plantilla de tarjeta y una de detalle en el frontend.

| Campo | Tipo | Obligatorio | Bloque | Notas |
|---|---|---|---|---|
| `language` | string | — | oculto | `initialValue: 'ca'`, lo gestiona el plugin i18n |
| `title` | string | ✔ | Targeta | Título de la miniatura |
| `subtitle` | string | ✔ | Targeta | "Subtítulo descriptivo" de la miniatura |
| `image` | image + `alt` | ✔ | Targeta | Imagen de portada de la miniatura |
| `slug` | slug (desde title) | ✔ | Targeta | Regex `^[a-z0-9-]+$` |
| `featured` | boolean (`false`) | — | Portada | Sale en la home |
| `featuredOrder` | number (≥0, `0`) | — | Portada | Menor = primero; empate → año descendente |
| `category` | string | ✔ | Taxonomia | Radio fijo: `projects` \| `materials` \| `formations` \| `workshops` (claves neutrales; los títulos en el editor son catalanes) |
| `subcategory` | string | solo si `category=materials` | Taxonomia | Claves: `guides` \| `games` \| `publications` \| `campaigns`. Oculto si no es materials |
| `tags` | array de string, únicos | — | Taxonomia | Etiquetas libres |
| `descriptionLong` | portable text (mínimo) | — | Detall | Negrita, cursiva, enlace, lista, h2 |
| `myWork` | text (plano) | — | Detall | |
| `institutionalAuthorship` | text (plano) | — | Detall | |
| `year` | string | — | Detall | Admite "2023" o "2023–24" |
| `externalLink` | url http/https | — | Detall | |
| `videos` | array `{title?, url XOR file(.mp4)}` | — | Multimèdia | 0..n; nunca url y file a la vez |
| `gallery` | array de images (`alt` ✔) | — | Multimèdia | Fotos adicionales de la página de detalle |
| `documents` | array `{title, file(pdf)}` | — | Multimèdia | 0..n, descargables |
| `button` | object | — | Botó | `visible` (default true) · `label` (default "Més informació", editable) · `type` (`link`\|`download`) · `url` XOR `file` según tipo. Nunca descarga y enlace a la vez |
| `createdBy` | text (plano) | — | Flex | |
| `designedBy` | text (plano) | — | Flex | "Dissenyat i maquetat per" |
| `sections` | array `{title, text}` | — | Flex | Bloques libres título+texto para cualquier campo futuro sin tocar código |

### `siteSettings` — configuración del sitio (singleton por idioma)

Documentos `siteSettings-ca` / `siteSettings-es` creados **por ID de documento** (no por el plugin i18n).

| Campo | Notas |
|---|---|
| `siteName` | Título del sitio |
| `subtitle` | Subtítulo/gancho (home) — **es el antiguo short-bio** |
| `bio` | portable text — texto de la página Bio |
| `profileImage` | Foto de perfil + `alt` obligatorio |
| `socialLinks` | Array de `socialLink` (`platform`, `url`) |
| `contactEmail` | Validación email |
| `cvFile` | PDF |

Eliminados vs. diseño anterior: `language` (sobra: el idioma ya está en el ID del documento), `shortBio` (absorbido por `subtitle`), `phone`, `address`, `welcomeText`.

## 2. Tabla de decisiones

| # | Decisión | Racional | Escape / futuro |
|---|---|---|---|
| 1 | **Tipo único `project`** para Proyectos/Materiales/Formaciones/Talleres | Estructura común + una plantilla de tarjeta y una de detalle; código simple | Si las páginas de detalle divergen mucho, separar tipos |
| 2 | **NavBar fija**: Projectes · Materials▾ · Formacions · Tallers · Bio · Contacte | Lo definió Clara | Bio/Contacto = estáticos desde siteSettings; 5ª categoría de página = cambio de código (página + menú) |
| 3 | **Miniatura siempre imagen+título+subtítulo** (obligatorios) | Grid mixto de la home mezcla tipos; todas las fichas iguales en la miniatura | |
| 4 | **Portada** = `featured` (bool) + `featuredOrder` (número) | Elegido sobre el listado manual en settings: menos mantenimiento editorial | Si Clara exige orden curado a mano, se añade sin cambiar el modelo |
| 5 | **Categorías y subcategorías fijas en código** (4+4) en fase 1 | Menos complejidad, barra estática, cero errores de tipeo | Fase 2: subcategorías dinámicas (GROQ `distinct` + barra generada) cuando se necesite añadir |
| 6 | **Etiquetas libres** con validación de no repetidas | Flexibilidad con control | |
| 7 | **`visibility` eliminado** | Se usa borrador/publicado de Sanity; el flag solo servía para ocultar sin publicar | Se reinstala en 10 min si hace falta |
| 8 | **Vídeo**: enlace externo XOR `.mp4` en Sanity | Ambos se renderizan en un mismo componente (diseño uniforme). YouTube en "no listado" se incrusta; privado total no | Cloudflare Stream si el proyecto crece (de pago) |
| 9 | **Galería** = fotos adicionales; **documentos** = PDF con título | Nomenclatura clara para Clara | |
| 10 | **Botón** con `label` editable (default) y tipo enlace/descarga exclusivo | Clara cambia textos sin código; validación evita "descargar y enlazar" a la vez | |
| 11 | **Flexibilidad de campos**: `elaboratPer`, `dissenyatPer` (tipados) + `sections[]` (bloques libres) | Estructura donde importa (grid/filtro) + libertad donde es prosa | |
| 12 | **Texto enriquecido SOLO en `descriptionLong` y `bio`** (mínimo) | Clara marca negritas/enlaces en el editor sin código; el render siempre es frontend (Tailwind) | Requiere renderizador PortableText al conectar el frontend |
| 13 | **i18n ca/es** duplicando documentos `project` | Plugin `document-internationalization`; coste aceptado: los medios se rellenan en cada idioma (el archivo se sube una vez, se referencia dos) | Si molesta: sacar medios a documento compartido referenciado |
| 14 | **`siteSettings` singleton por ID** (`siteSettings-{ca,es}`); sin campo `language` | El ID ya codifica el idioma | |
| 15 | **Studio organizado**: `structure.ts` (árbol: Tot el contingut / categorías / Materials↳subcats / Configuració CA·ES) + camposets en el formulario | Clara ve "carpetas", no un tipo genérico | |
| 16 | **Renombrar campos: ventana gratis AHORA** (sin datos reales + frontend sin conectar) | Los datos no siguen el cambio de nombre automáticamente; se evita la migración | Congelar nombres al aprobar el contenido real; luego rename = migración de datos + refactor frontend (rescatable con `sanity migration`) |
| 17 | **Convención de nombres aplicada**: `name` (GROQ/código) = **inglés**; `title` visibles en el editor = **catalán**; claves de `value` = **inglés neutro** | Identificadores estables y neutros; la editora ve todo en catalán | Se aplicó en el rename inicial (dataset vacío verificado: 0 docs); congelar ahora |
| 18 | **Indirección valor↔etiqueta por construcción**: los `value` son claves inmutables; las etiquetas viven en el `title` del editor y en los diccionarios del frontend (`ca.json`/`es.json`) por valor | Renombrar una etiqueta —en el Studio o en la web— nunca requiere migrar datos | Solo si cambia una clave real: migración + refactor |
| 19 | **Sin rediseño visual** en la entrega de 7 días (MVD) | El style actual del starter ya es accesible; identidad después de la 1ª entrega | |

Infraestructura (Cloudflare, ramas, CI): ver `web/docs/private/daily.md` y `web/docs/private/cloudflare-pages-setup.md` (privados, gitignorados).

## 3. Fases

- **Fase 1 — HECHA**: schemas + `structure.ts` + build/lint verificados. Frontend intacto.
- **Fase 2**: conectar frontend↔Sanity (GROQ + grids + detalle + filtro Materiales + Bio/Contacto + PortableText).
- **Fase 3**: despliegue Cloudflare (ver setup doc) y carga de contenido real por Clara.
- **Después de la 1ª entrega**: reorganización general de la documentación (pendiente), identidad visual, README del repo.

## 4. Notas técnicas para quien toque el Studio

- UI del Studio y etiquetas (`title`) en **catalán**; los `name` (claves de GROQ/código) y los `value` (`category`, `subcategory`, `button.type`) en **inglés neutro** e inmutables (convención, decisiones 17–18).
- Los tipos auxiliares (`video`, `documentFile`, `section`, `link`) van anidados en `project.ts` o en tipos propios; `index.ts` solo exporta `project`, `siteSettings`, `socialLink` y `link`.
- `structure.ts` sustituye la estructura que antes vivía inline en `sanity.config.ts`; todas las consultas se construyen con **parámetros** (`$cat`, `$sub`), nunca interpolando valores en la query (evita rupturas con apóstrofes/acentos).
- Build: `npm run build` (`sanity build`). Lint: `npx eslint schemaTypes sanity.config.ts`.