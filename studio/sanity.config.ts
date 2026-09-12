import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {documentInternationalization} from '@sanity/document-internationalization'
import {CogIcon} from '@sanity/icons/Cog'
import type {ComponentType} from 'react'
import {schemaTypes} from './schemaTypes'

const LOCALES = ['ca', 'es']
const LOCALIZED_TYPES = ['project']
const BASE_LANGUAGE = 'ca'

function createLocalizedSingleton(
  S: StructureBuilder,
  typeName: string,
  title: string,
  icon: ComponentType,
) {
  return S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.list()
        .title(title)
        .items(
          LOCALES.map((locale) =>
            S.listItem()
              .title(`${title} (${locale.toUpperCase()})`)
              .icon(icon)
              .child(
                S.document()
                  .schemaType(typeName)
                  .documentId(`${typeName}-${locale}`)
                  .title(`${title} (${locale.toUpperCase()})`),
              ),
          ),
        ),
    )
}

const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      createLocalizedSingleton(S, 'siteSettings', 'Site Settings', CogIcon),
      S.divider(),
      S.documentTypeListItem('project').title('Projects'),
    ])

export default defineConfig({
  name: 'default',
  title: 'clara-martinez-website',

  projectId: 'o65rl8jj',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    visionTool(),
    documentInternationalization({
      supportedLanguages: (client) =>
        client.fetch(`*[_type == "locale"]{ "id": tag, "title": name }`),
      schemaTypes: LOCALIZED_TYPES,
    }),
  ],

  document: {
    newDocumentOptions: (prev) => [
      ...prev.filter(
        (item) =>
          item.templateId !== 'siteSettings' &&
          !LOCALIZED_TYPES.includes(item.templateId as string),
      ),
      ...LOCALIZED_TYPES.map((schemaType) => ({
        templateId: `${schemaType}-${BASE_LANGUAGE}`,
        parameters: {language: BASE_LANGUAGE},
      })),
    ],
  },

  schema: {
    types: schemaTypes,
  },
})