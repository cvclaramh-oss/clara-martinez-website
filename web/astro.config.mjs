import { defineConfig } from 'astro/config'
import { fileURLToPath } from 'url'
import icon from 'astro-icon'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

// Vite configuration with path aliases and SCSS settings
const viteConfig = {
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [fileURLToPath(new URL('./src/assets', import.meta.url))],
        logger: {
          warn: () => {},
        },
      },
    },
  },
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
      '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@public': fileURLToPath(new URL('./public', import.meta.url)),
      '@post-images': fileURLToPath(new URL('./public/posts', import.meta.url)),
      '@project-images': fileURLToPath(new URL('./public/projects', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
      '@constants': fileURLToPath(new URL('./src/constants', import.meta.url)),
      '@theme-config': fileURLToPath(new URL('./theme.config.ts', import.meta.url)),
    },
  },
}

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  site: 'https://portfolio.pages.dev',
  integrations: [icon(), mdx(), sitemap()],
  vite: viteConfig,
  i18n: {
    locales: ['ca', 'es'],
    defaultLocale: 'ca',
    routing: {
      prefixDefaultLocale: false,
      fallback: { es: 'ca' }
    }
  }
})
