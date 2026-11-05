import { useCallback, useEffect, useState } from 'react'
import { ArrowUpRight, RefreshCw } from 'lucide-react'
import { ArticleOpener } from '@/components/ui/ArticleOpener'
import { Chapter } from '@/components/ui/Chapter'
import { CtaBand } from '@/components/ui/CtaBand'
import { SITE } from '@/lib/content'
import { usePageSeo } from '@/lib/seo'
import { useLang } from '@/lib/i18n'

type Release = {
  tag: string
  name: string
  publishedAt: string | null
  url: string
  summary: string | null
  prerelease: boolean
}

type Feed = {
  source: 'github' | 'fallback'
  fetchedAt: string
  releases: Release[]
}

const formatterEn = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})
const formatterFa = new Intl.DateTimeFormat('fa-IR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

function formatDate(value: string | null, fa: boolean): string {
  if (!value) return fa ? 'منتشرنشده' : 'Unreleased'
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? fa
      ? 'منتشرنشده'
      : 'Unreleased'
    : (fa ? formatterFa : formatterEn).format(date)
}

export function Changelog() {
  usePageSeo('/changelog')
  const fa = useLang() === 'fa'

  const [feed, setFeed] = useState<Feed | null>(null)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)

  const load = useCallback((signal: AbortSignal) => {
    setError(false)
    fetch('/api/releases', { signal, headers: { Accept: 'application/json' } })
      .then((response) => {
        if (!response.ok) throw new Error(`The changelog answered ${response.status}.`)
        return response.json() as Promise<Feed>
      })
      .then((data) => setFeed(data))
      .catch((reason: unknown) => {
        if (reason instanceof DOMException && reason.name === 'AbortError') return
        setError(true)
      })
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    load(controller.signal)
    return () => controller.abort()
  }, [load, attempt])

  return (
    <>
      <ArticleOpener
        section={fa ? 'تغییرات' : 'Changelog'}
        title={
          <>
            {fa ? 'چه چیزی عوض شد،' : 'What changed,'}
            <br />
            <em>{fa ? 'و چرا.' : 'and why.'}</em>
          </>
        }
        standfirst={
          fa
            ? 'هر انتشار می‌گوید چه چیزی اضافه و چه چیزی اصلاح شد و — اگر کنترلی ضعیف شده — کدام کنترل انطباق تغییر می‌کند. این صفحه انتشارهای مخزن را از API همین سایت می‌خواند. متن یادداشت‌های انتشار به زبان اصلی (انگلیسی) است.'
            : 'Every release carries what it added, what it fixed and — when one is weakened — which compliance control it changes. The page reads the repository’s releases through this site’s own API.'
        }
        actions={[
          { label: fa ? 'همهٔ انتشارها' : 'All releases', href: SITE.releases, external: true, solid: true },
          { label: fa ? 'تغییرات کامل' : 'Full changelog', href: SITE.changelog, external: true },
        ]}
        aside={
          <>
            <p className="micro micro-ink">{fa ? 'یک انتشار چه می‌گوید' : 'What a release says'}</p>
            <ul className="mini-list" style={{ marginTop: '10px' }}>
              <li>
                <span>
                  <strong className="mono" style={{ fontSize: '10px' }}>{fa ? 'نکات برجسته' : 'Highlights'}</strong>
                  {fa ? ' — یکی دو چیز ارزش خواندن.' : ' — the one or two things worth reading.'}
                </span>
              </li>
              <li>
                <span>
                  <strong className="mono" style={{ fontSize: '10px' }}>{fa ? 'قابلیت‌ها و باگ‌ها' : 'Features and bugs'}</strong>
                  {fa ? ' — چه چیزی تازه و چه چیزی اصلاح شده.' : ' — what is new and what is fixed.'}
                </span>
              </li>
              <li>
                <span>
                  <strong className="mono" style={{ fontSize: '10px' }}>{fa ? 'کنترل‌های تضعیف‌شده' : 'Weakened controls'}</strong>
                  {fa ? ' — هر کنترلی که انتشار ضعیف‌ترش می‌کند، با شناسه و دلیل.' : ' — every control a release makes weaker, by id, and why.'}
                </span>
              </li>
            </ul>
          </>
        }
      />

      <Chapter number="01" label={fa ? 'دفتر' : 'The record'}>
        {error ? (
          <div className="note">
            <h2 className="serif-m">{fa ? 'تغییرات خوانده نشد.' : 'The changelog could not be read.'}</h2>
            <p className="body mt-s">
              {fa
                ? 'API سایت پاسخ نداد. انتشارها همیشه در مخزن موجودند و این صفحه دوباره تلاش می‌کند.'
                : 'The site API did not answer. Releases are always available in the repository, and the page will try again.'}
            </p>
            <div className="row mt-m">
              <button
                type="button"
                onClick={() => setAttempt((value) => value + 1)}
                className="btn btn-outline btn-sm"
              >
                <RefreshCw size={12} aria-hidden />
                {fa ? 'دوباره تلاش کنید' : 'Try again'}
              </button>
              <a
                href={SITE.releases}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-solid btn-sm"
              >
                {fa ? 'انتشارها در GitHub' : 'Releases on GitHub'}
                <ArrowUpRight size={12} aria-hidden />
              </a>
            </div>
          </div>
        ) : !feed ? (
          <div aria-busy="true" aria-label={fa ? 'در حال بارگذاری انتشارها' : 'Loading releases'}>
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="release">
                <div>
                  <div className="skeleton" style={{ width: '90px' }} />
                </div>
                <div>
                  <div className="skeleton" style={{ width: '55%', height: '14px' }} />
                  <div className="skeleton mt-s" style={{ width: '100%' }} />
                  <div className="skeleton mt-xs" style={{ width: '80%' }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="subhead">
              <h3>
                {fa
                  ? `${feed.releases.length} انتشار، جدیدترین اول`
                  : `${feed.releases.length} releases, newest first`}
              </h3>
              <span className="micro">
                {feed.source === 'github'
                  ? fa
                    ? 'خوانده‌شده از GitHub · کش ده‌دقیقه‌ای'
                    : 'Read from GitHub · cached ten minutes'
                  : fa
                    ? 'GitHub در دسترس نبود · فهرست داخلی'
                    : 'GitHub was out of reach · built-in list'}
              </span>
            </div>

            {feed.releases.map((release) => (
              <article key={release.tag} className="release">
                <div>
                  <span className="release-date">{formatDate(release.publishedAt, fa)}</span>
                  <span className="release-tag">{release.tag}</span>
                  {release.prerelease && (
                    <span className="release-tag" style={{ marginInlineStart: '6px' }}>
                      {fa ? 'پیش‌انتشار' : 'pre-release'}
                    </span>
                  )}
                </div>
                <div>
                  {release.name.trim() !== release.tag.trim() && <h2>{release.name}</h2>}
                  {release.summary && <p>{release.summary}</p>}
                  <a
                    href={release.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="arrow-link"
                  >
                    {fa ? 'یادداشت‌های انتشار' : 'Release notes'}
                    <ArrowUpRight size={11} aria-hidden />
                  </a>
                </div>
              </article>
            ))}
          </>
        )}
      </Chapter>

      <CtaBand
        title={
          fa ? (
            <>
              نسخه‌ای را اجرا کنید <em>که می‌توانید بخوانید.</em>
            </>
          ) : (
            <>
              Run the version <em>you can read.</em>
            </>
          )
        }
        lead={
          fa
            ? 'هر انتشار کد منبع، یادداشت و یک تگ است. build را بردارید یا از ما بخواهید مسیر ارتقا از نسخهٔ فعلی‌تان را نقشه کند.'
            : 'Every release is source, notes and a tag. Take the build, or ask us to map an upgrade path for the version you already run.'
        }
      />
    </>
  )
}
