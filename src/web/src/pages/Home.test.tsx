import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { Home } from '@/pages/Home'

describe('Home', () => {
  it('leads with the claim and the stack', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { level: 1, name: /Intelligence/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Deploy the stack/i })).toHaveAttribute(
      'href',
      'https://github.com/Binchitects/argus#quick-start',
    )
    expect(screen.getByRole('heading', { name: /One stack, not five subscriptions/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /It quotes the line/i })).toBeInTheDocument()
  })

  it('gives every page a canonical URL and a title', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>,
    )

    expect(document.title).toContain('ARGUS')
    expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://argus.binchitects.com/',
    )
  })
})
