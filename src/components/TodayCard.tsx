import type { TodaySummary } from '../types'

const dateFormatter = new Intl.DateTimeFormat('ja-JP', { month: 'long', day: 'numeric', weekday: 'long' })

export function TodayCard({ summary }: { summary: TodaySummary | null }) {
  return <section className="card today-card" aria-labelledby="today-heading">
    <div className="card-label-row"><h2 id="today-heading">TODAY</h2><span className="live-dot" /></div>
    <p className="date">{summary ? dateFormatter.format(summary.date) : '読み込み中…'}</p>
    <div className="summary-grid">
      <div><span>体重</span><strong>{summary?.weight ? `${summary.weight} kg` : '—'}</strong></div>
      <div><span>ジム</span><strong>{summary?.gym ?? '—'}</strong></div>
      <div><span>予定</span><strong>{summary ? `${summary.scheduleCount}件` : '—'}</strong></div>
    </div>
  </section>
}
