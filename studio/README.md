# Sanity Content Studio — clara-martinez-website

Studio del CMS Sanity para el sitio de Clara Martínez. Proyecto `o65rl8jj`, idiomas `ca`/`es`.

Dos espacios de trabajo en el mismo Studio: `production` (contenido real, `/production`) y `testing` (datos de prueba, `/testing`). La CLI (`sanity.cli.ts`) apunta a `testing`.

## Documentación

- **[CONTENT-MODEL.md](./CONTENT-MODEL.md)** — modelo de datos aprobado, tabla de decisiones y fases del proyecto. **Leer antes de tocar los schemas.**

## Comandos

```bash
npm run dev        # Studio en desarrollo
npm run build      # Build de producción (sanity build)
npm run deploy     # Publicar el Studio (sanity deploy)
```

## Estructura

- `schemaTypes/catalogItem.ts` — tipo único de contenido (Projectes / Materials / Formacions / Tallers).
- `schemaTypes/tag.ts` — etiqueta compartida, con texto y slug en catalán y en castellano (ADR 0019).
- `schemaTypes/siteSettings.ts` — configuración del sitio (singleton por idioma).
- `schemaTypes/socialLink.ts` — enlace social reutilizable.
- `schemaTypes/link.ts` — anotación de enlace del texto enriquecido.
- `schemaTypes/structure.ts` — árbol del menú izquierdo (vistas por categoría) + singletons localizados.
- `sanity.config.ts` — configuración del proyecto, plugins, i18n y los dos espacios de trabajo.
