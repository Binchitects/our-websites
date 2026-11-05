import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { langFromPath, type Lang } from './i18n'
import { routeMeta } from './route-meta'

export const SITE_URL = 'https://argus.binchitects.com'

type Seo = {
  title: string
  description: string
  path: string
  lang?: Lang
  type?: 'website' | 'article'
}

/**
 * Keeps the document head in step with the route. The built HTML carries the
 * same values per route (scripts/prerender-meta.mjs), so a crawler or a link
 * preview sees them without running React.
 */
export function useSeo({ title, description, path, lang = 'en', type = 'website' }: Seo) {
  useEffect(() => {
    const url = SITE_URL + path
    document.title = title
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr'

    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:locale', lang === 'fa' ? 'fa_IR' : 'en_US')
    setMeta(
      'property',
      'og:locale:alternate',
      lang === 'fa' ? 'en_US' : 'fa_IR',
    )
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setCanonical(url)
    setAlternates(path)
  }, [title, description, path, lang, type])
}

/** Derive the localized meta for a page path, from the URL's language. */
export function usePageSeo(path: string) {
  const { pathname } = useLocation()
  const lang = langFromPath(pathname)
  const meta = routeMeta(path, lang)
  useSeo({ ...meta, lang })
}

function setMeta(attribute: 'name' | 'property', key: string, value: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', value)
}

function setAlternates(path: string) {
  const base = path.replace(/^\/fa(?=\/|$)/, '') || '/'
  const en = SITE_URL + base
  const fa = SITE_URL + (base === '/' ? '/fa' : `/fa${base}`)

  for (const [hreflang, href] of [['en', en], ['fa', fa], ['x-default', en]] as const) {
    let element = document.head.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${hreflang}"]`)
    if (!element) {
      element = document.createElement('link')
      element.rel = 'alternate'
      element.hreflang = hreflang
      document.head.appendChild(element)
    }
    element.href = href
  }
}

function setCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!element) {
    element = document.createElement('link')
    element.rel = 'canonical'
    document.head.appendChild(element)
  }
  element.href = href
}
