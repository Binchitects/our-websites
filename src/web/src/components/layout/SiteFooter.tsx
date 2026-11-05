import { Link } from 'react-router-dom'
import { ArrowUpRight, Github } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { FOOTER_COLUMNS, SITE } from '@/lib/content'

export function SiteFooter() {
  return (
    <footer className="relative border-t border-line">
      <div className="shell py-16">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_2fr]">
          <div>
            <Logo />
            <p className="body-copy mt-5 max-w-xs text-[13.5px]">
              The self-hosted AI platform for teams that cannot send their work to someone else&apos;s
              cloud. Chat, Code Arena, a code index, studio, meetings, agents and the evidence an
              auditor asks for.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="tag tag-accent">
                <span className="dot" aria-hidden />
                v{SITE.version}
              </span>
              <a href={SITE.github} target="_blank" rel="noreferrer noopener" className="tag hover:text-ink">
                <Github size={12} aria-hidden />
                Binchitects/argus
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <h3 className="mono text-[10px] font-medium tracking-[0.18em] text-faint uppercase">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {'external' in link && link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex items-center gap-1 text-[13px] text-muted transition-colors hover:text-ink"
                        >
                          {link.label}
                          <ArrowUpRight size={11} className="opacity-50" aria-hidden />
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="text-[13px] text-muted transition-colors hover:text-ink"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <hr className="hairline my-10" />

        <div className="flex flex-col gap-4 text-[12px] text-faint md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Binchitects and contributors. Argus Arena is dual-licensed
            under the{' '}
            <a
              href="https://www.gnu.org/licenses/agpl-3.0.html"
              target="_blank"
              rel="noreferrer noopener"
              className="text-muted underline decoration-line-strong underline-offset-2 hover:text-ink"
            >
              GNU AGPL v3
            </a>{' '}
            or a{' '}
            <Link to="/contact?topic=license" className="text-muted underline decoration-line-strong underline-offset-2 hover:text-ink">
              commercial licence
            </Link>
            . Names and logos are trademarks of Binchitects.
          </p>
          <p className="mono flex items-center gap-3 text-[10px] tracking-[0.08em]">
            <span className="whitespace-nowrap">Built with .NET 10 + React</span>
            <span aria-hidden className="h-3 w-px bg-line" />
            <a
              href={SITE.github}
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-ink"
            >
              Source
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
