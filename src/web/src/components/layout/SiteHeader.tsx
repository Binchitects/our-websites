import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowUpRight, Moon, Sun } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { NAV, SITE } from '@/lib/content'

type Theme = 'dark' | 'light'

function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

/**
 * The masthead: wordmark, index, and the two decisions a visitor makes here —
 * the theme, and whether to talk to us. The menu is a full printed page.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>('dark')
  const location = useLocation()

  useEffect(() => {
    setTheme(currentTheme())
  }, [])

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
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
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

          <nav className="nav" aria-label="Main">
            {NAV.map((item) => (
              <NavLink key={item.href} to={item.href} className="nav-link">
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mast-actions">
            <a href={SITE.github} target="_blank" rel="noreferrer noopener" className="source-link">
              Source ↗
            </a>
            <button
              type="button"
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={theme === 'dark' ? 'Use the light theme' : 'Use the dark theme'}
            >
              {theme === 'dark' ? <Sun size={12} aria-hidden /> : <Moon size={12} aria-hidden />}
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
            <Link to="/contact" className="btn btn-outline btn-sm">
              Talk to us
              <ArrowUpRight size={12} aria-hidden />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close the menu' : 'Open the menu'}
            >
              {open ? 'Close' : 'Menu'}
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
            Close
          </button>
        </div>
        <div className="shell mobile-menu-body">
          <nav className="mobile-menu-list" aria-label="Mobile">
            {NAV.map((item, index) => (
              <NavLink key={item.href} to={item.href}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mobile-menu-foot">
            <Link to="/contact" className="btn btn-solid">
              Talk to us
              <ArrowUpRight size={14} aria-hidden />
            </Link>
            <a
              href={SITE.github}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-outline"
            >
              Source on GitHub
              <ArrowUpRight size={14} aria-hidden />
            </a>
            <button type="button" onClick={toggleTheme} className="theme-toggle" style={{ alignSelf: 'flex-start' }}>
              {theme === 'dark' ? <Sun size={12} aria-hidden /> : <Moon size={12} aria-hidden />}
              {theme === 'dark' ? 'Light theme' : 'Dark theme'}
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
