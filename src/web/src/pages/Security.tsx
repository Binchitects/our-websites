import { ArrowRight, ArrowUpRight, Check, Fingerprint, LockKeyhole, Network, ScrollText } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CtaBand } from '@/components/ui/CtaBand'
import { Faq } from '@/components/ui/Faq'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SITE } from '@/lib/content'
import { useSeo } from '@/lib/seo'
import { routeMeta } from '@/lib/route-meta'

const frameworks = [
  { name: 'ISO 27001', scope: 'An information security management system, clause by clause.' },
  { name: 'ISO 42001', scope: 'A management system for AI, its risks and its lifecycle.' },
  { name: 'ISO 22301', scope: 'Business continuity, so an outage has a written answer.' },
  { name: 'SOC 2', scope: 'The trust services criteria: security, availability, confidentiality.' },
  { name: 'PCI DSS', scope: 'Where card data is in scope, and what surrounds it.' },
  { name: 'NIST CSF', scope: 'Identify, protect, detect, respond and recover.' },
  { name: 'NIST 800-53', scope: 'The security and privacy control catalogue.' },
  { name: 'NIST 800-171', scope: 'Protecting controlled unclassified information.' },
  { name: 'NIST AI RMF', scope: 'Governing, mapping, measuring and managing AI risk.' },
  { name: 'EU AI Act', scope: 'Obligations that follow the risk classification of a system.' },
]

const pillars = [
  {
    icon: Fingerprint,
    title: 'Who gets in',
    body: 'SSO over OIDC or SAML, LDAP, and two-factor sign-in. Each person has their own key, with its own limits, model rights and budget. Groups decide which models and tools a team may use.',
  },
  {
    icon: Network,
    title: 'What can reach it',
    body: 'Traefik is the only way in. Allow and block lists of addresses and ranges — IPv4 and IPv6, with comments — are checked before every request to every host, and a list that would shut out the admin saving it is refused.',
  },
  {
    icon: LockKeyhole,
    title: 'What is kept apart',
    body: 'Argus filters every query to the caller’s GitLab rights in SQL. Sandboxes hold many people at once. Tools run as the person, never above them, and every request to a model is in the ledger.',
  },
  {
    icon: ScrollText,
    title: 'What can be proved',
    body: 'An audit log nobody changes unseen, a prompt log behind its own permission, controls checked live, and the evidence for each one in a single download.',
  },
]

const evidence = [
  'A risk register, a Statement of Applicability, and policies per framework',
  'Audits and suppliers tracked beside the AI systems they cover',
  'Every control checked live, with the check’s own result as the evidence',
  'The whole evidence set as one download for the auditor',
  'A prompt log behind its own permission, and an audit log that cannot be edited unseen',
  'Readiness shown per certification, not one number for everything',
]

