import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Database,
  FileSearch,
  GitMerge,
  Layers,
  Lock,
  ScanEye,
  SearchCode,
  ShieldCheck,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { CtaBand } from '@/components/ui/CtaBand'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ARGUS_EVIDENCE, ARGUS_TOOLS, SITE } from '@/lib/content'
import { useSeo } from '@/lib/seo'
import { routeMeta } from '@/lib/route-meta'

const serves = [
  {
    icon: SearchCode,
    title: 'Your code',
    body: 'Symbols, references, file contents, and the graph of what each repository uses of the others: packages, imports, #includes, submodules, CI includes and images.',
    tools: 'find_symbol · find_references · search_code · semantic_search · repo_map · system_map · dependency_path · change_impact · which_repo · impact_of · code_contracts',
  },
  {
    icon: BookOpen,
    title: 'Documentation packs',
    body: 'Self-contained archives of public reference material: Windows SDK and WDK, MSVC C++, cppreference, Qt 4 to 6, .NET, Python, PowerShell, shell tooling, algorithms and system design.',
    tools: 'docs_lookup · docs_find · docs_search · docs_get · docs_verify',
  },
  {
    icon: GitMerge,
    title: 'Merge requests and code at any commit',
    body: 'Read GitLab read-only for any project the caller is a member of, indexed or not: diffs, commits, discussions, pipeline status, job logs, and files at any ref.',
    tools: 'mr_list · mr_get · mr_diff · mr_commits · mr_discussions · ci_status · job_log · compare_refs · file_at · grep_at',
  },
  {
    icon: Layers,
    title: 'Issues and the wiki',
    body: 'Read what people asked for, reported and wrote down about the business — the same read-only access and the same per-person check as everything else.',
    tools: 'issue_list · issue_get · wiki_list · wiki_get',
  },
]

const keyTools = [
  ['find_symbol', 'Find a symbol by name, across every repository you may read.'],
  ['find_references', 'Who calls it, includes it or subclasses it.'],
  ['semantic_search', 'Find code by what it does, with embeddings on the CPU.'],
  ['repo_map', 'A repository at a glance: its shape, packages and entry points.'],
  ['dependency_path', 'How one part of the system reaches another.'],
  ['change_impact', 'What a change to this symbol would touch.'],
  ['docs_lookup', 'You know the API name.'],
  ['docs_find', 'You know only the behaviour.'],
  ['docs_verify', 'Check a draft against the reference before you ship it.'],
  ['mr_diff', 'The change, as GitLab has it, for any project you belong to.'],
  ['job_log', 'Why the pipeline failed, from the log.'],
  ['wiki_get', 'The page someone wrote down, not the model’s memory of it.'],
]

const keptCurrent = [
  {
    title: 'Mirrors, it does not write',
    body: 'A read-only GitLab token, and a mirror kept current. Argus never writes to your repositories, and the token can do nothing else.',
  },
  {
    title: 'More than one branch',
    body: 'Index the branches you care about, and read code at any commit with file_at, grep_at and compare_refs.',
  },
  {
    title: 'Embeddings where you want them',
    body: 'nomic-embed-text-v1.5 on the CPU through llama.cpp, or the optional Postgres and pgvector backend for scale.',
  },
  {
    title: 'Backups that restore',
    body: 'What is worth keeping, and how to get it back, is written down — indexes included, so a rebuild is not the plan.',
  },
]

