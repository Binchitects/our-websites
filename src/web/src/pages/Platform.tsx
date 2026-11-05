import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from '@/components/ui/LocalLink'

import { ArchitecturePlate } from '@/components/product/ArchitecturePlate'
import { ArticleOpener } from '@/components/ui/ArticleOpener'
import { Chapter, ChapterHead } from '@/components/ui/Chapter'
import { CtaBand } from '@/components/ui/CtaBand'
import { IndexList } from '@/components/ui/IndexList'
import { Plate } from '@/components/ui/Plate'
import { ENGINES, PLATFORM_GROUPS, SITE } from '@/lib/content'
import { usePageSeo } from '@/lib/seo'
import { useLang } from '@/lib/i18n'

const oneSignIn = [
  'A chat with thinking levels and files',
  'Code Arena: the agent and the browser IDE',
  'Argus: the code index over MCP',
  'Studio for pictures, voices and 3D',
  'Meetings with minutes and actions',
  'Agents and apps built in Studio',
  'Memory shared by the chat and the code',
  'SSO, LDAP, 2FA and per-person keys',
]

const oneSignInFa = [
  'چتی با سطح‌های تفکر و فایل‌ها',
  'Code Arena: عامل و IDE مرورگری',
  'Argus: نمایهٔ کد روی MCP',
  'استودیو برای تصویر، صدا و سه‌بعدی',
  'جلسه‌ها با صورت‌جلسه و کارهای بعدی',
  'عامل‌ها و برنامه‌های ساخته‌شده در استودیو',
  'حافظهٔ مشترک چت و کد',
  'SSO، LDAP، ۲FA و کلید شخصی',
]

