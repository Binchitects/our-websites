import { useCallback, useEffect, useState } from 'react'
import { ArrowUpRight, RefreshCw } from 'lucide-react'
import { ArticleOpener } from '@/components/ui/ArticleOpener'
import { Chapter } from '@/components/ui/Chapter'
import { CtaBand } from '@/components/ui/CtaBand'
import { SITE } from '@/lib/content'
import { routeMeta } from '@/lib/route-meta'
import { useSeo } from '@/lib/seo'

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

const formatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

function formatDate(value: string | null): string {
  if (!value) return 'Unreleased'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? 'Unreleased' : formatter.format(date)
}

export function Changelog() {
  useSeo({ ...routeMeta('/changelog'), path: '/changelog' })

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
        section="Changelog"
        title={
          <>
            What changed,
            <br />
            <em>and why.</em>
          </>
        }
        standfirst="Every release carries what it added, what it fixed and — when one is weakened — which compliance control it changes. The page reads the repository’s releases through this site’s own API."
        actions={[
          { label: 'All releases', href: SITE.releases, external: true, solid: true },
          { label: 'Full changelog', href: SITE.changelog, external: true },
        ]}
        aside={
          <>
            <p className="micro micro-ink">What a release says</p>
            <ul className="mini-list" style={{ marginTop: '10px' }}>
              <li>
                <span>
                  <strong className="mono" style={{ fontSize: '10px' }}>Highlights</strong> — the one or
                  two things worth reading.
                </span>
              </li>
              <li>
                <span>
                  <strong className="mono" style={{ fontSize: '10px' }}>Features and bugs</strong> — what
                  is new and what is fixed.
                </span>
              </li>
              <li>
                <span>
                  <strong className="mono" style={{ fontSize: '10px' }}>Weakened controls</strong> — every
                  control a release makes weaker, by id, and why.
                </span>
              </li>
            </ul>
          </>
        }
      />

      <Chapter number="01" label="The record">
        {error ? (
          <div className="note">
            <h2 className="serif-m">The changelog could not be read.</h2>
            <p className="body mt-s">
              The site API did not answer. Releases are always available in the repository, and the
              page will try again.
            </p>
            <div className="row mt-m">
              <button
                type="button"
                onClick={() => setAttempt((value) => value + 1)}
                className="btn btn-outline btn-sm"
              >
                <RefreshCw size={12} aria-hidden />
                Try again
              </button>
              <a
                href={SITE.releases}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-solid btn-sm"
              >
                Releases on GitHub
                <ArrowUpRight size={12} aria-hidden />
              </a>
            </div>
          </div>
        ) : !feed ? (
          <div aria-busy="true" aria-label="Loading releases">
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
              <h3>{feed.releases.length} releases, newest first</h3>
              <span className="micro">
                {feed.source === 'github'
                  ? 'Read from GitHub · cached ten minutes'
                  : 'GitHub was out of reach · built-in list'}
              </span>
            </div>

            {feed.releases.map((release) => (
              <article key={release.tag} className="release">
                <div>
                  <span className="release-date">{formatDate(release.publishedAt)}</span>
                  <span className="release-tag">{release.tag}</span>
                  {release.prerelease && (
                    <span className="release-tag" style={{ marginLeft: '6px' }}>
                      pre-release
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
                    Release notes
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
          <>
            Run the version <em>you can read.</em>
          </>
        }
        lead="Every release is source, notes and a tag. Take the build, or ask us to map an upgrade path for the version you already run."
      />
    </>
  )
}
