---
name: viewfx
description: >
  Use the viewfx npm package (Tailwind CSS v3/v4 plugin) to add View Transitions
  theme wipes. Put one effect class on <html> and wrap the dark-class toggle in
  document.startViewTransition. Covers the effect catalog (circle, polygon, iris,
  slide, fade, …), compound timing ({effect}-duration-*-delay-*), and fx-duration,
  fx-delay, fx-steps. Use when the user wants a theme toggle transition, view
  transition wipe, dark-mode animation, or to install/configure viewfx.
  Triggers: "viewfx", "theme transition", "view transition wipe", "circle-duration",
  "fx-duration", "startViewTransition", /viewfx.
license: MIT
compatibility: Requires Tailwind CSS v3 or v4 and a browser with the View Transitions API for the wipe to play
metadata:
  author: LuisitoLuis
  version: "1.0.0"
  organization: LuisitoLuis
  category: css
  tags: tailwindcss, view-transitions, theme, dark-mode, css, plugin
  homepage: https://viewfx.luismc.dev
  playground: https://viewfx.luismc.dev/playground/
  repository: https://github.com/LuisitoLuis/viewfx
  npm: https://www.npmjs.com/package/viewfx
  docs_markdown: https://viewfx.luismc.dev/llms-full.md
  install: npx skills add LuisitoLuis/viewfx
---

# viewfx (consumer skill)

Help the user **use** the [`viewfx`](https://www.npmjs.com/package/viewfx) package in **their** app. This skill is **not** for contributing to the plugin monorepo.

**Package:** Tailwind utilities that drive a root View Transition when `.dark` toggles on `<html>`. Peer: `tailwindcss@3` or `tailwindcss@4`.
**Site / catalogue:** https://viewfx.luismc.dev
**Playground:** https://viewfx.luismc.dev/playground/
**Agent docs (prefer Markdown):** https://viewfx.luismc.dev/llms-full.md

## When to apply

- Installing or wiring `viewfx` into a Tailwind v4 or v3 app
- Animating a light/dark theme toggle with one class on `<html>`
- Picking an effect, duration, delay, or stepped easing
- Fixing a toggle that changes theme with no wipe

## Install in the consumer project

```bash
npm install viewfx
# pnpm add viewfx
# yarn add viewfx
# bun add viewfx
```

Tailwind CSS **v4** — CSS import only. Do not also register a JS plugin.

```css
/* globals.css / app.css */
@import "tailwindcss";
@import "viewfx";
```

Tailwind CSS **v3** — JavaScript plugin only. Do not `@import "viewfx"` (that entry is the v4 stylesheet).

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require('viewfx')]
}
```

## Core usage

Put **one** effect class and `.dark` on `<html>` (the document element). Custom properties inherit into the view-transition pseudo-elements from there. A class on `<body>` or a wrapper does not drive the root transition.

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

The callback passed to `startViewTransition` must be the function that toggles `.dark`. Calling `startViewTransition` after the class has already changed skips the wipe.

`polygon` reverses direction when `.dark` is present (`.dark.polygon` and `.dark` plus a `polygon-duration-*` class). Other effects do not.

`prefers-reduced-motion: reduce` still toggles the theme and skips the wipe. Browsers without the View Transitions API toggle instantly.

## Timing

Effect classes set their own `--fx-duration`. These override it (`--fx-duration-override` wins):

| Goal | Classes |
|------|---------|
| Duration on the effect | `{effect}-duration-1000`, `{effect}-duration-fast` |
| Duration + delay on the effect | `{effect}-duration-1000-delay-300` |
| Shared duration | `fx-duration-1000`, `fx-duration-fast`, `fx-duration-[777ms]` |
| Shared delay | `fx-delay-300`, `fx-delay-none`, `fx-delay-[120ms]` |
| Stepped easing | `fx-steps-retro`, `fx-steps-normal`, `fx-steps-modern` |

Use either the compound class **or** `fx-duration-*` / `fx-delay-*`, not both. `fx-steps-*` composes with either; it replaces the effect easing with `steps()`.

Duration keys: `none`, `slower` (500ms), `slow` (400ms), `normal` (300ms), `fast` (200ms), `faster` (100ms), `0`, `100`, `150`, `200`, `250`, `300`, `400`, `500`, `700`, `800`, `900`, `1000`.

Delay keys: `none`, `0`, `100`, `150`, `200`, `250`, `300`, `400`, `500`, `700`, `800`, `900`, `1000`. There is no `slow` / `fast` delay scale.

Steps keys: `none` (0), `retro` (8), `normal` (16), `modern` (24).

Built-in effect durations differ (for example `fade` is 0.5s, `circle` is 1.6s, `polygon` is 0.7s). A mask wipe can look finished before that duration if the mask already covers the viewport. `circle` (`150vmax`) and `circle-blur` (`170vmax`) are sized to last the full duration — do not raise those sizes.

## Effect catalog (31)

Use the bare name on `<html>`:

`circle`, `circle-blur`, `polygon`, `corner-tl`, `corner-tr`, `corner-bl`, `corner-br`, `iris`, `diamond`, `hexagon`, `square`, `mosaic`, `soft`, `heart`, `expand`, `split`, `shutter`, `ink`, `spiral`, `slide-right`, `slide-left`, `slide-up`, `slide-down`, `venetian`, `glitch`, `slide`, `lift`, `zoom`, `rotate`, `fade`, `dissolve`

`slide` is the transform push. `slide-right` / `slide-left` / `slide-up` / `slide-down` are clip-path wipes. Do not treat them as the same effect.

## Playground

https://viewfx.luismc.dev/playground/

Shareable query params: `e` (effect), `d` (duration key), `delay` (delay key), `s` (steps key).

Example:
`https://viewfx.luismc.dev/playground/?e=circle&d=1000&delay=300&s=none`

GIF studio (record a toggle, not required to ship the effect): https://viewfx.luismc.dev/gif/

## Agent reading of the docs site

Prefer Markdown over scraping HTML:

- https://viewfx.luismc.dev/llm.txt
- https://viewfx.luismc.dev/llms.txt
- https://viewfx.luismc.dev/index.md
- https://viewfx.luismc.dev/playground.md
- https://viewfx.luismc.dev/gif.md
- https://viewfx.luismc.dev/llms-full.md

## Best practices

1. One effect class on `<html>`. Stacking `circle` and `polygon` fights over the same custom properties.
2. Keep `.dark` on `<html>`, the same node as the effect.
3. Guard `document.startViewTransition` and still perform the class toggle when it is missing.
4. Leave reduced motion to the package. Do not add a second animation on `::view-transition-*` that ignores it.
5. Prefer `fade` when the View Transitions API or mask support is uncertain.

## Anti-patterns

- Registering `require('viewfx')` in a Tailwind v4 project that already `@import`s it (or the reverse).
- Putting the effect class anywhere other than `<html>`.
- Toggling a `data-theme` attribute or a `.dark` class on `<body>` and expecting `polygon` to reverse.
- Inventing class names (`animate-circle`, `viewfx-circle`, `fx-circle`). The effect name is the class.
- Treating this skill as monorepo contributor docs (out of scope).

## Quick recipes

**Default wipe**

```html
<html class="dark polygon">
```

**Slow circle with delay**

```html
<html class="dark circle-duration-1000-delay-300">
```

**Shared timing plus steps**

```html
<html class="dark fade fx-duration-700 fx-delay-100 fx-steps-retro">
```

**Toggle**

```js
const root = document.documentElement
const apply = () => root.classList.toggle('dark')
if (document.startViewTransition) document.startViewTransition(apply)
else apply()
```
