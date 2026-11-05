/**
 * The stack as a system section: a dotted grid, hatched edge, numbered nodes,
 * blue request paths and a title block. It is a drawing, not a diagram of cards.
 */
export function ArchitecturePlate() {
  const label = 'var(--muted)'
  const dim = 'var(--faint)'
  const ink = 'var(--ink)'
  const blue = 'var(--iris)'

  const node = (
    x: number,
    y: number,
    w: number,
    h: number,
    num: string,
    title: string,
    lines: string[],
    note?: string,
    emphasis = false,
  ) => (
    <g key={num}>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill="var(--paper-raised)"
        stroke={emphasis ? blue : ink}
        strokeWidth={emphasis ? 1.4 : 1}
      />
      <text
        x={x + w - 8}
        y={y + 13}
        textAnchor="end"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="6.4"
        letterSpacing="1.1"
        fill={blue}
      >
        {num}
      </text>
      <text x={x + 12} y={y + 24} fontFamily="IBM Plex Sans, sans-serif" fontSize="11" fill={ink}>
        {title}
      </text>
      {lines.map((line, index) => (
        <text
          key={line}
          x={x + 12}
          y={y + 41 + index * 13}
          fontFamily="IBM Plex Sans, sans-serif"
          fontSize="8.7"
          fill={label}
        >
          {line}
        </text>
      ))}
      {note && (
        <text
          x={x + 12}
          y={y + h - 8}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="6.2"
          letterSpacing="1.1"
          fill={dim}
        >
          {note}
        </text>
      )}
    </g>
  )

  return (
    <svg
      className="arch"
      viewBox="0 0 980 400"
      role="img"
      aria-label="System section: people and tools enter through Traefik, which routes to the web app, the .NET app and API, and Argus. The app calls the model gateway and the GPUs; Argus reads GitLab; the app keeps state in Postgres. Prometheus, Loki and Alertmanager watch it all."
    >
      <defs>
        <pattern id="arch-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.55" fill={ink} opacity="0.14" />
        </pattern>
        <pattern id="arch-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" stroke={blue} strokeWidth="0.6" opacity="0.35" />
        </pattern>
        <marker
          id="arch-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill={blue} />
        </marker>
      </defs>

      <rect x="0" y="0" width="980" height="400" fill="var(--paper-raised)" />
      <rect x="0" y="0" width="980" height="400" fill="url(#arch-grid)" />
      <rect x="8" y="8" width="964" height="384" fill="none" stroke={ink} strokeWidth="0.5" opacity="0.35" />
      <rect x="16" y="16" width="948" height="368" fill="none" stroke={ink} strokeWidth="1" />

      <g stroke={ink} strokeWidth="0.8" opacity="0.6">
        <path d="M16 44V16H44" fill="none" />
        <path d="M936 16H964V44" fill="none" />
        <path d="M16 356V384H44" fill="none" />
        <path d="M936 384H964V356" fill="none" />
      </g>

      <text x="32" y="38" fontFamily="IBM Plex Mono, monospace" fontSize="7.2" letterSpacing="2" fill={dim}>
        FIG. 02 / SYSTEM SECTION
      </text>
      <text x="948" y="38" textAnchor="end" fontFamily="IBM Plex Mono, monospace" fontSize="7.2" letterSpacing="2" fill={dim}>
        ARGUS ARENA 7.7
      </text>

      {/* Request path labels. */}

      {/* People */}
      {node(44, 144, 150, 92, '01', 'People and tools', ['Code Arena, browsers,', 'API keys'], 'ONE BUDGET EACH')}

      <path d="M194 190 H218" stroke={blue} strokeWidth="1" markerEnd="url(#arch-arrow)" />
      <circle cx="218" cy="190" r="2.3" fill="var(--paper)" stroke={blue} strokeWidth="0.8" />

      {/* Traefik, hatched as the edge. */}
      <rect x="220" y="144" width="140" height="92" fill="url(#arch-hatch)" stroke={ink} strokeWidth="1.7" />
      <rect x="220" y="144" width="140" height="92" fill="none" stroke={ink} strokeWidth="1.7" />
      <text x="352" y="157" textAnchor="end" fontFamily="IBM Plex Mono, monospace" fontSize="6.4" letterSpacing="1.1" fill={blue}>
        02
      </text>
      <text x="232" y="168" fontFamily="IBM Plex Sans, sans-serif" fontSize="11" fill={ink}>
        Traefik
      </text>
      <text x="232" y="185" fontFamily="IBM Plex Sans, sans-serif" fontSize="8.7" fill={label}>
        TLS · allow and block
      </text>
      <text x="232" y="198" fontFamily="IBM Plex Sans, sans-serif" fontSize="8.7" fill={label}>
        lists · rate limits
      </text>
      <text x="232" y="226" fontFamily="IBM Plex Mono, monospace" fontSize="6.2" letterSpacing="1.1" fill={dim}>
        THE ONLY WAY IN
      </text>

      {/* Routes */}
      <path d="M360 190 H390 V80 H404" stroke={blue} strokeWidth="1" fill="none" markerEnd="url(#arch-arrow)" />
      <path d="M360 190 H404" stroke={blue} strokeWidth="1" fill="none" markerEnd="url(#arch-arrow)" />
      <path d="M390 190 V300 H404" stroke={blue} strokeWidth="1" fill="none" markerEnd="url(#arch-arrow)" />

      {node(406, 48, 168, 64, '03', 'Web app', ['React, served as static files'], 'STATIC FILES')}
      {node(406, 144, 168, 92, '04', '.NET app and API', ['keys, ledger, audit log,', 'rights, budgets'], '.NET 10', true)}
      {node(406, 268, 168, 64, '05', 'Argus', ['code index · MCP · docs'], 'READ-ONLY INDEX')}

      <path d="M574 190 H602" stroke={blue} strokeWidth="1" markerEnd="url(#arch-arrow)" />
      {node(604, 144, 136, 92, '06', 'Model gateway', ['keys · ledger ·', 'model rights'], 'LITELLM, REPLACED')}

      <path d="M740 190 H768" stroke={blue} strokeWidth="1" markerEnd="url(#arch-arrow)" />
      {node(770, 144, 170, 92, '07', 'Your GPUs', ['llama.cpp · vLLM', 'SGLang · any open model'], 'ON YOUR METAL', true)}

      <path d="M574 300 H602" stroke={blue} strokeWidth="1" markerEnd="url(#arch-arrow)" />
      {node(604, 268, 136, 64, '08', 'Your GitLab', ['read-only mirror'], 'TOKEN CANNOT WRITE')}

      <path d="M574 160 H590 V80 H604" stroke={blue} strokeWidth="1" fill="none" markerEnd="url(#arch-arrow)" />
      {node(604, 48, 136, 64, '09', 'State', ['Postgres · sandboxes · tools'], 'PERSISTENT')}

      {/* Legend and title block. */}
      <g transform="translate(32 350)">
        <line x1="0" y1="-3" x2="20" y2="-3" stroke={blue} strokeWidth="1" markerEnd="url(#arch-arrow)" />
        <text x="26" y="0" fontFamily="IBM Plex Mono, monospace" fontSize="6.4" letterSpacing="1.1" fill={label}>
          REQUEST PATH
        </text>
        <rect x="120" y="-8" width="10" height="10" fill="none" stroke={ink} strokeWidth="0.8" />
        <text x="136" y="0" fontFamily="IBM Plex Mono, monospace" fontSize="6.4" letterSpacing="1.1" fill={label}>
          SERVICE
        </text>
        <rect x="202" y="-8" width="10" height="10" fill="url(#arch-hatch)" stroke={ink} strokeWidth="0.8" />
        <text x="218" y="0" fontFamily="IBM Plex Mono, monospace" fontSize="6.4" letterSpacing="1.1" fill={label}>
          EDGE
        </text>
      </g>

      <g transform="translate(690 342)">
        <rect x="0" y="0" width="258" height="38" fill="none" stroke={ink} strokeWidth="0.8" />
        <line x1="0" y1="18" x2="258" y2="18" stroke={ink} strokeWidth="0.4" opacity="0.4" />
        <text x="8" y="12" fontFamily="IBM Plex Mono, monospace" fontSize="6.4" letterSpacing="1.4" fill={dim}>
          PROMETHEUS · LOKI · ALERTMANAGER
        </text>
        <text x="8" y="30" fontFamily="IBM Plex Mono, monospace" fontSize="6.4" letterSpacing="1.4" fill={dim}>
          NOTHING LEAVES UNLESS YOU ALLOW IT
        </text>
      </g>

    </svg>
  )
}
