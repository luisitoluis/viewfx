/**
 * Markdown documents for AI agents that fetch the website.
 * Generated at build time as static .md endpoints.
 */
import pkg from '@root/package.json'
import { SITE } from '@data/site.js'
import { EFFECTS } from '@data/effects.js'
import {
  ANIMATION_DELAY,
  ANIMATION_DURATION,
  ANIMATION_STEPS
} from '@data/timing.js'

const NPM = SITE.npm
const effects = EFFECTS.map((effect) => effect.id)
const durations = Object.keys(ANIMATION_DURATION)
const delays = Object.keys(ANIMATION_DELAY)
const steps = Object.keys(ANIMATION_STEPS)

const mdHeaders = {
  'Content-Type': 'text/markdown; charset=utf-8',
  'X-Content-Type-Options': 'nosniff',
  'Cache-Control': 'public, max-age=3600'
}

const txtHeaders = {
  'Content-Type': 'text/plain; charset=utf-8',
  'X-Content-Type-Options': 'nosniff',
  'Cache-Control': 'public, max-age=3600'
}

export function markdownResponse(body) {
  return new Response(body, { headers: mdHeaders })
}

export function textResponse(body) {
  return new Response(body, { headers: txtHeaders })
}

export function buildHomeMarkdown() {
  return `# ViewFX

> Theme transition utilities for **Tailwind CSS v3/v4**. Package \`${SITE.package}@${pkg.version}\`. MIT licensed.

This document is the **agent-readable** version of the homepage.
Human UI: ${SITE.url}/ · Markdown: ${SITE.url}/index.md · Full catalog: ${SITE.url}/llms-full.md

## Quick links

| Resource | URL |
|----------|-----|
| Website | ${SITE.url}/ |
| Playground | ${SITE.url}/playground/ |
| Playground (markdown) | ${SITE.url}/playground.md |
| GIF studio | ${SITE.url}/gif/ |
| GIF studio (markdown) | ${SITE.url}/gif.md |
| npm | ${NPM} |
| GitHub | ${SITE.repo} |
| How to use the package | ${SITE.url}/llm.txt |
| llms.txt | ${SITE.url}/llms.txt |
| Full agent doc | ${SITE.url}/llms-full.md |

## Install

\`\`\`bash
npm install ${SITE.package}
# or: pnpm add ${SITE.package}
# or: yarn add ${SITE.package}
# or: bun add ${SITE.package}
\`\`\`

\`\`\`css
@import "tailwindcss";
@import "${SITE.package}";
\`\`\`

**Tailwind v3:** \`plugins: [require('${SITE.package}')]\` in \`tailwind.config.js\`.

## Usage

Put one effect class and \`.dark\` on \`<html>\`, then wrap theme toggles in \`document.startViewTransition\`.

\`\`\`html
<html class="dark polygon">
<html class="dark circle-duration-1000-delay-300">
<html class="dark fade fx-duration-1000 fx-delay-300 fx-steps-modern">
\`\`\`

## Site sections (HTML)

- \`#install-command\` — install snippet
- \`#palette\` — gallery of all effects (hover preview, click copy)
- \`#faq\` — FAQ
- Playground CTA → \`${SITE.url}/playground/\`
- GIF studio → \`${SITE.url}/gif/\`

## Effect catalog (${effects.length})

${effects.map((name) => `- \`${name}\``).join('\n')}

## Timing modifiers

### Duration (\`fx-duration-*\` or \`{effect}-duration-*\`)
${durations.map((k) => `\`${k}\``).join(', ')}

### Delay (\`fx-delay-*\` or \`{effect}-delay-*\`)
${delays.map((k) => `\`${k}\``).join(', ')}

### Steps (\`fx-steps-*\`)
${steps.map((k) => `\`${k}\``).join(', ')}

## Playground URL state

\`${SITE.url}/playground/?e=polygon&d=1000&delay=0&s=none\`

| Param | Meaning |
|-------|---------|
| \`e\` | effect id |
| \`d\` | duration key |
| \`delay\` | delay key |
| \`s\` | steps key |

## For AI agents

- Prefer markdown/text endpoints (\`/llm.txt\`, \`/index.md\`, \`/playground.md\`, \`/gif.md\`, \`/llms-full.md\`) over scraping HTML.
- Source of truth for CSS: \`${SITE.repo}/blob/main/src/index.css\`

---
Generated from \`${SITE.package}@${pkg.version}\` · ${SITE.url}
`
}

