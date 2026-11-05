import { ArrowLeft, Github } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Orb } from '@/components/ui/Orb'
import { SITE } from '@/lib/content'
import { useSeo } from '@/lib/seo'

export function NotFound() {
  useSeo({
    title: 'Page not found — ARGUS',
    description: 'That page does not exist. Start from the platform, Code Arena, Argus, or the source.',
    path: '/404',
  })

  return (
    <section className="relative overflow-hidden">
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="shell relative grid min-h-[62vh] place-items-center py-20 text-center">
        <div>
          <div className="mx-auto w-[160px]">
            <Orb compact />
          </div>
          <p className="mono mt-8 text-[10px] tracking-[0.22em] text-accent uppercase">404</p>
          <h1 className="display-2 mt-4">The eye found nothing here.</h1>
          <p className="lead mx-auto mt-4 max-w-[44ch]">
            The page may have moved, or never existed. Everything else is a step away.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/" className="btn btn-primary">
              <ArrowLeft size={15} aria-hidden />
              Back to the start
            </Link>
            <a
              href={SITE.github}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-ghost"
            >
              <Github size={15} aria-hidden />
              Source
            </a>
          </div>
          <div className="mono mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] tracking-[0.1em] text-faint uppercase">
            <Link to="/platform" className="hover:text-ink">Platform</Link>
            <Link to="/code-arena" className="hover:text-ink">Code Arena</Link>
            <Link to="/argus" className="hover:text-ink">Argus</Link>
            <Link to="/security" className="hover:text-ink">Security</Link>
            <Link to="/contact" className="hover:text-ink">Contact</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
