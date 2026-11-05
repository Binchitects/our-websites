import { RetrievalPlate } from '@/components/product/RetrievalPlate'
import { ArticleOpener } from '@/components/ui/ArticleOpener'
import { Chapter, ChapterHead } from '@/components/ui/Chapter'
import { CtaBand } from '@/components/ui/CtaBand'
import { IndexList } from '@/components/ui/IndexList'
import { Plate } from '@/components/ui/Plate'
import { ARGUS_EVIDENCE, SITE } from '@/lib/content'
import { routeMeta } from '@/lib/route-meta'
import { useSeo } from '@/lib/seo'

const serves = [
  {
    title: 'Your code',
    desc: 'Symbols, references, file contents, and the graph of what each repository uses of the others: packages, imports, #includes, submodules, CI includes and images.',
    tag: 'Code',
  },
  {
    title: 'Documentation packs',
    desc: 'Self-contained archives of public reference material: Windows SDK and WDK, MSVC C++, cppreference, Qt 4 to 6, .NET, Python, PowerShell, shell tooling, algorithms and system design.',
    tag: 'Docs',
  },
  {
    title: 'Merge requests and code at any commit',
    desc: 'Diffs, commits, discussions, pipeline status, job logs and files at any ref — read-only, for any project the caller is a member of, indexed or not.',
    tag: 'GitLab',
  },
  {
    title: 'Issues and the wiki',
    desc: 'What people asked for, reported and wrote down about the business, with the same read-only access and the same per-person check as everything else.',
    tag: 'GitLab',
  },
]

const tools = [
  {
    group: 'Code',
    names: [
      'find_symbol',
      'find_references',
      'search_code',
      'semantic_search',
      'get_file',
      'repo_map',
      'system_map',
      'dependency_path',
      'change_impact',
      'which_repo',
      'impact_of',
      'code_contracts',
    ],
  },
  {
    group: 'Docs',
    names: ['docs_lookup', 'docs_find', 'docs_search', 'docs_get', 'docs_verify'],
  },
  {
    group: 'GitLab',
    names: [
      'mr_list',
      'mr_get',
      'mr_diff',
      'mr_commits',
      'mr_discussions',
      'ci_status',
      'job_log',
      'compare_refs',
      'file_at',
      'grep_at',
      'issue_list',
      'issue_get',
      'wiki_list',
      'wiki_get',
    ],
  },
]

const access = [
  ['Ask', 'An agent calls a tool with the person’s own identity.'],
  ['Check', 'Argus filters repositories, issues and wikis to what that person may read, in SQL.'],
  ['Copy', 'The source comes back with the file and line, not a summary of it.'],
  ['Cite', 'The agent answers from what it was given, and says where it came from.'],
]

const keptCurrent = [
  {
    title: 'Mirrors, it does not write',
    desc: 'A read-only GitLab token and a mirror kept current. Argus never writes to your repositories, and the token can do nothing else.',
  },
  {
    title: 'More than one branch',
    desc: 'Index the branches you care about, and read code at any commit with file_at, grep_at and compare_refs.',
  },
  {
    title: 'Embeddings where you want them',
    desc: 'nomic-embed-text-v1.5 on the CPU through llama.cpp, or the optional Postgres and pgvector backend for scale.',
  },
  {
    title: 'Backups that restore',
    desc: 'What is worth keeping, and how to get it back, is written down — indexes included, so a rebuild is not the plan.',
  },
]

