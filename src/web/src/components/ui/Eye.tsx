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
      <circle cx="171" cy="88" r="5" fill="var(--paper)" opacity="0.9" />
      <path d="M12 100H52M268 100H308" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <path d="M160 56V26M160 144V174" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
    </svg>
  )
}
