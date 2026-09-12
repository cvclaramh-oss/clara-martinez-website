# Decisiones de Arquitectura (ADR)

## ADR-001: Usar Accessible Astro Starter como base
- **Fecha**: 2026-09-09
- **Estado**: Aceptada
- **Contexto**: Necesitábamos un punto de partida sólido con accesibilidad, SEO y performance resueltos. La alternativa era construir desde cero, pero implicaba semanas de configuración y riesgo de omitir detalles críticos.
- **Decisión**: Usar accessible-astro-starter y personalizar encima con el diseño Radical Clarity.
- **Consecuencias**: Ahorramos configuración de accesibilidad, SEO, sitemap, view transitions y estructura de proyecto. Hay que sobreescribir estilos del tema (colores, tipografía, border-radius, sombras).

## ADR-002: Paleta Radical Clarity
- **Fecha**: 2026-09-09
- **Estado**: Aceptada
- **Contexto**: Sistema de diseño Minimalist-Brutalist Contemporary con monochrome + rosa carne. Se hizo análisis WCAG completo antes de implementar.
- **Decisión**: Usar paleta de DESIGN.md. Tokens problemáticos (outline-variant, outline, #FAFAFA/#F5CCD4) solo para bordes decorativos, nunca como texto informativo.
- **Consecuencias**: Todos los ratios WCAG AA verificados. Combinaciones seguras documentadas en DESIGN.md.

## ADR-003: Sanity como CMS headless
- **Fecha**: 2026-09-09
- **Estado**: Aceptada
- **Contexto**: La clienta (Clara Vidal) necesita añadir y editar proyectos sin tocar código. No tiene conocimientos técnicos.
- **Decisión**: Sanity como CMS headless para contenido. Cloudflare Pages para hosting. Web3Forms para formulario de contacto.
- **Consecuencias**: Clara puede gestionar contenido desde Sanity Studio. Schema definido: project (title, slug, description, image, category, year, tags, externalLink) + siteSettings (singleton).

## ADR-004: i18n desde el inicio
- **Fecha**: 2026-09-09
- **Estado**: Aceptada
- **Contexto**: Sitio principal en catalán, pero preparado para español futuro.
- **Decisión**: Configurar estructura i18n (CAT/ES) desde el inicio, con fallback automático a CAT.
- **Consecuencias**: Solo contenido en CAT completado por ahora. ES se añade cuando Clara proporcione traducciones.

## ADR-005: Override global de border-radius (temporal)
- **Fecha**: 2026-09-09
- **Estado**: Temporal — pendiente de reemplazo por componentes propios
- **Contexto**: El paquete `accessible-astro-components` tiene `border-radius` hardcodeado en sus estilos inline (`.5rem`, `.25rem`). Las variables CSS están a `0` pero los componentes no las usan.
- **Decisión**: Añadir `* { border-radius: 0 !important }` global en `_general.scss` para forzar el estilo Radical Clarity.
- **Consecuencias**: Solución rápida para la demo a Clara. **No es buena práctica** — interfiere con todos los elementos del DOM y puede causar conflictos. Si esta versión se queda, hay que reemplazar los componentes del paquete por componentes propios con `border-radius: 0` nativo y eliminar el override global.

## ADR-006: i18n CAT/ES — Decisiones pendientes
- **Fecha**: 2026-09-09
- **Estado**: Pendiente de decisión
- **Contexto**: El sitio necesita soporte para catalán (principal) y español. Actualmente los textos están mezclados (catalán, castellano, inglés del starter).
- **Decisiones pendientes**:
  1. **Persistencia de idioma**: ¿Usar cookie para recordar la preferencia del usuario entre sesiones?
  2. **Alcance de traducciones**: Todos los textos visibles deben traducirse (navegación, Hero, Footer, descripciones, proyectos, componentes)
  3. **Estructura de URLs**: `/` para CAT, `/es/` para ES (prefixDefaultLocale: false)
  4. **Contenido de proyectos**: Cada proyecto necesita versión CAT y ES
- **Consecuencias**: Hay que revisar TODOS los textos del sitio y crear archivos de traducción completos. Los textos actuales están mezclados y necesitan unificación.
