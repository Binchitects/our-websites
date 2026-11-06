import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { App } from './App'
import { preloadAll } from './pages/registry'

/** Server-render one route for the static build. */
export async function render(url: string) {
  await preloadAll()
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
}