const deployment = [
  {
    title: 'TLS at the edge',
    body: 'Your own CA, or real certificates from Let’s Encrypt through ACME. HSTS is a setting, and it is yours to choose.',
  },
  {
    title: 'A network you can pin shut',
    body: 'Allow and block lists at the gateway, an IP allow list for the whole stack, and an air-gapped install that never reaches out.',
  },
  {
    title: 'Rootless where you want it',
    body: 'Rootless Podman on ports 8080 and 8443, read-only container roots, and data in folders you name and back up.',
  },
  {
    title: 'Signed tools, private CA',
    body: 'Code Arena’s builds are signed by the stack’s own CA, listed with their SHA-256, and the Windows builds carry Authenticode.',
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

export function Security() {
  useSeo({ ...routeMeta('/security'), path: '/security' })

  return (
    <>
      <PageHero
        eyebrow="Security and compliance"
        title={
          <>
            Yours to run.
            <br />
            <span className="gradient-text">Yours to prove.</span>
          </>
        }
        lead="A platform that keeps your work inside your network is only worth what you can show. Identity, isolation, the network and the audit trail are in the product; the frameworks are mapped clause by clause; the evidence is one download."
        actions={[
          { label: 'Read the compliance guide', href: SITE.compliance, external: true, primary: true },
          { label: 'Talk to us', href: '/contact?topic=security' },
        ]}
        meta={
          <div className="mono flex flex-wrap gap-x-6 gap-y-2 text-[10px] tracking-[0.13em] text-faint uppercase">
            <span>SSO · LDAP · 2FA</span>
            <span>Tamper-evident audit</span>
            <span>Air-gapped installs</span>
          </div>
        }
        aside={
          <div className="panel overflow-hidden">
            <div className="border-b border-line px-5 py-4">
              <p className="mono text-[10px] tracking-[0.16em] text-accent uppercase">
                Controls, checked live
              </p>
            </div>
            <ul className="divide-y divide-line">
              {[
                'SSO, LDAP and two-factor sign-in',
                'A key, a budget and model rights for each person',
                'Allow and block lists checked at the gateway',
                'An audit log nobody changes unseen',
                'Live control checks and evidence in one download',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 px-5 py-3 text-[12.5px] text-muted">
                  <Check size={12} className="flex-none text-success" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-1.5 border-t border-line bg-surface/50 px-4 py-3">
              <span className="tag tag-accent">14 frameworks</span>
              <span className="tag">1 download</span>
            </div>
          </div>
        }
      />

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Frameworks"
            title="Fourteen frameworks, every clause mapped."
            lead="Not a badge wall: each clause is mapped to the control that satisfies it and the check that keeps it. The ten named here are in the product today; four more are mapped alongside them."
          />

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {frameworks.map((framework, index) => (
              <Reveal key={framework.name} delay={Math.min(index * 45, 240)}>
                <div className="flex h-full flex-col rounded-[12px] border border-line bg-surface/40 p-5">
                  <span className="mono text-[12px] font-medium tracking-[0.02em] text-ink">
                    {framework.name}
                  </span>
                  <span className="mt-2 text-[12px] leading-relaxed text-muted">{framework.scope}</span>
                </div>
              </Reveal>
            ))}
            <Reveal delay={240}>
              <div className="flex h-full flex-col justify-center rounded-[12px] border border-dashed border-line-strong p-5">
                <span className="mono text-[12px] text-faint">+ four more</span>
                <span className="mt-2 text-[12px] leading-relaxed text-muted">
                  HIPAA, the GDPR and the rest of the set, each with its own clauses, records and
                  templates.
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-5">
            <p className="mono text-[10px] leading-relaxed text-faint">
              A mapping is not a certificate. Your auditor certifies your organisation; ARGUS gives
              them the controls, the checks and the evidence to review.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section border-y border-line bg-[color-mix(in_srgb,var(--color-surface)_45%,transparent)]">
        <div className="shell">
          <SectionHeading
            eyebrow="The controls"
            title="Four questions, answered in the product."
            lead="Who gets in, what can reach it, what is kept apart, and what can be proved — the same four questions a security reviewer asks, answered by a running system rather than a policy PDF."
          />

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon
              return (
                <Reveal key={pillar.title} delay={index * 70}>
                  <article className="card h-full !p-7">
                    <span className="icon-tile">
                      <Icon size={18} strokeWidth={1.6} aria-hidden />
                    </span>
                    <h3 className="mt-5 text-[16px] font-[580]">{pillar.title}</h3>
                    <p className="mt-2 text-[13.5px] leading-[1.67] text-muted">{pillar.body}</p>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Evidence</p>
            <h2 className="display-2 mt-5 max-w-[14ch]">The audit is a review, not a rebuild.</h2>
            <p className="lead mt-5">
              A risk register, the Statement of Applicability, the policies, the suppliers and the AI
              systems are kept beside the controls they belong to. Readiness is shown per framework,
              and each check says what it found.
            </p>
            <a
              href={SITE.compliance}
              target="_blank"
              rel="noreferrer noopener"
              className="link-arrow mt-6"
            >
              The compliance documentation
              <ArrowUpRight size={14} aria-hidden />
            </a>
          </Reveal>

          <Reveal delay={120}>
            <ul className="panel divide-y divide-line overflow-hidden">
              {evidence.map((item) => (
                <li key={item} className="flex gap-3 px-5 py-4 text-[13px] leading-relaxed text-muted">
                  <span className="mt-[7px] h-1 w-1 flex-none rounded-full bg-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section border-t border-line">
        <div className="shell">
          <SectionHeading
            eyebrow="Deployment"
            title="The network is part of the threat model."
            lead="An air-gapped stack is only as sealed as its edge. The way in, the certificates, the containers and the builds that developers run are all settings you can inspect."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {deployment.map((item, index) => (
              <Reveal key={item.title} delay={index * 60}>
                <article className="card h-full">
                  <span className="mono text-[10px] text-faint">0{index + 1}</span>
                  <h3 className="mt-3 text-[14px] font-[580]">{item.title}</h3>
                  <p className="mt-2 text-[12.5px] leading-[1.65] text-muted">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <div className="panel flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[14.5px] font-[560]">Reported a vulnerability?</p>
                <p className="mt-1 text-[13px] text-muted">
                  The security policy says how to reach us and what to expect. Please do not open a
                  public issue for a vulnerability.
                </p>
              </div>
              <a
                href={SITE.securityPolicy}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-ghost btn-sm shrink-0"
              >
                Security policy
                <ArrowUpRight size={13} aria-hidden />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section border-t border-line">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Questions</p>
            <h2 className="display-2 mt-5 max-w-[13ch]">For the security review.</h2>
            <Link to="/contact?topic=security" className="link-arrow mt-6">
              Ask us directly
              <ArrowRight size={14} aria-hidden />
            </Link>
          </Reveal>
          <Reveal delay={100}>
            <Faq items={faqs} />
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Bring your security team."
        lead="We will go through the controls, the mapping and the evidence with them, then plan a deployment that fits the network you already have."
      />
    </>
  )
}
