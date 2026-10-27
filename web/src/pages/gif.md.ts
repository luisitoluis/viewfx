import type { APIRoute } from 'astro'
import { buildGifMarkdown, markdownResponse } from '@lib/agent-markdown.js'

export const prerender = true

/** Agent-readable GIF studio: GET /gif.md */
export const GET: APIRoute = () => markdownResponse(buildGifMarkdown())
