import { useId } from 'react'

/**
 * The Argus mark: a roundel with the eye in it. A filled disc, a bone sclera,
 * one iris-blue iris, and a dial of ticks around the rim. The disc is the page's
 * ink and the eye is its paper, so the mark flips with the theme; the iris stays
 * blue. It is drawn rather than traced, so it stays crisp at 16px and at 2m.
 */
export function ArgusMark({
  className,
  label = 'Argus Arena',
}: {
  className?: string
  label?: string
}) {
  const id = useId().replace(/:/g, '')
  const ticks = Array.from({ length: 24 }, (_, index) => {
    const angle = (index * 15 * Math.PI) / 180
    const inner = index % 6 === 0 ? 24.4 : 25.4
    const outer = 27.2
    return (
      <line
        key={index}
        x1={32 + inner * Math.cos(angle)}
        y1={32 + inner * Math.sin(angle)}
        x2={32 + outer * Math.cos(angle)}
        y2={32 + outer * Math.sin(angle)}
        stroke="var(--paper)"
        strokeWidth={index % 6 === 0 ? 0.7 : 0.45}
        opacity={index % 6 === 0 ? 0.6 : 0.35}
      />
    )
  })

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label={label}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={`mark-iris-${id}`} cx="0.38" cy="0.28" r="0.9">
          <stop offset="0" stopColor="var(--iris)" />
          <stop offset="1" stopColor="var(--iris-deep)" />
        </radialGradient>
      </defs>

      <circle cx="32" cy="32" r="31" fill="currentColor" />
      <circle
        cx="32"
        cy="32"
        r="28.4"
        fill="none"
        stroke="var(--paper)"
        strokeWidth="0.45"
        opacity="0.28"
      />
      {ticks}

      <path
        d="M9.5 32C16.5 18 47.5 18 54.5 32C47.5 46 16.5 46 9.5 32Z"
        fill="var(--paper)"
      />
      <circle cx="32" cy="32" r="9" fill={`url(#mark-iris-${id})`} />
      <circle cx="32" cy="32" r="3.8" fill="#0a0c10" />
      <circle cx="34.8" cy="28.7" r="1.8" fill="var(--paper)" />
    </svg>
  )
}
