import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Chapter, ChapterHead } from '@/components/ui/Chapter'
import { SITE } from '@/lib/content'

const community = [
  'Run it for your team, at no cost',
  'Read, study, change and share the source',
  'Every feature in this site, with no seat count',
  'Community support through the repository',
]

const commercial = [
  'A hosted, managed or embedded offering',
  'Closed-source distribution or an appliance',
  'Private modifications used over a network',
  'Warranty, support and the names and logos',
]

/** Chapter seven: the two licences, as a two-page spread. */
export function LicenceChapter() {
  return (
    <Chapter number="07" label="Licensing" id="licenses">
      <ChapterHead
        title="Free to run. Commercial when the AGPL does not fit."
        standfirst="Argus Arena is dual-licensed. You can use it under the AGPL-3.0-only, or take a commercial licence that replaces its obligations with the terms we agree — for example when you offer it to others as a service."
      />

      <div className="licence-grid">
        <div className="licence">
          <div className="licence-head">
            <h3>Community</h3>
            <span className="tag">AGPL-3.0-only</span>
          </div>
          <p>
            For teams that run the stack for themselves and can meet the AGPL&rsquo;s conditions. The
            whole product, the whole source, no seat count.
          </p>
          <ul>
            {community.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="licence-actions">
            <a href={SITE.licensing} target="_blank" rel="noreferrer noopener" className="btn btn-outline btn-sm">
              Read the licence
              <ArrowUpRight size={12} aria-hidden />
            </a>
            <a href={SITE.github} target="_blank" rel="noreferrer noopener" className="btn btn-outline btn-sm">
              Source
              <ArrowUpRight size={12} aria-hidden />
            </a>
          </div>
        </div>

        <div className="licence">
          <div className="licence-head">
            <h3>Commercial</h3>
            <span className="tag">Written licence</span>
          </div>
          <p>
            For a hosted service, an appliance, closed distribution, or private changes used by
            others over a network. It replaces the AGPL obligations with agreed terms.
          </p>
          <ul>
            {commercial.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="licence-actions">
            <Link to="/contact?topic=license" className="btn btn-solid btn-sm">
              Ask about a licence
              <ArrowRight size={12} aria-hidden />
            </Link>
            <a
              href={SITE.licensing}
              target="_blank"
              rel="noreferrer noopener"
              className="arrow-link"
            >
              When one is required
              <ArrowUpRight size={12} aria-hidden />
            </a>
          </div>
        </div>
      </div>

      <p className="note mt-s">
        <strong>Not legal advice.</strong>
        This page explains the licensing; LICENSING.md in the repository is the reference. The names
        Argus Arena, Argus and Code Arena are trademarks of Binchitects.
      </p>
    </Chapter>
  )
}
