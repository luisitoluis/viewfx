import { isDark } from '@lib/theme'
import { announce } from '@lib/live-region'
import { toastSuccess } from '@components/toasts/toast'
import { GIF_DURATION, GIF_PRESETS, DEFAULT_GIF_ID } from '@data/gif'

const SIZE_KEYS = ['30%', '50%', '70%', '100%', 'cover']

function cssUrl(url) {
  return `url(${JSON.stringify(url)})`
}

function parseGifLink(value) {
  const trimmed = value.trim()
  if (!trimmed) return ''

  try {
    const url = new URL(trimmed)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return ''
    return url.href
  } catch {
    return ''
  }
}

function restartUrl(href) {
  try {
    const url = new URL(href)
    url.searchParams.set('_t', String(Date.now()))
    return url.href
  } catch {
    return href
  }
}

function flashLabel(button, message) {
  const label = button.querySelector('[data-label]')
  if (!(label instanceof HTMLElement)) return
  const previous = label.textContent ?? ''
  label.textContent = message
  window.setTimeout(() => {
    label.textContent = previous
  }, 1200)
}

function holdSize(value) {
  if (value === 'cover' || value === '100%') return '100vmax'
  if (typeof value === 'string' && value.endsWith('%')) return `${value.slice(0, -1)}vmax`
  return '50vmax'
}

function parseDurationKey(value) {
  if (value && value in GIF_DURATION) return value
  if (value === '1000' || value === '900' || value === '800' || value === '700') return '1s'
  return '3s'
}

function presetById(id) {
  return GIF_PRESETS.find((gif) => gif.id === id) ?? null
}

function presetByHref(href) {
  return GIF_PRESETS.find((gif) => gif.href === href) ?? null
}

export function buildSnippet(gifHref, hold, duration) {
  const src = gifHref || ' '
  return `::view-transition-group(root) {
  animation-timing-function: var(--expo-in);
}

::view-transition-new(root) {
  mask: url('${src}') center / 0 no-repeat;
  animation: scale ${duration};
  animation-fill-mode: both;
}

::view-transition-old(root),
.dark::view-transition-old(root) {
  animation: none;
  z-index: -1;
}

@keyframes scale {
  0% {
    mask-size: 0px;
  }
  10% {
    mask-size: ${hold};
  }
  90% {
    mask-size: ${hold};
  }
  100% {
    mask-size: 2000vmax;
  }
}`
}

function maskSheet(playHref, hold, duration) {
  const mask = cssUrl(playHref)
  return `html.gif-mask,
html.gif-mask.dark {
  --fx-anim: none;
  --fx-anim-old: none;
  --fx-mask: none;
  --fx-old-z: -1;
}

html.gif-mask.theme-swap.has-gif-mask::view-transition-group(root),
html.gif-mask.theme-swap.has-gif-mask::view-transition-old(root),
html.gif-mask.theme-swap.has-gif-mask::view-transition-new(root) {
  animation: none !important;
  -webkit-mask-image: none !important;
  mask-image: none !important;
}

html.gif-mask.theme-swap.has-gif-mask::view-transition-group(gif-live) {
  animation-duration: ${duration};
  animation-timing-function: var(--expo-in);
}

html.gif-mask.theme-swap.has-gif-mask::view-transition-new(gif-live) {
  -webkit-mask-image: ${mask} !important;
  mask-image: ${mask} !important;
  -webkit-mask-position: center !important;
  mask-position: center !important;
  -webkit-mask-repeat: no-repeat !important;
  mask-repeat: no-repeat !important;
  -webkit-mask-origin: border-box !important;
  mask-origin: border-box !important;
  -webkit-mask-size: 0px;
  mask-size: 0px;
  animation: gif-mask-scale ${duration} linear both !important;
}

html.gif-mask.theme-swap.has-gif-mask::view-transition-old(gif-live) {
  -webkit-mask-image: none !important;
  mask-image: none !important;
  animation: none !important;
  z-index: -1 !important;
}

@keyframes gif-mask-scale {
  0% {
    -webkit-mask-size: 0px;
    mask-size: 0px;
  }
  10% {
    -webkit-mask-size: ${hold};
    mask-size: ${hold};
  }
  90% {
    -webkit-mask-size: ${hold};
    mask-size: ${hold};
  }
  100% {
    -webkit-mask-size: 2000vmax;
    mask-size: 2000vmax;
  }
}`
}

function decodeImage(href) {
  const probe = new Image()
  const ready = Promise.race([
    new Promise((resolve) => {
      probe.onload = resolve
      probe.onerror = resolve
    }),
    new Promise((resolve) => window.setTimeout(resolve, 350))
  ])
  probe.src = href
  void probe.decode().catch(() => {})
  return ready
}

