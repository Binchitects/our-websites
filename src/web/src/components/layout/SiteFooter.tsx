import { Link } from '@/components/ui/LocalLink'
import { LangSwitch } from '@/components/ui/LangSwitch'
import { Logo } from '@/components/Logo'
import { Spectrum } from '@/components/ui/Spectrum'
import { FOOTER_COLUMNS, SITE } from '@/lib/site'
import { useLang } from '@/lib/i18n'

/** The colophon: where the report ends, and what it was set in. */
export function SiteFooter() {
  const lang = useLang()
  const fa = lang === 'fa'

  return (
    <footer className="footer">
      <div className="shell">
        <Spectrum className="footer-spectrum" />
        <div className="footer-grid">
          <div>
            <Logo />
            <p className="footer-about">
              {fa ? (
                <>
                  <strong>یک پروژهٔ Binchitects.</strong> پلتفرم هوش مصنوعی خودمیزبان برای تیم‌هایی
                  که نمی‌توانند کارشان را به ابر کس دیگری بسپارند. چت، Code Arena، نمایهٔ کد،
                  استودیو، جلسه‌ها، عامل‌ها و شواهدی که ممیز می‌خواهد.
                </>
              ) : (
                <>
                  <strong>A Binchitects project.</strong> The self-hosted AI platform for teams that
                  cannot send their work to someone else&rsquo;s cloud. Chat, Code Arena, the code index,
                  studio, meetings, agents and the evidence an auditor asks for.
                </>
              )}
            </p>
            <p className="dateline" style={{ marginTop: '18px' }}>
              <span className="dateline-strong">v{SITE.version}</span>
              <span className="dot-sep">/</span>
              <span>AGPL-3.0-only</span>
            </p>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h3>{fa ? (column.titleFa ?? column.title) : column.title}</h3>
              <ul>
                {column.links.map((link) => {
                  const label = fa ? link.labelFa : link.label
                  return (
                    <li key={link.label}>
                      {'external' in link && link.external ? (
                        <a href={link.href} target="_blank" rel="noreferrer noopener">
                          {label} ↗
                        </a>
                      ) : (
                        <Link to={link.href}>{label}</Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-colophon">
          <span>© {new Date().getFullYear()} Binchitects {fa ? 'و مشارکت‌کنندگان' : 'and contributors'}</span>
          <span>{fa ? 'با Archivo و IBM Plex و وزیرمتن' : 'Set in Archivo, IBM Plex and Vazirmatn'}</span>
          <span>{fa ? 'ساخته‌شده به‌صورت ایمیج‌های .NET 10 و React' : 'Built as .NET 10 and React images'}</span>
          <span>
            {fa ? 'متن‌باز از ' : 'Open source by '}
            <a href={SITE.org} target="_blank" rel="noreferrer noopener">
              Binchitects
            </a>
          </span>
          <span>
            <a href={SITE.github} target="_blank" rel="noreferrer noopener">
              {fa ? 'کد منبع ↗' : 'Source ↗'}
            </a>
          </span>
          <LangSwitch className="footer-lang" />
        </div>

        <p className="footer-word" aria-hidden>
          Argus Arena<span className="period">.</span>
        </p>
      </div>
    </footer>
  )
}