export function ArgusPage() {
  useSeo({ ...routeMeta('/argus'), path: '/argus' })

  return (
    <>
      <PageHero
        eyebrow="Argus, the code index"
        title={
          <>
            The index that answers
            <br />
            <span className="gradient-text">with the line.</span>
          </>
        }
        lead="Argus mirrors your repositories and serves them to an agent over MCP: symbols, references, merge requests, CI logs, issues, wikis and documentation packs. The model is handed the facts, verbatim, scoped to the person asking."
        actions={[
          { label: 'Read the manual', href: SITE.argusDocs, external: true, primary: true },
          { label: 'See the tools', href: '#tools' },
        ]}
        aside={
          <div className="grid gap-3">
            {ARGUS_EVIDENCE.map((item) => (
              <div key={item.label} className="panel flex items-baseline gap-4 p-5">
                <span className="mono w-[92px] flex-none text-[23px] leading-none tracking-[-0.03em] whitespace-nowrap text-ink">
                  {item.value}
                </span>
                <span className="text-[12.5px] leading-snug text-muted">{item.label}</span>
              </div>
            ))}
            <p className="mono px-1 text-[9.5px] leading-relaxed text-faint">
              Measured by Argus itself, across five driver files and eighteen contract claims.
            </p>
          </div>
        }
      />

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="What it serves"
            title="Four kinds of facts a model gets wrong on its own."
            lead="Thirty-four tools, one per question you would otherwise ask a model to remember. Each answer quotes the source, and each result carries its own licence and attribution where the material requires it."
          />

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {serves.map((item, index) => {
              const Icon = item.icon
              return (
                <Reveal key={item.title} delay={index * 70}>
                  <article className="card h-full">
                    <span className="icon-tile">
                      <Icon size={18} strokeWidth={1.6} aria-hidden />
                    </span>
                    <h3 className="mt-5 text-[16px] font-[580]">{item.title}</h3>
                    <p className="mt-2 text-[13px] leading-[1.67] text-muted">{item.body}</p>
                    <p className="mono mt-4 text-[9.5px] leading-relaxed tracking-[0.02em] text-faint">
                      {item.tools}
                    </p>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section border-y border-line bg-[color-mix(in_srgb,var(--color-surface)_45%,transparent)]" id="tools">
        <div className="shell">
          <SectionHeading
            eyebrow="The tools"
            title="An agent with the whole repository, not a prompt of it."
            lead="The names are the contract: an agent asks for a symbol, a reference, a diff or a page, and gets the source back. Nothing in the answer is recalled from training."
          />

          <div className="mt-12 grid gap-x-10 gap-y-2 md:grid-cols-2">
            {keyTools.map(([tool, description], index) => (
              <Reveal key={tool} delay={Math.min(index * 30, 180)}>
                <div className="flex items-baseline gap-4 border-b border-line py-3.5">
                  <code className="mono w-[132px] flex-none text-[11.5px] text-accent">{tool}</code>
                  <span className="text-[12.5px] leading-snug text-muted">{description}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8">
            <p className="mono mb-4 text-[10px] tracking-[0.14em] text-faint uppercase">
              Also in the thirty-four
            </p>
            <div className="flex flex-wrap gap-1.5">
              {ARGUS_TOOLS.filter(
                (tool) => !keyTools.some(([name]) => name === tool),
              ).map((tool) => (
                <span key={tool} className="tag">
                  {tool}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16">
          <Reveal>
            <p className="eyebrow">Access</p>
            <h2 className="display-2 mt-5 max-w-[15ch]">Each person sees exactly what their GitLab allows.</h2>
            <p className="lead mt-5">
              The check is a predicate in SQL on every query, not a sentence in a prompt. A developer
              who cannot open a repository in GitLab cannot retrieve it through Argus — and the
              audit log records the call either way.
            </p>
            <ul className="mt-7 space-y-3 text-[13.5px] leading-relaxed text-muted">
              <li className="flex gap-3">
                <Lock size={15} className="mt-0.5 flex-none text-accent" aria-hidden />
                The read-only token is Argus&apos;s own; each answer is filtered again for the caller.
              </li>
              <li className="flex gap-3">
                <ShieldCheck size={15} className="mt-0.5 flex-none text-accent" aria-hidden />
                Wiki and issue reads use the same check as code, so nothing leaks sideways.
              </li>
              <li className="flex gap-3">
                <ScanEye size={15} className="mt-0.5 flex-none text-accent" aria-hidden />
                A private CA can secure the hop, and Code Arena&apos;s builds are signed by it.
              </li>
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <div className="panel overflow-hidden">
              <div className="border-b border-line px-5 py-3.5">
                <p className="mono text-[9.5px] tracking-[0.14em] text-faint uppercase">
                  How a question is answered
                </p>
              </div>
              <ol className="divide-y divide-line">
                {[
                  ['Ask', 'An agent calls a tool with the person’s own identity.'],
                  ['Check', 'Argus filters repositories, issues and wikis to what that person may read.'],
                  ['Copy', 'The source comes back with the file and line, not a summary of it.'],
                  ['Cite', 'The agent answers from what it was given, and says where it came from.'],
                ].map(([step, body], index) => (
                  <li key={step} className="flex gap-4 px-5 py-4">
                    <span className="mono grid h-6 w-6 flex-none place-items-center rounded-full border border-line-strong text-[9px] text-accent">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-[13px] font-[540]">{step}</p>
                      <p className="mt-1 text-[12px] leading-relaxed text-muted">{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section border-t border-line">
        <div className="shell">
          <SectionHeading
            eyebrow="Kept current"
            title="An index that goes stale is worse than none."
            lead="Argus is built to be kept: a mirror it never writes to, more than one branch, embeddings where you want them, and backups that restore the index rather than rebuilding it."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {keptCurrent.map((item, index) => (
              <Reveal key={item.title} delay={index * 60}>
                <article className="card h-full">
                  <span className="mono text-[10px] text-faint">0{index + 1}</span>
                  <h3 className="mt-3 text-[14px] font-[580]">{item.title}</h3>
                  <p className="mt-2 text-[12.5px] leading-[1.65] text-muted">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <div className="panel flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <span className="icon-tile">
                  <Database size={18} strokeWidth={1.6} aria-hidden />
                </span>
                <div>
                  <p className="text-[14.5px] font-[560]">Argus alone, without the platform</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted">
                    Argus also runs on its own, reachable at argus.DOMAIN/mcp, for a team that wants
                    the index before it wants the rest.
                  </p>
                </div>
              </div>
              <a
                href={SITE.argusDocs}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-ghost btn-sm shrink-0"
              >
                Standalone Argus
                <ArrowUpRight size={13} aria-hidden />
              </a>
            </div>
          </Reveal>

          <Reveal className="mt-8 flex flex-wrap items-center gap-5">
            <Link to="/platform" className="link-arrow">
              How Argus fits the platform
              <ArrowRight size={14} aria-hidden />
            </Link>
            <a
              href={SITE.architecture}
              target="_blank"
              rel="noreferrer noopener"
              className="mono inline-flex items-center gap-1.5 text-[10px] tracking-[0.1em] text-faint uppercase transition-colors hover:text-ink"
            >
              <FileSearch size={11} aria-hidden />
              Architecture
            </a>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Stop asking a model to remember your code."
        lead="Point Argus at your GitLab and let it answer with the file, the line and the diff. We can walk through it against a repository you choose."
      />
    </>
  )
}
