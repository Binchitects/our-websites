import { ArrowRight } from 'lucide-react'
import { Link } from '@/components/ui/LocalLink'

import { IndexChart } from '@/components/product/IndexChart'
import { Chapter, ChapterHead } from '@/components/ui/Chapter'
import { Plate } from '@/components/ui/Plate'
import { ARGUS_EVIDENCE } from '@/lib/content'
import { useLang } from '@/lib/i18n'

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


const CATALOG_FA = [
  {
    group: 'Code',
    note: 'در هر مخزنی که اجازهٔ خواندنش را دارید',
    tools: [
      ['find_symbol', 'با نام'],
      ['find_references', 'چه کسی صدایش می‌زند'],
      ['search_code', 'متن دقیق'],
      ['semantic_search', 'بر اساس معنا'],
      ['repo_map', 'یک مخزن'],
      ['system_map', 'کل سیستم'],
      ['dependency_path', 'چطور وصل می‌شود'],
      ['change_impact', 'به چه چیزی دست می‌زند'],
      ['which_repo', 'کجا زندگی می‌کند'],
      ['impact_of', 'چه چیزی وابسته است'],
      ['code_contracts', 'چه چیزی وعده می‌دهد'],
    ],
  },
  {
    group: 'Docs',
    note: 'بسته‌های منابع مرجع دارای مجوز',
    tools: [
      ['docs_lookup', 'نام را می‌دانید'],
      ['docs_find', 'رفتار را می‌دانید'],
      ['docs_search', 'صفحه‌ای را پیدا کنید'],
      ['docs_get', 'صفحه‌ای را بخوانید'],
      ['docs_verify', 'پیش‌نویس را بررسی کنید'],
    ],
  },
  {
    group: 'GitLab',
    note: 'فقط‌خواندنی، با هویت پرسشگر',
    tools: [
      ['mr_diff', 'یک تغییر'],
      ['mr_commits', 'کامیت‌هایش'],
      ['ci_status', 'پایپ‌لاین'],
      ['job_log', 'چرا شکست خورد'],
      ['compare_refs', 'هر دو ref'],
      ['file_at', 'یک فایل در یک کامیت'],
      ['grep_at', 'جست‌وجو در یک کامیت'],
      ['issue_get', 'چه چیزی گزارش شد'],
      ['wiki_get', 'چه چیزی نوشته شد'],
      ['mr_discussions', 'چه چیزی گفته شد'],
    ],
  },
]

/** Chapter three: the inverted centre spread. Argus, its proof, and its tools. */
export function ArgusChapter() {
  const fa = useLang() === 'fa'
  const catalog = fa ? CATALOG_FA : CATALOG

  return (
    <Chapter number="03" label="Argus" id="argus" className="invert">
      <ChapterHead
        title={
          <>
            {fa ? 'خط را نقل می‌کند.' : 'It quotes the line.'}
            <br />
            <em>{fa ? 'آن را به‌خاطر نمی‌سپارد.' : 'It doesn’t remember it.'}</em>
          </>
        }
        standfirst={
          <>
            {fa
              ? 'مدل محلی در استدلال خوب است و در یادآوری ضعیف. نام هدرها، کتابخانه‌های import، کدهای خطا و فلگ‌ها دقیقاً همان واقعیت‌هایی هستند که مدل با اطمینان بیان می‌کند و اشتباه می‌گوید. Argus همان واقعیت‌ها را در لحظهٔ پاسخ جلوی مدل می‌گذارد.'
              : 'A local model is good at reasoning and bad at recall. Header names, import libraries, error codes and flags are exactly the facts a model states confidently and gets wrong. Argus puts those facts in front of it at answer time.'}
          </>
        }
        action={
          <Link to="/argus" className="arrow-link">
            {fa ? 'نمایه به‌تفصیل' : 'The index in detail'}
            <ArrowRight size={13} aria-hidden />
          </Link>
        }
      />

      <Plate
        figure={fa ? 'شکل ۰۴' : 'FIG. 04'}
        caption={fa
          ? 'نمایه در یک نگاه: سه مدار ابزار گرد یک چشم. گره‌های پر، منبع را نقل می‌کنند؛ گره‌های خالی، دفتر را می‌خوانند. هر پاسخ در محدودهٔ اختیارات پرسشگر است.'
          : 'The index, in one view: three orbits of tools around one eye. Filled nodes quote the source; open nodes read the record. Every answer is scoped to the caller.'}
      >
        <IndexChart />
      </Plate>

      <div className="spread spread-start mt-l">
        <div>
          <p className="body" style={{ color: 'var(--ink-2)' }}>
            {fa
              ? 'Argus مخزن‌های شما را آینه می‌کند و روی MCP سرو می‌کند: نمادها، ارجاع‌ها، merge requestها، لاگ‌های CI، ایشوها، ویکی‌ها و بسته‌های مستندات. هر پاسخ در محدودهٔ همان چیزی است که حساب GitLab پرسشگر در SQL می‌تواند بخواند — نه در یک prompt.'
              : 'Argus mirrors your repositories and serves them over MCP: symbols, references, merge requests, CI logs, issues, wikis and documentation packs. Each answer is scoped to what the caller’s own GitLab account can read, in SQL — not in a prompt.'}
          </p>
          <p className="body" style={{ color: 'var(--ink-2)' }}>
            {fa
              ? 'واقعیت‌ها عیناً به مدل داده می‌شوند. نام هدرها، فلگ‌ها و کدهای خطا دیگر آزمون حافظه نیستند؛ به یک ارجاع تبدیل می‌شوند.'
              : 'The model is handed the facts, verbatim. Header names, flags and error codes stop being a test of memory and become a citation.'}
          </p>
        </div>
        <div>
          <figure className="quote">
            <blockquote>
              {fa
                ? 'صد چشم، یک نمایه. نکته این نیست که مدل بد است — این است که نمایه می‌تواند درست باشد.'
                : 'A hundred eyes, one index. The point is not that the model is bad — it is that the index can be right.'}
            </blockquote>
            <figcaption>{fa ? '— Argus، سنجیده‌شده روی پنج فایل درایور' : '— Argus, measured across five driver files'}</figcaption>
          </figure>
        </div>
      </div>

      <div className="evidence-row mt-l">
        {ARGUS_EVIDENCE.map((item) => (
          <div key={item.label} className="evidence">
            <p className="evidence-value">{item.value}</p>
            <p className="evidence-label">{fa ? item.labelFa : item.label}</p>
          </div>
        ))}
      </div>
      <p className="note" style={{ borderTop: 0 }}>
        {fa
          ? 'روی پنج فایل واقعی درایور و هجده ادعای قراردادی: ادعاهای از حافظه هر بار غلط بودند، ادعاهای بازنویسی‌شده یک‌سوم مواقع و ادعاهای نقل‌شده هیچ‌بار.'
          : 'Across five real driver files and eighteen contract claims: claims from memory were wrong every time, paraphrased claims a third of the time, and quoted claims not once.'}
      </p>

      <div className="mt-xl">
        <div className="subhead">
          <h3>{fa ? 'ابزارها، به‌کوتاهی' : 'The tools, in short'}</h3>
          <span className="micro">{fa ? 'سی‌وچهار ابزار روی MCP' : 'THIRTY-FOUR OVER MCP'}</span>
        </div>
        <div className="catalog">
          {catalog.map((group) => (
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
