import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from '@/components/ui/LocalLink'

import { AgentTrace } from '@/components/product/AgentTrace'
import { CodeArenaPlate } from '@/components/product/CodeArenaPlate'
import { ArticleOpener } from '@/components/ui/ArticleOpener'
import { Chapter, ChapterHead } from '@/components/ui/Chapter'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { CtaBand } from '@/components/ui/CtaBand'
import { Faq } from '@/components/ui/Faq'
import { IndexList } from '@/components/ui/IndexList'
import { Plate } from '@/components/ui/Plate'
import { SITE } from '@/lib/content'
import { usePageSeo } from '@/lib/seo'
import { useLang } from '@/lib/i18n'

const install = `$ curl -fsSL https://arena.internal/api/downloads/code-arena/install.sh | sh
$ code-arena login --url https://arena.internal
$ cd your-project && code-arena`

const ideFeatures = [
  {
    title: 'The editor you expect',
    desc: 'Tabs, breadcrumbs, an Outline and language servers, with a debugger beside them, laid out as VS Code is.',
  },
  {
    title: 'Search and a code index',
    desc: 'Find a file, a symbol or a phrase — or ask by what the code does. Fewer tokens than grep.',
  },
  {
    title: 'Git and terminals',
    desc: 'Branches, changes and real terminals in the same page; the agent runs commands where you can watch.',
  },
  {
    title: 'Plans, not surprises',
    desc: 'For long work it plans first and you approve the plan. A step can be undone.',
  },
  {
    title: 'Sessions that stay whole',
    desc: 'Big results are set aside, older ones cleared before summarising, and every earlier message is readable by number.',
  },
  {
    title: 'Work that runs in parallel',
    desc: 'Steps that wait for nothing run at once; a short Python program can call the tools many times.',
  },
]

const plan = [
  ['Read the plan', 'Steps, files and checks, before a single edit. You approve it.'],
  ['Ground each step', 'The agent reads the code first; a step that finds nothing stops and says so.'],
  ['Run the check', 'A test, a build or a linter — the check the step named. Done only when it passes.'],
  ['Undo, or carry on', 'A step can be undone. A half-done plan is carried into the next session.'],
]

const selfManaging = [
  {
    title: 'One self-contained file',
    desc: 'A .NET program for Linux, macOS and Windows on Arm. No runtime, no package manager, no dependency tree on the developer’s machine.',
  },
  {
    title: 'Keeps itself current',
    desc: 'It asks the Arena it is signed in to, once a day, and updates itself from there with size and SHA-256 checked.',
  },
  {
    title: 'Signed by your server',
    desc: 'The installer checks the build against a list your Arena signed; Windows builds carry Authenticode from the same certificate.',
  },
  {
    title: 'Offline by design',
    desc: 'It talks only to your Arena and never to the internet. It reports its version so admins can see who runs an old build, and has nowhere else to report.',
  },
]

const faqs = [
  {
    question: 'Does the model run on the developer’s machine?',
    answer:
      'No. Code Arena is the IDE and the agent loop; the model runs in your Arena, on your GPUs, through the same gateway and the same key as the chat. A laptop needs no GPU.',
  },
  {
    question: 'Which systems are supported?',
    answer:
      'Linux, macOS and Windows, including Windows on Arm. It is one self-contained program with nothing to install, and there is a terminal mode (code-arena chat) for people who do not want the IDE.',
  },
  {
    question: 'What can the agent reach?',
    answer:
      'The project folder it was started in, and the Arena tools the person may use — web search, Python in the sandbox, pictures, speech, Argus’s code search, plugins and knowledge — acting as that person, within their rights and budget.',
  },
  {
    question: 'Do we need to open ports to the internet?',
    answer:
      'No. The IDE is served from the developer’s own machine, and the program talks out to your Arena only. On an air-gapped network it works the same way.',
  },
]


