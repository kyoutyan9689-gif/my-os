import { Check, ExternalLink, Pencil, Plus, Save, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import { makeId, useStoredState } from '../lib/storage'
import { PageHeader } from './PageHeader'
type Wish = { id: string; name: string; price: string; url: string; memo: string; purchased: boolean; updatedAt: string }
const blank = { name: '', price: '', url: '', memo: '' }

export function WishlistPage({ onBack }: { onBack: () => void }) {
  const [items, setItems] = useStoredState<Wish[]>('makkyo-wishlist', [])
  const [editing, setEditing] = useState<string | null>(null)
  const [draft, setDraft] = useState(blank)
  const start = (wish?: Wish) => { setEditing(wish?.id ?? 'new'); setDraft(wish ? { name: wish.name, price: wish.price, url: wish.url, memo: wish.memo } : blank) }
  const close = () => { setEditing(null); setDraft(blank) }
  const save = () => {
    if (!draft.name.trim()) return
    if (editing === 'new') setItems(x => [{ id: makeId(), ...draft, purchased: false, updatedAt: new Date().toISOString() }, ...x])
    else setItems(x => x.map(w => w.id === editing ? { ...w, ...draft, updatedAt: new Date().toISOString() } : w))
    close()
  }
  return <div><PageHeader title="欲しいもの" onBack={onBack} action={<button className="icon-button accent" onClick={() => start()} aria-label="商品を追加"><Plus /></button>} />
    {editing && <section className="editor card wish-editor"><label>商品名 <span>必須</span><input value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} placeholder="商品名" autoFocus /></label><label>価格<input inputMode="numeric" value={draft.price} onChange={e => setDraft({ ...draft, price: e.target.value })} placeholder="例：12800" /></label><label>URL<input type="url" value={draft.url} onChange={e => setDraft({ ...draft, url: e.target.value })} placeholder="https://" /></label><label>メモ<textarea value={draft.memo} onChange={e => setDraft({ ...draft, memo: e.target.value })} placeholder="色、サイズなど" /></label><div className="editor-actions"><button className="secondary-button" onClick={close}><X />キャンセル</button><button className="primary-button" onClick={save}><Save />保存</button></div></section>}
    {!editing && <div className="filter-summary"><span>{items.filter(x => !x.purchased).length} items</span><span>{items.filter(x => x.purchased).length} purchased</span></div>}
    {!editing && (items.length === 0 ? <button className="empty empty-button" onClick={() => start()}><Plus />欲しいものを追加</button> : <div className="wish-list">{items.map(wish => <article className={`wish-card card ${wish.purchased ? 'purchased' : ''}`} key={wish.id}><button className="purchase-toggle" aria-label={wish.purchased ? '未購入に戻す' : '購入済みにする'} onClick={() => setItems(x => x.map(w => w.id === wish.id ? { ...w, purchased: !w.purchased } : w))}>{wish.purchased && <Check />}</button><div className="wish-copy"><strong>{wish.name}</strong>{wish.price && <b>¥{Number(wish.price).toLocaleString()}</b>}{wish.memo && <p>{wish.memo}</p>}{wish.url && <a href={wish.url} target="_blank" rel="noreferrer">商品を見る <ExternalLink /></a>}</div><div className="wish-actions"><button className="mini-button" onClick={() => start(wish)} aria-label="編集"><Pencil /></button><button className="mini-button danger" onClick={() => setItems(x => x.filter(w => w.id !== wish.id))} aria-label="削除"><Trash2 /></button></div></article>)}</div>)}
  </div>
}
