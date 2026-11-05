import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from './App'

describe('Binchitects', () => {
  it('opens with the studio statement', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /Open by default\..*Made for the long run\./,
    )
  })

  it('links every Argus mention to argus.binchitects.com', () => {
    render(<App />)
    const links = screen.getAllByRole('link', { name: /Argus Arena/ })
    expect(links.length).toBeGreaterThan(1)
    for (const link of links) {
      expect(link).toHaveAttribute('href', 'https://argus.binchitects.com')
    }
  })

  it('gives the community a way in', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: /Open an issue/ })).toHaveAttribute(
      'href',
      'https://github.com/Binchitects/argus/issues',
    )
    expect(screen.getByRole('link', { name: /Send a patch/ })).toHaveAttribute(
      'href',
      'https://github.com/Binchitects/argus/blob/main/CONTRIBUTING.md',
    )
  })

  it('renders the Persian page and its language switch', () => {
    render(<App initialLang="fa" />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/آشکارا/)
    expect(screen.getAllByRole('link', { name: 'EN' })[0]).toHaveAttribute('href', '/')
    expect(screen.getAllByRole('link', { name: /Argus Arena/ })[0]).toHaveAttribute(
      'href',
      'https://argus.binchitects.com',
    )
  })

  it('states the long-run position', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /Build for the decade/ })).toBeInTheDocument()
    expect(screen.getByText('Built to be forked')).toBeInTheDocument()
  })
})
