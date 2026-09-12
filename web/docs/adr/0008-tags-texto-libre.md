# 0008 — Tags de proyectos como texto libre en Sanity

- **Fecha:** 2026-09-12
- **Estado:** Vigente

## Contexto

El schema de `project` en Sanity incluye un campo `tags` para etiquetar los proyectos. La clienta no tiene conocimientos técnicos y debe poder crear etiquetas sin configuración previa. El front las usará para filtrar proyectos. Antes de fijar el modelo, se evaluó cómo evitar duplicados y cómo obtener la lista de etiquetas en uso.

Hay dos formas de modelar etiquetas en Sanity:

- **A) Texto libre:** `array` de `string` con `options.layout: 'tags'`. Clara escribe una etiqueta y pulsa Enter; se crea al vuelo. Las etiquetas viven dentro de cada proyecto (no hay catálogo global).
- **B) Etiqueta como documento de tipo `tag` + referencia desde `project`:** existe una lista global de etiquetas gestionada en un panel del Studio, y cada proyecto referencia etiquetas existentes.

## Decisión

**Nos quedamos con la opción A (texto libre).** Justificación:

- Proyecto pequeño (estimación de ~10–20 proyectos): la simplicidad pesa más que el control estricto.
- Clara no tiene que aprender ningún flujo previo: escribe etiquetas y ya.
- El control de duplicados dentro de un mismo proyecto se cubre con `validation: rule.unique()` (avisa si repite la misma etiqueta en la misma ficha).
- La lista de etiquetas en uso para el filtro del front se obtiene por GROQ, sin configuración extra:

  ```groq
  array::unique(*[_type == "project" && defined(tags)].tags[] | order(@))
  ```

## Consecuencias

- No existe una lista global de etiquetas ni pantalla de gestión en el Studio.
- No hay deduplicación entre proyectos distintos: "feminisme" y "Feminisme" son etiquetas diferentes para Sanity. Los duplicados por variantes de escritura se deduplican solo en tiempo de consulta.
- Para un catálogo controlado habría que migrar a la opción B (aditiva, no destructiva).

## Alternativas

- **B) Etiqueta como documento `tag`:** previene duplicados entre proyectos de forma estructural y da una lista de filtro garantizada, pero añade un schema más, un panel de gestión y obliga a Clara a verificar si la etiqueta ya existe. Se descarta hoy.

## Mejora futura (anotada, no planificada)

Si con el tiempo aparecen muchos proyectos o duplicados que ensucian el filtro, migrar a la opción B:

1. Crear tipo de documento `tag` (title, slug).
2. Cambiar `tags` en `project` a `array` de referencias a `tag`.
3. Migración de datos de las etiquetas existentes (mapear strings a referencias).
4. El filtro del front pasa a consultar `*[_type == "tag"]`.

Esta migración es aditiva y no rompe nada publicado.