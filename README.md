<div align="center">

# ViewFX



[![en](https://img.shields.io/badge/lang-en-ef4444?style=flat&labelColor=0a0a0a)](./README.md)
[![es](https://img.shields.io/badge/lang-es-eab308?style=flat&labelColor=0a0a0a)](./README.es.md)

[![GitHub stars](https://img.shields.io/github/stars/LuisitoLuis/viewfx?style=flat&labelColor=0a0a0a&color=eab308)](https://github.com/LuisitoLuis/viewfx/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/LuisitoLuis/viewfx?style=flat&labelColor=0a0a0a&color=3b82f6)](https://github.com/LuisitoLuis/viewfx/forks)
[![GitHub PRs](https://img.shields.io/github/issues-pr/LuisitoLuis/viewfx?style=flat&labelColor=0a0a0a&color=22c55e)](https://github.com/LuisitoLuis/viewfx/pulls)
[![GitHub issues](https://img.shields.io/github/issues/LuisitoLuis/viewfx?style=flat&labelColor=0a0a0a&color=ef4444)](https://github.com/LuisitoLuis/viewfx/issues)
[![GitHub Contributors](https://img.shields.io/github/contributors/LuisitoLuis/viewfx?style=flat&labelColor=0a0a0a&color=f97316)](https://github.com/LuisitoLuis/viewfx/graphs/contributors)

![ViewFX Image](https://pub-660dca4bd13944bd8c4a80be4489c81e.r2.dev/web.webp)

![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-blue?style=for-the-badge&logo=tailwind-css)
[![npm](https://img.shields.io/npm/v/viewfx?style=for-the-badge)](https://www.npmjs.com/package/viewfx)

Theme transitions with one Tailwind class on <code>&lt;html&gt;</code>.

Package: [`viewfx`](https://www.npmjs.com/package/viewfx)

Visit the [GitHub repository](https://github.com/LuisitoLuis/viewfx) to get more information.

</div>

## Installation :book:

#### Package install

> Install the package with your favorite package manager:

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

#### Plugin Implementation

> Use the plugin in your Tailwind CSS project:

```css
/* globals.css (for Tailwind CSS 4.*) */
@import 'tailwindcss';
@import 'viewfx';
```

> Tailwind CSS v3 — register the JavaScript plugin:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [
    require('viewfx')
  ]
}
```

## Usage :gear:

#### Example

> Put an effect class on `<html>`, then wrap your theme toggle in `document.startViewTransition`:

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

Timing can sit in the same class (`circle-duration-1000`, `circle-duration-1000-delay-300`) or as separate utilities: `fx-duration-1000`, `fx-delay-300`, `fx-steps-modern`.

Theme is expected as a `.dark` class on `<html>` (the `polygon` wipe reverses in dark).

`prefers-reduced-motion: reduce` is honoured: the theme still changes, without the wipe. Browsers without the View Transitions API skip the animation and toggle instantly.

### Effects

31 utilities. Hover to preview and click to copy on the [catalogue](https://viewfx.luismc.dev).

`circle`, `circle-blur`, `polygon`, `corner-tl`, `corner-tr`, `corner-bl`, `corner-br`, `iris`, `diamond`, `hexagon`, `square`, `mosaic`, `soft`, `heart`, `expand`, `split`, `shutter`, `ink`, `spiral`, `slide-right`, `slide-left`, `slide-up`, `slide-down`, `venetian`, `glitch`, `slide`, `lift`, `zoom`, `rotate`, `fade`, `dissolve`.

## Contributors 👑

<a href="https://github.com/LuisitoLuis/viewfx/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=LuisitoLuis/viewfx" alt="ViewFX contributors" />
</a>
