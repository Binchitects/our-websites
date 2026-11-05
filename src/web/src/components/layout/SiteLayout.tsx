import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { langFromPath } from '@/lib/i18n'

/** The frame every page shares. The main block is keyed by route so each page enters once. */
export function SiteLayout() {
  const { pathname } = useLocation()
  const lang = langFromPath(pathname)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr'
    document.documentElement.dataset.lang = lang
  }, [lang])

  return (
    <>
      <a href="#main" className="skip-link">
        {lang === 'fa' ? 'رفتن به محتوا' : 'Skip to content'}
      </a>
      <SiteHeader />
      <main id="main" key={pathname} className="page-enter">
        <Outlet />
      </main>
      <SiteFooter />
    </>
  )
}
