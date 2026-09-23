# 0024 — Estilos de enlace: capa base, contenido frente a interfaz y hover solo con puntero

- **Fecha:** 2026-09-23
- **Estado:** Implementado

## Contexto

Las reglas globales de enlaces del starter (`a` y `main a, footer a` en `_general.scss`) estaban fuera de capa de cascada. En CSS, lo que está fuera de `@layer` gana a todo lo que está dentro, y Tailwind 4 mete sus utilidades en `@layer utilities`. Resultado: cualquier enlace con otro aspecto necesitaba `!` (unos 30 en el proyecto) o la constante `linkResetClassName`, que existía solo para eso.

Además, los hovers escritos en SCSS se aplicaban también al tocar en pantallas táctiles (el color de hover se quedaba "pegado"), mientras que los de Tailwind 4 (`hover:`) solo se aplican con `@media (hover: hover)`.

## Decisión

1. **Los estilos por defecto de los enlaces van en `@layer base`**, como ya estaban `_reset.scss` y `_font.scss`. Las utilidades ganan sin `!`; se eliminan todos los `!` y `linkResetClassName`. Las reglas de foco (`*:focus`, `*:focus-visible`) se quedan fuera de capa a propósito: el indicador de foco tiene que ganar siempre (WCAG 2.4.7).
2. **Dos tipos de enlace:**
   - **de contenido** (dentro de texto o de datos: descripción de la ficha, fitxa tècnica, páginas de texto): **subrayados siempre**, para no depender solo del color (WCAG 1.4.1);
   - **de interfaz** (menú, pie, migas, tarjetas, pestañas, botones): sin subrayado en reposo; al pasar, **subrayado** si es texto o **cambio de fondo** si es una celda o bloque.
3. **El rosa significa "estás aquí"** (página actual en el menú y en la barra de subcategorías, idioma activo). El hover es gris. En el desplegable del menú no se repite el rosa: la ubicación ya se ve en la barra y el enlace conserva `aria-current="page"`.
4. **Hover solo con puntero, foco siempre:** el mixin `hover-focus` (`_mixins.scss`) aplica el estilo con `:focus-visible` siempre y con `:hover` solo dentro de `@media (hover: hover)`, conservando la especificidad de `:where()`. Todos los hovers de SCSS lo usan, igual que se comportan los `hover:` de Tailwind.

## Alternativas consideradas

- **Mantener los `!`:** funciona, pero cada enlace nuevo necesitaría más, y `!important` invierte el orden de las capas y es difícil de sobrescribir después.
- **Subir la especificidad de las utilidades** (por ejemplo, con `html:root` o selectores dobles): parchea el síntoma sin arreglar el orden de la cascada.
- **Dividir cada hover de SCSS a mano en dos reglas:** duplicaría cada bloque de estilos 12 veces; el mixin lo resuelve en un solo sitio.

## Consecuencias

- Comprobado con una comparación automática antes/después (color, subrayado y fondo de 378 enlaces y botones en 10 páginas, en reposo y en hover simulado): sin cambios visibles en ordenador.
- En táctil, los botones que no cambian de página (menú, modo oscuro, enviar) ya no se quedan con el color de hover.
- Excepción conocida: la insignia de categoría con enlace se invierte a oscuro al pasar (va sobre fondo rosa, donde un gris no destacaría).
- `rotate-icon-on-hover` (mixin del starter) sigue con el patrón antiguo porque no se usa en ningún sitio; queda para la limpieza de código muerto.

## Archivos que fijan la decisión

- `web/src/styles/base/_general.scss` — enlaces por defecto en `@layer base`.
- `web/src/styles/base/_mixins.scss` — mixin `hover-focus`.
