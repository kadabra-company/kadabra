# Contexto del proyecto — Kadabra Sitio Corporativo

> Adjunta este archivo al inicio de cada sesión con Copilot para restaurar el contexto completo.

---

## Stack

- **Astro** v6.1.10 — generador estático
- **Tailwind CSS** v4 via `@tailwindcss/vite`
- **TypeScript** v5
- **@astrojs/sitemap** v3.7
- **lucide-astro** — iconos UI
- **@fontsource-variable/inter** — fuente body
- **@fontsource-variable/jetbrains-mono** — fuente hero (font-mono)
- Node.js >= 22.12.0

## Repositorio

- GitHub: `kadabra-company/kadabra` (rama `master`)
- Deploy: Netlify (drag & drop de `/dist` por ahora)
- Dominio futuro: `https://www.kadabra.com.pe`
- Dev server: `npm run dev` → localhost:4321

## Estructura de páginas

```
src/pages/
├── index.astro              # Redirect raíz → /es o /en según navigator.language
├── 404.astro                # Página 404 bilingüe con link al inicio
└── [lang]/
    ├── index.astro          # Home: hero, tech belt, servicios, por qué kadabra, clientes
    ├── servicios.astro      # 4 servicios con ilustraciones SVG a full ancho
    ├── sobre-nosotros.astro # Misión, visión, valores, proceso
    └── contacto.astro       # Formulario Web3Forms con anti-spam
```

## i18n

- `defaultLocale: 'es'`, `locales: ['es','en']`, `prefixDefaultLocale: true`
- Archivos: `src/i18n/es.json` y `src/i18n/en.json`
- Función: `getTranslations(lang)` en `src/lib/i18n.ts`
- Estructura JSON: `meta`, `meta.pages.{home|services|about|contact}`, `nav`, `theme`, `home_page`, `services_page`, `contact_page`, `about_page`, `footer`

## Tema oscuro/claro

- Clase `.dark` en `<html>`, persistido en `localStorage`
- Script inline en `<head>` de `main-layout.astro` — lee `localStorage` o `prefers-color-scheme`
- Toggle en navbar con iconos Sun/Moon de lucide-astro
- **Patrón dark mode**: `text-k-green dark:text-k-green-light`
- **Patrón label** (consistente en todas las páginas): `text-sm font-bold tracking-widest uppercase text-k-green dark:text-k-green-light`

## Colores (definidos en `src/styles/global.css`)

```css
--color-k-green:       #006239   /* solo en light mode */
--color-k-green-dark:  #004D2C   /* hover en light mode */
--color-k-green-light: #00A878   /* en dark mode */
```

## Layout principal

`src/layouts/main-layout.astro` acepta props:
```ts
{ title?: string; description?: string }
```
Cada página pasa su SEO desde `t.meta.pages.*`.

## Componentes

```
src/components/
├── navbar.astro         # Sticky, logo, links, toggle tema, selector idioma
├── hero.astro           # Typewriter con JetBrains Mono, CTA primario y secundario
├── footer.astro         # Redes sociales, WhatsApp FAB
├── tech-belt.astro      # Carrusel marquee con 21 iconos SVG de tecnologías
├── icons/
│   ├── whatsapp-icon.astro
│   ├── illustration-development.astro   # SVG viewBox="0 0 320 240"
│   ├── illustration-integrations.astro
│   ├── illustration-maintenance.astro
│   ├── illustration-consulting.astro
│   └── tech/                            # 21 iconos: icon-{nombre}.astro
│       csharp, dotnet, swagger, javascript, typescript, nodejs,
│       nextjs, astro, tailwind, nestjs, express, python,
│       django, kotlin, dart, flutter, mysql, postgresql,
│       sqlserver, aws, azure
└── ui/
    ├── form-input.astro
    ├── form-select.astro
    └── form-textarea.astro
```

## Clientes (home page)

- **Arti Productos Industriales** — `/logo/logo-arti.png` — `https://www.arti.com.pe`
- **Layconsa** — `/logo/logo-layconsa.png` (fondo blanco) — `https://www.layconsa.pe`
- Clases para dark mode del logo: `mix-blend-multiply dark:mix-blend-screen dark:brightness-150`

## Web3Forms (formulario de contacto)

- `access_key`: `78d46f44-377b-40a2-9fd6-33ecb30a1322`
- Endpoint: `https://api.web3forms.com/submit`
- Incluye honeypot `botcheck`

## Animaciones (`src/styles/global.css`)

- `.marquee-track` — carrusel tech belt (pausa en hover, respeta `prefers-reduced-motion`)
- Cursor typewriter en hero
- WhatsApp FAB con pulse

## astro.config.mjs actual

```js
site: 'https://www.kadabra.com.pe'
integrations: [sitemap()]
trailingSlash: 'never'
i18n: { defaultLocale: 'es', locales: ['es','en'], routing: { prefixDefaultLocale: true } }
```

## Pendientes futuros

- Sección Testimonios (estructura en JSON lista, comentada en index.astro)
- Comprar dominio `kadabra.com.pe` y configurar en Netlify + DNS
- Probar envío real del formulario Web3Forms
