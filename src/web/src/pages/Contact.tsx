import { useMemo, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Link } from '@/components/ui/LocalLink'
import { ArrowRight, ArrowUpRight, Loader2, Send } from 'lucide-react'
import { z } from 'zod'
import { ArticleOpener } from '@/components/ui/ArticleOpener'
import { Chapter } from '@/components/ui/Chapter'
import { CONTACT_TOPICS, SITE } from '@/lib/content'
import { usePageSeo } from '@/lib/seo'
import { useLang } from '@/lib/i18n'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function schemaFor(fa: boolean) {
  const m = fa
    ? {
        name: 'لطفاً نام خود را بگویید.',
        nameMax: 'نام را زیر ۱۲۰ نویسه نگه دارید.',
        email: 'لطفاً نشانی ایمیلی بنویسید که بتوانیم پاسخ دهیم.',
        emailMax: 'این نشانی بیش از حد بلند است.',
        emailInvalid: 'این نشانی شبیه ایمیل نیست.',
        company: 'نام شرکت را زیر ۱۶۰ نویسه نگه دارید.',
        topic: 'موضوع پیام را انتخاب کنید.',
        message: 'یک یا دو جمله کمک می‌کند خوب پاسخ دهیم (حداقل ۲۰ نویسه).',
        messageMax: 'پیام را زیر ۴٬۰۰۰ نویسه نگه دارید.',
        consent: 'لطفاً موافقت کنید که از مشخصات شما برای پاسخ استفاده کنیم.',
      }
    : {
        name: 'Please tell us your name.',
        nameMax: 'Please keep your name under 120 characters.',
        email: 'Please add an email address we can reply to.',
        emailMax: 'That address is too long.',
        emailInvalid: 'That does not look like an email address.',
        company: 'Please keep the company name under 160 characters.',
        topic: 'Choose what your message is about.',
        message: 'A sentence or two helps us answer well (at least 20 characters).',
        messageMax: 'Please keep the message under 4,000 characters.',
        consent: 'Please agree to us using your details to reply.',
      }

  return z.object({
    name: z.string().trim().min(2, m.name).max(120, m.nameMax),
    email: z
      .string()
      .trim()
      .min(1, m.email)
      .max(254, m.emailMax)
      .regex(emailPattern, m.emailInvalid),
    company: z.string().trim().max(160, m.company),
    topic: z.string().refine((value) => CONTACT_TOPICS.some((topic) => topic.value === value), {
      message: m.topic,
    }),
    message: z.string().trim().min(20, m.message).max(4000, m.messageMax),
    consent: z.boolean().refine((value) => value, { message: m.consent }),
  })
}

const contactSchema = schemaFor(false)
const contactSchemaFa = schemaFor(true)

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

const nextStepsFa = [
  'یک انسان آن را می‌خواند — پیام‌ها به Binchitects می‌رسند، نه به یک ربات تیکت.',
  'با ایمیل پاسخ می‌دهیم، با یک پاسخ صریح یا زمانی برای گفتگو.',
  'قدم بعد را شما انتخاب می‌کنید: معرفی کامل، مجوز یا معماری.',
]

