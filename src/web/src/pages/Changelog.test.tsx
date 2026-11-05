import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Changelog } from '@/pages/Changelog'

const feed = {
  source: 'github' as const,
  fetchedAt: '2026-11-05T00:00:00Z',
  releases: [
    {
      tag: 'v7.7.0',
      name: 'A shorter title',
      publishedAt: '2026-11-02T01:24:22Z',
      url: 'https://github.com/Binchitects/argus/releases/tag/v7.7.0',
      summary: 'Network access, every setting at install, and six colour themes.',
      prerelease: false,
    },
  ],
}

function renderChangelog() {
  return render(
    <MemoryRouter initialEntries={['/changelog']}>
      <Changelog />
    </MemoryRouter>,
  )
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('Changelog', () => {
  it('renders the releases the API returns', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify(feed), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    )

    renderChangelog()

    expect(await screen.findByText('A shorter title')).toBeInTheDocument()
    expect(screen.getByText(feed.releases[0].summary)).toBeInTheDocument()
    expect(screen.getAllByText('v7.7.0').length).toBeGreaterThan(0)
    expect(screen.getByText(/read from GitHub/i)).toBeInTheDocument()
  })

  it('offers the repository when the API does not answer', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))

    renderChangelog()

    await waitFor(() =>
      expect(screen.getByText('The changelog could not be read.')).toBeInTheDocument(),
    )
    expect(screen.getByRole('link', { name: /Releases on GitHub/i })).toBeInTheDocument()
  })

  it('says when the built-in list is being shown', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ ...feed, source: 'fallback' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    )

    renderChangelog()

    expect(await screen.findByText(/built-in list/i)).toBeInTheDocument()
  })
})
