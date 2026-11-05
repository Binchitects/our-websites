import {
  AudioLines,
  Bot,
  Code2,
  FileCode2,
  MessagesSquare,
  Palette,
  Search,
  Settings,
  Sparkles,
  Wrench,
} from 'lucide-react'

const rail = [
  { icon: MessagesSquare, label: 'Chat', active: true },
  { icon: Code2, label: 'Code Arena', active: false },
  { icon: Palette, label: 'Studio', active: false },
  { icon: AudioLines, label: 'Meetings', active: false },
  { icon: Bot, label: 'Agents', active: false },
  { icon: Settings, label: 'Settings', active: false },
]

const chats = [
  { title: 'Retry budget for the gateway', meta: 'now · Qwen3.8-27B', active: true },
  { title: 'ISO 27001 evidence for Q4', meta: '09:12 · Arena' },
  { title: 'Driver contract notes', meta: 'Yesterday · Argus' },
  { title: 'Capacity plan for the H100s', meta: 'Mon · Arena' },
]

/**
 * A still of the product, built in markup rather than a screenshot: it stays
 * sharp on every screen, follows the theme, and never goes stale when the app
 * ships a new build.
 */
export function ArenaWindow() {
  return (
    <div className="window">
      <div className="window-chrome">
        <span className="window-dot" aria-hidden />
        <span className="window-dot" aria-hidden />
        <span className="window-dot" aria-hidden />
        <span className="window-url">
          <span className="h-1.5 w-1.5 rounded-full bg-[#55e0a3]" aria-hidden />
          arena.internal
        </span>
        <span className="window-chip">SSO</span>
      </div>

      <div className="window-body">
        <div className="window-rail" aria-hidden>
          {rail.map(({ icon: Icon, label, active }) => (
            <span key={label} className="window-rail-item" data-active={active} title={label}>
              <Icon size={15} strokeWidth={1.6} />
            </span>
          ))}
        </div>

        <div className="window-sidebar" aria-hidden>
          <p className="window-group-label">Today</p>
          {chats.map((chat) => (
            <div key={chat.title} className="window-chat-item" data-active={chat.active}>
              <span>{chat.title}</span>
              <small>{chat.meta}</small>
            </div>
          ))}
          <p className="window-group-label mt-3">Rooms</p>
          <div className="window-chat-item">
            <span># platform-team</span>
            <small>3 people · captions on</small>
          </div>
        </div>

        <div className="window-main" aria-hidden>
          <div className="window-title">
            <span>Retry budget for the gateway</span>
            <span className="flex items-center gap-1.5">
              <span className="window-chip">high</span>
              <span className="window-chip">Qwen3.8</span>
            </span>
          </div>

          <div className="window-bubble-user">
            Where is the retry backoff set for the model gateway, and what is the budget
            when three replicas share it?
          </div>

          <div className="space-y-2.5">
            <div className="window-tool">
              <Search size={11} />
              <span>search_code</span>
              <span className="ml-auto text-[#55e0a3]">8 results</span>
            </div>
            <div className="window-tool">
              <Wrench size={11} />
              <span>find_references</span>
              <span className="ml-auto text-[#55e0a3]">3 files</span>
            </div>
          </div>

          <div className="window-bubble-ai">
            The backoff is set once, in{' '}
            <span className="mono text-[#8fdcff]">gateway/limiter.go:142</span>:
            <div className="mt-2 rounded-md border border-[#2a3a5c] bg-[#040a17] px-2.5 py-2 font-mono text-[9.5px] leading-relaxed text-[#cfe0f7]">
              <span className="text-[#5f7192]">backoff</span> = base &lt;&lt; attempt{' '}
              <span className="text-[#5f7192]">// 50ms → 1.6s</span>
            </div>
            <p className="mt-2">
              The budget is per key, not per replica: <span className="text-[#e9effa]">shared</span>{' '}
              across the three, so a retry storm cannot multiply. A request that finds the budget
              empty is queued, not dropped.
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <span className="window-chip">
                <Sparkles size={9} /> 2s thought
              </span>
              <span className="window-chip">
                <FileCode2 size={9} /> 3 sources
              </span>
              <span className="window-chip text-[#8fdcff]">Quoted, not paraphrased</span>
            </div>
          </div>
        </div>

        <div className="window-code" aria-hidden>
          <div className="window-code-header">
            <span className="flex items-center gap-1.5">
              <FileCode2 size={10} /> gateway/limiter.go
            </span>
            <span>main</span>
          </div>
          <div className="mt-2">
            <div className="code-line">
              <span className="ln">138</span>
              <span>
                <span className="text-[#9a86e8]">func</span> (g *Budget) Take(ctx) error {'{'}
              </span>
            </div>
            <div className="code-line">
              <span className="ln">139</span>
              <span>{'    '}key := g.keyFor(ctx)</span>
            </div>
            <div className="code-line del">
              <span className="ln">140</span>
              <span>{'    '}return g.shared.Take(key, 1)</span>
            </div>
            <div className="code-line add">
              <span className="ln">140</span>
              <span>{'    '}return g.shared.TakeN(key, 1, g.retryBudget)</span>
            </div>
            <div className="code-line">
              <span className="ln">141</span>
              <span>{'}'}</span>
            </div>
          </div>
          <div className="mt-3 border-t border-[#1b2740] px-3 pt-2 font-mono text-[9px] text-[#6f81a3]">
            <p className="text-[#55e0a3]">$ code-arena test ./gateway/...</p>
            <p className="text-[#9fb2d2]">PASS 3 packages · 0 failures</p>
          </div>
        </div>
      </div>
    </div>
  )
}
