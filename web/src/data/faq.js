import { SITE } from './site'
import { EFFECTS } from './effects'

export const FAQ = [
  {
    q: 'What is ViewFX?',
    a: `ViewFX is a Tailwind CSS plugin for theme toggles. It ships ${EFFECTS.length} dark/light transitions on the native View Transitions API. Put one class on <html> and wrap your theme toggle in document.startViewTransition — no custom keyframes required.`
  },
  {
    q: 'How do I install it?',
    a: `Run pnpm add ${SITE.package} (or npm / yarn / bun / deno), then add @import 'tailwindcss'; and @import '${SITE.package}'; to your global CSS for Tailwind v4.`
  },
  {
    q: 'Does it work with Tailwind CSS v3 and v4?',
    a: `Yes. Tailwind v4 uses the CSS import. Tailwind v3 registers the same utilities with plugins: [require("${SITE.package}")] in tailwind.config.js.`
  },
  {
    q: 'How do I use an effect class?',
    a: 'Add a class such as circle, fade, or polygon to <html>. Timing can share that class (circle-duration-1000-delay-300) or use fx-duration-*, fx-delay-*, and fx-steps-*. The theme class is expected to be .dark on the same element.'
  },
  {
    q: 'Does the plugin toggle light and dark mode by itself?',
    a: 'No. You still toggle the .dark class. ViewFX only styles the view-transition snapshots between the two themes. Browsers without the API skip the animation and switch instantly.'
  },
  {
    q: 'What happens with reduced motion?',
    a: 'prefers-reduced-motion: reduce turns off the wipe. The theme still changes; the motion does not run.'
  },
  {
    q: 'Is it free and open source?',
    a: `Yes. The project is MIT licensed, free to use commercially, and open for contributions on GitHub at ${SITE.repo.replace('https://github.com/', '')}.`
  }
]
