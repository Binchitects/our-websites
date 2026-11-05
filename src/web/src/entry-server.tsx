import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { App } from './App'

/** Server-render one route for the static build. */
export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
}
