import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { loadPage, pageForPath } from './pages/registry'
import './styles/global.css'

const lang = window.location.pathname === '/fa' || window.location.pathname.startsWith('/fa/')
  ? 'fa'
  : 'en'
document.documentElement.lang = lang
document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr'

const container = document.getElementById('root')
if (!container) throw new Error('The root element is missing from index.html.')

await loadPage(pageForPath(window.location.pathname))

const tree = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

if (container.hasChildNodes()) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}
