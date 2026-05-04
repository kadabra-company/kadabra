<div align="center">
  <img src="public/logo/kadabra-isotipo.svg" alt="Kadabra Logo" width="80" />

  # WebPage

  **Sitio web corporativo de Kadabra**

  ![Astro](https://img.shields.io/badge/Astro-6.1-FF5D01?style=flat&logo=astro&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.2-38BDF8?style=flat&logo=tailwindcss&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)

</div>

---

## Acerca del proyecto

Kadabra WebPage es el sitio corporativo de **Kadabra**, empresa de desarrollo de software a medida. El sitio está construido con Astro como generador estático, soporta dos idiomas (Español e Inglés) con detección automática del navegador, y tiene tema oscuro/claro persistido en `localStorage`.

Características principales:

- Bilingüe ES / EN con detección automática del idioma del navegador
- Tema oscuro y claro, con paleta de colores inspirada en Supabase
- Selector de idioma y toggle de tema integrados en el navbar
- Fuente Inter Variable con configuración avanzada de `font-feature-settings`

---

## Estructura del proyecto

```
kadabra/
├── public/
│   ├── favicon.ico
│   └── logo/
│       └── main-logo.png            # Logo PNG de la marca
│
├── src/
│   ├── components/
│   │   ├── navbar.astro             # Navbar sticky con logo, links, tema e idioma
│   │   ├── hero.astro               # Sección hero de la homepage
│   │   ├── footer.astro             # Footer con redes sociales y contacto
│   │   └── ui/
│   │       ├── form-input.astro     # Input reutilizable con label y validación
│   │       ├── form-select.astro    # Select reutilizable con label y validación
│   │       └── form-textarea.astro  # Textarea reutilizable con label y validación
│   │
│   ├── i18n/
│   │   ├── es.json                  # Textos en español
│   │   └── en.json                  # Textos en inglés
│   │
│   ├── layouts/
│   │   └── main-layout.astro        # Shell HTML, head, script de tema, navbar, footer
│   │
│   ├── lib/
│   │   └── i18n.ts                  # getLangFromUrl() y getTranslations()
│   │
│   ├── pages/
│   │   ├── index.astro              # Redirect raíz → idioma del navegador
│   │   └── [lang]/
│   │       ├── index.astro          # Homepage (genera /es y /en)
│   │       └── contacto.astro       # Página de contacto con formulario Web3Forms
│   │
│   └── styles/
│       └── global.css               # Tailwind v4, @theme, variables CSS, animaciones
│
├── astro.config.mjs                 # Config Astro: i18n, trailingSlash, Vite/Tailwind
├── tsconfig.json
└── package.json
```

---

## Flujo de la aplicación

### Detección de idioma

```
Usuario visita /
       │
       ▼
index.astro (script cliente)
       │
       ├─ navigator.language empieza con "es"? ──► redirect a /es
       │
       └─ cualquier otro idioma ──────────────────► redirect a /en
```

La ruta raíz `/` no renderiza contenido — solo ejecuta un script `is:inline` que lee `navigator.language` y redirige inmediatamente.

### Resolución de ruta e idioma

```
URL: /es  o  /en  o  /es/contacto  o  /en/contacto
               │
               ▼
    [lang]/index.astro  |  [lang]/contacto.astro
               │
               ▼
    getLangFromUrl(url)  ──►  extrae "es" o "en" del pathname
               │
               ▼
    getTranslations(lang)  ──►  importa es.json o en.json (import estático, HMR activo)
               │
               ▼
    Renderiza página con textos del idioma correspondiente
```

### Envío del formulario de contacto

```
Usuario completa el formulario y hace submit
       │
       ▼
fetch POST → https://api.web3forms.com/submit
       │
       ├─ json.success === true ──► muestra mensaje de éxito + resetea el formulario
       │
       └─ error de red o API  ──► muestra mensaje de error
```

El formulario incluye un honeypot anti-spam (`botcheck`) y un `access_key` que identifica la cuenta de Web3Forms.

### Tema oscuro / claro

```
Carga de página
      │
      ▼
main-layout.astro → <script is:inline> en <head>
      │
      ├─ localStorage.getItem("theme")  existe? ──► aplica ese valor
      │
      └─ no existe ──────────────────────────────► aplica "dark" (default)
      │
      ▼
document.documentElement.classList.add("dark" | "light")
      │
      ▼
Click en toggle de tema (navbar)
      │
      ▼
classList.toggle("dark")  +  localStorage.setItem("theme", ...)
```

### Cambio de idioma

```
Click en ES o EN (navbar)
         │
         ▼
href calculado server-side en navbar.astro:
  currentPath.replace(`/${lang}`, "/es" | "/en")

Ejemplo: /en/contacto  ──►  /es/contacto
         │
         ▼
Astro genera la nueva ruta estática con el JSON del idioma elegido
```

---

## Cómo levantar el proyecto

### Requisitos

- Node.js `>= 22.12.0`
- npm

### Instalación

```bash
git clone https://github.com/cristhian-apaza/kadabra.git
cd kadabra
npm install
```

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:4321](http://localhost:4321) — redirige automáticamente según el idioma del navegador.

### Build de producción

```bash
npm run build
npm run preview   # previsualiza el build estático
```

---

## Autores

| Autor | Rol |
|-------|-----|
| [Cristhian Apaza](https://github.com/cristhian-apaza) | Fundador & Developer |
| [GitHub Copilot](https://github.com/features/copilot) — Claude Sonnet 4.6 | AI Pair Programmer |
