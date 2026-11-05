import { FAQS } from '@/lib/content'

/** Numbered questions, ruled like a contents list. Native details: no script, prints open. */
export function Faq({
  items = FAQS,
}: {
  items?: readonly { question: string; answer: string }[]
}) {
  return (
    <div className="faq">
      {items.map((item, index) => (
        <details key={item.question}>
          <summary>
            <span className="faq-num" aria-hidden>
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="faq-q">{item.question}</span>
            <span className="faq-plus" aria-hidden>
              +
            </span>
          </summary>
          <div className="faq-a">{item.answer}</div>
        </details>
      ))}
    </div>
  )
}
