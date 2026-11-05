import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link } from '@/components/ui/LocalLink'

import { EyeLine } from '@/components/ui/Eye'
import { SITE } from '@/lib/content'
import { useSeo } from '@/lib/seo'
import { useLang } from '@/lib/i18n'

export function NotFound() {
  const fa = useLang() === 'fa'
  useSeo({
    title: fa ? 'صفحه پیدا نشد — ARGUS' : 'Page not found — ARGUS',
    description: fa
      ? 'آن صفحه وجود ندارد. از پلتفرم، Code Arena، Argus یا کد منبع شروع کنید.'
      : 'That page does not exist. Start from the platform, Code Arena, Argus, or the source.',
    path: fa ? '/fa/404' : '/404',
    lang: fa ? 'fa' : 'en',
  })

  return (
    <section className="notfound">
      <div className="shell notfound-inner">
        <div>
          <p className="notfound-code" aria-hidden>
            404
          </p>
          <h1 className="mt-m">{fa ? 'چشم اینجا چیزی پیدا نکرد.' : 'The eye found nothing here.'}</h1>
          <p>
            {fa
              ? 'شاید صفحه جابه‌جا شده یا هرگز وجود نداشته. بقیهٔ چیزها یک قدم فاصله دارند.'
              : 'The page may have moved, or never existed. Everything else is a step away.'}
          </p>
          <div className="row mt-m">
            <Link to="/" className="btn btn-solid">
              <ArrowLeft size={14} aria-hidden />
              {fa ? 'بازگشت به شروع' : 'Back to the start'}
            </Link>
            <a href={SITE.github} target="_blank" rel="noreferrer noopener" className="btn btn-outline">
              {fa ? 'کد منبع' : 'Source'}
              <ArrowUpRight size={14} aria-hidden />
            </a>
          </div>
          <div className="dateline mt-l">
            <Link to="/platform" className="text-link">
              {fa ? 'پلتفرم' : 'Platform'}
            </Link>
            <Link to="/code-arena" className="text-link">
              Code Arena
            </Link>
            <Link to="/argus" className="text-link">
              Argus
            </Link>
            <Link to="/security" className="text-link">
              {fa ? 'امنیت' : 'Security'}
            </Link>
            <Link to="/contact" className="text-link">
              {fa ? 'تماس' : 'Contact'}
            </Link>
          </div>
        </div>
        <div className="notfound-figure">
          <EyeLine />
        </div>
      </div>
    </section>
  )
}
