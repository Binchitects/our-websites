import { renderToString } from 'react-dom/server'
import { App } from './App'

/** The page is static: render it at build time so the HTML carries the words. */
export function render() {
  return renderToString(<App />)
}
