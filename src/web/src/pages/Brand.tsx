import { ArrowUpRight } from 'lucide-react'
import { ArgusMark } from '@/components/brand/ArgusMark'
import { ArgusSeal } from '@/components/brand/ArgusSeal'
import { BinchitectsLockup } from '@/components/brand/BinchitectsLockup'
import { ArticleOpener } from '@/components/ui/ArticleOpener'
import { Chapter, ChapterHead } from '@/components/ui/Chapter'
import { SITE } from '@/lib/content'
import { routeMeta } from '@/lib/route-meta'
import { useSeo } from '@/lib/seo'

const sizes = [96, 56, 32, 20]

const COLOURS = [
  { name: 'Paper', hex: '#F2EFE7', ink: '#121417' },
  { name: 'Ink', hex: '#121417', ink: '#F2EFE7' },
  { name: 'Iris', hex: '#1646D8', ink: '#F2EFE7' },
  { name: 'Iris deep', hex: '#0B2E9E', ink: '#F2EFE7' },
  { name: 'Carbon', hex: '#0E0F11', ink: '#ECE8DE' },
]

/** The identity, shown as a specimen page: mark, seal, lockup, colour, files. */
export function Brand() {
  useSeo({ ...routeMeta('/brand'), path: '/brand' })

  return (
    <>
      <ArticleOpener
        section="Brand"
        title={
          <>
            The mark, the seal,
            <br />
            <em>the type.</em>
          </>
        }
        standfirst="A roundel for the watchman, an engraved seal for the instrument, and one iris blue. The system is drawn in vector, so it holds at 16 pixels and at two metres."
        actions={[
          { label: 'Download the mark', href: '/brand/argus-mark.svg', external: true, solid: true },
          { label: 'Download the seal', href: '/brand/argus-seal.svg', external: true },
        ]}
        aside={
          <>
            <p className="micro micro-ink">The rules</p>
            <ul className="mini-list" style={{ marginTop: '10px' }}>
              <li>The eye stays the focal point; never crop the iris.</li>
              <li>Keep clear space of one disc diameter on every side.</li>
              <li>One iris blue. Paper and ink do the rest.</li>
              <li>Use the seal as an illustration, not a favicon.</li>
            </ul>
          </>
        }
      />

      <Chapter number="01" label="The mark">
        <ChapterHead
          title="A roundel, not an icon."
          standfirst="An ink disc, a paper eye, one blue iris, and a dial of ticks around the rim. It reads as a seal at 16px and as an instrument up close. The disc takes the page's ink and the eye takes its paper, so the mark is at home in both themes."
        />

        <div className="brand-grid">
          <div className="brand-panel">
            <ArgusMark className="brand-mark brand-mark-large" />
            <div className="brand-size-row">
              {sizes.map((size) => (
                <div key={size} style={{ width: size }}>
                  <div style={{ width: size, height: size }}>
                    <ArgusMark className="brand-mark-fluid" />
                  </div>
                  <span className="micro">{size}px</span>
                </div>
              ))}
            </div>
          </div>
          <div className="brand-panel brand-panel-dark">
            <ArgusMark className="brand-mark brand-mark-large" />
            <p className="micro" style={{ color: 'rgba(236,232,222,.6)' }}>
              The mark on carbon
            </p>
          </div>
        </div>
      </Chapter>

      <Chapter number="02" label="The seal">
        <ChapterHead
          title="The instrument, engraved."
          standfirst="The seal is the site's one large illustration: a 180-tick dial, the eye of Panoptes, and an iris cut in 150 radial lines. It is downloadable as a vector for print, slides and merchandise."
        />
        <div className="brand-seal-wrap">
          <ArgusSeal className="brand-seal" />
        </div>
      </Chapter>

      <Chapter number="03" label="The lockup">
        <ChapterHead
          title="Argus Arena, set in Newsreader."
          standfirst="The mark sits left; the wordmark is set once, with the iris-blue full stop. The letters are never re-spaced, outlined or placed on a busy photograph."
        />
        <div className="brand-lockup">
          <ArgusMark className="brand-mark brand-mark-lockup" />
          <span className="brand-lockup-text">
            <span className="brand-name">
              Argus Arena<span className="period">.</span>
            </span>
            <span className="brand-sub">Binchitects</span>
          </span>
        </div>
        <p className="note mt-m">
          Minimum size: 24px for the mark, 80px for the lockup. Clear space: one disc diameter.
        </p>
      </Chapter>

      <Chapter number="04" label="Colour">
        <ChapterHead
          title="Paper, ink, one iris."
          standfirst="The palette is deliberately small: warm paper, ink, and the blue that the product's iris is drawn from. Carbon is the dark counterpart, not a second palette."
        />
        <div className="swatches">
          {COLOURS.map((colour) => (
            <div key={colour.name} className="swatch">
              <div className="swatch-colour" style={{ background: colour.hex, color: colour.ink }}>
                <span>AA</span>
              </div>
              <div className="swatch-meta">
                <strong>{colour.name}</strong>
                <span className="mono">{colour.hex}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="note mt-s">
          <strong>Contrast</strong>
          Body text is ink on paper at 5.8:1 or better. Iris is for accents, links and the seal —
          never for long copy on ink.
        </p>
      </Chapter>

      <Chapter number="05" label="The publisher">
        <ChapterHead
          title="Binchitects keeps an open-source team."
          standfirst="The publisher is not a line in the footer. Binchitects keeps a team dedicated to open-source development: the repository, the manual, the issues and the release notes are public, and the AGPL is the licence the work is offered under."
        />
        <BinchitectsLockup className="bx-lg" />
        <div className="publisher-grid">
          <div>
            <p className="publisher-lead">The work is done in the open, by people whose job it is.</p>
            <p className="body">
              Argus Arena is developed in public. The source is on GitHub, the manual is in the
              repository, the issues are open, and the release notes say what changed and why. The
              contributing guide is the way in.
            </p>
          </div>
          <div className="publisher-links">
            <a href={SITE.org} target="_blank" rel="noreferrer noopener">
              <span>Binchitects on GitHub</span>
              <ArrowUpRight size={13} aria-hidden />
            </a>
            <a href={SITE.github} target="_blank" rel="noreferrer noopener">
              <span>The repository</span>
              <ArrowUpRight size={13} aria-hidden />
            </a>
            <a href={SITE.contributing} target="_blank" rel="noreferrer noopener">
              <span>Contributing</span>
              <ArrowUpRight size={13} aria-hidden />
            </a>
            <p className="publisher-meta">AGPL-3.0-only · source, issues and manual in public</p>
          </div>
        </div>
      </Chapter>

      <Chapter number="06" label="Files">
        <ChapterHead
          title="Take the vectors."
          standfirst="The mark and the seal are SVG, drawn to a 64 and 640 unit grid. The favicon, app icons and social image are generated from them."
        />
        <div className="brand-files">
          <a href="/brand/argus-mark.svg" target="_blank" rel="noreferrer noopener">
            <span>
              <strong>Argus mark</strong>
              <span className="micro">SVG · 64 × 64</span>
            </span>
            <ArrowUpRight size={14} aria-hidden />
          </a>
          <a href="/brand/argus-seal.svg" target="_blank" rel="noreferrer noopener">
            <span>
              <strong>Argus seal</strong>
              <span className="micro">SVG · 640 × 640</span>
            </span>
            <ArrowUpRight size={14} aria-hidden />
          </a>
          <a href="/favicon.svg" target="_blank" rel="noreferrer noopener">
            <span>
              <strong>Favicon</strong>
              <span className="micro">SVG</span>
            </span>
            <ArrowUpRight size={14} aria-hidden />
          </a>
          <a href="/og.png" target="_blank" rel="noreferrer noopener">
            <span>
              <strong>Social image</strong>
              <span className="micro">PNG · 1200 × 630</span>
            </span>
            <ArrowUpRight size={14} aria-hidden />
          </a>
        </div>
        <p className="note mt-s">
          <strong>Usage</strong>
          The names Argus Arena, Argus and Code Arena are trademarks of Binchitects. A product or
          service offered to others under one of those names needs written permission. Ask through
          the <a href="/contact" className="text-link">contact form</a>.
        </p>
      </Chapter>
    </>
  )
}
