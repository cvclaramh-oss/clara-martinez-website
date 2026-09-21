# Radical Clarity — Clara Portfolio

> Única fuente de verdad de comportamiento del agente. 
> Skills en `skills/`: conocimiento de dominio y procedimientos repetibles. Consúltalas, no las dupliques aquí.
> Estado real de infraestructura: siempre en la última entrada de `docs/private/daily.md`, nunca asumido desde este archivo.

## Protocolo de trabajo (léelo antes de tocar nada)

1. Antes de cambiar nada, para e informa: qué vas a hacer, por qué, en qué archivos y qué alternativas hay. Ve siempre paso a paso, un cambio cada vez, explicando el plan antes de cada paso.
2. Si un cambio toca varios archivos, para y pide confirmación antes de empezar; si toca más de los informados, para y avisa.
3. Si hay más de una opción razonable o algo no está claro, pregunta. No rellenes el hueco con lo más plausible.
4. No inventes contenido: nada de lorem ni de textos que parezcan reales. Si falta, márcalo `[PENDENT]` y anótalo en el diario.
5. No cambies configuración sin preguntar: `astro.config.mjs`, `sanity.cli.ts`, `package.json`, `.github/`, `.env*`, datasets, dependencias ni estructura de archivos.
6. No hagas commit ni push sin que Laura lo pida en ese mensaje. Commits de una línea en inglés, sin trailer; el `Co-authored-by` va en la descripción del PR.
7. Al terminar, enseña qué ha cambiado (archivos y resumen), la salida real de `npm run check` y `npm run build`, y qué NO se ha comprobado.
8. Laura revisa en Firefox: no generes capturas para ella salvo que las pida.
9. Una sesión conserva la fecha de inicio en `docs/private/daily.md`, aunque pase medianoche.
10. En un chat sin contexto, lee primero la última entrada de `docs/private/daily.md` y `git status`.

## Contexto

Portfolio profesional para Clara Martínez Hernández, educadora social, formadora e investigadora en educación afectivosexual, perspectiva de género y transformación comunitaria.

- **Idioma principal: catalán.** Infraestructura i18n completa y estable (rutas `/` CAT y `/es/` ES, fallback automático a CAT — ver `.agents/skills/i18n-astro/`). 
- Sitio sencillo, pensado para lanzarse rápido, accesible **WCAG 2.2 AA**  y con SEO cuidado.

## Stack

- Astro + Accessible Astro Starter · Tailwind CSS 4 · Sanity (CMS headless) · Cloudflare Pages (hosting) · Web3Forms (contacto) · GitHub (versionado)
## Base legal / atribución

- Starter y `accessible-astro-components`: MIT, sin atribución visible obligatoria en la web pública.
- Conservar `web/LICENSE` del starter, sin tocar.

## Skills disponibles — cuándo usar cada una

| Skill                                  | Úsala para                                                             |
| -------------------------------------- | ---------------------------------------------------------------------- |
| `.agents/skills/git-workflow/`         | Crear ramas, commits, PRs, CI, promoción dev→main                      |
| `.agents/skills/adr-daily-docs/`       | Decidir si algo necesita ADR, escribir uno, cerrar el diario de sesión |
| `.agents/skills/sanity-schema/`        | GROQ, componentes con datos de Sanity, CLI de Sanity, Studio           |
| `.agents/skills/i18n-astro/`           | Rutas, enlaces internos, textos visibles, diccionarios ca/es           |
| `.agents/skills/stitch-to-starter/`    | Traducir un diseño de Stitch: colores, tipografía, espaciado, contraste, modo oscuro |

Si una tarea toca dos dominios (p. ej. un componente nuevo con datos de Sanity y enlaces traducidos), consulta ambas skills, no son excluyentes.

## Comandos

- `npm run dev` → servidor local · `npm run preview` → preview del build local
- `npm run build` → build de producción — **validar siempre antes de dar algo por terminado**

## Reglas generales

- Comprobar siempre contraste, alt text y HTML semántico en cualquier tarea que toque UI, no solo las de diseño — son las verificaciones concretas del objetivo AA fijado arriba, no un nivel "reducido" de accesibilidad.
- Un componente a la vez, no refactors grandes de golpe.
- Cuando algo no esté claro en el diseño o el alcance, **preguntar antes de implementar** — no rellenar el hueco con la interpretación más plausible.

