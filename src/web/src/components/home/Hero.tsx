import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ArgusSealFigure } from '@/components/brand/ArgusSeal'
import { Spectrum } from '@/components/ui/Spectrum'
import { SITE } from '@/lib/content'

/** The opening spread: the claim, the standfirst, and the instrument itself. */
export function Hero() {
  return (
    <section className="hero">
      <div className="shell">
        <div className="hero-dateline dateline">
          <span className="dateline-strong">Argus Arena</span>
          <span className="dot-sep">/</span>
          <span>Self-hosted AI platform</span>
          <span className="dot-sep dateline-hide">/</span>
          <span className="dateline-hide">Binchitects</span>
          <span className="push">v{SITE.version}</span>
        </div>
        <Spectrum />

        <div className="hero-grid">
          <div>
            <h1>
              Intelligence,
              <br />
              <em>kept in-house.</em>
            </h1>
            <p className="hero-lead">
              Argus Arena is the AI platform you run yourself: a chat, Code Arena&rsquo;s coding
              agent, a code index grounded in your GitLab, a studio, meetings, agents — and the
              evidence an auditor asks for.
            </p>
            <div className="hero-actions">
              <a
                href={SITE.quickStart}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-solid btn-lg"
              >
                Deploy the stack
                <ArrowUpRight size={15} aria-hidden />
              </a>
              <Link to="/code-arena" className="btn btn-outline btn-lg">
                Explore Code Arena
                <ArrowRight size={15} aria-hidden />
              </Link>
            </div>
            <div className="hero-meta">
              <span>AGPL-3.0-only</span>
              <span>·</span>
              <span>Air-gapped installs</span>
              <span>·</span>
              <span>vLLM · llama.cpp · SGLang</span>
            </div>
          </div>

          <ArgusSealFigure />
        </div>

        <div className="hero-foot">
          <p>
            One stack, one sign-in, one set of rights. The same models serve the chat, the coding
            agent and the index — on hardware you already own.
          </p>
          <a href="#index" className="index-link">
            The contents
            <ArrowDown size={12} aria-hidden />
          </a>
        </div>
      </div>
    </section>
  )
}