export function ArgusPage() {
  useSeo({ ...routeMeta('/argus'), path: '/argus' })

  return (
    <>
      <ArticleOpener
        section="Argus, the code index"
        title={
          <>
            The index that answers
            <br />
            <em>with the line.</em>
          </>
        }
        standfirst="Argus mirrors your repositories and serves them over MCP: symbols, references, merge requests, CI logs, issues, wikis and documentation packs. The model is handed the facts, verbatim, scoped to the person asking."
        actions={[
          { label: 'Read the manual', href: SITE.argusDocs, external: true, solid: true },
          { label: 'See the tools', href: '#tools' },
        ]}
        aside={
          <>
            <div className="evidence-stack">
              {ARGUS_EVIDENCE.map((item) => (
                <div key={item.label}>
                  <p className="evidence-value">{item.value}</p>
                  <p className="evidence-label">{item.label}</p>
                </div>
              ))}
            </div>
            <p className="note" style={{ borderTop: 0, marginTop: '10px' }}>
              Measured by Argus itself, across five driver files and eighteen contract claims.
            </p>
          </>
        }
      />

      <Chapter number="01" label="What it serves">
        <ChapterHead
          title="Four kinds of facts a model gets wrong on its own."
          standfirst="Thirty-four tools, one per question you would otherwise ask a model to remember. Each answer quotes the source, and each result carries its own licence and attribution where the material requires it."
        />
        <IndexList items={serves} />
      </Chapter>

      <Chapter number="02" label="The tools" id="tools">
        <ChapterHead
          title="An agent with the whole repository, not a prompt of it."
          standfirst="The names are the contract: an agent asks for a symbol, a reference, a diff or a page, and gets the source back. Nothing in the answer is recalled from training."
        />

        <div className="catalog">
          {tools.map((group) => (
            <div key={group.group} className="catalog-group">
              <h4>
                {group.group} — {String(group.names.length).padStart(2, '0')}
              </h4>
              {group.names.map((name, index) => (
                <div key={name} className="catalog-tool">
                  <span>{name}</span>
                  <span className="tool-note">{String(index + 1).padStart(2, '0')}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Chapter>

      <Chapter number="03" label="Access">
        <ChapterHead
          title="Each person sees exactly what their GitLab allows."
          standfirst="The check is a predicate in SQL on every query, not a sentence in a prompt. A developer who cannot open a repository in GitLab cannot retrieve it through Argus — and the audit log records the call either way."
        />

        <div className="spread spread-start">
          <div>
            <p className="body">
              The read-only token is Argus’s own; each answer is filtered again for the caller. Wiki
              and issue reads use the same check as code, so nothing leaks sideways. A private CA
              can secure the hop, and Code Arena’s builds are signed by it.
            </p>
            <figure className="quote mt-m">
              <blockquote>
                Argus Panoptes had a hundred eyes. Yours should not need more than one GitLab account
                to know what it is allowed to see.
              </blockquote>
              <figcaption>— The design of the index</figcaption>
            </figure>
          </div>

          <div className="runbook">
            {access.map(([title, body], index) => (
              <div key={title} className="runbook-step">
                <span className="runbook-num">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-l">
          <Plate
            figure="FIG. 06"
            caption="The same question through the index: the calls, the quoted line, and the caller's own rights. Nothing is answered from memory."
          >
            <RetrievalPlate />
          </Plate>
        </div>
      </Chapter>

      <Chapter number="04" label="Kept current">
        <ChapterHead
          title="An index that goes stale is worse than none."
          standfirst="Argus is built to be kept: a mirror it never writes to, more than one branch, embeddings where you want them, and backups that restore the index rather than rebuilding it."
        />
        <IndexList items={keptCurrent} />

        <p className="note mt-s">
          <strong>Argus alone</strong>
          It also runs without the platform, reachable at argus.DOMAIN/mcp for a team that wants the
          index before it wants the rest. The{' '}
          <a
            href={SITE.argusDocs}
            target="_blank"
            rel="noreferrer noopener"
            className="text-link"
          >
            manual
          </a>{' '}
          says how.
        </p>
      </Chapter>

      <CtaBand
        title={
          <>
            Stop asking a model to <em>remember your code.</em>
          </>
        }
        lead="Point Argus at your GitLab and let it answer with the file, the line and the diff. We can walk through it against a repository you choose."
      />
    </>
  )
}
