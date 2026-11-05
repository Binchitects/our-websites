import { useMemo, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, CheckCircle2, Loader2, Mail, Send, ShieldCheck } from 'lucide-react'
import { z } from 'zod'
import { CtaBand } from '@/components/ui/CtaBand'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { CONTACT_TOPICS, SITE } from '@/lib/content'
import { useSeo } from '@/lib/seo'
import { routeMeta } from '@/lib/route-meta'

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
  ['A person reads it', 'Messages go to Binchitects, not a ticket robot.'],
  ['We reply by email', 'With a straight answer or a time to talk, not a brochure.'],
  ['You choose the next step', 'A walkthrough, a licence, or a look at the architecture.'],
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
        const minutes = problem.retryAfterSeconds ? Math.max(1, Math.ceil(problem.retryAfterSeconds / 60)) : 10
        setStatus('rate-limited')
        setNotice(`Too many messages from this connection. Please try again in about ${minutes} minutes.`)
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
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Bring your AI
            <br />
            <span className="gradient-text">home.</span>
          </>
        }
        lead="Tell us what you run today — the models, the GitLab, the sign‑in you already have — and we will answer with a straight path to a deployment you own."
        aside={
          <div className="panel p-6">
            <p className="mono text-[9.5px] tracking-[0.16em] text-accent uppercase">What happens next</p>
            <ol className="mt-4 space-y-4">
              {nextSteps.map(([title, body], index) => (
                <li key={title} className="flex gap-3.5">
                  <span className="mono grid h-6 w-6 flex-none place-items-center rounded-full border border-line-strong text-[9px] text-accent">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-[13px] font-[540] text-ink">{title}</p>
                    <p className="mt-0.5 text-[12px] leading-relaxed text-muted">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        }
      />

      <section className="section">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <Reveal>
            {status === 'sent' ? (
              <div className="panel p-8">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-success/35 bg-success/10 text-success">
                  <CheckCircle2 size={22} aria-hidden />
                </span>
                <h2 className="display-3 mt-5">Message sent.</h2>
                <p className="body-copy mt-3 max-w-[46ch]">
                  Thank you, {values.name.trim().split(' ')[0] || 'friend'}. Your message about{' '}
                  {topicLabel.toLowerCase()} is with us, and we will reply to{' '}
                  <span className="text-ink">{values.email}</span>.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setValues(initialValues(topic))
                      setStatus('idle')
                      setNotice(null)
                    }}
                    className="btn btn-ghost btn-sm"
                  >
                    Send another
                  </button>
                  <Link to="/code-arena" className="btn btn-primary btn-sm">
                    While you wait, see Code Arena
                    <ArrowRight size={13} aria-hidden />
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="panel p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="display-3">Send a message</h2>
                  <span className="mono text-[9.5px] tracking-[0.12em] text-faint uppercase">
                    reply by email
                  </span>
                </div>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="field-label">
                      Name
                    </label>
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

                  <div>
                    <label htmlFor="email" className="field-label">
                      Email
                    </label>
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

                  <div>
                    <label htmlFor="company" className="field-label">
                      Company
                      <span className="field-hint">optional</span>
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

                  <div>
                    <label htmlFor="topic" className="field-label">
                      What is this about?
                    </label>
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
                    {errors.topic && <p className="field-error">{errors.topic}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="field-label">
                      Message
                      <span className="field-hint">20–4,000 characters</span>
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

                  {/* A bot fills this; a person never sees it. */}
                  <div className="hidden" aria-hidden="true">
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

                  <div className="sm:col-span-2">
                    <label htmlFor="consent" className="flex cursor-pointer items-start gap-3 text-[12.5px] leading-relaxed text-muted">
                      <input
                        id="consent"
                        name="consent"
                        type="checkbox"
                        checked={values.consent}
                        onChange={(event) => update('consent', event.target.checked)}
                        aria-invalid={Boolean(errors.consent)}
                        aria-describedby={errors.consent ? 'consent-error' : undefined}
                        disabled={busy}
                        className="mt-0.5 h-4 w-4 flex-none accent-[var(--color-accent-deep)]"
                      />
                      <span>
                        I agree to Binchitects using these details to reply to me. They are not sold
                        or used for marketing. See the{' '}
                        <Link to="/privacy" className="text-accent underline underline-offset-2">
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
                  <p
                    role="alert"
                    className="mt-5 rounded-lg border border-[color-mix(in_srgb,#ff8b8b_35%,transparent)] bg-[color-mix(in_srgb,#ff8b8b_8%,transparent)] px-4 py-3 text-[12.5px] leading-relaxed text-muted"
                  >
                    {notice}{' '}
                    {(status === 'failed' || status === 'rate-limited') && (
                      <a
                        href={SITE.issues}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-accent underline underline-offset-2"
                      >
                        Open an issue
                      </a>
                    )}
                  </p>
                )}

                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <button type="submit" className="btn btn-primary" disabled={busy}>
                    {busy ? (
                      <>
                        <Loader2 size={15} className="animate-spin" aria-hidden />
                        Sending
                      </>
                    ) : (
                      <>
                        Send message
                        <Send size={14} aria-hidden />
                      </>
                    )}
                  </button>
                  <p className="mono text-[9.5px] leading-relaxed tracking-[0.04em] text-faint">
                    Your address is stored only as a hash.
                  </p>
                </div>
              </form>
            )}
          </Reveal>

          <Reveal delay={120} className="space-y-4">
            <div className="panel p-6">
              <span className="icon-tile">
                <Mail size={18} strokeWidth={1.6} aria-hidden />
              </span>
              <h2 className="mt-4 text-[15px] font-[580]">Rather not use a form?</h2>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">
                Open an issue in the repository, under a title that says what you need. For a
                commercial licence, use <span className="mono text-[11.5px] text-ink">Commercial license</span>{' '}
                as the title, as LICENSING.md asks.
              </p>
              <a
                href={SITE.issues}
                target="_blank"
                rel="noreferrer noopener"
                className="link-arrow mt-4 text-[13px]"
              >
                Binchitects/argus issues
                <ArrowUpRight size={13} aria-hidden />
              </a>
            </div>

            <div className="panel p-6">
              <span className="icon-tile">
                <ShieldCheck size={18} strokeWidth={1.6} aria-hidden />
              </span>
              <h2 className="mt-4 text-[15px] font-[580]">Security reports</h2>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">
                Please do not put a vulnerability in this form or a public issue. The security policy
                says how to reach the maintainers privately.
              </p>
              <a
                href={SITE.securityPolicy}
                target="_blank"
                rel="noreferrer noopener"
                className="link-arrow mt-4 text-[13px]"
              >
                Security policy
                <ArrowUpRight size={13} aria-hidden />
              </a>
            </div>

            <div className="panel p-6">
              <p className="mono text-[9.5px] tracking-[0.16em] text-faint uppercase">Before you write</p>
              <p className="mt-3 text-[12.5px] leading-relaxed text-muted">
                The deployment guide covers the host, the .env and the offline installer. Many
                questions are already answered there.
              </p>
              <a
                href={SITE.deployment}
                target="_blank"
                rel="noreferrer noopener"
                className="link-arrow mt-3 text-[13px]"
              >
                Deployment guide
                <ArrowUpRight size={13} aria-hidden />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Start with the source."
        lead="Everything on this page is in the repository: the stack, the docs, the licensing. Read it first, then ask us the hard questions."
      />
    </>
  )
}
