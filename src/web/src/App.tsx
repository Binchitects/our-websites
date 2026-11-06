import { Route, Routes } from 'react-router-dom'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { Page } from '@/pages/registry'

/** English at the root; Persian under /fa. Page chunks load on demand. */
export function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<Page key="Home" name="Home" />} />
        <Route path="platform" element={<Page key="Platform" name="Platform" />} />
        <Route path="code-arena" element={<Page key="CodeArena" name="CodeArena" />} />
        <Route path="argus" element={<Page key="ArgusPage" name="ArgusPage" />} />
        <Route path="security" element={<Page key="Security" name="Security" />} />
        <Route path="changelog" element={<Page key="Changelog" name="Changelog" />} />
        <Route path="contact" element={<Page key="Contact" name="Contact" />} />
        <Route path="privacy" element={<Page key="Privacy" name="Privacy" />} />
        <Route path="brand" element={<Page key="Brand" name="Brand" />} />

        <Route path="fa" element={<Page key="Home" name="Home" />} />
        <Route path="fa/platform" element={<Page key="Platform" name="Platform" />} />
        <Route path="fa/code-arena" element={<Page key="CodeArena" name="CodeArena" />} />
        <Route path="fa/argus" element={<Page key="ArgusPage" name="ArgusPage" />} />
        <Route path="fa/security" element={<Page key="Security" name="Security" />} />
        <Route path="fa/changelog" element={<Page key="Changelog" name="Changelog" />} />
        <Route path="fa/contact" element={<Page key="Contact" name="Contact" />} />
        <Route path="fa/privacy" element={<Page key="Privacy" name="Privacy" />} />
        <Route path="fa/brand" element={<Page key="Brand" name="Brand" />} />
        <Route path="*" element={<Page key="NotFound" name="NotFound" />} />
      </Route>
    </Routes>
  )
}
