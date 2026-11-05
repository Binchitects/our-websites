import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Chapter, ChapterHead } from '@/components/ui/Chapter'

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

/** Chapter five: the assurance record. */
export function AssuranceChapter() {
  return (
    <Chapter number="05" label="Assurance" id="assurance">
      <ChapterHead
        title="Yours to run. Yours to prove."
        standfirst="A platform that keeps your work inside your network is only useful if you can show that it did. Identity, isolation, the network and the audit trail are part of the product, not a policy written around it."
        action={
          <Link to="/security" className="arrow-link">
            Security and compliance
            <ArrowRight size={13} aria-hidden />
          </Link>
        }
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
            {FRAMEWORKS.map(([name, scope]) => (
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

      <div className="spread mt-xl">
        <div>
          <div className="subhead">
            <h3>Four controls</h3>
            <span className="micro">Checked live</span>
          </div>
          <div className="runbook">
            {CONTROLS.map((control, index) => (
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
            A mapping is not a certificate. Your auditor certifies the organisation; ARGUS gives
            them the controls, the checks and the evidence to review.
          </blockquote>
          <figcaption>— The compliance guide</figcaption>
        </figure>
      </div>
    </Chapter>
  )
}
