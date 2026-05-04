// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [],

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
