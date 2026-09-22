import {CogIcon} from '@sanity/icons/Cog'
import type {ComponentType} from 'react'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'

const LOCALES = ['ca', 'es']

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

function categoryList(S: StructureBuilder, title: string, value: string) {
  const id = `cat-${value.toLowerCase()}`
  return S.listItem()
    .id(id)
    .title(title)
    .child(
      S.documentList()
        .id(`${id}-list`)
        .schemaType('catalogItem')
        .filter('category == $cat')
        .params({cat: value}),
    )
}

function materialList(S: StructureBuilder, title: string, id: string, subcategory: string) {
  return S.listItem()
    .id(id)
    .title(title)
    .child(
      S.documentList()
        .id(`${id}-list`)
        .schemaType('catalogItem')
        .filter('category == $cat && subcategory == $sub')
        .params({cat: 'materials', sub: subcategory}),
    )
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contingut')
    .items([
      S.documentTypeListItem('catalogItem').title('Tot el contingut'),
      S.divider(),
      categoryList(S, 'Projectes', 'projects'),
      S.listItem()
        .id('materials')
        .title('Materials')
        .child(
          S.list()
            .title('Materials')
            .items([
              S.listItem()
                .id('materials-tots')
                .title('Tots els materials')
                .child(
                  S.documentList()
                    .id('materials-tots-list')
                    .schemaType('catalogItem')
                    .filter("category == 'materials'"),
                ),
              S.divider(),
              materialList(S, 'Guies i recursos didàctics', 'materials-guies', 'guides'),
              materialList(S, 'Jocs', 'materials-jocs', 'games'),
              materialList(S, 'Publicacions', 'materials-publicacions', 'publications'),
              materialList(S, 'Campanyes', 'materials-campanyes', 'campaigns'),
              materialList(S, 'Audiovisuals', 'materials-audiovisuals', 'audiovisual'),
            ]),
        ),
      categoryList(S, 'Formacions', 'formations'),
      categoryList(S, 'Tallers', 'workshops'),
      S.divider(),
      createLocalizedSingleton(S, 'siteSettings', 'Perfil Personal', CogIcon),
    ])