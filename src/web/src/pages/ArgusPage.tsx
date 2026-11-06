import { RetrievalPlate } from '@/components/product/RetrievalPlate'
import { ArticleOpener } from '@/components/ui/ArticleOpener'
import { Chapter, ChapterHead } from '@/components/ui/Chapter'
import { CtaBand } from '@/components/ui/CtaBand'
import { IndexList } from '@/components/ui/IndexList'
import { Plate } from '@/components/ui/Plate'
import { ARGUS_EVIDENCE } from '@/lib/content/argus'
import { SITE } from '@/lib/site'
import { usePageSeo } from '@/lib/seo'
import { useLang } from '@/lib/i18n'

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


const servesFa = [
  { title: 'کد شما', desc: 'نمادها، ارجاع‌ها، محتوای فایل‌ها و گرافِ استفادهٔ هر مخزن از مخزن‌های دیگر: بسته‌ها، importها، #includeها، ساب‌ماژول‌ها، includeهای CI و ایمیج‌ها.', tag: 'Code' },
  { title: 'بسته‌های مستندات', desc: 'آرشیوهای خودکفای منابع عمومی: Windows SDK و WDK، MSVC C++، cppreference، Qt 4 تا 6، .NET، Python، PowerShell، ابزارهای shell، الگوریتم‌ها و طراحی سیستم.', tag: 'Docs' },
  { title: 'Merge requestها و کد در هر کامیت', desc: 'دیف‌ها، کامیت‌ها، بحث‌ها، وضعیت پایپ‌لاین، لاگ jobها و فایل‌ها در هر ref — فقط‌خواندنی، برای هر پروژه‌ای که کاربر عضو آن است، نمایه‌شده یا نشده.', tag: 'GitLab' },
  { title: 'ایشوها و ویکی', desc: 'چیزی که مردم دربارهٔ کسب‌وکار پرسیده، گزارش کرده و نوشته‌اند، با همان دسترسی فقط‌خواندنی و همان بررسی فردی که بقیهٔ چیزها دارند.', tag: 'GitLab' },
]

const accessFa = [
  ['بپرس', 'یک عامل با هویت خودِ فرد ابزاری را صدا می‌زند.'],
  ['بررسی کن', 'Argus مخزن‌ها، ایشوها و ویکی‌ها را در SQL به آنچه فرد می‌تواند بخواند محدود می‌کند.'],
  ['کپی کن', 'منبع با فایل و خط برمی‌گردد، نه خلاصه‌ای از آن.'],
  ['ارجاع بده', 'عامل از آنچه به او داده شده پاسخ می‌دهد و می‌گوید از کجا آمده.'],
]

const keptCurrentFa = [
  { title: 'آینه می‌کند، نمی‌نویسد', desc: 'یک توکن فقط‌خواندنی GitLab و یک آینهٔ به‌روز. Argus هرگز در مخزن‌های شما نمی‌نویسد و توکن کار دیگری نمی‌تواند بکند.' },
  { title: 'بیش از یک شاخه', desc: 'شاخه‌هایی را که مهم‌اند نمایه کنید و کد را در هر کامیت با file_at، grep_at و compare_refs بخوانید.' },
  { title: 'امبدینگ هرجا که بخواهید', desc: 'nomic-embed-text-v1.5 روی CPU از طریق llama.cpp، یا بک‌اند اختیاری Postgres و pgvector برای مقیاس.' },
  { title: 'پشتیبان‌هایی که بازمی‌گردند', desc: 'اینکه چه چیزی ارزش نگه داشتن دارد و چطور برگردانده شود، نوشته شده — همراه با نمایه‌ها، تا بازسازی نقشه نباشد.' },
]