const ideFeaturesFa = [
  { title: 'ویرایشگری که انتظارش را دارید', desc: 'تب‌ها، مسیرها، Outline و زبان‌سرورها، با دیباگر کنارشان، همان‌طور که VS Code می‌چیند.' },
  { title: 'جست‌وجو و نمایهٔ کد', desc: 'فایل، نماد یا عبارت را پیدا کنید — یا بر اساس کاری که کد انجام می‌دهد بپرسید. توکن کمتر از grep.' },
  { title: 'Git و ترمینال', desc: 'شاخه‌ها، تغییرات و ترمینال‌های واقعی در همان صفحه؛ عامل فرمان‌ها را جایی اجرا می‌کند که ببینید.' },
  { title: 'برنامه، نه غافلگیری', desc: 'برای کارهای طولانی اول برنامه می‌دهد و شما تأیید می‌کنید. هر گام بازگشت‌پذیر است.' },
  { title: 'نشست‌هایی که کامل می‌مانند', desc: 'نتایج بزرگ کنار گذاشته می‌شوند، قدیمی‌ترها پیش از خلاصه پاک می‌شوند و هر پیام قبلی با شماره خواندنی است.' },
  { title: 'کاری که موازی پیش می‌رود', desc: 'گام‌هایی که منتظر چیزی نیستند هم‌زمان اجرا می‌شوند؛ یک برنامهٔ کوتاه Python می‌تواند ابزارها را بارها صدا بزند.' },
]

const planFa = [
  ['برنامه را بخوانید', 'گام‌ها، فایل‌ها و بررسی‌ها، پیش از یک ویرایش. شما تأیید می‌کنید.'],
  ['هر گام را زمین بزنید', 'عامل اول کد را می‌خواند؛ گامی که چیزی پیدا نکند متوقف می‌شود و می‌گوید.'],
  ['بررسی را اجرا کنید', 'یک تست، build یا linter — همان بررسی که گام نام برده. فقط با قبولی تمام است.'],
  ['بازگردانید یا ادامه دهید', 'هر گام بازگشت‌پذیر است. برنامهٔ نیمه‌کاره به نشست بعد می‌رسد.'],
]

const selfManagingFa = [
  { title: 'یک فایل خودکفا', desc: 'یک برنامهٔ .NET برای Linux، macOS و Windows روی Arm. بدون runtime، بدون package manager، بدون درخت وابستگی روی دستگاه توسعه‌دهنده.' },
  { title: 'خودش را به‌روز نگه می‌دارد', desc: 'روزی یک‌بار از Arena‌ای که در آن وارد شده می‌پرسد و خودش را از آن‌جا به‌روز می‌کند، با بررسی اندازه و SHA-256.' },
  { title: 'امضاشده توسط سرور شما', desc: 'نصب‌کننده build را با فهرستی که Arena شما امضا کرده بررسی می‌کند؛ buildهای Windows از همان گواهی Authenticode دارند.' },
  { title: 'آفلاین به‌صورت طراحی', desc: 'فقط با Arena شما حرف می‌زند و هرگز با اینترنت. نسخه‌اش را گزارش می‌کند تا مدیران ببینند چه کسی build قدیمی دارد؛ جای دیگری برای گزارش ندارد.' },
]

const faqsFa = [
  { question: 'آیا مدل روی دستگاه توسعه‌دهنده اجرا می‌شود؟', answer: 'خیر. Code Arena همان IDE و حلقهٔ عامل است؛ مدل در Arena شما، روی GPUهای شما، از همان gateway و همان کلیدی که چت استفاده می‌کند اجرا می‌شود. یک لپ‌تاپ به GPU نیاز ندارد.' },
  { question: 'کدام سیستم‌ها پشتیبانی می‌شوند؟', answer: 'Linux، macOS و Windows، از جمله Windows روی Arm. یک برنامهٔ خودکفاست که چیزی برای نصب ندارد و یک حالت ترمینال (code-arena chat) برای کسانی دارد که IDE نمی‌خواهند.' },
  { question: 'عامل به چه چیزی دسترسی دارد؟', answer: 'پوشهٔ پروژه‌ای که در آن شروع شده و ابزارهای Arena‌ای که فرد می‌تواند استفاده کند — جست‌وجوی وب، Python در سندباکس، تصویر، گفتار، جست‌وجوی کد Argus، افزونه‌ها و دانش — با هویت همان فرد، در محدودهٔ اختیارات و بودجه‌اش.' },
  { question: 'آیا باید پورت‌هایی به اینترنت باز کنیم؟', answer: 'خیر. IDE از دستگاه خود توسعه‌دهنده سرو می‌شود و برنامه فقط به Arena شما وصل می‌شود. در یک شبکهٔ جداافتاده هم همین‌طور کار می‌کند.' },
]

