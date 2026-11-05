import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { App } from './App'
import { langFromPath } from './lib/locale'
import './styles/global.css'

const lang = langFromPath(window.location.pathname)
document.documentElement.lang = lang
document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr'

const container = document.getElementById('root')
if (!container) throw new Error('The root element is missing from index.html.')

const tree = (
  <StrictMode>
    <App initialLang={lang} />
  </StrictMode>
)

if (container.hasChildNodes()) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}
