import { ArrowUpRight } from 'lucide-react'
import { ArgusMark } from '@/components/brand/ArgusMark'
import { ArgusSeal } from '@/components/brand/ArgusSeal'
import { BinchitectsLockup } from '@/components/brand/BinchitectsLockup'
import { ArticleOpener } from '@/components/ui/ArticleOpener'
import { Chapter, ChapterHead } from '@/components/ui/Chapter'
import { SITE } from '@/lib/content'
import { usePageSeo } from '@/lib/seo'
import { useLang } from '@/lib/i18n'

const sizes = [96, 56, 32, 20]

const COLOURS = [
  { name: 'Paper', nameFa: 'کاغذ', hex: '#EEF1EA', ink: '#0F1410' },
  { name: 'Ink', nameFa: 'جوهر', hex: '#0F1410', ink: '#EEF1EA' },
  { name: 'Iris', nameFa: 'آیریس', hex: '#1746E0', ink: '#EEF1EA' },
  { name: 'Iris deep', nameFa: 'آیریس تیره', hex: '#0B2E9E', ink: '#EEF1EA' },
  { name: 'Signal', nameFa: 'سیگنال', hex: '#FF3B00', ink: '#F2EDE7' },
  { name: 'Black', nameFa: 'مشکی', hex: '#0B0B0B', ink: '#F2EDE7' },
]

/** The Argus spectrum: one band for each kind of work in the index. */
const SPECTRUM = [
  { name: 'Iris', nameFa: 'آیریس', hex: '#1746E0', ink: '#EEF1EA', role: 'code' },
  { name: 'Cyan', nameFa: 'فیروزه‌ای', hex: '#007F99', ink: '#EEF1EA', role: 'search' },
  { name: 'Teal', nameFa: 'سبزآبی', hex: '#0B7A6A', ink: '#EEF1EA', role: 'documents' },
  { name: 'Violet', nameFa: 'بنفش', hex: '#5B3BD6', ink: '#EEF1EA', role: 'record' },
  { name: 'Amber', nameFa: 'کهربایی', hex: '#8A5400', ink: '#EEF1EA', role: 'carry' },
  { name: 'Rose', nameFa: 'صورتی', hex: '#B02458', ink: '#EEF1EA', role: 'failure' },
]

