import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CodeArenaWindow } from '@/components/product/CodeArenaWindow'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { CtaBand } from '@/components/ui/CtaBand'
import { Faq } from '@/components/ui/Faq'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SITE } from '@/lib/content'
import { useSeo } from '@/lib/seo'
import { routeMeta } from '@/lib/route-meta'

const install = `# Linux and macOS — installed from your own Arena
$ curl -fsSL https://arena.internal/api/downloads/code-arena/install.sh | sh

# Windows (PowerShell)
$ irm https://arena.internal/api/downloads/code-arena/install.ps1 | iex

# Then, in a project folder
$ code-arena login --url https://arena.internal
$ cd your-project && code-arena`

const ideFeatures = [
  {
    title: 'The editor you expect',
    body: 'Tabs, breadcrumbs, an Outline and language servers, with a debugger beside them. The page is laid out as VS Code is, so nobody has to learn a new editor to use the agent.',
  },
  {
    title: 'Search and a code index',
    body: 'Find a file, a symbol or a phrase — or ask by what the code does. Code Arena indexes the project so the agent finds the right file with fewer tokens than grep.',
  },
  {
    title: 'Git and terminals',
    body: 'The repository’s branches and changes, and real terminals, in the same page. The agent runs commands where you can watch them, and its tests are the ones you would run.',
  },
  {
    title: 'Plans, not surprises',
    body: 'For long work it plans first and you approve the plan. Each step is grounded in the code and done only once its check passes — and a step can be undone.',
  },
  {
    title: 'Sessions that stay whole',
    body: 'Big results are set aside, older ones cleared before anything is summarized, and the agent can read every earlier message back by number. The next session carries a half-done plan on.',
  },
  {
    title: 'Work that runs in parallel',
    body: 'Steps that wait for nothing run at once, and a short Python program can call the agent’s tools many times in one go. Its sub-agents can be watched at work.',
  },
]

