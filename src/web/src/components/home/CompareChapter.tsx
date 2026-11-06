import { Chapter, ChapterHead } from '@/components/ui/Chapter'
import { COMPARISON } from '@/lib/content/home'
import { useLang } from '@/lib/i18n'

function Mark({ value }: { value: string }) {
  if (value === 'no' || value === 'خیر') {
    return <span className="mark-no">—</span>
  }
  if (value.startsWith('yes') || value === 'بله' || value.startsWith('بله،')) {
    const rest = value.replace(/^yes,?\s*/, '').replace(/^بله،?\s*/, '')
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
  const fa = useLang() === 'fa'

  return (
    <Chapter number="06" label={fa ? 'مقایسه' : 'Comparison'} id="comparison">
      <ChapterHead
        title={
          <>
            {fa ? 'ابر راحت است.' : 'The cloud is convenient.'}
            <br />
            {fa ? 'کامپیوتر کس دیگری هم هست.' : 'It is also someone else’s computer.'}
          </>
        }
        standfirst={
          fa
            ? 'انتخاب به‌ندرت «هوش مصنوعی یا بی‌هوش مصنوعی» است. مسئله این است که آیا کار، کد و گفتگوها می‌توانند بیرون بروند. این است هزینهٔ واقعی هر پاسخ.'
            : 'The choice is rarely “AI or no AI”. It is whether the work, the code and the conversations can leave. Here is what each answer actually costs you.'
        }
      />

      <div className="comparison table-scroll">
        <table className="table">
          <caption className="sr-only">
            {fa
              ? 'مقایسهٔ Argus Arena، دستیارهای ابری هوش مصنوعی و یک استک خودساخته'
              : 'A comparison of Argus Arena, cloud AI assistants and a do-it-yourself stack'}
          </caption>
          <thead>
            <tr>
              <th scope="col" style={{ width: '30%' }}>
                {fa ? 'چه چیزی مهم است' : 'What matters'}
              </th>
              <th scope="col" className="us" style={{ width: '22%' }}>
                Argus Arena
              </th>
              <th scope="col" style={{ width: '24%' }}>
                {fa ? 'دستیارهای ابری' : 'Cloud AI assistants'}
              </th>
              <th scope="col" style={{ width: '24%' }}>
                {fa ? 'استک خودساخته' : 'A do-it-yourself stack'}
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((row) => (
              <tr key={row.capability}>
                <td>{fa ? row.capabilityFa : row.capability}</td>
                <td className="us">
                  <Mark value={fa ? row.usFa : row.us} />
                </td>
                <td>
                  <Mark value={fa ? row.cloudFa : row.cloud} />
                </td>
                <td>
                  <Mark value={fa ? row.diyFa : row.diy} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="note mt-s">
        <strong>{fa ? 'سطر آخر را اول بخوانید.' : 'Read the last row first.'}</strong>
        {fa
          ? ' کنترل‌ها و شواهد همان بخشی هستند که استک خودساخته همیشه برای بعد می‌گذارد.'
          : ' The controls and the evidence are the part a do-it-yourself stack always leaves for later.'}
      </p>
    </Chapter>
  )
}
