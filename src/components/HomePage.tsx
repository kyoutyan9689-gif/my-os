import { ChevronRight, CloudOff, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { homeFeatures, type Page } from '../App'

type Weather = { temperature: number; max: number; min: number; label: string; symbol: string }
const weatherInfo = (code: number) => code === 0 ? ['快晴', '☀️'] : code <= 3 ? ['くもり', '⛅️'] : code <= 48 ? ['霧', '🌫️'] : code <= 67 ? ['雨', '🌧️'] : code <= 77 ? ['雪', '🌨️'] : code <= 82 ? ['にわか雨', '🌦️'] : code <= 99 ? ['雷雨', '⛈️'] : ['不明', '☁️']

export function HomePage({ navigate }: { navigate: (page: Page) => void }) {
  const [weather, setWeather] = useState<Weather | null>(null)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&forecast_days=1'
    fetch(url).then(r => { if (!r.ok) throw Error(); return r.json() }).then(data => {
      const [label, symbol] = weatherInfo(data.current.weather_code)
      setWeather({ temperature: Math.round(data.current.temperature_2m), max: Math.round(data.daily.temperature_2m_max[0]), min: Math.round(data.daily.temperature_2m_min[0]), label, symbol })
    }).catch(() => setFailed(true))
  }, [])

  const open = (id: string) => {
    if (id === 'music') window.location.href = 'https://music.apple.com/jp/browse'
    else if (id === 'schedule') window.location.href = 'https://calendar.google.com/calendar/u/0/r'
    else if (id !== 'weather') navigate(id as Page)
  }

  return <div className="home-page">
    <section className="weather-card card" aria-label="東京の天気">
      <div className="weather-place"><MapPin size={15} />東京</div>
      {failed ? <div className="weather-error"><CloudOff />天気を取得できませんでした</div> : weather ? <>
        <div className="weather-main"><span className="weather-symbol">{weather.symbol}</span><strong>{weather.temperature}°</strong><span>{weather.label}</span></div>
        <div className="weather-range"><span>最高 <b>{weather.max}°</b></span><span>最低 <b>{weather.min}°</b></span></div>
      </> : <div className="weather-loading">天気を読み込んでいます…</div>}
    </section>
    <section className="feature-grid" aria-label="機能一覧">
      {homeFeatures.filter(f => f.id !== 'weather').map(({ id, name, detail, icon: Icon, color }) => <button className="feature-card card" key={id} onClick={() => open(id)}>
        <span className="feature-icon" style={{ color, background: `${color}18` }}><Icon /></span><span className="feature-copy"><strong>{name}</strong><small>{detail}</small></span><ChevronRight className="chevron" />
      </button>)}
    </section>
  </div>
}
