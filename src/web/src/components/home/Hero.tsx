import { ArrowRight, ArrowUpRight, Github } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ArenaWindow } from '@/components/product/ArenaWindow'
import { Orb } from '@/components/ui/Orb'
import { Reveal } from '@/components/ui/Reveal'
import { SITE } from '@/lib/content'

const stats = [
  { value: '1', label: 'stack', detail: 'one sign-in, one budget for each person' },
  { value: '34', label: 'MCP tools', detail: 'over your code, issues and docs' },
  { value: '14', label: 'frameworks', detail: 'mapped clause by clause' },
  { value: '3', label: 'engines', detail: 'llama.cpp · vLLM · SGLang' },
]

/** The first screen: the claim, the proof of craft, and the numbers behind it. */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute -top-52 left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(46,200,255,0.15),transparent)] blur-2xl"
        aria-hidden
      />

      <div className="shell relative pt-14 pb-10 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] lg:gap-8">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="tag tag-accent">
                <span className="dot" aria-hidden />
                v{SITE.version} · self-hosted
              </span>
              <span className="mono text-[10px] tracking-[0.16em] text-faint uppercase">
                .NET 10 · React
              </span>
            </div>

            <h1 className="display-1 mt-7">
              Your team’s AI.
              <br />
              Your hardware.
              <br />
              <span className="gradient-text">Your code.</span>
            </h1>

            <p className="lead mt-7 max-w-[53ch]">
              Argus Arena is the chat, the coding agent, the studio, the meetings and the code index
              — one stack you run inside your own network, on the GPUs you already own.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={SITE.quickStart}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-primary btn-lg"
              >
                Deploy the stack
                <ArrowUpRight size={16} aria-hidden />
              </a>
              <Link to="/code-arena" className="btn btn-ghost btn-lg">
                Explore Code Arena
                <ArrowRight size={16} aria-hidden />
              </Link>
            </div>

            <div className="mono mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] tracking-[0.13em] text-faint uppercase">
              <span>AGPL-3.0-only</span>
              <span>Air-gapped installs</span>
              <span>No vendor cloud</span>
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto flex max-w-[270px] justify-center sm:max-w-[340px] lg:mr-2 lg:ml-auto lg:max-w-[430px]">
              <Orb />
              <span className="tag absolute top-[8%] -left-2 hidden bg-canvas/80 backdrop-blur-sm xl:inline-flex">
                GitLab · read-only
              </span>
              <span className="tag absolute top-[46%] -left-10 hidden bg-canvas/80 backdrop-blur-sm xl:inline-flex">
                MCP · 34 tools
              </span>
              <span className="tag absolute -right-4 bottom-[18%] hidden bg-canvas/80 backdrop-blur-sm xl:inline-flex">
                SSO · 2FA
              </span>
            </div>
          </div>
        </div>

        <Reveal delay={120} className="relative mt-14 lg:mt-16">
          <div
            className="pointer-events-none absolute -inset-x-8 -top-16 h-48 bg-[radial-gradient(ellipse_at_center,rgba(46,200,255,0.14),transparent_70%)] blur-2xl"
            aria-hidden
          />
          <div className="relative mx-auto max-w-[1120px]">
            <ArenaWindow />

            <div className="absolute -top-5 right-6 hidden items-center gap-2 rounded-full border border-line bg-canvas/90 px-3.5 py-1.5 backdrop-blur md:flex">
              <span className="dot" aria-hidden />
              <span className="mono text-[10px] tracking-[0.06em] text-muted">
                Running on your GPUs
              </span>
            </div>
            <div className="absolute -bottom-5 left-6 hidden items-center gap-2 rounded-full border border-line bg-canvas/90 px-3.5 py-1.5 backdrop-blur md:flex">
              <Github size={12} className="text-accent" aria-hidden />
              <span className="mono text-[10px] tracking-[0.06em] text-muted">
                One stack · source included
              </span>
            </div>
          </div>
        </Reveal>

        <div className="mt-20 grid grid-cols-2 gap-y-8 border-t border-line pt-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={index > 0 ? 'md:border-l md:border-line md:pl-7' : undefined}
            >
              <div className="flex items-baseline gap-2">
                <span className="mono text-[26px] leading-none font-medium tracking-tight text-ink">
                  {stat.value}
                </span>
                <span className="mono text-[10px] tracking-[0.14em] text-faint uppercase">
                  {stat.label}
                </span>
              </div>
              <p className="mt-2 max-w-[22ch] text-[12px] leading-relaxed text-muted">{stat.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
