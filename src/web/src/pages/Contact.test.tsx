import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Contact } from '@/pages/Contact'

function renderContact(url = '/contact') {
  return render(
    <MemoryRouter initialEntries={[url]}>
      <Contact />
    </MemoryRouter>,
  )
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('Contact', () => {
  it('preselects the topic named in the query string', () => {
    renderContact('/contact?topic=license')
    expect(screen.getByLabelText('What is this about?')).toHaveValue('license')
  })

  it('shows a message beside each field that needs one', async () => {
    const user = userEvent.setup()
    renderContact()
    await user.click(screen.getByRole('button', { name: 'Send message' }))

    expect(screen.getByText('Please tell us your name.')).toBeInTheDocument()
    expect(screen.getByText('Please add an email address we can reply to.')).toBeInTheDocument()
    expect(
      screen.getByText('A sentence or two helps us answer well (at least 20 characters).'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Please agree to us using your details to reply.'),
    ).toBeInTheDocument()
  })

  it('sends a complete message and shows the confirmation', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: 'abc', receivedAt: '2026-01-01T00:00:00Z' }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }),
    )
    vi.stubGlobal('fetch', fetchMock)

    const user = userEvent.setup()
    renderContact()
    await user.type(screen.getByLabelText('Name'), 'Sara Ahmadi')
    await user.type(screen.getByLabelText('Email'), 'sara@example.com')
    await user.type(screen.getByLabelText(/Company/), 'Binchitects')
    await user.type(
      screen.getByLabelText(/Message/),
      'We would like to run ARGUS on four GPUs inside our own network.',
    )
    await user.click(screen.getByLabelText(/I agree to Binchitects/))
    await user.click(screen.getByRole('button', { name: 'Send message' }))

    await waitFor(() => expect(screen.getByText('Message sent.')).toBeInTheDocument())

    expect(fetchMock).toHaveBeenCalledOnce()
    const [url, options] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(url).toBe('/api/contact')
    expect(options.method).toBe('POST')
    const body = JSON.parse(String(options.body))
    expect(body).toMatchObject({
      name: 'Sara Ahmadi',
      email: 'sara@example.com',
      company: 'Binchitects',
      topic: 'walkthrough',
      consent: true,
      website: '',
    })
  })

  it('shows the field errors the API returns', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            title: 'One or more validation errors occurred.',
            status: 400,
            errors: { email: ['That does not look like an email address.'] },
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } },
        ),
      ),
    )

    const user = userEvent.setup()
    renderContact()
    await user.type(screen.getByLabelText('Name'), 'Sara Ahmadi')
    await user.type(screen.getByLabelText('Email'), 'sara@example.com')
    await user.type(
      screen.getByLabelText(/Message/),
      'We would like to run ARGUS on four GPUs inside our own network.',
    )
    await user.click(screen.getByLabelText(/I agree to Binchitects/))
    await user.click(screen.getByRole('button', { name: 'Send message' }))

    expect(
      await screen.findByText('That does not look like an email address.'),
    ).toBeInTheDocument()
  })

  it('explains a rate limit in minutes', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ retryAfterSeconds: 600 }), {
          status: 429,
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    )

    const user = userEvent.setup()
    renderContact()
    await user.type(screen.getByLabelText('Name'), 'Sara Ahmadi')
    await user.type(screen.getByLabelText('Email'), 'sara@example.com')
    await user.type(
      screen.getByLabelText(/Message/),
      'We would like to run ARGUS on four GPUs inside our own network.',
    )
    await user.click(screen.getByLabelText(/I agree to Binchitects/))
    await user.click(screen.getByRole('button', { name: 'Send message' }))

    expect(await screen.findByText(/try again in about 10 minutes/i)).toBeInTheDocument()
  })
})