const selfManaging = [
  {
    title: 'One file',
    body: 'A self-contained .NET program for Linux, macOS and Windows. No runtime to install, no package manager, no dependency tree on the developer machine.',
  },
  {
    title: 'Keeps itself current',
    body: 'It asks the Arena it is signed in to, once a day, and updates itself from there with the size and SHA-256 checked. Admin → Overview names who still runs an old build.',
  },
  {
    title: 'Signed by your server',
    body: 'The installer checks the build against a list your Arena signed, and the Windows builds carry an Authenticode signature from the same certificate.',
  },
  {
    title: 'Offline by design',
    body: 'It talks only to your Arena and never to the internet, so it works on a network with no way out. It reports its version to your Arena, so admins can see who runs an old build, and has nowhere else to report to.',
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
      'The project folder it was started in, and the Arena tools the person may use — web search, Python in the sandbox, pictures, speech, Argus’s code search, plugins and knowledge — acting as that person, within that person’s rights and budget.',
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
      <PageHero
        eyebrow="Code Arena"
        title={
          <>
            Your code, your agent,
            <br />
            <span className="gradient-text">your IDE.</span>
          </>
        }
        lead="A coding agent that reads, changes and runs the code in a project folder, with a full IDE around it in the browser. It talks only to your Arena — so it works where the internet does not, as the person it is signed in as."
        actions={[
          { label: 'Read the manual', href: SITE.codeArenaDocs, external: true, primary: true },
          { label: 'See the platform', href: '/platform' },
        ]}
        meta={
          <div className="mono flex flex-wrap gap-x-6 gap-y-2 text-[10px] tracking-[0.13em] text-faint uppercase">
            <span>Linux · macOS · Windows</span>
            <span>One file</span>
            <span>Signed builds</span>
            <span>Works air-gapped</span>
          </div>
        }
        aside={
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="panel p-5">
              <p className="mono text-[9.5px] tracking-[0.16em] text-accent uppercase">Install</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                One line from your Arena&apos;s <span className="text-ink">Connect your tools</span>,
                checked against the SHA-256 your Arena lists.
              </p>
            </div>
            <div className="panel p-5">
              <p className="mono text-[9.5px] tracking-[0.16em] text-accent uppercase">Same rights</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                Every tool acts as the signed-in person: their key, their model rights, their budget.
              </p>
            </div>
            <div className="panel p-5">
              <p className="mono text-[9.5px] tracking-[0.16em] text-accent uppercase">Same memory</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                A session is synced with the web chat, and the project keeps its long memory in{' '}
                <span className="text-ink">.remember/</span>.
              </p>
            </div>
          </div>
        }
      />

      <section className="section-tight">
        <div className="shell">
          <Reveal>
            <CodeArenaWindow />
          </Reveal>
          <Reveal delay={100} className="mt-10 grid gap-7 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-end">
            <div>
              <h2 className="display-3">Start it where the code is.</h2>
              <p className="body-copy mt-3 max-w-[46ch]">
                Install it from your Arena, sign in once, and run it in a project folder. The IDE
                opens in the browser; <span className="mono text-[12.5px] text-ink">code-arena chat</span>{' '}
                keeps the agent in the terminal if that is where you work.
              </p>
              <Link to="/contact" className="link-arrow mt-5">
                Ask for a walkthrough
                <ArrowRight size={14} aria-hidden />
              </Link>
            </div>
            <CodeBlock code={install} label="from your own Arena" className="w-full" />
          </Reveal>
        </div>
      </section>

      <section className="section border-t border-line">
        <div className="shell">
          <SectionHeading
            eyebrow="The IDE"
            title="An IDE you already know, around an agent that shows its work."
            lead="Nothing new to learn: the folder, the editor, search, git, terminals and the debugger are where you expect them. What is new is that the agent beside them is inside your network, with your rights."
          />

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ideFeatures.map((feature, index) => (
              <Reveal key={feature.title} delay={Math.min(index * 60, 240)}>
                <article className="card h-full">
                  <span className="mono text-[10px] text-faint">0{index + 1}</span>
                  <h3 className="mt-3 text-[15.5px] font-[580] tracking-[-0.015em]">{feature.title}</h3>
                  <p className="mt-2 text-[13px] leading-[1.67] text-muted">{feature.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-line">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16">
          <Reveal>
            <p className="eyebrow">One file</p>
            <h2 className="display-2 mt-5 max-w-[15ch]">It looks after itself, so you can forget it.</h2>
            <p className="lead mt-5 max-w-[48ch]">
              There is nothing to install on a developer&apos;s machine but the program, and nothing
              to keep current by hand. The Arena serves the builds; the program takes them.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {selfManaging.map((item) => (
                <div key={item.title} className="panel p-5">
                  <h3 className="text-[13.5px] font-[560]">{item.title}</h3>
                  <p className="mt-2 text-[12.5px] leading-[1.6] text-muted">{item.body}</p>
                </div>
              ))}
            </div>
            <p className="mono mt-5 text-[10px] leading-relaxed text-faint">
              CODE_ARENA_DIR puts it elsewhere · CODE_ARENA_CA trusts a private CA · Windows on Arm
              is built too.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="panel overflow-hidden">
              <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
                <span className="mono text-[9.5px] tracking-[0.14em] text-faint uppercase">
                  A session, from plan to check
                </span>
                <span className="mono flex items-center gap-1.5 text-[9px] text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" /> approved
                </span>
              </div>
              <ol className="divide-y divide-line">
                {[
                  ['01', 'Read the plan', 'Steps, files and checks, before a single edit. You approve it.'],
                  ['02', 'Ground each step', 'The agent reads the code first; a step that finds nothing stops and says so.'],
                  ['03', 'Run the check', 'A test, a build, a linter — the check the step named. Done only when it passes.'],
                  ['04', 'Undo, or carry on', 'A step can be undone. A half-done plan is carried into the next session.'],
                ].map(([number, title, body]) => (
                  <li key={number} className="flex gap-4 px-5 py-4">
                    <span className="mono text-[10px] text-accent">{number}</span>
                    <div>
                      <p className="text-[13px] font-[540] text-ink">{title}</p>
                      <p className="mt-1 text-[12px] leading-relaxed text-muted">{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section border-t border-line">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Questions</p>
            <h2 className="display-2 mt-5 max-w-[13ch]">Before you install it.</h2>
            <a
              href={SITE.codeArenaDocs}
              target="_blank"
              rel="noreferrer noopener"
              className="link-arrow mt-6"
            >
              The Code Arena manual
              <ArrowUpRight size={14} aria-hidden />
            </a>
          </Reveal>
          <Reveal delay={100}>
            <Faq items={faqs} />
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Give every developer the same agent."
        lead="One Arena, one key for each person, one agent that works inside your network. We can set up a walkthrough on your own repository."
      />
    </>
  )
}
