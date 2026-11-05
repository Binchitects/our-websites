import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Chapter, ChapterHead } from '@/components/ui/Chapter'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { SITE } from '@/lib/content'

const quickStart = `$ git clone https://github.com/Binchitects/argus
$ cd argus/deploy && cp .env.example .env   # domain, models, secrets
$ docker compose up -d                       # open https://your-arena`

const steps = [
  {
    title: 'Fill in one .env',
    body: 'Your domain, the folder models live in, the first model, six secrets. The installer can ask every setting, and arenactl changes them later.',
  },
  {
    title: 'Bring the stack up',
    body: 'docker compose up -d. The app fetches its first model and the media models itself, and Traefik serves the only way in.',
  },
  {
    title: 'Sign in and invite people',
    body: 'Open your Arena as admin, then add people and groups. Their rights follow your GitLab.',
  },
]

const modes = [
  ['Air-gapped', 'One .run file carries every image and the checks; installs only the features you choose.', 'a host with no internet'],
  ['Rootless Podman', 'No root, ports 8080 and 8443, GPUs across more than one server.', 'a locked-down host'],
  ['Helm chart', 'Rolls without a gap and grows with load, after the cluster is checked.', 'a Kubernetes cluster'],
  ['External Postgres', 'Postgres 16 or newer, or the stack’s own; backups go where you say.', 'an existing database'],
]

/** Chapter four: the runbook. */
export function DeployChapter() {
  return (
    <Chapter number="04" label="Deploy" id="deploy">
      <ChapterHead
        title="From clone to sign‑in in an afternoon."
        standfirst="A Linux host with Docker and an NVIDIA GPU is the whole requirement. One .env, one compose up, and the stack fetches its first model itself. For a host with no internet, one file does the same."
        action={
          <a href={SITE.deployment} target="_blank" rel="noreferrer noopener" className="arrow-link">
            Deployment guide
            <ArrowUpRight size={13} aria-hidden />
          </a>
        }
      />

      <div className="spread spread-start">
        <div>
          <div className="runbook">
            {steps.map((step, index) => (
              <div key={step.title} className="runbook-step">
                <span className="runbook-num">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="note mt-s">
            <strong>No internet at all?</strong>
            The offline installer carries every image, the app and the checks in one .run file, and
            installs only the features you select.
          </p>
        </div>

        <div>
          <CodeBlock code={quickStart} label="on a Linux host with Docker" />
          <div className="row mt-m">
            <a href={SITE.architecture} target="_blank" rel="noreferrer noopener" className="arrow-link">
              The architecture
              <ArrowUpRight size={13} aria-hidden />
            </a>
            <a href={SITE.docs} target="_blank" rel="noreferrer noopener" className="arrow-link">
              Documentation
              <ArrowRight size={13} aria-hidden />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-xl">
        <div className="subhead">
          <h3>Four ways to run it</h3>
          <span className="micro">The same stack</span>
        </div>
        <div className="table-scroll">
          <table className="table spec-table">
            <thead>
              <tr>
                <th scope="col">Mode</th>
                <th scope="col">What it gives</th>
                <th scope="col">When</th>
              </tr>
            </thead>
            <tbody>
              {modes.map(([mode, gives, when]) => (
                <tr key={mode}>
                  <td>{mode}</td>
                  <td>{gives}</td>
                  <td>{when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Chapter>
  )
}
