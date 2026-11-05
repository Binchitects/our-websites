import { ArrowUpRight } from 'lucide-react'
import { BinchitectsLockup } from '@/components/brand/BinchitectsLockup'
import { SITE } from '@/lib/content'

const LINKS = [
  { label: 'Binchitects on GitHub', href: SITE.org },
  { label: 'The repository', href: SITE.github },
  { label: 'Contributing', href: SITE.contributing },
  { label: 'Issues and requests', href: SITE.issues },
  { label: 'Releases', href: SITE.releases },
]

/**
 * The publisher's page, set between the licensing chapter and the questions:
 * a huge Binchitects wordmark, the open-source team's statement, and the way in.
 */
export function PublishersBand() {
  return (
    <section className="publisher" id="publisher">
      <div className="shell">
        <div className="publisher-top">
          <span className="micro">The publisher</span>
          <span className="publisher-stamp">Open source team</span>
          <span className="micro">AGPL-3.0-only</span>
        </div>

        <BinchitectsLockup className="bx-xl" role={false} />

        <div className="publisher-grid">
          <div>
            <p className="publisher-lead">
              Binchitects keeps a team dedicated to open-source development.
            </p>
            <p className="body">
              Argus Arena is built in public: the source, the issues, the manual, the release notes
              and the roadmap are there to read, run and change. The AGPL is the licence, not a
              footnote — and the work is done in the open every day by people whose job it is.
            </p>
            <p className="note">
              <strong>Built in the open</strong>
              A platform that asks you to trust it with your code should be readable. Start with the
              repository, then the contributing guide.
            </p>
          </div>

          <div className="publisher-links">
            {LINKS.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer noopener">
                <span>{link.label}</span>
                <ArrowUpRight size={13} aria-hidden />
              </a>
            ))}
            <p className="publisher-meta">
              AGPL-3.0-only · commercial licence for the uses it does not fit · source included
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
