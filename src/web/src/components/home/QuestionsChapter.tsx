import { ArrowUpRight } from 'lucide-react'
import { Chapter, ChapterHead } from '@/components/ui/Chapter'
import { Faq } from '@/components/ui/Faq'
import { FAQS } from '@/lib/content/faq'
import { SITE } from '@/lib/site'
import { useLang } from '@/lib/i18n'

/** Chapter eight: the questions, set as a numbered index. */
export function QuestionsChapter() {
  const fa = useLang() === 'fa'
  const items = fa
    ? FAQS.map((item) => ({ question: item.questionFa, answer: item.answerFa }))
    : FAQS

  return (
    <Chapter number="08" label={fa ? 'پرسش‌ها' : 'Questions'} id="questions">
      <ChapterHead
        title={fa ? 'پاسخ‌هایی که اول از همه می‌پرسند.' : 'The answers people ask for first.'}
        standfirst={
          fa
            ? 'هرچه اینجا نیست در راهنماست، یا با یک پیام. با یک انسان پاسخ می‌دهیم، نه با نامهٔ قالبی.'
            : 'Anything not here is in the manual, or a message away. We answer with a person, not a form letter.'
        }
        action={
          <a href={SITE.issues} target="_blank" rel="noreferrer noopener" className="arrow-link">
            {fa ? 'در مخزن بپرسید' : 'Ask in the repository'}
            <ArrowUpRight size={13} aria-hidden />
          </a>
        }
      />
      <Faq items={items} />
    </Chapter>
  )
}
