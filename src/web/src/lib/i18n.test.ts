import { describe, expect, it } from 'vitest'
import { langFromPath, localizePath, switchLangPath } from './i18n'
import { routeMeta } from './route-meta'

describe('i18n', () => {
  it('reads the language from the URL', () => {
    expect(langFromPath('/')).toBe('en')
    expect(langFromPath('/platform')).toBe('en')
    expect(langFromPath('/fa')).toBe('fa')
    expect(langFromPath('/fa/platform')).toBe('fa')
  })

  it('prefixes every site path for Persian and keeps query and hash', () => {
    expect(localizePath('/', 'fa')).toBe('/fa')
    expect(localizePath('/platform', 'fa')).toBe('/fa/platform')
    expect(localizePath('/contact?topic=license', 'fa')).toBe('/fa/contact?topic=license')
    expect(localizePath('/platform#tools', 'fa')).toBe('/fa/platform#tools')
    expect(localizePath('/platform', 'en')).toBe('/platform')
  })

  it('switches to the same page in the other language', () => {
    expect(switchLangPath('/fa/platform', 'en')).toBe('/platform')
    expect(switchLangPath('/platform', 'fa')).toBe('/fa/platform')
    expect(switchLangPath('/fa', 'en')).toBe('/')
  })

  it('has Persian route metadata', () => {
    const meta = routeMeta('/platform', 'fa')
    expect(meta.path).toBe('/fa/platform')
    expect(meta.title).toContain('پلتفرم')
    expect(routeMeta('/platform', 'en').path).toBe('/platform')
  })
})
