import { describe, expect, it } from 'vitest'
import { pageForPath } from './registry'

describe('pageForPath', () => {
  it('maps English and Persian routes onto the same page chunks', () => {
    expect(pageForPath('/')).toBe('Home')
    expect(pageForPath('/fa')).toBe('Home')
    expect(pageForPath('/platform')).toBe('Platform')
    expect(pageForPath('/fa/platform')).toBe('Platform')
    expect(pageForPath('/code-arena')).toBe('CodeArena')
    expect(pageForPath('/fa/brand')).toBe('Brand')
  })

  it('treats unknown and nested paths as the 404 page', () => {
    expect(pageForPath('/not-a-route')).toBe('NotFound')
    expect(pageForPath('/fa/not-a-route')).toBe('NotFound')
    expect(pageForPath('/platform/extra')).toBe('NotFound')
  })

  it('does not mistake a word starting with fa for the Persian prefix', () => {
    expect(pageForPath('/faq')).toBe('NotFound')
    expect(pageForPath('/false')).toBe('NotFound')
  })
})
