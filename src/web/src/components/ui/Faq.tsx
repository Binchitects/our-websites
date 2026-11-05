import { Plus } from 'lucide-react'
import { FAQS } from '@/lib/content'

/** Native details/summary: it opens without JavaScript, prints open, and is found by in-page search. */
export function Faq({ items = FAQS }: { items?: readonly { question: string; answer: string }[] }) {
  return (
    <div className="border-t border-line">
      {items.map((item) => (
        <details key={item.question} className="faq-item">
          <summary className="faq-question">
            {item.question}
            <span className="faq-icon" aria-hidden>
              <Plus size={13} />
            </span>
          </summary>
          <div className="faq-answer">{item.answer}</div>
        </details>
      ))}
    </div>
  )
}
