import { EFFECTS } from '../data/effects'
import { isDark } from './theme'
import { announce } from './live-region'
import { toastSuccess } from '../components/toasts/toast'

const EFFECT_IDS = new Set(EFFECTS.map((effect) => effect.id))
const EFFECT_IDS_BY_LENGTH = [...EFFECT_IDS].sort((a, b) => b.length - a.length)
const TIMING_PREFIXES = ['fx-duration-', 'fx-delay-', 'fx-steps-']

export function isEffectOrTimingClass(cls) {
  if (EFFECT_IDS.has(cls) || TIMING_PREFIXES.some((prefix) => cls.startsWith(prefix))) return true
  return EFFECT_IDS_BY_LENGTH.some((id) => cls.startsWith(`${id}-duration-`))
}

const defaults = {
  e: 'polygon',
  d: '1000',
  delay: '0',
  s: 'none'
}

function parseState(allowed) {
  const params = new URLSearchParams(window.location.search)
  const pick = (key, list, fallback) => {
    const value = params.get(key)
    return value && list.includes(value) ? value : fallback
  }

  return {
    e: pick('e', allowed.effects, defaults.e),
    d: pick('d', allowed.durations, defaults.d),
    delay: pick('delay', allowed.delays, defaults.delay),
    s: pick('s', allowed.steps, defaults.s)
  }
}

function isDefaultDelay(value) {
  return value === 'none' || value === '0'
}

/** Class list to copy: compound effect+timing, plus fx-steps when set. */
export function buildClasses(state) {
  const classes = []
  const delayOn = !isDefaultDelay(state.delay)

  if (state.d !== 'none' && delayOn) {
    classes.push(`${state.e}-duration-${state.d}-delay-${state.delay}`)
  } else if (state.d !== 'none') {
    classes.push(`${state.e}-duration-${state.d}`)
  } else {
    classes.push(state.e)
    if (delayOn) classes.push(`fx-delay-${state.delay}`)
  }

  if (state.s !== 'none') classes.push(`fx-steps-${state.s}`)
  return classes
}

export function applyHtmlClasses(state) {
  const el = document.documentElement
  const next = buildClasses(state)

  for (const cls of [...el.classList]) {
    if (isEffectOrTimingClass(cls)) el.classList.remove(cls)
  }

  for (const cls of next) el.classList.add(cls)
}

function playSelectedEffect(state) {
  applyHtmlClasses(state)
  playScoped()
}

function playScoped() {
  const live = document.getElementById('fx-live')
  const root = document.documentElement
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
    root.classList.remove('theme-swap', 'fx-preview')
  }

  root.classList.add('theme-swap', 'fx-preview')
  live.style.viewTransitionName = 'fx-live'

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

function flashLabel(button, message) {
  const label = button.querySelector('[data-label]')
  if (!(label instanceof HTMLElement)) return
  const previous = label.textContent ?? ''
  label.textContent = message
  window.setTimeout(() => {
    label.textContent = previous
  }, 1200)
}

export function initPlayground(rootId = 'playground') {
  const root = document.getElementById(rootId)
  const dataEl = document.getElementById('playground-data')
  if (!root || !dataEl) return

  const allowed = JSON.parse(dataEl.textContent || '{}')
  const state = parseState(allowed)

  const snippet = document.getElementById('class-snippet')
  const htmlSnippet = document.getElementById('html-snippet')
  const search = document.getElementById('effect-search')
  const list = document.getElementById('effect-list')
  const duration = document.getElementById('ctrl-duration')
  const delay = document.getElementById('ctrl-delay')
  const steps = document.getElementById('ctrl-steps')
  const play = document.getElementById('play-btn')
  const copyClasses = document.getElementById('copy-classes')
  const copyUrl = document.getElementById('copy-url')

  if (!snippet || !htmlSnippet || !duration || !delay || !steps || !play || !copyClasses || !copyUrl) {
    return
  }

  duration.value = state.d
  delay.value = state.delay
  steps.value = state.s

  const live = document.getElementById('fx-live')
  if (live && isDark()) live.classList.add('dark')

  const updateSnippet = () => {
    const classes = buildClasses(state)
    snippet.textContent = classes.join(' ')
    htmlSnippet.textContent = `<html class="dark ${classes.join(' ')}">`
  }

  const updateUrl = () => {
    const url = new URL(window.location.href)
    for (const key of Object.keys(defaults)) {
      if (state[key] === defaults[key]) url.searchParams.delete(key)
      else url.searchParams.set(key, state[key])
    }
    history.replaceState(null, '', url)
  }

  const markEffect = () => {
    list?.querySelectorAll('[data-effect]').forEach((button) => {
      const selected = button.getAttribute('data-effect') === state.e
      button.setAttribute('aria-selected', String(selected))
      button.classList.toggle('is-selected', selected)
    })
  }

  const apply = ({ play: shouldPlay } = { play: true }) => {
    applyHtmlClasses(state)
    markEffect()
    updateSnippet()
    updateUrl()
    if (shouldPlay) playSelectedEffect(state)
  }

  list?.addEventListener('click', (event) => {
    const button = event.target instanceof Element ? event.target.closest('[data-effect]') : null
    const id = button?.getAttribute('data-effect')
    if (!id || !EFFECT_IDS.has(id)) return
    state.e = id
    apply()
  })

  search?.addEventListener('input', () => {
    const query = search.value.trim().toLowerCase()
    list?.querySelectorAll('[data-effect]').forEach((button) => {
      const id = button.getAttribute('data-effect') ?? ''
      const name = button.getAttribute('data-name') ?? ''
      const match = query === '' || id.includes(query) || name.toLowerCase().includes(query)
      button.classList.toggle('hidden', !match)
    })
  })

  duration.addEventListener('change', () => {
    state.d = duration.value
    apply()
  })
  delay.addEventListener('change', () => {
    state.delay = delay.value
    apply()
  })
  steps.addEventListener('change', () => {
    state.s = steps.value
    apply()
  })

  play.addEventListener('click', () => {
    playSelectedEffect(state)
    announce('Theme transition played')
  })

  copyClasses.addEventListener('click', async () => {
    const text = buildClasses(state).join(' ')
    try {
      await navigator.clipboard.writeText(text)
      announce('Classes copied to clipboard')
      flashLabel(copyClasses, 'Copied!')
      toastSuccess('Classes copied to clipboard')
    } catch {
      announce('Could not copy classes')
    }
  })

  copyUrl.addEventListener('click', async () => {
    updateUrl()
    try {
      await navigator.clipboard.writeText(window.location.href)
      announce('Share URL copied to clipboard')
      flashLabel(copyUrl, 'URL copied!')
      toastSuccess('Share URL copied to clipboard')
    } catch {
      announce('Could not copy URL')
    }
  })

  applyHtmlClasses(state)
  markEffect()
  updateSnippet()
  updateUrl()
}
