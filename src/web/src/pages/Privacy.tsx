
import { Link } from '@/components/ui/LocalLink'
import { ArticleOpener } from '@/components/ui/ArticleOpener'
import { Chapter } from '@/components/ui/Chapter'
import { SITE } from '@/lib/content'
import { usePageSeo } from '@/lib/seo'
import { useLang } from '@/lib/i18n'

export function Privacy() {
  usePageSeo('/privacy')
  const fa = useLang() === 'fa'

  return (
    <>
      <ArticleOpener
        section={fa ? 'حریم خصوصی' : 'Privacy'}
        title={fa ? 'این سایت چه چیزی نگه می‌دارد و چه چیزی نه.' : 'What this site keeps, and what it does not.'}
        standfirst={
          fa
            ? 'یک یادداشت کوتاه، چون یک فرم تماس نباید به تیم حقوقی نیاز داشته باشد. دقیقاً می‌گوید سایت وقتی به ما می‌نویسید چه چیزی ثبت می‌کند.'
            : 'A short note, because a contact form should not need a legal team. It describes exactly what the site records when you write to us.'
        }
      />

      <Chapter number="01" label={fa ? 'یادداشت' : 'The note'}>
        <div className="prose">
          <h2>{fa ? 'فرم تماس چه می‌فرستد' : 'What the contact form sends'}</h2>
          <p>
            {fa
              ? 'نام، نشانی ایمیل، شرکت اگر بدهید، موضوعی که انتخاب می‌کنید و پیام شما. سرور همچنین زمان، یک هش کوتاه‌شده از نشانی شبکه‌ای که درخواست از آن آمده و رشتهٔ user-agent مرورگر را ثبت می‌کند. خود نشانی ذخیره نمی‌شود: هش برای تشخیص سوءاستفاده است و برگشت‌پذیر نیست.'
              : 'Your name, email address, company if you give one, the subject you choose and your message. The server also records the time, a truncated hash of the network address the request came from, and the browser’s user-agent string. The address itself is not stored: the hash is there to notice abuse, and it is not reversible.'}
          </p>

          <h2>{fa ? 'چرا' : 'Why'}</h2>
          <p>
            {fa
              ? 'برای پاسخ به شما و برای اینکه فرم برای ارسال هرزنامه استفاده نشود. هیچ چیز دیگر. پروفایل نمی‌سازیم و مشخصات را به کسی نمی‌فروشیم یا اجاره نمی‌دهیم.'
              : 'To reply to you, and to keep the form from being used to send spam. Nothing else. We do not build a profile, and we do not sell or rent the details to anyone.'}
          </p>

          <h2>{fa ? 'کوکی‌ها و ردیابی' : 'Cookies and tracking'}</h2>
          <p>
            {fa
              ? 'این سایت هیچ کوکی تبلیغاتی یا تحلیلی نمی‌گذارد و هیچ ردیاب شخص ثالثی بار نمی‌کند. فونت‌های رابط از همین سایت سرو می‌شوند، نه از یک شبکهٔ فونت. تنها چیزی که در مرورگر شما می‌ماند انتخاب پوسته است، در local storage، با کلید '
              : 'This site sets no advertising or analytics cookies and loads no third-party tracker. The interface fonts are served from this site, not a font network. The only thing kept in your browser is your theme choice, in local storage, under '}
            <code>argus-theme</code>
            {fa ? '. هر زمان می‌توانید پاکش کنید.' : '. You can clear it at any time.'}
          </p>

          <h2>{fa ? 'چه کسی پیام را می‌خواند' : 'Who can read a message'}</h2>
          <p>
            {fa
              ? 'افراد Binchitects. اگر استقرار طوری تنظیم شده باشد که درخواست‌ها به کانال تیمی هدایت شوند، همان پیام آن‌جا هم تحویل می‌شود. سرورهایی که این سایت را اجرا می‌کنند گزارش‌های معمول درخواست را برای امنیت و عملیات نگه می‌دارند.'
              : 'People at Binchitects. If a deployment is configured to forward enquiries to a team channel, the same message is delivered there. The servers that run this site keep ordinary request logs for security and operations.'}
          </p>

          <h2>{fa ? 'چه مدت' : 'How long'}</h2>
          <p>
            {fa
              ? 'مکاتبه تا وقتی در حال رسیدگی است و بعد تا وقتی سابقه برای رابطه مفید است نگه داشته می‌شود. بخواهید حذفش کنیم و حذف می‌کنیم، مگر اینکه موظف به نگه داشتنش باشیم.'
              : 'Correspondence is kept while it is being handled and afterwards for as long as the record is useful for the relationship. Ask us to delete it and we will remove it, unless we are required to keep it.'}
          </p>

          <h2>{fa ? 'گرفتن یک نسخه یا حذف آن' : 'Getting a copy, or having it removed'}</h2>
          <p>
            {fa ? 'از طریق ' : 'Write through the '}
            <Link to="/contact">{fa ? 'فرم تماس' : 'contact form'}</Link>
            {fa ? ' بنویسید و بگویید چه می‌خواهید. حسابی برای حذف کردن وجود ندارد.' : ' and say what you want. There is no account to delete.'}
          </p>

          <h2>{fa ? 'امنیت این سایت' : 'Security of this site'}</h2>
          <p>
            {fa
              ? 'در محیط عملیاتی سایت روی TLS سرو می‌شود، API پیام‌ها را در فایلی روی سرور نگه می‌دارد که فرایند وب مستقیماً به آن دسترسی ندارد و نقطهٔ پایانی اپراتور که آن‌ها را می‌خواند تا وقتی توکنی تنظیم نشده خاموش است. هیچ سیستمی بی‌عیب نیست؛ '
              : 'In production the site is served over TLS, the API stores messages in a file on the server that the web process cannot reach directly, and the operator endpoint that reads them is off unless a token is configured. No system is perfect; the '}
            <a href={SITE.securityPolicy} target="_blank" rel="noreferrer noopener">
              {fa ? 'سیاست امنیتی' : 'security policy'}
            </a>{' '}
            {fa ? 'می‌گوید چطور مشکل را خصوصی گزارش کنید.' : 'says how to report a problem privately.'}
          </p>

          <h2>{fa ? 'تغییرات' : 'Changes'}</h2>
          <p>
            {fa ? 'اگر چیزی که سایت ثبت می‌کند عوض شود، این صفحه هم با آن عوض می‌شود. این صفحه سایت را در ' : 'If what the site records changes, this page changes with it. It describes the site at '}
            <span className="mono">{SITE.domain}</span>
            {fa ? ' توصیف می‌کند.' : '.'}
          </p>
        </div>
      </Chapter>
    </>
  )
}
