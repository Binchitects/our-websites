import { useLocation } from 'react-router-dom'

export type Lang = 'en' | 'fa'

/** Locale is carried by the URL: English at the root, Persian under /fa. */
export function langFromPath(pathname: string): Lang {
  return pathname === '/fa' || pathname.startsWith('/fa/') ? 'fa' : 'en'
}

/** Prefix a root-relative site path for the locale. Query strings and hashes survive. */
export function localizePath(path: string, lang: Lang): string {
  if (!path.startsWith('/')) return path

  const [, base, rest] = path.match(/^([^?#]*)(.*)$/) ?? ['', path, '']
  if (lang === 'en') return path

  return `/fa${base === '/' ? '' : base}${rest}`
}

/** The same page in the other language. */
export function switchLangPath(pathname: string, next: Lang): string {
  const base = pathname.replace(/^\/fa(?=\/|$)/, '') || '/'
  return localizePath(base, next)
}

export function useLang(): Lang {
  const { pathname } = useLocation()
  return langFromPath(pathname)
}

export function useDir(lang: Lang): 'ltr' | 'rtl' {
  return lang === 'fa' ? 'rtl' : 'ltr'
}
