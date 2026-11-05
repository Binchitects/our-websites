import { ArrowUpRight } from 'lucide-react'
import { Chapter, ChapterHead } from '@/components/ui/Chapter'
import { Faq } from '@/components/ui/Faq'
import { SITE } from '@/lib/content'

/** Chapter eight: the questions, set as a numbered index. */
export function QuestionsChapter() {
  return (
    <Chapter number="08" label="Questions" id="questions">
      <ChapterHead
        title="The answers people ask for first."
        standfirst="Anything not here is in the manual, or a message away. We answer with a person, not a form letter."
        action={
          <a href={SITE.issues} target="_blank" rel="noreferrer noopener" className="arrow-link">
            Ask in the repository
            <ArrowUpRight size={13} aria-hidden />
          </a>
        }
      />
      <Faq />
    </Chapter>
  )
}
