import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {documentInternationalization} from '@sanity/document-internationalization'
import {schemaTypes} from './schemaTypes'
import {structure} from './schemaTypes/structure'

const LANGUAGES = [
  {id: 'ca', title: 'Català'},
  {id: 'es', title: 'Español'},
]
const LOCALIZED_TYPES = ['project']

export default defineConfig({
  name: 'default',
  title: 'clara-martinez-website',

  projectId: 'o65rl8jj',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    visionTool(),
    documentInternationalization({
      supportedLanguages: LANGUAGES,
      schemaTypes: LOCALIZED_TYPES,
    }),
  ],

  document: {
    newDocumentOptions: (prev) =>
      prev.filter(
        (item) =>
          item.templateId !== 'siteSettings' &&
          !LOCALIZED_TYPES.includes(item.templateId as string) &&
          !LOCALIZED_TYPES.some(
            (schemaType) => item.templateId === `${schemaType}-parameterized`,
          ),
      ),
  },

  schema: {
    types: schemaTypes,
  },
})