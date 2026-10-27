/**
 * Effect catalogue. `id` is the `data-fx` value on cards and the suffix of
 * the class on `<html>`. `className` is a string literal so Tailwind
 * can scan it; `css` is the snippet shown in the code dialog.
 */

export const TECHNIQUES = ['mask', 'clip-path', 'transform', 'opacity']

export const DEFAULT_EFFECT_ID = 'polygon'
export const DEFAULT_EFFECT_CLASS = 'polygon'

const usage = (className) => `<html class="${className}">`

export const EFFECTS = [
  {
    id: 'circle',
    className: 'circle',
    name: 'Circle',
    desc: 'An SVG circle mask expanding from the centre of the viewport.',
    technique: 'mask',
    durationMs: 1600,
    css: usage('circle')
  },
  {
    id: 'circle-blur',
    className: 'circle-blur',
    name: 'Circle Blur',
    desc: 'The same circle, softened with an feGaussianBlur edge.',
    technique: 'mask',
    durationMs: 1600,
    css: usage('circle-blur')
  },
  {
    id: 'polygon',
    className: 'polygon',
    name: 'Diagonal Wipe',
    desc: 'A clip-path polygon sweeping corner to corner.',
    technique: 'clip-path',
    durationMs: 700,
    css: usage('polygon')
  },
  {
    id: 'corner-tl',
    className: 'corner-tl',
    name: 'Corner Top-Left',
    desc: 'A circular wipe growing out of the top-left corner.',
    technique: 'mask',
    durationMs: 1600,
    css: usage('corner-tl')
  },
  {
    id: 'corner-tr',
    className: 'corner-tr',
    name: 'Corner Top-Right',
    desc: 'The mirrored wipe, anchored to the top-right corner.',
    technique: 'mask',
    durationMs: 1600,
    css: usage('corner-tr')
  },
  {
    id: 'corner-bl',
    className: 'corner-bl',
    name: 'Corner Bottom-Left',
    desc: 'The same wipe, anchored to the bottom-left corner.',
    technique: 'mask',
    durationMs: 1600,
    css: usage('corner-bl')
  },
  {
    id: 'corner-br',
    className: 'corner-br',
    name: 'Corner Bottom-Right',
    desc: 'Closes the set — a wipe from the bottom-right corner.',
    technique: 'mask',
    durationMs: 1600,
    css: usage('corner-br')
  },
  {
    id: 'iris',
    className: 'iris',
    name: 'Star Iris',
    desc: 'A five-pointed star opening like a camera iris.',
    technique: 'mask',
    durationMs: 1600,
    css: usage('iris')
  },
  {
    id: 'diamond',
    className: 'diamond',
    name: 'Diamond',
    desc: 'A rotated square mask scaling out from the centre.',
    technique: 'mask',
    durationMs: 1600,
    css: usage('diamond')
  },
  {
    id: 'hexagon',
    className: 'hexagon',
    name: 'Hexagon',
    desc: 'A six-sided mask — subtler than the circle, still geometric.',
    technique: 'mask',
    durationMs: 1600,
    css: usage('hexagon')
  },
  {
    id: 'square',
    className: 'square',
    name: 'Square',
    desc: 'An axis-aligned square growing from the centre. Cleaner than the diamond.',
    technique: 'mask',
    durationMs: 1600,
    css: usage('square')
  },
  {
    id: 'mosaic',
    className: 'mosaic',
    name: 'Mosaic',
    desc: 'An 8×8 lattice of tiles blooming from each cell — quiet, then complete.',
    technique: 'mask',
    durationMs: 1200,
    css: usage('mosaic')
  },
  {
    id: 'soft',
    className: 'soft',
    name: 'Soft Bloom',
    desc: 'A wide ellipse with a heavy Gaussian edge — cinematic, not geometric.',
    technique: 'mask',
    durationMs: 1600,
    css: usage('soft')
  },
  {
    id: 'heart',
    className: 'heart',
    name: 'Heart',
    desc: 'A heart-shaped path mask. Use responsibly.',
    technique: 'mask',
    durationMs: 1600,
    css: usage('heart')
  },
  {
    id: 'expand',
    className: 'expand',
    name: 'Expand',
    desc: 'A rectangular iris from the centre — the practical clip-path wipe.',
    technique: 'clip-path',
    durationMs: 600,
    css: usage('expand')
  },
  {
    id: 'split',
    className: 'split',
    name: 'Split Curtain',
    desc: 'Two edges meet in the middle, then part like a stage curtain.',
    technique: 'clip-path',
    durationMs: 700,
    css: usage('split')
  },
  {
    id: 'shutter',
    className: 'shutter',
    name: 'Shutter',
    desc: 'Top and bottom edges open like a camera shutter.',
    technique: 'clip-path',
    durationMs: 700,
    css: usage('shutter')
  },
  {
    id: 'ink',
    className: 'ink',
    name: 'Ink Bleed',
    desc: 'feTurbulence warps the circle edge like ink on paper.',
    technique: 'mask',
    durationMs: 1800,
    css: usage('ink')
  },
  {
    id: 'spiral',
    className: 'spiral',
    name: 'Spiral',
    desc: 'A conic-gradient mask unwinding around the centre.',
    technique: 'mask',
    durationMs: 1800,
    css: usage('spiral')
  },
  {
    id: 'slide-right',
    className: 'slide-right',
    name: 'Slide Right',
    desc: 'A hard inset edge travelling left to right.',
    technique: 'clip-path',
    durationMs: 600,
    css: usage('slide-right')
  },
  {
    id: 'slide-left',
    className: 'slide-left',
    name: 'Slide Left',
    desc: 'The hard edge travelling right to left.',
    technique: 'clip-path',
    durationMs: 600,
    css: usage('slide-left')
  },
  {
    id: 'slide-up',
    className: 'slide-up',
    name: 'Slide Up',
    desc: 'A hard inset edge travelling from the bottom up.',
    technique: 'clip-path',
    durationMs: 600,
    css: usage('slide-up')
  },
  {
    id: 'slide-down',
    className: 'slide-down',
    name: 'Slide Down',
    desc: 'The same edge, falling from the top of the viewport.',
    technique: 'clip-path',
    durationMs: 600,
    css: usage('slide-down')
  },
  {
    id: 'venetian',
    className: 'venetian',
    name: 'Venetian',
    desc: 'A slower vertical reveal, like opening a blind.',
    technique: 'clip-path',
    durationMs: 800,
    css: usage('venetian')
  },
  {
    id: 'glitch',
    className: 'glitch',
    name: 'Glitch',
    desc: 'A digital slice flicker with a sideways offset.',
    technique: 'clip-path',
    durationMs: 1000,
    css: usage('glitch')
  },
  {
    id: 'slide',
    className: 'slide',
    name: 'Slide Left',
    desc: 'The new theme pushes the old one off screen.',
    technique: 'transform',
    durationMs: 600,
    css: usage('slide')
  },
  {
    id: 'lift',
    className: 'lift',
    name: 'Lift',
    desc: 'The new theme rises in; the old one eases up and out.',
    technique: 'transform',
    durationMs: 700,
    css: usage('lift')
  },
  {
    id: 'zoom',
    className: 'zoom',
    name: 'Zoom',
    desc: 'The old view scales away while the new one settles in.',
    technique: 'transform',
    durationMs: 700,
    css: usage('zoom')
  },
  {
    id: 'rotate',
    className: 'rotate',
    name: 'Rotate',
    desc: 'A few degrees of tilt on the way in and out.',
    technique: 'transform',
    durationMs: 700,
    css: usage('rotate')
  },
  {
    id: 'fade',
    className: 'fade',
    name: 'Cross-fade',
    desc: 'The safe default. Works everywhere, surprises nobody.',
    technique: 'opacity',
    durationMs: 500,
    css: usage('fade')
  },
  {
    id: 'dissolve',
    className: 'dissolve',
    name: 'Blur Dissolve',
    desc: 'A soft-focus cross-fade. The old view blurs out as the new one sharpens.',
    technique: 'opacity',
    durationMs: 700,
    css: usage('dissolve')
  }
]
