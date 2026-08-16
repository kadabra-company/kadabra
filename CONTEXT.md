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
- Versión actual: `0.1.0` (`package.json`)
- Deploy: Netlify (drag & drop de `/dist` por ahora)
- Dominio: `https://www.kadabracompany.com` (activo)
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
├── footer.astro         # Redes sociales, botón flotante de WhatsApp (visible en todas las páginas)
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
- **Umbral Centro Cultural** — `/logo/logo-umbral.png` (isotipo, fondo transparente) — `https://umbralcentrocultural.com/`
- Clases para dark mode del logo: `mix-blend-multiply dark:mix-blend-screen dark:brightness-150`
- Tooltip con el nombre de la empresa al hacer hover (útil para logos que son solo ícono, sin texto)

## Web3Forms (formulario de contacto)

- `access_key`: `78d46f44-377b-40a2-9fd6-33ecb30a1322`
- Endpoint: `https://api.web3forms.com/submit`
- Incluye honeypot `botcheck`

## Animaciones (`src/styles/global.css`)

- `.marquee-track` — carrusel tech belt (pausa en hover, respeta `prefers-reduced-motion`)
- Cursor typewriter en hero
- WhatsApp FAB (renderizado desde `footer.astro`, visible en todas las páginas):
  - `fab-enter` — aparece con fade + slide-up 1.1s después de cargar la página
  - `fab-ring` — doble anillo expansivo en bucle (`::before`/`::after`, escalonados)
  - `fab-badge-pop` — badge rojo de notificación ("1") con animación de entrada

## astro.config.mjs actual

```js
site: 'https://www.kadabracompany.com'
integrations: [sitemap()]
trailingSlash: 'never'
i18n: { defaultLocale: 'es', locales: ['es','en'], routing: { prefixDefaultLocale: true } }
```

## Pendientes futuros

- Sección Testimonios (estructura en JSON lista, comentada en index.astro)
- Verificar en Web3Forms que `kadabracompany.com` esté en la lista de dominios permitidos para ese `access_key` (el dominio de envío cambió de kadabra.com.pe)
- Probar envío real del formulario Web3Forms desde el dominio nuevo
