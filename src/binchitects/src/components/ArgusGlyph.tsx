/**
 * The product mark, as a signpost: an ink disc, a paper eye, the Argus iris.
 * It is the only blue on this page, and it belongs to Argus.
 */
export function ArgusGlyph({ className }: { className?: string }) {
  const ticks = Array.from({ length: 12 }, (_, index) => {
    const angle = (index * 30 * Math.PI) / 180
    return (
      <line
        key={index}
        x1={60 + 50 * Math.cos(angle)}
        y1={60 + 50 * Math.sin(angle)}
        x2={60 + 55 * Math.cos(angle)}
        y2={60 + 55 * Math.sin(angle)}
        stroke="#f2ede7"
        strokeWidth={index % 2 === 0 ? 1 : 0.5}
        opacity={index % 2 === 0 ? 0.7 : 0.35}
      />
    )
  })

  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label="The mark of Argus Arena"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="60" cy="60" r="58" fill="#0b0b0b" />
      <circle cx="60" cy="60" r="53" fill="none" stroke="#f2ede7" strokeWidth="0.5" opacity="0.25" />
      {ticks}
      <path
        d="M18 60C31 42 89 42 102 60C89 78 31 78 18 60Z"
        fill="#f2ede7"
      />
      <circle cx="60" cy="60" r="16" fill="#1746e0" />
      <circle cx="60" cy="60" r="6.5" fill="#080b10" />
      <circle cx="65" cy="54" r="3" fill="#f2ede7" />
    </svg>
  )
}
