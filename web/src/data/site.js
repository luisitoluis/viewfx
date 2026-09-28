import { EFFECTS } from './effects'

/**
 * Single source of truth for site-wide metadata.
 * Canonical links, Open Graph tags, the sitemap and the JSON-LD payload derive from `url`.
 */
export const SITE = {
  url: 'https://viewfx.luismc.dev',
  name: 'ViewFX',
  title: 'ViewFX | Tailwind CSS Theme Toggle Plugin',
  tagline: 'A Tailwind CSS plugin of dark/light theme toggle transitions',
  description: `ViewFX is a Tailwind CSS plugin for dark/light theme toggles. Preview ${EFFECTS.length}+ view-transition effects and copy one class onto <html>.`,
  image: 'https://pub-660dca4bd13944bd8c4a80be4489c81e.r2.dev/og.webp',
  imageWidth: 1200,
  imageHeight: 630,
  imageAlt:
    'ViewFX, a Tailwind CSS plugin for theme toggle transitions on the View Transitions API',
  locale: 'en',
  ogLocale: 'en_US',
  twitter: '',
  author: {
    name: 'luisitoluis',
    url: 'https://github.com/luisitoluis'
  },
  repo: 'https://github.com/luisitoluis/viewfx',
  package: 'viewfx',
  npm: 'https://www.npmjs.com/package/viewfx'
}
