import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Orb } from '@/components/ui/Orb'
import { Reveal } from '@/components/ui/Reveal'
import { SITE } from '@/lib/content'

/** The closing invitation, used at the foot of every page. */
export function CtaBand({
  title = 'Bring your AI home.',
  lead = 'Run the chat, the coding agent and the code index on hardware you already own. We will help you choose the right licence and the right shape of deployment.',
}: {
  title?: string
  lead?: string
}) {
  return (
    <section className="section-tight">
      <div className="shell">
        <Reveal>
          <div className="panel relative overflow-hidden px-6 py-12 sm:px-12 lg:py-16">
            <div className="hero-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
            <div
              className="pointer-events-none absolute -right-20 -bottom-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(46,200,255,0.18),transparent)] blur-xl"
              aria-hidden
            />
            <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
              <div>
                <p className="eyebrow">Next step</p>
                <h2 className="display-2 mt-5 max-w-[16ch]">{title}</h2>
                <p className="lead mt-5 max-w-[54ch]">{lead}</p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link to="/contact" className="btn btn-primary">
                    Talk to us
                    <ArrowRight size={15} aria-hidden />
                  </Link>
                  <a
                    href={SITE.quickStart}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="btn btn-ghost"
                  >
                    Start from GitHub
                    <ArrowUpRight size={15} aria-hidden />
                  </a>
                </div>
                <p className="mono mt-6 text-[10px] tracking-[0.12em] text-faint uppercase">
                  AGPL-3.0-only · commercial licence available · no vendor cloud
                </p>
              </div>
              <div className="hidden justify-self-center lg:block">
                <Orb compact />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
