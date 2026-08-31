import { Pencil, Plus, Save, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import { makeId, today, useStoredState } from '../lib/storage'
import { PageHeader } from './PageHeader'

type Exercise = { id: string; name: string; weight: string; reps: string; sets: string }
type Workout = { id: string; date: string; exercises: Exercise[]; updatedAt: string }
const blankExercise = (): Exercise => ({ id: makeId(), name: '', weight: '', reps: '', sets: '' })

export function WorkoutPage({ onBack }: { onBack: () => void }) {
  const [records, setRecords] = useStoredState<Workout[]>('makkyo-workouts', [])
  const [date, setDate] = useState(today())
  const [exercises, setExercises] = useState<Exercise[]>([blankExercise()])
  const [editing, setEditing] = useState<string | null>(null)
  const save = () => {
    const valid = exercises.filter(e => e.name.trim())
    if (!valid.length) return
    const item = { id: editing ?? makeId(), date, exercises: valid, updatedAt: new Date().toISOString() }
    setRecords(old => [item, ...old.filter(r => r.id !== editing)].sort((a, b) => b.date.localeCompare(a.date)))
    setEditing(null); setDate(today()); setExercises([blankExercise()])
  }
  const update = (id: string, field: keyof Exercise, value: string) => setExercises(list => list.map(e => e.id === id ? { ...e, [field]: value } : e))
  const edit = (record: Workout) => { setEditing(record.id); setDate(record.date); setExercises(record.exercises); scrollTo({ top: 0, behavior: 'smooth' }) }
  return <div><PageHeader title="筋トレ" onBack={onBack} />
    <section className="editor card"><label>トレーニング日<input type="date" value={date} onChange={e => setDate(e.target.value)} /></label>
      <div className="exercise-list">{exercises.map((exercise, index) => <div className="exercise" key={exercise.id}>
        <div className="exercise-title"><b>種目 {index + 1}</b>{exercises.length > 1 && <button className="mini-button" onClick={() => setExercises(x => x.filter(e => e.id !== exercise.id))} aria-label="種目を削除"><X /></button>}</div>
        <input className="exercise-name" placeholder="種目名（例：ベンチプレス）" value={exercise.name} onChange={e => update(exercise.id, 'name', e.target.value)} />
        <div className="metrics"><label>重量 (kg)<input inputMode="decimal" placeholder="0" value={exercise.weight} onChange={e => update(exercise.id, 'weight', e.target.value)} /></label><label>回数<input inputMode="numeric" placeholder="0" value={exercise.reps} onChange={e => update(exercise.id, 'reps', e.target.value)} /></label><label>セット<input inputMode="numeric" placeholder="0" value={exercise.sets} onChange={e => update(exercise.id, 'sets', e.target.value)} /></label></div>
      </div>)}</div>
      <button className="secondary-button" onClick={() => setExercises(x => [...x, blankExercise()])}><Plus />種目を追加</button><button className="primary-button" onClick={save}><Save />{editing ? '更新する' : '記録する'}</button>
    </section>
    <h2 className="list-heading">過去の記録</h2>{records.length === 0 ? <p className="empty">まだ記録がありません</p> : <div className="record-list">{records.map(record => <article className="record-card card" key={record.id}><div className="record-head"><time>{new Date(`${record.date}T00:00:00`).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' })}</time><div><button className="mini-button" onClick={() => edit(record)} aria-label="編集"><Pencil /></button><button className="mini-button danger" onClick={() => setRecords(x => x.filter(r => r.id !== record.id))} aria-label="削除"><Trash2 /></button></div></div>{record.exercises.map(e => <div className="record-exercise" key={e.id}><strong>{e.name}</strong><span>{e.weight || '—'} kg × {e.reps || '—'} 回 × {e.sets || '—'} セット</span></div>)}</article>)}</div>}
  </div>
}
