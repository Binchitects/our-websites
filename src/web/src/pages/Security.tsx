import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ArticleOpener } from '@/components/ui/ArticleOpener'
import { Chapter, ChapterHead } from '@/components/ui/Chapter'
import { CtaBand } from '@/components/ui/CtaBand'
import { Faq } from '@/components/ui/Faq'
import { IndexList } from '@/components/ui/IndexList'
import { SITE } from '@/lib/content'
import { routeMeta } from '@/lib/route-meta'
import { useSeo } from '@/lib/seo'

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

export function Security() {
  useSeo({ ...routeMeta('/security'), path: '/security' })

  return (
    <>
      <ArticleOpener
        section="Security and compliance"
        title={
          <>
            Yours to run.
            <br />
            <em>Yours to prove.</em>
          </>
        }
        standfirst="A platform that keeps your work inside your network is only worth what you can show. Identity, isolation, the network and the audit trail are in the product; the frameworks are mapped clause by clause; the evidence is one download."
        actions={[
          { label: 'Read the compliance guide', href: SITE.compliance, external: true, solid: true },
          { label: 'Talk to us', href: '/contact?topic=security' },
        ]}
        aside={
          <>
            <p className="micro micro-ink">Controls, checked live</p>
            <ul className="mini-list" style={{ marginTop: '10px' }}>
              <li>SSO, LDAP and two-factor sign-in</li>
              <li>A key, a budget and model rights for each person</li>
              <li>Allow and block lists at the gateway</li>
              <li>An audit log nobody changes unseen</li>
              <li>Evidence in one download</li>
            </ul>
          </>
        }
      />

      <Chapter number="01" label="Frameworks">
        <ChapterHead
          title="Fourteen frameworks, every clause mapped."
          standfirst="Not a badge wall: each clause is mapped to the control that satisfies it and the check that keeps it. The ten named here are in the product today; four more are mapped alongside them."
        />

        <div className="table-scroll">
          <table className="table spec-table">
            <thead>
              <tr>
                <th scope="col">Framework</th>
                <th scope="col">What it covers</th>
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
                <td>HIPAA, the GDPR and the rest of the set, each with its clauses and templates.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="note mt-s">
          <strong>A mapping is not a certificate.</strong>
          Your auditor certifies your organisation; ARGUS gives them the controls, the checks and the
          evidence to review.
        </p>
      </Chapter>

      <Chapter number="02" label="Controls">
        <ChapterHead
          title="Four questions, answered in the product."
          standfirst="Who gets in, what can reach it, what is kept apart, and what can be proved — the same four questions a security reviewer asks, answered by a running system rather than a policy PDF."
        />

        <div className="spread spread-start">
          <div className="runbook">
            {controls.map((control, index) => (
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
              An audit log nobody changes unseen is worth more than a policy that says they would not.
            </blockquote>
            <figcaption>— The compliance guide</figcaption>
          </figure>
        </div>
      </Chapter>

      <Chapter number="03" label="Evidence">
        <ChapterHead
          title="The audit is a review, not a rebuild."
          standfirst="A risk register, the Statement of Applicability, the policies, the suppliers and the AI systems are kept beside the controls they belong to. Readiness is shown per framework, and each check says what it found."
          action={
            <a href={SITE.compliance} target="_blank" rel="noreferrer noopener" className="arrow-link">
              The compliance documentation
              <ArrowUpRight size={13} aria-hidden />
            </a>
          }
        />
        <IndexList items={evidence} />
      </Chapter>

      <Chapter number="04" label="Deployment">
        <ChapterHead
          title="The network is part of the threat model."
          standfirst="An air-gapped stack is only as sealed as its edge. The way in, the certificates, the containers and the builds that developers run are all settings you can inspect."
        />
        <IndexList items={deployment} />
      </Chapter>

      <Chapter number="05" label="Questions">
        <ChapterHead
          title="For the security review."
          standfirst="The four questions a reviewer asks before a deployment is approved."
          action={
            <Link to="/contact?topic=security" className="arrow-link">
              Ask us directly
              <ArrowRight size={13} aria-hidden />
            </Link>
          }
        />
        <Faq items={faqs} />

        <p className="note mt-s">
          <strong>Reported a vulnerability?</strong>
          The security policy says how to reach us and what to expect. Please do not open a public
          issue for a vulnerability.
        </p>
      </Chapter>

      <CtaBand
        title={
          <>
            Bring your <em>security team.</em>
          </>
        }
        lead="We will go through the controls, the mapping and the evidence with them, then plan a deployment that fits the network you already have."
      />
    </>
  )
}
