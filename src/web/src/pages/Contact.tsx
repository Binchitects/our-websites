import { useMemo, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Loader2, Send } from 'lucide-react'
import { z } from 'zod'
import { ArticleOpener } from '@/components/ui/ArticleOpener'
import { Chapter } from '@/components/ui/Chapter'
import { CONTACT_TOPICS, SITE } from '@/lib/content'
import { routeMeta } from '@/lib/route-meta'
import { useSeo } from '@/lib/seo'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please tell us your name.')
    .max(120, 'Please keep your name under 120 characters.'),
  email: z
    .string()
    .trim()
    .min(1, 'Please add an email address we can reply to.')
    .max(254, 'That address is too long.')
    .regex(emailPattern, 'That does not look like an email address.'),
  company: z.string().trim().max(160, 'Please keep the company name under 160 characters.'),
  topic: z.string().refine((value) => CONTACT_TOPICS.some((topic) => topic.value === value), {
    message: 'Choose what your message is about.',
  }),
  message: z
    .string()
    .trim()
    .min(20, 'A sentence or two helps us answer well (at least 20 characters).')
    .max(4000, 'Please keep the message under 4,000 characters.'),
  consent: z.boolean().refine((value) => value, {
    message: 'Please agree to us using your details to reply.',
  }),
})

type Values = {
  name: string
  email: string
  company: string
  topic: string
  message: string
  consent: boolean
}

type Status = 'idle' | 'sending' | 'sent' | 'rate-limited' | 'failed'

const initialValues = (topic: string): Values => ({
  name: '',
  email: '',
  company: '',
  topic,
  message: '',
  consent: false,
})

const nextSteps = [
  'A person reads it — messages go to Binchitects, not a ticket robot.',
  'We reply by email, with a straight answer or a time to talk.',
  'You choose the next step: a walkthrough, a licence, or the architecture.',
]

