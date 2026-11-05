/** The publisher's wordmark: the name held between two code braces. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={['wordmark', className].filter(Boolean).join(' ')}>
      <span className="wordmark-brace" aria-hidden>
        {'{'}
      </span>
      <span className="wordmark-name">Binchitects</span>
      <span className="wordmark-brace" aria-hidden>
        {'}'}
      </span>
    </span>
  )
}
