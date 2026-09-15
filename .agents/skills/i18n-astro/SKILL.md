---
name: i18n-astro
description: Patrones de internacionalización CA/ES en Astro SSG de este proyecto — router unificado, generación de rutas traducidas, helper getHref, y gotchas ya resueltos de getStaticPaths. Úsala siempre que toques rutas, enlaces internos, textos visibles, o el diccionario ca.json/es.json.
---

# i18n — Radical Clarity

## 1. Configuración

- Rutas: `/` para catalán (default, sin prefijo), `/es/` para español (`prefixDefaultLocale: false` en `astro.config.mjs`).
- Fallback automático a CAT si falta traducción en ES.
- **Sin persistencia por cookie.** Selector visible en el navbar (`LanguagePicker.astro`); cada visita empieza en catalán salvo que la URL indique lo contrario. Decisión deliberada: simplifica el desarrollo y evita banner de cookies.
- Diccionarios: `ca.json` + `es.json`, consumidos vía helper `src/utils/i18n.ts` (`getLangFromUrl` + `useTranslations`).

## 2. Router unificado

`src/pages/[...slug].astro` gestiona **todas** las rutas del sitio (páginas estáticas y proyectos) vía `getStaticPaths` + `routes.ts`. No dupliques páginas manualmente bajo `src/pages/es/` — genera conflicto con el router.

Las rutas de proyectos se generan en ambos idiomas desde el mismo router: `/projectes/project-01` (CA) y `/es/proyectos/project-01` (ES). Los directorios internos se mantienen **en inglés** (`projects/`, `contact/`); las rutas visibles se traducen vía los JSONs de diccionario.

## 3. `getHref()` — enlaces internos

Función centralizada en `src/utils/i18n.ts`, usada por **todos** los componentes con enlaces (`NavigationItems`, `Footer`, `Hero`, `Logo`, `FeaturedProjects`, `thank-you`, `404`, `PageHeader`). No dupliques la lógica de construir la URL traducida en un componente nuevo — importa y usa `getHref()`.

`getHref()` recibe el `locale` como parámetro explícito — no puede detectarlo internamente porque es una función pura. Si añades un componente nuevo con enlaces, pásale el locale desde donde ya lo tengas disponible (normalmente `Astro.currentLocale` o el que resuelva `getLangFromUrl`).

## 4. Gotchas ya resueltos (no los reinvestigues)

- **`getStaticPaths` no puede acceder a variables definidas fuera de la función** — hay que declararlas dentro de la función, o el build falla en silencio en ciertos casos.
- El i18n nativo de Astro en SSG **no genera rutas ES automáticamente** solo con `prefixDefaultLocale: false` — hace falta el router unificado + `getStaticPaths` explícito, tal como está montado ahora.
- Hot reload de Astro no detecta cambios en SCSS — si un cambio de estilo no se refleja en dev, refresca manualmente (F5) antes de asumir que hay un bug.

## 5. Regla de contenido antes de cada commit

Todos los textos visibles deben estar traducidos (o quedar claramente marcados como pendientes): navegación, Hero, Footer, descripciones, proyectos, componentes, botones, labels. Antes de cada commit, verifica que no queden textos en inglés del starter ni castellano mezclado sin querer en las páginas en catalán.
