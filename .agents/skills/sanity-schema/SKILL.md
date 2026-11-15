---
name: sanity-schema
description: Schema de contenido de Sanity (documentos catalogItem, tag y siteSettings), comandos CLI y gotchas de deploy del Studio. Úsala siempre que trabajes con GROQ, componentes que consumen datos de Sanity, el Studio, o cuando necesites subir/consultar contenido vía CLI.
---

# Sanity CMS — Radical Clarity

**Fuente de verdad real del schema:** `studio/schemaTypes/`. Lo de aquí es un resumen para orientarte rápido en GROQ/componentes — si necesitas certeza sobre un campo, **lee el schema real**, no confíes solo en este resumen.

## 1. Documento `catalogItem`

(Antes `project`; renombrado el 2026-09-18, ADR 0012.)

Un único tipo de documento cubre *projectes*, *materials*, *formacions* y *tallers*, diferenciados por `category`. Campos organizados en fieldsets (card / home / taxonomy / details / multimedia / button / flex):

- `language` (string, oculto, `ca` por defecto)
- `title` (obligatorio) · `subtitle` (obligatorio) · `image` (con `alt` obligatorio)
- `slug` (auto desde `title` + `language`, p. ej. `…-ca`; lowercase + guiones; bloqueado una vez publicado, ADR 0019)
- `featured` (boolean) · `featuredOrder` (number, menor = primero) — portada del home
- `category` (enum: `projects` / `materials` / `formations` / `workshops`)
- `subcategory` (enum, **solo Materials**, obligatorio si `category=materials`: `guides` / `games` / `publications` / `campaigns` / `audiovisual`)
- `tags` (array de referencias a `tag`, unique). En GROQ hay que desreferenciar: `tags[]->{…}` (ver `catalogItemCardFields` en `web/src/lib/sanity/catalogItemsQuery.ts`). Las etiquetas no se sincronizan solas entre la versión ca y la es.
- `descriptionLong` (portable text: h2, lista, strong, em, link)
- `myWork` · `institutionalAuthorship` (texto plano, cualquier categoría)
- `year` (string, ej. "2023–24") · `externalLink` (url, solo http/https)
- `videos` (array: `{ title, url XOR file }` — validar "uno o el otro") · `gallery` (image[]) · `documents` (array: `{ title, file }`)
- `button` (object: `{ visible, label, type("link"/"download"), url, file }` — validación: `link`→requiere `url`, `download`→requiere `file`)
- `createdBy` · `designedBy` · `sections` (array libre: `{ title, text }`)

## 1b. Documento `tag`

- `ca` · `es` (texto, obligatorios) · `slugCa` · `slugEs` (regex `^[a-z0-9-]+$`)
- Lista común compartida por los dos idiomas, no un documento por idioma (ADR 0019).

## 2. `siteSettings` (singleton por idioma)

IDs fijos `siteSettings-ca` / `siteSettings-es`; sin campo `language` (el idioma va en el ID).


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
- **La CLI apunta a `testing`** (`sanity.cli.ts`): `sanity documents create/query` actúan sobre los datos de prueba, no sobre `production`. Para `production`: `--dataset production` explícito y avisar antes.
- `sanity documents create` publica directamente, no deja el documento en draft — si necesitas revisar antes de publicar, no lo uses para contenido sensible sin avisar al usuario.

## Capa de datos en la web (`web/src/lib/sanity/`, ver ADR 0012)

- `client.ts` — cliente de Sanity (projectId/dataset desde variables de entorno).
- `catalogItemsQuery.ts` — listados y portada (`catalogItemCardFields`).
- `catalogItemDetailQuery.ts` — fichas de detalle por categoría.
- `fetchAllInBatchesQuery.ts` — paginación en lotes de 50.
- `translationsQuery.ts` — enlace a la otra versión de idioma (selector de idioma).
- `siteSettingsQuery.ts` — configuración del sitio y CV.
- `imageUrlBuilder.ts` — URLs y tamaños de imagen.
- `renders/portableTextRender.ts` — texto enriquecido a HTML.

## 5. Antes de escribir GROQ o consumir datos en un componente

1. Confirma el campo exacto en `studio/schemaTypes/catalogItem.ts` o `siteSettings.ts` — los nombres de campo de este resumen pueden quedarse desactualizados si el schema cambia.
2. Recuerda las reglas condicionales (`subcategory` solo si `category=materials`; `button` válido según `type`) al escribir cualquier query o lógica de render — son la fuente más probable de bugs silenciosos si se ignoran.
