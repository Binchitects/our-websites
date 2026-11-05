import { ArrowUpRight } from 'lucide-react'
import { Link } from '@/components/ui/LocalLink'

import type { ReactNode } from 'react'

export type IndexItem = {
  title: string
  desc: ReactNode
  tag?: string
  href?: string
  external?: boolean
}

/**
 * The site's replacement for a card grid: a numbered index, set like the
 * contents page of a report. Rows invert to ink on hover.
 */
export function IndexList({ items }: { items: IndexItem[] }) {
  return (
    <ul className="index-list">
      {items.map((item, index) => {
        const content = (
          <>
            <span className="index-num">{String(index + 1).padStart(2, '0')}</span>
            <span className="index-title">{item.title}</span>
            <span className="index-desc">{item.desc}</span>
            {item.tag && <span className="index-tag">{item.tag}</span>}
            {item.href ? (
              <ArrowUpRight size={14} className="index-arrow" aria-hidden />
            ) : (
              <span className="index-arrow" aria-hidden />
            )}
          </>
        )
        return (
          <li key={item.title} className="index-item">
            {!item.href ? (
              <div className="index-link index-static">{content}</div>
            ) : item.external ? (
              <a href={item.href} target="_blank" rel="noreferrer noopener" className="index-link">
                {content}
              </a>
            ) : (
              <Link to={item.href} className="index-link">
                {content}
              </Link>
            )}
          </li>
        )
      })}
    </ul>
  )
}
