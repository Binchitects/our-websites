import { Bot, Check, ChevronRight, FileCode2, Folder, GitBranch, Play, Search, TerminalSquare } from 'lucide-react'

const tree = [
  { name: 'gateway', folder: true, open: true, depth: 0 },
  { name: 'limiter.go', file: true, depth: 1, active: true },
  { name: 'limiter_test.go', file: true, depth: 1 },
  { name: 'router.go', file: true, depth: 1 },
  { name: 'settings.go', file: true, depth: 1 },
  { name: 'models', folder: true, depth: 0 },
  { name: 'README.md', file: true, depth: 0 },
  { name: 'compose.yaml', file: true, depth: 0 },
]

/** A still of Code Arena's IDE: the folder, the file, and the agent beside it. */
export function CodeArenaWindow() {
  return (
    <div className="window">
      <div className="window-chrome">
        <span className="window-dot" aria-hidden />
        <span className="window-dot" aria-hidden />
        <span className="window-dot" aria-hidden />
        <span className="window-url">
          <span className="h-1.5 w-1.5 rounded-full bg-[#55e0a3]" aria-hidden />
          localhost:7331 / argus
        </span>
        <span className="window-chip">
          <GitBranch size={9} /> main
        </span>
      </div>

      <div className="grid min-h-[360px] grid-cols-1 md:grid-cols-[170px_minmax(0,1fr)] xl:grid-cols-[170px_minmax(0,1fr)_290px]">
        <div className="hidden border-r border-[#1b2740] bg-[#050b17] px-2 py-3 md:block" aria-hidden>
          <div className="mb-2 flex items-center gap-2 px-2 text-[10px] text-[#8ba0c4]">
            <Search size={11} />
            <span>Search files</span>
            <span className="ml-auto rounded border border-[#243352] px-1 font-mono text-[8px]">⌘P</span>
          </div>
          <div className="space-y-0.5 font-mono text-[10px]">
            {tree.map((item) => (
              <div
                key={item.name}
                className={`flex items-center gap-1.5 rounded px-2 py-[5px] ${
                  item.active ? 'bg-[#10203a] text-[#e3edfb]' : 'text-[#8ba0c4]'
                }`}
                style={{ paddingLeft: 8 + item.depth * 12 }}
              >
                {item.folder ? (
                  <Folder size={10} className="text-[#6b8ec9]" />
                ) : (
                  <FileCode2 size={10} className="text-[#5f7192]" />
                )}
                {item.name}
                {item.active && <span className="ml-auto h-1 w-1 rounded-full bg-[#55e0a3]" />}
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0 bg-[#070d1b]" aria-hidden>
          <div className="flex items-stretch border-b border-[#1b2740] text-[10.5px]">
            <span className="flex items-center gap-2 border-r border-[#1b2740] bg-[#0b1424] px-3 py-2 text-[#dbe6f8]">
              <FileCode2 size={11} className="text-[#8fdcff]" />
              limiter.go
              <span className="h-1 w-1 rounded-full bg-[#8fdcff]" />
            </span>
            <span className="flex items-center gap-2 px-3 py-2 text-[#7d8fb3]">limiter_test.go</span>
            <span className="ml-auto flex items-center gap-1.5 px-3 text-[#7d8fb3]">
              <Play size={10} /> Run
            </span>
          </div>

          <div className="flex items-center gap-1 border-b border-[#121d31] px-4 py-1.5 font-mono text-[9px] text-[#6f81a3]">
            gateway <ChevronRight size={9} /> limiter.go <ChevronRight size={9} /> Take
          </div>

          <div className="py-2 font-mono text-[10px] leading-[1.75] text-[#c2d1e8]">
            {[
              { n: 128, code: <><span className="text-[#9a86e8]">type</span> Budget <span className="text-[#9a86e8]">struct</span> {'{'}</> },
              { n: 129, code: <><span className="text-[#6f81a3]">{'    // shared by replicas'}</span></> },
              { n: 130, code: <>{'    shared *limiter.Shared'}</> },
              { n: 131, code: <>{'    retryBudget '}<span className="text-[#9a86e8]">int</span></> },
              { n: 132, code: <>{'}'}</> },
              { n: 133, code: <span /> },
              { n: 134, code: <><span className="text-[#6f81a3]">{'// Take one from the budget.'}</span></> },
              { n: 135, code: <><span className="text-[#9a86e8]">func</span> (g *Budget) Take(ctx) <span className="text-[#9a86e8]">error</span> {'{'}</> },
              { n: 136, code: <>{'    key := g.keyFor(ctx)'}</> },
              { n: 137, code: <>{'    return g.shared.TakeN(key, 1)'}</> },
              { n: 138, code: <>{'}'}</> },
              { n: 139, code: <span /> },
              { n: 140, code: <><span className="text-[#9a86e8]">func</span> (g *Budget) refill(ctx) {'{'}</> },
              { n: 141, code: <>{'    g.shared.Refill(g.budget)'}</> },
              { n: 142, code: <>{'}'}</> },
            ].map((line) => (
              <div key={line.n} className="flex gap-3 px-4 hover:bg-[#0b1526]">
                <span className="w-6 flex-none text-right text-[#43526d]">{line.n}</span>
                <span className="whitespace-pre">{line.code}</span>
              </div>
            ))}
          </div>

          <div className="mt-2 border-t border-[#1b2740] bg-[#050b17] px-4 py-2 font-mono text-[9px] text-[#8ba0c4]">
            <p>
              <span className="text-[#55e0a3]">OUTLINE</span> · Budget · Take · refill
            </p>
          </div>
        </div>

        <div className="hidden border-l border-[#1b2740] bg-[#050b17] xl:block" aria-hidden>
          <div className="flex items-center gap-2 border-b border-[#1b2740] px-3 py-2.5 text-[10.5px] text-[#dbe6f8]">
            <Bot size={12} className="text-[#8fdcff]" />
            Code Arena
            <span className="ml-auto flex items-center gap-1 font-mono text-[8px] text-[#55e0a3]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#55e0a3]" /> working
            </span>
          </div>
          <div className="space-y-2.5 p-3 text-[10.5px] leading-relaxed">
            <div className="rounded-md border border-[#243352] bg-[#0b1424] p-2.5 text-[#c2d1e8]">
              Plan approved. The budget must be shared across replicas, not taken per worker.
            </div>
            <div className="space-y-1.5 font-mono text-[9px] text-[#8ba0c4]">
              <p className="flex items-center gap-1.5">
                <Check size={10} className="text-[#55e0a3]" /> Read limiter.go · 3.1s
              </p>
              <p className="flex items-center gap-1.5">
                <Check size={10} className="text-[#55e0a3]" /> Find references · 1.8s
              </p>
              <p className="flex items-center gap-1.5 text-[#dbe6f8]">
                <span className="grid h-3 w-3 place-items-center rounded-full border border-[#8fdcff] text-[7px] text-[#8fdcff]">
                  3
                </span>
                Change Take → TakeN
              </p>
            </div>
            <div className="rounded-md border border-[#243352] bg-[#040a17] p-2.5 font-mono text-[9px] text-[#9fb2d2]">
              <p className="flex items-center gap-1.5 text-[#8fdcff]">
                <TerminalSquare size={10} /> go test ./gateway/...
              </p>
              <p className="mt-1 text-[#55e0a3]">ok  gateway  0.42s</p>
              <p className="text-[#6f81a3]">12 tests, 0 failures</p>
            </div>
            <div className="flex flex-wrap gap-1">
              <span className="window-chip">ARENA.md</span>
              <span className="window-chip">as sara@</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-[#1b2740] bg-[#0a1220] px-3 py-1.5 font-mono text-[8.5px] text-[#6f81a3]" aria-hidden>
        <span className="flex items-center gap-1 text-[#8fdcff]">
          <GitBranch size={9} /> main
        </span>
        <span>Go</span>
        <span>UTF-8</span>
        <span>Ln 140, Col 28</span>
        <span className="ml-auto flex items-center gap-1 text-[#55e0a3]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#55e0a3]" /> synced with Arena
        </span>
      </div>
    </div>
  )
}
