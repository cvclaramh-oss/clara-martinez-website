---
name: i18n-astro
description: Patrones de internacionalización CA/ES en Astro SSG de este proyecto — router unificado, generación de rutas traducidas, helper getHref, y gotchas ya resueltos de getStaticPaths. Úsala siempre que toques rutas, enlaces internos, textos visibles, o los textos de `src/i18n/ui.ts`.
---

# i18n — Radical Clarity
> Este documento describe patrones ya implementados en sesiones anteriores. Antes de asumir que algo sigue siendo así, verifícalo contra el código real — Comprobaciones rápidas:
> - Router unificado activo → confirma que `src/pages/[...slug].astro` existe y que **no** hay `src/pages/es/` duplicando rutas manualmente.
> - `getHref()` centralizada → confirma que está en `src/utils/i18n.ts` y que los componentes la importan de ahí (no lógica de URL repetida en el propio componente).
> - Diccionario → confirma que `src/i18n/ui.ts` existe y tiene la clave esperada (`t()` solo acepta claves de ese archivo) antes de dar por hecho un texto traducido.
>
> Si algo no coincide con lo descrito aquí, avisa al usuario antes de seguir — puede ser una skill desactualizada, no un bug tuyo.

## 1. Configuración

- Rutas: `/` para catalán (default, sin prefijo), `/es/` para español (`prefixDefaultLocale: false` en `astro.config.mjs`).
- Fallback automático a CAT si falta traducción en ES, por dos mecanismos distintos:
  - Rutas: `fallback: { es: 'ca' }` en `astro.config.mjs`.
  - Textos: `t()` devuelve el texto catalán si falta la clave en `es`, y la propia clave si falta en los dos.
- **Sin persistencia por cookie.** Selector visible en el navbar (`LanguagePicker.astro`); cada visita empieza en catalán salvo que la URL indique lo contrario. Decisión deliberada: simplifica el desarrollo y evita banner de cookies.
- Cómo resuelve el selector la URL del otro idioma: en páginas estáticas usa `localizeUrl()`; en fichas usa `getAlternateItemHref()` (`src/lib/sanity/translationsQuery.ts`), porque el slug de una ficha es distinto en cada idioma y no se puede traducir segmento a segmento. Si no encuentra la traducción, vuelve a `localizeUrl()`.
- Diccionario: `src/i18n/ui.ts`, un objeto plano `as const` con un bloque `ca` y otro `es` (este tipado desde `ca`, así que ambos comparten exactamente las mismas claves), consumido vía helper `src/utils/i18n.ts` (`getLangFromUrl` + `useTranslations`). `t()` solo acepta `TranslationKey`: una clave mal escrita es un error de `astro check`. Convención de claves (fuente de verdad: la cabecera de `ui.ts`): una clave por concepto, nombrada por lo que es y no por dónde se usa; prefijo solo para texto propio de una zona (`footer.rights`); los nombres de página son `<page>.label`.

## 2. Router unificado

`src/pages/[...slug].astro` gestiona **todas** las rutas del sitio (páginas estáticas, listados paginados, páginas por etiqueta `/<catálogo>/etiqueta/<slug>` — ADR 0019 — y fichas) vía `getStaticPaths` + `routes.ts`, y reparte cada `pageType` a una vista de `src/views/`. No dupliques páginas manualmente bajo `src/pages/es/` — genera conflicto con el router.

Excepción: `src/pages/404.astro` es una página aparte; detecta el idioma por la URL con `getLangFromUrl`.

Las fichas se generan en ambos idiomas desde el mismo router: `/projectes/<slug>-ca` (CA) y `/es/proyectos/<slug>-es` (ES). Cada idioma tiene su propio slug; el cambio de idioma de una ficha va por `translationsQuery`, no por `localizeUrl`.

Las claves canónicas de `routes.ts` van **en inglés** (`projects`, `contact`, `materials-guides`…); los segmentos visibles se traducen ahí por idioma.

## 3. `getHref()` — enlaces internos

Función centralizada en `src/utils/i18n.ts`, usada por **todos** los componentes y vistas con enlaces internos (`grep -rl getHref src` para la lista actual). No dupliques la lógica de construir la URL traducida en un componente nuevo — importa y usa `getHref()`.

- `getHref(baseHref, isExternal, locale)` — para enlaces escritos en el código.
- `localizeUrl(path, locale)` — para traducir una URL ya existente; traduce los segmentos conocidos y conserva los desconocidos (slugs, números de página, etiquetas). La usan `LanguagePicker` y `translationsQuery`; `getHref()` la envuelve.

`getHref()` recibe el `locale` como parámetro explícito — no puede detectarlo internamente porque es una función pura. Si añades un componente nuevo con enlaces, pásale el locale desde donde ya lo tengas disponible (normalmente `Astro.currentLocale` o el que resuelva `getLangFromUrl`).

## 4. Gotchas ya resueltos (no los reinvestigues)

- **`getStaticPaths` no puede acceder a variables definidas fuera de la función** — hay que declararlas dentro de la función, o el build falla en silencio en ciertos casos.
- El i18n nativo de Astro en SSG **no genera rutas ES automáticamente** solo con `prefixDefaultLocale: false` — hace falta el router unificado + `getStaticPaths` explícito, tal como está montado ahora.
- Hot reload de Astro no detecta cambios en SCSS — si un cambio de estilo no se refleja en dev, refresca manualmente (F5) antes de asumir que hay un bug.

## 5. Regla de contenido antes de cada commit

Todos los textos visibles deben estar traducidos (o quedar claramente marcados como pendientes): navegación, Hero, Footer, descripciones, proyectos, componentes, botones, labels. Antes de cada commit, verifica que no queden textos en inglés del starter ni castellano mezclado sin querer en las páginas en catalán.
