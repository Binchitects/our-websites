import { ArrowRight, ClipboardCheck, Fingerprint, LockKeyhole, Network, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { COMPLIANCE_FRAMEWORKS } from '@/lib/content'

const pillars = [
  {
    icon: Fingerprint,
    title: 'Identity',
    body: 'SSO over OIDC or SAML, LDAP and two-factor sign-in. A key of one’s own, each with its limits and its budget.',
  },
  {
    icon: LockKeyhole,
    title: 'Isolation',
    body: 'Groups decide models and tools. Sandboxes hold many people at once. Every tool acts as the person, never above them.',
  },
  {
    icon: Network,
    title: 'Network',
    body: 'Traefik is the only way in, with allow and block lists of addresses and ranges checked before every request.',
  },
  {
    icon: ClipboardCheck,
    title: 'Evidence',
    body: 'An audit log nobody changes unseen, a prompt log behind its own permission, controls checked live, evidence in one download.',
  },
]

/** The trust story, kept concrete: who gets in, what is isolated, and what an auditor receives. */
export function TrustSection() {
  return (
    <section className="section border-t border-line">
      <div className="shell">
        <SectionHeading
          eyebrow="Trust"
          title="Yours to run. Yours to prove."
          lead="A platform that keeps your work inside your network is only useful if you can show that it did. Identity, isolation, the network and the audit trail are part of the product, not a policy document written around it."
        />

        <Reveal className="mt-10">
          <div className="flex flex-wrap gap-2">
            {COMPLIANCE_FRAMEWORKS.map((framework) => (
              <span key={framework} className="tag">
                <ShieldCheck size={11} className="text-accent" aria-hidden />
                {framework}
              </span>
            ))}
            <span className="tag text-faint">and four more</span>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <Reveal key={pillar.title} delay={index * 70}>
                <div className="card h-full">
                  <span className="icon-tile">
                    <Icon size={18} strokeWidth={1.6} aria-hidden />
                  </span>
                  <h3 className="mt-5 text-[15px] font-[580]">{pillar.title}</h3>
                  <p className="mt-2 text-[13px] leading-[1.65] text-muted">{pillar.body}</p>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mt-8 flex flex-wrap items-center gap-5">
          <Link to="/security" className="link-arrow">
            Security and compliance
            <ArrowRight size={14} aria-hidden />
          </Link>
          <span className="mono text-[10px] tracking-[0.1em] text-faint uppercase">
            fourteen frameworks, every clause mapped
          </span>
        </Reveal>
      </div>
    </section>
  )
}
