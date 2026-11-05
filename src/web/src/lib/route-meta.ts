import routes from '../routes.json'

export type RouteMeta = {
  path: string
  title: string
  description: string
}

export const ROUTES: RouteMeta[] = routes

/** The one source of a page's title and description (scripts/prerender-meta.mjs reads the same file). */
export function routeMeta(path: string): RouteMeta {
  const meta = ROUTES.find((route) => route.path === path)
  if (!meta) throw new Error(`No route metadata for ${path}.`)
  return meta
}
