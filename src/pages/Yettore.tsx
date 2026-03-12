import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import SplashScreen from '../components/shared/SplashScreen'
import { IconBaobab } from '../components/shared/Icons'

const rankings = [
  { name: 'Diallo', members: 342, avg: 847, trend: 'up' },
  { name: 'Ba', members: 289, avg: 792, trend: 'up' },
  { name: 'Sow', members: 256, avg: 735, trend: 'down' },
  { name: 'Barry', members: 198, avg: 681, trend: 'up' },
  { name: 'Balde', members: 176, avg: 624, trend: 'down' },
  { name: 'Diakite', members: 145, avg: 589, trend: 'up' },
  { name: 'Camara', members: 134, avg: 543, trend: 'down' },
  { name: 'Sidibe', members: 112, avg: 498, trend: 'up' },
  { name: 'Toure', members: 98, avg: 456, trend: 'down' },
  { name: 'Sangare', members: 87, avg: 412, trend: 'up' },
]

const catWinners = [
  { cat: 'Quiz', name: 'Diallo', icon: '?' },
  { cat: 'Academy', name: 'Ba', icon: 'A' },
  { cat: 'Progression', name: 'Sow', icon: '+' },
  { cat: 'Plus actif', name: 'Barry', icon: '*' },
]

function AnimCounter({ target, duration = 1200 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const start = performance.now()
    function a(now: number) {
      const p = Math.min((now - start) / duration, 1)
      el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target).toLocaleString()
      if (p < 1) requestAnimationFrame(a)
    }
    requestAnimationFrame(a)
  }, [target, duration])
  return <span ref={ref}>0</span>
}

export default function Yettore() {
  const [showSplash, setShowSplash] = useState(true)
  const [tab, setTab] = useState<'general' | 'categories'>('general')

  if (showSplash) {
    return (
      <SplashScreen
        icon={<IconBaobab size={120} />}
        title="Yettore"
        onComplete={() => setShowSplash(false)}
      />
    )
  }

  return (
    <div className="min-h-screen px-5 pt-6 pb-24">
      <h1 style={{ fontSize: 28, fontWeight: 800, color: '#f5f0ea', marginBottom: 4 }}>Yettore</h1>
      <p style={{ fontSize: 14, color: 'rgba(245,240,234,0.5)', marginBottom: 20 }}>
        Classement par nom de famille
      </p>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(['general', 'categories'] as const).map((t) => (
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
            }}
          >
            {t === 'general' ? 'Classement' : 'Categories'}
          </button>
        ))}
      </div>

      {tab === 'general' ? (
        <div className="flex flex-col gap-3">
          {rankings.map((r, i) => {
            const isGold = i === 0
            const isSilver = i === 1
            const isBronze = i === 2
            const opacity = i > 2 ? 1 - (i - 3) * 0.08 : 1
            const medalColor = isGold ? '#d4a24e' : isSilver ? '#a8a8a8' : isBronze ? '#b87333' : '#b5824e'

            return (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: opacity, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl p-4 relative overflow-hidden"
                style={{
                  background: isGold
                    ? 'linear-gradient(135deg, rgba(212,162,78,0.08) 0%, rgba(12,11,9,1) 100%)'
                    : '#0c0b09',
                  border: isGold
                    ? '1px solid rgba(212,162,78,0.2)'
                    : '0.5px solid #161410',
                  boxShadow: isGold ? '0 0 30px rgba(212,162,78,0.08)' : undefined,
                }}
              >
                <div className="flex items-center gap-4">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `rgba(${isGold ? '212,162,78' : isSilver ? '168,168,168' : isBronze ? '184,115,51' : '181,130,78'},0.12)`,
                      fontSize: 16,
                      fontWeight: 800,
                      color: medalColor,
                    }}
                  >
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <h3 style={{
                      fontSize: isGold ? 20 : 16,
                      fontWeight: 700,
                      color: isGold ? '#d4a24e' : '#f5f0ea',
                    }}>
                      {r.name}
                    </h3>
                    <p style={{ fontSize: 12, color: 'rgba(245,240,234,0.4)', marginTop: 2 }}>
                      {r.members} membres · <AnimCounter target={r.avg} /> pts/moy
                    </p>
                  </div>
                  <span style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: r.trend === 'up' ? '#4ade80' : '#ef4444',
                  }}>
                    {r.trend === 'up' ? '▲' : '▼'}
                  </span>
                </div>
              </motion.div>
            )
          })}

          {/* Your position */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-2xl p-4 mt-2"
            style={{
              background: 'rgba(181,130,78,0.06)',
              border: '1px solid rgba(181,130,78,0.15)',
            }}
          >
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
                background: 'rgba(181,130,78,0.12)', fontSize: 14, fontWeight: 700, color: '#b5824e',
              }}>
                Toi
              </span>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f5f0ea' }}>Diallo</h3>
                <p style={{ fontSize: 12, color: 'rgba(245,240,234,0.4)' }}>
                  1er · 124 pts derriere les Ba
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        <div>
          {/* Yettore de la semaine */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl p-6 mb-6 text-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(212,162,78,0.1) 0%, rgba(12,11,9,1) 100%)',
              border: '1px solid rgba(212,162,78,0.2)',
              boxShadow: '0 0 40px rgba(212,162,78,0.08)',
            }}
          >
            <p style={{ fontSize: 11, color: '#d4a24e', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' as const }}>
              YETTORE DE LA SEMAINE
            </p>
            <h2 style={{ fontSize: 32, fontWeight: 900, color: '#d4a24e', marginTop: 8 }}>DIALLO</h2>
            <p style={{ fontSize: 13, color: 'rgba(245,240,234,0.5)', marginTop: 4 }}>
              342 membres · 847 pts de moyenne
            </p>
          </motion.div>

          {/* Category winners */}
          <div className="grid grid-cols-2 gap-3">
            {catWinners.map((cw, i) => (
              <motion.div
                key={cw.cat}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="rounded-2xl p-4"
                style={{
                  background: '#0c0b09',
                  border: '0.5px solid #161410',
                }}
              >
                <span
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: 'rgba(181,130,78,0.08)', fontSize: 18, fontWeight: 700, color: '#b5824e' }}
                >
                  {cw.icon}
                </span>
                <p style={{ fontSize: 11, color: 'rgba(245,240,234,0.4)', fontWeight: 500, textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>
                  {cw.cat}
                </p>
                <p style={{ fontSize: 16, fontWeight: 700, color: '#f5f0ea', marginTop: 4 }}>
                  {cw.name}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Invite */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-2xl p-5 mt-6 text-center"
            style={{
              background: 'rgba(181,130,78,0.06)',
              border: '1px solid rgba(181,130,78,0.15)',
            }}
          >
            <p style={{ fontSize: 15, fontWeight: 600, color: '#f5f0ea' }}>
              Les DIALLO comptent sur toi !
            </p>
            <button
              className="mt-4 px-6 py-3 rounded-xl font-semibold transition-transform active:scale-[0.97]"
              style={{
                background: 'linear-gradient(135deg, #d4a24e, #b5824e)',
                color: '#050505',
                fontSize: 14,
              }}
            >
              Inviter des membres de ma famille
            </button>
          </motion.div>
        </div>
      )}
    </div>
  )
}
