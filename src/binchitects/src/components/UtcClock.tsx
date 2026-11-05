import { useEffect, useState } from 'react'

/** A small instrument: the page is static, but the time is not. */
export function UtcClock() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const pad = (value: number) => String(value).padStart(2, '0')
  const time = now
    ? `${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}`
    : '--:--:--'

  return (
    <span className="mono utc">
      <span className="utc-dot" aria-hidden />
      <span>UTC {time}</span>
    </span>
  )
}
