import { ArrowUpRight } from 'lucide-react'
import { Faq } from '@/components/ui/Faq'
import { Reveal } from '@/components/ui/Reveal'
import { SITE } from '@/lib/content'

export function FaqSection() {
  return (
    <section className="section border-t border-line">
      <div className="shell grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">Questions</p>
            <h2 className="display-2 mt-5 max-w-[13ch]">The answers people ask for first.</h2>
            <p className="lead mt-5 max-w-[38ch]">
              Anything not here is in the manual, or a message away. We answer with a person, not a
              form letter.
            </p>
            <a
              href={SITE.issues}
              target="_blank"
              rel="noreferrer noopener"
              className="link-arrow mt-6"
            >
              Ask in the repository
              <ArrowUpRight size={14} aria-hidden />
            </a>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <Faq />
        </Reveal>
      </div>
    </section>
  )
}
