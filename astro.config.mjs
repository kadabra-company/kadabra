// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://kadabra-company.github.io',
  base: '/kadabra',
  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },

  // Configuración para rutas dinámicas con idioma
  trailingSlash: 'never',

  // Prefijo para rutas: /es/, /en/, etc.
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: true
    }
  }
});