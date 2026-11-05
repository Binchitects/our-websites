import { CheckCircle2, MinusCircle, XCircle } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { COMPARISON } from '@/lib/content'

function Mark({ value }: { value: string }) {
  if (value === 'yes' || value.startsWith('yes')) {
    return (
      <span className="inline-flex items-center gap-2 text-success">
        <CheckCircle2 size={14} aria-hidden />
        <span className="text-ink">{value === 'yes' ? 'Yes' : value}</span>
      </span>
    )
  }
  if (value === 'no') {
    return (
      <span className="inline-flex items-center gap-2 text-faint">
        <XCircle size={14} aria-hidden />
        <span>No</span>
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-2 text-muted">
      <MinusCircle size={14} className="text-faint" aria-hidden />
      <span>{value}</span>
    </span>
  )
}

export function CompareSection() {
  return (
    <section className="section border-t border-line">
      <div className="shell">
        <SectionHeading
          eyebrow="How it compares"
          title="The cloud is convenient. It is also someone else’s computer."
          lead="The choice is rarely “AI or no AI”. It is whether the work, the code and the conversations can leave. Here is what each answer actually costs you."
        />

        <Reveal className="mt-10">
          <div className="-mx-6 overflow-x-auto px-6 pb-2 sm:mx-0 sm:px-0">
            <table className="compare min-w-[720px]">
              <caption className="sr-only">
                A comparison of Argus Arena, cloud AI assistants and a do-it-yourself stack
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="w-[30%]">
                    What matters
                  </th>
                  <th scope="col" data-us="true" className="w-[22%]">
                    Argus Arena
                  </th>
                  <th scope="col" className="w-[24%]">
                    Cloud AI assistants
                  </th>
                  <th scope="col" className="w-[24%]">
                    A do-it-yourself stack
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.capability}>
                    <th scope="row" className="text-left text-[13.5px] font-[480] text-ink">
                      {row.capability}
                    </th>
                    <td data-us="true">
                      <Mark value={row.us} />
                    </td>
                    <td>
                      <Mark value={row.cloud} />
                    </td>
                    <td>
                      <Mark value={row.diy} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
