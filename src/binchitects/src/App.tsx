import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { ArgusGlyph } from '@/components/ArgusGlyph'
import { Horizon } from '@/components/Horizon'
import { UtcClock } from '@/components/UtcClock'
import { Wordmark } from '@/components/Wordmark'
import { LINKS } from '@/lib/site'
import { langFromPath, type Lang } from '@/lib/locale'

const COPY = {
  en: {
    nav: ['Work', 'Community', 'Vision'],
    navLabel: 'Sections',
    argus: 'Argus Arena',
    date: 'Open-source studio',
    dateMid: 'Source · Community · Long run',
    line1: 'Open by default.',
    line2: 'Made for the long run.',
    lede: 'Binchitects is an open-source studio. We build software people can own, read and carry forward — in public, with the people who use it.',
    cta1: 'Argus Arena',
    cta2: 'GitHub',
    notes: ['Argus is AGPL-3.0-only', 'No black boxes', 'Scroll'],
    work: {
      top: '01 / The work',
      meta: 'Argus Arena · V7.7.0',
      title: 'Argus Arena',
      lede: 'Private AI on hardware you control: chat, Code Arena, a code index, and the evidence an auditor asks for.',
      body: 'Self-hosted, AGPL-3.0-only, and developed in the open. The repository is the product page: the source, the issues, the releases and the roadmap are all there.',
      link: 'Visit argus.binchitects.com',
      note: 'One platform for the whole team, on your GPUs, inside your network.',
      specs: ['Self-hosted AI', 'Code Arena', 'Code index', 'AGPL-3.0-only'],
    },
    community: {
      top: '02 / The community',
      meta: 'Open to anyone',
      title: 'The door is open.',
      lede: 'Open source is not a licence line at the bottom of a page. It is the way the work gets made: in public, with anyone who shows up. There is no application and no waiting list.',
      ways: [
        { number: '01', title: 'Read the source', note: 'The whole product is on GitHub: the app, the API, the index, the tests and the docs.', label: 'github.com/Binchitects/argus', href: LINKS.repo },
        { number: '02', title: 'Open an issue', note: 'A bug, a question, a proposal. They are public, searchable and part of the record.', label: 'Issues', href: LINKS.issues },
        { number: '03', title: 'Send a patch', note: 'The contributing guide says how to set up, what the checks are and how review works.', label: 'CONTRIBUTING.md', href: LINKS.contributing },
      ],
      note: 'Start with a question. Read a file, run the tests, tell us what is missing.',
    },
    vision: {
      top: '03 / The long run',
      meta: 'Built for the decade',
      title: 'Build for the decade, not the demo.',
      lede: 'Local models, open protocols, and software that can still be read and run long after the vendor disappears. That is the future we are working toward — not a locked box with a monthly fee.',
      body: 'We choose the boring, durable parts: files you can inspect, standards anyone can implement, and a licence that keeps the work available.',
      principles: ['Local first', 'Public by default', 'Built to be forked', 'No lock-in'],
    },
    cta: {
      top: 'Next / Build with us',
      meta: 'No application',
      title: ['The future is open.', 'Come build it.'],
      buttons: ['GitHub', 'Argus Arena'],
    },
    footer: {
      about: 'Open-source studio. Built in public.',
      columns: [
        { title: 'The work', links: [['Argus Arena ↗', LINKS.argus], ['Source ↗', LINKS.repo], ['Releases ↗', LINKS.releases]] },
        { title: 'The community', links: [['Issues ↗', LINKS.issues], ['Contributing ↗', LINKS.contributing], ['GitHub ↗', LINKS.org]] },
      ],
      base: ['Binchitects', 'Argus is AGPL-3.0-only', 'Set in Archivo and IBM Plex'],
    },
    langLabel: 'Language',
    switchTo: 'فارسی',
  },
  fa: {
    nav: ['کار', 'جامعه', 'چشم‌انداز'],
    navLabel: 'بخش‌ها',
    argus: 'Argus Arena',
    date: 'استودیوی متن‌باز',
    dateMid: 'کد منبع · جامعه · بلندمدت',
    line1: 'آشکارا، به‌طور پیش‌فرض.',
    line2: 'برای بلندمدت ساخته شده.',
    lede: 'Binchitects یک استودیوی متن‌باز است. نرم‌افزاری می‌سازیم که مردم بتوانند مالکش باشند، بخوانندش و با خود ببرند — آشکارا، همراه با کسانی که از آن استفاده می‌کنند.',
    cta1: 'Argus Arena',
    cta2: 'GitHub',
    notes: ['Argus تحت AGPL-3.0-only است', 'بدون جعبهٔ سیاه', 'اسکرول'],
    work: {
      top: '۰۱ / کار',
      meta: 'Argus Arena · V7.7.0',
      title: 'Argus Arena',
      lede: 'هوش مصنوعی خصوصی روی سخت‌افزاری که خودتان کنترل می‌کنید: چت، Code Arena، نمایهٔ کد و شواهدی که ممیز می‌خواهد.',
      body: 'خودمیزبان، AGPL-3.0-only و توسعه‌یافته در ملأ عام. مخزن همان صفحهٔ محصول است: کد منبع، ایشوها، انتشارها و نقشهٔ راه همه آنجا هستند.',
      link: 'به argus.binchitects.com بروید',
      note: 'یک پلتفرم برای کل تیم، روی GPUهای خودتان، داخل شبکهٔ خودتان.',
      specs: ['هوش مصنوعی خودمیزبان', 'Code Arena', 'نمایهٔ کد', 'AGPL-3.0-only'],
    },
    community: {
      top: '۰۲ / جامعه',
      meta: 'باز برای همه',
      title: 'در باز است.',
      lede: 'متن‌باز یک خط مجوز در پایین صفحه نیست. روش ساخته‌شدن کار است: آشکارا، با هر کسی که بیاید. نه درخواستی هست و نه فهرست انتظار.',
      ways: [
        { number: '۰۱', title: 'کد منبع را بخوانید', note: 'کل محصول در GitHub است: برنامه، API، نمایه، تست‌ها و مستندات.', label: 'github.com/Binchitects/argus', href: LINKS.repo },
        { number: '۰۲', title: 'ایشو باز کنید', note: 'یک باگ، یک پرسش، یک پیشنهاد. عمومی، قابل جست‌وجو و بخشی از سابقه.', label: 'ایشوها', href: LINKS.issues },
        { number: '۰۳', title: 'وصله بفرستید', note: 'راهنمای مشارکت می‌گوید چطور راه بیندازید، بررسی‌ها چیست و بازبینی چطور کار می‌کند.', label: 'CONTRIBUTING.md', href: LINKS.contributing },
      ],
      note: 'با یک پرسش شروع کنید. یک فایل بخوانید، تست‌ها را اجرا کنید، بگویید چه کم است.',
    },
    vision: {
      top: '۰۳ / بلندمدت',
      meta: 'برای دهه ساخته شده',
      title: 'برای دهه بسازید، نه برای دمو.',
      lede: 'مدل‌های محلی، پروتکل‌های باز و نرم‌افزاری که مدت‌ها پس از ناپدیدشدن فروشنده هم خواندنی و اجراشدنی است. آینده‌ای که به سمتش کار می‌کنیم همین است — نه یک جعبهٔ قفل‌شده با هزینهٔ ماهانه.',
      body: 'اجزای خسته‌کننده و ماندگار را انتخاب می‌کنیم: فایل‌هایی که می‌توانید بررسی کنید، استانداردهایی که هر کسی می‌تواند پیاده کند و مجوزی که کار را در دسترس نگه می‌دارد.',
      principles: ['محلی اول', 'آشکارا به‌طور پیش‌فرض', 'ساخته‌شده برای انشعاب', 'بدون قفل‌شدگی'],
    },
    cta: {
      top: 'بعدی / با ما بسازید',
      meta: 'بدون درخواست',
      title: ['آینده باز است.', 'بیایید بسازیمش.'],
      buttons: ['GitHub', 'Argus Arena'],
    },
    footer: {
      about: 'استودیوی متن‌باز. ساخته‌شده در ملأ عام.',
      columns: [
        { title: 'کار', links: [['Argus Arena ↗', LINKS.argus], ['کد منبع ↗', LINKS.repo], ['انتشارها ↗', LINKS.releases]] },
        { title: 'جامعه', links: [['ایشوها ↗', LINKS.issues], ['مشارکت ↗', LINKS.contributing], ['GitHub ↗', LINKS.org]] },
      ],
      base: ['Binchitects', 'Argus تحت AGPL-3.0-only است', 'با Archivo، IBM Plex و وزیرمتن'],
    },
    langLabel: 'زبان',
    switchTo: 'English',
  },
} as const