export function ArgusPage() {
  usePageSeo('/argus')
  const fa = useLang() === 'fa'
  const served = fa ? servesFa : serves
  const steps = fa ? accessFa : access
  const kept = fa ? keptCurrentFa : keptCurrent

  return (
    <>
      <ArticleOpener
        section={fa ? 'Argus، نمایهٔ کد' : 'Argus, the code index'}
        title={
          <>
            {fa ? 'نمایه‌ای که پاسخ می‌دهد' : 'The index that answers'}
            <br />
            <em>{fa ? 'با خط.' : 'with the line.'}</em>
          </>
        }
        standfirst={
          fa
            ? 'Argus مخزن‌های شما را آینه می‌کند و روی MCP سرو می‌کند: نمادها، ارجاع‌ها، merge requestها، لاگ‌های CI، ایشوها، ویکی‌ها و بسته‌های مستندات. واقعیت‌ها عیناً به مدل داده می‌شوند، در محدودهٔ اختیارات پرسشگر.'
            : 'Argus mirrors your repositories and serves them over MCP: symbols, references, merge requests, CI logs, issues, wikis and documentation packs. The model is handed the facts, verbatim, scoped to the person asking.'
        }
        actions={[
          { label: fa ? 'راهنما را بخوانید' : 'Read the manual', href: SITE.argusDocs, external: true, solid: true },
          { label: fa ? 'ابزارها را ببینید' : 'See the tools', href: '#tools' },
        ]}
        aside={
          <>
            <div className="evidence-stack">
              {ARGUS_EVIDENCE.map((item) => (
                <div key={item.label}>
                  <p className="evidence-value">{item.value}</p>
                  <p className="evidence-label">{fa ? item.labelFa : item.label}</p>
                </div>
              ))}
            </div>
            <p className="note" style={{ borderTop: 0, marginTop: '10px' }}>
              {fa
                ? 'سنجیده‌شده توسط خود Argus، روی پنج فایل درایور و هجده ادعای قراردادی.'
                : 'Measured by Argus itself, across five driver files and eighteen contract claims.'}
            </p>
          </>
        }
      />

      <Chapter number="01" label={fa ? 'چه چیزی سرو می‌کند' : 'What it serves'}>
        <ChapterHead
          title={fa ? 'چهار نوع واقعیت که مدل به‌تنهایی اشتباه می‌گوید.' : 'Four kinds of facts a model gets wrong on its own.'}
          standfirst={
            fa
              ? 'سی‌وچهار ابزار، یکی برای هر پرسشی که وگرنه از مدل می‌خواهید به‌خاطر بسپارد. هر پاسخ منبع را نقل می‌کند و هر نتیجه در صورت نیاز مجوز و ارجاع خودش را دارد.'
              : 'Thirty-four tools, one per question you would otherwise ask a model to remember. Each answer quotes the source, and each result carries its own licence and attribution where the material requires it.'
          }
        />
        <IndexList items={served} />
      </Chapter>

      <Chapter number="02" label={fa ? 'ابزارها' : 'The tools'} id="tools">
        <ChapterHead
          title={fa ? 'عاملی با کل مخزن، نه promptی از آن.' : 'An agent with the whole repository, not a prompt of it.'}
          standfirst={
            fa
              ? 'نام‌ها همان قراردادند: عامل یک نماد، یک ارجاع، یک دیف یا یک صفحه می‌خواهد و منبع را پس می‌گیرد. هیچ‌چیز در پاسخ از آموزش به‌یاد آورده نمی‌شود.'
              : 'The names are the contract: an agent asks for a symbol, a reference, a diff or a page, and gets the source back. Nothing in the answer is recalled from training.'
          }
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

      <Chapter number="03" label={fa ? 'دسترسی' : 'Access'}>
        <ChapterHead
          title={fa ? 'هر فرد دقیقاً همان چیزی را می‌بیند که GitLabش اجازه می‌دهد.' : 'Each person sees exactly what their GitLab allows.'}
          standfirst={
            fa
              ? 'بررسی یک predicate در SQL روی هر پرسش است، نه یک جمله در prompt. توسعه‌دهنده‌ای که نمی‌تواند مخزنی را در GitLab باز کند، از Argus هم نمی‌تواند بگیردش — و گزارش ممیزی در هر حال فراخوانی را ثبت می‌کند.'
              : 'The check is a predicate in SQL on every query, not a sentence in a prompt. A developer who cannot open a repository in GitLab cannot retrieve it through Argus — and the audit log records the call either way.'
          }
        />

        <div className="spread spread-start">
          <div>
            <p className="body">
              {fa
                ? 'توکن فقط‌خواندنی از آنِ خود Argus است؛ هر پاسخ دوباره برای پرسشگر فیلتر می‌شود. خواندن ویکی و ایشو همان بررسی کد را دارد، پس چیزی از پهلو درز نمی‌کند. یک CA خصوصی می‌تواند مسیر را امن کند و buildهای Code Arena با آن امضا می‌شوند.'
                : 'The read-only token is Argus’s own; each answer is filtered again for the caller. Wiki and issue reads use the same check as code, so nothing leaks sideways. A private CA can secure the hop, and Code Arena’s builds are signed by it.'}
            </p>
            <figure className="quote mt-m">
              <blockquote>
                {fa
                  ? 'Argus Panoptes صد چشم داشت. چشم شما نباید بیش از یک حساب GitLab بخواهد تا بداند چه چیزی را مجاز است ببیند.'
                  : 'Argus Panoptes had a hundred eyes. Yours should not need more than one GitLab account to know what it is allowed to see.'}
              </blockquote>
              <figcaption>{fa ? '— طراحی نمایه' : '— The design of the index'}</figcaption>
            </figure>
          </div>

          <div className="runbook">
            {steps.map(([title, body], index) => (
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
            figure={fa ? 'شکل ۰۶' : 'FIG. 06'}
            caption={
              fa
                ? 'همان پرسش از مسیر نمایه: فراخوانی‌ها، خط نقل‌شده و اختیارات خود پرسشگر. هیچ‌چیز از حافظه پاسخ داده نمی‌شود.'
                : 'The same question through the index: the calls, the quoted line, and the caller’s own rights. Nothing is answered from memory.'
            }
          >
            <RetrievalPlate />
          </Plate>
        </div>
      </Chapter>

      <Chapter number="04" label={fa ? 'به‌روز نگه‌داشته‌شده' : 'Kept current'}>
        <ChapterHead
          title={fa ? 'نمایه‌ای که کهنه شود از هیچ بدتر است.' : 'An index that goes stale is worse than none.'}
          standfirst={
            fa
              ? 'Argus برای نگه‌داشتن ساخته شده: آینه‌ای که هرگز در آن نمی‌نویسد، بیش از یک شاخه، امبدینگ هرجا که بخواهید و پشتیبان‌هایی که نمایه را بازمی‌گردانند نه بازسازی.'
              : 'Argus is built to be kept: a mirror it never writes to, more than one branch, embeddings where you want them, and backups that restore the index rather than rebuilding it.'
          }
        />
        <IndexList items={kept} />

        <p className="note mt-s">
          <strong>{fa ? 'Argus به‌تنهایی' : 'Argus alone'}</strong>
          {fa
            ? ' بدون پلتفرم هم اجرا می‌شود، در argus.DOMAIN/mcp، برای تیمی که نمایه را پیش از بقیه می‌خواهد. '
            : ' It also runs without the platform, reachable at argus.DOMAIN/mcp for a team that wants the index before it wants the rest. The '}
          <a href={SITE.argusDocs} target="_blank" rel="noreferrer noopener" className="text-link">
            {fa ? 'راهنما' : 'manual'}
          </a>{' '}
          {fa ? 'می‌گوید چطور.' : 'says how.'}
        </p>
      </Chapter>

      <CtaBand
        title={
          fa ? (
            <>
              از مدل نخواهید <em>کد شما را به‌خاطر بسپارد.</em>
            </>
          ) : (
            <>
              Stop asking a model to <em>remember your code.</em>
            </>
          )
        }
        lead={
          fa
            ? 'Argus را به GitLab خود وصل کنید تا با فایل، خط و دیف پاسخ دهد. می‌توانیم روی مخزنی که انتخاب می‌کنید معرفی کامل انجام دهیم.'
            : 'Point Argus at your GitLab and let it answer with the file, the line and the diff. We can walk through it against a repository you choose.'
        }
      />
    </>
  )
}
