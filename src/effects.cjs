/** Effect utilities — keep in sync with `@utility` blocks in `src/index.css`. */

module.exports = {
  '.circle': {
    '--fx-anim': 'fx-mask-grow',
    '--fx-anim-old': 'none',
    '--fx-old-z': '-1',
    '--fx-mask': 'var(--mask-circle)',
    '--fx-mask-size': '150vmax',
    '--fx-duration': '1.6s',
    '--fx-ease': 'ease-in-out'
  },
  '.circle-blur': {
    '--fx-anim': 'fx-mask-grow',
    '--fx-anim-old': 'none',
    '--fx-old-z': '-1',
    '--fx-mask': 'var(--mask-circle-blur)',
    '--fx-mask-size': '170vmax',
    '--fx-duration': '1.6s',
    '--fx-ease': 'ease-in-out'
  },
  '.corner-tl': {
    '--fx-anim': 'fx-mask-grow',
    '--fx-anim-old': 'none',
    '--fx-old-z': '-1',
    '--fx-mask': 'var(--mask-corner-tl)',
    '--fx-mask-position': 'top left',
    '--fx-mask-size': '200vmax',
    '--fx-duration': '1.6s',
    '--fx-ease': 'ease-in-out'
  },
  '.corner-tr': {
    '--fx-anim': 'fx-mask-grow',
    '--fx-anim-old': 'none',
    '--fx-old-z': '-1',
    '--fx-mask': 'var(--mask-corner-tr)',
    '--fx-mask-position': 'top right',
    '--fx-mask-size': '200vmax',
    '--fx-duration': '1.6s',
    '--fx-ease': 'ease-in-out'
  },
  '.corner-bl': {
    '--fx-anim': 'fx-mask-grow',
    '--fx-anim-old': 'none',
    '--fx-old-z': '-1',
    '--fx-mask': 'var(--mask-corner-bl)',
    '--fx-mask-position': 'bottom left',
    '--fx-mask-size': '200vmax',
    '--fx-duration': '1.6s',
    '--fx-ease': 'ease-in-out'
  },
  '.corner-br': {
    '--fx-anim': 'fx-mask-grow',
    '--fx-anim-old': 'none',
    '--fx-old-z': '-1',
    '--fx-mask': 'var(--mask-corner-br)',
    '--fx-mask-position': 'bottom right',
    '--fx-mask-size': '200vmax',
    '--fx-duration': '1.6s',
    '--fx-ease': 'ease-in-out'
  },
  '.iris': {
    '--fx-anim': 'fx-mask-grow',
    '--fx-anim-old': 'none',
    '--fx-old-z': '-1',
    '--fx-mask': 'var(--mask-star)',
    '--fx-mask-size': '320vmax',
    '--fx-duration': '1.6s',
    '--fx-ease': 'ease-in-out'
  },
  '.diamond': {
    '--fx-anim': 'fx-mask-grow',
    '--fx-anim-old': 'none',
    '--fx-old-z': '-1',
    '--fx-mask': 'var(--mask-diamond)',
    '--fx-mask-size': '300vmax',
    '--fx-duration': '1.6s',
    '--fx-ease': 'ease-in-out'
  },
  '.hexagon': {
    '--fx-anim': 'fx-mask-grow',
    '--fx-anim-old': 'none',
    '--fx-old-z': '-1',
    '--fx-mask': 'var(--mask-hexagon)',
    '--fx-mask-size': '320vmax',
    '--fx-duration': '1.6s',
    '--fx-ease': 'ease-in-out'
  },
  '.square': {
    '--fx-anim': 'fx-mask-grow',
    '--fx-anim-old': 'none',
    '--fx-old-z': '-1',
    '--fx-mask': 'var(--mask-square)',
    '--fx-mask-size': '280vmax',
    '--fx-duration': '1.6s',
    '--fx-ease': 'ease-in-out'
  },
  '.mosaic': {
    '--fx-anim': 'fx-mosaic',
    '--fx-anim-old': 'none',
    '--fx-old-z': '-1',
    '--fx-duration': '1.2s',
    '--fx-ease': 'cubic-bezier(0.4, 0, 0.15, 1)'
  },
  '.soft': {
    '--fx-anim': 'fx-mask-grow',
    '--fx-anim-old': 'none',
    '--fx-old-z': '-1',
    '--fx-mask': 'var(--mask-soft)',
    '--fx-mask-size': '300vmax',
    '--fx-duration': '1.6s',
    '--fx-ease': 'ease-in-out'
  },
  '.heart': {
    '--fx-anim': 'fx-mask-grow',
    '--fx-anim-old': 'none',
    '--fx-old-z': '-1',
    '--fx-mask': 'var(--mask-heart)',
    '--fx-mask-size': '300vmax',
    '--fx-duration': '1.6s',
    '--fx-ease': 'ease-in-out'
  },
  '.expand': {
    '--fx-anim': 'fx-expand-in',
    '--fx-anim-old': 'none',
    '--fx-old-z': '-1',
    '--fx-duration': '0.6s'
  },
  '.split': {
    '--fx-anim': 'fx-split-in',
    '--fx-anim-old': 'none',
    '--fx-old-z': '-1',
    '--fx-duration': '0.7s'
  },
  '.shutter': {
    '--fx-anim': 'fx-shutter-in',
    '--fx-anim-old': 'none',
    '--fx-old-z': '-1',
    '--fx-duration': '0.7s'
  },
  '.ink': {
    '--fx-anim': 'fx-mask-grow',
    '--fx-anim-old': 'none',
    '--fx-old-z': '-1',
    '--fx-mask': 'var(--mask-ink)',
    '--fx-mask-size': '280vmax',
    '--fx-duration': '1.8s',
    '--fx-ease': 'ease-in-out'
  },
  '.spiral': {
    '--fx-anim': 'fx-spiral',
    '--fx-anim-old': 'none',
    '--fx-old-z': '-1',
    '--fx-mask': 'conic-gradient(from 0deg, #fff 0%, transparent 0%)',
    '--fx-mask-size': '280vmax',
    '--fx-duration': '1.8s',
    '--fx-ease': 'ease-in-out'
  },
  '.polygon': {
    '--fx-anim': 'fx-reveal-light',
    '--fx-anim-old': 'none',
    '--fx-old-z': '-1',
    '--fx-duration': '0.7s'
  },
  '.dark.polygon': {
    '--fx-anim': 'fx-reveal-dark'
  },
  '.dark[class*="polygon-duration"]': {
    '--fx-anim': 'fx-reveal-dark'
  },
  '.slide-right': {
    '--fx-anim': 'fx-wipe-in-h',
    '--fx-anim-old': 'fx-wipe-out-h',
    '--fx-duration': '0.6s'
  },
  '.slide-left': {
    '--fx-anim': 'fx-wipe-in-left',
    '--fx-anim-old': 'fx-wipe-out-left',
    '--fx-duration': '0.6s'
  },
  '.slide-up': {
    '--fx-anim': 'fx-wipe-in-up',
    '--fx-anim-old': 'fx-wipe-out-up',
    '--fx-duration': '0.6s'
  },
  '.slide-down': {
    '--fx-anim': 'fx-wipe-in-down',
    '--fx-anim-old': 'fx-wipe-out-down',
    '--fx-duration': '0.6s'
  },
  '.venetian': {
    '--fx-anim': 'fx-wipe-in-down',
    '--fx-anim-old': 'fx-venetian-out',
    '--fx-duration': '0.8s'
  },
  '.glitch': {
    '--fx-anim': 'fx-glitch-in',
    '--fx-anim-old': 'fx-glitch-out',
    '--fx-duration': '1s',
    '--fx-ease': 'step-end'
  },
  '.slide': {
    '--fx-anim': 'fx-slide-in',
    '--fx-anim-old': 'fx-slide-out',
    '--fx-duration': '0.6s'
  },
  '.lift': {
    '--fx-anim': 'fx-lift-in',
    '--fx-anim-old': 'fx-lift-out',
    '--fx-duration': '0.7s'
  },
  '.zoom': {
    '--fx-anim': 'fx-zoom-in',
    '--fx-anim-old': 'fx-zoom-out',
    '--fx-duration': '0.7s'
  },
  '.rotate': {
    '--fx-anim': 'fx-rotate-in',
    '--fx-anim-old': 'fx-rotate-out',
    '--fx-duration': '0.7s'
  },
  '.fade': {
    '--fx-anim': 'fx-fade-in',
    '--fx-anim-old': 'fx-fade-out',
    '--fx-duration': '0.5s',
    '--fx-ease': 'ease-in-out'
  },
  '.dissolve': {
    '--fx-anim': 'fx-blur-in',
    '--fx-anim-old': 'fx-blur-out',
    '--fx-duration': '0.7s',
    '--fx-ease': 'ease-in-out'
  }
}
