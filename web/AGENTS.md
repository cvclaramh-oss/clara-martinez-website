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

## Qué se queda del starter y qué se quita

**Se queda:**
- Infraestructura de accesibilidad: skip links, landmarks, foco visible, `prefers-reduced-motion`, toggles de modo oscuro/alto contraste
- `SiteMeta.astro` (SEO)
- `@astrojs/sitemap`
- Content Collections (para `project`)
- Componentes de formulario con validación (`Form`, `Input`, `Textarea`, `Checkbox`, `Radio`, `Fieldset`)
- Página 404 personalizada
- ESLint + `eslint-plugin-jsx-a11y`, Prettier

**Se quita (no forma parte de la estructura de páginas del proyecto):**
- Todo el blog (`src/pages/blog/`, content collection de posts, imágenes de `public/posts/`)
- Página showcase `/accessible-components` (era referencia de desarrollo, no producción)
- Launcher (ya eliminado en sesión 1)
- Página `color-contrast.astro`: decidir si se deja oculta como herramienta interna o se elimina 

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
- Formatos recomendados: WebP o JPG, mínimo 1200px de ancho
- Astro gestiona lazy loading automáticamente

## Comandos

- `npm run dev` → servidor de desarrollo local
- `npm run build` → build de producción (**validar siempre antes de dar algo por terminado**)
- `npm run preview` → preview del build en local

## Flujo de trabajo (git)

- Trabajo en `main` con commits pequeños y frecuentes, uno por componente o bloque funcional.
- Excepción: cambios estructurales grandes (configuración de i18n, conexión de Sanity, cambio de paleta/tipografía global) van en rama propia (`feat/nombre-corto`) y se fusionan a `main` solo después de correr `npm run build` sin errores y revisar visualmente.
- Mensajes de commit en formato convencional: `feat(scope): subject`, `fix(scope): subject`, `docs`, `style`, `a11y`, `chore`
- Nunca hacer commit sin parar primero a revisar el cambio

## Mi nivel técnico

- Experiencia fuerte en lógica/backend
- Poca experiencia en CSS/Tailwind y frontend visual — explicar cambios de estilo con detalle
- Primera vez con Astro
- Prefiero cambios incrementales, un componente a la vez

## Documentación de proyecto

- `docs/ADR.md` — decisiones de arquitectura (registrar cada decisión técnica importante: contexto, estado, consecuencias)
- `docs/private/sesiones.md` — diario de sesiones (objetivo, hecho, decisiones, pendiente, notas)

### Reglas de documentación
- Actualizar `ADR.md` cuando se tome una decisión técnica nueva (formato: ADR-XXX, fecha, estado, contexto, decisión, consecuencias)
- Actualizar `sesiones.md` al final de cada sesión
- Numerar ADR de forma incremental
- Mantener sesiones en orden cronológico inverso (más reciente arriba)

## Reglas generales

- Siempre correr `npm run build` para validar antes de dar algo por terminado
- Priorizar accesibilidad básica (contraste, alt text, HTML semántico)
- Un componente a la vez, no refactors grandes de golpe
- Cuando algo no esté claro en el diseño, preguntar antes de implementar
- Actualizar `docs/ADR.md` y `docs/sesiones.md` al final de cada sesión

## Pendientes abiertos (revisar antes de avanzar más)

- [ ] Cuentas creadas y verificadas: Sanity, Cloudflare, Web3Forms
- [ ] Campos de `siteSettings` sin definir: email, teléfono, dirección, texto de bienvenida
- [ ] Resolver `border-radius` sin `!important` global (ver sección de diseño)