## Backend y tests

- **No hay backend propio.** Sanity (CMS) y Web3Forms (envío del formulario de contacto) son los únicos servicios externos que reciben o devuelven datos — no hay servidor propio que mantener ni testear como tal.
- "No ignorar errores de API" (ver Prohibiciones) se refiere a estos dos: si una query a Sanity o un envío a Web3Forms falla, el componente debe mostrarlo (o loguearlo visiblemente) — nunca fallar en silencio como si hubiera ido bien.
- **No hay suite de tests automatizados todavía.** La regla de no tocar tests sin permiso explícito (ver Veracidad) es una cláusula de seguridad que se activa *si* algún día hay tests — no implica crear una suite completa por defecto; para un sitio estático sin lógica de negocio, un suite unitario amplio sería sobre-ingeniería (ver DRY/KISS/YAGNI). Si el usuario pide añadir tests, aclarar primero qué se quiere cubrir (visual, a11y, build) antes de elegir herramienta.

## Prohibiciones

- No usar librerías fuera del stack ni añadir dependencias sin consultar y validar.
- No ignorar errores de API ni devolver respuestas silenciosamente vacías; no silenciar errores con try-catch vacío ni hardcodear resultados para simular que algo funciona.
- **No borrar nunca comentarios sin preguntar primero.** Los JSDoc (`@description`, `@param`, etc.) pueden servir para accesibilidad (screen readers) o herramientas de análisis.

## Veracidad y verificación

- Nunca afirmes que algo funciona sin haberlo ejecutado. No digas "esto debería funcionar" como si fuera un hecho.
- Antes de usar una función, endpoint o archivo, búscalo con las herramientas (grep/read) — no asumas su firma ni ubicación.
- Si no entiendes lo que se pide, pregunta — nunca adivines la intención.
- Prohibido modificar un test, borrar un assert o cambiar un valor esperado para que pase, salvo petición explícita del usuario en ese mismo mensaje.
- Si un resultado no es el esperado y no encuentras la causa: dilo explícitamente ("no consigo que pase, la causa probable es X, necesito más información / decisión del usuario") — no camufles el síntoma.
- Al reportar una tarea terminada, incluye el output real que lo demuestra, no un resumen de lo que "debería" pasar.
- Si no estás seguro de un dato, dilo explícitamente y no rellenes con la respuesta más plausible.

## Reglas de código

- Naming en inglés: clases PascalCase, métodos/funciones camelCase, variables/IDs descriptivos. Sin comentarios que expliquen el "qué".
- Estructura coherente de carpetas: mismo patrón en cada módulo/entidad nueva.
- Configuración por variables de entorno (12-Factor). Nada hardcodeado; valores nuevos → documentarlos en `.env.example`.
- DRY/KISS/YAGNI: extraer duplicados, no sobre-diseñar, no construir "por si acaso".
- Evidencias y documentación técnica (logs, capturas, notas de troubleshooting, ADRs): sin datos personales del sistema — usar `$USER`, `~/`, redacción impersonal. Excepción: `docs/private/daily.md` (ver `skills/adr-daily-docs/`).
- Atribución de autor en imágenes.

## Estilo de trabajo con el agente

- Si preguntas si algo es posible o cómo funciona: **explica primero, sin ejecutar nada.**
- Ejecuta acciones solo cuando el usuario lo pida explícitamente.
- Si necesitas investigar (leer archivos, buscar en el código), hazlo, pero explica lo que encuentras antes de actuar.
- **Si una tarea toca más archivos de los informados, para y avisa antes de continuar.**
- El usuario también edita archivos directamente, fuera del agente. Antes de dar por hecho el estado del repo (qué falta, qué se hizo), comprobar `git status`/`git diff` en vez de asumir que el árbol de trabajo coincide con la última acción del agente. Si aparecen cambios en staged o modificados que el agente no hizo, no asumas que es un error — pregunta o revisa el diff antes de continuar.

## Regla PARAR (resumen — detalle completo en `skills/git-workflow/`)

Pedir aprobación explícita antes de: hacer commit, cambios de arquitectura/estructura de archivos/dependencias, o cualquier cambio difícil de deshacer.
