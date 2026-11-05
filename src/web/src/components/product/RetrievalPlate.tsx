/**
 * One question, answered from the record: the calls, the quoted line, and the
 * citation. Built in type rather than as a fake chat window.
 */
export function RetrievalPlate() {
  return (
    <div className="record">
      <div className="record-head">
        <span>Arena / session 12</span>
        <span>Model Qwen3.8 · high</span>
      </div>

      <div className="record-row">
        <span className="record-label">Q</span>
        <p className="record-question">
          Where is the retry budget set for the gateway, and what happens when three replicas share
          it?
        </p>
      </div>

      <div className="record-row">
        <span className="record-label">Calls</span>
        <div className="record-tools">
          <span className="record-tool">
            <strong>search_code</strong>
            <span className="count">8 results</span>
          </span>
          <span className="record-tool">
            <strong>find_references</strong>
            <span className="count">3 files</span>
          </span>
          <span className="record-tool">
            <strong>docs_verify</strong>
            <span className="count">1 draft</span>
          </span>
        </div>
      </div>

      <div className="record-row">
        <span className="record-label">A</span>
        <div>
          <p className="record-answer">
            The budget is per key, not per replica. It is taken from one shared limiter, so three
            replicas cannot multiply a retry storm; a request that finds the budget empty is queued,
            not dropped.
          </p>
          <div className="record-quote">
            <span style={{ color: 'var(--faint)' }}>142</span> backoff = base &lt;&lt; attempt{' '}
            <span style={{ color: 'var(--faint)' }}>// 50ms → 1.6s</span>
            <br />
            <span style={{ color: 'var(--faint)' }}>143</span> key := g.keyFor(ctx)
            <br />
            <span style={{ color: 'var(--faint)' }}>144</span> return g.shared.TakeN(key, 1)
          </div>
          <div className="record-cite">
            <span>gateway/limiter.go:142</span>
            <span className="on">quoted verbatim</span>
            <span>as sara@ · her GitLab rights</span>
          </div>
        </div>
      </div>

      <div className="record-foot">
        <span>3 sources · 1 citation</span>
        <span>answered in 2.1s</span>
      </div>
    </div>
  )
}
