# 0019 — Etiquetas como documento en Sanity

- **Fecha:** 2026-09-22
- **Estado:** Vigente

## Contexto

El ADR 0008 (opción A, texto libre) avisaba explícitamente de que si aparecían muchos duplicados por variantes de escritura, tocaría migrar a la opción B. Eso ya pasó: `production` tenía 16 valores de texto distintos para 12 conceptos reales (duplicados por espacios sueltos, singular/plural, una errata). Además, el listado de catálogo (ADR 0017) necesita un filtro de etiquetas real en las cuatro categorías, y con texto libre no se puede traducir entre catalán y español de forma fiable (los slugs de etiqueta salían rotos con acentos, detectado el 2026-09-18).

## Decisión

Documento `tag` (`studio/schemaTypes/tag.ts`) con dos campos de texto obligatorios (`ca`, `es`, sin plugin de traducción) y un slug por idioma (`slugCa`, `slugEs`) para las rutas `.../etiqueta/<slug>`. El campo `tags` de `catalogItem` pasa de array de texto a array de referencias a `tag`, con una nota de ayuda en el propio campo explicando que no se sincroniza entre traducciones. En el desplegable de referencia se muestran los dos idiomas a la vez («Joves / Jóvenes»), sin componente personalizado. Clara puede crear una etiqueta nueva desde la propia ficha (función estándar de Sanity en los campos de referencia, sin configuración extra).

**Migración** (aditiva, sin romper nada publicado, tal como preveía el ADR 0008): los 16 valores de texto de `production` se redujeron a 12 documentos `tag`, fusionando 4 duplicados por escritura (espacios, singular/plural, la errata «diska» → «discapacitat»); no existía ninguna etiqueta en castellano en `production`, así que los 12 textos en español se tradujeron con el visto bueno de Laura. Los valores inventados de `testing` sin equivalencia real se descartaron.

## Alternativas consideradas

- **Mantener el texto libre (opción A del ADR 0008):** descartada — es la causa del problema que motiva este cambio.
- **Comprobación automática de que las etiquetas coinciden entre la ficha catalana y la española:** descartada, mismo motivo que la comprobación de traducción del slug (pendiente de ADR): añade una consulta extra y puede dar falsos positivos en casos donde la diferencia es intencionada.
- **Componente de entrada personalizado** que muestre solo el idioma del documento que se está editando: descartada por ahora (más código para un beneficio menor); queda anotada como mejora posible si en el uso real resulta confuso ver los dos idiomas a la vez.

## Consecuencias

- Existe ya una lista global de etiquetas gestionable desde el Studio («Etiquetes» en el menú).
- Clara ya no puede crear etiquetas duplicadas por variantes de escritura: elige entre las existentes o crea una, con Sanity comprobando que no se repita en la misma ficha (`rule.unique()`).
- El filtro de etiquetas de los catálogos (pendiente de construir, ver `daily.md`) podrá usar rutas traducidas de verdad (`.../etiqueta/<slug-ca>` y `.../etiqueta/<slug-es>`), sin el problema de acentos rotos del filtro anterior.
- Las etiquetas no se sincronizan solas entre la ficha catalana y la española de un mismo contenido: si Clara cambia una, tiene que repetir el cambio en la traducción (aviso en el propio campo, sin bloqueo automático).
- Sustituye a la opción B descrita en el ADR 0008, que pasa a «Sustituido en parte» — la decisión de texto libre queda histórica; el resto de ese ADR (el análisis de por qué se descartó B en su momento) sigue siendo contexto válido.
