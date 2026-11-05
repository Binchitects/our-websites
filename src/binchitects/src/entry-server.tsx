import { renderToString } from 'react-dom/server'
import { App } from './App'
import type { Lang } from './lib/locale'

/** The page is static: render each language at build time. */
export function render(lang: Lang = 'en') {
  return renderToString(<App initialLang={lang} />)
}
