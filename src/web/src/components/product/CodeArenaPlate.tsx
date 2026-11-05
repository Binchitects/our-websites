/**
 * Code Arena as a proof sheet: the folder, the line the agent changed, the
 * plan it followed, and the check that passed. No window chrome, no glow.
 */
export function CodeArenaPlate() {
  const lines = [
    { n: 128, code: 'type Budget struct {' },
    { n: 129, code: '    // shared by every replica', comment: true },
    { n: 130, code: '    shared *limiter.Shared' },
    { n: 131, code: '    retry  int' },
    { n: 132, code: '}' },
    { n: 133, code: '' },
    { n: 134, code: '// Take one from the budget.', comment: true },
    { n: 135, code: 'func (g *Budget) Take(ctx) error {' },
    { n: 136, code: '    key := g.keyFor(ctx)' },
    { n: 137, code: '    return g.shared.TakeN(key, 1)', changed: true },
    { n: 138, code: '}' },
  ]

  return (
    <div className="ide">
      <div className="ide-head">
        <span>Code Arena / project argus</span>
        <span>
          <span className="ide-dot" />
          plan approved
        </span>
      </div>

      <div className="ide-body">
        <div className="ide-tree" aria-hidden>
          <div className="root">argus/</div>
          <div className="folder">gateway/</div>
          <div className="file active">limiter.go</div>
          <div className="file">limiter_test.go</div>
          <div className="file">router.go</div>
          <div className="folder">models/</div>
          <div className="folder">docs/</div>
          <div className="file">compose.yaml</div>
          <div className="file">README.md</div>
        </div>

        <div className="ide-code" aria-hidden>
          {lines.map((line) => (
            <div key={line.n} className={`ide-line${line.changed ? ' changed' : ''}`}>
              <span className="ln">{line.n}</span>
              <span className={line.comment ? 'cm' : undefined}>{line.code}</span>
            </div>
          ))}
        </div>

        <div className="ide-plan">
          <h4>Plan / five steps</h4>
          <div className="ide-step">
            <span className="step-num">01</span>
            <span className="done">Read limiter.go and its callers</span>
          </div>
          <div className="ide-step">
            <span className="step-num">02</span>
            <span className="done">Find the budget&rsquo;s references</span>
          </div>
          <div className="ide-step">
            <span className="step-num">03</span>
            <span className="done">Share one limiter across replicas</span>
          </div>
          <div className="ide-step">
            <span className="step-num">04</span>
            <span>Run go test ./gateway/...</span>
          </div>
          <div className="ide-step">
            <span className="step-num">05</span>
            <span className="done">Open a review as sara@</span>
          </div>
          <div className="ide-test">
            <div>
              <span className="ok">$</span> go test ./gateway/...
            </div>
            <div className="ok">ok gateway 0.42s</div>
            <div>12 tests · 0 failures</div>
          </div>
        </div>
      </div>

      <div className="ide-foot">
        <span>Go 1.24</span>
        <span>LSP active</span>
        <span>UTF-8</span>
        <span>
          <span className="ide-dot" />
          synced with Arena
        </span>
      </div>
    </div>
  )
}
