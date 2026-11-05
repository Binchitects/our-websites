import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from '@/components/ui/LocalLink'

import { CodeArenaPlate } from '@/components/product/CodeArenaPlate'
import { Chapter, ChapterHead } from '@/components/ui/Chapter'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { Plate } from '@/components/ui/Plate'
import { SITE } from '@/lib/content'
import { useLang } from '@/lib/i18n'

const install = `$ curl -fsSL https://arena.internal/api/downloads/code-arena/install.sh | sh
$ code-arena login --url https://arena.internal
$ cd your-project && code-arena`

const steps = [
  {
    title: 'An IDE you already know',
    body: 'The folder, an editor, search, git, terminals, a debugger and language servers — tabs, breadcrumbs and an Outline where VS Code puts them.',
  },
  {
    title: 'A plan you approve',
    body: 'For long work it plans first: steps, files and checks before a single edit. A step can be undone, and a half-done plan carries into the next session.',
  },
  {
    title: 'A check on every step',
    body: 'A step is done only when the test, build or lint it named passes. The agent can read every earlier message back by number.',
  },
  {
    title: 'One file, kept current',
    body: 'One self-contained program for Linux, macOS and Windows. It talks only to your Arena, checks the build it is given, and needs no internet.',
  },
]


const stepsFa = [
  { title: 'IDE‌ای که می‌شناسید', body: 'پوشه، ویرایشگر، جست‌وجو، git، ترمینال، دیباگر و زبان‌سرورها — تب‌ها، مسیرها و Outline همان‌جایی که VS Code می‌گذارد.' },
  { title: 'برنامه‌ای که تأیید می‌کنید', body: 'برای کارهای طولانی اول برنامه می‌دهد: گام‌ها، فایل‌ها و بررسی‌ها پیش از هر ویرایش. هر گام بازگشت‌پذیر است و برنامهٔ نیمه‌کاره به نشست بعد می‌رسد.' },
  { title: 'بررسی روی هر گام', body: 'گام تنها وقتی تمام است که تست، build یا lint نام‌برده‌اش قبول شود. عامل می‌تواند هر پیام قبلی را با شماره دوباره بخواند.' },
  { title: 'یک فایل، همیشه به‌روز', body: 'یک برنامهٔ خودکفا برای Linux، macOS و Windows. فقط با Arena شما حرف می‌زند، build تحویلی را بررسی می‌کند و به اینترنت نیاز ندارد.' },
]

/** Chapter two: the coding agent, with the IDE as a printed proof sheet. */
export function CodeArenaChapter() {
  const fa = useLang() === 'fa'
  const list = fa ? stepsFa : steps

  return (
    <Chapter number="02" label="Code Arena" id="code-arena">
      <ChapterHead
        title={
          <>
            {fa ? 'عامل و IDE،' : 'The agent and the IDE,'}
            <br />
            {fa ? 'داخل شبکهٔ شما.' : 'inside your network.'}
          </>
        }
        standfirst={
          <>
            {fa
              ? 'عامل کدنویسی خودمان، با یک IDE کامل در مرورگر. کد موجود در پوشهٔ پروژه را می‌خواند، تغییر می‌دهد و اجرا می‌کند و با هویت فرد واردشده کار می‌کند — همان کلید، همان اختیارات، همان بودجهٔ چت.'
              : 'Our own coding agent, with a full IDE around it in the browser. It reads, changes and runs the code in a project folder, and it works as the person signed in — same key, same rights, same budget as the chat.'}
          </>
        }
        action={
          <Link to="/code-arena" className="arrow-link">
            {fa ? 'بیشتر دربارهٔ Code Arena' : 'More about Code Arena'}
            <ArrowRight size={13} aria-hidden />
          </Link>
        }
      />

      <Plate
        figure={fa ? 'شکل ۰۳' : 'FIG. 03'}
        caption={fa
          ? 'یک نشست از برنامه تا بررسی: یک خط تغییرکرده، بررسی‌ای که قبول شد و نشستی که هنوز با چت وب هم‌گام است.'
          : 'A session from the plan to the check: one changed line, the check that passed, and the session still synced with the web chat.'}
      >
        <CodeArenaPlate />
      </Plate>

      <div className="spread spread-start mt-l">
        <div>
          <div className="runbook">
            {list.map((step, index) => (
              <div key={step.title} className="runbook-step">
                <span className="runbook-num">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <CodeBlock code={install} label={fa ? 'یک فایل، بدون نصب' : 'one file, nothing to install'} />
          <div className="row mt-m">
            <a
              href={SITE.codeArenaDocs}
              target="_blank"
              rel="noreferrer noopener"
              className="arrow-link"
            >
              {fa ? 'راهنمای Code Arena' : 'The Code Arena manual'}
              <ArrowUpRight size={13} aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </Chapter>
  )
}
