import { ArrowUpRight } from 'lucide-react'
import { BinchitectsLockup } from '@/components/brand/BinchitectsLockup'
import { SITE } from '@/lib/content'
import { useLang } from '@/lib/i18n'

const LINKS = [
  { label: 'Binchitects on GitHub', labelFa: 'Binchitects در GitHub', href: SITE.org },
  { label: 'The repository', labelFa: 'مخزن', href: SITE.github },
  { label: 'Contributing', labelFa: 'مشارکت', href: SITE.contributing },
  { label: 'Issues and requests', labelFa: 'ایشوها و درخواست‌ها', href: SITE.issues },
  { label: 'Releases', labelFa: 'انتشارها', href: SITE.releases },
]

/**
 * The publisher's page, set between the licensing chapter and the questions:
 * a huge Binchitects wordmark, the open-source team's statement, and the way in.
 */
export function PublishersBand() {
  const fa = useLang() === 'fa'

  return (
    <section className="publisher" id="publisher">
      <div className="shell">
        <div className="publisher-top">
          <span className="micro">{fa ? 'ناشر' : 'The publisher'}</span>
          <span className="publisher-stamp">{fa ? 'تیم متن‌باز' : 'Open source team'}</span>
          <span className="micro">AGPL-3.0-only</span>
        </div>

        <BinchitectsLockup className="bx-xl" role={false} />

        <div className="publisher-grid">
          <div>
            <p className="publisher-lead">
              {fa ? (
                <>Binchitects تیمی را به توسعهٔ <span className="signal">متن‌باز</span> اختصاص داده است.</>
              ) : (
                <>Binchitects keeps a team dedicated to <span className="signal">open-source</span> development.</>
              )}
            </p>
            <p className="body">
              {fa
                ? 'Argus Arena در ملأ عام ساخته می‌شود: کد منبع، ایشوها، راهنما، یادداشت‌های انتشار و نقشهٔ راه برای خواندن، اجرا و تغییر در دسترس‌اند. AGPL مجوز است، نه پانویس — و کار هر روز آشکارا توسط کسانی انجام می‌شود که شغلشان همین است.'
                : 'Argus Arena is built in public: the source, the issues, the manual, the release notes and the roadmap are there to read, run and change. The AGPL is the licence, not a footnote — and the work is done in the open every day by people whose job it is.'}
            </p>
            <p className="note">
              <strong>{fa ? 'ساخته‌شده در ملأ عام' : 'Built in the open'}</strong>
              {fa
                ? ' پلتفرمی که از شما می‌خواهد کدتان را به آن بسپارید باید خواندنی باشد. با مخزن شروع کنید، بعد راهنمای مشارکت.'
                : ' A platform that asks you to trust it with your code should be readable. Start with the repository, then the contributing guide.'}
            </p>
          </div>

          <div className="publisher-links">
            {LINKS.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer noopener">
                <span>{fa ? link.labelFa : link.label}</span>
                <ArrowUpRight size={13} aria-hidden />
              </a>
            ))}
            <p className="publisher-meta">
              {fa
                ? 'AGPL-3.0-only · مجوز تجاری برای مواردی که پاسخ نمی‌دهد · کد منبع همراه است'
                : 'AGPL-3.0-only · commercial licence for the uses it does not fit · source included'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
