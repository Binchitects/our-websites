import { mkdir, readFile, writeFile, rm } from 'node:fs/promises'
import path from 'node:path'
import { render } from '../.ssr/entry-server.js'

const ORIGIN = 'https://binchitects.com'
const template = await readFile('dist/index.html', 'utf8')

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

await writeFile(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${ORIGIN}/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${ORIGIN}/" />
    <xhtml:link rel="alternate" hreflang="fa" href="${ORIGIN}/fa" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}/" />
  </url>
  <url>
    <loc>${ORIGIN}/fa</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${ORIGIN}/" />
    <xhtml:link rel="alternate" hreflang="fa" href="${ORIGIN}/fa" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}/" />
  </url>
</urlset>
`,
)

await rm('.ssr', { recursive: true, force: true })
