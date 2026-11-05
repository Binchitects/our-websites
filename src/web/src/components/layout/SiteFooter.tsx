import { Link } from 'react-router-dom'
import { Logo } from '@/components/Logo'
import { FOOTER_COLUMNS, SITE } from '@/lib/content'

/** The colophon: where the report ends, and what it was set in. */
export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-grid">
          <div>
            <Logo />
            <p className="footer-about">
              The self-hosted AI platform for teams that cannot send their work to someone else&rsquo;s
              cloud. Chat, Code Arena, the code index, studio, meetings, agents and the evidence an
              auditor asks for.
            </p>
            <p className="dateline" style={{ marginTop: '18px' }}>
              <span className="dateline-strong">v{SITE.version}</span>
              <span className="dot-sep">/</span>
              <span>AGPL-3.0-only</span>
            </p>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h3>{column.title}</h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    {'external' in link && link.external ? (
                      <a href={link.href} target="_blank" rel="noreferrer noopener">
                        {link.label} ↗
                      </a>
                    ) : (
                      <Link to={link.href}>{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-colophon">
          <span>© {new Date().getFullYear()} Binchitects and contributors</span>
          <span>Set in Newsreader and IBM Plex</span>
          <span>Built as .NET 10 and React images</span>
          <span>
            <a href={SITE.github} target="_blank" rel="noreferrer noopener">
              Source ↗
            </a>
          </span>
        </div>

        <p className="footer-word" aria-hidden>
          Argus Arena<span className="period">.</span>
        </p>
      </div>
    </footer>
  )
}
