import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { RetrievalPlate } from '@/components/product/RetrievalPlate'
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

      <div className="spread spread-reverse spread-start">
        <div className="spread-figure">
          <Plate
            figure="FIG. 04"
            caption="A question, the calls that answered it, and the line it came from. The model is handed the source; it does not recall it."
          >
            <RetrievalPlate />
          </Plate>
        </div>

        <div>
          <p className="body" style={{ color: 'var(--ink-2)' }}>
            Argus mirrors your repositories and serves them over MCP: symbols, references, merge
            requests, CI logs, issues, wikis and documentation packs. Each answer is scoped to what
            the caller&rsquo;s own GitLab account can read, in SQL — not in a prompt.
          </p>

          <div className="evidence-row mt-m">
            {ARGUS_EVIDENCE.map((item) => (
              <div key={item.label} className="evidence">
                <p className="evidence-value">{item.value}</p>
                <p className="evidence-label">{item.label}</p>
              </div>
            ))}
          </div>

          <p className="note" style={{ borderTop: 0, paddingTop: 0 }}>
            Argus&rsquo;s own measurements, in its server instructions: across five real driver files
            and eighteen contract claims. The point is not that the model is bad — it is that the
            index can be right.
          </p>
        </div>
      </div>

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