function setMeta(attribute: 'name' | 'property', key: string, value: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', value)
}

/** The studio page: one statement, one product, one open door. */
export function App({ initialLang }: { initialLang?: Lang }) {
  const lang = initialLang ?? langFromPath(window.location.pathname)
  const fa = lang === 'fa'
  const c = COPY[lang]
  const [hash, setHash] = useState('')

  useEffect(() => {
    setHash(window.location.hash)
    document.documentElement.lang = lang
    document.documentElement.dir = fa ? 'rtl' : 'ltr'
    document.title = fa
      ? 'Binchitects — متن‌باز، ساخته‌شده برای بلندمدت'
      : 'Binchitects — open source, made for the long run'
    const description = fa
      ? 'Binchitects یک استودیوی متن‌باز است. نرم‌افزاری می‌سازیم که مردم بتوانند مالکش باشند، بخوانندش و با خود ببرند — آشکارا، همراه با کسانی که از آن استفاده می‌کنند.'
      : 'Binchitects is an open-source studio. We build software people can own, read and carry forward — in public, with the people who use it.'
    const url = `https://binchitects.com${fa ? '/fa' : '/'}`
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', document.title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:locale', fa ? 'fa_IR' : 'en_US')
    setMeta('property', 'og:locale:alternate', fa ? 'en_US' : 'fa_IR')
    setMeta('name', 'twitter:title', document.title)
    setMeta('name', 'twitter:description', description)
    setMeta(
      'property',
      'og:image:alt',
      fa
        ? 'نام Binchitects میان دو آکولاد نارنجی روی مشکی، کنار این جمله: متن‌باز، ساخته‌شده برای بلندمدت.'
        : 'The words Binchitects held between orange braces on black, beside the line: open source, made for the long run.',
    )

    for (const [hreflang, href] of [
      ['en', 'https://binchitects.com/'],
      ['fa', 'https://binchitects.com/fa'],
      ['x-default', 'https://binchitects.com/'],
    ] as const) {
      let alternate = document.head.querySelector<HTMLLinkElement>(
        `link[rel="alternate"][hreflang="${hreflang}"]`,
      )
      if (!alternate) {
        alternate = document.createElement('link')
        alternate.rel = 'alternate'
        alternate.hreflang = hreflang
        document.head.appendChild(alternate)
      }
      alternate.href = href
    }

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
  }, [fa, lang])

  return (
    <>
      <a className="skip-link" href="#main">
        {fa ? 'رفتن به محتوا' : 'Skip to content'}
      </a>

      <header className="masthead">
        <div className="shell masthead-inner">
          <a className="mast-brand" href="#top" aria-label={fa ? 'Binchitects، بازگشت به بالا' : 'Binchitects, back to the top'}>
            <Wordmark />
          </a>
          <nav className="mast-nav" aria-label={c.navLabel}>
            <a href="#work">{c.nav[0]}</a>
            <a href="#community">{c.nav[1]}</a>
            <a href="#vision">{c.nav[2]}</a>
          </nav>
          <a className="mast-argus" href={LINKS.argus} target="_blank" rel="noreferrer noopener">
            {c.argus}
            <ArrowUpRight size={13} aria-hidden />
          </a>
          <span className="lang-switch header-lang" aria-label={c.langLabel}>
            <a href={'/' + hash} hrefLang="en" lang="en" className={!fa ? 'is-current' : undefined} aria-current={!fa ? 'page' : undefined}>
              EN
            </a>
            <span className="lang-sep" aria-hidden>/</span>
            <a href={'/fa' + hash} hrefLang="fa" lang="fa" className={fa ? 'is-current' : undefined} aria-current={fa ? 'page' : undefined}>
              فا
            </a>
          </span>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="shell">
            <div className="hero-date">
              <span>{c.date}</span>
              <span className="hero-date-mid">{c.dateMid}</span>
              <UtcClock />
            </div>

            <div className="hero-lockup">
              <span className="hero-brace" aria-hidden>
                {'{'}
              </span>
              <h1>
                {fa ? (
                  <>
                    آشکارا،
                    <br className="hero-break" /> به‌طور پیش‌فرض.
                  </>
                ) : (
                  c.line1
                )}
                <br />
                <em>
                  {fa ? (
                    <>
                      برای بلندمدت
                      <br className="hero-break" /> ساخته شده.
                    </>
                  ) : (
                    <>
                      Made for the
                      <br className="hero-break" /> long run.
                    </>
                  )}
                </em>
              </h1>
              <span className="hero-brace" aria-hidden>
                {'}'}
              </span>
            </div>

            <div className="hero-foot">
              <p className="hero-lede">{c.lede}</p>
              <div className="hero-actions">
                <a className="button button-solid" href={LINKS.argus} target="_blank" rel="noreferrer noopener">
                  {c.cta1}
                  <ArrowUpRight size={15} aria-hidden />
                </a>
                <a className="button button-line" href={LINKS.org} target="_blank" rel="noreferrer noopener">
                  {c.cta2}
                  <ArrowUpRight size={15} aria-hidden />
                </a>
              </div>
            </div>

            <div className="hero-rule">
              <span>{c.notes[0]}</span>
              <span>{c.notes[1]}</span>
              <span className="hero-rule-end">{c.notes[2]}</span>
            </div>
          </div>
        </section>

        <section className="chapter work" id="work">
          <div className="shell">
            <div className="chapter-top">
              <span>{c.work.top}</span>
              <span>{c.work.meta}</span>
            </div>

            <div className="work-grid">
              <div className="work-copy">
                <h2>
                  {c.work.title}
                  <span className="work-dot">.</span>
                </h2>
                <p className="lede">{c.work.lede}</p>
                <p>{c.work.body}</p>
                <a className="text-link" href={LINKS.argus} target="_blank" rel="noreferrer noopener">
                  {c.work.link}
                  <ArrowUpRight size={15} aria-hidden />
                </a>
              </div>

              <div className="work-plate">
                <ArgusGlyph className="argus-glyph" />
                <p className="work-plate-note">{c.work.note}</p>
              </div>
            </div>

            <ul className="spec-row">
              {c.work.specs.map((spec) => (
                <li key={spec}>{spec}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="chapter community" id="community">
          <div className="shell">
            <div className="chapter-top">
              <span>{c.community.top}</span>
              <span>{c.community.meta}</span>
            </div>

            <div className="community-head">
              <h2>{c.community.title}</h2>
              <p className="lede">{c.community.lede}</p>
            </div>

            <div className="ways">
              {c.community.ways.map((way) => (
                <a key={way.number} className="way" href={way.href} target="_blank" rel="noreferrer noopener">
                  <span className="way-number" aria-hidden>
                    {way.number}
                  </span>
                  <span className="way-copy">
                    <strong>{way.title}</strong>
                    <span className="way-note">{way.note}</span>
                    <span className="way-label">{way.label}</span>
                  </span>
                  <ArrowUpRight className="way-arrow" size={18} aria-hidden />
                </a>
              ))}
            </div>

            <p className="community-note">{c.community.note}</p>
          </div>
        </section>

        <section className="chapter vision" id="vision">
          <div className="shell">
            <div className="chapter-top">
              <span>{c.vision.top}</span>
              <span>{c.vision.meta}</span>
            </div>

            <div className="vision-grid">
              <h2>
                {fa ? (
                  <>
                    برای دهه بسازید،
                    <br />
                    نه برای دمو.
                  </>
                ) : (
                  c.vision.title
                )}
              </h2>
              <div className="vision-copy">
                <p className="lede">{c.vision.lede}</p>
                <p>{c.vision.body}</p>
              </div>
            </div>

            <ul className="principles">
              {c.vision.principles.map((principle, index) => (
                <li key={principle}>
                  <span>
                    {fa
                      ? ['۰۱', '۰۲', '۰۳', '۰۴'][index] ?? String(index + 1).padStart(2, '0')
                      : String(index + 1).padStart(2, '0')}
                  </span>
                  {principle}
                </li>
              ))}
            </ul>

            <Horizon lang={lang} />
          </div>
        </section>

        <section className="cta">
          <div className="shell">
            <div className="chapter-top">
              <span>{c.cta.top}</span>
              <span>{c.cta.meta}</span>
            </div>
            <h2>
              {c.cta.title[0]}
              <br />
              {c.cta.title[1]}
            </h2>
            <div className="cta-actions">
              <a className="button button-ink" href={LINKS.org} target="_blank" rel="noreferrer noopener">
                {c.cta.buttons[0]}
                <ArrowUpRight size={15} aria-hidden />
              </a>
              <a className="button button-ink-line" href={LINKS.argus} target="_blank" rel="noreferrer noopener">
                {c.cta.buttons[1]}
                <ArrowUpRight size={15} aria-hidden />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="shell">
          <div className="footer-top">
            <div className="footer-brand">
              <Wordmark />
              <p>{c.footer.about}</p>
            </div>

            <nav className="footer-cols" aria-label={fa ? 'پانویس' : 'Footer'}>
              {c.footer.columns.map((column) => (
                <div key={column.title}>
                  <h2>{column.title}</h2>
                  {column.links.map(([label, href]) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer noopener">
                      {label}
                    </a>
                  ))}
                </div>
              ))}
            </nav>
          </div>

          <div className="footer-base">
            <span>© {new Date().getFullYear()} {c.footer.base[0]}</span>
            <span>{c.footer.base[1]}</span>
            <span>{c.footer.base[2]}</span>
            <UtcClock />
            <span className="lang-switch footer-lang" aria-label={c.langLabel}>
              <a href={'/' + hash} hrefLang="en" lang="en" className={!fa ? 'is-current' : undefined}>
                EN
              </a>
              <span className="lang-sep" aria-hidden>/</span>
              <a href={'/fa' + hash} hrefLang="fa" lang="fa" className={fa ? 'is-current' : undefined}>
                فا
              </a>
            </span>
          </div>
        </div>
      </footer>
    </>
  )
}
