import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowUpRight, Github, Menu, Moon, Sun, X } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { NAV, SITE } from '@/lib/content'
import { cn } from '@/lib/cn'

type Theme = 'dark' | 'light'

function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>('dark')
  const location = useLocation()

  useEffect(() => {
    setTheme(currentTheme())
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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
      // A browser with storage turned off still gets the theme for this page.
    }
  }

  return (
    <>
      <header className="site-header" data-scrolled={scrolled || open}>
      <div className="shell flex h-full items-center justify-between gap-6">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {NAV.map((item) => (
            <NavLink key={item.href} to={item.href} className="nav-link">
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-1.5 lg:flex">
          <a
            href={SITE.github}
            target="_blank"
            rel="noreferrer noopener"
            className="icon-button"
            aria-label="ARGUS on GitHub"
            title="ARGUS on GitHub"
          >
            <Github size={17} aria-hidden />
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            className="icon-button"
            aria-label={theme === 'dark' ? 'Switch to the light theme' : 'Switch to the dark theme'}
            title={theme === 'dark' ? 'Light theme' : 'Dark theme'}
          >
            {theme === 'dark' ? <Sun size={17} aria-hidden /> : <Moon size={17} aria-hidden />}
          </button>
          <span className="mx-2 h-5 w-px bg-line" aria-hidden />
          <Link to="/contact" className="btn btn-primary btn-sm">
            Talk to us
            <ArrowUpRight size={14} aria-hidden />
          </Link>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="icon-button"
            aria-label={theme === 'dark' ? 'Switch to the light theme' : 'Switch to the dark theme'}
          >
            {theme === 'dark' ? <Sun size={17} aria-hidden /> : <Moon size={17} aria-hidden />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="icon-button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close the menu' : 'Open the menu'}
          >
            {open ? <X size={19} aria-hidden /> : <Menu size={19} aria-hidden />}
          </button>
        </div>
      </div>
      </header>

      {/* The mobile menu is its own layer so the page behind never moves under it.
          It is a sibling of the header, not a child: the header's backdrop-filter
          would otherwise become the containing block of this fixed layer. */}
      <div
        id="mobile-nav"
        className={cn(
          'fixed inset-x-0 top-[var(--nav-height)] bottom-0 z-40 overflow-y-auto border-t border-line bg-canvas/97 backdrop-blur-xl transition-[opacity,visibility] duration-200 lg:hidden',
          open ? 'visible opacity-100' : 'invisible opacity-0',
        )}
        aria-hidden={!open}
      >
        <div className="shell flex min-h-full flex-col py-8">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {NAV.map((item, index) => (
              <NavLink
                key={item.href}
                to={item.href}
                className="flex items-baseline justify-between border-b border-line py-4"
                tabIndex={open ? undefined : -1}
              >
                <span className="display-3">{item.label}</span>
                <span className="mono text-[10px] text-faint">0{index + 1}</span>
              </NavLink>
            ))}
          </nav>

          <div className="mt-8 flex flex-col gap-3">
            <Link to="/contact" className="btn btn-primary btn-lg w-full" tabIndex={open ? undefined : -1}>
              Talk to us
              <ArrowUpRight size={16} aria-hidden />
            </Link>
            <a
              href={SITE.github}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-ghost w-full"
              tabIndex={open ? undefined : -1}
            >
              <Github size={16} aria-hidden />
              Source on GitHub
            </a>
          </div>

          <p className="mono mt-auto pt-10 text-[10px] leading-relaxed tracking-[0.12em] text-faint uppercase">
            {SITE.product} · v{SITE.version}
            <br />
            Your hardware. Your network. Your code.
          </p>
        </div>
      </div>
    </>
  )
}
