---
name: git-workflow
description: Flujo de ramas, commits, Pull Requests y CI de este repo. Úsala SIEMPRE que vayas a crear una rama, hacer commit, abrir un PR, revisar CI, o mergear a dev o main — incluso si el usuario solo dice "sube esto" o "abre PR". También cúbrela si el usuario pregunta cómo promocionar dev a producción o qué pasa cuando falla la CI.
---

# Flujo de trabajo Git/GitHub — Radical Clarity

Nunca se commitea ni se pushea directamente en `main` ni en `dev`. Todo pasa por rama de tarea → PR.

## 1. Flujo por tarea

1. Actualizar `dev`: `git switch dev && git pull`
2. Crear rama desde `dev`: `git switch -c <tipo>/<nombre-corto-en-ingles>`
   - Tipos: `feat/`, `fix/`, `refactor/`, `docs/`
3. Trabajar y commitear en la rama (ver regla PARAR abajo). Antes de subir, comprobar siempre que **corre y compila**: `npm run build`.
4. Subir: `git push -u origin <rama>`
5. Cloudflare Pages construye automáticamente la rama subida y genera una URL de preview propia. **Verificar ahí antes de pedir revisión** — nunca en local únicamente si hay preview disponible.
   - ⚠️ Comprueba primero en `daily.md` (última entrada) si Cloudflare ya está conectado en este momento del proyecto. Si no lo está, el preview automático no existe todavía — usa `npm run preview` local como sustituto y dilo explícitamente.
6. Rama lista → abrir PR a `dev` con `gh pr create`. Tú (el agente) redactas título y descripción:
   - 3-6 líneas o bullets: qué cambia y por qué.
   - Sin narrar el proceso (typos corregidos, archivos descartados, retoques menores).
   - Un lector que no siguió la sesión debe entenderlo en 20 segundos.
1. Monitorizar CI: `gh pr checks`. Avisar cuando esté verde; si falla, parar e informar, corregir con más commits en la misma rama.
2. CI verde + revisión → **squash & merge**, borrar rama remota. Lo hago siempre yo salvo que te indique lo contrario.
3. Volver a `dev`: `git switch dev && git pull && git branch -d <rama>`.

## 2. Promoción a producción (dev → main)

- `dev` es el entorno de pruebas. Solo se abre PR `dev → main` cuando `dev` está en un punto entregable/mostrable.
- PR ok → squash & merge desde GitHub.
- En local: `git switch main && git pull`, luego `git switch dev && git merge main && git push` para seguir trabajando desde un `dev` al día.

## 3. Conventional Commits

Inglés, formato `tipo(scope): subject`: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `style`, `a11y`. Un commit = un cambio completo y coherente, salvo que el usuario indique otra cosa.

Organiza los cambios pensando en los commits **desde el inicio de la tarea**: define las unidades de cambio antes de tocar código, agrupa ficheros por commit coherente, y anúncialo al presentar el plan.

## 4. Regla PARAR — pedir aprobación explícita antes de

- Hacer commit: mostrar siempre `git status` + `git diff` primero y esperar el visto bueno. **No asumas que "seguir con la tarea" incluye permiso para commitear**.
- Cualquier cambio que afecte a arquitectura, estructura de archivos o decisiones con trade-offs (mover config, cambiar de librería, tocar CI).
- Cualquier cambio no fácilmente reversible.

Para ediciones menores dentro de una tarea ya acordada (fix de un bug concreto, ajuste de una función ya discutida) no hace falta parar en cada paso — basta explicar qué se hizo y por qué al terminar.

Si una tarea acaba tocando más archivos de los informados al usuario (ej.: "voy a actualizar Footer.astro" implica tocar Layout/Navigation/pages), **parar y avisar antes de continuar** con los archivos adicionales.

## 5. Conflictos en squash & merge

Si un PR necesita resolver conflictos: rebase local sobre `dev` actualizada, resolviendo DENTRO del commit afectado, luego `git fetch` y `push --force-with-lease`. El resolvedor web de GitHub no repara commits intermedios — no usarlo para esto.

## 6. Estado actual de branch protection y CI

- GitHub **no tiene protección de ramas activada** (ni `main` ni `dev`) — los merges vía PR son responsabilidad del equipo, no una restricción técnica. (Decisión de activarla: pendiente — comprobar en daily.md si cambió.)
- CI real está en `.github/workflows/cli.yml`, en la **raíz del repo** (GitHub Actions solo lee `.github/workflows/` de la raíz, no de `web/`). Ejecuta `npm ci` + `npm run build` en `web/` con Node fijado por `.nvmrc`, en cada push y PR a `main` y `dev`.

## 7. Antes de tocar código

Explica brevemente qué vas a hacer y por qué, en el mismo mensaje donde lo aplicas. Si el usuario pregunta "qué está pasando" después de una explicación, es señal de que fue insuficiente — la próxima vez amplíala, no repitas el mismo nivel de detalle.
