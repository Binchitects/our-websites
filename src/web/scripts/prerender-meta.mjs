/// <reference types="vite/client" />
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { render } from '../.ssr/entry-server.js'
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

const assetFiles = await readdir(path.join(DIST, 'assets'))
const cssFile = assetFiles.find((file) => file.endsWith('.css'))
if (!cssFile) throw new Error('No compiled stylesheet was found in dist/assets.')
const css = (await readFile(path.join(DIST, 'assets', cssFile), 'utf8')).replace(/<\/style/gi, '<\\/style')

/** Inline the one stylesheet so no CSS request blocks the first paint. */
function inlineCss(html) {
  const inlined = html.replace(/<link\s+[^>]*rel="stylesheet"[^>]*>/, `<style>${css}</style>`)
  if (inlined === html) throw new Error('Could not inline the compiled stylesheet.')
  return inlined
}

const template = inlineCss(await readFile(path.join(DIST, 'index.html'), 'utf8'))
const font = (prefix) => assetFiles.find((file) => file.startsWith(prefix) && file.endsWith('.woff2'))

function preloads(lang) {
  const names =
    lang === 'fa'
      ? ['vazirmatn-arabic', 'archivo']
      : ['plex-sans', 'archivo']
  return names
    .map(font)
    .filter(Boolean)
    .map(
      (file) =>
        `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin fetchpriority="high" />`,
    )
    .join('\n    ')
}
const localized = (route, lang) => (lang === 'fa' ? (route.path === '/' ? '/fa' : `/fa${route.path}`) : route.path)

async function withMeta(html, route, lang) {
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

  const markup = await render(localized(route, lang))
  html = html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
  if (!html.includes(`<div id="root">${markup}</div>`)) {
    throw new Error(`Could not render ${localized(route, lang)} into its shell.`)
  }

  const viewport = html.match(/<meta\s+name="viewport"[^>]*>/)
  if (!viewport) throw new Error(`No viewport tag for ${localized(route, lang)}.`)
  html = html.replace(viewport[0], `${viewport[0]}\n    ${preloads(lang)}`)

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
    const html = await withMeta(template, route, lang)
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

// The 404 page is served with a real 404 status by nginx; keep it out of the index.
for (const lang of ['en', 'fa']) {
  const routePath = lang === 'fa' ? '/fa/404' : '/404'
  const title = escape(lang === 'fa' ? 'صفحه پیدا نشد — ARGUS' : 'Page not found — ARGUS')
  const description = escape(
    lang === 'fa' ? 'آن صفحه وجود ندارد. از پلتفرم، Code Arena، Argus یا کد منبع شروع کنید.' : 'That page does not exist. Start from the platform, Code Arena, Argus, or the source.',
  )
  const url = `${ORIGIN}${routePath}`
  const markup = await render(routePath)

  let html = template
    .replace(/<html\s+[^>]*>/, `<html lang="${lang}" dir="${lang === 'fa' ? 'rtl' : 'ltr'}" data-theme="dark">`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/, `<meta name="description" content="${description}" />`)
    .replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, '')
    .replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${description}" />`)
    .replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}" />`)
    .replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${title}" />`)
    .replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${description}" />`)
    .replace('</head>', '  <meta name="robots" content="noindex, follow" />\n  </head>')
    .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)

  const file = lang === 'fa' ? 'dist/fa/404.html' : 'dist/404.html'
  await mkdir(path.dirname(file), { recursive: true })
  await writeFile(file, html)
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

await rm('.ssr', { recursive: true, force: true })
console.log(`Prerendered ${routes.length * 2} pages, sitemap.xml and robots.txt.`)
