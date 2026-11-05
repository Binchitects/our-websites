import { Link } from 'react-router-dom'
import { ArgusMark } from '@/components/brand/ArgusMark'
import { cn } from '@/lib/cn'

/**
 * The masthead mark: an eye drawn in ink, the word Argus in Archivo with an
 * iris-blue full stop, and the publisher's red-orange tag beneath.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn('brand', className)} aria-label="Argus Arena — home">
      <ArgusMark className="brand-mark" />
      <span className="brand-text">
        <span className="brand-name">
          Argus Arena<span className="period">.</span>
        </span>
        <span className="brand-sub">Binchitects</span>
      </span>
    </Link>
  )
}
