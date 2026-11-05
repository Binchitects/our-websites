import { ArrowUpRight, Boxes, Container, Database, ExternalLink, HardDrive } from 'lucide-react'
import { ArchitectureDiagram } from '@/components/product/ArchitectureDiagram'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SITE } from '@/lib/content'

const steps = [
  {
    number: '01',
    title: 'Fill in one .env',
    body: 'Your domain, the folder models live in, the first model, six secrets. The installer can ask every setting, and arenactl changes them later.',
  },
  {
    number: '02',
    title: 'Bring the stack up',
    body: 'docker compose up -d. The app fetches its first model and the media models itself, and Traefik serves the only way in.',
  },
  {
    number: '03',
    title: 'Sign in and invite people',
    body: (
      <>
        Open <span className="mono text-[12px] text-accent">https://your-arena</span>, sign in as
        admin with the password from .env, then add people and groups. Their rights follow your
        GitLab.
      </>
    ),
  },
]

const quickStart = `$ git clone https://github.com/Binchitects/argus
$ cd argus/deploy && cp .env.example .env   # domain, models, secrets
$ docker compose up -d                       # open https://your-arena`

const options = [
  {
    icon: HardDrive,
    title: 'Air-gapped installs',
    body: 'One .run file carries every image, the app and the checks. It installs only the features you choose.',
    href: `${SITE.deployment}#offline-install`,
  },
  {
    icon: Container,
    title: 'Rootless Podman',
    body: 'Run without root on 8080 and 8443, and spread GPUs across more than one server.',
    href: SITE.deployment,
  },
  {
    icon: Boxes,
    title: 'Helm chart',
    body: 'A chart that rolls without a gap and grows with its load, after the cluster is checked for you.',
    href: `${SITE.deployment}#helm`,
  },
  {
    icon: Database,
    title: 'Your Postgres',
    body: 'Bring an external Postgres 16 or newer, or let the stack keep its own; backups go where you say.',
    href: SITE.deployment,
  },
]

export function DeploySection() {
  return (
    <section className="section border-t border-line">
      <div className="shell">
        <SectionHeading
          eyebrow="Deploy"
          title="From clone to sign‑in in an afternoon."
          lead="A Linux host with Docker and an NVIDIA GPU is the whole requirement. One .env, one compose up, and the stack fetches its first model itself. For a host with no internet, one file does the same."
        />

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <Reveal>
            <div className="relative">
              <span
                className="absolute top-2 bottom-2 left-[15px] w-px bg-gradient-to-b from-accent/40 via-line to-transparent"
                aria-hidden
              />
              <ol className="relative space-y-8">
              {steps.map((step) => (
                <li key={step.number} className="relative flex gap-5">
                  <span className="mono z-10 grid h-8 w-8 flex-none place-items-center rounded-full border border-line-strong bg-surface text-[10px] text-accent">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-[15.5px] font-[560] tracking-[-0.015em]">{step.title}</h3>
                    <p className="mt-2 max-w-[44ch] text-[13.5px] leading-[1.65] text-muted">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <CodeBlock code={quickStart} label="on a Linux host with Docker" />
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
              <a
                href={SITE.deployment}
                target="_blank"
                rel="noreferrer noopener"
                className="link-arrow"
              >
                Deployment guide
                <ArrowUpRight size={14} aria-hidden />
              </a>
              <a
                href={SITE.architecture}
                target="_blank"
                rel="noreferrer noopener"
                className="mono inline-flex items-center gap-1.5 text-[10px] tracking-[0.1em] text-faint uppercase transition-colors hover:text-ink"
              >
                <ExternalLink size={11} aria-hidden />
                Architecture
              </a>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {options.map((option, index) => {
            const Icon = option.icon
            return (
              <Reveal key={option.title} delay={index * 60}>
                <a
                  href={option.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="card group h-full !p-5"
                >
                  <span className="icon-tile !h-9 !w-9 !rounded-[9px]">
                    <Icon size={16} strokeWidth={1.7} aria-hidden />
                  </span>
                  <h3 className="mt-4 text-[13.5px] font-[560]">{option.title}</h3>
                  <p className="mt-1.5 text-[12.5px] leading-[1.6] text-muted">{option.body}</p>
                </a>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={80} className="mt-12">
          <ArchitectureDiagram />
        </Reveal>
      </div>
    </section>
  )
}