export function buildPlaygroundMarkdown() {
  return `# ViewFX — Playground

> Live composition sandbox for \`viewfx\` theme transitions.

HTML UI: ${SITE.url}/playground/
This markdown: ${SITE.url}/playground.md
Home (markdown): ${SITE.url}/index.md

## What you can do

1. Pick an effect from ${effects.length} utilities
2. Tune duration, delay, and steps
3. Play the wipe on the real View Transitions API
4. Copy the class list
5. Share the URL (query params encode state)

## Available effects

${effects.map((name) => `- \`${name}\``).join('\n')}

## Controls

| Control | Class pattern | Keys |
|---------|---------------|------|
| Duration | \`fx-duration-{key}\` | ${durations.join(', ')} |
| Delay | \`fx-delay-{key}\` | ${delays.join(', ')} |
| Steps | \`fx-steps-{key}\` | ${steps.join(', ')} |

## Related

- How to use the package: ${SITE.url}/llm.txt
- Package install + full docs: ${SITE.url}/index.md
- Full agent reference: ${SITE.url}/llms-full.md
- Source: ${SITE.repo}

---
Generated from \`${SITE.package}@${pkg.version}\`
`
}

export function buildGifMarkdown() {
  return `# ViewFX — GIF studio

> Use a GIF as the View Transitions mask (same technique as https://theme-toggle.rdsx.dev/).

HTML UI: ${SITE.url}/gif/
This markdown: ${SITE.url}/gif.md
Playground: ${SITE.url}/playground/

## What you can do

1. Pick a GIF from the list, or paste a GIF URL
2. Tune duration and mask size
3. Play — the GIF masks \`::view-transition-new(root)\` while \`.dark\` toggles
4. Copy the CSS or share the page URL (\`?e=\` for a preset, \`?gif=\` for a custom link)

Transparent GIF frames reveal the incoming theme. One file is enough for both directions.

## Related

- Playground: ${SITE.url}/playground.md
- Home: ${SITE.url}/index.md

---
Generated from \`${SITE.package}@${pkg.version}\`
`
}

export function buildLlmsFullMarkdown() {
  return `# viewfx — full agent reference

Package: \`${SITE.package}@${pkg.version}\`
npm: ${NPM}
Repo: ${SITE.repo}
Site: ${SITE.url}
License: MIT

## What it is

A Tailwind CSS plugin of **${effects.length} dark/light theme transitions** on the native View Transitions API. Put one effect class on \`<html>\` and wrap the theme toggle in \`document.startViewTransition\`.

\`\`\`css
@import "tailwindcss";
@import "${SITE.package}";
\`\`\`

## Website map for agents

| Path | Purpose |
|------|---------|
| \`/\` | Marketing + live demos |
| \`/index.md\` | Home as Markdown |
| \`/playground/\` | Interactive class composer |
| \`/playground.md\` | Playground as Markdown |
| \`/gif/\` | GIF as a View Transitions mask |
| \`/gif.md\` | GIF studio as Markdown |
| \`/llm.txt\` | How to use the npm package (for AIs) |
| \`/llms.txt\` | Short LLM summary |
| \`/llms-full.md\` | This full reference |

## Effect names

Prefix is the class itself (no \`animate-\`).

${effects.map((n) => `- \`${n}\``).join('\n')}

---
End of agent reference · ${SITE.package}@${pkg.version}
`
}

export function buildLlmTxt() {
  const durationKeys = durations.join('\\|')
  const delayKeys = delays.join('\\|')
  const stepKeys = steps.join('\\|')

  return `# viewfx — how to use this package

