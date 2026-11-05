/// <reference types="vite/client" />
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

/**
 * Builds the static shells a crawler and a link preview see: one index.html per
 * route with that route's title, description and canonical URL, plus a sitemap
 * and robots.txt. The app itself still renders on the client.
 */
const DIST = path.resolve('dist')
const ORIGIN = 'https://argus.binchitects.com'

const routes = JSON.parse(await readFile(path.resolve('src/routes.json'), 'utf8'))
const escape = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const template = await readFile(path.join(DIST, 'index.html'), 'utf8')

function withMeta(html, route) {
  const title = escape(route.title)
  const description = escape(route.description)
  const url = `${ORIGIN}${route.path}`

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)

  html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/, `<meta name="description" content="${description}" />`)
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`)

  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${title}" />`)
  html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${description}" />`)
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}" />`)

  html = html.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${title}" />`)
  html = html.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${description}" />`)

  if (!html.includes(`rel="canonical" href="${url}"`)) {
    throw new Error(`Could not set the canonical URL for ${route.path}.`)
  }

  return html
}

for (const route of routes) {
  const html = withMeta(template, route)
  if (route.path === '/') {
    await writeFile(path.join(DIST, 'index.html'), html)
  } else {
    const directory = path.join(DIST, route.path.replace(/^\//, ''))
    await mkdir(directory, { recursive: true })
    await writeFile(path.join(directory, 'index.html'), html)
  }
}

const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${ORIGIN}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.path === '/changelog' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route.path === '/' ? '1.0' : '0.7'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`
await writeFile(path.join(DIST, 'sitemap.xml'), sitemap)
await writeFile(
  path.join(DIST, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`,
)

console.log(`Prerendered ${routes.length} route shells, sitemap.xml and robots.txt.`)
