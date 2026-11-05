import { ArrowRight } from 'lucide-react'
import { Link } from '@/components/ui/LocalLink'

import { Chapter, ChapterHead } from '@/components/ui/Chapter'
import { useLang } from '@/lib/i18n'

const FRAMEWORKS = [
  ['ISO 27001', 'An information security management system, clause by clause.'],
  ['ISO 42001', 'A management system for AI, its risks and its lifecycle.'],
  ['ISO 22301', 'Business continuity, so an outage has a written answer.'],
  ['SOC 2', 'The trust services criteria: security, availability, confidentiality.'],
  ['PCI DSS', 'Where card data is in scope, and what surrounds it.'],
  ['NIST CSF', 'Identify, protect, detect, respond and recover.'],
  ['NIST 800-53', 'The security and privacy control catalogue.'],
  ['NIST 800-171', 'Protecting controlled unclassified information.'],
  ['NIST AI RMF', 'Governing, mapping, measuring and managing AI risk.'],
  ['EU AI Act', 'Obligations that follow the classification of the system.'],
]

const CONTROLS = [
  {
    title: 'Identity',
    body: 'SSO over OIDC or SAML, LDAP and two-factor sign-in. A key of one’s own, each with its limits and its budget.',
  },
  {
    title: 'Isolation',
    body: 'Groups decide models and tools. Sandboxes hold many people at once. Every tool acts as the person, never above them.',
  },
  {
    title: 'Network',
    body: 'Traefik is the only way in, with allow and block lists of addresses and ranges checked before every request.',
  },
  {
    title: 'Evidence',
    body: 'An audit log nobody changes unseen, a prompt log behind its own permission, controls checked live, evidence in one download.',
  },
]


const FRAMEWORKS_FA = [
  ['ISO 27001', 'یک سیستم مدیریت امنیت اطلاعات، بند‌به‌بند.'],
  ['ISO 42001', 'یک سیستم مدیریت برای هوش مصنوعی، ریسک‌ها و چرخهٔ عمرش.'],
  ['ISO 22301', 'تداوم کسب‌وکار، تا یک قطعی پاسخ مکتوب داشته باشد.'],
  ['SOC 2', 'معیارهای خدمات اعتماد: امنیت، دسترس‌پذیری، محرمانگی.'],
  ['PCI DSS', 'جایی که دادهٔ کارت در دامنه است و آنچه دورش را می‌گیرد.'],
  ['NIST CSF', 'شناسایی، حفاظت، کشف، پاسخ و بازیابی.'],
  ['NIST 800-53', 'فهرست کنترل‌های امنیت و حریم خصوصی.'],
  ['NIST 800-171', 'حفاظت از اطلاعات طبقه‌بندی‌نشدهٔ کنترل‌شده.'],
  ['NIST AI RMF', 'حکمرانی، نقشه‌برداری، سنجش و مدیریت ریسک هوش مصنوعی.'],
  ['EU AI Act', 'تعهداتی که از طبقه‌بندی سیستم پیروی می‌کنند.'],
]

const CONTROLS_FA = [
  { title: 'هویت', body: 'SSO روی OIDC یا SAML، LDAP و ورود دو مرحله‌ای. کلید شخصی، هرکدام با محدودیت و بودجهٔ خود.' },
  { title: 'جداسازی', body: 'گروه‌ها مدل‌ها و ابزارها را تعیین می‌کنند. سندباکس‌ها هم‌زمان چند نفر را نگه می‌دارند. هر ابزار با هویت فرد عمل می‌کند، نه بالاتر از او.' },
  { title: 'شبکه', body: 'Traefik تنها راه ورود است، با فهرست‌های مجاز و مسدود آدرس‌ها و بازه‌ها که پیش از هر درخواست بررسی می‌شوند.' },
  { title: 'شواهد', body: 'گزارش ممیزی‌ای که کسی پنهانی تغییرش نمی‌دهد، گزارش prompt پشت مجوز اختصاصی، کنترل‌های بررسی‌شده به‌صورت زنده و شواهد در یک دانلود.' },
]

/** Chapter five: the assurance record. */
export function AssuranceChapter() {
  const fa = useLang() === 'fa'
  const frameworks = fa ? FRAMEWORKS_FA : FRAMEWORKS
  const controls = fa ? CONTROLS_FA : CONTROLS

  return (
    <Chapter number="05" label={fa ? 'تضمین' : 'Assurance'} id="assurance">
      <ChapterHead
        title={fa ? 'از آنِ شما برای اجرا. از آنِ شما برای اثبات.' : 'Yours to run. Yours to prove.'}
        standfirst={
          fa
            ? 'پلتفرمی که کار شما را داخل شبکه‌تان نگه می‌دارد فقط وقتی مفید است که بتوانید نشان دهید این کار را کرده. هویت، جداسازی، شبکه و رد ممیزی بخشی از محصول‌اند، نه سیاستی که دور آن نوشته شده باشد.'
            : 'A platform that keeps your work inside your network is only useful if you can show that it did. Identity, isolation, the network and the audit trail are part of the product, not a policy written around it.'
        }
        action={
          <Link to="/security" className="arrow-link">
            {fa ? 'امنیت و انطباق' : 'Security and compliance'}
            <ArrowRight size={13} aria-hidden />
          </Link>
        }
      />

      <div className="table-scroll">
        <table className="table spec-table">
          <thead>
            <tr>
              <th scope="col">{fa ? 'چارچوب' : 'Framework'}</th>
              <th scope="col">{fa ? 'چه چیزی را پوشش می‌دهد' : 'What it covers'}</th>
            </tr>
          </thead>
          <tbody>
            {frameworks.map(([name, scope]) => (
              <tr key={name}>
                <td className="mono" style={{ fontSize: '11px' }}>
                  {name}
                </td>
                <td>{scope}</td>
              </tr>
            ))}
            <tr>
              <td className="mono" style={{ fontSize: '11px' }}>
                + four
              </td>
              <td>
                {fa
                  ? 'HIPAA، GDPR و بقیهٔ مجموعه، هرکدام با بندها و قالب‌های خود.'
                  : 'HIPAA, the GDPR and the rest of the set, each with its clauses and templates.'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="spread mt-xl">
        <div>
          <div className="subhead">
            <h3>{fa ? 'چهار کنترل' : 'Four controls'}</h3>
            <span className="micro">{fa ? 'بررسی زنده' : 'Checked live'}</span>
          </div>
          <div className="runbook">
            {controls.map((control, index) => (
              <div key={control.title} className="runbook-step">
                <span className="runbook-num">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{control.title}</h3>
                  <p>{control.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <figure className="quote">
          <blockquote>
            {fa
              ? 'نقشه‌برداری گواهی نیست. ممیز شما سازمان را گواهی می‌کند؛ ARGUS کنترل‌ها، بررسی‌ها و شواهد را برای بازبینی در اختیارش می‌گذارد.'
              : 'A mapping is not a certificate. Your auditor certifies the organisation; ARGUS gives them the controls, the checks and the evidence to review.'}
          </blockquote>
          <figcaption>{fa ? '— راهنمای انطباق' : '— The compliance guide'}</figcaption>
        </figure>
      </div>
    </Chapter>
  )
}
