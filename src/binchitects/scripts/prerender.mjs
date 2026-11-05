import { readFile, writeFile, rm } from 'node:fs/promises'
import { render } from '../.ssr/entry-server.js'

const file = 'dist/index.html'
const template = await readFile(file, 'utf8')
const markup = render()
const output = template.replace('<div id="root"></div>', `<div id="root">${markup}</div>`)

if (output === template) throw new Error('The root element was not found in dist/index.html.')

await writeFile(file, output)
await rm('.ssr', { recursive: true, force: true })
console.log(`Prerendered ${markup.length} bytes of HTML.`)
