# Radical Clarity — Clara Portfolio

> Este documento sustituye a las versiones previas (AGENTS.md del proyecto + AGENTS.md heredado del starter + notas sueltas del Sprint). Es la única fuente de verdad a partir de hoy.

## Contexto

Portfolio profesional para Clara Martínez Hernández, educadora social, formadora e investigadora en educación afectivosexual, perspectiva de género y transformación comunitaria.

- **Idioma principal: catalán.** Español preparado en la estructura de rutas, sin contenido todavía (fallback automático a CAT). *(Si en algún momento se decide lo contrario, hay que actualizar este párrafo y el ADR-004 — no dejar los dos idiomas circulando en distintos documentos.)*
- Sitio sencillo, pensado para lanzarse rápido, accesible (WCAG 2.2 AA) y con SEO cuidado.

## Stack

- Astro + Accessible Astro Starter (base, en `main`, sin la rama de pruebas de colores fusionada)
- Tailwind CSS 4
- Sanity como CMS headless
- Cloudflare Pages para hosting
- Web3Forms para el formulario de contacto
- GitHub para versionado — repo del cliente, tú como colaboradora

## Base legal / atribución

- El starter y `accessible-astro-components` son **MIT**. No hace falta atribución visible en la web pública.
- **Conservar el archivo `LICENSE` del starter en la raíz del repo, sin tocar.**
- Reescribir el `README.md` del starter por uno propio del proyecto (quitar badges, demo, roadmap de incluud).

## Qué se queda del starter 
- Infraestructura de accesibilidad: skip links, landmarks, foco visible, `prefers-reduced-motion`, toggles de modo oscuro/alto contraste
- `SiteMeta.astro` (SEO)
- `@astrojs/sitemap`
- Content Collections (para `project`)
- Componentes de formulario con validación (`Form`, `Input`, `Textarea`, `Checkbox`, `Radio`, `Fieldset`)
- Página 404 personalizada
- ESLint + `eslint-plugin-jsx-a11y`, Prettier

## Decisiones de diseño

- Paleta: ver DESIGN.md
- Tipografías: Space Grotesk (display/headlines/labels) + Hanken Grotesk (body) — sustituyen a Atkinson Hyperlegible
- Estilo: Minimalist-Brutalist Contemporary
  - `border-radius: 0` en todos los elementos
  - Sin `box-shadow` ni `drop-shadow`
  - Bordes 1px solid `#0A0A0A` (hairline)
  - Sin gradientes decorativos, sin blur ni translucidez
  - Ángulos rectos estrictos
- Mantener el sistema de accesibilidad del starter (no eliminar)
-  Priorizar accesibilidad básica (contraste, alt text, HTML semántico)

### border-radius — resuelto correctamente esta vez
En la rama de pruebas se usó `* { border-radius: 0 !important }` global. **No repetir ese approach en la versión definitiva.** Antes de tocar CSS, comprobar si los componentes de `accessible-astro-components` aceptan `class`/`style` por props para pasar `border-radius: 0` de forma nativa. Si no lo aceptan, documentar la excepción como ADR (no como parche silencioso).

