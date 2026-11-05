export type Lang = 'en' | 'fa'

export function langFromPath(pathname: string): Lang {
  return pathname === '/fa' || pathname.startsWith('/fa/') ? 'fa' : 'en'
}
