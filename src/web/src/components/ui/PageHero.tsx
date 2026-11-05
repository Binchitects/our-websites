import { ArrowRight, ArrowUpRight, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'

export type HeroAction = {
  label: string
  href: string
  external?: boolean
  primary?: boolean
  icon?: LucideIcon
}

/** The one hero used by the inner pages, so their rhythm matches the home page. */
export function PageHero({
  eyebrow,
  title,
  lead,
  actions,
  aside,
  meta,
  className,
}: {
  eyebrow: string
  title: ReactNode
  lead: ReactNode
  actions?: HeroAction[]
  aside?: ReactNode
  meta?: ReactNode
  className?: string
}) {
  return (
    <section className={cn('relative overflow-hidden border-b border-line', className)}>
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(46,200,255,0.16),transparent)] blur-2xl"
        aria-hidden
      />
      <div className="shell relative grid gap-12 py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:py-24">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display-1 mt-6 max-w-[16ch] text-[clamp(2.6rem,5.5vw,4.4rem)]">{title}</h1>
          <p className="lead mt-7 max-w-[54ch]">{lead}</p>
          {actions && actions.length > 0 && (
            <div className="mt-9 flex flex-wrap items-center gap-3">
              {actions.map((action) => {
                const Icon = action.icon ?? (action.external ? ArrowUpRight : ArrowRight)
                const classes = cn('btn', action.primary ? 'btn-primary' : 'btn-ghost')
                const content = (
                  <>
                    {action.label}
                    <Icon size={15} aria-hidden />
                  </>
                )
                return action.external ? (
                  <a key={action.label} href={action.href} target="_blank" rel="noreferrer noopener" className={classes}>
                    {content}
                  </a>
                ) : (
                  <Link key={action.label} to={action.href} className={classes}>
                    {content}
                  </Link>
                )
              })}
            </div>
          )}
          {meta && <div className="mt-9">{meta}</div>}
        </Reveal>

        {aside && <Reveal delay={120} className="min-w-0">{aside}</Reveal>}
      </div>

    </section>
  )
}
