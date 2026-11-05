/**
 * How a request moves through the stack, drawn once and kept legible: the same
 * three columns an operator reasons about — the way in, the app, the engines.
 */
export function ArchitectureDiagram() {
  const label = '#93a8ca'
  const dim = '#66789a'
  const stroke = 'rgba(125,160,220,0.28)'
  const accent = 'rgba(125,216,255,0.55)'

  return (
    <figure className="overflow-hidden rounded-[14px] border border-line bg-[#060b18]">
      <div className="flex items-center justify-between border-b border-[#182338] px-4 py-2.5">
        <span className="mono text-[9.5px] tracking-[0.14em] text-[#7f92b4] uppercase">
          One way in, nothing out
        </span>
        <span className="mono flex items-center gap-1.5 text-[9px] text-[#55e0a3]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#55e0a3]" />
          air-gap ready
        </span>
      </div>

      <svg
        viewBox="0 0 960 390"
        className="block h-auto w-full"
        role="img"
        aria-label="People reach Traefik, which routes to the web app, the .NET app and API, and Argus. The app calls the model gateway and engines on your GPUs; Argus reads your GitLab and the app keeps state in Postgres."
      >
        <defs>
          <marker id="arch-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={dim} />
          </marker>
        </defs>

        {/* people -> traefik */}
        <rect x="18" y="150" width="178" height="86" rx="12" fill="rgba(16,32,58,0.72)" stroke={stroke} />
        <text x="34" y="180" fill="#dbe6f8" fontSize="12" fontFamily="Inter Variable, sans-serif" fontWeight="560">
          People, tools
        </text>
        <text x="34" y="199" fill={label} fontSize="10.5" fontFamily="Inter Variable, sans-serif">
          Code Arena, browsers, API keys
        </text>
        <text x="34" y="218" fill={dim} fontSize="9" fontFamily="JetBrains Mono, monospace">
          one sign-in · one budget each
        </text>

        <path d="M196 193 H228" stroke={dim} strokeWidth="1.4" markerEnd="url(#arch-arrow)" />

        <rect x="230" y="150" width="140" height="86" rx="12" fill="rgba(40,110,210,0.16)" stroke={accent} />
        <text x="248" y="180" fill="#eaf4ff" fontSize="12" fontFamily="Inter Variable, sans-serif" fontWeight="560">
          Traefik
        </text>
        <text x="248" y="199" fill="#a9c6ea" fontSize="9.5" fontFamily="Inter Variable, sans-serif">
          TLS · allow and block
        </text>
        <text x="248" y="214" fill="#a9c6ea" fontSize="9.5" fontFamily="Inter Variable, sans-serif">
          lists · rate limits
        </text>
        <text x="248" y="229" fill={dim} fontSize="9" fontFamily="JetBrains Mono, monospace">
          the only way in
        </text>

        {/* traefik -> three */}
        <path d="M370 193 H400 V72 H428" stroke={dim} strokeWidth="1.2" fill="none" markerEnd="url(#arch-arrow)" />
        <path d="M370 193 H428" stroke={dim} strokeWidth="1.2" fill="none" markerEnd="url(#arch-arrow)" />
        <path d="M400 193 V310 H428" stroke={dim} strokeWidth="1.2" fill="none" markerEnd="url(#arch-arrow)" />

        <rect x="430" y="40" width="170" height="64" rx="11" fill="rgba(16,32,58,0.72)" stroke={stroke} />
        <text x="446" y="66" fill="#dbe6f8" fontSize="11" fontFamily="Inter Variable, sans-serif" fontWeight="560">
          Web app
        </text>
        <text x="446" y="84" fill={label} fontSize="9.5" fontFamily="Inter Variable, sans-serif">
          React, served as static files
        </text>

        <rect x="430" y="150" width="170" height="86" rx="11" fill="rgba(40,110,210,0.18)" stroke={accent} />
        <text x="446" y="176" fill="#eaf4ff" fontSize="11" fontFamily="Inter Variable, sans-serif" fontWeight="560">
          .NET app and API
        </text>
        <text x="446" y="194" fill="#a9c6ea" fontSize="9.5" fontFamily="Inter Variable, sans-serif">
          keys, ledger, audit log,
        </text>
        <text x="446" y="208" fill="#a9c6ea" fontSize="9.5" fontFamily="Inter Variable, sans-serif">
          rights, budgets
        </text>
        <text x="446" y="225" fill={dim} fontSize="9" fontFamily="JetBrains Mono, monospace">
          .NET 10
        </text>

        <rect x="430" y="278" width="170" height="64" rx="11" fill="rgba(16,32,58,0.72)" stroke={stroke} />
        <text x="446" y="304" fill="#dbe6f8" fontSize="11" fontFamily="Inter Variable, sans-serif" fontWeight="560">
          Argus
        </text>
        <text x="446" y="322" fill={label} fontSize="9.5" fontFamily="Inter Variable, sans-serif">
          code index · MCP · docs packs
        </text>

        {/* app -> gateway -> engines */}
        <path d="M600 193 H638" stroke={dim} strokeWidth="1.4" fill="none" markerEnd="url(#arch-arrow)" />
        <rect x="640" y="150" width="140" height="86" rx="11" fill="rgba(16,32,58,0.72)" stroke={stroke} />
        <text x="656" y="176" fill="#dbe6f8" fontSize="11" fontFamily="Inter Variable, sans-serif" fontWeight="560">
          Model gateway
        </text>
        <text x="656" y="194" fill={label} fontSize="9.5" fontFamily="Inter Variable, sans-serif">
          LiteLLM, replaced
        </text>
        <text x="656" y="208" fill={label} fontSize="9.5" fontFamily="Inter Variable, sans-serif">
          step by step
        </text>
        <text x="656" y="225" fill={dim} fontSize="9" fontFamily="JetBrains Mono, monospace">
          sk- keys · ledger
        </text>

        <path d="M780 193 H812" stroke={dim} strokeWidth="1.4" fill="none" markerEnd="url(#arch-arrow)" />
        <rect x="814" y="150" width="130" height="86" rx="11" fill="rgba(40,110,210,0.18)" stroke={accent} />
        <text x="828" y="176" fill="#eaf4ff" fontSize="11" fontFamily="Inter Variable, sans-serif" fontWeight="560">
          Your GPUs
        </text>
        <text x="828" y="194" fill="#a9c6ea" fontSize="9.5" fontFamily="Inter Variable, sans-serif">
          llama.cpp
        </text>
        <text x="828" y="208" fill="#a9c6ea" fontSize="9.5" fontFamily="Inter Variable, sans-serif">
          vLLM · SGLang
        </text>
        <text x="828" y="225" fill={dim} fontSize="9" fontFamily="JetBrains Mono, monospace">
          any open model
        </text>

        {/* argus -> gitlab */}
        <path d="M600 310 H638" stroke={dim} strokeWidth="1.4" fill="none" markerEnd="url(#arch-arrow)" />
        <rect x="640" y="278" width="140" height="64" rx="11" fill="rgba(16,32,58,0.72)" stroke={stroke} />
        <text x="656" y="304" fill="#dbe6f8" fontSize="11" fontFamily="Inter Variable, sans-serif" fontWeight="560">
          Your GitLab
        </text>
        <text x="656" y="322" fill={label} fontSize="9.5" fontFamily="Inter Variable, sans-serif">
          read-only mirror
        </text>

        {/* app -> state */}
        <path d="M515 150 V104" stroke={dim} strokeWidth="1.2" fill="none" markerEnd="url(#arch-arrow)" />
        <rect x="640" y="40" width="140" height="64" rx="11" fill="rgba(16,32,58,0.72)" stroke={stroke} />
        <text x="656" y="66" fill="#dbe6f8" fontSize="11" fontFamily="Inter Variable, sans-serif" fontWeight="560">
          State
        </text>
        <text x="656" y="84" fill={label} fontSize="9.5" fontFamily="Inter Variable, sans-serif">
          Postgres · sandboxes · tools
        </text>
        <path d="M515 104 H638" stroke={dim} strokeWidth="1.2" fill="none" markerEnd="url(#arch-arrow)" />

        <text x="18" y="368" fill={dim} fontSize="9" fontFamily="JetBrains Mono, monospace">
          Prometheus · Loki · Alertmanager watch it all
        </text>
        <text x="814" y="368" fill={dim} fontSize="9" fontFamily="JetBrains Mono, monospace" textAnchor="end">
          nothing leaves unless you allow it
        </text>
      </svg>
    </figure>
  )
}
