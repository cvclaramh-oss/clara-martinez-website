---
name: adr-daily-docs
description: Cómo y cuándo escribir un ADR (Architecture Decision Record) y cómo cerrar el diario de sesión (daily.md) de este proyecto. Úsala al tomar cualquier decisión técnica que cambie el diseño del proyecto, al terminar una sesión de trabajo, o si el usuario pregunta "¿esto necesita un ADR?" o pide "actualiza el diario/daily".
---

# ADRs y diario de sesión — Radical Clarity

Dos documentos con propósitos distintos: el ADR es la decisión formal y estable; el daily es el proceso, narrado, de cómo se llegó ahí.

## 1. ADRs — `docs/adr/NNNN-titulo-corto.md`

**Cuándo crear uno:** solo para decisiones que cambian el diseño del proyecto (arquitectura, stack, convenciones estructurales). Ante la duda, **pregunta al usuario antes de crear uno** — no todas las decisiones lo necesitan (ej.: renombrar un directorio no requiere ADR; elegir gobernanza de tokens de color sí).

**Formato:**
- Fecha
- Estado (`Propuesto` / `Vigente` / `Implementado` / `Implementado (parcial)` / `Temporal` / `Descartado` / `Sustituido`)
- Contexto
- Decisión
- Alternativas consideradas
- Consecuencias

**Reglas:**
- Numeración incremental, nunca reutilizar números.
- Si un ADR sustituye a otro: **actualizar el Estado del antiguo a "Sustituido", nunca borrarlo.** Añadir nota cruzada en ambos.
- Actualizar la fila correspondiente en `docs/adr/README.md` (índice) en el mismo commit.
- Antes de crear uno nuevo, revisa el índice — puede que la decisión ya esté resuelta en otro ADR.

## 2. Diario — `docs/private/daily.md`

Lo redacta el agente al cierre de cada sesión. Es diario de trabajo, **no un PR** — aquí sí vale narrar el proceso: qué problema apareció, por qué se tomó una decisión y no otra, qué se probó y no funcionó.

**Estructura por día**, un bloque `## AAAA-MM-DD`, más reciente arriba, con estas secciones:

```markdown
## AAAA-MM-DD

### Qué se hizo
- ...

### Decisiones
- ...

### Verificación
- comandos ejecutados + resultado real (no "debería funcionar")

### Conocimiento generado
- aprendizajes reutilizables (gotchas, comportamientos de librerías, etc.)

### Estado
**Sesión abierta/cerrada.** Qué queda listo, qué falta, próximo paso.
```

Sin marcas de sesión tipo mañana/tarde/noche — un bloque por jornada.

**Reglas de contenido:**
- Resume el «qué fue» en una línea y enlaza al PR/issue en vez de repetir el detalle técnico (eso ya vive en el PR o el ADR).
- Puede incluir nombre propio y voz personal — el diario **no** aplica la regla de anonimizar datos personales que sí aplica a evidencias técnicas (logs, capturas, ADRs deben usar `$USER`, `~/`, redacción impersonal).
- Objetivo: que quien lo lea entienda el *criterio* detrás de las decisiones, no solo el resultado.
- Antes de cerrar: comprobar que la sección "Próxima sesión continuamos con" y "Pendientes acumuladas" del final del archivo siguen reflejando la realidad — tacha lo hecho, no dejes ítems completados sin marcar `[x]`.

## 3. Coherencia entre AGENTS.md, daily.md y ADR

Si algo en AGENTS.md queda desactualizado por una decisión tomada hoy (una ruta, un estado de infraestructura, una regla de diseño), **actualízalo en el mismo momento**, no lo dejes para "luego". Un AGENTS.md que describe algo como activo cuando no lo está (p. ej. un servicio sin configurar, o una carpeta de referencia renombrada) hace que la siguiente sesión parta de información falsa. Si tienes dudas de si algo debe ir en AGENTS.md o en daily.md: si es una regla o dato que aplica siempre a partir de ahora → AGENTS.md (o el skill correspondiente); si es la crónica de cómo se llegó ahí → daily.md.
