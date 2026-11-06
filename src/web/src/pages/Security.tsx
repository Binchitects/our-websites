import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from '@/components/ui/LocalLink'

import { ArticleOpener } from '@/components/ui/ArticleOpener'
import { Chapter, ChapterHead } from '@/components/ui/Chapter'
import { CtaBand } from '@/components/ui/CtaBand'
import { Faq } from '@/components/ui/Faq'
import { IndexList } from '@/components/ui/IndexList'
import { SITE } from '@/lib/site'
import { usePageSeo } from '@/lib/seo'
import { useLang } from '@/lib/i18n'

const frameworks = [
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

const controls = [
  {
    title: 'Who gets in',
    desc: 'SSO over OIDC or SAML, LDAP and two-factor sign-in. Each person has their own key, with its own limits, model rights and budget. Groups decide which models and tools a team may use.',
  },
  {
    title: 'What can reach it',
    desc: 'Traefik is the only way in. Allow and block lists of addresses and ranges — IPv4 and IPv6, with comments — are checked before every request to every host, and a list that would shut out the admin saving it is refused.',
  },
  {
    title: 'What is kept apart',
    desc: 'Argus filters every query to the caller’s GitLab rights in SQL. Sandboxes hold many people at once. Tools run as the person, never above them, and every request to a model is in the ledger.',
  },
  {
    title: 'What can be proved',
    desc: 'An audit log nobody changes unseen, a prompt log behind its own permission, controls checked live, and the evidence for each one in a single download.',
  },
]

const evidence = [
  {
    title: 'A risk register and a Statement of Applicability',
    desc: 'The record an auditor asks for first, kept beside the controls it belongs to.',
  },
  {
    title: 'Policies per framework',
    desc: 'Each clause mapped, not a single generic policy stretched over fourteen frameworks.',
  },
  {
    title: 'Audits and suppliers',
    desc: 'Tracked beside the AI systems they cover, with the evidence for each.',
  },
  {
    title: 'Control checks, live',
    desc: 'The check’s own result is the evidence — not a screenshot taken once a year.',
  },
  {
    title: 'The whole set, one download',
    desc: 'The evidence set as a single archive for the auditor.',
  },
  {
    title: 'Readiness per certification',
    desc: 'Shown per framework, not as one number for everything.',
  },
]

const deployment = [
  {
    title: 'TLS at the edge',
    desc: 'Your own CA, or real certificates from Let’s Encrypt through ACME. HSTS is a setting, and it is yours to choose.',
  },
  {
    title: 'A network you can pin shut',
    desc: 'Allow and block lists at the gateway, an IP allow list for the whole stack, and an air-gapped install that never reaches out.',
  },
  {
    title: 'Rootless where you want it',
    desc: 'Rootless Podman on ports 8080 and 8443, read-only container roots, and data in folders you name and back up.',
  },
  {
    title: 'Signed tools, private CA',
    desc: 'Code Arena’s builds are signed by the stack’s own CA, listed with their SHA-256, and the Windows builds carry Authenticode.',
  },
]

const faqs = [
  {
    question: 'Is the stack itself certified?',
    answer:
      'No. Certification is an audit of your organisation and its controls, not a property of software. What ARGUS gives you is the mapped controls, the checks that keep them, and the evidence an auditor asks for — so the audit is a review of what you already have.',
  },
  {
    question: 'Do you see our data?',
    answer:
      'No. There is no vendor cloud in the path: the models, the index, the database and the audit log run on your hardware. What leaves your network is only what you configure — a web search provider, or a GitLab you host — and the browser agent can be limited to sites you name.',
  },
  {
    question: 'What does an auditor actually receive?',
    answer:
      'The control set and its live checks, the audit log, the prompt log where permitted, and the framework mapping — clause by clause — with the whole evidence set downloadable at once.',
  },
  {
    question: 'Can we run it without internet?',
    answer:
      'Yes. The offline installer carries every image and the app in one file, installs only the features you select, and needs no registry at install time. Models are copied in or fetched once when you allow it.',
  },
]


const frameworksFa = [
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

const controlsFa = [
  { title: 'چه کسی وارد می‌شود', desc: 'SSO روی OIDC یا SAML، LDAP و ورود دو مرحله‌ای. هر فرد کلید خودش را دارد، با محدودیت‌ها، اختیارات مدل و بودجهٔ خودش. گروه‌ها تعیین می‌کنند یک تیم از کدام مدل‌ها و ابزارها استفاده کند.' },
  { title: 'چه چیزی می‌تواند برسد', desc: 'Traefik تنها راه ورود است. فهرست‌های مجاز و مسدود آدرس‌ها و بازه‌ها — IPv4 و IPv6، با توضیح — پیش از هر درخواست به هر میزبان بررسی می‌شوند و فهرستی که مدیر ذخیره‌کننده را بیرون کند رد می‌شود.' },
  { title: 'چه چیزی جدا نگه داشته می‌شود', desc: 'Argus هر پرسش را در SQL به اختیارات GitLab پرسشگر محدود می‌کند. سندباکس‌ها هم‌زمان چند نفر را نگه می‌دارند. ابزارها با هویت فرد اجرا می‌شوند، نه بالاتر از او، و هر درخواست به مدل در دفتر ثبت است.' },
  { title: 'چه چیزی قابل اثبات است', desc: 'گزارش ممیزی‌ای که کسی پنهانی تغییرش نمی‌دهد، گزارش prompt پشت مجوز اختصاصی، کنترل‌های بررسی‌شده به‌صورت زنده و شواهد هرکدام در یک دانلود.' },
]

const evidenceFa = [
  { title: 'دفتر ریسک و بیانیهٔ کاربردپذیری', desc: 'همان سندی که ممیز اول می‌خواهد، کنار کنترل‌هایی که به آن‌ها تعلق دارد.' },
  { title: 'سیاست برای هر چارچوب', desc: 'هر بند نقشه‌برداری شده، نه یک سیاست عمومی که روی چهارده چارچوب کشیده شده باشد.' },
  { title: 'ممیزی‌ها و تأمین‌کنندگان', desc: 'کنار سیستم‌های هوش مصنوعی‌ای که پوشش می‌دهند ردیابی می‌شوند، با شواهد هرکدام.' },
  { title: 'بررسی کنترل‌ها، به‌صورت زنده', desc: 'نتیجهٔ خود بررسی شاهد است — نه اسکرین‌شاتی که سالی یک‌بار گرفته شده.' },
  { title: 'کل مجموعه، یک دانلود', desc: 'مجموعهٔ شواهد به‌صورت یک آرشیو برای ممیز.' },
  { title: 'آمادگی برای هر گواهی', desc: 'برای هر چارچوب نشان داده می‌شود، نه یک عدد برای همه.' },
]

const deploymentFa = [
  { title: 'TLS در لبه', desc: 'CA خودتان، یا گواهی‌های واقعی از Let’s Encrypt با ACME. HSTS یک تنظیم است و انتخابش با شما.' },
  { title: 'شبکه‌ای که می‌توانید ببندید', desc: 'فهرست‌های مجاز و مسدود در gateway، فهرست مجاز IP برای کل استک و نصب جداافتاده‌ای که هرگز بیرون نمی‌رود.' },
  { title: 'بدون root هرجا که بخواهید', desc: 'Podman بدون root روی پورت‌های ۸۰۸۰ و ۸۴۴۳، ریشه‌های فقط‌خواندنی کانتینر و داده در پوشه‌هایی که نام می‌برید و پشتیبان می‌گیرید.' },
  { title: 'ابزارهای امضاشده، CA خصوصی', desc: 'buildهای Code Arena با CA خود استک امضا می‌شوند، با SHA-256 فهرست می‌شوند و buildهای Windows Authenticode دارند.' },
]

const faqsFa = [
  { question: 'آیا خود استک گواهی‌نامه دارد؟', answer: 'خیر. گواهی‌نامه ممیزی سازمان و کنترل‌های شماست، نه ویژگی نرم‌افزار. آنچه ARGUS می‌دهد کنترل‌های نقشه‌برداری‌شده، بررسی‌هایی که نگهشان می‌دارند و شواهدی است که ممیز می‌خواهد — پس ممیزی بازبینی چیزی است که همین حالا دارید.' },
  { question: 'آیا شما دادهٔ ما را می‌بینید؟', answer: 'خیر. هیچ ابر فروشنده‌ای در مسیر نیست: مدل‌ها، نمایه، پایگاه‌داده و گزارش ممیزی روی سخت‌افزار شما اجرا می‌شوند. تنها چیزی که از شبکه‌تان بیرون می‌رود همان است که پیکربندی می‌کنید — یک ارائه‌دهندهٔ جست‌وجوی وب یا GitLabی که خودتان میزبانی می‌کنید — و عامل مرورگر را می‌توان به سایت‌هایی که نام می‌برید محدود کرد.' },
  { question: 'ممیز واقعاً چه چیزی دریافت می‌کند؟', answer: 'مجموعهٔ کنترل‌ها و بررسی‌های زنده‌اش، گزارش ممیزی، گزارش prompt در جایی که مجاز است و نقشه‌برداری چارچوب — بند‌به‌بند — با کل مجموعهٔ شواهد که یک‌جا دانلود می‌شود.' },
  { question: 'آیا می‌توانیم بدون اینترنت اجرا کنیم؟', answer: 'بله. نصب‌کنندهٔ آفلاین همهٔ ایمیج‌ها و برنامه را در یک فایل دارد، فقط قابلیت‌هایی را نصب می‌کند که انتخاب کنید و در زمان نصب به registry نیاز ندارد. مدل‌ها کپی می‌شوند یا یک‌بار وقتی اجازه دهید دریافت می‌شوند.' },
]

export function Security() {
  usePageSeo('/security')
  const fa = useLang() === 'fa'
  const fw = fa ? frameworksFa : frameworks
  const ctrls = fa ? controlsFa : controls
  const ev = fa ? evidenceFa : evidence
  const dep = fa ? deploymentFa : deployment
  const questions = fa ? faqsFa : faqs

  return (
    <>
      <ArticleOpener
        section={fa ? 'امنیت و انطباق' : 'Security and compliance'}
        title={
          <>
            {fa ? 'از آنِ شما برای اجرا.' : 'Yours to run.'}
            <br />
            <em>{fa ? 'از آنِ شما برای اثبات.' : 'Yours to prove.'}</em>
          </>
        }
        standfirst={
          fa
            ? 'پلتفرمی که کارتان را داخل شبکه نگه می‌دارد فقط به اندازهٔ چیزی ارزش دارد که می‌توانید نشان دهید. هویت، جداسازی، شبکه و رد ممیزی در محصول‌اند؛ چارچوب‌ها بند‌به‌بند نقشه‌برداری شده‌اند؛ شواهد یک دانلود است.'
            : 'A platform that keeps your work inside your network is only worth what you can show. Identity, isolation, the network and the audit trail are in the product; the frameworks are mapped clause by clause; the evidence is one download.'
        }
        actions={[
          { label: fa ? 'راهنمای انطباق را بخوانید' : 'Read the compliance guide', href: SITE.compliance, external: true, solid: true },
          { label: fa ? 'با ما حرف بزنید' : 'Talk to us', href: '/contact?topic=security' },
        ]}
        aside={
          <>
            <p className="micro micro-ink">{fa ? 'کنترل‌ها، بررسی زنده' : 'Controls, checked live'}</p>
            <ul className="mini-list" style={{ marginTop: '10px' }}>
              <li>{fa ? 'SSO، LDAP و ورود دو مرحله‌ای' : 'SSO, LDAP and two-factor sign-in'}</li>
              <li>{fa ? 'یک کلید، یک بودجه و اختیار مدل برای هر فرد' : 'A key, a budget and model rights for each person'}</li>
              <li>{fa ? 'فهرست مجاز و مسدود در gateway' : 'Allow and block lists at the gateway'}</li>
              <li>{fa ? 'گزارش ممیزی‌ای که کسی پنهانی تغییرش نمی‌دهد' : 'An audit log nobody changes unseen'}</li>
              <li>{fa ? 'شواهد در یک دانلود' : 'Evidence in one download'}</li>
            </ul>
          </>
        }
      />

      <Chapter number="01" label={fa ? 'چارچوب‌ها' : 'Frameworks'}>
        <ChapterHead
          title={fa ? 'چهارده چارچوب، هر بند نقشه‌برداری‌شده.' : 'Fourteen frameworks, every clause mapped.'}
          standfirst={
            fa
              ? 'دیوار نشان نیست: هر بند به کنترلی که آن را برمی‌آورد و بررسی‌ای که نگهش می‌دارد نقشه‌برداری شده. ده موردی که اینجا نام برده شده امروز در محصول است؛ چهار مورد دیگر هم کنارشان نقشه‌برداری شده‌اند.'
              : 'Not a badge wall: each clause is mapped to the control that satisfies it and the check that keeps it. The ten named here are in the product today; four more are mapped alongside them.'
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
              {fw.map(([name, scope]) => (
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

        <p className="note mt-s">
          <strong>{fa ? 'نقشه‌برداری گواهی نیست.' : 'A mapping is not a certificate.'}</strong>
          {fa
            ? ' ممیز شما سازمان را گواهی می‌کند؛ ARGUS کنترل‌ها، بررسی‌ها و شواهد را برای بازبینی در اختیارش می‌گذارد.'
            : ' Your auditor certifies your organisation; ARGUS gives them the controls, the checks and the evidence to review.'}
        </p>
      </Chapter>

      <Chapter number="02" label={fa ? 'کنترل‌ها' : 'Controls'}>
        <ChapterHead
          title={fa ? 'چهار پرسش، پاسخ‌داده‌شده در محصول.' : 'Four questions, answered in the product.'}
          standfirst={
            fa
              ? 'چه کسی وارد می‌شود، چه چیزی می‌تواند برسد، چه چیزی جدا نگه داشته می‌شود و چه چیزی قابل اثبات است — همان چهار پرسشی که بازبین امنیتی می‌پرسد، پاسخ‌داده‌شده توسط یک سیستم در حال اجرا نه یک PDF سیاست.'
              : 'Who gets in, what can reach it, what is kept apart, and what can be proved — the same four questions a security reviewer asks, answered by a running system rather than a policy PDF.'
          }
        />

        <div className="spread spread-start">
          <div className="runbook">
            {ctrls.map((control, index) => (
              <div key={control.title} className="runbook-step">
                <span className="runbook-num">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{control.title}</h3>
                  <p>{control.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <figure className="quote">
            <blockquote>
              {fa
                ? 'گزارش ممیزی‌ای که کسی پنهانی تغییرش نمی‌دهد از سیاستی که می‌گوید تغییرش نمی‌دهند ارزش بیشتری دارد.'
                : 'An audit log nobody changes unseen is worth more than a policy that says they would not.'}
            </blockquote>
            <figcaption>{fa ? '— راهنمای انطباق' : '— The compliance guide'}</figcaption>
          </figure>
        </div>
      </Chapter>

      <Chapter number="03" label={fa ? 'شواهد' : 'Evidence'}>
        <ChapterHead
          title={fa ? 'ممیزی یک بازبینی است، نه بازسازی.' : 'The audit is a review, not a rebuild.'}
          standfirst={
            fa
              ? 'دفتر ریسک، بیانیهٔ کاربردپذیری، سیاست‌ها، تأمین‌کنندگان و سیستم‌های هوش مصنوعی کنار کنترل‌هایی که به آن‌ها تعلق دارند نگه داشته می‌شوند. آمادگی برای هر چارچوب نشان داده می‌شود و هر بررسی می‌گوید چه یافت.'
              : 'A risk register, the Statement of Applicability, the policies, the suppliers and the AI systems are kept beside the controls they belong to. Readiness is shown per framework, and each check says what it found.'
          }
          action={
            <a href={SITE.compliance} target="_blank" rel="noreferrer noopener" className="arrow-link">
              {fa ? 'مستندات انطباق' : 'The compliance documentation'}
              <ArrowUpRight size={13} aria-hidden />
            </a>
          }
        />
        <IndexList items={ev} />
      </Chapter>

      <Chapter number="04" label={fa ? 'استقرار' : 'Deployment'}>
        <ChapterHead
          title={fa ? 'شبکه بخشی از مدل تهدید است.' : 'The network is part of the threat model.'}
          standfirst={
            fa
              ? 'یک استک جداافتاده فقط به اندازهٔ لبه‌اش بسته است. راه ورود، گواهی‌ها، کانتینرها و buildهایی که توسعه‌دهندگان اجرا می‌کنند همه تنظیماتی هستند که می‌توانید بررسی کنید.'
              : 'An air-gapped stack is only as sealed as its edge. The way in, the certificates, the containers and the builds that developers run are all settings you can inspect.'
          }
        />
        <IndexList items={dep} />
      </Chapter>

      <Chapter number="05" label={fa ? 'پرسش‌ها' : 'Questions'}>
        <ChapterHead
          title={fa ? 'برای بازبینی امنیتی.' : 'For the security review.'}
          standfirst={fa ? 'چهار پرسشی که بازبین پیش از تأیید استقرار می‌پرسد.' : 'The four questions a reviewer asks before a deployment is approved.'}
          action={
            <Link to="/contact?topic=security" className="arrow-link">
              {fa ? 'مستقیم بپرسید' : 'Ask us directly'}
              <ArrowRight size={13} aria-hidden />
            </Link>
          }
        />
        <Faq items={questions} />

        <p className="note mt-s">
          <strong>{fa ? 'آسیب‌پذیری گزارش کرده‌اید؟' : 'Reported a vulnerability?'}</strong>
          {fa
            ? ' سیاست امنیتی می‌گوید چطور به ما برسید و چه انتظاری داشته باشید. لطفاً برای آسیب‌پذیری ایشوی عمومی باز نکنید.'
            : ' The security policy says how to reach us and what to expect. Please do not open a public issue for a vulnerability.'}
        </p>
      </Chapter>

      <CtaBand
        title={
          fa ? (
            <>
              <em>تیم امنیتی‌تان</em> را بیاورید.
            </>
          ) : (
            <>
              Bring your <em>security team.</em>
            </>
          )
        }
        lead={
          fa
            ? 'کنترل‌ها، نقشه‌برداری و شواهد را با آن‌ها مرور می‌کنیم و بعد استقراری را طراحی می‌کنیم که با شبکهٔ فعلی‌تان جور باشد.'
            : 'We will go through the controls, the mapping and the evidence with them, then plan a deployment that fits the network you already have.'
        }
      />
    </>
  )
}
