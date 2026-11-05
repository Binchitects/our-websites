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
import { Brand } from '@/pages/Brand'
import { NotFound } from '@/pages/NotFound'

/** English at the root; Persian under /fa. */
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
        <Route path="brand" element={<Brand />} />

        <Route path="fa" element={<Home />} />
        <Route path="fa/platform" element={<Platform />} />
        <Route path="fa/code-arena" element={<CodeArena />} />
        <Route path="fa/argus" element={<ArgusPage />} />
        <Route path="fa/security" element={<Security />} />
        <Route path="fa/changelog" element={<Changelog />} />
        <Route path="fa/contact" element={<Contact />} />
        <Route path="fa/privacy" element={<Privacy />} />
        <Route path="fa/brand" element={<Brand />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