export function CodeArena() {
  usePageSeo('/code-arena')
  const fa = useLang() === 'fa'
  const ide = fa ? ideFeaturesFa : ideFeatures
  const steps = fa ? planFa : plan
  const managing = fa ? selfManagingFa : selfManaging
  const questions = fa ? faqsFa : faqs

  return (
    <>
      <ArticleOpener
        section="Code Arena"
        title={
          <>
            {fa ? 'کد شما، عامل شما،' : 'Your code, your agent,'}
            <br />
            <em>{fa ? 'IDE شما.' : 'your IDE.'}</em>
          </>
        }
        standfirst={
          fa
            ? 'عاملی کدنویسی که کد موجود در پوشهٔ پروژه را می‌خواند، تغییر می‌دهد و اجرا می‌کند، با یک IDE کامل در مرورگر. فقط با Arena شما حرف می‌زند، پس جایی که اینترنت نیست هم کار می‌کند — با هویت فرد واردشده.'
            : 'A coding agent that reads, changes and runs the code in a project folder, with a full IDE around it in the browser. It talks only to your Arena, so it works where the internet does not — as the person it is signed in as.'
        }
        actions={[
          { label: fa ? 'راهنما را بخوانید' : 'Read the manual', href: SITE.codeArenaDocs, external: true, solid: true },
          { label: fa ? 'پلتفرم را ببینید' : 'See the platform', href: '/platform' },
        ]}
        aside={
          <>
            <p className="micro micro-ink">{fa ? 'نسخهٔ کوتاه' : 'The short version'}</p>
            <ul className="mini-list" style={{ marginTop: '10px' }}>
              <li>{fa ? 'یک فایل خودکفا، نصب با یک خط' : 'One self-contained file, installed in one line'}</li>
              <li>Linux، macOS و Windows روی Arm</li>
              <li>{fa ? 'امضاشده توسط CA خود Arena شما' : 'Signed by your Arena’s own CA'}</li>
              <li>{fa ? 'کار در شبکه‌ای بدون راه خروج' : 'Works on a network with no way out'}</li>
            </ul>
          </>
        }
      />

      <Chapter number="01" label={fa ? 'IDE' : 'The IDE'}>
        <ChapterHead
          title={fa ? 'IDE‌ای که می‌شناسید، حول عاملی که کارش را نشان می‌دهد.' : 'An IDE you already know, around an agent that shows its work.'}
          standfirst={
            fa
              ? 'چیز تازه‌ای برای یاد گرفتن نیست: پوشه، ویرایشگر، جست‌وجو، git، ترمینال و دیباگر همان‌جایی هستند که انتظار دارید. تازگی این است که عامل کنارشان داخل شبکهٔ شماست، با اختیارات خودتان.'
              : 'Nothing new to learn: the folder, the editor, search, git, terminals and the debugger are where you expect them. What is new is that the agent beside them is inside your network, with your rights.'
          }
        />

        <Plate
          figure={fa ? 'شکل ۰۳' : 'FIG. 03'}
          caption={
            fa
              ? 'یک نشست از برنامه تا بررسی: یک خط تغییرکرده، بررسی‌ای که قبول شد و نشستی که هنوز با چت وب هم‌گام است.'
              : 'A session from the plan to the check: one changed line, the check that passed, and the session still synced with the web chat.'
          }
        >
          <CodeArenaPlate />
        </Plate>

        <div className="mt-l">
          <IndexList items={ide} />
        </div>
      </Chapter>

      <Chapter number="02" label={fa ? 'عامل' : 'The agent'}>
        <ChapterHead
          title={fa ? 'اول برنامه می‌دهد، بعد هر گام را اثبات می‌کند.' : 'It plans first, then proves each step.'}
          standfirst={
            fa
              ? 'کار طولانی مستقیم به ویرایش نمی‌رسد. عامل برنامه‌ای می‌نویسد، شما تأییدش می‌کنید و هر گام در کد زمین می‌شود و فقط با قبولی بررسی‌اش تمام است.'
              : 'Long work does not go straight to an edit. The agent writes a plan, you approve it, and each step is grounded in the code and done only once its check passes.'
          }
        />

        <Plate
          figure={fa ? 'شکل ۰۵' : 'FIG. 05'}
          caption={
            fa
              ? 'رد یک نشست: برنامه‌ای که تأیید می‌کنید، هر گام زمین‌خورده در کد، بررسی‌ای که باید قبول شود و مسیر تعمیر اگر نشد. هر گام بازگشت‌پذیر است.'
              : 'The trace of one session: a plan you approve, each step grounded in the code, a check that must pass, and a repair path if it does not. A step can be undone.'
          }
        >
          <AgentTrace />
        </Plate>

        <div className="spread spread-start mt-l">
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

          <figure className="quote">
            <blockquote>
              {fa
                ? 'نشست بعدی برنامهٔ نیمه‌کاره را با خود می‌برد. هیچ‌کس چون روز تمام شد از صفر شروع نمی‌کند.'
                : 'The next session carries a half-done plan on. Nobody starts again because the day ended.'}
            </blockquote>
            <figcaption>{fa ? '— راهنمای Code Arena' : '— The Code Arena manual'}</figcaption>
          </figure>
        </div>
      </Chapter>

      <Chapter number="03" label={fa ? 'یک فایل' : 'One file'}>
        <ChapterHead
          title={fa ? 'یک فایل، و خودش را نگه می‌دارد.' : 'One file, and it looks after itself.'}
          standfirst={
            fa
              ? 'روی دستگاه توسعه‌دهنده چیزی برای نصب نیست جز برنامه، و چیزی برای به‌روز نگه داشتن دستی. Arena buildها را سرو می‌کند؛ برنامه آن‌ها را می‌گیرد.'
              : 'There is nothing to install on a developer’s machine but the program, and nothing to keep current by hand. The Arena serves the builds; the program takes them.'
          }
          action={
            <a href={SITE.codeArenaDocs} target="_blank" rel="noreferrer noopener" className="arrow-link">
              {fa ? 'راهنمای Code Arena' : 'The Code Arena manual'}
              <ArrowUpRight size={13} aria-hidden />
            </a>
          }
        />

        <IndexList items={managing} />

        <div className="spread spread-start mt-l">
          <CodeBlock code={install} label={fa ? 'از Arena خودتان' : 'from your own Arena'} />
          <div>
            <div className="subhead">
              <h3>{fa ? 'Windows، Arm و یک CA خصوصی' : 'Windows, Arm and a private CA'}</h3>
              <span className="micro">{fa ? 'امضاشده، فهرست‌شده، بررسی‌شده' : 'Signed, listed, checked'}</span>
            </div>
            <p className="body">
              {fa
                ? 'نصب‌کننده build را با فهرست SHA-256 امضاشدهٔ Arena شما بررسی می‌کند. buildهای Windows از همان گواهی Authenticode دارند، بنابراین SmartScreen نام ناشر را می‌گوید. CODE_ARENA_DIR آن را جای دیگری می‌گذارد؛ CODE_ARENA_CA به یک CA خصوصی اعتماد می‌کند.'
                : 'The installer checks the build against the SHA-256 list your Arena signed. The Windows builds carry Authenticode from the same certificate, so SmartScreen names the publisher. CODE_ARENA_DIR puts it elsewhere; CODE_ARENA_CA trusts a private CA.'}
            </p>
            <div className="row mt-s">
              <Link to="/contact" className="arrow-link">
                {fa ? 'درخواست یک معرفی کامل' : 'Ask for a walkthrough'}
                <ArrowRight size={13} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </Chapter>

      <Chapter number="04" label={fa ? 'پرسش‌ها' : 'Questions'}>
        <ChapterHead
          title={fa ? 'پیش از نصب.' : 'Before you install it.'}
          standfirst={fa ? 'پرسش‌هایی که یک توسعه‌دهنده و یک بازبین امنیتی اول می‌پرسند.' : 'The questions a developer and a security reviewer ask first.'}
          action={
            <a href={SITE.codeArenaDocs} target="_blank" rel="noreferrer noopener" className="arrow-link">
              {fa ? 'راهنما را بخوانید' : 'Read the manual'}
              <ArrowUpRight size={13} aria-hidden />
            </a>
          }
        />
        <Faq items={questions} />
      </Chapter>

      <CtaBand
        title={
          fa ? (
            <>
              به هر توسعه‌دهنده <em>همان عامل</em> را بدهید.
            </>
          ) : (
            <>
              Give every developer <em>the same agent.</em>
            </>
          )
        }
        lead={
          fa
            ? 'یک Arena، یک کلید برای هر فرد، یک عامل که داخل شبکهٔ شما کار می‌کند. می‌توانیم یک معرفی کامل روی مخزن خودتان ترتیب دهیم.'
            : 'One Arena, one key for each person, one agent that works inside your network. We can set up a walkthrough on your own repository.'
        }
      />
    </>
  )
}