export function Platform() {
  usePageSeo('/platform')
  const fa = useLang() === 'fa'
  const items = fa ? oneSignInFa : oneSignIn

  return (
    <>
      <ArticleOpener
        section={fa ? 'پلتفرم' : 'The platform'}
        title={
          <>
            {fa ? 'هر چیزی که کار لازم دارد.' : 'Everything the work needs.'}
            <br />
            <em>{fa ? 'هیچ چیزی که بیرون برود.' : 'Nothing that leaves.'}</em>
          </>
        }
        standfirst={
          fa
            ? 'چتی که کار واقعی انجام می‌دهد، عامل کدنویسی با IDE اختصاصی، استودیو، جلسه‌ها، عامل‌ها و نمایهٔ کد — با یک ورود، یک حافظه، یک مجموعه اختیارات و یک بودجه برای هر فرد.'
            : 'A chat that does real work, a coding agent with its own IDE, a studio, meetings, agents and a code index — sharing one sign-in, one memory, one set of rights and one budget for each person.'
        }
        actions={[
          { label: fa ? 'مستندات را بخوانید' : 'Read the docs', href: SITE.docs, external: true, solid: true },
          { label: fa ? 'Code Arena را ببینید' : 'See Code Arena', href: '/code-arena' },
        ]}
        aside={
          <>
            <p className="micro micro-ink">{fa ? 'یک ورود' : 'One sign-in'}</p>
            <ul className="mini-list" style={{ marginTop: '10px' }}>
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </>
        }
      />

      {PLATFORM_GROUPS.map((group, index) => (
        <Chapter
          key={group.eyebrow}
          number={String(index + 1).padStart(2, '0')}
          label={fa ? (group.eyebrowFa ?? group.eyebrow) : group.eyebrow}
        >
          <ChapterHead
            title={fa ? (group.titleFa ?? group.title) : group.title}
            standfirst={fa ? (group.bodyFa ?? group.body) : group.body}
          />
          <IndexList
            items={group.features.map((feature) => ({
              title: fa ? (feature.titleFa ?? feature.title) : feature.title,
              desc: fa ? (feature.bodyFa ?? feature.body) : feature.body,
              tag: feature.tag,
            }))}
          />
        </Chapter>
      ))}

      <Chapter number="04" label={fa ? 'زیر کاپوت' : 'Under the hood'}>
        <ChapterHead
          title={fa ? 'استکی که می‌توانید برای ممیز توضیح دهید.' : 'A stack you can explain to an auditor.'}
          standfirst={
            fa
              ? 'یک برنامه و API با .NET 10 و یک وب‌اپ React، پشت Traefik. API دفتر، کلیدها، اختیارات و گزارش ممیزی را نگه می‌دارد. GPUهای شما مدل‌ها را از طریق یک gateway اجرا می‌کنند. Argus با یک توکن فقط‌خواندنی GitLab را آینه می‌کند.'
              : 'A .NET 10 app and API with a React web app, behind Traefik. The API keeps the ledger, the keys, the rights and the audit log. Your GPUs run the models through a gateway. Argus mirrors GitLab with a read-only token.'
          }
          action={
            <a href={SITE.architecture} target="_blank" rel="noreferrer noopener" className="arrow-link">
              {fa ? 'معماری را بخوانید' : 'Read the architecture'}
              <ArrowUpRight size={13} aria-hidden />
            </a>
          }
        />

        <Plate
          figure={fa ? 'شکل ۰۲' : 'FIG. 02'}
          caption={
            fa
              ? 'تنها راه ورود Traefik است. وضعیت در Postgres و سندباکس‌ها می‌ماند؛ مدل‌ها روی GPUهای شما؛ GitLab فقط‌خواندنی است.'
              : 'The only way in is Traefik. State stays in Postgres and the sandboxes; the models stay on your GPUs; GitLab is read-only.'
          }
        >
          <ArchitecturePlate />
        </Plate>

        <div className="spread mt-l">
          <div>
            <div className="subhead">
              <h3>{fa ? 'هر مدل باز' : 'Any open model'}</h3>
              <span className="micro">{fa ? 'انتخاب در زمان نصب' : 'Chosen at install'}</span>
            </div>
            <p className="body">
              {fa
                ? 'llama.cpp فرمت GGUF را می‌گیرد، vLLM و SGLang فرمت‌های خودشان را. کارت و مجوز مدل‌ها پیش از هر دانلود نشان داده می‌شود؛ امبدینگ‌ها می‌توانند روی CPU اجرا شوند تا GPU برای پاسخ‌ها بماند.'
                : 'llama.cpp takes GGUF, vLLM and SGLang take their own formats. Model cards and licences are shown before any download; embeddings can run on the CPU so the GPU stays for answers.'}
            </p>
            <div className="row mt-s">
              {ENGINES.map((engine) => (
                <span key={engine} className="mono" style={{ fontSize: '9px', color: 'var(--muted)' }}>
                  {engine}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="subhead">
              <h3>{fa ? 'روی سخت‌افزار خودتان' : 'On your hardware'}</h3>
              <span className="micro">{fa ? 'یا در کلاستر خودتان' : 'Or in your cluster'}</span>
            </div>
            <p className="body">
              {fa
                ? 'یک میزبان با Docker، Podman بدون root، GPUها روی چند سرور، یک فایل .run آفلاین، یا یک Helm chart که بدون وقفه به‌روز می‌شود. استک از آنِ شماست تا شکلش دهید.'
                : 'One host with Docker, rootless Podman, GPUs across several servers, an offline .run file, or a Helm chart that rolls without a gap. The stack is yours to shape.'}
            </p>
            <div className="row mt-s">
              <Link to="/contact" className="arrow-link">
                {fa ? 'یک استقرار را برنامه‌ریزی کنید' : 'Plan a deployment'}
                <ArrowRight size={13} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </Chapter>

      <CtaBand
        title={
          fa ? (
            <>
              یک پلتفرم، نه یک <em>سفارش خرید.</em>
            </>
          ) : (
            <>
              A platform, not a <em>purchase order.</em>
            </>
          )
        }
        lead={
          fa
            ? 'بگویید امروز چه چیزی اجرا می‌کنید — مدل‌ها، GitLab، ورودی که همین حالا دارید — تا استقرار، مجوز و هفتهٔ اول را نقشه کنیم.'
            : 'Tell us what you run today — the models, the GitLab, the sign-in you already have — and we will map the deployment, the licence and the first week.'
        }
      />
    </>
  )
}
