import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

/**
 * The mark is the product's own icon: the A that folds into an eye. The
 * wordmark is set rather than drawn, so it stays crisp at every size.
 */
export function Logo({ className, markOnly = false }: { className?: string; markOnly?: boolean }) {
  return (
    <Link
      to="/"
      className={cn('group inline-flex items-center gap-2.5', className)}
      aria-label="ARGUS home"
    >
      <img
        src="/favicon.svg"
        alt=""
        width={34}
        height={34}
        className="h-[34px] w-[34px] rounded-[9px] shadow-[0_6px_20px_-8px_rgba(46,200,255,0.55)] transition-transform duration-300 group-hover:scale-[1.04]"
      />
      {!markOnly && (
        <span className="flex flex-col leading-none">
          <span className="text-[14px] font-semibold tracking-[0.2em] text-ink">ARGUS</span>
          <span className="mono mt-[5px] text-[8px] tracking-[0.34em] text-faint">ARENA</span>
        </span>
      )}
    </Link>
  )
}