export function Contact() {
  useSeo({ ...routeMeta('/contact'), path: '/contact' })

  const [params] = useSearchParams()
  const requestedTopic = params.get('topic') ?? ''
  const topic = CONTACT_TOPICS.some((entry) => entry.value === requestedTopic)
    ? requestedTopic
    : 'walkthrough'

  const [values, setValues] = useState<Values>(() => initialValues(topic))
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [notice, setNotice] = useState<string | null>(null)
  const [honeypot, setHoneypot] = useState('')

  const busy = status === 'sending'
  const topicLabel = useMemo(
    () => CONTACT_TOPICS.find((entry) => entry.value === values.topic)?.label ?? 'Message',
    [values.topic],
  )

  const update = (field: keyof Values, value: string | boolean) => {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => {
      if (!current[field]) return current
      const next = { ...current }
      delete next[field]
      return next
    })
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setNotice(null)

    const parsed = contactSchema.safeParse(values)
    if (!parsed.success) {
      const next: Record<string, string> = {}
      for (const issue of parsed.error.issues) {
        const field = String(issue.path[0] ?? '')
        if (field && !next[field]) next[field] = issue.message
      }
      setErrors(next)
      document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
      return
    }

    setStatus('sending')
    setErrors({})

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...parsed.data, website: honeypot }),
      })

      if (response.status === 201 || response.status === 202) {
        setStatus('sent')
        return
      }

      if (response.status === 400) {
        const problem = (await response.json()) as { errors?: Record<string, string[]> }
        const next: Record<string, string> = {}
        for (const [field, messages] of Object.entries(problem.errors ?? {})) {
          next[field.toLowerCase()] = messages[0] ?? 'That does not look right.'
        }
        setErrors(next)
        setStatus('idle')
        setNotice('Some fields need another look.')
        return
      }

      if (response.status === 429) {
        const problem = (await response.json()) as { retryAfterSeconds?: number }
        const minutes = problem.retryAfterSeconds
          ? Math.max(1, Math.ceil(problem.retryAfterSeconds / 60))
          : 10
        setStatus('rate-limited')
        setNotice(
          `Too many messages from this connection. Please try again in about ${minutes} minutes.`,
        )
        return
      }

      setStatus('failed')
      setNotice('The message could not be sent. Please try again, or open an issue on GitHub.')
    } catch {
      setStatus('failed')
      setNotice('The message could not be sent. Check your connection, or open an issue on GitHub.')
    }
  }

  return (
    <>
      <ArticleOpener
        section="Contact"
        title={
          <>
            Bring your AI
            <br />
            <em>home.</em>
          </>
        }
        standfirst="Tell us what you run today — the models, the GitLab, the sign-in you already have — and we will answer with a straight path to a deployment you own."
        aside={
          <>
            <p className="micro micro-ink">What happens next</p>
            <ul className="mini-list" style={{ marginTop: '10px' }}>
              {nextSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </>
        }
      />

      <Chapter number="01" label="A message">
        <div className="contact-grid">
          {status === 'sent' ? (
            <div className="form-success">
              <h2>Message sent.</h2>
              <p className="body mt-s">
                Thank you, {values.name.trim().split(' ')[0] || 'friend'}. Your message about{' '}
                {topicLabel.toLowerCase()} is with us, and we will reply to{' '}
                <span className="text-ink">{values.email}</span>.
              </p>
              <div className="row mt-m">
                <button
                  type="button"
                  onClick={() => {
                    setValues(initialValues(topic))
                    setStatus('idle')
                    setNotice(null)
                  }}
                  className="btn btn-outline btn-sm"
                >
                  Send another
                </button>
                <Link to="/code-arena" className="arrow-link">
                  While you wait, see Code Arena
                  <ArrowRight size={13} aria-hidden />
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="form">
              <div className="subhead">
                <h2 className="serif-m">Send a message</h2>
                <span className="micro">Reply by email</span>
              </div>

              <div className="form-grid">
                <div className="field">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    className="input"
                    placeholder="Sara Ahmadi"
                    value={values.name}
                    onChange={(event) => update('name', event.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    disabled={busy}
                  />
                  {errors.name && (
                    <p id="name-error" className="field-error">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="input"
                    placeholder="you@company.com"
                    value={values.email}
                    onChange={(event) => update('email', event.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    disabled={busy}
                  />
                  {errors.email && (
                    <p id="email-error" className="field-error">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="company">
                    Company
                    <span className="hint">optional</span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    autoComplete="organization"
                    className="input"
                    placeholder="Where you work"
                    value={values.company}
                    onChange={(event) => update('company', event.target.value)}
                    aria-invalid={Boolean(errors.company)}
                    aria-describedby={errors.company ? 'company-error' : undefined}
                    disabled={busy}
                  />
                  {errors.company && (
                    <p id="company-error" className="field-error">
                      {errors.company}
                    </p>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="topic">What is this about?</label>
                  <div className="select-wrap">
                    <select
                      id="topic"
                      name="topic"
                      className="select"
                      value={values.topic}
                      onChange={(event) => update('topic', event.target.value)}
                      disabled={busy}
                    >
                      {CONTACT_TOPICS.map((entry) => (
                        <option key={entry.value} value={entry.value}>
                          {entry.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.topic && <p className="field-error">{errors.topic}</p>}
                </div>

                <div className="field" style={{ gridColumn: '1 / -1' }}>
                  <label htmlFor="message">
                    Message
                    <span className="hint">20–4,000 characters</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="textarea"
                    placeholder="We run 40 developers on GitLab and want the chat, the index and a coding agent on four H100s inside our own network."
                    value={values.message}
                    onChange={(event) => update('message', event.target.value)}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    disabled={busy}
                  />
                  {errors.message && (
                    <p id="message-error" className="field-error">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(event) => setHoneypot(event.target.value)}
                  />
                </div>

                <div className="field" style={{ gridColumn: '1 / -1' }}>
                  <label htmlFor="consent" className="check">
                    <input
                      id="consent"
                      name="consent"
                      type="checkbox"
                      checked={values.consent}
                      onChange={(event) => update('consent', event.target.checked)}
                      aria-invalid={Boolean(errors.consent)}
                      aria-describedby={errors.consent ? 'consent-error' : undefined}
                      disabled={busy}
                    />
                    <span>
                      I agree to Binchitects using these details to reply to me. They are not sold
                      or used for marketing. See the{' '}
                      <Link to="/privacy" className="text-link">
                        privacy note
                      </Link>
                      .
                    </span>
                  </label>
                  {errors.consent && (
                    <p id="consent-error" className="field-error">
                      {errors.consent}
                    </p>
                  )}
                </div>
              </div>

              {notice && (
                <p role="alert" className="form-alert">
                  {notice}{' '}
                  {(status === 'failed' || status === 'rate-limited') && (
                    <a
                      href={SITE.issues}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-link"
                    >
                      Open an issue
                    </a>
                  )}
                </p>
              )}

              <div className="row">
                <button type="submit" className="btn btn-solid" disabled={busy}>
                  {busy ? (
                    <>
                      <Loader2 size={14} className="spin" aria-hidden />
                      Sending
                    </>
                  ) : (
                    <>
                      Send message
                      <Send size={13} aria-hidden />
                    </>
                  )}
                </button>
                <span className="form-note">Your address is stored only as a hash.</span>
              </div>
            </form>
          )}

          <aside className="contact-aside">
            <div className="contact-note">
              <h2>Rather not use a form?</h2>
              <p>
                Open an issue in the repository under a title that says what you need. For a
                commercial licence, use <span className="mono">Commercial license</span> as the
                title, as LICENSING.md asks.
              </p>
              <a href={SITE.issues} target="_blank" rel="noreferrer noopener" className="arrow-link">
                Binchitects/argus issues
                <ArrowUpRight size={12} aria-hidden />
              </a>
            </div>

            <div className="contact-note">
              <h2>Security reports</h2>
              <p>
                Please do not put a vulnerability in this form or a public issue. The security policy
                says how to reach the maintainers privately.
              </p>
              <a
                href={SITE.securityPolicy}
                target="_blank"
                rel="noreferrer noopener"
                className="arrow-link"
              >
                Security policy
                <ArrowUpRight size={12} aria-hidden />
              </a>
            </div>

            <div className="contact-note">
              <h2>Before you write</h2>
              <p>
                The deployment guide covers the host, the .env and the offline installer. Many
                questions are already answered there.
              </p>
              <a
                href={SITE.deployment}
                target="_blank"
                rel="noreferrer noopener"
                className="arrow-link"
              >
                Deployment guide
                <ArrowUpRight size={12} aria-hidden />
              </a>
            </div>
          </aside>
        </div>
      </Chapter>
    </>
  )
}
