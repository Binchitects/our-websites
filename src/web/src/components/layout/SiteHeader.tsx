import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ArrowUpRight, Moon, Sun } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { LangSwitch } from '@/components/ui/LangSwitch'
import { Link, NavLink } from '@/components/ui/LocalLink'
import { NAV, SITE } from '@/lib/content'
import { useLang } from '@/lib/i18n'


/**
 * The masthead: wordmark, index, and the two decisions a visitor makes here —
 * the theme, and whether to talk to us. The menu is a full printed page.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const lang = useLang()
  const fa = lang === 'fa'
  const navLabel = (item: (typeof NAV)[number]) => (fa ? (item.labelFa ?? item.label) : item.label)

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const toggleTheme = () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'
    document.documentElement.dataset.theme = next
    document.documentElement.style.colorScheme = next
    try {
      localStorage.setItem('argus-theme', next)
    } catch {
      // A browser with storage off still gets the theme for this page.
    }
  }

  return (
    <>
      <header className="masthead">
        <div className="shell masthead-inner">
          <Logo />

          <nav className="nav" aria-label={fa ? 'اصلی' : 'Main'}>
            {NAV.map((item) => (
              <NavLink key={item.href} to={item.href} className="nav-link">
                {navLabel(item)}
              </NavLink>
            ))}
          </nav>

          <div className="mast-actions">
            <LangSwitch />
            <a href={SITE.github} target="_blank" rel="noreferrer noopener" className="source-link">
              {fa ? 'کد منبع ↗' : 'Source ↗'}
            </a>
            <button
              type="button"
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={fa ? 'تغییر پوستهٔ روشن و تیره' : 'Toggle the light and dark theme'}
            >
              <Sun size={12} className="theme-icon theme-icon-sun" aria-hidden />
              <Moon size={12} className="theme-icon theme-icon-moon" aria-hidden />
            </button>
            <Link to="/contact" className="btn btn-outline btn-sm">
              {fa ? 'با ما حرف بزنید' : 'Talk to us'}
              <ArrowUpRight size={12} aria-hidden />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? (fa ? 'بستن منو' : 'Close the menu') : (fa ? 'باز کردن منو' : 'Open the menu')}
            >
              {open ? (fa ? 'بستن' : 'Close') : (fa ? 'منو' : 'Menu')}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className="mobile-menu"
        data-open={open}
        aria-hidden={!open}
        inert={open ? undefined : true}
      >
        <div className="shell mobile-menu-top">
          <Logo />
          <button type="button" onClick={() => setOpen(false)} className="menu-toggle" style={{ display: 'inline-flex' }}>
            {fa ? 'بستن' : 'Close'}
          </button>
        </div>
        <div className="shell mobile-menu-body">
          <nav className="mobile-menu-list" aria-label={fa ? 'منوی موبایل' : 'Mobile'}>
            {NAV.map((item, index) => (
              <NavLink key={item.href} to={item.href}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {navLabel(item)}
              </NavLink>
            ))}
          </nav>
          <div className="mobile-menu-foot">
            <LangSwitch className="mobile-lang" />
            <Link to="/contact" className="btn btn-solid">
              {fa ? 'با ما حرف بزنید' : 'Talk to us'}
              <ArrowUpRight size={14} aria-hidden />
            </Link>
            <a
              href={SITE.github}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-outline"
            >
              {fa ? 'کد منبع در GitHub' : 'Source on GitHub'}
              <ArrowUpRight size={14} aria-hidden />
            </a>
            <button
              type="button"
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={fa ? 'تغییر پوستهٔ روشن و تیره' : 'Toggle the light and dark theme'}
              style={{ alignSelf: 'flex-start' }}
            >
              <Sun size={12} className="theme-icon theme-icon-sun" aria-hidden />
              <Moon size={12} className="theme-icon theme-icon-moon" aria-hidden />
            </button>
            <p className="dateline" style={{ marginTop: '18px' }}>
              <span>Argus Arena</span>
              <span className="dot-sep">/</span>
              <span>v{SITE.version}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
