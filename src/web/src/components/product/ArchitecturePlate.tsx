/**
 * The stack as a printed schematic: open boxes, one line weight, the iris used
 * only for the paths a request takes. No glow, no glass.
 */
export function ArchitecturePlate() {
  return (
    <svg
      className="arch"
      viewBox="0 0 980 360"
      role="img"
      aria-label="People reach Traefik, which routes to the web app, the .NET app and API, and Argus. The app calls the model gateway and the GPUs; Argus reads GitLab; the app keeps state."
    >
      <defs>
        <marker
          id="arch-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--iris)" />
        </marker>
      </defs>

      {/* People */}
      <rect x="14" y="136" width="168" height="88" fill="none" stroke="var(--ink)" strokeWidth="1" />
      <text x="28" y="162" fontFamily="IBM Plex Sans, sans-serif" fontSize="11" fill="var(--ink)">
        People and tools
      </text>
      <text x="28" y="180" fontFamily="IBM Plex Sans, sans-serif" fontSize="9" fill="var(--muted)">
        Code Arena, browsers,
      </text>
      <text x="28" y="194" fontFamily="IBM Plex Sans, sans-serif" fontSize="9" fill="var(--muted)">
        API keys
      </text>
      <text x="28" y="214" fontFamily="IBM Plex Mono, monospace" fontSize="6.5" letterSpacing="1.2" fill="var(--faint)">
        ONE SIGN-IN · ONE BUDGET EACH
      </text>

      <path d="M182 180 H216" stroke="var(--iris)" strokeWidth="1" markerEnd="url(#arch-arrow)" />

      {/* Traefik */}
      <rect x="218" y="136" width="140" height="88" fill="none" stroke="var(--ink)" strokeWidth="1.6" />
      <text x="232" y="162" fontFamily="IBM Plex Sans, sans-serif" fontSize="11" fill="var(--ink)">
        Traefik
      </text>
      <text x="232" y="180" fontFamily="IBM Plex Sans, sans-serif" fontSize="9" fill="var(--muted)">
        TLS · allow and block
      </text>
      <text x="232" y="194" fontFamily="IBM Plex Sans, sans-serif" fontSize="9" fill="var(--muted)">
        lists · rate limits
      </text>
      <text x="232" y="214" fontFamily="IBM Plex Mono, monospace" fontSize="6.5" letterSpacing="1.2" fill="var(--faint)">
        THE ONLY WAY IN
      </text>

      {/* Traefik to services */}
      <path d="M358 180 H382 V70 H402" stroke="var(--iris)" strokeWidth="1" fill="none" markerEnd="url(#arch-arrow)" />
      <path d="M358 180 H402" stroke="var(--iris)" strokeWidth="1" fill="none" markerEnd="url(#arch-arrow)" />
      <path d="M382 180 V290 H402" stroke="var(--iris)" strokeWidth="1" fill="none" markerEnd="url(#arch-arrow)" />

      {/* Web */}
      <rect x="404" y="38" width="168" height="62" fill="none" stroke="var(--ink)" strokeWidth="1" />
      <text x="418" y="62" fontFamily="IBM Plex Sans, sans-serif" fontSize="11" fill="var(--ink)">
        Web app
      </text>
      <text x="418" y="80" fontFamily="IBM Plex Sans, sans-serif" fontSize="9" fill="var(--muted)">
        React, served as static files
      </text>

      {/* App */}
      <rect x="404" y="136" width="168" height="88" fill="none" stroke="var(--ink)" strokeWidth="1" />
      <text x="418" y="162" fontFamily="IBM Plex Sans, sans-serif" fontSize="11" fill="var(--ink)">
        .NET app and API
      </text>
      <text x="418" y="180" fontFamily="IBM Plex Sans, sans-serif" fontSize="9" fill="var(--muted)">
        keys, ledger, audit log,
      </text>
      <text x="418" y="194" fontFamily="IBM Plex Sans, sans-serif" fontSize="9" fill="var(--muted)">
        rights, budgets
      </text>
      <text x="418" y="214" fontFamily="IBM Plex Mono, monospace" fontSize="6.5" letterSpacing="1.2" fill="var(--faint)">
        .NET 10
      </text>

      {/* Argus */}
      <rect x="404" y="258" width="168" height="62" fill="none" stroke="var(--ink)" strokeWidth="1" />
      <text x="418" y="282" fontFamily="IBM Plex Sans, sans-serif" fontSize="11" fill="var(--ink)">
        Argus
      </text>
      <text x="418" y="300" fontFamily="IBM Plex Sans, sans-serif" fontSize="9" fill="var(--muted)">
        code index · MCP · docs packs
      </text>

      {/* App to gateway */}
      <path d="M572 180 H602" stroke="var(--iris)" strokeWidth="1" markerEnd="url(#arch-arrow)" />
      <rect x="604" y="136" width="136" height="88" fill="none" stroke="var(--ink)" strokeWidth="1" />
      <text x="618" y="162" fontFamily="IBM Plex Sans, sans-serif" fontSize="11" fill="var(--ink)">
        Model gateway
      </text>
      <text x="618" y="180" fontFamily="IBM Plex Sans, sans-serif" fontSize="9" fill="var(--muted)">
        keys · ledger ·
      </text>
      <text x="618" y="194" fontFamily="IBM Plex Sans, sans-serif" fontSize="9" fill="var(--muted)">
        model rights
      </text>
      <text x="618" y="214" fontFamily="IBM Plex Mono, monospace" fontSize="6.5" letterSpacing="1.2" fill="var(--faint)">
        LITELLM, REPLACED
      </text>

      {/* Gateway to GPUs */}
      <path d="M740 180 H772" stroke="var(--iris)" strokeWidth="1" markerEnd="url(#arch-arrow)" />
      <rect x="774" y="136" width="170" height="88" fill="none" stroke="var(--ink)" strokeWidth="1" />
      <text x="788" y="162" fontFamily="IBM Plex Sans, sans-serif" fontSize="11" fill="var(--ink)">
        Your GPUs
      </text>
      <text x="788" y="180" fontFamily="IBM Plex Sans, sans-serif" fontSize="9" fill="var(--muted)">
        llama.cpp · vLLM
      </text>
      <text x="788" y="194" fontFamily="IBM Plex Sans, sans-serif" fontSize="9" fill="var(--muted)">
        SGLang · any open model
      </text>
      <text x="788" y="214" fontFamily="IBM Plex Mono, monospace" fontSize="6.5" letterSpacing="1.2" fill="var(--faint)">
        ON YOUR METAL
      </text>

      {/* Argus to GitLab */}
      <path d="M572 289 H602" stroke="var(--iris)" strokeWidth="1" markerEnd="url(#arch-arrow)" />
      <rect x="604" y="258" width="136" height="62" fill="none" stroke="var(--ink)" strokeWidth="1" />
      <text x="618" y="282" fontFamily="IBM Plex Sans, sans-serif" fontSize="11" fill="var(--ink)">
        Your GitLab
      </text>
      <text x="618" y="300" fontFamily="IBM Plex Sans, sans-serif" fontSize="9" fill="var(--muted)">
        read-only mirror
      </text>

      {/* App to state */}
      <path d="M488 136 V100 H602" stroke="var(--iris)" strokeWidth="1" fill="none" markerEnd="url(#arch-arrow)" />
      <rect x="604" y="38" width="136" height="62" fill="none" stroke="var(--ink)" strokeWidth="1" />
      <text x="618" y="62" fontFamily="IBM Plex Sans, sans-serif" fontSize="11" fill="var(--ink)">
        State
      </text>
      <text x="618" y="80" fontFamily="IBM Plex Sans, sans-serif" fontSize="9" fill="var(--muted)">
        Postgres · sandboxes · tools
      </text>

      {/* Notes */}
      <text x="14" y="344" fontFamily="IBM Plex Mono, monospace" fontSize="6.5" letterSpacing="1.2" fill="var(--faint)">
        PROMETHEUS · LOKI · ALERTMANAGER WATCH IT ALL
      </text>
      <text x="944" y="344" textAnchor="end" fontFamily="IBM Plex Mono, monospace" fontSize="6.5" letterSpacing="1.2" fill="var(--faint)">
        NOTHING LEAVES UNLESS YOU ALLOW IT
      </text>
    </svg>
  )
}
