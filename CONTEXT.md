# Contexto del proyecto — Kadabra Sitio Corporativo

> Adjunta este archivo al inicio de cada sesión con Copilot para restaurar el contexto completo.

---

## Stack

- **Astro** v7 — generador estático (actualizado desde v6.1.10, upgrade intencional y temprano)
- **Tailwind CSS** v4 via `@tailwindcss/vite`
- **TypeScript** v5 (+ `@astrojs/check` como devDependency para `npx astro check`)
- **@astrojs/sitemap** v3.7
- **@lucide/astro** — iconos UI (migrado desde `lucide-astro`, que quedó deprecado; ver nota abajo)
- **@fontsource-variable/inter** — fuente body
- **@fontsource-variable/jetbrains-mono** — fuente hero (font-mono)
- Node.js >= 22.12.0

## Repositorio

- GitHub: `kadabra-company/kadabra` (rama `master`)
- Versión actual: `0.1.0` (`package.json`)
- Deploy: **Cloudflare Workers**, con Git integration (auto-deploy en cada push a `master`). Config en `wrangler.jsonc` (assets estáticos desde `./dist`, sin adaptador SSR — no hace falta `@astrojs/cloudflare`, el sitio es 100% estático).
- Dominio: `https://www.kadabracompany.com` (activo) y `kadabracompany.com` (raíz, también conectado directo al Worker) — ambos vía Custom Domains en Cloudflare.
- DNS: migrado de Namecheap (BasicDNS) a Cloudflare (nameservers `ashton.ns.cloudflare.com` / `zainab.ns.cloudflare.com`). Los registros de correo (MX, SPF, DMARC, autoconfig/autodiscover/mail → privateemail.com) se preservaron intactos.
- URLs de respaldo de Cloudflare: `kadabra.cristhian-apaza.workers.dev` (producción) y `*-kadabra.cristhian-apaza.workers.dev` (previews por rama que no sea `master`).
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
│   ├── github-icon.astro                # SVG propio: @lucide/astro eliminó los íconos de marca (Github, Linkedin, etc.) en v1
│   ├── linkedin-icon.astro              # mismo motivo — path calcado del lucide-astro viejo para que se vean idénticos
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

- `access_key`: `78d46f44-377b-40a2-9fd6-33ecb30a1322` (plan gratuito)
- Endpoint: `https://api.web3forms.com/submit`
- Incluye honeypot `botcheck`. **Sin Captcha** (decisión consciente: no restarle conversión a un formulario de cotización) — la protección anti-spam real es el honeypot + "Advanced Spam Filter" activado en el dashboard de Web3Forms.
- Dashboard Web3Forms configurado: Website URL → `kadabracompany.com`, Recipient Email → `cristhian.apaza@kadabracompany.com` (confirmado que recibe), Sender Name → "Kadabra Web", Advanced Spam Filter → activado, Restrict to Domains / Auto Responder / Intro Text → no disponibles (features Pro).
- Campo `subject` NO se manda como input fijo: el input visible "Asunto" se renombró a `name="topic"` (evitaba un choque de nombres con un hidden `subject` que quedaba muerto). El JS arma el asunto real antes de enviar: `` `[ Kadabra Web ] - ${data.topic}` ``.
- `maxlength` por campo: documento 20, nombre 80, correo 50, teléfono 20, asunto 60, mensaje 1000.
- Autocorrección al salir del campo (`blur`, no en cada tecla): nombre → Title Case, asunto → Sentence Case, correo → minúsculas. El mensaje (textarea) se dejó **sin** autocorrección a propósito (es multi-oración; forzar mayúscula/minúscula rompería siglas y nombres propios).

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

## Ojo con esto (bugs históricos ya arreglados, no reintroducir)

- `tsconfig.json` tenía `"exclude": ["dist", "src"]` desde el primer commit — excluía **toda** la carpeta `src` del proyecto de TypeScript, así que nunca se aplicaba `moduleResolution: "Bundler"` (ni el resto de `compilerOptions`) al código real. Causaba errores falsos de "Cannot find module" en paquetes con `exports` modernos (ej. `@lucide/astro`). Ya está en `"exclude": ["dist"]` — si alguna vez alguien vuelve a agregar `"src"` ahí, va a repetirse el problema.

## Pendientes futuros

- Sección Testimonios (estructura en JSON lista, comentada en index.astro)
- Confirmar si Netlify sigue activo en paralelo (deploy manual viejo) — si ya no se usa, borrar el sitio ahí para no confundir cuál es la versión "real" publicada
- Decidir si desactivar la URL pública `kadabra.cristhian-apaza.workers.dev` (no es necesario, pero evita contenido duplicado de cara a SEO ya que el dominio real está funcionando)
