import { describe, expect, it } from 'vitest'
import { cn } from '@/lib/cn'

describe('cn', () => {
  it('joins the truthy class names', () => {
    expect(cn('a', false, undefined, 'b', null)).toBe('a b')
  })

  it('keeps order and does not deduplicate', () => {
    expect(cn('px-2', 'px-4')).toBe('px-2 px-4')
  })
})
