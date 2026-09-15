---
name: sanity-schema
description: Schema de contenido de Sanity (documento project y siteSettings), comandos CLI y gotchas de deploy del Studio. Úsala siempre que trabajes con GROQ, componentes que consumen datos de Sanity, el Studio, o cuando necesites subir/consultar contenido vía CLI.
---

# Sanity CMS — Radical Clarity

**Fuente de verdad real del schema:** `studio/schemaTypes/`. Lo de aquí es un resumen para orientarte rápido en GROQ/componentes — si necesitas certeza sobre un campo, **lee el schema real**, no confíes solo en este resumen.

## 1. Documento `project`

Un único tipo de documento cubre *projectes*, *materials*, *formacions* y *tallers*, diferenciados por `category`. Campos organizados en fieldsets (card / home / taxonomy / details / multimedia / button / flex):

- `language` (string, oculto, `ca` por defecto)
- `title` (obligatorio) · `subtitle` (obligatorio) · `image` (con `alt` obligatorio)
- `slug` (auto desde `title`, lowercase + guiones)
- `featured` (boolean) · `featuredOrder` (number, menor = primero) — portada del home
- `category` (enum: `projects` / `materials` / `formations` / `workshops`)
- `subcategory` (enum, **solo Materials**, obligatorio si `category=materials`: `guides` / `games` / `publications` / `campaigns`)
- `tags` (array de string, unique)
- `descriptionLong` (portable text: h2, lista, strong, em, link)
- `myWork` · `institutionalAuthorship` — **solo proyectos**
- `year` (string, ej. "2023–24") · `externalLink` (url, solo http/https)
- `videos` (array: `{ title, url XOR file }` — validar "uno o el otro") · `gallery` (image[]) · `documents` (array: `{ title, file }`)
- `button` (object: `{ visible, label, type("link"/"download"), url, file }` — validación: `link`→requiere `url`, `download`→requiere `file`)
- `createdBy` · `designedBy` · `sections` (array libre: `{ title, text }`)

## 2. `siteSettings` (singleton)

- `siteName` · `subtitle` (gancho de presentación)
- `bio` (portable text, página Bio) · `profileImage` (con `alt`)
- `socialLinks` (array de `socialLink`) · `contactEmail` (validación email) · `cvFile` (PDF)

## 3. CLI de Sanity

```bash
sanity assets upload --file <img> --type image      # sube un asset
sanity documents create <file.json>                  # publica directo, NO crea draft
sanity documents query "..."                          # verificar contenido (GROQ)
npx sanity deploy --dry-run --url <host> -y -j        # comprobar antes de desplegar el Studio
npx sanity deploy --url <host> -y                     # despliega e imprime el appId real si hace falta
```

## 4. Gotchas conocidos

- **`deployment.appId` no es el hostname del Studio** — es un id interno por proyecto (en `sanity.cli.ts`). Si lo inventas o usas el hostname, el deploy aborta con `"Cannot find app with app ID"`. Para conseguir el id real: `npx sanity deploy --url <host> -y` lo imprime al final, o usa la clave `studioHost` como alternativa (documentar cuál se usa).
- **`autoUpdates` actualiza la versión de Sanity, no vuestro schema** — cada cambio de schema necesita un redeploy explícito del Studio.
- `sanity documents create` publica directamente, no deja el documento en draft — si necesitas revisar antes de publicar, no lo uses para contenido sensible sin avisar al usuario.

## 5. Antes de escribir GROQ o consumir datos en un componente

1. Confirma el campo exacto en `studio/schemaTypes/project.ts` o `siteSettings.ts` — los nombres de campo de este resumen pueden quedarse desactualizados si el schema cambia.
2. Recuerda las reglas condicionales (`subcategory` solo si `category=materials`; `myWork`/`institutionalAuthorship` solo si es proyecto; `button` válido según `type`) al escribir cualquier query o lógica de render — son la fuente más probable de bugs silenciosos si se ignoran.
