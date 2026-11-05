import { mkdir, readdir, readFile, writeFile, rm } from 'node:fs/promises'
import path from 'node:path'
import { render } from '../.ssr/entry-server.js'

const ORIGIN = 'https://binchitects.com'
const template = await readFile('dist/index.html', 'utf8')
const assetFiles = await readdir('dist/assets')
const font = (prefix) => assetFiles.find((file) => file.startsWith(prefix) && file.endsWith('.woff2'))

function preloads(lang) {
  const names =
    lang === 'fa'
      ? ['vazirmatn-arabic-wght-normal', 'archivo-latin-wdth-normal']
      : ['archivo-latin-wdth-normal', 'ibm-plex-sans-latin-wght-normal']
  return names
    .map(font)
    .filter(Boolean)
    .map(
      (file) =>
        `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin />`,
    )
    .join('\n    ')
}

const META = {
  en: {
    title: 'Binchitects — open source, made for the long run',
    description:
      'Binchitects is an open-source studio. We build software people can own, read and carry forward — in public, with the people who use it. Argus Arena is our first product.',
    imageAlt:
      'The words Binchitects held between orange braces on black, beside the line: open source, made for the long run.',
  },
  fa: {
    title: 'Binchitects — متن‌باز، ساخته‌شده برای بلندمدت',
    description:
      'Binchitects یک استودیوی متن‌باز است. نرم‌افزاری می‌سازیم که مردم بتوانند مالکش باشند، بخوانندش و با خود ببرند — آشکارا، همراه با کسانی که از آن استفاده می‌کنند. Argus Arena اولین محصول ماست.',
    imageAlt:
      'نام Binchitects میان دو آکولاد نارنجی روی مشکی، کنار این جمله: متن‌باز، ساخته‌شده برای بلندمدت.',
  },
}

const escape = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function page(lang) {
  const meta = META[lang]
  const url = `${ORIGIN}${lang === 'fa' ? '/fa' : '/'}`
  let html = template

  html = html.replace(
    /<html\s+[^>]*>/,
    `<html lang="${lang}" dir="${lang === 'fa' ? 'rtl' : 'ltr'}" data-theme="dark">`,
  )
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(meta.title)}</title>`)
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escape(meta.description)}" />`,
  )
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${url}" />`,
  )
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${escape(meta.title)}" />`)
  html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${escape(meta.description)}" />`)
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}" />`)
  html = html.replace(/<meta\s+property="og:image:alt"\s+content="[^"]*"\s*\/?>/, `<meta property="og:image:alt" content="${escape(meta.imageAlt)}" />`)
  html = html.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${escape(meta.title)}" />`)
  html = html.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${escape(meta.description)}" />`)

  const alternates = [
    preloads(lang),
    `<link rel="alternate" hreflang="en" href="${ORIGIN}/" />`,
    `<link rel="alternate" hreflang="fa" href="${ORIGIN}/fa" />`,
    `<link rel="alternate" hreflang="x-default" href="${ORIGIN}/" />`,
    `<meta property="og:locale" content="${lang === 'fa' ? 'fa_IR' : 'en_US'}" />`,
    `<meta property="og:locale:alternate" content="${lang === 'fa' ? 'en_US' : 'fa_IR'}" />`,
  ].join('\n    ')
  html = html.replace('</head>', `    ${alternates}\n  </head>`)

  const markup = render(lang)
  html = html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
  return { html, markup }
}

for (const lang of ['en', 'fa']) {
  const { html, markup } = page(lang)
  const file = lang === 'fa' ? 'dist/fa/index.html' : 'dist/index.html'
  await mkdir(path.dirname(file), { recursive: true })
  await writeFile(file, html)
  console.log(`Prerendered ${lang} (${markup.length} bytes).`)
}

const today = new Date().toISOString().slice(0, 10)
await writeFile(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${ORIGIN}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${ORIGIN}/" />
    <xhtml:link rel="alternate" hreflang="fa" href="${ORIGIN}/fa" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}/" />
  </url>
  <url>
    <loc>${ORIGIN}/fa</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${ORIGIN}/" />
    <xhtml:link rel="alternate" hreflang="fa" href="${ORIGIN}/fa" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}/" />
  </url>
</urlset>
`,
)

// A real 404 for both languages, using the same stylesheet and fonts.
const css = assetFiles.find((file) => file.endsWith('.css'))
const sheet = css ? `/assets/${css}` : ''
const notFound = {
  en: {
    title: 'Page not found — Binchitects',
    description: 'That page does not exist. Start from the studio or the product.',
    skip: 'Skip to content',
    label: '404 / Not found',
    heading: 'This page is not here.',
    body: 'The address may have moved, or never existed. The studio is one step away.',
    home: 'Back to the studio',
    argus: 'Argus Arena',
    lang: 'en',
    dir: 'ltr',
  },
  fa: {
    title: 'صفحه پیدا نشد — Binchitects',
    description: 'آن صفحه وجود ندارد. از استودیو یا محصول شروع کنید.',
    skip: 'رفتن به محتوا',
    label: '۴۰۴ / پیدا نشد',
    heading: 'این صفحه اینجا نیست.',
    body: 'شاید نشانی جابه‌جا شده یا هرگز وجود نداشته. استودیو یک قدم فاصله دارد.',
    home: 'بازگشت به استودیو',
    argus: 'Argus Arena',
    lang: 'fa',
    dir: 'rtl',
  },
}

for (const [lang, copy] of Object.entries(notFound)) {
  const html = `<!doctype html>
<html lang="${copy.lang}" dir="${copy.dir}" data-theme="dark">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, follow" />
    <title>${copy.title}</title>
    <meta name="description" content="${copy.description}" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    ${sheet ? `<link rel="stylesheet" href="${sheet}" />` : ''}
    <style>html{background:#0b0b0b;color-scheme:dark}body{margin:0}</style>
  </head>
  <body>
    <a class="skip-link" href="#main">${copy.skip}</a>
    <header class="masthead">
      <div class="shell masthead-inner">
        <a class="mast-brand" href="/${lang === 'fa' ? 'fa' : ''}" aria-label="Binchitects">
          <span class="wordmark"><span class="wordmark-brace">{</span><span class="wordmark-name">Binchitects</span><span class="wordmark-brace">}</span></span>
        </a>
        <a class="mast-argus" href="https://argus.binchitects.com" target="_blank" rel="noreferrer noopener">Argus Arena</a>
      </div>
    </header>
    <main id="main">
      <section class="chapter">
        <div class="shell">
          <div class="chapter-top"><span>${copy.label}</span><span></span></div>
          <h1>${copy.heading}</h1>
          <p class="lede" style="margin-top:20px;max-width:52ch">${copy.body}</p>
          <div class="hero-actions" style="margin-top:28px">
            <a class="button button-solid" href="/${lang === 'fa' ? 'fa' : ''}">${copy.home}</a>
            <a class="button button-line" href="https://argus.binchitects.com">${copy.argus}</a>
          </div>
        </div>
      </section>
    </main>
  </body>
</html>
`
  const file = lang === 'fa' ? 'dist/fa/404.html' : 'dist/404.html'
  await mkdir(path.dirname(file), { recursive: true })
  await writeFile(file, html)
}

await rm('.ssr', { recursive: true, force: true })
