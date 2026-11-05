import { Link, useLocation } from 'react-router-dom'
import { langFromPath, switchLangPath } from '@/lib/i18n'

/** The language pair, with the current one marked. */
export function LangSwitch({ className }: { className?: string }) {
  const { pathname, search, hash } = useLocation()
  const lang = langFromPath(pathname)
  const suffix = `${search}${hash}`

  return (
    <span className={['lang-switch', className].filter(Boolean).join(' ')} aria-label={lang === 'fa' ? 'زبان' : 'Language'}>
      <Link
        to={switchLangPath(pathname, 'en') + suffix}
        hrefLang="en"
        lang="en"
        className={lang === 'en' ? 'is-current' : undefined}
        aria-current={lang === 'en' ? 'page' : undefined}
      >
        EN
      </Link>
      <span className="lang-sep" aria-hidden>
        /
      </span>
      <Link
        to={switchLangPath(pathname, 'fa') + suffix}
        hrefLang="fa"
        lang="fa"
        className={lang === 'fa' ? 'is-current' : undefined}
        aria-current={lang === 'fa' ? 'page' : undefined}
      >
        فا
      </Link>
    </span>
  )
}
