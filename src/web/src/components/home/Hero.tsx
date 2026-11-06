import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from '@/components/ui/LocalLink'

import { ArgusSealFigure } from '@/components/brand/ArgusSeal'
import { Spectrum } from '@/components/ui/Spectrum'
import { SITE } from '@/lib/site'
import { useLang } from '@/lib/i18n'

/** The opening spread: the claim, the standfirst, and the instrument itself. */
export function Hero() {
  const fa = useLang() === 'fa'

  return (
    <section className="hero">
      <div className="shell">
        <div className="hero-dateline dateline">
          <span className="dateline-strong">Argus Arena</span>
          <span className="dot-sep">/</span>
          <span>{fa ? 'پلتفرم هوش مصنوعی خودمیزبان' : 'Self-hosted AI platform'}</span>
          <span className="dot-sep dateline-hide">/</span>
          <span className="dateline-hide">Binchitects</span>
          <span className="push">v{SITE.version}</span>
        </div>
        <Spectrum />

        <div className="hero-grid">
          <div>
            <h1>
              {fa ? 'هوشمندی،' : 'Intelligence,'}
              <br />
              <em>{fa ? 'داخل خانهٔ خودتان.' : 'kept in-house.'}</em>
            </h1>
            <p className="hero-lead">
              {fa
                ? 'Argus Arena پلتفرم هوش مصنوعی‌ای است که خودتان اجرا می‌کنید: چت، عامل کدنویسی Code Arena، نمایهٔ کد متکی بر GitLab شما، استودیو، جلسه‌ها، عامل‌ها — و شواهدی که ممیز می‌خواهد.'
                : 'Argus Arena is the AI platform you run yourself: a chat, Code Arena’s coding agent, a code index grounded in your GitLab, a studio, meetings, agents — and the evidence an auditor asks for.'}
            </p>
            <div className="hero-actions">
              <a
                href={SITE.quickStart}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-solid btn-lg"
              >
                {fa ? 'استک را مستقر کنید' : 'Deploy the stack'}
                <ArrowUpRight size={15} aria-hidden />
              </a>
              <Link to="/code-arena" className="btn btn-outline btn-lg">
                {fa ? 'Code Arena را ببینید' : 'Explore Code Arena'}
                <ArrowRight size={15} aria-hidden />
              </Link>
            </div>
            <div className="hero-meta">
              <span>AGPL-3.0-only</span>
              <span>·</span>
              <span>{fa ? 'نصب در شبکهٔ جداافتاده' : 'Air-gapped installs'}</span>
              <span>·</span>
              <span>vLLM · llama.cpp · SGLang</span>
            </div>
          </div>

          <ArgusSealFigure />
        </div>

        <div className="hero-foot">
          <p>
            {fa
              ? 'یک استک، یک ورود، یک مجموعه اختیارات. همان مدل‌ها به چت، عامل کدنویسی و نمایه خدمت می‌کنند — روی سخت‌افزاری که همین حالا دارید.'
              : 'One stack, one sign-in, one set of rights. The same models serve the chat, the coding agent and the index — on hardware you already own.'}
          </p>
          <a href="#index" className="index-link">
            {fa ? 'فهرست مطالب' : 'The contents'}
            <ArrowDown size={12} aria-hidden />
          </a>
        </div>
      </div>
    </section>
  )
}
