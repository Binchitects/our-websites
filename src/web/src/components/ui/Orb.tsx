import { useId } from 'react'
import { cn } from '@/lib/cn'

/**
 * The eye of Argus, drawn rather than an image: rings that turn slowly, an iris
 * with a highlight, and a blink every few seconds. It is the site's one
 * ornament; everything else is type and evidence.
 */
export function Orb({ className, compact = false }: { className?: string; compact?: boolean }) {
  const id = useId().replace(/:/g, '')
  const iris = `iris-${id}`
  const sclera = `sclera-${id}`
  const clip = `clip-${id}`

  return (
    <div className={cn('orb aspect-square w-full', compact ? 'max-w-[220px]' : 'max-w-[420px]', className)}>
      <div className="orb-ring orbit" aria-hidden />
      <div className="orb-ring orb-ring-2 orbit orbit-reverse orbit-slow" aria-hidden />
      <div className="orb-ring orb-ring-3 orbit orbit-slow" aria-hidden />

      <svg
        viewBox="0 0 240 160"
        className={cn('relative w-[74%] float-slow', compact && 'w-[68%]')}
        role="img"
        aria-label="The eye of Argus"
      >
        <defs>
          <radialGradient id={iris} cx="0.42" cy="0.26" r="0.9">
            <stop offset="0" stopColor="#2fd6ff" />
            <stop offset="0.48" stopColor="#1673e8" />
            <stop offset="1" stopColor="#0a3db5" />
          </radialGradient>
          <linearGradient id={sclera} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#d9e6fb" />
          </linearGradient>
          <clipPath id={clip}>
            <path d="M14 80 C48 24 192 24 226 80 C192 136 48 136 14 80 Z" />
          </clipPath>
        </defs>

        <g className="eye-blink">
          <path
            d="M14 80 C48 24 192 24 226 80 C192 136 48 136 14 80 Z"
            fill={`url(#${sclera})`}
            stroke="rgba(206,236,255,0.65)"
            strokeWidth="1"
          />
          <g clipPath={`url(#${clip})`}>
            <circle cx="120" cy="80" r="41" fill={`url(#${iris})`} />
            <circle cx="120" cy="80" r="41" fill="none" stroke="rgba(4,20,60,0.55)" strokeWidth="1.5" />
            <circle
              cx="120"
              cy="80"
              r="27"
              fill="none"
              stroke="rgba(160,225,255,0.28)"
              strokeWidth="1"
              strokeDasharray="2 4"
            />
            <circle cx="120" cy="80" r="17" fill="#050d20" />
            <circle cx="131" cy="68" r="6.5" fill="#ffffff" opacity="0.92" />
            <circle cx="110" cy="93" r="2.6" fill="#9fe3ff" opacity="0.65" />
          </g>
          <path
            d="M14 80 C48 24 192 24 226 80"
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1"
          />
        </g>

        <g fill="#cfe9ff" opacity="0.85">
          <circle cx="120" cy="8" r="2" />
          <circle cx="232" cy="80" r="1.6" />
          <circle cx="120" cy="152" r="1.6" />
          <circle cx="8" cy="80" r="2" />
        </g>
      </svg>
    </div>
  )
}
