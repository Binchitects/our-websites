import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ArchitecturePlate } from '@/components/product/ArchitecturePlate'
import { ArticleOpener } from '@/components/ui/ArticleOpener'
import { Chapter, ChapterHead } from '@/components/ui/Chapter'
import { CtaBand } from '@/components/ui/CtaBand'
import { IndexList } from '@/components/ui/IndexList'
import { Plate } from '@/components/ui/Plate'
import { ENGINES, PLATFORM_GROUPS, SITE } from '@/lib/content'
import { routeMeta } from '@/lib/route-meta'
import { useSeo } from '@/lib/seo'

const oneSignIn = [
  'A chat with thinking levels and files',
  'Code Arena: the agent and the browser IDE',
  'Argus: the code index over MCP',
  'Studio for pictures, voices and 3D',
  'Meetings with minutes and actions',
  'Agents and apps built in Studio',
  'Memory shared by the chat and the code',
  'SSO, LDAP, 2FA and per-person keys',
]

export function Platform() {
  useSeo({ ...routeMeta('/platform'), path: '/platform' })

  return (
    <>
      <ArticleOpener
        section="The platform"
        title={
          <>
            Everything the work needs.
            <br />
            <em>Nothing that leaves.</em>
          </>
        }
        standfirst="A chat that does real work, a coding agent with its own IDE, a studio, meetings, agents and a code index — sharing one sign-in, one memory, one set of rights and one budget for each person."
        actions={[
          { label: 'Read the docs', href: SITE.docs, external: true, solid: true },
          { label: 'See Code Arena', href: '/code-arena' },
        ]}
        aside={
          <>
            <p className="micro micro-ink">One sign-in</p>
            <ul className="mini-list" style={{ marginTop: '10px' }}>
              {oneSignIn.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </>
        }
      />

      {PLATFORM_GROUPS.map((group, index) => (
        <Chapter
          key={group.eyebrow}
          number={String(index + 1).padStart(2, '0')}
          label={group.eyebrow}
        >
          <ChapterHead title={group.title} standfirst={group.body} />
          <IndexList
            items={group.features.map((feature) => ({
              title: feature.title,
              desc: feature.body,
              tag: feature.tag,
            }))}
          />
        </Chapter>
      ))}

      <Chapter number="04" label="Under the hood">
        <ChapterHead
          title="A stack you can explain to an auditor."
          standfirst="A .NET 10 app and API with a React web app, behind Traefik. The API keeps the ledger, the keys, the rights and the audit log. Your GPUs run the models through a gateway. Argus mirrors GitLab with a read-only token."
          action={
            <a href={SITE.architecture} target="_blank" rel="noreferrer noopener" className="arrow-link">
              Read the architecture
              <ArrowUpRight size={13} aria-hidden />
            </a>
          }
        />

        <Plate
          figure="FIG. 02"
          caption="The only way in is Traefik. State stays in Postgres and the sandboxes; the models stay on your GPUs; GitLab is read-only."
        >
          <ArchitecturePlate />
        </Plate>

        <div className="spread mt-l">
          <div>
            <div className="subhead">
              <h3>Any open model</h3>
              <span className="micro">Chosen at install</span>
            </div>
            <p className="body">
              llama.cpp takes GGUF, vLLM and SGLang take their own formats. Model cards and licences
              are shown before any download; embeddings can run on the CPU so the GPU stays for
              answers.
            </p>
            <div className="row mt-s">
              {ENGINES.map((engine) => (
                <span key={engine} className="mono" style={{ fontSize: '9px', color: 'var(--muted)' }}>
                  {engine}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="subhead">
              <h3>On your hardware</h3>
              <span className="micro">Or in your cluster</span>
            </div>
            <p className="body">
              One host with Docker, rootless Podman, GPUs across several servers, an offline .run
              file, or a Helm chart that rolls without a gap. The stack is yours to shape.
            </p>
            <div className="row mt-s">
              <Link to="/contact" className="arrow-link">
                Plan a deployment
                <ArrowRight size={13} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </Chapter>

      <CtaBand
        title={
          <>
            A platform, not a <em>purchase order.</em>
          </>
        }
        lead="Tell us what you run today — the models, the GitLab, the sign-in you already have — and we will map the deployment, the licence and the first week."
      />
    </>
  )
}
