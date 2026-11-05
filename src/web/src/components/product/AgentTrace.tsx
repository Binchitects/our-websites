/**
 * The agent's trace: plan, ground, check, repair, carry. A solid path for the
 * happy route and a dashed return for a failed check.
 */
export function AgentTrace({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 900 272"
      className={['trace', className].filter(Boolean).join(' ')}
      role="img"
      aria-label="The agent's trace: plan, ground, check, repair and carry. A failed check returns to grounding."
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker id="trace-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--iris)" />
        </marker>
      </defs>

      <text x="20" y="28" fontFamily="IBM Plex Mono, monospace" fontSize="7.2" letterSpacing="2" fill="var(--muted)">
        FIG. 07 / THE TRACE
      </text>
      <text x="880" y="28" textAnchor="end" fontFamily="IBM Plex Mono, monospace" fontSize="7.2" letterSpacing="2" fill="var(--muted)">
        ONE SESSION · FIVE STOPS
      </text>

      <line x1="20" y1="252" x2="880" y2="252" stroke="var(--ink)" strokeWidth="0.5" opacity="0.2" />

      {/* The happy path. */}
      <line x1="70" y1="118" x2="790" y2="118" stroke="var(--iris)" strokeWidth="1.2" markerEnd="url(#trace-arrow)" />

      {/* A failed check returns to grounding. */}
      <path
        d="M430 130 C430 200 250 200 250 130"
        fill="none"
        stroke="var(--iris)"
        strokeWidth="0.9"
        strokeDasharray="4 4"
        markerEnd="url(#trace-arrow)"
      />
      <text x="340" y="216" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="6.6" letterSpacing="1.2" fill="var(--muted)">
        CHECK FAILS · RE-GROUND
      </text>

      {[
        { x: 70, num: '01', title: 'Plan', note: 'steps, files, checks' },
        { x: 250, num: '02', title: 'Ground', note: 'read before edit' },
        { x: 430, num: '03', title: 'Check', note: 'the named test' },
        { x: 610, num: '04', title: 'Repair', note: 'only if it fails' },
        { x: 790, num: '05', title: 'Carry', note: 'into the next session' },
      ].map((step) => (
        <g key={step.num}>
          <circle cx={step.x} cy="118" r="6" fill="var(--paper)" stroke="var(--iris)" strokeWidth="1.2" />
          <circle cx={step.x} cy="118" r="2" fill="var(--iris)" />
          <text x={step.x} y="82" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="7.4" letterSpacing="1.4" fill="var(--iris)">
            {step.num}
          </text>
          <text x={step.x} y="102" textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="13" fill="var(--ink)">
            {step.title}
          </text>
          <text x={step.x} y="146" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="7" letterSpacing="0.6" fill="var(--muted)">
            {step.note}
          </text>
        </g>
      ))}

      {/* The measure. */}
      <g transform="translate(20 252)">
        <line x1="0" y1="0" x2="840" y2="0" stroke="var(--ink)" strokeWidth="0.4" opacity="0.3" />
        {[0, 105, 210, 315, 420, 525, 630, 735, 840].map((x) => (
          <line key={x} x1={x} y1="-3" x2={x} y2="3" stroke="var(--ink)" strokeWidth="0.4" opacity="0.35" />
        ))}
        <text x="0" y="14" fontFamily="IBM Plex Mono, monospace" fontSize="6" letterSpacing="1" fill="var(--faint)">
          0
        </text>
        <text x="840" y="14" textAnchor="end" fontFamily="IBM Plex Mono, monospace" fontSize="6" letterSpacing="1" fill="var(--faint)">
          ONE TRACE
        </text>
      </g>
    </svg>
  )
}