/** The identity, shown as a specimen page: mark, seal, lockup, colour, files. */
export function Brand() {
  usePageSeo('/brand')
  const fa = useLang() === 'fa'

  return (
    <>
      <ArticleOpener
        section={fa ? 'برند' : 'Brand'}
        title={
          <>
            {fa ? 'نشان، مهر،' : 'The mark, the seal,'}
            <br />
            <em>{fa ? 'و تایپوگرافی.' : 'the type.'}</em>
          </>
        }
        standfirst={
          fa
            ? 'یک نشان گرد برای نمایه، یک مهر حکاکی‌شده برای ابزار و شش نوار رنگ دور آن. سیستم وکتور است، پس در ۱۶ پیکسل و در دو متر هم درست می‌نشیند.'
            : 'A roundel for the index, an engraved seal for the instrument, and six bands of colour around it. The system is drawn in vector, so it holds at 16 pixels and at two metres.'
        }
        actions={[
          { label: fa ? 'دانلود نشان' : 'Download the mark', href: '/brand/argus-mark.svg', external: true, solid: true },
          { label: fa ? 'دانلود مهر' : 'Download the seal', href: '/brand/argus-seal.svg', external: true },
        ]}
        aside={
          <>
            <p className="micro micro-ink">{fa ? 'قواعد' : 'The rules'}</p>
            <ul className="mini-list" style={{ marginTop: '10px' }}>
              <li>{fa ? 'چشم نقطهٔ کانونی می‌ماند؛ هرگز مردمک را نبُرید.' : 'The eye stays the focal point; never crop the iris.'}</li>
              <li>{fa ? 'فضای خالی به اندازهٔ یک قطر دیسک در هر طرف نگه دارید.' : 'Keep clear space of one disc diameter on every side.'}</li>
              <li>{fa ? 'یک آیریس برای محصول، شش نوار برای نمایه.' : 'One iris for the product, six bands for the index.'}</li>
              <li>{fa ? 'از مهر به‌عنوان تصویر استفاده کنید، نه فاوآیکن.' : 'Use the seal as an illustration, not a favicon.'}</li>
            </ul>
          </>
        }
      />

      <Chapter number="01" label={fa ? 'نشان' : 'The mark'}>
        <ChapterHead
          title={fa ? 'یک نشان گرد، نه یک آیکن.' : 'A roundel, not an icon.'}
          standfirst={
            fa
              ? 'یک دیسک جوهری، یک چشم کاغذی، یک آیریس آبی و یک صفحهٔ تیک دور لبه. در ۱۶ پیکسل مثل یک مهر و از نزدیک مثل یک ابزار خوانده می‌شود. دیسک جوهر صفحه را می‌گیرد و چشم کاغذش را، پس نشان در هر دو پوسته خانه است.'
              : 'An ink disc, a paper eye, one blue iris, and a dial of ticks around the rim. It reads as a seal at 16px and as an instrument up close. The disc takes the page’s ink and the eye takes its paper, so the mark is at home in both themes.'
          }
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
              {fa ? 'نشان روی کاربن' : 'The mark on carbon'}
            </p>
          </div>
        </div>
      </Chapter>

      <Chapter number="02" label={fa ? 'مهر' : 'The seal'}>
        <ChapterHead
          title={fa ? 'ابزار، حکاکی‌شده.' : 'The instrument, engraved.'}
          standfirst={
            fa
              ? 'مهر تنها تصویر بزرگ سایت است: یک صفحهٔ ۱۸۰ تیکی، چشم Argus و آیریسی که در ۱۵۰ خط شعاعی بریده شده. به‌صورت وکتور برای چاپ، اسلاید و محصولات قابل دانلود است.'
              : 'The seal is the site’s one large illustration: a 180-tick dial, the Argus eye, and an iris cut in 150 radial lines. It is downloadable as a vector for print, slides and merchandise.'
          }
        />
        <div className="brand-seal-wrap">
          <ArgusSeal className="brand-seal" />
        </div>
      </Chapter>

      <Chapter number="03" label={fa ? 'قفل‌شدگی' : 'The lockup'}>
        <ChapterHead
          title={fa ? 'Argus Arena، با Archivo.' : 'Argus Arena, set in Archivo.'}
          standfirst={
            fa
              ? 'نشان سمت چپ می‌نشیند؛ نام یک‌بار با Archivo چیده می‌شود، با نقطهٔ آبی آیریس و برچسب قرمز-نارنجی ناشر در زیر. حروف هرگز دوباره فاصله‌گذاری، دورگیری یا روی عکس شلوغ قرار نمی‌گیرند.'
              : 'The mark sits left; the wordmark is set once in Archivo, with the iris-blue full stop and the publisher’s red-orange tag beneath. The letters are never re-spaced, outlined or placed on a busy photograph.'
          }
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
          {fa
            ? 'حداقل اندازه: ۲۴ پیکسل برای نشان، ۸۰ پیکسل برای قفل‌شدگی. فضای خالی: یک قطر دیسک.'
            : 'Minimum size: 24px for the mark, 80px for the lockup. Clear space: one disc diameter.'}
        </p>
      </Chapter>

      <Chapter number="04" label={fa ? 'رنگ' : 'Colour'}>
        <ChapterHead
          title={fa ? 'کاغذی خنک، شش نوار رنگ.' : 'A cool paper, six bands of colour.'}
          standfirst={
            fa
              ? 'پالت خانه عمداً کوچک است: کاغذ گچی، جوهر، آبی آیریس و یک نارنجی سیگنال برای تم قرمز-نارنجی روی مشکی ناشر. طیف Argus شش رنگ کاری اضافه می‌کند که هرگز تزئینی نیستند: هرکدام نوعی از کار را نشان می‌دهند.'
              : 'The house palette is deliberately small: chalk paper, ink, the blue of the iris, and one signal orange for the publisher’s red-orange-on-black theme. The Argus spectrum adds six working colours, never used as decoration: each one marks a different kind of work.'
          }
        />
        <div className="swatches">
          {COLOURS.map((colour) => (
            <div key={colour.name} className="swatch">
              <div className="swatch-colour" style={{ background: colour.hex, color: colour.ink }}>
                <span>AA</span>
              </div>
              <div className="swatch-meta">
                <strong>{fa ? colour.nameFa : colour.name}</strong>
                <span className="mono">{colour.hex}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="swatches swatches-spectrum">
          {SPECTRUM.map((colour) => (
            <div key={colour.name} className="swatch">
              <div className="swatch-colour" style={{ background: colour.hex, color: colour.ink }}>
                <span>
                  {fa
                    ? { code: 'کد', search: 'جست‌وجو', documents: 'مستندات', record: 'دفتر', carry: 'ادامه', failure: 'خطا' }[colour.role]
                    : colour.role}
                </span>
              </div>
              <div className="swatch-meta">
                <strong>{fa ? colour.nameFa : colour.name}</strong>
                <span className="mono">{colour.hex}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="note mt-s">
          <strong>{fa ? 'کنتراست' : 'Contrast'}</strong>
          {fa
            ? ' متن اصلی جوهر روی کاغذ با نسبت ۵٫۸:۱ یا بهتر است. طیف برای نمایه، رد و صفحهٔ سیستم است، نه متن بلند. سیگنال رنگ ناشر است: قرمز-نارنجی روی مشکی، برای Binchitects و تیم متن‌باز.'
            : ' Body text is ink on paper at 5.8:1 or better. The spectrum is for the index, the trace and the system plate, not for long copy. Signal is the publisher’s colour: red-orange on black, used for Binchitects and the open-source team.'}
        </p>
      </Chapter>

      <Chapter number="05" label={fa ? 'ناشر' : 'The publisher'}>
        <ChapterHead
          title={fa ? 'Binchitects یک تیم متن‌باز دارد.' : 'Binchitects keeps an open-source team.'}
          standfirst={
            fa
              ? 'ناشر یک خط در فوتر نیست. Binchitects تیمی را به توسعهٔ متن‌باز اختصاص داده: مخزن، راهنما، ایشوها و یادداشت‌های انتشار عمومی‌اند و AGPL مجوزی است که کار تحت آن ارائه می‌شود.'
              : 'The publisher is not a line in the footer. Binchitects keeps a team dedicated to open-source development: the repository, the manual, the issues and the release notes are public, and the AGPL is the licence the work is offered under.'
          }
        />
        <div className="publisher-card">
        <BinchitectsLockup className="bx-lg" />
        <div className="publisher-grid">
          <div>
            <p className="publisher-lead">
              {fa ? 'کار آشکارا انجام می‌شود، توسط کسانی که شغلشان همین است.' : 'The work is done in the open, by people whose job it is.'}
            </p>
            <p className="body">
              {fa
                ? 'Argus Arena در ملأ عام توسعه می‌یابد. کد منبع در GitHub است، راهنما در مخزن، ایشوها باز و یادداشت‌های انتشار می‌گویند چه چیزی و چرا عوض شد. راهنمای مشارکت راه ورود است.'
                : 'Argus Arena is developed in public. The source is on GitHub, the manual is in the repository, the issues are open, and the release notes say what changed and why. The contributing guide is the way in.'}
            </p>
          </div>
          <div className="publisher-links">
            <a href={SITE.org} target="_blank" rel="noreferrer noopener">
              <span>{fa ? 'Binchitects در GitHub' : 'Binchitects on GitHub'}</span>
              <ArrowUpRight size={13} aria-hidden />
            </a>
            <a href={SITE.github} target="_blank" rel="noreferrer noopener">
              <span>{fa ? 'مخزن' : 'The repository'}</span>
              <ArrowUpRight size={13} aria-hidden />
            </a>
            <a href={SITE.contributing} target="_blank" rel="noreferrer noopener">
              <span>{fa ? 'مشارکت' : 'Contributing'}</span>
              <ArrowUpRight size={13} aria-hidden />
            </a>
            <p className="publisher-meta">
              {fa ? 'AGPL-3.0-only · کد منبع، ایشوها و راهنما در دسترس عموم' : 'AGPL-3.0-only · source, issues and manual in public'}
            </p>
          </div>
        </div>
        </div>
      </Chapter>

      <Chapter number="06" label={fa ? 'فایل‌ها' : 'Files'}>
        <ChapterHead
          title={fa ? 'وکتورها را بردارید.' : 'Take the vectors.'}
          standfirst={
            fa
              ? 'نشان و مهر SVG هستند و روی شبکهٔ ۶۴ و ۶۴۰ واحدی کشیده شده‌اند. فاوآیکن، آیکن‌های برنامه و تصویر اجتماعی از آن‌ها ساخته می‌شوند.'
              : 'The mark and the seal are SVG, drawn to a 64 and 640 unit grid. The favicon, app icons and social image are generated from them.'
          }
        />
        <div className="brand-files">
          <a href="/brand/argus-mark.svg" target="_blank" rel="noreferrer noopener">
            <span>
              <strong>{fa ? 'نشان Argus' : 'Argus mark'}</strong>
              <span className="micro">SVG · 64 × 64</span>
            </span>
            <ArrowUpRight size={14} aria-hidden />
          </a>
          <a href="/brand/argus-seal.svg" target="_blank" rel="noreferrer noopener">
            <span>
              <strong>{fa ? 'مهر Argus' : 'Argus seal'}</strong>
              <span className="micro">SVG · 640 × 640</span>
            </span>
            <ArrowUpRight size={14} aria-hidden />
          </a>
          <a href="/favicon.svg" target="_blank" rel="noreferrer noopener">
            <span>
              <strong>{fa ? 'فاوآیکن' : 'Favicon'}</strong>
              <span className="micro">SVG</span>
            </span>
            <ArrowUpRight size={14} aria-hidden />
          </a>
          <a href="/og.png" target="_blank" rel="noreferrer noopener">
            <span>
              <strong>{fa ? 'تصویر اجتماعی' : 'Social image'}</strong>
              <span className="micro">PNG · 1200 × 630</span>
            </span>
            <ArrowUpRight size={14} aria-hidden />
          </a>
        </div>
        <p className="note mt-s">
          <strong>{fa ? 'استفاده' : 'Usage'}</strong>
          {fa
            ? ' نام‌های Argus Arena، Argus و Code Arena علامت‌های تجاری Binchitects هستند. محصول یا خدمتی که با یکی از این نام‌ها به دیگران ارائه شود به اجازهٔ کتبی نیاز دارد. از طریق '
            : ' The names Argus Arena, Argus and Code Arena are trademarks of Binchitects. A product or service offered to others under one of those names needs written permission. Ask through the '}
          <a href="/contact" className="text-link">{fa ? 'فرم تماس' : 'contact form'}</a>
          {fa ? ' بپرسید.' : '.'}
        </p>
      </Chapter>
    </>
  )
}
