import { ArrowUpRight } from 'lucide-react'
import { ArgusGlyph } from '@/components/ArgusGlyph'
import { Horizon } from '@/components/Horizon'
import { UtcClock } from '@/components/UtcClock'
import { Wordmark } from '@/components/Wordmark'
import { LINKS } from '@/lib/site'

const WAYS = [
  {
    number: '01',
    title: 'Read the source',
    note: 'The whole product is on GitHub: the app, the API, the index, the tests and the docs.',
    href: LINKS.repo,
    label: 'github.com/Binchitects/argus',
  },
  {
    number: '02',
    title: 'Open an issue',
    note: 'A bug, a question, a proposal. They are public, searchable and part of the record.',
    href: LINKS.issues,
    label: 'Issues',
  },
  {
    number: '03',
    title: 'Send a patch',
    note: 'The contributing guide says how to set up, what the checks are and how review works.',
    href: LINKS.contributing,
    label: 'CONTRIBUTING.md',
  },
]

const PRINCIPLES = ['Local first', 'Public by default', 'Built to be forked', 'No lock-in']

/** The studio page: one statement, one product, one open door. */
export function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="masthead">
        <div className="shell masthead-inner">
          <a className="mast-brand" href="#top" aria-label="Binchitects, back to the top">
            <Wordmark />
          </a>
          <nav className="mast-nav" aria-label="Sections">
            <a href="#work">Work</a>
            <a href="#community">Community</a>
            <a href="#vision">Vision</a>
          </nav>
          <a
            className="mast-argus"
            href={LINKS.argus}
            target="_blank"
            rel="noreferrer noopener"
          >
            Argus Arena
            <ArrowUpRight size={13} aria-hidden />
          </a>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="shell">
            <div className="hero-date">
              <span>Open-source studio</span>
              <span className="hero-date-mid">Source · Community · Long run</span>
              <UtcClock />
            </div>

            <div className="hero-lockup">
              <span className="hero-brace" aria-hidden>
                {'{'}
              </span>
              <h1>
                Open by default.
                <br />
                <em>
                  Made for the
                  <br className="hero-break" /> long run.
                </em>
              </h1>
              <span className="hero-brace" aria-hidden>
                {'}'}
              </span>
            </div>

            <div className="hero-foot">
              <p className="hero-lede">
                Binchitects is an open-source studio. We build software people can own, read and
                carry forward — in public, with the people who use it.
              </p>
              <div className="hero-actions">
                <a className="button button-solid" href={LINKS.argus} target="_blank" rel="noreferrer noopener">
                  Argus Arena
                  <ArrowUpRight size={15} aria-hidden />
                </a>
                <a className="button button-line" href={LINKS.org} target="_blank" rel="noreferrer noopener">
                  GitHub
                  <ArrowUpRight size={15} aria-hidden />
                </a>
              </div>
            </div>

            <div className="hero-rule">
              <span>Argus is AGPL-3.0-only</span>
              <span>No black boxes</span>
              <span className="hero-rule-end">Scroll</span>
            </div>
          </div>
        </section>

        <section className="chapter work" id="work">
          <div className="shell">
            <div className="chapter-top">
              <span>01 / The work</span>
              <span>Argus Arena · V7.7.0</span>
            </div>

            <div className="work-grid">
              <div className="work-copy">
                <h2>
                  Argus Arena<span className="work-dot">.</span>
                </h2>
                <p className="lede">
                  Private AI on hardware you control: chat, Code Arena, a code index, and the
                  evidence an auditor asks for.
                </p>
                <p>
                  Self-hosted, AGPL-3.0-only, and developed in the open. The repository is the
                  product page: the source, the issues, the releases and the roadmap are all there.
                </p>
                <a className="text-link" href={LINKS.argus} target="_blank" rel="noreferrer noopener">
                  Visit argus.binchitects.com
                  <ArrowUpRight size={15} aria-hidden />
                </a>
              </div>

              <div className="work-plate">
                <ArgusGlyph className="argus-glyph" />
                <p className="work-plate-note">
                  One platform for the whole team, on your GPUs, inside your network.
                </p>
              </div>
            </div>

            <ul className="spec-row">
              <li>Self-hosted AI</li>
              <li>Code Arena</li>
              <li>Code index</li>
              <li>AGPL-3.0-only</li>
            </ul>
          </div>
        </section>

        <section className="chapter community" id="community">
          <div className="shell">
            <div className="chapter-top">
              <span>02 / The community</span>
              <span>Open to anyone</span>
            </div>

            <div className="community-head">
              <h2>The door is open.</h2>
              <p className="lede">
                Open source is not a licence line at the bottom of a page. It is the way the work
                gets made: in public, with anyone who shows up. There is no application and no
                waiting list.
              </p>
            </div>

            <div className="ways">
              {WAYS.map((way) => (
                <a
                  key={way.number}
                  className="way"
                  href={way.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
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

            <p className="community-note">
              Start with a question. Read a file, run the tests, tell us what is missing.
            </p>
          </div>
        </section>

        <section className="chapter vision" id="vision">
          <div className="shell">
            <div className="chapter-top">
              <span>03 / The long run</span>
              <span>Built for the decade</span>
            </div>

            <div className="vision-grid">
              <h2>
                Build for the decade,
                <br />
                not the demo.
              </h2>
              <div className="vision-copy">
                <p className="lede">
                  Local models, open protocols, and software that can still be read and run long
                  after the vendor disappears. That is the future we are working toward — not a
                  locked box with a monthly fee.
                </p>
                <p>
                  We choose the boring, durable parts: files you can inspect, standards anyone can
                  implement, and a licence that keeps the work available.
                </p>
              </div>
            </div>

            <ul className="principles">
              {PRINCIPLES.map((principle, index) => (
                <li key={principle}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {principle}
                </li>
              ))}
            </ul>

            <Horizon />
          </div>
        </section>

        <section className="cta">
          <div className="shell">
            <div className="chapter-top">
              <span>Next / Build with us</span>
              <span>No application</span>
            </div>
            <h2>
              The future is open.
              <br />
              Come build it.
            </h2>
            <div className="cta-actions">
              <a className="button button-ink" href={LINKS.org} target="_blank" rel="noreferrer noopener">
                GitHub
                <ArrowUpRight size={15} aria-hidden />
              </a>
              <a className="button button-ink-line" href={LINKS.argus} target="_blank" rel="noreferrer noopener">
                Argus Arena
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
              <p>Open-source studio. Built in public.</p>
            </div>

            <nav className="footer-cols" aria-label="Footer">
              <div>
                <h2>The work</h2>
                <a href={LINKS.argus} target="_blank" rel="noreferrer noopener">
                  Argus Arena ↗
                </a>
                <a href={LINKS.repo} target="_blank" rel="noreferrer noopener">
                  Source ↗
                </a>
                <a href={LINKS.releases} target="_blank" rel="noreferrer noopener">
                  Releases ↗
                </a>
              </div>
              <div>
                <h2>The community</h2>
                <a href={LINKS.issues} target="_blank" rel="noreferrer noopener">
                  Issues ↗
                </a>
                <a href={LINKS.contributing} target="_blank" rel="noreferrer noopener">
                  Contributing ↗
                </a>
                <a href={LINKS.org} target="_blank" rel="noreferrer noopener">
                  GitHub ↗
                </a>
              </div>
            </nav>
          </div>

          <div className="footer-base">
            <span>© {new Date().getFullYear()} Binchitects</span>
            <span>Argus is AGPL-3.0-only</span>
            <span>Set in Archivo and IBM Plex</span>
            <UtcClock />
          </div>
        </div>
      </footer>
    </>
  )
}
