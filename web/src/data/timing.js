/**
 * Preview timing options, matching midudev/tailwind-animations theme keys
 * so Duration / Delay / Steps behave like that catalogue.
 *
 * @see https://github.com/midudev/tailwind-animations
 */
import theme from '@root/src/theme.json'

export const ANIMATION_DURATION = theme.duration
export const ANIMATION_DELAY = theme.delay
export const ANIMATION_STEPS = theme.steps

export const DEFAULT_DURATION_KEY = '1000'
