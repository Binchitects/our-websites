import routes from '../routes.json'
import type { Lang } from './i18n'

export type RouteMeta = {
  path: string
  title: string
  description: string
  fa: { title: string; description: string }
}

export const ROUTES: RouteMeta[] = routes

/** The one source of a page's title and description (scripts/prerender-meta.mjs reads the same file). */
export function routeMeta(path: string, lang: Lang = 'en'): { path: string; title: string; description: string } {
  const meta = ROUTES.find((route) => route.path === path)
  if (!meta) throw new Error(`No route metadata for ${path}.`)

  const localizedPath = lang === 'fa' ? (path === '/' ? '/fa' : `/fa${path}`) : path
  const copy = lang === 'fa' ? meta.fa : meta

  return { path: localizedPath, title: copy.title, description: copy.description }
}
