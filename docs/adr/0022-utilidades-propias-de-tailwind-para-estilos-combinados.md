# 0022 — Utilidades propias de Tailwind (`@utility`) para estilos combinados

- **Fecha:** 2026-09-23
- **Estado:** Vigente
- **Sustituye en parte a:** [0021](0021-componentes-en-vez-de-constantes-para-reutilizar-tailwind.md) (puntos 2 y 3 de su decisión, solo para la etiqueta pequeña)

## Contexto

El ADR 0021 dejó la etiqueta pequeña (familia especial, tamaño micro, negrita, espaciado ancho, mayúsculas) como constante de TypeScript (`microLabelClassName`) y descartó las clases CSS con nombre propio por no tener precedente en el proyecto.

Al unificar la tipografía con la escala fluida (`--font-size-N`) aparecieron tres problemas con esa solución:

- **La constante no cubría todos los sitios.** La auditoría de estilos del 2026-09-23 encontró copias del mismo estilo escritas a mano (`text-[0.6875rem]` en la tarjeta y el formulario, `text-xs` en el pie y el CTA, el SCSS de `.submenu-link`), algunas con otra familia de letra, otro tamaño u otro espaciado.
- **Una variable CSS no sirve aquí.** El resto de la unificación sustituye un valor por un token; la etiqueta pequeña es una combinación de seis propiedades, que un token no puede guardar.
- **El argumento del punto 3 del 0021 no era exacto.** El proyecto ya usaba clases con nombre para estilo (`.button`, `.menu-link`, `.footer-link`, `.cell`, `.detail-body` y las del starter como `.container`).

Se consultó la documentación oficial de Tailwind CSS 4 (`ctx7`, `/tailwindlabs/tailwindcss.com`, "Adding custom styles"): `@utility` registra una clase propia que Tailwind inserta en su capa `utilities` y que admite variantes (`hover:`, `md:`…) como cualquier utilidad de serie.

## Decisión

1. **Un estilo que combina varias propiedades y se repite en sitios con estructura distinta se define como utilidad propia con `@utility`** en `web/src/styles/tailwind.css`, no como constante de TypeScript. Primera utilidad: `micro-label`, con los valores exactos de la antigua constante (`--font-family-special`, `--font-size--2`, `line-height: 0.875rem`, `font-weight: 700`, `letter-spacing: 0.1em`, `text-transform: uppercase`).
2. **`micro-label` sustituye a `microLabelClassName` y a las copias sueltas:** migas, paginación, chips de etiquetas, `Eyebrow`, `Insignia`, términos de la fitxa, anterior/siguiente, cabeceras de contacto, textos pequeños de la tarjeta, nota del formulario, tagline de la cabecera y del pie, títulos de columna del pie, eyebrow del CTA y submenú.
3. **Excepción, etiquetas del formulario:** las generan los componentes `Input`/`Textarea` del paquete (`Textarea` ignora la prop `class`), así que se mantienen con una regla SCSS propia en `ContactForm.astro` que repite los mismos valores y lo dice en un comentario. Esa regla está fuera de capa, que es lo que la hace ganar a los estilos del paquete.
4. **Criterio de elección, que complementa al 0021:**
   - un **valor** que se repite pasa a un **token** (variable CSS en `_root.scss`);
   - una **combinación de propiedades** que se repite pasa a una **utilidad** (`@utility`);
   - un **bloque de marcado** (estructura HTML y estilo) que se repite pasa a un **componente** Astro (lo que sigue vigente del 0021, punto 1).

## Alternativas consideradas

- **Mantener la constante de TypeScript:** funciona y ya usaba el tamaño fluido, pero obliga a importarla en cada archivo, se monta como cadena de texto y no evitó las copias sueltas.
- **Escribir las seis clases a mano en cada sitio:** es como aparecieron las tres versiones distintas del mismo estilo.
- **Clase en un SCSS global** (`_utility.scss`): quedaría fuera de capa y ganaría a todas las utilidades de Tailwind, el mismo problema de cascada que ya obliga a usar `!` en otros sitios.
- **Hacer la etiqueta más grande (`--font-size--1`):** se valoró al crecer el resto del texto. Se mantiene `--font-size--2` porque las mayúsculas en negrita con espaciado se perciben más grandes que su tamaño real, conserva la jerarquía con el texto secundario (`--font-size--1`) y no altera los umbrales de la tagline medidos el mismo día. Si al revisarla se ve pequeña, el cambio es una línea en la utilidad.

## Consecuencias

- El estilo de la etiqueta pequeña vive en un solo sitio; cambiar su tamaño, fuente o espaciado es tocar una línea (más la regla del formulario, que lo indica en su comentario).
- Comprobado en el CSS compilado: `.micro-label` se emite antes que las utilidades de una sola propiedad, así que `micro-label font-semibold` queda en semi-negrita. Se puede ajustar una propiedad concreta sin pelear con la utilidad.
- Cambios visibles: el eyebrow del CTA, los títulos de columna y la tagline del pie pasan de la fuente del cuerpo (Hanken Grotesk, 12px) a Space Grotesk ~11px, como el resto de etiquetas; el submenú pasa de espaciado 0.05em a 0.1em; los términos de la fitxa pierden el `tracking-wider` duplicado.
- Quedan fuera por ser de otro papel, con su propio estilo: menú principal, selector de idioma, pestañas de subcategorías (navegación), enlaces del pie y texto de los botones. Si la navegación necesita un estilo común, se crearía otra utilidad con el mismo mecanismo.
- `microLabelClassName` queda sin uso en `web/src/constants/constClassNames.ts`; `linkResetClassName` sigue en uso.

## Archivos que fijan la decisión

- `web/src/styles/tailwind.css` — la utilidad `micro-label`.
- `web/src/components/ContactForm.astro` — la excepción de las etiquetas del formulario.
