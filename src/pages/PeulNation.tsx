import { useState } from 'react'
import { motion } from 'framer-motion'
import SplashScreen from '../components/shared/SplashScreen'
import ScrollReveal from '../components/shared/ScrollReveal'
import { useIsTablet } from '../hooks/useMediaQuery'
import icons from '../data/icons.json'

const ic = icons as Record<string, string>

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

function fmt(n: number) { if (n >= 1e6) return (n / 1e6).toFixed(1).replace('.', ',') + ' M'; if (n >= 1e3) return Math.round(n / 1e3) + ' K'; return String(n) }

function CountryBadge({ cc }: { cc: string }) {
  return (
    <span
      className="inline-flex items-center justify-center w-10 h-7 rounded-md text-xs font-bold uppercase tracking-wide"
      style={{ background: 'rgba(181,130,78,0.1)', color: '#b5824e', border: '1px solid rgba(181,130,78,0.15)' }}
    >
      {cc}
    </span>
  )
}

export default function PeulNation() {
  const isTablet = useIsTablet()
  const [showSplash, setShowSplash] = useState(!isTablet)
  const [tab, setTab] = useState<'population' | 'diaspora'>('population')

  const data = tab === 'population' ? countries : diaspora
  const dMaxVal = data[0].v

  if (showSplash) return <SplashScreen icon={<img src={ic.globe} alt="" className="w-[120px] h-[120px] object-contain" />} title="PeulNation" onComplete={() => setShowSplash(false)} />

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section-padding pt-12 md:pt-20 pb-6">
        <div className="content-max text-center md:text-left">
          <div className="amber-line mx-auto md:mx-0" />
          <h1 className="text-hero">PeulNation</h1>
          <p className="text-body mt-3 max-w-lg mx-auto md:mx-0">La presence Peule dans le monde.</p>
        </div>
      </section>

      <section className="section-padding pb-24 md:pb-16">
        <div className="content-max">
          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            {(['population', 'diaspora'] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className="px-5 py-3 rounded-xl transition-all text-sm font-semibold capitalize"
                style={{
                  background: tab === t ? 'rgba(181,130,78,0.15)' : 'rgba(245,240,234,0.04)',
                  border: tab === t ? '1px solid rgba(181,130,78,0.3)' : '0.5px solid rgba(245,240,234,0.06)',
                  color: tab === t ? '#b5824e' : 'rgba(245,240,234,0.5)',
                }}>
                {t}
              </button>
            ))}
          </div>

          {/* Country grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {data.map((c, i) => (
              <ScrollReveal key={c.cc} delay={i * 0.04}>
                <div className="surface-card card-hover flex items-center gap-4 py-4 px-5 md:px-6"
                  style={i === 0 ? { background: 'rgba(181,130,78,0.06)', border: '1px solid rgba(181,130,78,0.12)' } : {}}>
                  <span className="text-xs font-bold w-5 text-center" style={{ color: i < 3 ? '#b5824e' : 'rgba(245,240,234,0.3)' }}>{c.r}</span>
                  <CountryBadge cc={c.cc} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold" style={{ color: '#f5f0ea' }}>{c.n}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex-1 rounded-full overflow-hidden h-1.5" style={{ background: 'rgba(245,240,234,0.06)' }}>
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${(c.v / dMaxVal) * 100}%` }}
                          viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.04, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #b5824e, #c49a62)' }} />
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold" style={{ color: '#f5f0ea' }}>{fmt(c.v)}</p>
                    {c.p && <p className="text-xs" style={{ color: 'rgba(245,240,234,0.3)' }}>{c.p}</p>}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
