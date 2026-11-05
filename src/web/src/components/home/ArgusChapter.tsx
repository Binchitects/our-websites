import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { IndexChart } from '@/components/product/IndexChart'
import { Chapter, ChapterHead } from '@/components/ui/Chapter'
import { Plate } from '@/components/ui/Plate'
import { ARGUS_EVIDENCE } from '@/lib/content'

const CATALOG = [
  {
    group: 'Code',
    note: 'across every repository you may read',
    tools: [
      ['find_symbol', 'by name'],
      ['find_references', 'who calls it'],
      ['search_code', 'exact text'],
      ['semantic_search', 'by meaning'],
      ['repo_map', 'a repository'],
      ['system_map', 'the system'],
      ['dependency_path', 'how it connects'],
      ['change_impact', 'what it touches'],
      ['which_repo', 'where it lives'],
      ['impact_of', 'what depends'],
      ['code_contracts', 'what it promises'],
    ],
  },
  {
    group: 'Docs',
    note: 'packs of licensed reference material',
    tools: [
      ['docs_lookup', 'you know the name'],
      ['docs_find', 'you know the behaviour'],
      ['docs_search', 'find a page'],
      ['docs_get', 'read a page'],
      ['docs_verify', 'check a draft'],
    ],
  },
  {
    group: 'GitLab',
    note: 'read-only, as the caller',
    tools: [
      ['mr_diff', 'a change'],
      ['mr_commits', 'its commits'],
      ['ci_status', 'the pipeline'],
      ['job_log', 'why it failed'],
      ['compare_refs', 'any two refs'],
      ['file_at', 'a file at a commit'],
      ['grep_at', 'search a commit'],
      ['issue_get', 'what was reported'],
      ['wiki_get', 'what was written'],
      ['mr_discussions', 'what was said'],
    ],
  },
]

/** Chapter three: the inverted centre spread. Argus, its proof, and its tools. */
export function ArgusChapter() {
  return (
    <Chapter number="03" label="Argus" id="argus" className="invert">
      <ChapterHead
        title={
          <>
            It quotes the line.
            <br />
            <em>It doesn&rsquo;t remember it.</em>
          </>
        }
        standfirst={
          <>
            A local model is good at reasoning and bad at recall. Header names, import libraries,
            error codes and flags are exactly the facts a model states confidently and gets wrong.
            Argus puts those facts in front of it at answer time.
          </>
        }
        action={
          <Link to="/argus" className="arrow-link">
            The index in detail
            <ArrowRight size={13} aria-hidden />
          </Link>
        }
      />

      <Plate
        figure="FIG. 04"
        caption="The index, in one view: three orbits of tools around one eye. Filled nodes quote the source; open nodes read the record. Every answer is scoped to the caller."
      >
        <IndexChart />
      </Plate>

      <div className="spread spread-start mt-l">
        <div>
          <p className="body" style={{ color: 'var(--ink-2)' }}>
            Argus mirrors your repositories and serves them over MCP: symbols, references, merge
            requests, CI logs, issues, wikis and documentation packs. Each answer is scoped to what
            the caller&rsquo;s own GitLab account can read, in SQL — not in a prompt.
          </p>
          <p className="body" style={{ color: 'var(--ink-2)' }}>
            The model is handed the facts, verbatim. Header names, flags and error codes stop being
            a test of memory and become a citation.
          </p>
        </div>
        <div>
          <figure className="quote">
            <blockquote>
              A hundred eyes, one index. The point is not that the model is bad — it is that the
              index can be right.
            </blockquote>
            <figcaption>— Argus, measured across five driver files</figcaption>
          </figure>
        </div>
      </div>

      <div className="evidence-row mt-l">
        {ARGUS_EVIDENCE.map((item) => (
          <div key={item.label} className="evidence">
            <p className="evidence-value">{item.value}</p>
            <p className="evidence-label">{item.label}</p>
          </div>
        ))}
      </div>
      <p className="note" style={{ borderTop: 0 }}>
        Across five real driver files and eighteen contract claims: claims from memory were wrong
        every time, paraphrased claims a third of the time, and quoted claims not once.
      </p>

      <div className="mt-xl">
        <div className="subhead">
          <h3>The tools, in short</h3>
          <span className="micro">THIRTY-FOUR OVER MCP</span>
        </div>
        <div className="catalog">
          {CATALOG.map((group) => (
            <div key={group.group} className="catalog-group">
              <h4>
                {group.group} — {group.note}
              </h4>
              {group.tools.map(([name, note]) => (
                <div key={name} className="catalog-tool">
                  <span>{name}</span>
                  <span className="tool-note">{note}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Chapter>
  )
}
