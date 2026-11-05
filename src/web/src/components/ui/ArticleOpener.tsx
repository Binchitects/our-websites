import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { SITE } from '@/lib/content'

export type OpenerAction = {
  label: string
  href: string
  external?: boolean
  solid?: boolean
}

/** The opening spread of an inner page: dateline, claim, standfirst, and a plate or note. */
export function ArticleOpener({
  section,
  title,
  standfirst,
  actions,
  aside,
  meta,
}: {
  section: string
  title: ReactNode
  standfirst: ReactNode
  actions?: OpenerAction[]
  aside?: ReactNode
  meta?: ReactNode
}) {
  return (
    <section className="opener">
      <div className="shell">
        <div className="dateline opener-dateline">
          <span className="dateline-strong">{section}</span>
          <span className="dot-sep">/</span>
          <span>Argus Arena</span>
          <span className="dot-sep">/</span>
          <span className="dateline-hide">Binchitects</span>
          <span className="push">v{SITE.version}</span>
        </div>

        <div className="opener-grid">
          <div>
            <h1>{title}</h1>
            <p className="opener-standfirst">{standfirst}</p>
            {actions && actions.length > 0 && (
              <div className="opener-actions">
                {actions.map((action) => {
                  const className = action.solid ? 'btn btn-solid' : 'btn btn-outline'
                  const icon = action.external ? (
                    <ArrowUpRight size={14} aria-hidden />
                  ) : (
                    <ArrowRight size={14} aria-hidden />
                  )
                  return action.external ? (
                    <a
                      key={action.label}
                      href={action.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={className}
                    >
                      {action.label}
                      {icon}
                    </a>
                  ) : (
                    <Link key={action.label} to={action.href} className={className}>
                      {action.label}
                      {icon}
                    </Link>
                  )
                })}
              </div>
            )}
            {meta && <div className="opener-meta">{meta}</div>}
          </div>

          {aside && <aside className="opener-aside">{aside}</aside>}
        </div>
      </div>
    </section>
  )
}
