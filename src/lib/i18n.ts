export type Locale = 'es' | 'en';

export const defaultLocale: Locale = 'es';
export const locales: Locale[] = ['es', 'en'];

export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (locales.includes(lang as Locale)) {
    return lang as Locale;
  }
  return defaultLocale;
}

import es from '../i18n/es.json';
import en from '../i18n/en.json';

const translations: Record<Locale, typeof es> = { es, en };

export function getTranslations(lang: Locale) {
  return translations[lang] ?? es;
}