export function Contact() {
  usePageSeo('/contact')
  const fa = useLang() === 'fa'

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
  const topicLabel = useMemo(() => {
    const entry = CONTACT_TOPICS.find((item) => item.value === values.topic)
    return entry ? (fa ? entry.labelFa : entry.label) : fa ? 'پیام' : 'Message'
  }, [values.topic, fa])

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

    const parsed = (fa ? contactSchemaFa : contactSchema).safeParse(values)
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
          next[field.toLowerCase()] = fa ? 'لطفاً این فیلد را بررسی کنید.' : (messages[0] ?? 'That does not look right.')
        }
        setErrors(next)
        setStatus('idle')
        setNotice(fa ? 'برخی فیلدها نیاز به بازبینی دارند.' : 'Some fields need another look.')
        return
      }

      if (response.status === 429) {
        const problem = (await response.json()) as { retryAfterSeconds?: number }
        const minutes = problem.retryAfterSeconds
          ? Math.max(1, Math.ceil(problem.retryAfterSeconds / 60))
          : 10
        setStatus('rate-limited')
        setNotice(
          fa
            ? `پیام‌های زیادی از این اتصال فرستاده شده. لطفاً حدود ${minutes} دقیقه دیگر دوباره تلاش کنید.`
            : `Too many messages from this connection. Please try again in about ${minutes} minutes.`,
        )
        return
      }

      setStatus('failed')
      setNotice(fa ? 'پیام فرستاده نشد. لطفاً دوباره تلاش کنید یا در GitHub ایشو باز کنید.' : 'The message could not be sent. Please try again, or open an issue on GitHub.')
    } catch {
      setStatus('failed')
      setNotice(fa ? 'پیام فرستاده نشد. اتصال را بررسی کنید یا در GitHub ایشو باز کنید.' : 'The message could not be sent. Check your connection, or open an issue on GitHub.')
    }
  }

  return (
    <>
      <ArticleOpener
        section={fa ? 'تماس' : 'Contact'}
        title={
          <>
            {fa ? 'هوش مصنوعی را' : 'Bring your AI'}
            <br />
            <em>{fa ? 'به خانه بیاورید.' : 'home.'}</em>
          </>
        }
        standfirst={
          fa
            ? 'بگویید امروز چه چیزی اجرا می‌کنید — مدل‌ها، GitLab، ورودی که همین حالا دارید — تا با مسیری صریح به استقراری که مالِ خودتان است پاسخ دهیم.'
            : 'Tell us what you run today — the models, the GitLab, the sign-in you already have — and we will answer with a straight path to a deployment you own.'
        }
        aside={
          <>
            <p className="micro micro-ink">{fa ? 'بعد چه می‌شود' : 'What happens next'}</p>
            <ul className="mini-list" style={{ marginTop: '10px' }}>
              {(fa ? nextStepsFa : nextSteps).map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </>
        }
      />

      <Chapter number="01" label={fa ? 'یک پیام' : 'A message'}>
        <div className="contact-grid">
          {status === 'sent' ? (
            <div className="form-success">
              <h2>{fa ? 'پیام فرستاده شد.' : 'Message sent.'}</h2>
              <p className="body mt-s">
                {fa
                  ? `ممنون، ${values.name.trim().split(' ')[0] || 'دوست عزیز'}. پیام شما دربارهٔ ${topicLabel} به دست ما رسید و به ${values.email} پاسخ می‌دهیم.`
                  : `Thank you, ${values.name.trim().split(' ')[0] || 'friend'}. Your message about ${topicLabel.toLowerCase()} is with us, and we will reply to ${values.email}.`}
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
                  {fa ? 'ارسال پیام دیگر' : 'Send another'}
                </button>
                <Link to="/code-arena" className="arrow-link">
                  {fa ? 'تا پاسخ، Code Arena را ببینید' : 'While you wait, see Code Arena'}
                  <ArrowRight size={13} aria-hidden />
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="form">
              <div className="subhead">
                <h2 className="serif-m">{fa ? 'پیامی بفرستید' : 'Send a message'}</h2>
                <span className="micro">{fa ? 'پاسخ با ایمیل' : 'Reply by email'}</span>
              </div>

              <div className="form-grid">
                <div className="field">
                  <label htmlFor="name">{fa ? 'نام' : 'Name'}</label>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    className="input"
                    placeholder={fa ? 'سارا احمدی' : 'Sara Ahmadi'}
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
                  <label htmlFor="email">{fa ? 'ایمیل' : 'Email'}</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="input"
                    placeholder={fa ? 'you@company.com' : 'you@company.com'}
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
                    {fa ? 'شرکت' : 'Company'}
                    <span className="hint">{fa ? 'اختیاری' : 'optional'}</span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    autoComplete="organization"
                    className="input"
                    placeholder={fa ? 'محل کار شما' : 'Where you work'}
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
                  <label htmlFor="topic">{fa ? 'موضوع چیست؟' : 'What is this about?'}</label>
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
                          {fa ? entry.labelFa : entry.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.topic && <p className="field-error">{errors.topic}</p>}
                </div>

                <div className="field" style={{ gridColumn: '1 / -1' }}>
                  <label htmlFor="message">
                    {fa ? 'پیام' : 'Message'}
                    <span className="hint">{fa ? '۲۰ تا ۴٬۰۰۰ نویسه' : '20–4,000 characters'}</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="textarea"
                    placeholder={fa ? 'ما ۴۰ توسعه‌دهنده روی GitLab داریم و چت، نمایه و یک عامل کدنویسی را روی چهار H100 داخل شبکهٔ خودمان می‌خواهیم.' : 'We run 40 developers on GitLab and want the chat, the index and a coding agent on four H100s inside our own network.'}
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

                <div className="honeypot" aria-hidden="true">
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
                      {fa
                        ? 'موافقم Binchitects از این مشخصات برای پاسخ به من استفاده کند. فروخته نمی‌شوند و برای بازاریابی استفاده نمی‌شوند. '
                        : 'I agree to Binchitects using these details to reply to me. They are not sold or used for marketing. See the '}
                      <Link to="/privacy" className="text-link">
                        {fa ? 'یادداشت حریم خصوصی' : 'privacy note'}
                      </Link>
                      {fa ? '.' : '.'}
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
                      {fa ? 'باز کردن ایشو' : 'Open an issue'}
                    </a>
                  )}
                </p>
              )}

              <div className="row">
                <button type="submit" className="btn btn-solid" disabled={busy}>
                  {busy ? (
                    <>
                      <Loader2 size={14} className="spin" aria-hidden />
                      {fa ? 'در حال ارسال' : 'Sending'}
                    </>
                  ) : (
                    <>
                      {fa ? 'ارسال پیام' : 'Send message'}
                      <Send size={13} aria-hidden />
                    </>
                  )}
                </button>
                <span className="form-note">
                  {fa ? 'نشانی شما فقط به‌صورت هش نگه داشته می‌شود.' : 'Your address is stored only as a hash.'}
                </span>
              </div>
            </form>
          )}

          <aside className="contact-aside">
            <div className="contact-note">
              <h2>{fa ? 'فرم را دوست ندارید؟' : 'Rather not use a form?'}</h2>
              <p>
                {fa ? (
                  <>
                    در مخزن، با عنوانی که نیازتان را می‌گوید، ایشو باز کنید. برای مجوز تجاری،
                    مطابق LICENSING.md عنوان را <span className="mono">Commercial license</span>{' '}
                    بگذارید.
                  </>
                ) : (
                  <>
                    Open an issue in the repository under a title that says what you need. For a
                    commercial licence, use <span className="mono">Commercial license</span> as the
                    title, as LICENSING.md asks.
                  </>
                )}
              </p>
              <a href={SITE.issues} target="_blank" rel="noreferrer noopener" className="arrow-link">
                {fa ? 'ایشوهای Binchitects/argus' : 'Binchitects/argus issues'}
                <ArrowUpRight size={12} aria-hidden />
              </a>
            </div>

            <div className="contact-note">
              <h2>{fa ? 'گزارش‌های امنیتی' : 'Security reports'}</h2>
              <p>
                {fa
                  ? 'لطفاً آسیب‌پذیری را در این فرم یا در یک ایشوی عمومی نگذارید. سیاست امنیتی می‌گوید چطور خصوصی به نگه‌دارندگان برسید.'
                  : 'Please do not put a vulnerability in this form or a public issue. The security policy says how to reach the maintainers privately.'}
              </p>
              <a
                href={SITE.securityPolicy}
                target="_blank"
                rel="noreferrer noopener"
                className="arrow-link"
              >
                {fa ? 'سیاست امنیتی' : 'Security policy'}
                <ArrowUpRight size={12} aria-hidden />
              </a>
            </div>

            <div className="contact-note">
              <h2>{fa ? 'پیش از نوشتن' : 'Before you write'}</h2>
              <p>
                {fa
                  ? 'راهنمای استقرار میزبان، ‎.env و نصب‌کنندهٔ آفلاین را پوشش می‌دهد. بسیاری از پرسش‌ها همان‌جا پاسخ داده شده‌اند.'
                  : 'The deployment guide covers the host, the .env and the offline installer. Many questions are already answered there.'}
              </p>
              <a
                href={SITE.deployment}
                target="_blank"
                rel="noreferrer noopener"
                className="arrow-link"
              >
                {fa ? 'راهنمای استقرار' : 'Deployment guide'}
                <ArrowUpRight size={12} aria-hidden />
              </a>
            </div>
          </aside>
        </div>
      </Chapter>
    </>
  )
}
