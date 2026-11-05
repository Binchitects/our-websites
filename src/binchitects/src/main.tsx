import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { App } from './App'
import './styles/global.css'

const container = document.getElementById('root')
if (!container) throw new Error('The root element is missing from index.html.')

const tree = (
  <StrictMode>
    <App />
  </StrictMode>
)

// The production build ships the page as HTML; development starts empty.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}
