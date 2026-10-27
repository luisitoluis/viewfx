import { toastSuccess } from '@components/toasts/toast'

const RESET_DELAY = 2000

/**
 * Wires every `[data-copy]` button through one delegated listener, so buttons
 * cloned into the code dialog at runtime work without re-initialising.
 *
 * `data-copy` holds a selector resolved inside the nearest `[data-copy-scope]`.
 * Optional `data-toast` overrides the success message.
 */
export function initClipboard() {
  document.addEventListener('click', (event) => {
    const target = event.target
    if (!(target instanceof Element)) return

    const button = target.closest('[data-copy]')

    // Ignore repeat clicks while the confirmation is still showing, otherwise
    // the restore step would capture "Copied" as the original label.
    if (button && !button.dataset.state) void copy(button)
  })
}

async function copy(button) {
  const scope = button.closest('[data-copy-scope]') ?? document
  const source = scope.querySelector(button.dataset.copy || '')
  const text = source?.textContent?.trim()

  if (!text) return

  try {
    await navigator.clipboard.writeText(text)
    flash(button, 'Copied', 'copied')
    toastSuccess(button.dataset.toast || 'Copied to clipboard')
  } catch {
    flash(button, 'Press ⌘C', 'error')
    toastSuccess('Could not copy')
  }
}

function flash(button, message, state) {
  const label = button.querySelector('[data-copy-label]')
  const original = label?.textContent ?? ''

  button.dataset.state = state
  if (label) label.textContent = message

  window.setTimeout(() => {
    delete button.dataset.state
    if (label) label.textContent = original
  }, RESET_DELAY)
}
