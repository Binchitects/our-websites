# SEO and indexing

This is the working list for getting the two sites indexed properly and
competing for their own search terms. It is not a promise of a first-place
ranking: Google decides that from relevance, authority, content and the
experience of the page, and no technical change can guarantee it. What this
repository can do is remove every technical reason a page would rank badly.

## What the sites now do

- **Every page is server-rendered.** The build writes the full English and
  Persian HTML for each route, not an empty React shell. A crawler sees the
  title, the copy, the headings and the internal links without executing
  JavaScript.
- **One URL per page and language.** English is at the root; Persian is under
  `/fa`. Each page has a canonical URL, and every language pair is linked with
  `hreflang="en"`, `hreflang="fa"` and `x-default`.
- **Real 404s.** An unknown path answers `404` with a rendered 404 page, not a
  soft `200`.
- **Bilingual sitemaps** at `/sitemap.xml` on both origins, with alternate
  language links. `robots.txt` allows crawling and points to the sitemap.
- **Structured data.** `Organization`, `WebSite` and `SoftwareApplication` are
  emitted on the product site; the studio site emits `Organization` and
  `WebSite`.
- **Mobile and RTL.** Both languages are responsive; Persian has `lang="fa"`,
  `dir="rtl"` and a native Persian face.
- **Performance.** Text is in the HTML, routes are split into separate chunks,
  hashed assets are cached for a year, HTML carries a five-minute shared-cache
  TTL, fonts are self-hosted subsets with `font-display: swap`, and there are no
  third-party scripts or external font requests. The measured lab scores and the
  Cloudflare cache rule are in [`PERFORMANCE.md`](PERFORMANCE.md); the font
  subsets and licenses are in [`FONTS.md`](FONTS.md).
- **Privacy.** No analytics or tracking script is loaded, so there is nothing
  to block rendering or slow the page.

## The launch checklist

Do these once, in this order:

1. **Choose one canonical origin per site.** Use
   `https://argus.binchitects.com` and `https://binchitects.com`. Do not serve
   the same content on `www` or over HTTP without a 301 to the canonical host.
