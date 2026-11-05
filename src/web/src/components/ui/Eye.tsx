import { useId } from 'react'

/** The mark: an almond eye and an iris, drawn in the page's ink. */
export function EyeMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} role="img" aria-label="Argus">
      <path
        d="M2.5 20C8.5 10.8 31.5 10.8 37.5 20C31.5 29.2 8.5 29.2 2.5 20Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="20" cy="20" r="7.2" fill="var(--iris)" />
      <circle cx="20" cy="20" r="3" fill="currentColor" />
      <circle cx="22.4" cy="17.6" r="1.4" fill="var(--paper-raised)" />
    </svg>
  )
}

/**
 * The eye of Argus, as a printed plate: a lens with tick marks, the eye in
 * line and one iris, captioned like a figure in a technical journal.
 */
export function EyeFigure() {
  const id = useId().replace(/:/g, '')
  const iris = `iris-${id}`
  const ticks = Array.from({ length: 72 }, (_, index) => {
    const angle = (index * 5 * Math.PI) / 180
    const major = index % 6 === 0
    const r1 = major ? 128 : 136
    const r2 = 142
    return (
      <line
        key={index}
        x1={160 + r1 * Math.cos(angle)}
        y1={160 + r1 * Math.sin(angle)}
        x2={160 + r2 * Math.cos(angle)}
        y2={160 + r2 * Math.sin(angle)}
        stroke="var(--faint)"
        strokeWidth={major ? 0.8 : 0.45}
        opacity={major ? 0.9 : 0.55}
      />
    )
  })

  return (
    <figure className="eye-plate">
      <div className="eye-figure">
        <span className="eye-vertical" aria-hidden>
          a hundred eyes · one index
        </span>
        <svg
          className="eye-svg"
          viewBox="0 0 320 320"
          role="img"
          aria-label="The eye of Argus, a line drawing with the iris in blue"
        >
          <defs>
            <radialGradient id={iris} cx="0.4" cy="0.28" r="0.85">
              <stop offset="0" stopColor="var(--iris)" />
              <stop offset="1" stopColor="var(--iris-deep)" />
            </radialGradient>
            <clipPath id={`clip-${id}`}>
              <path d="M64 160C96 122 224 122 256 160C224 198 96 198 64 160Z" />
            </clipPath>
          </defs>

          <text
            x="12"
            y="18"
            fontFamily="IBM Plex Mono, monospace"
            fontSize="6.4"
            letterSpacing="1.9"
            fill="var(--faint)"
          >
            ARGUS / PANOPTES
          </text>
          <text
            x="308"
            y="18"
            textAnchor="end"
            fontFamily="IBM Plex Mono, monospace"
            fontSize="6.4"
            letterSpacing="1.9"
            fill="var(--faint)"
          >
            OPTICAL INDEX
          </text>

          <circle cx="160" cy="160" r="146" fill="none" stroke="var(--rule)" strokeWidth="0.7" />
          <circle cx="160" cy="160" r="120" fill="none" stroke="var(--rule)" strokeWidth="0.7" />
          <circle
            cx="160"
            cy="160"
            r="96"
            fill="none"
            stroke="var(--rule)"
            strokeWidth="0.7"
            strokeDasharray="1 5"
          />

          <g className="eye-blades">{ticks}</g>

          {/* The vertical and horizontal alignment of the instrument. */}
          <line x1="14" y1="160" x2="58" y2="160" stroke="var(--rule)" strokeWidth="0.7" />
          <line x1="262" y1="160" x2="306" y2="160" stroke="var(--rule)" strokeWidth="0.7" />
          <line x1="160" y1="14" x2="160" y2="42" stroke="var(--rule)" strokeWidth="0.7" />
          <line x1="160" y1="278" x2="160" y2="306" stroke="var(--rule)" strokeWidth="0.7" />

          <g className="eye-blink">
            <path
              d="M64 160C96 122 224 122 256 160C224 198 96 198 64 160Z"
              fill="#f2efe7"
              stroke="#121417"
              strokeWidth="1.5"
            />
            <g clipPath={`url(#clip-${id})`}>
              <circle cx="160" cy="160" r="37" fill={`url(#${iris})`} />
              <circle cx="160" cy="160" r="37" fill="none" stroke="#0a2468" strokeWidth="1" opacity="0.6" />
              <circle
                cx="160"
                cy="160"
                r="25"
                fill="none"
                stroke="rgba(180,225,255,0.5)"
                strokeWidth="0.8"
                strokeDasharray="1.5 3"
              />
              <circle cx="160" cy="160" r="15" fill="#0a0c10" />
              <circle cx="171" cy="149" r="5.4" fill="#ffffff" opacity="0.92" />
              <circle cx="151" cy="171" r="2.2" fill="#9fe3ff" opacity="0.6" />
            </g>
            <path
              d="M64 160C96 122 224 122 256 160"
              fill="none"
              stroke="rgba(18,20,23,0.32)"
              strokeWidth="0.8"
            />
          </g>

          <text
            x="12"
            y="308"
            fontFamily="IBM Plex Mono, monospace"
            fontSize="6.4"
            letterSpacing="1.9"
            fill="var(--faint)"
          >
            FIG. 01
          </text>
          <text
            x="308"
            y="308"
            textAnchor="end"
            fontFamily="IBM Plex Mono, monospace"
            fontSize="6.4"
            letterSpacing="1.9"
            fill="var(--faint)"
          >
            BINCHIECTS
          </text>
        </svg>
      </div>
      <figcaption className="eye-caption">
        <span>FIG. 01</span>
        <span>the eye of argus · panoptes, the watchman</span>
      </figcaption>
    </figure>
  )
}

/** The eye as a single line, for the blue closing spread and the 404. */
export function EyeLine({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 200"
      className={className}
      fill="none"
      role="img"
      aria-label="The eye of Argus"
    >
      <path
        d="M12 100C52 44 268 44 308 100C268 156 52 156 12 100Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="160" cy="100" r="44" stroke="currentColor" strokeWidth="1" opacity="0.75" />
      <circle cx="160" cy="100" r="30" stroke="currentColor" strokeWidth="0.8" opacity="0.55" />
      <circle cx="160" cy="100" r="17" fill="currentColor" opacity="0.9" />
      <circle cx="171" cy="88" r="5" fill="#f2efe7" opacity="0.9" />
      <path d="M12 100H52M268 100H308" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <path d="M160 56V26M160 144V174" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
    </svg>
  )
}
