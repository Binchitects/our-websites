import { useId } from 'react'

type Node = {
  label: string
  ring: 1 | 2 | 3
  angle: number
  filled: boolean
}

/**
 * The index, drawn as an instrument chart: a small eye at the centre, three
 * orbits of tools, and fine radial lines. Each orbit is one kind of work and
 * one colour of the Argus spectrum; filled nodes quote the source and open
 * nodes read the record.
 */
const NODES: Node[] = [
  { label: 'find_symbol', ring: 1, angle: -90, filled: true },
  { label: 'search_code', ring: 1, angle: -30, filled: true },
  { label: 'semantic_search', ring: 1, angle: 30, filled: true },
  { label: 'repo_map', ring: 1, angle: 90, filled: true },
  { label: 'code_contracts', ring: 1, angle: 150, filled: true },
  { label: 'find_references', ring: 1, angle: 210, filled: true },

  { label: 'docs_lookup', ring: 2, angle: -68, filled: true },
  { label: 'docs_find', ring: 2, angle: -20, filled: true },
  { label: 'docs_verify', ring: 2, angle: 28, filled: true },
  { label: 'mr_diff', ring: 2, angle: 76, filled: false },
  { label: 'ci_status', ring: 2, angle: 124, filled: false },
  { label: 'issue_get', ring: 2, angle: 172, filled: false },
  { label: 'wiki_get', ring: 2, angle: 220, filled: false },

  { label: 'job_log', ring: 3, angle: -64, filled: false },
  { label: 'file_at', ring: 3, angle: -16, filled: false },
  { label: 'grep_at', ring: 3, angle: 32, filled: false },
  { label: 'compare_refs', ring: 3, angle: 80, filled: false },
  { label: 'mr_commits', ring: 3, angle: 128, filled: false },
  { label: 'mr_discussions', ring: 3, angle: 176, filled: false },
  { label: 'which_repo', ring: 3, angle: 224, filled: false },
  { label: 'change_impact', ring: 3, angle: 272, filled: true },
]

const RADII: Record<1 | 2 | 3, number> = { 1: 98, 2: 174, 3: 250 }

/** One colour per family: code, documents, and the record. */
const FAMILY: Record<1 | 2 | 3, string> = {
  1: 'var(--c-iris)',
  2: 'var(--c-teal)',
  3: 'var(--c-violet)',
}

const DIAL_COLOURS = ['--c-iris', '--c-cyan', '--c-teal', '--c-violet', '--c-amber', '--c-rose']
const CX = 450
const CY = 300

