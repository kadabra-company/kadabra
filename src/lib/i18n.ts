// Idiomas soportados por la aplicación.
// Agregar un nuevo idioma aquí y en el array `locales` es suficiente
// para que el sistema de rutas y traducciones lo reconozca.
export type Locale = 'es' | 'en';

// Idioma por defecto cuando no se detecta uno válido en la URL.
export const defaultLocale: Locale = 'es';

// Lista de idiomas soportados. Debe coincidir con los locales
// declarados en astro.config.mjs bajo i18n.locales.
export const locales: Locale[] = ['es', 'en'];

/**
 * Extrae el idioma desde la URL.
 * Si el segmento no es un locale válido, retorna el idioma por defecto.
 * @param url - URL completa de la petición (Astro.url)
 * @returns Locale detectado, o `defaultLocale` como fallback
 */
export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (locales.includes(lang as Locale)) {
    return lang as Locale;
  }
  return defaultLocale;
}

// JSONs de traducción importados de forma estática para que el HMR
// (hot module replacement) funcione correctamente en desarrollo.
import es from '../i18n/es.json';
import en from '../i18n/en.json';

// Mapa de idioma → objeto de traducciones.
// El tipo está inferido desde el JSON español, lo que da autocompletado
// en todos los componentes que consuman `t`.
const translations: Record<Locale, typeof es> = { es, en };

/**
 * Retorna el objeto de traducciones para el idioma dado.
 * Si el idioma no existe en el mapa, cae al español como respaldo.
 * @param lang - Locale activo
 * @returns Objeto de traducciones tipado
 */
export function getTranslations(lang: Locale) {
  return translations[lang] ?? es;
}