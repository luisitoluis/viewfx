import { announce } from './live-region'
import { toastSuccess } from '../components/toasts/toast'
import { DEFAULT_EFFECT_ID } from '../data/effects'

export const EFFECT_KEY = 'viewfx:effect'

const cards = () => Array.from(document.querySelectorAll('.fx-card'))
const visibleSelects = () =>
  Array.from(document.querySelectorAll('.fx-card:not([hidden]) .fx-select'))

function revealAllEffects() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let i = 0

  for (const card of cards()) {
    if (!card.hidden) continue
    if (!reduced) {
      card.style.setProperty('--i', String(i++))
      card.classList.add('fx-enter')
    }
    card.hidden = false
  }

  document.getElementById('show-all-wrap')?.remove()
}

function initSectionEnter(gallery) {
  gallery.setAttribute('data-js', '')

  const show = () => gallery.setAttribute('data-in-view', '')
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

  if (reduced.matches) {
    show()
    return
  }

  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return
      show()
      io.disconnect()
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
  )

  io.observe(gallery)
}

function markCurrent(id) {
  let name = id

  for (const card of cards()) {
    const isCurrent = card.dataset.fx === id
    const select = card.querySelector('.fx-select')

    card.classList.toggle('is-current', isCurrent)

    if (isCurrent) {
      name = card.dataset.name ?? id
      select?.setAttribute('aria-current', 'true')
    } else {
      select?.removeAttribute('aria-current')
    }
  }

  return name
}

function selectEffect(id, { copy = true } = {}) {
  markCurrent(id)

  try {
    localStorage.setItem(EFFECT_KEY, id)
  } catch {
    // Preference simply will not survive a reload.
  }

  if (!copy) return

  const className = id
  void navigator.clipboard.writeText(className).then(
    () => toastSuccess(`Copied "${id}"`),
    () => toastSuccess('Could not copy')
  )
}

function initSelection() {
  const grid = document.getElementById('effect-grid')
  if (!grid) return

  grid.addEventListener('click', (event) => {
    const target = event.target
    if (!(target instanceof Element)) return

    if (target.closest('[data-copy]')) {
      const id = target.closest('.fx-card')?.dataset.fx
      if (id) selectEffect(id, { copy: false })
      return
    }

    const select = target.closest('.fx-select')
    const id = select?.closest('.fx-card')?.dataset.fx

    if (id) {
      selectEffect(id)
      if (select instanceof HTMLElement) select.blur()
    }
  })

  // Arrow keys walk the gallery so it is not one tab stop per card.
  // Rows wrap, so left/up and right/down are simply previous and next.
  grid.addEventListener('keydown', (event) => {
    const step =
      { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key] ?? 0

    if (!step && event.key !== 'Home' && event.key !== 'End') return

    const selects = visibleSelects()
    const index = selects.findIndex((select) => select === document.activeElement)
    if (index === -1) return

    event.preventDefault()

    const next =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? selects.length - 1
          : (index + step + selects.length) % selects.length

    selects[next]?.focus()
  })
}

function setVar(el, name, value) {
  if (value) el.style.setProperty(name, value)
  else el.style.removeProperty(name)
}

function initPreviewControls() {
  const gallery = document.querySelector('.fx-gallery')
  const duration = document.querySelector('#preview-duration')
  const delay = document.querySelector('#preview-delay')
  const steps = document.querySelector('#preview-steps')
  const playAll = document.querySelector('#play-all')
  if (!gallery || !duration || !delay || !steps || !playAll) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

  function applyTiming() {
    const durationValue = duration.value
    const delayValue = delay.value
    const stepsValue = steps.value
    const delayOrNull = delayValue && delayValue !== '0ms' ? delayValue : null
    const stepsOrNull = stepsValue && stepsValue !== '0' ? `steps(${stepsValue})` : null

    setVar(gallery, '--gallery-duration', durationValue || null)
    setVar(gallery, '--gallery-delay', delayOrNull)
    setVar(gallery, '--gallery-ease', stepsOrNull)
  }

  function applyPlayAll(silent = false) {
    if (reduced.matches) {
      playAll.checked = false
      playAll.disabled = true
      gallery.toggleAttribute('data-play-all', false)
      return
    }

    playAll.disabled = false
    gallery.toggleAttribute('data-play-all', playAll.checked)

    if (silent) return

    announce(
      playAll.checked
        ? 'Play all enabled. All previews loop continuously.'
        : 'Play all disabled. Previews play on hover.'
    )
  }

  duration.addEventListener('change', applyTiming)
  delay.addEventListener('change', applyTiming)
  steps.addEventListener('change', applyTiming)
  playAll.addEventListener('change', () => applyPlayAll())
  reduced.addEventListener('change', () => applyPlayAll())
  applyTiming()
  applyPlayAll(true)
}

export function initGallery() {
  const gallery = document.querySelector('.fx-gallery')
  if (gallery) initSectionEnter(gallery)

  let stored = null
  try {
    stored = localStorage.getItem(EFFECT_KEY)
  } catch {
    stored = null
  }

  const isKnown =
    stored && document.querySelector(`.fx-card[data-fx="${CSS.escape(stored)}"]`) !== null
  selectEffect(isKnown ? stored : DEFAULT_EFFECT_ID, { copy: false })

  const current = document.querySelector('.fx-card.is-current')
  if (current?.hidden) revealAllEffects()

  const showAll = document.getElementById('show-all-effects')
  showAll?.addEventListener('click', () => {
    revealAllEffects()
    announce(`Showing all ${cards().length} effects.`)
  })

  initSelection()
  initPreviewControls()
}
