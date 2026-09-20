import {defineConfig, type NewDocumentOptionsResolver} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {documentInternationalization} from '@sanity/document-internationalization'
import {schemaTypes} from './schemaTypes'
import {structure} from './schemaTypes/structure'

const LANGUAGES = [
  {id: 'ca', title: 'Català'},
  {id: 'es', title: 'Español'},
]
const LOCALIZED_TYPES = ['catalogItem']

const newDocumentOptions: NewDocumentOptionsResolver = (prev) =>
  prev.filter(
    (item) =>
      item.templateId !== 'siteSettings' &&
      !LOCALIZED_TYPES.includes(item.templateId as string) &&
      !LOCALIZED_TYPES.some((schemaType) => item.templateId === `${schemaType}-parameterized`),
  )

const sharedConfig = {
  projectId: 'o65rl8jj',

  plugins: [
    structureTool({structure}),
    visionTool(),
    documentInternationalization({
      supportedLanguages: LANGUAGES,
      schemaTypes: LOCALIZED_TYPES,
    }),
  ],

  document: {newDocumentOptions},

  schema: {
    types: schemaTypes,
  },
}

export default defineConfig([
  {
    ...sharedConfig,
    name: 'production',
    title: 'clara-martinez-website',
    basePath: '/production',
    dataset: 'production',
  },
  {
    ...sharedConfig,
    name: 'testing',
    title: 'clara-martinez-website (testing)',
    basePath: '/testing',
    dataset: 'testing',
  },
])