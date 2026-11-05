import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { EyeLine } from '@/components/ui/Eye'
import { SITE } from '@/lib/content'

/** The closing spread: one iris-blue page, one statement, one eye. */
export function CtaBand({
  title = (
    <>
      Bring your AI <em>home.</em>
    </>
  ),
  lead = 'Run the chat, the coding agent and the code index on hardware you already own. We will help you choose the right licence and the right shape of deployment.',
}: {
  title?: React.ReactNode
  lead?: string
}) {
  return (
    <section className="closing">
      <div className="shell closing-inner">
        <div>
          <div className="closing-meta" style={{ marginTop: 0, marginBottom: '22px' }}>
            <span>Next step</span>
            <span>/</span>
            <span>Binchitects</span>
          </div>
          <h2>{title}</h2>
          <p>{lead}</p>
          <div className="closing-actions">
            <Link to="/contact" className="btn btn-solid">
              Talk to us
              <ArrowRight size={14} aria-hidden />
            </Link>
            <a
              href={SITE.quickStart}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-outline"
            >
              Start from GitHub
              <ArrowUpRight size={14} aria-hidden />
            </a>
          </div>
          <div className="closing-meta">
            <span>AGPL-3.0-only</span>
            <span>·</span>
            <span>Commercial licence available</span>
            <span>·</span>
            <span>No vendor cloud</span>
            <span>·</span>
            <span>A Binchitects project</span>
          </div>
        </div>
        <div className="closing-figure">
          <EyeLine />
          <p className="micro" style={{ color: 'rgba(238,241,234,0.55)', marginTop: '10px' }}>
            Fig. 09 — the optical index
          </p>
        </div>
      </div>
    </section>
  )
}
