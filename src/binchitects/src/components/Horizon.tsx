/**
 * The long horizon: a graduated arc from now to the long run, with the open
 * default at its apex. One instrument, no decoration.
 */
import type { Lang } from '@/lib/locale'

export function Horizon({ className, lang = 'en' }: { className?: string; lang?: Lang }) {
  const fa = lang === 'fa'
  const labelFont = fa ? 'Vazirmatn Variable, sans-serif' : 'IBM Plex Mono, monospace'
  const tracking = fa ? 0 : 2.6
  const CX = 500
  const CY = 280
  const RX = 460
  const RY = 200

  const points = Array.from({ length: 73 }, (_, index) => {
    const t = Math.PI + (index / 72) * Math.PI
    const x = CX + RX * Math.cos(t)
    const y = CY + RY * Math.sin(t)
    return { t, x, y, index }
  })

  const ticks = points.map(({ t, x, y, index }) => {
    const major = index % 12 === 0
    const length = major ? 10 : 4.5
    const nx = Math.cos(t)
    const ny = Math.sin(t)
    return (
      <line
        key={index}
        x1={x + nx * 3}
        y1={y + ny * 3}
        x2={x + nx * length}
        y2={y + ny * length}
        stroke="var(--orange)"
        strokeWidth={major ? 1.1 : 0.55}
        opacity={major ? 0.95 : 0.45}
      />
    )
  })

  return (
    <svg
      viewBox="0 0 1000 340"
      className={['horizon', className].filter(Boolean).join(' ')}
      role="img"
      aria-label={fa ? "یک کمان درجه‌بندی‌شده از اکنون در راست تا بلندمدت در چپ، با «آشکارا به‌طور پیش‌فرض» در اوج." : "A graduated arc rising from now on the left to the long run on the right, with open by default at its apex."}
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x={fa ? 960 : 40}
        y="34"
        textAnchor={fa ? 'end' : 'start'}
        fontFamily={labelFont}
        fontSize="10"
        letterSpacing={tracking}
        fill="var(--muted)"
      >
        {fa ? 'شکل ۰۱ / افق بلند' : 'FIG. 01 / THE LONG HORIZON'}
      </text>
      <text
        x={fa ? 40 : 960}
        y="34"
        textAnchor={fa ? 'start' : 'end'}
        fontFamily={labelFont}
        fontSize="10"
        letterSpacing={tracking}
        fill="var(--muted)"
      >
        {fa ? 'استودیوی متن‌باز' : 'OPEN-SOURCE STUDIO'}
      </text>

      <path
        d={`M ${CX - RX} ${CY} A ${RX} ${RY} 0 0 1 ${CX + RX} ${CY}`}
        fill="none"
        stroke="var(--orange)"
        strokeWidth="1.5"
        opacity="0.9"
      />
      <path
        d={`M ${CX - RX + 34} ${CY} A ${RX - 34} ${RY - 26} 0 0 1 ${CX + RX - 34} ${CY}`}
        fill="none"
        stroke="var(--paper)"
        strokeWidth="0.6"
        strokeDasharray="2 10"
        opacity="0.28"
      />

      <g>{ticks}</g>

      <line x1="40" y1={CY} x2="960" y2={CY} stroke="var(--paper)" strokeWidth="0.6" opacity="0.2" />
      {Array.from({ length: 41 }, (_, index) => (
        <line
          key={`base-${index}`}
          x1={40 + index * 23}
          y1={CY}
          x2={40 + index * 23}
          y2={CY + (index % 5 === 0 ? 8 : 4)}
          stroke="var(--paper)"
          strokeWidth="0.5"
          opacity="0.32"
        />
      ))}

      <g className="horizon-marker">
        <circle cx="500" cy="80" r="11" fill="none" stroke="var(--orange)" strokeWidth="0.8" opacity="0.35" />
        <circle cx="500" cy="80" r="4.4" fill="var(--orange)" />
      </g>
      <text x="500" y="56" textAnchor="middle" fontFamily={labelFont} fontSize="10" letterSpacing={tracking} fill="var(--orange)">
        {fa ? 'آشکارا، به‌طور پیش‌فرض' : 'OPEN BY DEFAULT'}
      </text>

      <text
        x={fa ? 960 : 40}
        y="310"
        textAnchor={fa ? 'end' : 'start'}
        fontFamily={labelFont}
        fontSize="10"
        letterSpacing={tracking}
        fill="var(--paper)"
      >
        {fa ? 'اکنون' : 'NOW'}
      </text>
      <text
        x={fa ? 40 : 960}
        y="310"
        textAnchor={fa ? 'start' : 'end'}
        fontFamily={labelFont}
        fontSize="10"
        letterSpacing={tracking}
        fill="var(--paper)"
      >
        {fa ? 'بلندمدت' : 'THE LONG RUN'}
      </text>
    </svg>
  )
}
