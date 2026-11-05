import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ARGUS_EVIDENCE, ARGUS_TOOLS } from '@/lib/content'

/** Argus is the reason a local model stops guessing: it is handed the facts, verbatim. */
export function ArgusSpotlight() {
  const marquee = [...ARGUS_TOOLS, ...ARGUS_TOOLS]

  return (
    <section className="section relative overflow-hidden">
      <div
        className="pointer-events-none absolute top-1/3 -left-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(28,134,240,0.13),transparent)] blur-2xl"
        aria-hidden
      />
      <div className="shell relative">
        <SectionHeading
          eyebrow="Argus, your code’s index"
          title={
            <>
              It quotes the code.
              <br />
              <span className="gradient-text">It doesn’t paraphrase it.</span>
            </>
          }
          lead="A local model is good at reasoning and bad at recall. Header names, import libraries, error codes and flags are exactly the facts a model states confidently and gets wrong. Argus puts those facts in front of the model at answer time, copied rather than reworded."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {ARGUS_EVIDENCE.map((item, index) => (
            <Reveal key={item.label} delay={index * 80}>
              <div className="panel h-full p-6">
                <p className="mono text-[38px] leading-none tracking-[-0.03em] text-ink">
                  {item.value}
                </p>
                <p className="mt-3 text-[13.5px] font-medium text-ink">{item.label}</p>
                <p className="mt-2 text-[12.5px] leading-[1.65] text-muted">{item.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mono mt-5 text-[10px] leading-relaxed tracking-[0.04em] text-faint">
          Argus&apos;s own measurements, in its server instructions: across five real driver files,
          eighteen contract claims. The point is not that the model is bad. It is that the index can
          be right.
        </Reveal>

        <Reveal delay={80} className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Thirty-four tools over MCP</p>
              <p className="body-copy mt-3 max-w-[52ch] text-[13.5px]">
                Symbols, references, merge requests, CI logs, issues, wikis, documentation packs.
                Every call is scoped to what the caller&apos;s own GitLab account can read.
              </p>
            </div>
            <Link to="/argus" className="link-arrow">
              The index in detail
              <ArrowRight size={14} aria-hidden />
            </Link>
          </div>

          <div className="marquee mt-6" aria-hidden>
            <div className="marquee-track">
              {marquee.map((tool, index) => (
                <span key={`${tool}-${index}`} className="tag whitespace-nowrap">
                  {tool}
                </span>
              ))}
            </div>
          </div>
          <p className="sr-only">
            Tools include find_symbol, find_references, search_code, semantic_search, repo_map,
            dependency_path, change_impact, docs_lookup, docs_verify, mr_diff, ci_status, issue_get
            and wiki_get.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
