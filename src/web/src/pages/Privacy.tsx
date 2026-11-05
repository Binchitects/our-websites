import { Link } from 'react-router-dom'
import { ArticleOpener } from '@/components/ui/ArticleOpener'
import { Chapter } from '@/components/ui/Chapter'
import { SITE } from '@/lib/content'
import { routeMeta } from '@/lib/route-meta'
import { useSeo } from '@/lib/seo'

export function Privacy() {
  useSeo({ ...routeMeta('/privacy'), path: '/privacy' })

  return (
    <>
      <ArticleOpener
        section="Privacy"
        title="What this site keeps, and what it does not."
        standfirst="A short note, because a contact form should not need a legal team. It describes exactly what the site records when you write to us."
      />

      <Chapter number="01" label="The note">
        <div className="prose">
          <h2>What the contact form sends</h2>
          <p>
            Your name, email address, company if you give one, the subject you choose and your
            message. The server also records the time, a truncated hash of the network address the
            request came from, and the browser&rsquo;s user-agent string. The address itself is not
            stored: the hash is there to notice abuse, and it is not reversible.
          </p>

          <h2>Why</h2>
          <p>
            To reply to you, and to keep the form from being used to send spam. Nothing else. We do
            not build a profile, and we do not sell or rent the details to anyone.
          </p>

          <h2>Cookies and tracking</h2>
          <p>
            This site sets no advertising or analytics cookies and loads no third-party tracker. The
            interface fonts are served from this site, not a font network. The only thing kept in
            your browser is your theme choice, in local storage, under <code>argus-theme</code>. You
            can clear it at any time.
          </p>

          <h2>Who can read a message</h2>
          <p>
            People at Binchitects. If a deployment is configured to forward enquiries to a team
            channel, the same message is delivered there. The servers that run this site keep
            ordinary request logs for security and operations.
          </p>

          <h2>How long</h2>
          <p>
            Correspondence is kept while it is being handled and afterwards for as long as the record
            is useful for the relationship. Ask us to delete it and we will remove it, unless we are
            required to keep it.
          </p>

          <h2>Getting a copy, or having it removed</h2>
          <p>
            Write through the <Link to="/contact">contact form</Link> and say what you want. There is
            no account to delete.
          </p>

          <h2>Security of this site</h2>
          <p>
            In production the site is served over TLS, the API stores messages in a file on the server
            that the web process cannot reach directly, and the operator endpoint that reads them is
            off unless a token is configured. No system is perfect; the{' '}
            <a href={SITE.securityPolicy} target="_blank" rel="noreferrer noopener">
              security policy
            </a>{' '}
            says how to report a problem privately.
          </p>

          <h2>Changes</h2>
          <p>
            If what the site records changes, this page changes with it. It describes the site at{' '}
            <span className="mono">{SITE.domain}</span>.
          </p>
        </div>
      </Chapter>
    </>
  )
}