### Tokens problemáticos (NO usar como texto)
- `outline-variant` (#c4c7c7): ratio 1.62:1 — solo bordes decorativos
- `outline` (#747878): ratio 4.24:1 — solo texto ≥24px
- `#FAFAFA` sobre `#F5CCD4`: ratio 1.39:1 — nunca usar

### Requisitos WCAG AA
- Texto normal (<24px o <18.67px bold): mínimo 4.5:1
- Texto grande (≥24px o ≥18.67px bold): mínimo 3:1
- Combinaciones seguras verificadas en DESIGN.md

## Estructura de páginas

- Inicio
- Sobre mí (fase 2)
- Proyectos
- Materiales *(fase 2)*
- Formaciones *(fase 2)*
- Talleres *(fase 2)*
- Contacto

**Fase 1 (lanzamiento):** solo Inicio, Proyectos y Contacto.

## Schema de Sanity

### `project`
- `title` (string, obligatorio)
- `slug` (slug, automático desde título)
- `description` (text, obligatorio)
- `image` (image, alt text obligatorio)
- `category` (string: "Guia Didàctica", "Taller", "Investigació", etc.)
- `year` (string, ej: "2024")
- `tags` (array de string, opcional)
- `externalLink` (url, opcional)

### `siteSettings` (singleton)
- `siteName` (string)
- `shortBio` (text)
- `profileImage` (image, alt text obligatorio)
- `socialLinks` (array: platform + url)
- `contactEmail` — **pendiente: pedir a Clara**
- `phone` — **pendiente: pedir a Clara (¿se publica o no?)**
- `address` — **pendiente: pedir a Clara (¿se publica o no?)**
- `welcomeText` — **pendiente: pedir a Clara**

## i18n

- Rutas: `/` para catalán (default, sin prefijo), `/es/` para español (`prefixDefaultLocale: false`)
- Fallback automático a CAT si falta traducción en ES
- **Sin persistencia por cookie.** Selector visible en el navbar, cada visita empieza en catalán salvo que la URL indique lo contrario. Simplifica el desarrollo y evita banner de cookies.
- **Regla: todos los textos visibles deben traducirse** (o quedar claramente marcados como pendientes) antes de cada commit — navegación, Hero, Footer, descripciones, proyectos, componentes, botones, labels
- Antes de cada commit: verificar que no queden textos en inglés del starter ni castellano mezclado sin querer

## Imágenes

- Alt text descriptivo obligatorio en Sanity para cada imagen de proyecto
- Imágenes decorativas: `alt=""`
- Formatos recomendados: WebP o JPG
- Astro gestiona lazy loading automáticamente

## Comandos

- `npm run dev` → servidor de desarrollo local
- `npm run build` → build de producción (**validar siempre antes de dar algo por terminado**)
- `npm run preview` → preview del build en local

## Flujo de trabajo (git)

- En local se trabaja en ramas de tarea (`feat/`, `fix/`, `refactor/`, `docs/`)
  creadas desde `dev`, que se mergean a `dev` cuando están listas.
- Siempre se comprueba que **corre y compila** (`npm run build`) antes de subir una rama.
- Cloudflare construye automáticamente cualquier rama subida a GitHub y da una
  URL de preview para comprobar que todo funciona.
- Solo cuando `dev` esté en un punto que ya se pueda entregar o mostrar, se hace
  el PR de `dev` a `main`. Si el PR ok → **squash & merge**; después se
  actualiza `main` en local y se mergea `main` en `dev` para continuar.
  En Cloudflare la **Production branch** será `main`.
- Mensajes de commit en formato convencional: `feat(scope): subject`, `fix(scope): subject`, `docs`, `style`, `a11y`, `chore`
- Nunca hacer commit sin parar primero a revisar el cambio

## Reglas de código

- Naming en inglés: clases PascalCase, métodos/funciones camelCase,
  variables/IDs descriptivos. Sin comentarios que expliquen el "qué".
- Estructura coherente de carpetas: mismo patrón en cada módulo/entidad nueva.
- Configuración por variables de entorno (12-Factor). Nada hardcodeado;
  valores nuevos → documentarlos en `.env.example`.
- DRY/KISS/YAGNI: extraer duplicados, no sobre-diseñar, no construir "por si acaso".
- Evidencias y documentación técnica (logs, capturas, notas de troubleshooting,
  ADRs): sin datos personales del sistema — usar `$USER`, `~/`, redacción
  impersonal. Excepción: `docs/private/daily.md` — ver su regla en
  "Documentación de decisiones".
- Atribución de autor en imágenes

### Reglas de documentación
- Actualizar `docs/adr/` cuando se tome una decisión técnica nueva (formato: ADR-XXX, fecha, estado, contexto, decisión, consecuencias)
- Actualizar `docs/private/daily.md` al final de cada sesión
- Numerar ADR de forma incremental
- Mantener sesiones en orden cronológico inverso (más reciente arriba)

## Reglas generales

- Siempre correr `npm run build` para validar antes de dar algo por terminado
- Priorizar accesibilidad básica (contraste, alt text, HTML semántico)
- Un componente a la vez, no refactors grandes de golpe
- Cuando algo no esté claro en el diseño, preguntar antes de implementar

## Prohibiciones
- No usar librerías fuera del stack ni añadir dependencias sin consultar y validar.
- No ignorar errores de API ni devolver respuestas silenciosamente vacías.
- No silenciar errores con try-catch vacío ni hardcodear resultados para
  simular que algo funciona.
- **No borrar comentarios sin preguntar primero.** Los comentarios JSDoc (`@description`, `@param`, etc.) pueden usarse para accesibilidad (screen readers) o herramientas de análisis. Si un comentario parece innecesario, preguntar antes de eliminarlo.

## Veracidad y verificación

- Nunca afirmes que algo funciona sin haberlo ejecutado. No digas "esto debería funcionar" como si fuera un hecho.
- Antes de usar una función, endpoint o archivo, búscalo con las herramientas
  (grep/read). No asumas su firma ni su ubicación.
-  Si no entiendes lo que pido pregntame cualquier duda que tengas, NUNCA intentes adivinar lo que he querido decir pregunta para confirmar.
- Está PROHIBIDO modificar un test, borrar un assert o cambiar un valor
  esperado para que pase, salvo petición explícita del usuario en ese mensaje.
- Si un resultado no es el esperado y no encuentras la causa, dilo:
  "no consigo que pase, la causa probable es X necesito más información / decisión del usuario" — no camufles el síntoma. Si no encuentras la causa después de intentarlo para e informa de lo que ocurre.
- Al reportar una tarea terminada, incluye el output real que lo demuestra, no un resumen de lo que "debería" pasar.
- Si no estás seguro de un dato, dilo explícitamente y no rellenes con la respuesta más plausible.

## Git / GitHub

Flujo por tarea (**nunca commitear ni pushear directamente en `main` ni en `dev`**):

1. Actualizar dev: `git switch dev && git pull`
2. Crear rama de tarea: `git switch -c <tipo>/<nombre-corto-en-ingles>`
   (`feat/`, `fix/`, `refactor/`, `docs/`)
3. Trabajo + commits en la rama (respetando la regla PARAR de abajo).
   Siempre comprobar que **corre y compila** (`npm run build`) antes de subir.
4. Subir la rama: `git push -u origin <rama>`
5. Cloudflare Pages construye automáticamente esa rama subida a GitHub y da
   una **URL de preview** para comprobar que todo funciona — sin tocar
   producción ni pedir que se mergee nada. Verificar el preview en esa URL.
6. Cuando la rama esté lista, abrir Pull Request a `dev` con `gh pr create`:
   título y descripción los redacta el agente y comparte el URL para revisión.
   - Descripción breve (3-6 líneas o bullets), en qué cambia y por qué —
     no un changelog de cada paso intermedio.
   - Sin narrar el proceso de trabajo (typos corregidos, archivos
     descartados antes de llegar a git, retoques de formato menores).
   - Un lector que no siguió la sesión debe entender el PR en 20 segundos.
7. El agente monitoriza la CI del PR (`gh pr checks`) y avisa cuando está
   verde; si falla, corregir con más commits en la misma rama
8. Con CI verde: revisión y merge a `dev` (squash & merge), borrar rama remota
9. Volver a dev: `git switch dev && git pull && git branch -d <rama>`

### Promoción a producción (dev → main)

- `dev` es el entorno de pruebas. Solo cuando `dev` esté en un punto que ya se
  pueda entregar o mostrar, se abre el PR de `dev` a `main`.
- Si el PR ok: **squash & merge** desde GitHub.
- En local se actualiza `main` (`git switch main && git pull`) y después se
  mergea `main` en `dev` (`git switch dev && git merge main && git push`) para
  continuar trabajando desde un `dev` al día.

### Cloudflare Pages

- La **Production branch** en Cloudflare será `main`:
  - Cada push a `main` → despliega al dominio de producción real
    (`clara-martinez-website.pages.dev` o el dominio real cuando esté).
  - Cada push a cualquier otra rama (incluida `dev`) → genera automáticamente
    un preview deployment con su propia URL única, sin tocar producción ni
    pedir que se mergee nada.
- Aliases automáticos por rama:
  - `main` → `clara-martinez-website.pages.dev`
  - `dev` → `dev.clara-martinez-website.pages.dev` + una URL con hash único
    por cada commit.

- **Antes de aplicar cualquier cambio de código**: explicar brevemente qué
  se va a hacer y por qué, en el mismo mensaje donde se aplica. Si el
  usuario pregunta "qué está pasando" después, es señal de que la
  explicación fue insuficiente — no repetir el mismo nivel de detalle,
  ampliarlo.

- **PARAR y esperar aprobación explícita antes de**:
  - hacer commit (mostrar `git status` + `git diff`)
  - cualquier cambio que afecte a arquitectura, estructura de archivos,
    o decisiones con trade-offs (ej. mover config, cambiar de librería,
    tocar CI)
  - cualquier cambio que no se pueda deshacer fácilmente

  Para ediciones menores dentro de una tarea ya acordada (fix de un bug
  concreto, ajuste de una función ya discutida), no es necesario parar en
  cada paso — basta con explicar qué se hizo y por qué al terminar.
- **Organizar los cambios pensando en los commits desde el inicio de cada
  tarea**: definir las unidades de cambio antes de tocar código, agrupar los
  ficheros por commit coherente y anunciárselo al usuario al presentar el plan.
- `main` (y por convención `dev`) están protegidas en GitHub (PR obligatorio):
  si un push directo es rechazado, es el comportamiento esperado.
- Conventional Commits en inglés: `feat:`, `fix:`, `docs:`, `refactor:`,
  `test:`, `chore:`. Un commit = un cambio completo y coherente. Salvo si el usuario indica otra cosa.
- Si un PR necesita resolver conflictos para el *squash & merge*: rebase local
  sobre `dev` actualizada resolviendo DENTRO del commit afectado, `git fetch` y
  `push --force-with-lease`. El resolvedor web de GitHub no repara commits
  intermedios.
- CI (a configurar): si existe `.github/workflows/ci.yml`, corre lint + build
  en cada push y PR a `dev` y `main`.

## Estilo de trabajo
- Cuando el usuario pregunte si algo es posible o cómo funciona, **explica primero** sin ejecutar nada.
- Solo ejecuta acciones cuando el usuario lo pida explícitamente.
- Si necesitas investigar (leer archivos, buscar en el código), hazlo pero explica lo que encuentras antes de actuar.
-  **Si una tarea toca más archivos de los informados, parar y avisar antes de continuar.** Ejemplo: si se informa "voy a actualizar Footer.astro" y eso implica también tocar Layout, Navigation, pages, etc., informar antes de modificar los archivos adicionales.

## Documentación de decisiones

- **ADRs** en `docs/adr/NNNN-titulo-corto.md` (formato: Fecha, Estado,
  Contexto, Decisión, Alternativas). Índice en `docs/adr/README.md`.
  Solo para decisiones que cambian el diseño del proyecto; ante la duda, preguntar.
  Si un ADR sustituye otro: actualizar el Estado del antiguo, nunca borrarlo.
- **Diario** en `docs/private/daily.md`: asiento al cierre de cada sesión. Lo redacta
  el agente, pero es diario de portfolio, no un PR.
  - Estructura por días: un bloque `## AAAA-MM-DD` por jornada con secciones
    temáticas (qué se hizo, decisiones, verificación, conocimiento
    generado); sin marcas de sesión tipo mañana/tarde/noche.
  - Aquí SÍ vale narrar el proceso: qué problema apareció, por qué se tomó
    una decisión y no otra, qué se probó y no funcionó.
  - Puede incluir nombre propio y voz personal — no aplica la regla de
    datos personales de las evidencias técnicas.
  - Resume el «qué fue» en una línea y enlaza al PR/issue en vez de repetirlo.
  - Objetivo: que quien lo lea entienda el criterio detrás de las decisiones,
    no solo el resultado.

