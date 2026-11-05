import { useId } from 'react'

/**
 * The seal of Argus: an optical instrument drawn as an engraving. A dial of
 * ticks, a line of type around the rim, a lens diaphragm, and the eye with an
 * iris cut in fine radial lines. It is the site's one large illustration.
 */
export function ArgusSeal({ className }: { className?: string }) {
  const id = useId().replace(/:/g, '')
  const irisId = `seal-iris-${id}`
  const clipId = `seal-clip-${id}`
  const topPath = `seal-top-${id}`
  const bottomPath = `seal-bottom-${id}`

  const dialTicks = Array.from({ length: 180 }, (_, index) => {
    const angle = (index * 2 * Math.PI) / 180
    const major = index % 15 === 0
    const inner = major ? 288 : 294
    return (
      <line
        key={index}
        x1={320 + inner * Math.cos(angle)}
        y1={320 + inner * Math.sin(angle)}
        x2={320 + 301 * Math.cos(angle)}
        y2={320 + 301 * Math.sin(angle)}
        stroke={major ? 'var(--iris)' : 'var(--ink)'}
        strokeWidth={major ? 1.2 : 0.5}
        opacity={major ? 0.9 : 0.45}
      />
    )
  })

  const innerTicks = Array.from({ length: 60 }, (_, index) => {
    const angle = (index * 6 * Math.PI) / 180
    return (
      <line
        key={index}
        x1={320 + 236 * Math.cos(angle)}
        y1={320 + 236 * Math.sin(angle)}
        x2={320 + 242 * Math.cos(angle)}
        y2={320 + 242 * Math.sin(angle)}
        stroke="var(--ink)"
        strokeWidth="0.5"
        opacity="0.38"
      />
    )
  })

  const diaphragm = Array.from({ length: 96 }, (_, index) => {
    const angle = (index * 3.75 * Math.PI) / 180
    const inner = index % 2 === 0 ? 178 : 188
    return (
      <line
        key={index}
        x1={320 + inner * Math.cos(angle)}
        y1={320 + inner * Math.sin(angle)}
        x2={320 + 230 * Math.cos(angle)}
        y2={320 + 230 * Math.sin(angle)}
        stroke="var(--ink)"
        strokeWidth={index % 8 === 0 ? 0.8 : 0.45}
        opacity={index % 8 === 0 ? 0.35 : 0.18}
      />
    )
  })

  const irisLines = Array.from({ length: 150 }, (_, index) => {
    const angle = (index * 2.4 * Math.PI) / 180
    const inner = index % 3 === 0 ? 16 : 22
    const outer = index % 5 === 0 ? 61 : 57
    const light = index % 5 === 0
    return (
      <line
        key={index}
        x1={320 + inner * Math.cos(angle)}
        y1={320 + inner * Math.sin(angle)}
        x2={320 + outer * Math.cos(angle)}
        y2={320 + outer * Math.sin(angle)}
        stroke={light ? '#b7e4ff' : '#0a2a7a'}
        strokeWidth={light ? 1.1 : 0.7}
        opacity={light ? 0.5 : 0.32}
      />
    )
  })

  const irisScale = Array.from({ length: 72 }, (_, index) => {
    const angle = (index * 5 * Math.PI) / 180
    return (
      <line
        key={index}
        x1={320 + 68 * Math.cos(angle)}
        y1={320 + 68 * Math.sin(angle)}
        x2={320 + 74 * Math.cos(angle)}
        y2={320 + 74 * Math.sin(angle)}
        stroke="var(--ink)"
        strokeWidth="0.45"
        opacity="0.26"
      />
    )
  })

  return (
    <svg
      viewBox="0 0 640 640"
      className={className}
      role="img"
      aria-label="The seal of Argus: an eye with an iris in fine radial lines, surrounded by an optical dial"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={irisId} cx="0.4" cy="0.3" r="0.82">
          <stop offset="0" stopColor="#3f7bff" />
          <stop offset="0.55" stopColor="var(--iris)" />
          <stop offset="1" stopColor="var(--iris-deep)" />
        </radialGradient>
        <clipPath id={clipId}>
          <path d="M140 320 C205 224 435 224 500 320 C435 416 205 416 140 320 Z" />
        </clipPath>
        <path id={topPath} d="M 64 320 A 256 256 0 0 1 576 320" fill="none" />
        <path id={bottomPath} d="M 64 320 A 256 256 0 0 0 576 320" fill="none" />
      </defs>

      {/* The dial: outer rim, ticks, and the instrument's type. */}
      <circle cx="320" cy="320" r="310" fill="none" stroke="var(--ink)" strokeWidth="1.1" />
      <circle cx="320" cy="320" r="302" fill="none" stroke="var(--ink)" strokeWidth="0.45" opacity="0.6" />
      <g>{dialTicks}</g>
      <circle
        cx="320"
        cy="320"
        r="282"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="0.5"
        strokeDasharray="1 7"
        opacity="0.45"
      />
      <text
        fontFamily="IBM Plex Mono, monospace"
        fontSize="10.6"
        letterSpacing="3.1"
        fill="var(--ink)"
      >
        <textPath href={`#${topPath}`} startOffset="50%" textAnchor="middle">
          ARGUS ARENA · THE EYE OF PANOPTES
        </textPath>
      </text>
      <text
        fontFamily="IBM Plex Mono, monospace"
        fontSize="9"
        letterSpacing="2.6"
        fill="var(--muted)"
      >
        <textPath href={`#${bottomPath}`} startOffset="50%" textAnchor="middle">
          SELF-HOSTED AI · BINCHIECTS · MMXXVI
        </textPath>
      </text>

      {/* The lens: an inner graduated ring and the diaphragm. */}
      <circle cx="320" cy="320" r="244" fill="none" stroke="var(--ink)" strokeWidth="0.7" opacity="0.7" />
      <g>{innerTicks}</g>
      <g>{diaphragm}</g>
      <circle cx="320" cy="320" r="168" fill="none" stroke="var(--ink)" strokeWidth="0.5" opacity="0.3" />

      {/* Registration marks and the instrument's coordinates. */}
      <g stroke="var(--ink)" strokeWidth="0.6" opacity="0.55">
        <line x1="14" y1="320" x2="48" y2="320" />
        <line x1="592" y1="320" x2="626" y2="320" />
        <line x1="320" y1="14" x2="320" y2="48" />
        <line x1="320" y1="592" x2="320" y2="626" />
        <line x1="58" y1="92" x2="86" y2="120" />
        <line x1="582" y1="92" x2="554" y2="120" />
        <line x1="58" y1="548" x2="86" y2="520" />
        <line x1="582" y1="548" x2="554" y2="520" />
      </g>

      <text x="26" y="32" fontFamily="IBM Plex Mono, monospace" fontSize="8" letterSpacing="2.4" fill="var(--muted)">
        FIG. 01
      </text>
      <text x="614" y="32" textAnchor="end" fontFamily="IBM Plex Mono, monospace" fontSize="8" letterSpacing="2.4" fill="var(--muted)">
        OPTICAL INDEX
      </text>

      {/* The eye, its scale, and the engraved iris. */}
      <g>
        {irisScale}
        <path
          d="M140 320 C205 224 435 224 500 320 C435 416 205 416 140 320 Z"
          fill="var(--paper)"
          stroke="var(--ink)"
          strokeWidth="3"
        />
        <path
          d="M140 320 C205 224 435 224 500 320"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="0.8"
          opacity="0.22"
        />
        <g clipPath={`url(#${clipId})`}>
          <circle cx="320" cy="320" r="62" fill={`url(#${irisId})`} />
          {irisLines}
          <circle cx="320" cy="320" r="47" fill="none" stroke="#0a2a7a" strokeWidth="0.8" opacity="0.5" />
          <circle cx="320" cy="320" r="34" fill="none" stroke="#0a2a7a" strokeWidth="0.6" opacity="0.35" />
          <circle cx="320" cy="320" r="24" fill="#080b10" />
          <circle cx="339" cy="299" r="11" fill="var(--paper)" />
          <circle cx="345" cy="304" r="3.6" fill="rgba(255,255,255,0.55)" />
          <circle cx="296" cy="340" r="3" fill="#9fd8ff" opacity="0.65" />
        </g>
        <circle cx="320" cy="320" r="62" fill="none" stroke="var(--ink)" strokeWidth="1" opacity="0.6" />
      </g>

      {/* The eye's alignment and the caption under it. */}
      <g stroke="var(--ink)" strokeWidth="0.5" opacity="0.4">
        <line x1="140" y1="320" x2="100" y2="320" />
        <line x1="500" y1="320" x2="540" y2="320" />
        <line x1="320" y1="224" x2="320" y2="184" />
        <line x1="320" y1="416" x2="320" y2="456" />
      </g>
      <circle cx="320" cy="320" r="4" fill="none" stroke="var(--ink)" strokeWidth="0.8" opacity="0.5" />

      <text
        x="320"
        y="492"
        textAnchor="middle"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="8.4"
        letterSpacing="3.4"
        fill="var(--muted)"
      >
        A HUNDRED EYES · ONE INDEX
      </text>
      <text x="26" y="616" fontFamily="IBM Plex Mono, monospace" fontSize="7.4" letterSpacing="2.2" fill="var(--muted)">
        PANOPTES
      </text>
      <text x="614" y="616" textAnchor="end" fontFamily="IBM Plex Mono, monospace" fontSize="7.4" letterSpacing="2.2" fill="var(--muted)">
        BINCHIECTS
      </text>
    </svg>
  )
}

/** The seal in its printed plate, with the figure's title and a vertical caption. */
export function ArgusSealFigure() {
  return (
    <figure className="eye-plate">
      <div className="eye-figure">
        <span className="eye-vertical" aria-hidden>
          a hundred eyes · one index
        </span>
        <ArgusSeal className="eye-svg" />
      </div>
      <figcaption className="eye-caption">
        <span>FIG. 01</span>
        <span>the seal of argus · panoptes, the watchman</span>
      </figcaption>
    </figure>
  )
}
