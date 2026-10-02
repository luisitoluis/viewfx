# AGENTS.md

## What this is

pnpm workspace with two members: the root package **`viewfx`** (published to npm — a Tailwind CSS v3/v4 plugin for View Transitions theme effects) and **`web/`** (private Astro 7 catalogue site, consumes `viewfx: workspace:*`). Node >= 22.12, pnpm 12.

## Commands

- `pnpm test:ci` — the exact command CI runs (`vitest run`, ~2s, 41 tests). Run this before finishing.
- `pnpm test` — vitest watch mode.
- Single test file: `pnpm exec vitest run test/index.test.js`; add `-t "name substring"` for one test.
- `pnpm emit:masks` — regenerates `src/masks.css` from `src/masks.js`. Required after any mask/SVG edit; `src/masks.css` is committed and must not be hand-edited.
- Site: `pnpm --filter web dev` / `pnpm --filter web build`.
- There is **no** lint, format, or typecheck config — don't invent one. CI (`.github/workflows/ci.yml`) does nothing but `pnpm install && pnpm test:ci` on push/PR to `main`.

## Architecture: two hand-synced plugin implementations

The plugin ships as parallel v4 and v3 implementations. Tests assert both emit identical output for every effect, so changes to effects/timing must be made in **both**:

- **Tailwind v4 (CSS-first):** `src/index.css` (`@import 'viewfx'`). `@utility` blocks at the bottom mirror `src/effects.cjs`; `@theme inline` mirrors `src/theme.json`.
- **Tailwind v3 (JS plugin):** `src/plugin.cjs` loads `effects.cjs`, `engine.cjs`, `compound.cjs`, `theme.json`. `src/plugin.js` is only an ESM re-export of the `.cjs`.
- **Compound classes** (`circle-duration-1000-delay-300`) are registered from JS via `src/compound.cjs` (`@plugin` in v4) because Tailwind v4 `@utility` allows only one `*`. Don't try to express them in CSS.
- **Duplicated sources:** `src/masks.js` (ESM) and `src/masks.cjs` (CJS) are byte-identical apart from module syntax — edit both, then run `pnpm emit:masks`. Same for the `src/effects.cjs` ↔ `src/index.css` `@utility` pairs and `src/theme.json` ↔ `@theme inline`.

## The effect catalogue is shared across package and site

`web/src/data/effects.js` exports `EFFECTS`, imported by the site **and** by root tests (`test/*.test.js`). Adding an effect means touching:

1. `src/effects.cjs` and the matching `@utility` in `src/index.css` (mask-based effects also need an SVG in `src/masks.js` + `src/masks.cjs`, then `pnpm emit:masks`)
2. an entry in `web/src/data/effects.js`
3. the effect list in `README.md` **and** `README.es.md` (Spanish mirror — keep both in sync)

Tests fail if the catalogue and the plugin drift (`emits every catalogue utility` in both `test/index.test.js` and `test/v3.test.js`).

## Testing quirks

- Tests compile real CSS through PostCSS (`test/utils.js`) and assert **exact minified strings** — whitespace/ordering changes in generated CSS break tests; that's intentional.
- `tailwindcss-v3` in devDependencies is an npm alias for `tailwindcss@3.4.17`, used to regression-test the v3 plugin path.
- `generatePluginCSSFromPackage` resolves `@import "viewfx"` through the workspace link, so it only works with `pnpm install` run from the repo root.
- Root tests import from `web/src/lib/playground.js` — `web/` code is covered by root tests even though `web/` has no test script.

## Other

- Package publish contents are controlled by `"files": ["src"]` in root `package.json` (plus `.npmignore`); `web/`, `scripts/`, `test/` never ship.
- Commit style is Conventional Commits (`feat:`, `fix:`, `chore:`); the PR template asks for test cases and results.
- `.agents/skills/` holds third-party agent skills pinned by `skills-lock.json` — treat as vendored, don't hand-edit.
- Deploy config lives outside the repo (Vercel); there is no deploy workflow to modify.
