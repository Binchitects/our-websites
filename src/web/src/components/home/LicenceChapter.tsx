import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from '@/components/ui/LocalLink'

import { Chapter, ChapterHead } from '@/components/ui/Chapter'
import { SITE } from '@/lib/content'
import { useLang } from '@/lib/i18n'

const community = [
  'Run it for your team, at no cost',
  'Read, study, change and share the source',
  'Every feature in this site, with no seat count',
  'Community support through the repository',
]

const commercial = [
  'A hosted, managed or embedded offering',
  'Closed-source distribution or an appliance',
  'Private modifications used over a network',
  'Warranty, support and the names and logos',
]


const communityFa = [
  'برای تیم خودتان اجرا کنید، بدون هزینه',
  'کد منبع را بخوانید، مطالعه کنید، تغییر دهید و به اشتراک بگذارید',
  'همهٔ قابلیت‌های این سایت، بدون شمارش کاربر',
  'پشتیبانی جامعه از طریق مخزن',
]

const commercialFa = [
  'یک سرویس میزبانی‌شده، مدیریت‌شده یا جاسازی‌شده',
  'توزیع بسته یا به‌صورت یک دستگاه',
  'تغییرات خصوصی که در شبکه استفاده می‌شوند',
  'ضمانت، پشتیبانی و استفاده از نام‌ها و نشان‌ها',
]

/** Chapter seven: the two licences, as a two-page spread. */
export function LicenceChapter() {
  const fa = useLang() === 'fa'
  const free = fa ? communityFa : community
  const paid = fa ? commercialFa : commercial

  return (
    <Chapter number="07" label={fa ? 'مجوز' : 'Licensing'} id="licenses">
      <ChapterHead
        title={fa ? 'اجرای آزاد. تجاری وقتی AGPL جواب نمی‌دهد.' : 'Free to run. Commercial when the AGPL does not fit.'}
        standfirst={
          fa
            ? 'Argus Arena دو مجوزی است. می‌توانید تحت AGPL-3.0-only از آن استفاده کنید یا مجوز تجاری بگیرید که تعهداتش را با شرایط توافق‌شده جایگزین می‌کند — مثلاً وقتی آن را به‌عنوان سرویس به دیگران ارائه می‌دهید.'
            : 'Argus Arena is dual-licensed. You can use it under the AGPL-3.0-only, or take a commercial licence that replaces its obligations with the terms we agree — for example when you offer it to others as a service.'
        }
      />

      <div className="licence-grid">
        <div className="licence">
          <div className="licence-head">
            <h3>{fa ? 'جامعه' : 'Community'}</h3>
            <span className="tag">AGPL-3.0-only</span>
          </div>
          <p>
            {fa
              ? 'برای تیم‌هایی که استک را برای خودشان اجرا می‌کنند و می‌توانند شرایط AGPL را رعایت کنند. کل محصول، کل کد منبع، بدون شمارش کاربر.'
              : 'For teams that run the stack for themselves and can meet the AGPL’s conditions. The whole product, the whole source, no seat count.'}
          </p>
          <ul>
            {free.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="licence-actions">
            <a href={SITE.licensing} target="_blank" rel="noreferrer noopener" className="btn btn-outline btn-sm">
              {fa ? 'مجوز را بخوانید' : 'Read the licence'}
              <ArrowUpRight size={12} aria-hidden />
            </a>
            <a href={SITE.github} target="_blank" rel="noreferrer noopener" className="btn btn-outline btn-sm">
              {fa ? 'کد منبع' : 'Source'}
              <ArrowUpRight size={12} aria-hidden />
            </a>
          </div>
        </div>

        <div className="licence">
          <div className="licence-head">
            <h3>{fa ? 'تجاری' : 'Commercial'}</h3>
            <span className="tag">{fa ? 'مجوز کتبی' : 'Written licence'}</span>
          </div>
          <p>
            {fa
              ? 'برای سرویس میزبانی‌شده، یک دستگاه، توزیع بسته، یا تغییرات خصوصی که دیگران در شبکه استفاده می‌کنند. تعهدات AGPL را با شرایط توافق‌شده جایگزین می‌کند.'
              : 'For a hosted service, an appliance, closed distribution, or private changes used by others over a network. It replaces the AGPL obligations with agreed terms.'}
          </p>
          <ul>
            {paid.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="licence-actions">
            <Link to="/contact?topic=license" className="btn btn-solid btn-sm">
              {fa ? 'دربارهٔ مجوز بپرسید' : 'Ask about a licence'}
              <ArrowRight size={12} aria-hidden />
            </Link>
            <a
              href={SITE.licensing}
              target="_blank"
              rel="noreferrer noopener"
              className="arrow-link"
            >
              {fa ? 'چه وقت لازم است' : 'When one is required'}
              <ArrowUpRight size={12} aria-hidden />
            </a>
          </div>
        </div>
      </div>

      <p className="note mt-s">
        <strong>{fa ? 'این مشاورهٔ حقوقی نیست.' : 'Not legal advice.'}</strong>
        {fa
          ? ' این صفحه مجوز را توضیح می‌دهد؛ فایل LICENSING.md در مخزن مرجع است. نام‌های Argus Arena، Argus و Code Arena علامت‌های تجاری Binchitects هستند.'
          : ' This page explains the licensing; LICENSING.md in the repository is the reference. The names Argus Arena, Argus and Code Arena are trademarks of Binchitects.'}
      </p>
    </Chapter>
  )
}
