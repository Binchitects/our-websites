import type { ReactNode } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'

/** The editorial heading used by every section: a mono label, a claim, and the detail. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'split',
  className,
  children,
}: {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  align?: 'split' | 'center'
  className?: string
  children?: ReactNode
}) {
  if (align === 'center') {
    return (
      <Reveal className={cn('mx-auto max-w-3xl text-center', className)}>
        <p className="eyebrow eyebrow-plain justify-center">{eyebrow}</p>
        <h2 className="display-2 mt-5">{title}</h2>
        {lead && <p className="lead mx-auto mt-5 max-w-2xl">{lead}</p>}
        {children}
      </Reveal>
    )
  }

  return (
    <Reveal className={className}>
      <div className="grid gap-7 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="display-2 mt-5 max-w-[19ch]">{title}</h2>
        </div>
        <div className="lg:justify-self-end">
          {lead && <p className="lead max-w-[46ch]">{lead}</p>}
          {children}
        </div>
      </div>
    </Reveal>
  )
}