export function initGifStudio() {
  const root = document.documentElement
  const input = document.getElementById('gif-url')
  const thumb = document.getElementById('gif-thumb')
  const play = document.getElementById('play-btn')
  const snippet = document.getElementById('class-snippet')
  const htmlSnippet = document.getElementById('html-snippet')
  const copyClasses = document.getElementById('copy-classes')
  const copyUrl = document.getElementById('copy-url')
  const clear = document.getElementById('gif-clear')
  const searches = document.querySelectorAll('.gif-search')
  const lists = document.querySelectorAll('.gif-list')
  const durationSelects = [...document.querySelectorAll('.ctrl-duration')].filter(
    (el) => el instanceof HTMLSelectElement
  )
  const sizeSelects = [...document.querySelectorAll('.ctrl-size')].filter(
    (el) => el instanceof HTMLSelectElement
  )

  if (
    !(input instanceof HTMLInputElement) ||
    !(thumb instanceof HTMLImageElement) ||
    durationSelects.length === 0 ||
    sizeSelects.length === 0 ||
    !play ||
    !snippet ||
    !htmlSnippet ||
    !copyClasses ||
    !copyUrl ||
    !clear
  ) {
    return
  }

  const durationValue = () => durationSelects[0]?.value ?? '3s'
  const sizeValue = () => sizeSelects[0]?.value ?? '50%'

  const params = new URLSearchParams(window.location.search)
  const nextDuration = parseDurationKey(params.get('d'))
  const nextSize = SIZE_KEYS.includes(params.get('size') ?? '') ? params.get('size') : '50%'
  for (const select of durationSelects) select.value = nextDuration
  for (const select of sizeSelects) select.value = nextSize

  const fromQuery = parseGifLink(params.get('gif') ?? '')
  const fromId = presetById(params.get('e') ?? '')
  input.value = fromQuery || fromId?.href || ''

  root.classList.add('gif-mask')

  const live = document.getElementById('gif-live')
  if (live && isDark()) live.classList.add('dark')

  const playLive = () => {
    if (!live) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const start = document.startViewTransition?.bind(document)
    const flip = () => live.classList.toggle('dark')

    if (!start || reduced) {
      flip()
      return
    }

    const clear = () => {
      live.style.viewTransitionName = ''
      root.classList.remove('theme-swap')
    }

    root.classList.add('theme-swap')
    live.style.viewTransitionName = 'gif-live'

    let transition
    try {
      transition = start(flip)
    } catch {
      flip()
      clear()
      return
    }

    transition?.finished.then(clear, clear)
    for (const settled of [transition?.ready, transition?.updateCallbackDone, transition?.finished]) {
      settled?.catch(() => {})
    }
  }

  const durationCss = () => GIF_DURATION[durationValue()] ?? '3s'
  const gifHref = () => parseGifLink(input.value)

  const syncClear = () => {
    clear.hidden = !input.value.trim()
  }

  const paint = (href) => {
    if (!href) {
      thumb.removeAttribute('src')
      thumb.hidden = true
      return
    }

    thumb.src = href
    thumb.hidden = false
  }

  const syncVars = () => {
    root.style.setProperty('--gif-hold', holdSize(sizeValue()))
    root.style.setProperty('--gif-duration', durationCss())
  }

  const armMask = async ({ restart = false } = {}) => {
    const href = gifHref()
    if (!href) {
      root.style.removeProperty('--gif-mask')
      root.classList.remove('has-gif-mask')
      document.getElementById('gif-mask-sheet')?.remove()
      syncVars()
      return ''
    }

    const playHref = restart ? restartUrl(href) : href
    root.style.setProperty('--gif-mask', cssUrl(playHref))
    root.classList.add('has-gif-mask')
    syncVars()

    let sheet = document.getElementById('gif-mask-sheet')
    if (!(sheet instanceof HTMLStyleElement)) {
      sheet = document.createElement('style')
      sheet.id = 'gif-mask-sheet'
      document.head.appendChild(sheet)
    }
    sheet.textContent = maskSheet(playHref, holdSize(sizeValue()), durationCss())

    await decodeImage(playHref)
    return playHref
  }

  const updateUrl = () => {
    const url = new URL(window.location.href)
    if (durationValue() === '3s') url.searchParams.delete('d')
    else url.searchParams.set('d', durationValue())
    if (sizeValue() === '50%') url.searchParams.delete('size')
    else url.searchParams.set('size', sizeValue())
    url.searchParams.delete('gif')
    url.searchParams.delete('gif2')
    const preset = presetByHref(gifHref())
    if (preset && preset.id !== DEFAULT_GIF_ID) url.searchParams.set('e', preset.id)
    else url.searchParams.delete('e')
    history.replaceState(null, '', url)
  }

  const shareHref = () => {
    const url = new URL(window.location.href)
    const gif = gifHref()
    const preset = presetByHref(gif)
    if (preset) {
      url.searchParams.delete('gif')
      if (preset.id === DEFAULT_GIF_ID) url.searchParams.delete('e')
      else url.searchParams.set('e', preset.id)
    } else if (gif) {
      url.searchParams.set('gif', gif)
      url.searchParams.delete('e')
    } else {
      url.searchParams.delete('gif')
      url.searchParams.delete('e')
    }
    url.searchParams.delete('gif2')
    return url.href
  }

  const updateSnippet = () => {
    snippet.textContent = buildSnippet(gifHref(), holdSize(sizeValue()), durationCss())
    htmlSnippet.textContent = `if (!document.startViewTransition) switchTheme()
document.startViewTransition(switchTheme);`
  }

  const markGif = () => {
    const href = gifHref()
    document.querySelectorAll('[data-gif]').forEach((button) => {
      const selected = button.getAttribute('data-href') === href
      button.setAttribute('aria-selected', String(selected))
      button.classList.toggle('is-selected', selected)
    })
  }

  const refresh = ({ play: shouldPlay } = { play: false }) => {
    paint(gifHref())
    syncClear()
    syncVars()
    updateSnippet()
    updateUrl()
    markGif()
    void armMask({ restart: shouldPlay }).then(() => {
      if (shouldPlay && gifHref()) {
        playLive()
        announce('GIF mask transition played')
      }
    })
  }

  lists.forEach((list) => {
    list.addEventListener('click', (event) => {
      const button = event.target instanceof Element ? event.target.closest('[data-gif]') : null
      const href = button?.getAttribute('data-href')
      if (!href) return
      input.value = href
      refresh({ play: true })
    })
  })

  searches.forEach((search) => {
    search.addEventListener('input', () => {
      if (!(search instanceof HTMLInputElement)) return
      const query = search.value.trim().toLowerCase()
      searches.forEach((other) => {
        if (other instanceof HTMLInputElement && other !== search) other.value = search.value
      })
      document.querySelectorAll('[data-gif]').forEach((button) => {
        const id = button.getAttribute('data-gif') ?? ''
        const name = button.getAttribute('data-name') ?? ''
        const match = query === '' || id.includes(query) || name.toLowerCase().includes(query)
        button.classList.toggle('hidden', !match)
      })
    })
  })

  input.addEventListener('input', syncClear)
  input.addEventListener('change', refresh)
  input.addEventListener('paste', () => window.setTimeout(refresh, 0))
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      refresh()
    }
  })

  const syncSelects = (selects, value) => {
    for (const select of selects) select.value = value
  }

  durationSelects.forEach((select) => {
    select.addEventListener('change', () => {
      syncSelects(durationSelects, select.value)
      refresh({ play: true })
    })
  })
  sizeSelects.forEach((select) => {
    select.addEventListener('change', () => {
      syncSelects(sizeSelects, select.value)
      refresh({ play: true })
    })
  })

  clear.addEventListener('click', () => {
    input.value = ''
    refresh()
    input.focus()
    announce('GIF removed')
  })

  play.addEventListener('click', async () => {
    const href = gifHref()
    if (!href) {
      toastSuccess('Pick a GIF first')
      return
    }

    play.disabled = true
    try {
      await armMask({ restart: true })
      await new Promise((resolve) => requestAnimationFrame(() => resolve()))
      playLive()
      announce('GIF mask transition played')
    } finally {
      play.disabled = false
    }
  })

  copyClasses.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(buildSnippet(gifHref(), holdSize(sizeValue()), durationCss()))
      announce('CSS copied to clipboard')
      flashLabel(copyClasses, 'Copied!')
      toastSuccess('CSS copied to clipboard')
    } catch {
      announce('Could not copy CSS')
    }
  })

  copyUrl.addEventListener('click', async () => {
    updateUrl()
    try {
      await navigator.clipboard.writeText(shareHref())
      announce('Share URL copied to clipboard')
      flashLabel(copyUrl, 'URL copied!')
      toastSuccess('Share URL copied to clipboard')
    } catch {
      announce('Could not copy URL')
    }
  })

  thumb.addEventListener('error', () => {
    if (thumb.getAttribute('src') !== gifHref()) return
    thumb.hidden = true
  })

  refresh()
}
