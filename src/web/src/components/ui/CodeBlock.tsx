import { useEffect, useState } from 'react'
import { Check, Copy } from 'lucide-react'

/**
 * A command listing as it would be printed: a dark plate, a label, a copy
 * button, and the words as they are typed.
 */
export function CodeBlock({ code, label, className }: { code: string; label: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 1800)
    return () => window.clearTimeout(timer)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
    } catch {
      // The text is selectable even when the clipboard is refused.
    }
  }

  return (
    <div className={['listing', className].filter(Boolean).join(' ')}>
      <div className="listing-head">
        <span>{label}</span>
        <button type="button" onClick={copy} className="copy-button" aria-label={`Copy ${label}`}>
          {copied ? <Check size={10} aria-hidden /> : <Copy size={10} aria-hidden />}
          {copied ? 'copied' : 'copy'}
        </button>
      </div>
      <pre>
        <code>
          {code.split('\n').map((line, index) => {
            const trimmed = line.trimStart()
            const isComment = trimmed.startsWith('#') || trimmed.startsWith('//')
            const isPrompt = trimmed.startsWith('$')
            return (
              <span key={index} className={isComment ? 'comment' : undefined}>
                {isPrompt ? (
                  <>
                    <span className="prompt">$ </span>
                    {line.replace(/^\s*\$\s?/, '')}
                  </>
                ) : (
                  line
                )}
                {'\n'}
              </span>
            )
          })}
        </code>
      </pre>
    </div>
  )
}
