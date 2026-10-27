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
3. the `@source inline` safelists in `web/src/styles/global.css` (effect name, `{effect}-duration-*`, and `{effect}-duration-*-delay-*`)
4. the effect list in `README.md` **and** `README.es.md` (Spanish mirror — keep both in sync)

Tests fail if the catalogue and the plugin drift (`emits every catalogue utility` in both `test/index.test.js` and `test/v3.test.js`).

## Timing

Speed is a theme token, not a per-page constant. `src/theme.json` (`duration`, `delay`, `steps`) is the source. Mirror new keys in `src/index.css` `@theme inline` (`--fx-duration-*`, `--fx-delay-*`, `--fx-steps-*`) and in the `@source inline` lists in `web/src/styles/global.css`. v3 reads `theme.json` from `src/plugin.cjs`. The site selects import it through `web/src/data/timing.js`.

The engine uses `var(--fx-duration-override, var(--fx-duration, 0.5s))`. Effect utilities set `--fx-duration`. `fx-duration-*` and `{effect}-duration-*` (`src/compound.cjs`) set `--fx-duration-override` and win. `slower` / `slow` / `normal` / `fast` / `faster` are the short scale (500ms down to 100ms). The longest token is `1000` (1000ms).

A mask wipe looks faster than the chosen duration when `--fx-mask-size` covers the viewport before the animation ends. `circle` is `150vmax` and `circle-blur` is `170vmax`, both `ease-in-out`, so they last the full duration — don't raise those sizes without checking that. Gallery cards tune the same thing with `--preview-mask-peak` (`140%` / `160%` for the circles) in `web/src/components/EffectPreview.astro`. A card that sets `--gallery-duration` ignores the gallery Duration control.

## Testing quirks

- Tests compile real CSS through PostCSS (`test/utils.js`) and assert **exact minified strings** — whitespace/ordering changes in generated CSS break tests; that's intentional.
- `tailwindcss-v3` in devDependencies is an npm alias for `tailwindcss@3.4.17`, used to regression-test the v3 plugin path.
- `generatePluginCSSFromPackage` resolves `@import "viewfx"` through the workspace link, so it only works with `pnpm install` run from the repo root.
- Root tests import from `web/src/lib/playground.js` — `web/` code is covered by root tests even though `web/` has no test script.

## Commit types

Use the most accurate type:

- `feat`: new feature
- `fix`: bug fix
- `docs`: documentation only
- `style`: formatting only, no logic change
- `refactor`: code change without behavior change
- `perf`: performance improvement
- `test`: tests added or updated
- `build`: build system or dependencies
- `ci`: CI/CD changes
- `chore`: maintenance
- `revert`: revert previous commit

## Scope

Use a short scope when useful:

```bash
fix(auth): Handle expired session
feat(payments): Add retry flow
docs(readme): Update setup instructions
test(cart): Cover discount calculation
```

Skip scope only if it adds no value:

```bash
chore: Update dependencies
```

Good scopes are usually:

- feature area
- package name
- route name
- module name
- service name
- config name

Examples:

```bash
fix(login): Show invalid credentials error
feat(dashboard): Add revenue chart
test(api): Cover pagination params
ci(github): Cache pnpm dependencies
build(vite): Update bundle config
```

The PR template asks for test cases and results.

## Other

- Package publish contents are controlled by `"files": ["src"]` in root `package.json` (plus `.npmignore`); `web/`, `scripts/`, `test/` never ship.
- `.agents/skills/` holds third-party agent skills pinned by `skills-lock.json` — treat as vendored, don't hand-edit.
- Deploy config lives outside the repo (Vercel); there is no deploy workflow to modify.
