import { Chapter, ChapterHead } from '@/components/ui/Chapter'
import { COMPARISON } from '@/lib/content'

function Mark({ value }: { value: string }) {
  if (value === 'no') {
    return <span className="mark-no">—</span>
  }
  if (value.startsWith('yes')) {
    const rest = value.replace(/^yes,?\s*/, '')
    return (
      <span>
        <span className="mark-yes">✓</span>
        {rest && <span className="mark-text"> {rest}</span>}
      </span>
    )
  }
  return <span className="mark-text">{value}</span>
}

/** Chapter six: the same decision, set as a printed comparison. */
export function CompareChapter() {
  return (
    <Chapter number="06" label="Comparison" id="comparison">
      <ChapterHead
        title={
          <>
            The cloud is convenient.
            <br />
            It is also someone else&rsquo;s computer.
          </>
        }
        standfirst="The choice is rarely “AI or no AI”. It is whether the work, the code and the conversations can leave. Here is what each answer actually costs you."
      />

      <div className="comparison table-scroll">
        <table className="table">
          <caption className="sr-only">
            A comparison of Argus Arena, cloud AI assistants and a do-it-yourself stack
          </caption>
          <thead>
            <tr>
              <th scope="col" style={{ width: '30%' }}>
                What matters
              </th>
              <th scope="col" className="us" style={{ width: '22%' }}>
                Argus Arena
              </th>
              <th scope="col" style={{ width: '24%' }}>
                Cloud AI assistants
              </th>
              <th scope="col" style={{ width: '24%' }}>
                A do-it-yourself stack
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((row) => (
              <tr key={row.capability}>
                <td>{row.capability}</td>
                <td className="us">
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
      <p className="note mt-s">
        <strong>Read the last row first.</strong>
        The controls and the evidence are the part a do-it-yourself stack always leaves for later.
      </p>
    </Chapter>
  )
}
