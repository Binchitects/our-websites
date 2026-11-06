import { useEffect, useState, type ComponentType } from 'react'

export type PageName =
  | 'Home'
  | 'Platform'
  | 'CodeArena'
  | 'ArgusPage'
  | 'Security'
  | 'Changelog'
  | 'Contact'
  | 'Privacy'
  | 'Brand'
  | 'NotFound'

const LOADERS: Record<PageName, () => Promise<Record<string, unknown>>> = {
  Home: () => import('./Home'),
  Platform: () => import('./Platform'),
  CodeArena: () => import('./CodeArena'),
  ArgusPage: () => import('./ArgusPage'),
  Security: () => import('./Security'),
  Changelog: () => import('./Changelog'),
  Contact: () => import('./Contact'),
  Privacy: () => import('./Privacy'),
  Brand: () => import('./Brand'),
  NotFound: () => import('./NotFound'),
}

const CACHE: Partial<Record<PageName, ComponentType>> = {}

export async function loadPage(name: PageName): Promise<void> {
  if (CACHE[name]) return
  const module = await LOADERS[name]()
  CACHE[name] = module[name] as ComponentType
}

export async function preloadAll(): Promise<void> {
  await Promise.all((Object.keys(LOADERS) as PageName[]).map(loadPage))
}

export function pageForPath(pathname: string): PageName {
  const path = pathname.replace(/^\/fa(?=\/|$)/, '') || '/'
  const page = path.replace(/^\//, '')
  switch (page) {
    case '':
      return 'Home'
    case 'platform':
      return 'Platform'
    case 'code-arena':
      return 'CodeArena'
    case 'argus':
      return 'ArgusPage'
    case 'security':
      return 'Security'
    case 'changelog':
      return 'Changelog'
    case 'contact':
      return 'Contact'
    case 'privacy':
      return 'Privacy'
    case 'brand':
      return 'Brand'
    default:
      return 'NotFound'
  }
}

/** Renders a page from the preloaded chunk cache; loads it on navigation. */
export function Page({ name }: { name: PageName }) {
  const [Component, setComponent] = useState<ComponentType | undefined>(() => CACHE[name])

  useEffect(() => {
    let live = true
    if (!CACHE[name]) {
      loadPage(name).then(() => {
        if (live) setComponent(() => CACHE[name])
      })
    }
    return () => {
      live = false
    }
  }, [name])

  if (!Component) return null
  const Content = Component
  return <Content />
}
