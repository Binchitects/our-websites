import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ArchitectureDiagram } from '@/components/product/ArchitectureDiagram'
import { CtaBand } from '@/components/ui/CtaBand'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ENGINES, PLATFORM_GROUPS, SITE } from '@/lib/content'
import { useSeo } from '@/lib/seo'
import { cn } from '@/lib/cn'
import { routeMeta } from '@/lib/route-meta'

const stack = [
  'Chat with thinking levels and files',
  'Code Arena agent and browser IDE',
  'Argus code index over MCP',
  'Studio for pictures, voices and 3D',
  'Meetings with minutes and actions',
  'Agents and apps built in Studio',
  'Memory shared by chat and code',
  'Security reviews with fixes',
  'GRC across fourteen frameworks',
  'SSO, LDAP, 2FA and per-person keys',
]

export function Platform() {
  useSeo({ ...routeMeta('/platform'), path: '/platform' })

  return (
    <>
      <PageHero
        eyebrow="The platform"
        title={
          <>
            Everything the work needs.
            <br />
            <span className="gradient-text">Nothing that leaves.</span>
          </>
        }
        lead="A chat that does real work, a coding agent with its own IDE, a studio, meetings, agents and a code index — sharing one sign-in, one memory, one set of rights and one budget for each person."
        actions={[
          { label: 'Read the docs', href: SITE.docs, external: true, primary: true },
          { label: 'See Code Arena', href: '/code-arena' },
        ]}
        aside={
          <div className="panel overflow-hidden">
            <div className="border-b border-line px-5 py-4">
              <p className="mono text-[10px] tracking-[0.16em] text-accent uppercase">
                Arena · one sign-in
              </p>
            </div>
            <ul className="divide-y divide-line">
              {stack.map((item) => (
                <li key={item} className="flex items-center gap-3 px-5 py-2.5 text-[12.5px] text-muted">
                  <Check size={12} className="flex-none text-success" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-1.5 border-t border-line bg-surface/50 px-4 py-3">
              {ENGINES.slice(0, 3).map((engine) => (
                <span key={engine} className="tag">
                  {engine}
                </span>
              ))}
              <span className="tag text-faint">your GPUs</span>
            </div>
          </div>
        }
      />

      {PLATFORM_GROUPS.map((group, groupIndex) => (
        <section
          key={group.eyebrow}
          className={cn('section', groupIndex > 0 && 'border-t border-line')}
        >
          <div className="shell">
            <SectionHeading eyebrow={group.eyebrow} title={group.title} lead={group.body} />

            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {group.features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Reveal key={feature.title} delay={Math.min(index * 60, 240)}>
                    <article className="card h-full">
                      <div className="flex items-start justify-between gap-3">
                        <span className="icon-tile">
                          <Icon size={18} strokeWidth={1.6} aria-hidden />
                        </span>
                        {feature.tag && (
                          <span className="mono text-[9.5px] tracking-[0.14em] text-faint uppercase">
                            {feature.tag}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-5 text-[15.5px] font-[580] tracking-[-0.015em]">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-[13px] leading-[1.67] text-muted">{feature.body}</p>
                    </article>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>
      ))}

      <section className="section border-t border-line">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
            <Reveal>
              <p className="eyebrow">Under the hood</p>
              <h2 className="display-2 mt-5 max-w-[16ch]">A stack you can explain to an auditor.</h2>
              <p className="lead mt-5">
                A .NET 10 app and API with a React web app, behind Traefik. The API keeps the ledger,
                the keys, the rights and the audit log. Your GPUs run llama.cpp, vLLM or SGLang
                through a gateway. Argus mirrors GitLab with a read-only token.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {ENGINES.map((engine) => (
                  <span key={engine} className="tag">
                    {engine}
                  </span>
                ))}
              </div>
              <a
                href={SITE.architecture}
                target="_blank"
                rel="noreferrer noopener"
                className="link-arrow mt-7"
              >
                Read the architecture
                <ArrowRight size={14} aria-hidden />
              </a>
            </Reveal>
            <Reveal delay={120}>
              <ArchitectureDiagram />
            </Reveal>
          </div>

          <Reveal className="mt-12">
            <div className="panel flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="mono text-[10px] tracking-[0.16em] text-accent uppercase">
                  On your hardware
                </p>
                <p className="mt-2 text-[15px] font-[560]">
                  Any open model. Your GPU, your engine, your choice of licence.
                </p>
                <p className="mt-1 text-[13px] text-muted">
                  llama.cpp takes GGUF, vLLM and SGLang take their own formats. Model cards and
                  licences are shown before any download.
                </p>
              </div>
              <Link to="/contact" className="btn btn-primary btn-sm shrink-0">
                Plan a deployment
                <ArrowRight size={13} aria-hidden />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="A platform, not a purchase order."
        lead="Tell us what you run today — the models, the GitLab, the sign-in you already have — and we will map the deployment, the licence and the first week."
      />
    </>
  )
}
