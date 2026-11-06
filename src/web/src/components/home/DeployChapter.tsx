import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Chapter, ChapterHead } from '@/components/ui/Chapter'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { SITE } from '@/lib/site'
import { useLang } from '@/lib/i18n'

const quickStart = `$ git clone https://github.com/Binchitects/argus
$ cd argus/deploy && cp .env.example .env   # domain, models, secrets
$ docker compose up -d                       # open https://your-arena`

const steps = [
  {
    title: 'Fill in one .env',
    body: 'Your domain, the folder models live in, the first model, six secrets. The installer can ask every setting, and arenactl changes them later.',
  },
  {
    title: 'Bring the stack up',
    body: 'docker compose up -d. The app fetches its first model and the media models itself, and Traefik serves the only way in.',
  },
  {
    title: 'Sign in and invite people',
    body: 'Open your Arena as admin, then add people and groups. Their rights follow your GitLab.',
  },
]

const modes = [
  ['Air-gapped', 'One .run file carries every image and the checks; installs only the features you choose.', 'a host with no internet'],
  ['Rootless Podman', 'No root, ports 8080 and 8443, GPUs across more than one server.', 'a locked-down host'],
  ['Helm chart', 'Rolls without a gap and grows with load, after the cluster is checked.', 'a Kubernetes cluster'],
  ['External Postgres', 'Postgres 16 or newer, or the stack’s own; backups go where you say.', 'an existing database'],
]


const stepsFa = [
  { title: 'یک ‎.env را پر کنید', body: 'دامنه، پوشهٔ مدل‌ها، مدل اول و شش راز. نصب‌کننده می‌تواند همهٔ تنظیمات را بپرسد و arenactl بعداً تغییرشان می‌دهد.' },
  { title: 'استک را بالا بیاورید', body: 'docker compose up -d. برنامه اولین مدل و مدل‌های رسانه را خودش می‌گیرد و Traefik تنها راه ورود را سرو می‌کند.' },
  { title: 'وارد شوید و افراد را دعوت کنید', body: 'Arena خود را به‌عنوان مدیر باز کنید، سپس افراد و گروه‌ها را اضافه کنید. اختیاراتشان از GitLab شما پیروی می‌کند.' },
]

const modesFa = [
  ['شبکهٔ جداافتاده', 'یک فایل .run همهٔ ایمیج‌ها و بررسی‌ها را همراه دارد؛ فقط قابلیت‌هایی را نصب می‌کند که انتخاب کنید.', 'میزبانی بدون اینترنت'],
  ['Podman بدون root', 'بدون root، پورت‌های ۸۰۸۰ و ۸۴۴۳، GPUها روی بیش از یک سرور.', 'میزبانی سخت‌گیرانه'],
  ['Helm chart', 'بدون وقفه به‌روز می‌شود و با بار رشد می‌کند، پس از بررسی کلاستر.', 'یک کلاستر Kubernetes'],
  ['Postgres بیرونی', 'Postgres 16 یا جدیدتر، یا نسخهٔ خود استک؛ پشتیبان‌ها هرجا بگویید می‌روند.', 'یک پایگاه‌دادهٔ موجود'],
]

/** Chapter four: the runbook. */
export function DeployChapter() {
  const fa = useLang() === 'fa'
  const list = fa ? stepsFa : steps
  const rows = fa ? modesFa : modes

  return (
    <Chapter number="04" label={fa ? 'استقرار' : 'Deploy'} id="deploy">
      <ChapterHead
        title={fa ? 'از clone تا ورود، در یک بعدازظهر.' : 'From clone to sign‑in in an afternoon.'}
        standfirst={
          fa
            ? 'یک میزبان Linux با Docker و یک GPU انویدیا تمام نیاز است. یک ‎.env، یک compose up و استک اولین مدلش را خودش می‌گیرد. برای میزبانی بدون اینترنت، یک فایل همین کار را می‌کند.'
            : 'A Linux host with Docker and an NVIDIA GPU is the whole requirement. One .env, one compose up, and the stack fetches its first model itself. For a host with no internet, one file does the same.'
        }
        action={
          <a href={SITE.deployment} target="_blank" rel="noreferrer noopener" className="arrow-link">
            {fa ? 'راهنمای استقرار' : 'Deployment guide'}
            <ArrowUpRight size={13} aria-hidden />
          </a>
        }
      />

      <div className="spread spread-start">
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
          <p className="note mt-s">
            <strong>{fa ? 'اصلاً اینترنت ندارید؟' : 'No internet at all?'}</strong>
            {fa
              ? ' نصب‌کنندهٔ آفلاین همهٔ ایمیج‌ها، برنامه و بررسی‌ها را در یک فایل .run همراه دارد و فقط قابلیت‌هایی را نصب می‌کند که انتخاب کنید.'
              : ' The offline installer carries every image, the app and the checks in one .run file, and installs only the features you select.'}
          </p>
        </div>

        <div>
          <CodeBlock code={quickStart} label={fa ? 'روی میزبان Linux با Docker' : 'on a Linux host with Docker'} />
          <div className="row mt-m">
            <a href={SITE.architecture} target="_blank" rel="noreferrer noopener" className="arrow-link">
              {fa ? 'معماری' : 'The architecture'}
              <ArrowUpRight size={13} aria-hidden />
            </a>
            <a href={SITE.docs} target="_blank" rel="noreferrer noopener" className="arrow-link">
              {fa ? 'مستندات' : 'Documentation'}
              <ArrowRight size={13} aria-hidden />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-xl">
        <div className="subhead">
          <h3>{fa ? 'چهار راه برای اجرا' : 'Four ways to run it'}</h3>
          <span className="micro">{fa ? 'همان استک' : 'The same stack'}</span>
        </div>
        <div className="table-scroll">
          <table className="table spec-table">
            <thead>
              <tr>
                <th scope="col">{fa ? 'روش' : 'Mode'}</th>
                <th scope="col">{fa ? 'چه می‌دهد' : 'What it gives'}</th>
                <th scope="col">{fa ? 'چه وقت' : 'When'}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([mode, gives, when]) => (
                <tr key={mode}>
                  <td>{mode}</td>
                  <td>{gives}</td>
                  <td>{when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Chapter>
  )
}
