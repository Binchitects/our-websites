/// <reference types="vite/client" />
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

/**
 * Builds the static shells a crawler and a link preview see: one index.html per
 * route and language with that route's title, description and canonical URL,
 * plus a sitemap and robots.txt. The app still renders on the client.
 */
const DIST = path.resolve('dist')
const ORIGIN = 'https://argus.binchitects.com'

const routes = JSON.parse(await readFile(path.resolve('src/routes.json'), 'utf8'))
const escape = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const template = await readFile(path.join(DIST, 'index.html'), 'utf8')
const localized = (route, lang) => (lang === 'fa' ? (route.path === '/' ? '/fa' : `/fa${route.path}`) : route.path)

function withMeta(html, route, lang) {
  const local = lang === 'fa' ? route.fa : route
  const title = escape(local.title)
  const description = escape(local.description)
  const url = `${ORIGIN}${localized(route, lang)}`
  const en = `${ORIGIN}${route.path}`
  const fa = `${ORIGIN}${route.path === '/' ? '/fa' : `/fa${route.path}`}`

  html = html.replace(/<html\s+[^>]*>/, `<html lang="${lang}" dir="${lang === 'fa' ? 'rtl' : 'ltr'}" data-theme="dark">`)
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)

  html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/, `<meta name="description" content="${description}" />`)
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`)

  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${title}" />`)
  html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${description}" />`)
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}" />`)
  html = html.replace(
    /<meta\s+property="og:image:alt"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:image:alt" content="${lang === 'fa' ? 'ARGUS ARENA. با حروف سنگین Archivo روی کاغذ گچی، نشان چشم و طیف شش‌باندی Argus، کنار یک پنل مشکی Binchitects با رنگ قرمز-نارنجی.' : 'ARGUS ARENA. in heavy Archivo on chalk paper, with the roundel of the eye and the six-band Argus spectrum, beside a black Binchitects panel in red-orange.'}" />`,
  )
  html = html.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${title}" />`)
  html = html.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${description}" />`)

  const alternates = [
    `<link rel="alternate" hreflang="en" href="${en}" />`,
    `<link rel="alternate" hreflang="fa" href="${fa}" />`,
    `<link rel="alternate" hreflang="x-default" href="${en}" />`,
    `<meta property="og:locale" content="${lang === 'fa' ? 'fa_IR' : 'en_US'}" />`,
    `<meta property="og:locale:alternate" content="${lang === 'fa' ? 'en_US' : 'fa_IR'}" />`,
  ].join('\n    ')
  html = html.replace('</head>', `  ${alternates}\n  </head>`)

  if (!html.includes(`rel="canonical" href="${url}"`)) {
    throw new Error(`Could not set the canonical URL for ${localized(route, lang)}.`)
  }

  return html
}

for (const route of routes) {
  for (const lang of ['en', 'fa']) {
    const html = withMeta(template, route, lang)
    const local = localized(route, lang)
    if (local === '/') {
      await writeFile(path.join(DIST, 'index.html'), html)
    } else {
      const directory = path.join(DIST, local.replace(/^\//, ''))
      await mkdir(directory, { recursive: true })
      await writeFile(path.join(directory, 'index.html'), html)
    }
  }
}

const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${routes
  .flatMap((route) =>
    ['en', 'fa'].map((lang) => {
      const loc = localized(route, lang)
      const en = `${ORIGIN}${route.path}`
      const fa = `${ORIGIN}${route.path === '/' ? '/fa' : `/fa${route.path}`}`
      return `  <url>
    <loc>${ORIGIN}${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.path === '/changelog' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route.path === '/' ? '1.0' : '0.7'}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${en}" />
    <xhtml:link rel="alternate" hreflang="fa" href="${fa}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${en}" />
  </url>`
    }),
  )
  .join('\n')}
</urlset>
`
await writeFile(path.join(DIST, 'sitemap.xml'), sitemap)
await writeFile(
  path.join(DIST, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`,
)

console.log(`Prerendered ${routes.length * 2} route shells, sitemap.xml and robots.txt.`)
