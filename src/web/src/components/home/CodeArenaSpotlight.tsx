import { ArrowRight, Check, CircleDot, TerminalSquare } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CodeArenaWindow } from '@/components/product/CodeArenaWindow'
import { Reveal } from '@/components/ui/Reveal'
import { SITE } from '@/lib/content'

const bullets = [
  'One self-contained file, installed in one line from your Arena',
  'The IDE you already know: editor, search, git, terminals, debugger, language servers',
  'Plans first; each step is grounded in the code and done only once its check passes',
  'Works as the person — same key, same rights, same budget as the chat',
  'Keeps itself current, and the session meets the chat’s memory',
  'No internet needed: it talks to your Arena and nothing else',
]

export function CodeArenaSpotlight() {
  return (
    <section className="section relative border-y border-line bg-[color-mix(in_srgb,var(--color-surface)_45%,transparent)]">
      <div className="shell">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Code Arena</p>
            <h2 className="display-2 mt-5 max-w-[15ch]">
              A coding agent with its own IDE, inside your network.
            </h2>
            <p className="lead mt-5 max-w-[48ch]">
              Our own agent, with a full IDE around it in the browser: the folder&apos;s files, an
              editor, search, git, terminals and a debugger — and a code index that finds code by
              what it does or by name.
            </p>

            <ul className="mt-8 space-y-3">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-[13.5px] leading-[1.6] text-muted">
                  <span className="mt-0.5 grid h-[18px] w-[18px] flex-none place-items-center rounded-full border border-[color-mix(in_srgb,var(--color-success)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-success)_10%,transparent)] text-success">
                    <Check size={11} aria-hidden />
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3 rounded-xl border border-line bg-surface/50 px-4 py-3">
              <span className="icon-tile !h-8 !w-8 !rounded-lg">
                <TerminalSquare size={14} strokeWidth={1.8} aria-hidden />
              </span>
              <span className="mono text-[11px] leading-relaxed text-muted">
                one file · one install line · no runtime
              </span>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-5">
              <Link to="/code-arena" className="link-arrow">
                More about Code Arena
                <ArrowRight size={14} aria-hidden />
              </Link>
              <a
                href={SITE.codeArenaDocs}
                target="_blank"
                rel="noreferrer noopener"
                className="mono inline-flex items-center gap-1.5 text-[10px] tracking-[0.1em] text-faint uppercase transition-colors hover:text-ink"
              >
                <CircleDot size={11} aria-hidden />
                Read the manual
              </a>
            </div>
          </Reveal>

          <Reveal delay={140} className="min-w-0 lg:-mr-10">
            <CodeArenaWindow />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
