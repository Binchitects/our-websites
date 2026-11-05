import { ArrowRight } from 'lucide-react'
import { Link } from '@/components/ui/LocalLink'

import { ArchitecturePlate } from '@/components/product/ArchitecturePlate'
import { Chapter, ChapterHead } from '@/components/ui/Chapter'
import { IndexList } from '@/components/ui/IndexList'
import { Plate } from '@/components/ui/Plate'
import { useLang } from '@/lib/i18n'

const STACK = [
  {
    title: 'Chat that does the work',
    desc: 'Models, thinking levels, files, server-side tools and live previews.',
    tag: 'Arena',
    href: '/platform',
  },
  {
    title: 'Code Arena',
    desc: 'A coding agent with its own IDE, installed as one file.',
    tag: 'Code',
    href: '/code-arena',
  },
  {
    title: 'Argus, the code index',
    desc: 'Symbols, references and docs quoted from your own GitLab.',
    tag: '34 tools',
    href: '/argus',
  },
  {
    title: 'Memory that lasts',
    desc: 'One memory across chat and agent, recalled by meaning.',
    tag: 'Memory',
    href: '/platform',
  },
  {
    title: 'Studio',
    desc: 'Pictures, video, voices, music and 3D on the same GPUs.',
    tag: 'Media',
    href: '/platform',
  },
  {
    title: 'Agents and apps',
    desc: 'Agents that react to GitLab and act on it; chats that become apps.',
    tag: 'Agents',
    href: '/platform',
  },
  {
    title: 'Meetings',
    desc: 'Who said what, the minutes, and the action items.',
    tag: 'Meetings',
    href: '/platform',
  },
  {
    title: 'The science lab',
    desc: 'Six sciences, with tools that check every step.',
    tag: 'Lab',
    href: '/platform',
  },
]


const STACK_FA = [
  { title: 'چتی که کار انجام می‌دهد', desc: 'مدل‌ها، سطح‌های تفکر، فایل‌ها، ابزارهای سمت سرور و پیش‌نمایش زنده.', tag: 'Arena', href: '/platform' },
  { title: 'Code Arena', desc: 'عامل کدنویسی با IDE اختصاصی، نصب‌شده به‌صورت یک فایل.', tag: 'Code', href: '/code-arena' },
  { title: 'Argus، نمایهٔ کد', desc: 'نمادها، ارجاع‌ها و مستنداتی که از GitLab خودتان نقل می‌شوند.', tag: '۳۴ ابزار', href: '/argus' },
  { title: 'حافظه‌ای که می‌ماند', desc: 'یک حافظه مشترک بین چت و عامل، با یادآوری بر اساس معنا.', tag: 'Memory', href: '/platform' },
  { title: 'استودیو', desc: 'تصویر، ویدیو، صدا، موسیقی و سه‌بعدی روی همان GPUها.', tag: 'Media', href: '/platform' },
  { title: 'عامل‌ها و برنامه‌ها', desc: 'عامل‌هایی که به GitLab واکنش می‌دهند و عمل می‌کنند؛ چت‌هایی که برنامه می‌شوند.', tag: 'Agents', href: '/platform' },
  { title: 'جلسه‌ها', desc: 'چه کسی چه گفت، صورت‌جلسه و کارهای بعدی.', tag: 'Meetings', href: '/platform' },
  { title: 'آزمایشگاه علمی', desc: 'شش علم، با ابزارهایی که هر گام را بررسی می‌کنند.', tag: 'Lab', href: '/platform' },
]

/** Chapter one: the index of the stack, then the schematic of how it fits. */
export function StackChapter() {
  const fa = useLang() === 'fa'

  return (
    <Chapter number="01" label={fa ? 'استک' : 'The stack'} id="stack">
      <ChapterHead
        title={<>{fa ? 'یک استک، نه پنج اشتراک.' : 'One stack, not five subscriptions.'}</>}
        standfirst={
          <>
            {fa
              ? 'بیشتر تیم‌ها در نهایت یک اشتراک چت، یک دستیار کدنویسی، یک ابزار تصویر، یک ربات جلسه و چند اسکریپت بین‌شان دارند — هرکدام یک حساب دیگر، یک صورت‌حساب دیگر و یک جای دیگر برای رفتن کار. ARGUS همهٔ این‌هاست در یک استک که خودتان اجرا می‌کنید.'
              : 'Most teams end up with a chat subscription, a coding assistant, an image tool, a meeting bot and a few scripts in between — each another account, another bill, and another place the work goes. ARGUS is all of it in one stack you run yourself.'}
          </>
        }
        action={
          <Link to="/platform" className="arrow-link">
            {fa ? 'همه‌چیز در پلتفرم' : 'Everything in the platform'}
            <ArrowRight size={13} aria-hidden />
          </Link>
        }
      />

      <IndexList items={fa ? STACK_FA : STACK} />

      <p className="note mt-s">
        <strong>{fa ? 'و در کنارشان' : 'And beside them'}</strong>
        {fa
          ? ' بازبینی امنیتی با تست و اصلاح، GRC در چهارده چارچوب، دانش سازمان، Slack و Teams و یک API برای ابزارهای خودتان.'
          : ' security reviews with a test and a fix, GRC across fourteen frameworks, company knowledge, Slack and Teams, and an API for your own tools.'}
      </p>

      <div className="mt-xl">
        <div className="subhead">
          <h3>{fa ? 'زیر کاپوت' : 'Under the hood'}</h3>
          <span className="micro">{fa ? 'شکل ۰۲ / یک راه ورود' : 'FIG. 02 / ONE WAY IN'}</span>
        </div>
        <Plate
          figure={fa ? 'شکل ۰۲' : 'FIG. 02'}
          caption={fa
            ? 'Traefik تنها راه ورود است. برنامه کلیدها، اختیارات، دفتر و گزارش ممیزی را نگه می‌دارد؛ GPUهای شما مدل‌ها را اجرا می‌کنند؛ Argus با توکنی GitLab را می‌خواند که کار دیگری نمی‌تواند بکند.'
            : 'Traefik is the only way in. The app keeps the keys, the rights, the ledger and the audit log; your GPUs run the models; Argus reads GitLab with a token that can do nothing else.'}
        >
          <ArchitecturePlate />
        </Plate>
      </div>
    </Chapter>
  )
}
