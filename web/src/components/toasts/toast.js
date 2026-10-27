import { announce } from '@lib/live-region'

const CHECK_SVG =
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>'

export function toastSuccess(message) {
  announce(message)

  const stack = document.getElementById('site-toasts')
  if (!stack) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const toast = document.createElement('div')
  toast.role = 'status'
  toast.className = 'site-toast'

  const mark = document.createElement('span')
  mark.className = 'site-toast__mark'
  mark.setAttribute('aria-hidden', 'true')
  mark.innerHTML = CHECK_SVG

  const text = document.createElement('span')
  text.textContent = message

  toast.append(mark, text)
  stack.appendChild(toast)

  void toast.offsetWidth
  toast.classList.add('site-toast-enter')

  const exitMs = reduced ? 220 : 420
  const stayMs = 4200

  window.setTimeout(() => {
    toast.classList.remove('site-toast-enter')
    void toast.offsetWidth
    toast.classList.add('site-toast-exit')

    const remove = () => toast.remove()
    toast.addEventListener('animationend', remove, { once: true })
    window.setTimeout(remove, exitMs + 80)
  }, stayMs)
}

export function toastError(message) {
  toastSuccess(message)
}
