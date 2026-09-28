<div align="center">

# ViewFX



[![en](https://img.shields.io/badge/lang-en-ef4444?style=flat&labelColor=0a0a0a)](./README.md)
[![es](https://img.shields.io/badge/lang-es-eab308?style=flat&labelColor=0a0a0a)](./README.es.md)

[![GitHub stars](https://img.shields.io/github/stars/LuisitoLuis/viewfx?style=flat&labelColor=0a0a0a&color=eab308)](https://github.com/LuisitoLuis/viewfx/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/LuisitoLuis/viewfx?style=flat&labelColor=0a0a0a&color=3b82f6)](https://github.com/LuisitoLuis/viewfx/forks)
[![GitHub PRs](https://img.shields.io/github/issues-pr/LuisitoLuis/viewfx?style=flat&labelColor=0a0a0a&color=22c55e)](https://github.com/LuisitoLuis/viewfx/pulls)
[![GitHub issues](https://img.shields.io/github/issues/LuisitoLuis/viewfx?style=flat&labelColor=0a0a0a&color=ef4444)](https://github.com/LuisitoLuis/viewfx/issues)
[![GitHub Contributors](https://img.shields.io/github/contributors/LuisitoLuis/viewfx?style=flat&labelColor=0a0a0a&color=f97316)](https://github.com/LuisitoLuis/viewfx/graphs/contributors)

![Catálogo de ViewFX](https://pub-660dca4bd13944bd8c4a80be4489c81e.r2.dev/web.webp)

![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-blue?style=for-the-badge&logo=tailwind-css)
[![npm](https://img.shields.io/npm/v/viewfx?style=for-the-badge)](https://www.npmjs.com/package/viewfx)

Transiciones de tema con una sola clase de Tailwind en <code>&lt;html&gt;</code>.

Paquete: [`viewfx`](https://www.npmjs.com/package/viewfx)

Visita el [repositorio en GitHub](https://github.com/LuisitoLuis/viewfx) para obtener más información.

</div>

## Instalación :book:

#### Instalar el paquete

> Instala el paquete con tu gestor de paquetes favorito:

- npm

```bash
npm install viewfx
```

- pnpm

```bash
pnpm add viewfx
```

- yarn

```bash
yarn add viewfx
```

#### Implementación del plugin

> Úsalo en tu proyecto de Tailwind CSS:

```css
/* globals.css (para Tailwind CSS 4.*) */
@import 'tailwindcss';
@import 'viewfx';
```

> Tailwind CSS v3 — registra el plugin de JavaScript:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [
    require('viewfx')
  ]
}
```

## Uso :gear:

#### Ejemplo

> Pon una clase de efecto en `<html>` y envuelve el toggle de tema en `document.startViewTransition`:

```html
<html class="dark circle">
```

```html
<html class="dark circle-duration-1000-delay-300">
```

```js
const switchTheme = () =>
  document.documentElement.classList.toggle('dark')

document.startViewTransition
  ? document.startViewTransition(switchTheme)
  : switchTheme()
```

El timing puede ir en la misma clase (`circle-duration-1000`, `circle-duration-1000-delay-300`) o en utilidades sueltas: `fx-duration-1000`, `fx-delay-300`, `fx-steps-modern`.

El tema se espera como clase `.dark` en `<html>` (el wipe `polygon` se invierte en oscuro).

`prefers-reduced-motion: reduce` se respeta: el tema cambia, el wipe no. Los navegadores sin View Transitions API cambian al instante.

### Efectos

31 utilidades. Pasa el ratón para previsualizar y haz clic para copiar en el [catálogo](https://viewfx.luismc.dev).

`circle`, `circle-blur`, `polygon`, `corner-tl`, `corner-tr`, `corner-bl`, `corner-br`, `iris`, `diamond`, `hexagon`, `square`, `mosaic`, `soft`, `heart`, `expand`, `split`, `shutter`, `ink`, `spiral`, `slide-right`, `slide-left`, `slide-up`, `slide-down`, `venetian`, `glitch`, `slide`, `lift`, `zoom`, `rotate`, `fade`, `dissolve`.

## Contribuidores 👑

<a href="https://github.com/LuisitoLuis/viewfx/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=LuisitoLuis/viewfx" alt="Contribuidores de ViewFX" />
</a>
