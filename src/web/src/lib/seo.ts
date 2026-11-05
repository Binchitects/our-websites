import { useEffect } from 'react'

export const SITE_URL = 'https://argus.binchitects.com'

type Seo = {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
}

/**
 * Keeps the document head in step with the route. The built HTML carries the
 * same values per route (scripts/prerender-meta.mjs), so a crawler or a link
 * preview sees them without running React.
 */
export function useSeo({ title, description, path, type = 'website' }: Seo) {
  useEffect(() => {
    document.title = title
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', SITE_URL + path)
    setMeta('property', 'og:type', type)
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setCanonical(SITE_URL + path)
  }, [title, description, path, type])
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

function setCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!element) {
    element = document.createElement('link')
    element.rel = 'canonical'
    document.head.appendChild(element)
  }
  element.href = href
}
