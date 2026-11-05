import { useLang } from '@/lib/i18n'

const CONTENTS = [
  { number: '01', label: 'The stack', note: 'chat · studio · meetings · agents', href: '#stack' },
  { number: '02', label: 'Code Arena', note: 'the agent and its IDE', href: '#code-arena' },
  { number: '03', label: 'Argus', note: 'the code index', href: '#argus' },
  { number: '04', label: 'Deploy', note: 'one host, one .env', href: '#deploy' },
  { number: '05', label: 'Assurance', note: 'controls and evidence', href: '#assurance' },
  { number: '06', label: 'Comparison', note: 'the trust boundary', href: '#comparison' },
  { number: '07', label: 'Licensing', note: 'AGPL or commercial', href: '#licenses' },
  { number: '08', label: 'Questions', note: 'what people ask first', href: '#questions' },
]

const ACCENTS = ['iris', 'cyan', 'teal', 'violet', 'amber', 'rose'] as const

const LABELS_FA: Record<string, { label: string; note: string }> = {
  '01': { label: 'استک', note: 'چت · استودیو · جلسه‌ها · عامل‌ها' },
  '02': { label: 'Code Arena', note: 'عامل و IDE آن' },
  '03': { label: 'Argus', note: 'نمایهٔ کد' },
  '04': { label: 'استقرار', note: 'یک میزبان، یک ‎.env' },
  '05': { label: 'تضمین', note: 'کنترل‌ها و شواهد' },
  '06': { label: 'مقایسه', note: 'مرز اعتماد' },
  '07': { label: 'مجوز', note: 'AGPL یا تجاری' },
  '08': { label: 'پرسش‌ها', note: 'چیزهایی که اول می‌پرسند' },
}

/** The contents page, set as a rule-bound index under the opening spread. */
export function Toc() {
  const fa = useLang() === 'fa'

  return (
    <nav className="shell" aria-label={fa ? 'فهرست مطالب' : 'Contents'}>
      <div className="toc" id="index">
        {CONTENTS.map((item, index) => (
          <a key={item.number} href={item.href}>
            <span
              className="toc-num"
              style={{ color: `var(--c-${ACCENTS[index % ACCENTS.length]})` }}
            >
              {item.number}
            </span>
            <span className="toc-label">{fa ? LABELS_FA[item.number].label : item.label}</span>
            <span className="toc-note">{fa ? LABELS_FA[item.number].note : item.note}</span>
          </a>
        ))}
      </div>
    </nav>
  )
}
