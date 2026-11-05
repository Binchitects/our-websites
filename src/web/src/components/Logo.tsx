import { Link } from 'react-router-dom'
import { EyeMark } from '@/components/ui/Eye'
import { cn } from '@/lib/cn'

/**
 * The masthead mark: an eye drawn in ink, the word Argus in Newsreader with an
 * iris-blue full stop, and the publisher's line beneath.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn('brand', className)} aria-label="Argus Arena — home">
      <EyeMark className="brand-mark" />
      <span className="brand-text">
        <span className="brand-name">
          Argus<span className="period">.</span>
        </span>
        <span className="brand-sub">Arena by Binchitects</span>
      </span>
    </Link>
  )
}
