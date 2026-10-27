import { SITE } from '@data/site'
import { EFFECTS } from '@data/effects'

const classes = EFFECTS.map((effect) => `\`${effect.id}\``).join(', ')

/**
 * Prompt copied by the hero “Install from prompt” button for coding agents.
 */
export const AGENT_INSTALL_PROMPT = `Install and use **${SITE.package}** in this project.

## What it is
A Tailwind CSS plugin of ${EFFECTS.length} dark/light **theme transitions** on the native View Transitions API. Put one effect class on \`<html>\` and wrap the theme toggle in \`document.startViewTransition\`. Tailwind v4 uses a CSS import; Tailwind v3 uses \`require('${SITE.package}')\`.

## Install the package
\`\`\`bash
npm install ${SITE.package}
# or: pnpm add ${SITE.package} / yarn add ${SITE.package} / bun add ${SITE.package}
\`\`\`

Tailwind CSS v4 (global CSS):
\`\`\`css
@import "tailwindcss";
@import "${SITE.package}";
\`\`\`

Tailwind CSS v3:
\`\`\`js
/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [
    require('${SITE.package}')
  ]
}
\`\`\`

## Usage
Put the effect and \`.dark\` on \`<html>\`. Timing can live in the same class or as \`fx-*\` utilities.

\`\`\`html
<html class="dark circle">
<html class="dark circle-duration-1000-delay-300">
<html class="dark polygon fx-duration-1000 fx-delay-300 fx-steps-modern">
\`\`\`

\`\`\`js
const switchTheme = () =>
  document.documentElement.classList.toggle('dark')

document.startViewTransition
  ? document.startViewTransition(switchTheme)
  : switchTheme()
\`\`\`

- Theme class: \`.dark\` on \`<html>\` (the \`polygon\` wipe reverses in dark).
- Timing: \`circle-duration-1000\`, \`circle-duration-1000-delay-300\`, or \`fx-duration-1000\`, \`fx-delay-300\`, \`fx-steps-modern\`.
- \`prefers-reduced-motion: reduce\` still toggles the theme but skips the wipe. Browsers without the View Transitions API switch instantly.

Effects: ${classes}.

## Documentation
- Catalogue: ${SITE.url}
- Playground: ${SITE.url}/playground
- GIF studio: ${SITE.url}/gif
- GitHub: ${SITE.repo}
- npm: ${SITE.npm}
- README: ${SITE.repo}#readme

Please install the package, wire the v4 CSS import (or the v3 plugin), put one effect class on \`<html>\`, and wrap theme toggles in \`document.startViewTransition\`. Prefer the README and playground over scraping the HTML catalogue.
`
