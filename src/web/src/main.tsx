import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import './styles/global.css'

const lang = window.location.pathname === '/fa' || window.location.pathname.startsWith('/fa/')
  ? 'fa'
  : 'en'
document.documentElement.lang = lang
document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr'

const container = document.getElementById('root')
if (!container) throw new Error('The root element is missing from index.html.')

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
