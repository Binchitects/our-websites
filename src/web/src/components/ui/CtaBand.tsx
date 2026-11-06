import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from '@/components/ui/LocalLink'

import { EyeLine } from '@/components/ui/Eye'
import { SITE } from '@/lib/site'
import { useLang } from '@/lib/i18n'

/** The closing spread: one iris-blue page, one statement, one eye. */
export function CtaBand({
  title,
  lead,
}: {
  title?: React.ReactNode
  lead?: string
}) {
  const fa = useLang() === 'fa'
  const heading = title ?? (fa ? (<>هوش مصنوعی را <em>به خانه</em> بیاورید.</>) : (<>Bring your AI <em>home.</em></>))
  const text =
    lead ??
    (fa
      ? 'چت، عامل کدنویسی و نمایهٔ کد را روی سخت‌افزاری که همین حالا دارید اجرا کنید. کمک می‌کنیم مجوز درست و شکل درست استقرار را انتخاب کنید.'
      : 'Run the chat, the coding agent and the code index on hardware you already own. We will help you choose the right licence and the right shape of deployment.')

  return (
    <section className="closing">
      <div className="shell closing-inner">
        <div>
          <div className="closing-meta" style={{ marginTop: 0, marginBottom: '22px' }}>
            <span>{fa ? 'قدم بعدی' : 'Next step'}</span>
            <span>/</span>
            <span>Binchitects</span>
          </div>
          <h2>{heading}</h2>
          <p>{text}</p>
          <div className="closing-actions">
            <Link to="/contact" className="btn btn-solid">
              {fa ? 'با ما حرف بزنید' : 'Talk to us'}
              <ArrowRight size={14} aria-hidden />
            </Link>
            <a
              href={SITE.quickStart}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-outline"
            >
              {fa ? 'از GitHub شروع کنید' : 'Start from GitHub'}
              <ArrowUpRight size={14} aria-hidden />
            </a>
          </div>
          <div className="closing-meta">
            <span>AGPL-3.0-only</span>
            <span>·</span>
            <span>{fa ? 'مجوز تجاری موجود است' : 'Commercial licence available'}</span>
            <span>·</span>
            <span>{fa ? 'بدون ابر فروشنده' : 'No vendor cloud'}</span>
            <span>·</span>
            <span>{fa ? 'یک پروژهٔ Binchitects' : 'A Binchitects project'}</span>
          </div>
        </div>
        <div className="closing-figure">
          <EyeLine />
          <p className="micro" style={{ color: 'rgba(238,241,234,0.55)', marginTop: '10px' }}>
            {fa ? 'شکل ۰۹ — نمایهٔ نوری' : 'Fig. 09 — the optical index'}
          </p>
        </div>
      </div>
    </section>
  )
}
