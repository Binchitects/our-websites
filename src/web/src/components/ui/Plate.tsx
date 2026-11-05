import type { ReactNode } from 'react'

/** A figure with a frame and a caption, as it would appear in a printed report. */
export function Plate({
  figure,
  caption,
  children,
  className,
}: {
  figure: string
  caption: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <figure className={['plate', className].filter(Boolean).join(' ')}>
      <div className="plate-frame">{children}</div>
      <figcaption className="plate-caption">
        <span className="tag">{figure}</span>
        <span>{caption}</span>
      </figcaption>
    </figure>
  )
}
