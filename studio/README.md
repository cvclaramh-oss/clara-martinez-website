# Sanity Content Studio — clara-martinez-website

Studio del CMS Sanity para el sitio de Clara Martínez. Proyecto `o65rl8jj`, dataset `production`, idiomas `ca`/`es`.

## Documentación

- **[CONTENT-MODEL.md](./CONTENT-MODEL.md)** — modelo de datos aprobado, tabla de decisiones y fases del proyecto. **Leer antes de tocar los schemas.**

## Comandos

```bash
npm run dev        # Studio en desarrollo
npm run build      # Build de producción (sanity build)
npm run deploy     # Publicar el Studio (sanity deploy)
```

## Estructura

- `schemaTypes/project.ts` — tipo único de contenido (Proyectos / Materiales / Formaciones / Talleres).
- `schemaTypes/siteSettings.ts` — configuración del sitio (singleton por idioma).
- `schemaTypes/socialLink.ts` — enlace social reutilizable.
- `schemaTypes/structure.ts` — árbol del menú izquierdo (vistas por categoría) + singletons localizados.
- `sanity.config.ts` — configuración del proyecto, plugins e i18n.