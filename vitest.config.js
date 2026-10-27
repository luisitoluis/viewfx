import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const webSrc = fileURLToPath(new URL('./web/src/', import.meta.url))
const repoRoot = fileURLToPath(new URL('./', import.meta.url))

/** Same aliases as web/tsconfig.json, so root tests can import web modules. */
export default defineConfig({
  resolve: {
    alias: {
      '@components': `${webSrc}components`,
      '@layouts': `${webSrc}layouts`,
      '@data': `${webSrc}data`,
      '@lib': `${webSrc}lib`,
      '@styles': `${webSrc}styles`,
      '@root': repoRoot.slice(0, -1)
    }
  }
})