import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CodeArenaPlate } from '@/components/product/CodeArenaPlate'
import { ArticleOpener } from '@/components/ui/ArticleOpener'
import { Chapter, ChapterHead } from '@/components/ui/Chapter'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { CtaBand } from '@/components/ui/CtaBand'
import { Faq } from '@/components/ui/Faq'
import { IndexList } from '@/components/ui/IndexList'
import { Plate } from '@/components/ui/Plate'
import { SITE } from '@/lib/content'
import { routeMeta } from '@/lib/route-meta'
import { useSeo } from '@/lib/seo'

const install = `$ curl -fsSL https://arena.internal/api/downloads/code-arena/install.sh | sh
$ code-arena login --url https://arena.internal
$ cd your-project && code-arena`

const ideFeatures = [
  {
    title: 'The editor you expect',
    desc: 'Tabs, breadcrumbs, an Outline and language servers, with a debugger beside them, laid out as VS Code is.',
  },
  {
    title: 'Search and a code index',
    desc: 'Find a file, a symbol or a phrase — or ask by what the code does. Fewer tokens than grep.',
  },
  {
    title: 'Git and terminals',
    desc: 'Branches, changes and real terminals in the same page; the agent runs commands where you can watch.',
  },
  {
    title: 'Plans, not surprises',
    desc: 'For long work it plans first and you approve the plan. A step can be undone.',
  },
  {
    title: 'Sessions that stay whole',
    desc: 'Big results are set aside, older ones cleared before summarising, and every earlier message is readable by number.',
  },
  {
    title: 'Work that runs in parallel',
    desc: 'Steps that wait for nothing run at once; a short Python program can call the tools many times.',
  },
]

const plan = [
  ['Read the plan', 'Steps, files and checks, before a single edit. You approve it.'],
  ['Ground each step', 'The agent reads the code first; a step that finds nothing stops and says so.'],
  ['Run the check', 'A test, a build or a linter — the check the step named. Done only when it passes.'],
  ['Undo, or carry on', 'A step can be undone. A half-done plan is carried into the next session.'],
]

const selfManaging = [
  {
    title: 'One self-contained file',
    desc: 'A .NET program for Linux, macOS and Windows on Arm. No runtime, no package manager, no dependency tree on the developer’s machine.',
  },
  {
    title: 'Keeps itself current',
    desc: 'It asks the Arena it is signed in to, once a day, and updates itself from there with size and SHA-256 checked.',
  },
  {
    title: 'Signed by your server',
    desc: 'The installer checks the build against a list your Arena signed; Windows builds carry Authenticode from the same certificate.',
  },
  {
    title: 'Offline by design',
    desc: 'It talks only to your Arena and never to the internet. It reports its version so admins can see who runs an old build, and has nowhere else to report.',
  },
]

const faqs = [
  {
    question: 'Does the model run on the developer’s machine?',
    answer:
      'No. Code Arena is the IDE and the agent loop; the model runs in your Arena, on your GPUs, through the same gateway and the same key as the chat. A laptop needs no GPU.',
  },
  {
    question: 'Which systems are supported?',
    answer:
      'Linux, macOS and Windows, including Windows on Arm. It is one self-contained program with nothing to install, and there is a terminal mode (code-arena chat) for people who do not want the IDE.',
  },
  {
    question: 'What can the agent reach?',
    answer:
      'The project folder it was started in, and the Arena tools the person may use — web search, Python in the sandbox, pictures, speech, Argus’s code search, plugins and knowledge — acting as that person, within their rights and budget.',
  },
  {
    question: 'Do we need to open ports to the internet?',
    answer:
      'No. The IDE is served from the developer’s own machine, and the program talks out to your Arena only. On an air-gapped network it works the same way.',
  },
]

