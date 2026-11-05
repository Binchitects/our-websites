import { Route, Routes } from 'react-router-dom'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { Home } from '@/pages/Home'
import { Platform } from '@/pages/Platform'
import { CodeArena } from '@/pages/CodeArena'
import { ArgusPage } from '@/pages/ArgusPage'
import { Security } from '@/pages/Security'
import { Changelog } from '@/pages/Changelog'
import { Contact } from '@/pages/Contact'
import { Privacy } from '@/pages/Privacy'
import { NotFound } from '@/pages/NotFound'

export function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<Home />} />
        <Route path="platform" element={<Platform />} />
        <Route path="code-arena" element={<CodeArena />} />
        <Route path="argus" element={<ArgusPage />} />
        <Route path="security" element={<Security />} />
        <Route path="changelog" element={<Changelog />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
