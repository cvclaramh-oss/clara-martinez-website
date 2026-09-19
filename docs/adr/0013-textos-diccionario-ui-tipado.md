# 0013 — Textos del sitio en un diccionario `ui.ts` tipado

- **Fecha:** 2026-09-20
- **Estado:** Vigente
- **Sustituye en parte a:** [0006](0006-i18n-cat-es.md) (solo la decisión «Textos en JSONs»)

## Contexto

El ADR 0006 fijó que los textos vivieran en `src/i18n/ca.json` y `src/i18n/es.json`, con claves anidadas (`nav.home`, `contact.form.send`) y un helper `t()` que aceptaba cualquier `string`. Con el sitio ya construido, ese esquema mostró problemas concretos:

- **Textos repetidos con varias claves.** El nombre de una página existía en el menú, el pie, las migas de pan, el mapa del sitio y el título (`nav.home`, `footer.home`, `breadcrumb.home`, `sitemap.pages.home.title`...), con riesgo de que divergieran.
- **Claves muertas** que ningún componente usaba (`hero.subtitle`, `nav.submenu`, la mayoría de `breadcrumb.*`...).
- **Ninguna comprobación de claves.** Una clave inexistente compilaba y el visitante veía la clave literal en pantalla (ocurrió con `nav.home` durante una refactorización). `astro build` no comprueba tipos; solo lo hace `astro check`.
- **Los dos idiomas podían desincronizarse** sin aviso: `es.json` llegó a tener una clave que `ca.json` no tenía.
- **JSON no admite comentarios** ni una clave que sea a la vez un texto y un grupo (`contact` como nombre de página y como sección del formulario).

## Decisión

### 1. Un único archivo, `src/i18n/ui.ts`, con un objeto plano `as const`

Un bloque `ca` (fuente de verdad) y un bloque `es` tipado como `Record<keyof typeof ca, string>`: ambos idiomas tienen **exactamente** las mismas claves, y faltar o sobrar una es un error de `astro check`. Es la receta de i18n que documenta Astro, con esa comprobación añadida.

### 2. Claves planas con puntos dentro del nombre

`'contact.form.send'` es **una** clave de texto, no un camino por objetos anidados. Así una clave `contact.label` puede coexistir con `contact.form.send` sin colisión, y no hace falta ningún tipo recursivo (`DotPaths`) ni una función que recorra niveles.

### 3. `t()` solo acepta claves que existen

`TranslationKey = keyof (typeof ui)['ca']`, y `t(key: TranslationKey)`. Los valores que llegan a `t()` de forma indirecta se tipan igual: `NavigationItem.label` en `defineThemeConfig.ts` y los mapas de `constants/constLabels.ts`. Una clave mal escrita es un error de `astro check`, que ya se ejecuta en el CI de cada PR.

### 4. Convenciones de nombres y de orden

- **Una clave por concepto**, nombrada por lo que es y no por dónde se usa (`home.label`, no `footer.home`).
- **El nombre de una página es `<página>.label`**, y se reserva `<página>.title` por si un encabezado necesita un texto distinto.
- **Solo llevan prefijo de zona los textos de una zona concreta** (`footer.rights`, `contact.form.send`).
- Secciones en este orden: metadatos SEO, datos personales, nombres compartidos, acciones comunes, accesibilidad de la navegación, pie, y `PAGES` con un bloque por página. Orden alfabético dentro de cada sección.

### 5. Se eliminan `ca.json`, `es.json` y `lookup()`

Ya no hay diccionarios JSON. `Locale` pasa a derivarse de `ui` (`keyof typeof ui`) y `useTranslations()` lee directamente de `ui`, con el catalán como idioma de reserva.

## Alternativas consideradas

- **Mantener el JSON anidado y añadir un tipo `DotPaths<T>`** para tipar las claves. Descartado: exige un tipo recursivo que mantener, no resuelve la colisión entre texto y grupo y sigue sin admitir comentarios.
- **Cada concepto una sola vez con sus dos idiomas al lado** (`home: { ca, es }`). Hace imposible olvidar un idioma, pero se aparta de la receta de Astro y obliga a cambiar la función `t()`. Descartado en favor de los dos bloques con `es` tipado desde `ca`.
- **Un archivo por idioma** (`ca.ts`, `es.ts`). Separa más, pero impide ver las dos traducciones de una clave a la vez. Descartado.
- **Una librería de i18n externa.** Añade una dependencia innecesaria para un sitio de dos idiomas (mismo criterio que en el ADR 0006).

## Consecuencias

- Una clave inexistente, o un idioma al que le falta o le sobra una clave, se detecta en `astro check` y en el CI.
- Hay una sola definición por concepto, y los textos se leen agrupados por página.
- `ui.ts` es código TypeScript, no un archivo de datos: cambiar un texto implica editar código.
- **`astro build` sigue sin comprobar tipos.** La protección depende de `astro check`, que se ejecuta en el CI de GitHub pero no en el build de Cloudflare Pages.
- Las claves con puntos no tienen jerarquía real: el orden por secciones es solo de lectura.
- Tailwind escanea todos los archivos, comentarios incluidos, buscando nombres de clase. Una palabra suelta en un comentario de `ui.ts` que sea una utilidad de Tailwind (`visible`, `hidden`, `block`...) añade CSS y cambia el hash del CSS de todas las páginas. Se detectó comparando `dist/`.
- La sección `Item detail` de `ui.ts` es provisional: agrupa los textos de las vistas de proyecto hasta que se construyan esas páginas.