export function CodeArena() {
  useSeo({ ...routeMeta('/code-arena'), path: '/code-arena' })

  return (
    <>
      <ArticleOpener
        section="Code Arena"
        title={
          <>
            Your code, your agent,
            <br />
            <em>your IDE.</em>
          </>
        }
        standfirst="A coding agent that reads, changes and runs the code in a project folder, with a full IDE around it in the browser. It talks only to your Arena, so it works where the internet does not — as the person it is signed in as."
        actions={[
          { label: 'Read the manual', href: SITE.codeArenaDocs, external: true, solid: true },
          { label: 'See the platform', href: '/platform' },
        ]}
        aside={
          <>
            <p className="micro micro-ink">The short version</p>
            <ul className="mini-list" style={{ marginTop: '10px' }}>
              <li>One self-contained file, installed in one line</li>
              <li>Linux, macOS and Windows on Arm</li>
              <li>Signed by your Arena’s own CA</li>
              <li>Works on a network with no way out</li>
            </ul>
          </>
        }
      />

      <Chapter number="01" label="The IDE">
        <ChapterHead
          title="An IDE you already know, around an agent that shows its work."
          standfirst="Nothing new to learn: the folder, the editor, search, git, terminals and the debugger are where you expect them. What is new is that the agent beside them is inside your network, with your rights."
        />

        <Plate
          figure="FIG. 03"
          caption="A session from the plan to the check: one changed line, the check that passed, and the session still synced with the web chat."
        >
          <CodeArenaPlate />
        </Plate>

        <div className="mt-l">
          <IndexList items={ideFeatures} />
        </div>
      </Chapter>

      <Chapter number="02" label="The agent">
        <ChapterHead
          title="It plans first, then proves each step."
          standfirst="Long work does not go straight to an edit. The agent writes a plan, you approve it, and each step is grounded in the code and done only once its check passes."
        />

        <div className="spread spread-start">
          <div className="runbook">
            {plan.map(([title, body], index) => (
              <div key={title} className="runbook-step">
                <span className="runbook-num">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </div>
            ))}
          </div>

          <figure className="quote">
            <blockquote>
              The next session carries a half-done plan on. Nobody starts again because the day
              ended.
            </blockquote>
            <figcaption>— The Code Arena manual</figcaption>
          </figure>
        </div>
      </Chapter>

      <Chapter number="03" label="One file">
        <ChapterHead
          title="One file, and it looks after itself."
          standfirst="There is nothing to install on a developer’s machine but the program, and nothing to keep current by hand. The Arena serves the builds; the program takes them."
          action={
            <a href={SITE.codeArenaDocs} target="_blank" rel="noreferrer noopener" className="arrow-link">
              The Code Arena manual
              <ArrowUpRight size={13} aria-hidden />
            </a>
          }
        />

        <IndexList items={selfManaging} />

        <div className="spread spread-start mt-l">
          <CodeBlock code={install} label="from your own Arena" />
          <div>
            <div className="subhead">
              <h3>Windows, Arm and a private CA</h3>
              <span className="micro">Signed, listed, checked</span>
            </div>
            <p className="body">
              The installer checks the build against the SHA-256 list your Arena signed. The Windows
              builds carry Authenticode from the same certificate, so SmartScreen names the
              publisher. <span className="mono" style={{ fontSize: '11px' }}>CODE_ARENA_DIR</span>{' '}
              puts it elsewhere; <span className="mono" style={{ fontSize: '11px' }}>CODE_ARENA_CA</span>{' '}
              trusts a private CA.
            </p>
            <div className="row mt-s">
              <Link to="/contact" className="arrow-link">
                Ask for a walkthrough
                <ArrowRight size={13} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </Chapter>

      <Chapter number="04" label="Questions">
        <ChapterHead
          title="Before you install it."
          standfirst="The questions a developer and a security reviewer ask first."
          action={
            <a href={SITE.codeArenaDocs} target="_blank" rel="noreferrer noopener" className="arrow-link">
              Read the manual
              <ArrowUpRight size={13} aria-hidden />
            </a>
          }
        />
        <Faq items={faqs} />
      </Chapter>

      <CtaBand
        title={
          <>
            Give every developer <em>the same agent.</em>
          </>
        }
        lead="One Arena, one key for each person, one agent that works inside your network. We can set up a walkthrough on your own repository."
      />
    </>
  )
}
