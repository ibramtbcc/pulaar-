import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import SplashScreen from '../components/shared/SplashScreen'
import { IconGlobe } from '../components/shared/Icons'

const countries = [
  { r: 1, cc: 'ng', n: 'Nigeria', v: 20500000, p: '~9%' },
  { r: 2, cc: 'gn', n: 'Guinee', v: 5200000, p: '~40%' },
  { r: 3, cc: 'sn', n: 'Senegal', v: 4100000, p: '~24%' },
  { r: 4, cc: 'ml', n: 'Mali', v: 3800000, p: '~17%' },
  { r: 5, cc: 'cm', n: 'Cameroun', v: 3500000, p: '~12%' },
  { r: 6, cc: 'ne', n: 'Niger', v: 2500000, p: '~10%' },
  { r: 7, cc: 'bf', n: 'Burkina Faso', v: 2200000, p: '~9%' },
  { r: 8, cc: 'mr', n: 'Mauritanie', v: 1200000, p: '~25%' },
  { r: 9, cc: 'td', n: 'Tchad', v: 1000000, p: '~6%' },
  { r: 10, cc: 'gm', n: 'Gambie', v: 800000, p: '~30%' },
]

const diaspora = [
  { r: 1, cc: 'fr', n: 'France', v: 450000, p: '' },
  { r: 2, cc: 'us', n: 'Etats-Unis', v: 120000, p: '' },
  { r: 3, cc: 'be', n: 'Belgique', v: 45000, p: '' },
  { r: 4, cc: 'es', n: 'Espagne', v: 38000, p: '' },
  { r: 5, cc: 'it', n: 'Italie', v: 32000, p: '' },
  { r: 6, cc: 'de', n: 'Allemagne', v: 28000, p: '' },
]

function flag(cc: string) {
  return cc.toUpperCase().replace(/./g, (c) =>
    String.fromCodePoint(0x1F1E6 - 65 + c.charCodeAt(0))
  )
}

function fmt(n: number) {
  if (n >= 1e6) return (n / 1e6).toFixed(1).replace('.', ',') + ' M'
  if (n >= 1e3) return Math.round(n / 1e3) + ' K'
  return String(n)
}

function AnimCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const start = performance.now()
    function a(now: number) {
      const p = Math.min((now - start) / 2500, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      el.textContent = (eased * target).toFixed(1).replace('.', ',') + suffix
      if (p < 1) requestAnimationFrame(a)
    }
    requestAnimationFrame(a)
  }, [target, suffix])
  return <span ref={ref}>0{suffix}</span>
}

export default function PeulNation() {
  const [showSplash, setShowSplash] = useState(true)
  const [tab, setTab] = useState<'population' | 'diaspora'>('population')

  const maxVal = countries[0].v
  const data = tab === 'population' ? countries : diaspora
  const dMaxVal = tab === 'diaspora' ? diaspora[0].v : maxVal

  if (showSplash) {
    return (
      <SplashScreen
        icon={<IconGlobe size={120} />}
        title="PeulNation"
        onComplete={() => setShowSplash(false)}
      />
    )
  }

  return (
    <div className="min-h-screen px-5 pt-6 pb-24">
      <h1 style={{ fontSize: 28, fontWeight: 800, color: '#f5f0ea', marginBottom: 4 }}>
        PeulNation
      </h1>
      <p style={{ fontSize: 14, color: 'rgba(245,240,234,0.5)', marginBottom: 8 }}>
        Les Peuls dans le monde
      </p>

      {/* Total counter */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-6 mb-6"
      >
        <p style={{ fontSize: 40, fontWeight: 900, color: '#f5f0ea' }}>
          + de <AnimCounter target={45} suffix=" M" />
        </p>
        <p style={{ fontSize: 14, color: 'rgba(245,240,234,0.4)' }}>de Peuls dans le monde</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(['population', 'diaspora'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="flex-1 py-3 rounded-xl transition-all"
            style={{
              background: tab === t ? 'rgba(181,130,78,0.15)' : 'rgba(245,240,234,0.04)',
              border: tab === t ? '1px solid rgba(181,130,78,0.3)' : '0.5px solid rgba(245,240,234,0.06)',
              color: tab === t ? '#b5824e' : 'rgba(245,240,234,0.5)',
              fontSize: 14,
              fontWeight: 600,
              textTransform: 'capitalize' as const,
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Country list */}
      <div className="flex flex-col gap-2">
        {data.map((c, i) => (
          <motion.div
            key={c.cc}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 py-3 px-4 rounded-xl"
            style={{
              background: i === 0 ? 'rgba(181,130,78,0.06)' : 'rgba(245,240,234,0.02)',
              border: i === 0 ? '1px solid rgba(181,130,78,0.12)' : '0.5px solid rgba(245,240,234,0.04)',
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 700, color: i < 3 ? '#b5824e' : 'rgba(245,240,234,0.3)', minWidth: 20, textAlign: 'center' }}>
              {c.r}
            </span>
            <span style={{ fontSize: 24 }}>{flag(c.cc)}</span>
            <div className="flex-1 min-w-0">
              <p style={{ fontSize: 14, fontWeight: 600, color: '#f5f0ea' }}>{c.n}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 rounded-full overflow-hidden h-1.5" style={{ background: 'rgba(245,240,234,0.06)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(c.v / dMaxVal) * 100}%` }}
                    transition={{ delay: 0.3 + i * 0.04, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #b5824e, #c49a62)' }}
                  />
                </div>
              </div>
            </div>
            <div className="text-right">
              <p style={{ fontSize: 13, fontWeight: 700, color: '#f5f0ea' }}>{fmt(c.v)}</p>
              {c.p && <p style={{ fontSize: 10, color: 'rgba(245,240,234,0.3)' }}>{c.p}</p>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
