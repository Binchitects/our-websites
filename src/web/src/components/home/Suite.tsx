import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { HOME_FEATURES } from '@/lib/content'
import { cn } from '@/lib/cn'

/** The bento: what is in the stack, weighted by where a visitor's attention should go first. */
export function Suite() {
  return (
    <section className="section" id="suite">
      <div className="shell">
        <SectionHeading
          eyebrow="What is inside"
          title="One platform, not five subscriptions."
          lead="Most teams end up with a chat subscription, a coding assistant, an image tool, a meeting bot and a few scripts in between — each another account, another bill, another place the work goes. ARGUS is all of it in one stack you run yourself."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HOME_FEATURES.map((feature, index) => {
            const Icon = feature.icon
            const wide = index === 0
            return (
              <Reveal
                key={feature.title}
                delay={Math.min(index * 55, 240)}
                className={cn(wide && 'sm:col-span-2')}
              >
                <Link
                  to={feature.href ?? '/platform'}
                  className="card group h-full"
                  aria-label={`${feature.title} — learn more`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="icon-tile">
                      <Icon size={19} strokeWidth={1.6} aria-hidden />
                    </span>
                    {feature.tag && (
                      <span className="mono text-[9.5px] tracking-[0.14em] text-faint uppercase">
                        {feature.tag}
                      </span>
                    )}
                  </div>
                  <h3 className={cn('mt-6 text-[17px] font-[580] tracking-[-0.02em]', wide && 'sm:text-[19px]')}>
                    {feature.title}
                  </h3>
                  <p className="mt-2.5 text-[13.5px] leading-[1.65] text-muted">{feature.body}</p>
                  <span className="mono mt-5 inline-flex items-center gap-1.5 text-[10px] tracking-[0.1em] text-accent uppercase opacity-0 transition-opacity group-hover:opacity-100">
                    Read more <ArrowRight size={11} aria-hidden />
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mt-8">
          <Link to="/platform" className="link-arrow">
            Everything in the platform
            <ArrowRight size={14} aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
