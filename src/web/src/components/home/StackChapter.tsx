import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ArchitecturePlate } from '@/components/product/ArchitecturePlate'
import { Chapter, ChapterHead } from '@/components/ui/Chapter'
import { IndexList } from '@/components/ui/IndexList'
import { Plate } from '@/components/ui/Plate'

const STACK = [
  {
    title: 'Chat that does the work',
    desc: 'Models, thinking levels, files, server-side tools and live previews.',
    tag: 'Arena',
    href: '/platform',
  },
  {
    title: 'Code Arena',
    desc: 'A coding agent with its own IDE, installed as one file.',
    tag: 'Code',
    href: '/code-arena',
  },
  {
    title: 'Argus, the code index',
    desc: 'Symbols, references and docs quoted from your own GitLab.',
    tag: '34 tools',
    href: '/argus',
  },
  {
    title: 'Memory that lasts',
    desc: 'One memory across chat and agent, recalled by meaning.',
    tag: 'Memory',
    href: '/platform',
  },
  {
    title: 'Studio',
    desc: 'Pictures, video, voices, music and 3D on the same GPUs.',
    tag: 'Media',
    href: '/platform',
  },
  {
    title: 'Agents and apps',
    desc: 'Agents that react to GitLab and act on it; chats that become apps.',
    tag: 'Agents',
    href: '/platform',
  },
  {
    title: 'Meetings',
    desc: 'Who said what, the minutes, and the action items.',
    tag: 'Meetings',
    href: '/platform',
  },
  {
    title: 'The science lab',
    desc: 'Six sciences, with tools that check every step.',
    tag: 'Lab',
    href: '/platform',
  },
]

/** Chapter one: the index of the stack, then the schematic of how it fits. */
export function StackChapter() {
  return (
    <Chapter number="01" label="The stack" id="stack">
      <ChapterHead
        title={<>One stack, not five subscriptions.</>}
        standfirst={
          <>
            Most teams end up with a chat subscription, a coding assistant, an image tool, a meeting
            bot and a few scripts in between — each another account, another bill, and another place
            the work goes. ARGUS is all of it in one stack you run yourself.
          </>
        }
        action={
          <Link to="/platform" className="arrow-link">
            Everything in the platform
            <ArrowRight size={13} aria-hidden />
          </Link>
        }
      />

      <IndexList items={STACK} />

      <p className="note mt-s">
        <strong>And beside them</strong>
        security reviews with a test and a fix, GRC across fourteen frameworks, company knowledge,
        Slack and Teams, and an API for your own tools.
      </p>

      <div className="mt-xl">
        <div className="subhead">
          <h3>Under the hood</h3>
          <span className="micro">FIG. 02 / ONE WAY IN</span>
        </div>
        <Plate
          figure="FIG. 02"
          caption="Traefik is the only way in. The app keeps the keys, the rights, the ledger and the audit log; your GPUs run the models; Argus reads GitLab with a token that can do nothing else."
        >
          <ArchitecturePlate />
        </Plate>
      </div>
    </Chapter>
  )
}
