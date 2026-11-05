/**
 * The publisher's lockup: the name in a heavy sans, held between two code
 * braces in iris. It is the open-source team's mark, separate from Argus.
 */
import { useLang } from '@/lib/i18n'

export function BinchitectsLockup({
  className,
  role = true,
}: {
  className?: string
  role?: boolean
}) {
  const fa = useLang() === 'fa'

  return (
    <span className={['bx-lockup', className].filter(Boolean).join(' ')}>
      <span className="bx-brace" aria-hidden>
        {'{'}
      </span>
      <span className="bx-text">
        <span className="bx-name">Binchitects</span>
        {role && <span className="bx-role">{fa ? 'تیم متن‌باز' : 'Open source team'}</span>}
      </span>
      <span className="bx-brace" aria-hidden>
        {'}'}
      </span>
    </span>
  )
}
