import type { ReactNode } from 'react'

/**
 * One numbered chapter of the report, with its number and label held in the
 * margin and a rule across the page.
 */
export function Chapter({
  number,
  label,
  id,
  children,
  className,
}: {
  number: string
  label: string
  id?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={['chapter', className].filter(Boolean).join(' ')}>
      <div className="shell chapter-grid">
        <div className="chapter-rail" aria-hidden>
          <span className="chapter-num">{number}</span>
          <span className="chapter-label">{label}</span>
        </div>
        <div className="chapter-body">{children}</div>
      </div>
    </section>
  )
}

export function ChapterHead({
  title,
  standfirst,
  action,
}: {
  title: ReactNode
  standfirst: ReactNode
  action?: ReactNode
}) {
  return (
    <header className="chapter-head">
      <h2>{title}</h2>
      <div className="chapter-standfirst">
        <p>{standfirst}</p>
        {action && <div className="mt-s">{action}</div>}
      </div>
    </header>
  )
}
