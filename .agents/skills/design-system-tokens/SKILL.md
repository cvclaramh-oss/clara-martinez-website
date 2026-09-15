---
name: design-system-tokens
description: Sistema de diseño Radical Clarity — invariantes de estilo, tokens de color, contraste WCAG AA y las excepciones conocidas de border-radius en accessible-astro-components. Úsala SIEMPRE antes de tocar CSS/SCSS, colores, tipografía, radios de borde, sombras, o cualquier componente visual, y también cuando el usuario pregunte "¿esto encaja con el diseño?" o "¿qué color uso aquí?".
---

# Sistema de diseño — Radical Clarity

> ⚠️ Este documento es la fuente de verdad *técnica* (qué invariantes respetar y por qué). Las referencias visuales completas (paleta, tipografía, espaciado) viven fuera de git, en:
> - `diseño/DESIGN.md` — sistema de tokens original (M3, 228 líneas)
> - `diseño/stitch_Design/` — prototipos vigentes (HOME_2/HOME_3/CONTACTO, `PROMPT-STITCH.md` con el modelo de contenido)
>
> **Nota de corrección:** versiones anteriores de AGENTS.md referenciaban `design/DESIGN_v2.md` y `design//` — esas rutas no existen; la carpeta real es `diseño/` (con esa grafía). Si en tu checkout local la carpeta tiene otro nombre, **avisa al usuario antes de asumir cuál es la correcta** — no adivines.

## 1. Qué es negociable y qué no

**Invariantes (nunca se rompen, comunes a todas las referencias):**
- Estilo *Minimalist-Brutalist Contemporary*: `border-radius: 0`, sin `box-shadow` ni `drop-shadow`, bordes hairline 1px, sin gradientes/blur/translucidez, ángulos rectos estrictos.
- Tipografías: **Space Grotesk** (display/headlines/labels) + **Hanken Grotesk** (body). Vía Google Fonts CDN por ahora (no autoalojadas todavía — revisable si RGPD lo exige).
- Sistema de accesibilidad heredado del starter: no se elimina nada (skip links, landmarks, foco visible, `prefers-reduced-motion`, toggles dark/alto contraste).
- Accesibilidad básica siempre: contraste, alt text, HTML semántico.

**Flexible (regla de mezcla):** el diseño de `diseño/stitch_Design/` (el más reciente) es la base por defecto para componer cualquier página, pero no es diseño final cerrado. Se permite tomar elementos de capturas aprobadas o de prototipos anteriores **solo cuando la base de hoy no resuelve un bloque concreto**.

**Ante cualquier duda de qué referencia gana → pregunta antes de implementar.** No hay jerarquía automática entre prototipos; el criterio es "¿qué versión está aprobada hoy?", y eso puede cambiar de sesión a sesión — comprueba la entrada más reciente de `daily.md` antes de asumir cuál es la vigente.

## 2. Tokens de color — fuente única

Todos los colores viven como literales hex en `@theme static`, en `src/styles/tailwind.css` (~50 tokens M3). **No los definas en ningún otro sitio** (`theme.config.ts` ya no tiene `colors`; `_root.scss` deriva directo de `@theme` con `oklch(from var(--color-*) ...)`, sin capa `--brand-*` intermedia).

Si necesitas un color nuevo: añádelo en `tailwind.css`, nunca lo hardcodees en un componente ni lo definas en un tercer sitio "temporalmente".

### Tokens problemáticos conocidos
| Token | Valor | Ratio | Uso permitido |
|---|---|---|---|
| `outline-variant` | `#c4c7c7` | 1.62:1 | solo bordes decorativos, **nunca texto** |
| `outline` | `#666666` | 5.45:1 sobre surface | texto normal y bordes |
| `#FAFAFA` sobre `#F5CCD4` | — | 1.39:1 | **nunca usar esta combinación** |

### Requisitos WCAG AA (aplican siempre)
- Texto normal (<24px, o <18.67px bold): mínimo **4.5:1**
- Texto grande (≥24px, o ≥18.67px bold): mínimo **3:1**
- Antes de introducir una combinación de color nueva que no esté en la tabla de arriba, calcula el ratio y compáralo contra estos mínimos — no asumas que "se ve bien" es suficiente.

## 3. `border-radius: 0` — cómo aplicarlo (y cómo NO)

❌ **No repetir** el approach de `feat/prueba-colores`: `* { border-radius: 0 !important }` global. Ya se probó y se descartó.

✅ **Approach correcto**, verificado contra `accessible-astro-components` v5.7.1: los componentes aceptan `class`/`style` por props (hacen `class: className` + `{...rest}` en su elemento raíz) y sus estilos internos usan selectores `:where(...)` con specificity 0 — cualquier clase propia gana nativamente, sin `!important`. La mayoría usa las variables `--radius-s/m/l/h` definidas en `web/src/assets/scss/base/_root.scss`: **basta con fijarlas a `0` en la base.**

**Excepciones con `border-radius` hardcodeado** (no usan `var()`, hay que pasarles clase propia por prop):
- `Modal`, `Toast`, `Card`, `Pagination`, `Media`, `Notification`, `Badge` → usan `0.5rem` fijo.
- `Switch`, `Radio`, `Avatar` → usan `50%` (formas circulares — **prohibidas por el sistema**, hay que sobreescribirlas siempre).

Si encuentras otro componente con radio hardcodeado no listado aquí: documenta la excepción como ADR, no como parche silencioso — y añádelo a esta tabla.

## 4. Estructura de páginas vigente

- Inici · Projectes · Materials (dropdown: Guies i recursos didàctics · Jocs · Publicacions · Campanyes) · Formacions · Tallers · Bio (con foto de perfil) · Contacte
- Todas las páginas se diseñan/implementan en la misma fase (no hay fase 1/fase 2 de páginas).
- Listing pages (Projectes, Materials con filtro de subcategoría, Formacions, Tallers) comparten el mismo layout. Detail pages por documento (`{slug}`).
