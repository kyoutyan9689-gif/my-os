import type { TimeContent } from '../lib/timeContent'

export function Header({ content }: { content: TimeContent }) {
  return <header className="header">
    <p className="eyebrow">KYOHEI OS</p>
    <h1>{content.greeting}</h1>
    <p className="submessage">{content.subMessage}</p>
  </header>
}
