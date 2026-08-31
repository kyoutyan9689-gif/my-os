import { ChevronRight } from 'lucide-react'
import { features } from '../config/features'
import type { Feature } from '../types'

function FeatureTile({ feature, onSelect }: { feature: Feature; onSelect: (name: string) => void }) {
  const Icon = feature.icon
  return <button className="feature-tile" onClick={() => onSelect(feature.name)}>
    <span className="feature-icon" style={{ color: feature.accent, background: `${feature.accent}18` }}><Icon size={23} strokeWidth={1.8} /></span>
    <span className="feature-name">{feature.name}</span>
    <span className="feature-description">{feature.description}</span>
    <ChevronRight className="tile-arrow" size={16} />
  </button>
}

export function FeatureGrid({ onSelect }: { onSelect: (name: string) => void }) {
  return <section aria-labelledby="features-heading">
    <h2 className="section-heading" id="features-heading">MY SPACE</h2>
    <div className="feature-grid">{features.map(feature => <FeatureTile key={feature.id} feature={feature} onSelect={onSelect} />)}</div>
  </section>
}
