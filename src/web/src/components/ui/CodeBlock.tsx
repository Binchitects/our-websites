import { useEffect, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/cn'

/**
 * A snippet with a copy button. Lines are coloured by their first characters,
 * so a shell session reads like one without a highlighter dependency.
 */
export function CodeBlock({
  code,
  label,
  className,
}: {
  code: string
  label: string
  className?: string
}) {
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
      // Clipboard access can be refused (an insecure origin, a browser policy).
      // The text is selectable either way, so say nothing and leave it.
    }
  }

  return (
    <div className={cn('code-block', className)}>
      <div className="code-block-head">
        <span className="flex gap-1.5" aria-hidden>
          <span className="window-dot" />
          <span className="window-dot" />
          <span className="window-dot" />
        </span>
        <span className="code-block-label ml-2">{label}</span>
        <button type="button" onClick={copy} className="copy-button" aria-label={`Copy ${label}`}>
          {copied ? <Check size={11} aria-hidden /> : <Copy size={11} aria-hidden />}
          {copied ? 'Copied' : 'Copy'}
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