2. **Verify both properties in [Google Search Console](https://search.google.com/search-console).**
   A **Domain property** for `binchitects.com` covers the apex and all
   subdomains, including `argus.binchitects.com`. Add the DNS TXT record
   Cloudflare gives you. Verify the property for `argus.binchitects.com` as well
   if you want per-host reporting.
3. **Submit both sitemaps** under the verified property:
   - `https://binchitects.com/sitemap.xml`
   - `https://argus.binchitects.com/sitemap.xml`
4. **Inspect the home pages and the five product pages** with URL Inspection →
   *Request indexing*. Do this after the Cloudflare cache is purged and the new
   deployment is live. Do not request the same URL every day; let Google crawl.
5. **Purge Cloudflare** (Caching → Configuration → Purge Everything) after a
   deploy, then open the pages in a private window and confirm the new HTML.
6. **Check the status codes** with curl, from outside the server:
   ```bash
   curl -sI https://argus.binchitects.com/ | head -1                       # 200
   curl -sI https://argus.binchitects.com/fa | head -1                    # 200
   curl -sI https://argus.binchitects.com/not-a-page | head -1            # 404
   curl -sI https://binchitects.com/not-a-page | head -1                  # 404
   curl -s https://argus.binchitects.com/robots.txt
   curl -s https://argus.binchitects.com/sitemap.xml | head
   ```
7. **Validate the structured data** with the
   [Rich Results Test](https://search.google.com/test/rich-results) and fix
   anything it reports.
8. **Bing Webmaster Tools** — import the site from Search Console, then submit
   the same sitemaps. It is a second index with much less competition.
9. **Keep `robots.txt` crawlable.** Do not block `/fa`, `/assets`, `/brand` or
   the sitemap. There is currently no staging host indexed; if one is added,
   put `X-Robots-Tag: noindex` on it.
10. **Cloudflare** — set SSL/TLS to **Full (strict)** if possible, keep
    “Always Use HTTPS” on, and avoid “Under Attack” mode permanently (it serves
    a challenge page to Googlebot).

## What to rank for

One page should own one intent. The pages already map to these clusters:

| Page | English intent | Persian intent |
|---|---|---|
| `/` | self-hosted AI platform, private AI platform | پلتفرم هوش مصنوعی خودمیزبان، هوش مصنوعی خصوصی |
| `/platform` | AI platform for teams, on-prem AI | پلتفرم هوش مصنوعی سازمانی، هوش مصنوعی درون شبکه |
| `/code-arena` | self-hosted coding agent, AI IDE | عامل کدنویسی خودمیزبان، IDE هوش مصنوعی |
| `/argus` | code index MCP, codebase RAG | نمایهٔ کد، جست‌وجوی معنایی کد |
| `/security` | AI compliance evidence, ISO 42001 | انطباق هوش مصنوعی، شواهد ممیزی |
| `/brand` | Argus Arena brand | برند Argus Arena |
| `/changelog` | Argus Arena release notes | تغییرات Argus Arena |
| `binchitects.com` | open-source studio, Binchitects | استودیوی متن‌باز، Binchitects |

Use those phrases in the **title, the first paragraph, the H1 and the internal
link text** — not stuffed into the footer. The existing copy is written for
people; keep it that way.

## Content that earns links

Technical SEO gets you eligible. Links and usefulness get you ranked.

- **Write the comparison pages people search for.** “Argus Arena vs. a cloud
  assistant”, “self-hosted AI on one GPU”, “MCP code index setup” — real
  answers, not landing-page copy.
- **Publish benchmarks and architecture notes.** An article with the actual
  numbers, GPU model, context length and latency is linkable in a way a product
  page is not.
- **Document the install.** A complete “air-gapped install in 20 minutes”
  guide, with commands, is a strong long-tail page and a natural link target.
- **Make the GitHub repository the hub.** Put the website URL in the repository
  description, README, topics and release notes. Link each release to the
  relevant page on the site.
- **Get listed where buyers look.** Self-hosting directories, awesome-lists,
  Open Source Friday, Product Hunt (for a launch, not a permanent listing),
  Hacker News “Show HN”, relevant subreddits and Persian developer communities.
  Contribute genuinely before linking.
- **Build a few real backlinks.** A guest article, a podcast, a university or
  meetup talk, a partner’s integration page. Ten relevant links beat a thousand
  directory links.
- **Keep the changelog alive.** A page that changes every release is crawled
  more often and gives people a reason to return.
- **Persian content should read like Persian**, not a machine translation.
  Search Console’s Persian queries are less saturated, but users notice.

## Technical checks after each deploy

- `curl -sI` on the home, a product page, `/fa`, and a missing path.
- View source: the H1 and body copy must be in the HTML, not only in JS.
- Search Console → Pages: no “Duplicate, Google chose a different canonical”,
  no “Soft 404”, no “Crawled – currently not indexed” on the main pages.
- Search Console → Sitemaps: both sitemaps “Success”.
- PageSpeed Insights: LCP under 2.5 s on mobile, CLS under 0.1. The site has no
  large images; if a new page adds one, compress it and set width/height.
- Rich Results Test: `SoftwareApplication` detected on the product site.
- Cloudflare: no “Challenge” page for Googlebot, no cache serving an old 200
  for a page that is now 404.

## What not to do

- Do not buy links, use link farms or publish doorway pages per city/keyword.
- Do not create one thin page per keyword; Google’s helpful-content systems
  discount that, and it makes the site worse.
- Do not hide text, cloak to Googlebot or serve different content to crawlers.
- Do not `noindex` a page and then ask for indexing; fix the cause.
- Do not translate the same English page into ten languages with machine
  output; a small, genuinely bilingual site ranks better than a hundred thin
  locales.

## A realistic timeline

1. **Week 1:** deploy, purge cache, verify Search Console, submit sitemaps,
   request indexing of the home and the four product pages.
2. **Weeks 2–4:** watch Coverage; fix any 404s, canonical conflicts or
   hreflang errors. Add the first comparison/benchmark article.
3. **Months 2–3:** publish two or three substantial pages, earn the first
   relevant links, and check which queries already bring impressions. Improve
   those pages instead of adding new ones.
4. **Months 3–6:** build authority. For competitive commercial terms, first
   place usually takes months of consistent content and links, and often a
   stronger brand than a new domain has. For specific long-tail queries
   (“self-hosted Code Arena”, “MCP code index”, Persian equivalents), the site
   can rank much sooner.

The fastest honest wins are the **specific, technical queries** and **Persian
queries**, not the head term “AI platform”.
