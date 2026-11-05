import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SITE } from '@/lib/content'

const community = [
  'Run it for your team, at no cost',
  'Read, study, change and share the source',
  'Every feature in this site, with no seat count',
  'Community support through the repository',
]

const commercial = [
  'A hosted, managed or embedded offering',
  'Closed-source distribution or an appliance',
  'Private modifications used over a network',
  'Warranty, support and the names and logos',
]

export function EditionsSection() {
  return (
    <section className="section border-t border-line" id="editions">
      <div className="shell">
        <SectionHeading
          eyebrow="Licensing"
          title="Free to run. Commercial when the AGPL does not fit."
          lead="Argus Arena is dual-licensed. You can use it under the AGPL-3.0-only — or take a commercial licence that replaces its obligations with the terms we agree, for example when you offer it to others as a service."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="card h-full !p-7">
              <div className="flex items-center justify-between gap-3">
                <span className="mono text-[10px] tracking-[0.16em] text-faint uppercase">
                  Community
                </span>
                <span className="tag tag-accent">AGPL-3.0-only</span>
              </div>
              <h3 className="display-3 mt-5">Run it, change it, share it.</h3>
              <p className="body-copy mt-3 text-[13.5px]">
                For teams that run the stack for themselves and can meet the AGPL&apos;s conditions.
                The whole product, the whole source, no seat count.
              </p>
              <ul className="mt-6 space-y-2.5">
                {community.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[13px] text-muted">
                    <Check size={14} className="mt-0.5 flex-none text-success" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap gap-3 pt-7">
                <a href={SITE.licensing} target="_blank" rel="noreferrer noopener" className="btn btn-ghost btn-sm">
                  Read the licence
                  <ArrowUpRight size={13} aria-hidden />
                </a>
                <a href={SITE.github} target="_blank" rel="noreferrer noopener" className="btn btn-ghost btn-sm">
                  Source
                  <ArrowUpRight size={13} aria-hidden />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="card relative h-full overflow-hidden !p-7">
              <div
                className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(46,200,255,0.2),transparent)]"
                aria-hidden
              />
              <div className="flex items-center justify-between gap-3">
                <span className="mono text-[10px] tracking-[0.16em] text-faint uppercase">
                  Commercial
                </span>
                <span className="tag">Written licence</span>
              </div>
              <h3 className="display-3 mt-5">For the uses the AGPL does not fit.</h3>
              <p className="body-copy mt-3 text-[13.5px]">
                For a hosted service, an appliance, closed distribution, or private changes used by
                others over a network. Replaces the AGPL obligations with agreed terms.
              </p>
              <ul className="mt-6 space-y-2.5">
                {commercial.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[13px] text-muted">
                    <Check size={14} className="mt-0.5 flex-none text-success" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap gap-3 pt-7">
                <Link to="/contact?topic=license" className="btn btn-primary btn-sm">
                  Ask about a licence
                  <ArrowRight size={13} aria-hidden />
                </Link>
                <a
                  href={SITE.licensing}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mono inline-flex items-center gap-1.5 px-1 text-[10px] tracking-[0.08em] text-faint uppercase hover:text-ink"
                >
                  When one is required
                  <ArrowUpRight size={11} aria-hidden />
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mono mt-5 text-[10px] leading-relaxed text-faint">
          This page explains the licensing; it is not legal advice. LICENSING.md in the repository
          is the reference, and the names Argus Arena, Argus and Code Arena are trademarks of
          Binchitects.
        </Reveal>
      </div>
    </section>
  )
}
