import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { EyeLine } from '@/components/ui/Eye'
import { SITE } from '@/lib/content'
import { useSeo } from '@/lib/seo'

export function NotFound() {
  useSeo({
    title: 'Page not found — ARGUS',
    description: 'That page does not exist. Start from the platform, Code Arena, Argus, or the source.',
    path: '/404',
  })

  return (
    <section className="notfound">
      <div className="shell notfound-inner">
        <div>
          <p className="notfound-code" aria-hidden>
            404
          </p>
          <h1 className="mt-m">The eye found nothing here.</h1>
          <p>
            The page may have moved, or never existed. Everything else is a step away.
          </p>
          <div className="row mt-m">
            <Link to="/" className="btn btn-solid">
              <ArrowLeft size={14} aria-hidden />
              Back to the start
            </Link>
            <a href={SITE.github} target="_blank" rel="noreferrer noopener" className="btn btn-outline">
              Source
              <ArrowUpRight size={14} aria-hidden />
            </a>
          </div>
          <div className="dateline mt-l">
            <Link to="/platform" className="text-link">
              Platform
            </Link>
            <Link to="/code-arena" className="text-link">
              Code Arena
            </Link>
            <Link to="/argus" className="text-link">
              Argus
            </Link>
            <Link to="/security" className="text-link">
              Security
            </Link>
            <Link to="/contact" className="text-link">
              Contact
            </Link>
          </div>
        </div>
        <div className="notfound-figure">
          <EyeLine />
        </div>
      </div>
    </section>
  )
}