export function IndexChart({ className }: { className?: string }) {
  const id = useId().replace(/:/g, '')
  const grid = `chart-grid-${id}`

  const spokes = Array.from({ length: 12 }, (_, index) => {
    const angle = (index * 30 * Math.PI) / 180
    return (
      <line
        key={index}
        x1={CX + 76 * Math.cos(angle)}
        y1={CY + 76 * Math.sin(angle)}
        x2={CX + 268 * Math.cos(angle)}
        y2={CY + 268 * Math.sin(angle)}
        stroke="var(--ink)"
        strokeWidth="0.4"
        opacity="0.16"
      />
    )
  })

  const dial = Array.from({ length: 120 }, (_, index) => {
    const angle = (index * 3 * Math.PI) / 180
    const major = index % 10 === 0
    return (
      <line
        key={index}
        x1={CX + (major ? 262 : 268) * Math.cos(angle)}
        y1={CY + (major ? 262 : 268) * Math.sin(angle)}
        x2={CX + 276 * Math.cos(angle)}
        y2={CY + 276 * Math.sin(angle)}
        stroke={major ? `var(${DIAL_COLOURS[(index / 10) % DIAL_COLOURS.length]})` : 'var(--ink)'}
        strokeWidth={major ? 1 : 0.4}
        opacity={major ? 0.9 : 0.3}
      />
    )
  })

  const dots = Array.from({ length: 72 }, (_, index) => {
    const angle = (index * 5 * Math.PI) / 180
    return (
      <circle
        key={index}
        cx={CX + 212 * Math.cos(angle)}
        cy={CY + 212 * Math.sin(angle)}
        r={index % 6 === 0 ? 1.5 : 0.8}
        fill={`var(${DIAL_COLOURS[(index / 6) % DIAL_COLOURS.length]})`}
        opacity={index % 6 === 0 ? 0.6 : 0.18}
      />
    )
  })

  return (
    <svg
      viewBox="0 0 900 620"
      className={['index-chart', className].filter(Boolean).join(' ')}
      role="img"
      aria-label="A radial chart of the Argus tools: three orbits of tool names around a central eye. The names include find_symbol, search_code, semantic_search, repo_map, docs_lookup, docs_verify, mr_diff, ci_status, issue_get, wiki_get, job_log, file_at, grep_at, compare_refs, mr_commits, mr_discussions, which_repo and change_impact."
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id={grid} width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.55" fill="var(--ink)" opacity="0.16" />
        </pattern>
      </defs>

      <rect x="0" y="0" width="900" height="620" fill={`url(#${grid})`} />
      <rect x="14" y="14" width="872" height="592" fill="none" stroke="var(--ink)" strokeWidth="0.6" opacity="0.35" />

      {/* Corner registration marks. */}
      <g stroke="var(--ink)" strokeWidth="0.8" opacity="0.6">
        <path d="M14 40V14H40" fill="none" />
        <path d="M860 14H886V40" fill="none" />
        <path d="M14 580V606H40" fill="none" />
        <path d="M860 606H886V580" fill="none" />
      </g>

      <text x="32" y="42" fontFamily="IBM Plex Mono, monospace" fontSize="8" letterSpacing="2.2" fill="var(--muted)">
        FIG. 04 / THE INDEX
      </text>
      <text x="868" y="42" textAnchor="end" fontFamily="IBM Plex Mono, monospace" fontSize="8" letterSpacing="2.2" fill="var(--muted)">
        34 TOOLS / ONE MAP
      </text>

      <g>{spokes}</g>
      {[1, 2, 3].map((ring) => (
        <circle
          key={ring}
          cx={CX}
          cy={CY}
          r={RADII[ring as 1 | 2 | 3]}
          fill="none"
          stroke="var(--ink)"
          strokeWidth="0.5"
          strokeDasharray={ring === 3 ? '1 6' : '3 5'}
          opacity={ring === 1 ? 0.35 : 0.22}
        />
      ))}
      <g>{dots}</g>
      <g>{dial}</g>

      {/* The centre: the mark, and the lines that reach every tool. */}
      {NODES.map((node) => {
        const angle = (node.angle * Math.PI) / 180
        const r = RADII[node.ring]
        const x = CX + r * Math.cos(angle)
        const y = CY + r * Math.sin(angle)
        return (
          <line
            key={`line-${node.label}`}
            x1={CX + 34 * Math.cos(angle)}
            y1={CY + 34 * Math.sin(angle)}
            x2={x}
            y2={y}
            stroke={FAMILY[node.ring]}
            strokeWidth={node.filled ? 0.65 : 0.4}
            opacity={node.filled ? 0.3 : 0.1}
          />
        )
      })}

      {NODES.map((node) => {
        const angle = (node.angle * Math.PI) / 180
        const r = RADII[node.ring]
        const x = CX + r * Math.cos(angle)
        const y = CY + r * Math.sin(angle)
        const right = Math.cos(angle) >= 0
        const anchor = right ? 'start' : 'end'
        const labelX = x + (right ? 10 : -10)
        return (
          <g key={node.label}>
            <circle
              cx={x}
              cy={y}
              r="4.2"
              fill={node.filled ? FAMILY[node.ring] : 'var(--paper)'}
              stroke={node.filled ? FAMILY[node.ring] : FAMILY[node.ring]}
              strokeWidth="0.9"
            />
            {node.filled && <circle cx={x} cy={y} r="1.4" fill="var(--paper)" />}
            <text
              x={labelX}
              y={y + 2.6}
              textAnchor={anchor}
              fontFamily="IBM Plex Mono, monospace"
              fontSize="8.4"
              fill={node.filled ? 'var(--ink)' : 'var(--muted)'}
              letterSpacing="0.2"
            >
              {node.label}
            </text>
          </g>
        )
      })}

      {/* The eye at the centre. */}
      <g>
        <circle cx={CX} cy={CY} r="34" fill="currentColor" />
        <circle cx={CX} cy={CY} r="30" fill="none" stroke="var(--paper)" strokeWidth="0.5" opacity="0.35" />
        <path
          d={`M${CX - 24} ${CY} C${CX - 14} ${CY - 13} ${CX + 14} ${CY - 13} ${CX + 24} ${CY} C${CX + 14} ${CY + 13} ${CX - 14} ${CY + 13} ${CX - 24} ${CY}Z`}
          fill="var(--paper)"
        />
        <circle cx={CX} cy={CY} r="7" fill="var(--iris)" />
        <circle cx={CX} cy={CY} r="3" fill="currentColor" />
        <circle cx={CX + 2.4} cy={CY - 2.6} r="1.3" fill="var(--paper)" />
      </g>

      {/* Legend and scale. */}
      <g transform="translate(32 566)">
        <circle cx="0" cy="-2" r="3.4" fill="var(--c-iris)" />
        <text x="10" y="0" fontFamily="IBM Plex Mono, monospace" fontSize="7.2" letterSpacing="1.2" fill="var(--muted)">
          QUOTES THE SOURCE
        </text>
        <circle cx="190" cy="-2" r="3.4" fill="var(--paper)" stroke="var(--ink)" strokeWidth="0.8" />
        <text x="200" y="0" fontFamily="IBM Plex Mono, monospace" fontSize="7.2" letterSpacing="1.2" fill="var(--muted)">
          READS THE RECORD
        </text>
        <line x1="330" y1="-2" x2="376" y2="-2" stroke="var(--c-iris)" strokeWidth="0.7" opacity="0.45" />
        <text x="384" y="0" fontFamily="IBM Plex Mono, monospace" fontSize="7.2" letterSpacing="1.2" fill="var(--muted)">
          ONE CALL
        </text>
      </g>
      <text x="868" y="600" textAnchor="end" fontFamily="IBM Plex Mono, monospace" fontSize="7" letterSpacing="2" fill="var(--muted)">
        MCP · ARGUS 7.7
      </text>
    </svg>
  )
}
