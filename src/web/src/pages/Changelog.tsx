import { useCallback, useEffect, useState } from 'react'
import { AlertCircle, ArrowUpRight, RefreshCw } from 'lucide-react'
import { CtaBand } from '@/components/ui/CtaBand'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { SITE } from '@/lib/content'
import { useSeo } from '@/lib/seo'
import { routeMeta } from '@/lib/route-meta'

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
      <PageHero
        eyebrow="Changelog"
        title={
          <>
            What changed,
            <br />
            <span className="gradient-text">and why.</span>
          </>
        }
        lead="Every release carries what it added, what it fixed and — when one is weakened — which compliance control it changes. The page reads the repository’s releases through this site’s own API."
        actions={[
          { label: 'All releases', href: SITE.releases, external: true },
          { label: 'Full changelog', href: SITE.changelog, external: true },
        ]}
        meta={
          <div className="mono flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] tracking-[0.12em] text-faint uppercase">
            <span className="flex items-center gap-2">
              <span className="dot" aria-hidden /> v{SITE.version} current
            </span>
            <span>AGPL-3.0-only · commercial</span>
          </div>
        }
        aside={
          <div className="panel p-6">
            <p className="mono text-[9.5px] tracking-[0.16em] text-accent uppercase">What a release says</p>
            <ul className="mt-4 space-y-3 text-[12.5px] leading-relaxed text-muted">
              <li>
                <span className="mono text-[10px] text-ink">Highlights</span> — the one or two things
                worth reading.
              </li>
              <li>
                <span className="mono text-[10px] text-ink">Features and bugs</span> — what is new and
                what is fixed.
              </li>
              <li>
                <span className="mono text-[10px] text-ink">Weakened controls</span> — every control a
                release makes weaker, by id, and why.
              </li>
            </ul>
          </div>
        }
      />

      <section className="section">
        <div className="shell max-w-[900px]">
          {error ? (
            <Reveal>
              <div className="panel flex flex-col items-start gap-4 p-7">
                <span className="icon-tile">
                  <AlertCircle size={18} aria-hidden />
                </span>
                <div>
                  <h2 className="display-3">The changelog could not be read.</h2>
                  <p className="body-copy mt-2 max-w-[52ch]">
                    The site API did not answer. Releases are always available in the repository, and
                    the page will try again.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button type="button" onClick={() => setAttempt((value) => value + 1)} className="btn btn-ghost btn-sm">
                    <RefreshCw size={13} aria-hidden />
                    Try again
                  </button>
                  <a
                    href={SITE.releases}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="btn btn-primary btn-sm"
                  >
                    Releases on GitHub
                    <ArrowUpRight size={13} aria-hidden />
                  </a>
                </div>
              </div>
            </Reveal>
          ) : !feed ? (
            <div className="space-y-4" aria-busy="true" aria-label="Loading releases">
              {[0, 1, 2, 3].map((index) => (
                <div key={index} className="panel animate-pulse p-6">
                  <div className="h-3 w-24 rounded bg-line" />
                  <div className="mt-4 h-5 w-2/3 rounded bg-line" />
                  <div className="mt-3 h-3 w-full rounded bg-line/70" />
                  <div className="mt-2 h-3 w-4/5 rounded bg-line/70" />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
                <p className="mono text-[10px] tracking-[0.12em] text-faint uppercase">
                  {feed.releases.length} releases · newest first
                </p>
                <p className="mono text-[9.5px] text-faint">
                  {feed.source === 'github'
                    ? 'read from GitHub · cached ten minutes'
                    : 'GitHub was out of reach · built-in list'}
                </p>
              </div>

              <div className="relative">
                <span
                  className="absolute top-3 bottom-3 left-[7px] w-px bg-gradient-to-b from-accent/40 via-line to-transparent"
                  aria-hidden
                />
                <ol className="relative space-y-4">
                {feed.releases.map((release, index) => (
                  <li key={release.tag} className="relative pl-8">
                    <Reveal delay={Math.min(index * 45, 240)}>
                      <span
                        className="absolute top-[26px] left-0 h-[15px] w-[15px] rounded-full border border-line-strong bg-canvas"
                        aria-hidden
                      >
                        <span className="absolute inset-[4px] rounded-full bg-accent/70" />
                      </span>

                      <article className="panel p-6">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="tag tag-accent">{release.tag}</span>
                          <span className="mono text-[10px] text-faint">
                            {formatDate(release.publishedAt)}
                          </span>
                          {release.prerelease && <span className="tag">pre-release</span>}
                        </div>
                        {release.name.trim() !== release.tag.trim() && (
                          <h2 className="mt-3 text-[16.5px] leading-snug font-[580] tracking-[-0.02em]">
                            {release.name}
                          </h2>
                        )}
                        {release.summary && (
                          <p className="mt-2.5 text-[13.5px] leading-[1.7] text-muted">{release.summary}</p>
                        )}
                        <a
                          href={release.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="link-arrow mt-4 text-[13px]"
                        >
                          Release notes
                          <ArrowUpRight size={13} aria-hidden />
                        </a>
                      </article>
                    </Reveal>
                  </li>
                ))}
                </ol>
              </div>
            </>
          )}
        </div>
      </section>

      <CtaBand
        title="Run the version you can read."
        lead="Every release is source, notes and a tag. Take the build, or ask us to map an upgrade path for the version you already run."
      />
    </>
  )
}