You are helping a developer add a light/dark theme wipe with the \`viewfx\` npm package.
This file is the shortest complete usage guide. Do not invent class names that are not listed here.

Package: \`${SITE.package}@${pkg.version}\`
npm: ${NPM}
Site: ${SITE.url}
Playground: ${SITE.url}/playground/
Full reference: ${SITE.url}/llms-full.md
Skill: \`npx skills add LuisitoLuis/viewfx\`

## What it is

A Tailwind CSS plugin of **${effects.length} theme transitions** on the native View Transitions API.
Put **one** effect class and \`.dark\` on \`<html>\`, then wrap the class toggle in \`document.startViewTransition\`.

Tailwind **v4**: CSS import only. Do not also register a JS plugin.
Tailwind **v3**: \`require('viewfx')\` in \`plugins\`. Do not \`@import "viewfx"\` (that entry is the v4 stylesheet).

Peer dependency: \`"tailwindcss": "^3.0.0 || ^4.0.0"\`.

## Install

\`\`\`bash
npm install viewfx
# pnpm add viewfx
# yarn add viewfx
# bun add viewfx
\`\`\`

\`\`\`css
/* globals.css / app.css — Tailwind v4 */
@import "tailwindcss";
@import "viewfx";
\`\`\`

\`\`\`js
/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require('viewfx')]
}
\`\`\`

## How to pick a class

1. Choose an effect name from the catalog.
2. Put that name on \`<html>\` → \`<html class="dark circle">\`. There is no \`animate-\` prefix.
3. Optionally add timing: \`{effect}-duration-1000-delay-300\`, or \`fx-duration-*\` / \`fx-delay-*\` / \`fx-steps-*\`.
4. Toggle \`.dark\` inside \`document.startViewTransition\`.
5. Preview composition at ${SITE.url}/playground/

The effect class has to live on the document element. A class on \`<body>\` or a wrapper does not drive the root view transition.

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

The function passed to \`startViewTransition\` must be the one that toggles \`.dark\`. Calling it after the class has already changed skips the wipe.

\`polygon\` reverses when \`.dark\` is present. Other effects do not.
\`prefers-reduced-motion: reduce\` still toggles the theme and skips the wipe. Browsers without the View Transitions API toggle instantly.

## Effect catalog (${effects.length})

Use the bare name on \`<html>\`:

${effects.map((name) => `- ${name}`).join('\n')}

\`slide\` is the transform push. \`slide-right\` / \`slide-left\` / \`slide-up\` / \`slide-down\` are clip-path wipes.

## Modifiers

Use either the compound class **or** \`fx-duration-*\` / \`fx-delay-*\`, not both. \`fx-steps-*\` composes with either and replaces the effect easing with \`steps()\`.

| Goal | Classes |
|------|---------|
| Duration on the effect | \`{effect}-duration-{${durationKeys}}\` |
| Duration + delay on the effect | \`{effect}-duration-{key}-delay-{${delayKeys}}\` |
| Shared duration | \`fx-duration-{${durationKeys}}\` or \`fx-duration-[777ms]\` |
| Shared delay | \`fx-delay-{${delayKeys}}\` or \`fx-delay-[120ms]\` |
| Stepped easing | \`fx-steps-{${stepKeys}}\` |

Duration \`slower\` is 500ms, \`slow\` 400ms, \`normal\` 300ms, \`fast\` 200ms, \`faster\` 100ms. Delay has no \`slow\` / \`fast\` scale. Steps: \`none\` (0), \`retro\` (8), \`normal\` (16), \`modern\` (24).

## Recipes

Default wipe:

\`\`\`html
<html class="dark polygon">
\`\`\`

Slow circle with delay:

\`\`\`html
<html class="dark circle-duration-1000-delay-300">
\`\`\`

Shared timing plus steps:

\`\`\`html
<html class="dark fade fx-duration-700 fx-delay-100 fx-steps-retro">
\`\`\`

## Do / Don't

Do:
- Use names from the catalog above, one effect class on \`<html>\`.
- Keep \`.dark\` on the same node as the effect.
- Guard \`document.startViewTransition\` and still toggle the class when it is missing.
- Use the playground when unsure: ${SITE.url}/playground/?e=circle&d=1000&delay=300&s=none

Don't:
- Register \`require('viewfx')\` in a Tailwind v4 project that already imports it (or the reverse).
- Put the effect class anywhere other than \`<html>\`.
- Toggle a \`data-theme\` attribute or \`.dark\` on \`<body>\` and expect \`polygon\` to reverse.
- Invent names (\`animate-circle\`, \`viewfx-circle\`, \`fx-circle\`). The effect name is the class.
- Stack two effects (\`circle\` and \`polygon\`) on the same element.

## More docs (prefer these over HTML)

- This guide: ${SITE.url}/llm.txt
- Short index: ${SITE.url}/llms.txt
- Home (Markdown): ${SITE.url}/index.md
- Playground (Markdown): ${SITE.url}/playground.md
- GIF studio (Markdown): ${SITE.url}/gif.md
- Full catalog: ${SITE.url}/llms-full.md
- Source of truth: ${SITE.repo}/blob/main/src/index.css

---
Generated from \`${SITE.package}@${pkg.version}\` · ${SITE.url}
`
}
