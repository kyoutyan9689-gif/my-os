import { Plus, Save, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import { makeId, useStoredState } from '../lib/storage'
import { PageHeader } from './PageHeader'
type Note = { id: string; title: string; body: string; createdAt: string; updatedAt: string }

export function NotesPage({ onBack }: { onBack: () => void }) {
  const [notes, setNotes] = useStoredState<Note[]>('makkyo-notes', [])
  const [selected, setSelected] = useState<string | null>(null)
  const current = notes.find(n => n.id === selected)
  const [draft, setDraft] = useState<{ title: string; body: string } | null>(null)
  const open = (note?: Note) => { setSelected(note?.id ?? 'new'); setDraft({ title: note?.title ?? '', body: note?.body ?? '' }) }
  const close = () => { setSelected(null); setDraft(null) }
  const save = () => {
    if (!draft || (!draft.title.trim() && !draft.body.trim())) return
    const now = new Date().toISOString()
    if (selected === 'new') setNotes(x => [{ id: makeId(), ...draft, createdAt: now, updatedAt: now }, ...x])
    else setNotes(x => x.map(n => n.id === selected ? { ...n, ...draft, updatedAt: now } : n))
    close()
  }
  const format = (value: string) => new Date(value).toLocaleString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  return <div><PageHeader title="メモ" onBack={onBack} action={<button className="icon-button accent" onClick={() => open()} aria-label="新規メモ"><Plus /></button>} />
    {selected && draft ? <section className="note-editor"><input className="note-title" placeholder="タイトル" value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} autoFocus /><textarea placeholder="本文を入力…" value={draft.body} onChange={e => setDraft({ ...draft, body: e.target.value })} />{current && <small>更新: {format(current.updatedAt)}</small>}<div className="editor-actions"><button className="secondary-button" onClick={close}><X />キャンセル</button><button className="primary-button" onClick={save}><Save />保存</button></div></section>
    : notes.length === 0 ? <button className="empty empty-button" onClick={() => open()}><Plus />最初のメモを作成</button> : <div className="note-list">{notes.map(note => <button className="note-card card" key={note.id} onClick={() => open(note)}><strong>{note.title || '無題のメモ'}</strong><p>{note.body || '本文なし'}</p><time>{format(note.updatedAt)}</time><span className="delete-note" role="button" tabIndex={0} aria-label="削除" onClick={e => { e.stopPropagation(); setNotes(x => x.filter(n => n.id !== note.id)) }} onKeyDown={e => { if (e.key === 'Enter') setNotes(x => x.filter(n => n.id !== note.id)) }}><Trash2 /></span></button>)}</div>}
  </div>
}
