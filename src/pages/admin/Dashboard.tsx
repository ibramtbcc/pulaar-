import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Logo from '../../components/shared/Logo'

const feedUsers = [
  { name: 'Aissatou Ba', age: 24, city: 'Paris', country: 'FR', page: 'Quiz' },
  { name: 'Mamadou Diallo', age: 31, city: 'Conakry', country: 'GN', page: 'Academy' },
  { name: 'Fatoumata Sow', age: 19, city: 'Dakar', country: 'SN', page: 'Kitchen' },
  { name: 'Ibrahima Barry', age: 28, city: 'Bruxelles', country: 'BE', page: 'Music' },
  { name: 'Kadiatou Balde', age: 22, city: 'Lyon', country: 'FR', page: 'Quiz' },
  { name: 'Ousmane Diakite', age: 35, city: 'Bamako', country: 'ML', page: 'Yettore' },
]

const pageColors: Record<string, string> = {
  Quiz: '#b5824e', Academy: '#4ade80', Kitchen: '#ef4444', Music: '#3b82f6', Yettore: '#d4a24e',
}

const dailyData = [842, 1105, 967, 1247, 1089, 956, 1312]
const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

const sources = [
  { name: 'Instagram', pct: 42 },
  { name: 'TikTok', pct: 28 },
  { name: 'Facebook', pct: 16 },
  { name: 'Snapchat', pct: 8 },
  { name: 'Bouche a oreille', pct: 6 },
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

export default function Dashboard() {
  return (
    <div className="min-h-screen" style={{ background: '#0a0a0a' }}>
      {/* Nav */}
      <div
        className="sticky top-0 z-30 px-6 py-4 flex items-center justify-between"
        style={{
          background: 'rgba(10,10,10,0.9)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(245,240,234,0.04)',
        }}
      >
        <div className="flex items-center gap-3">
          <Logo size={24} />
          <span
            className="px-2.5 py-1 rounded-md"
            style={{ background: 'rgba(181,130,78,0.15)', fontSize: 10, fontWeight: 700, color: '#b5824e', letterSpacing: '0.1em' }}
          >
            ADMIN
          </span>
        </div>
        <button
          className="px-4 py-2 rounded-xl"
          style={{ background: 'rgba(245,240,234,0.04)', border: '0.5px solid rgba(245,240,234,0.08)', fontSize: 12, fontWeight: 500, color: 'rgba(245,240,234,0.6)' }}
        >
          Exporter CSV
        </button>
      </div>

      <div className="px-6 py-6 max-w-[1400px] mx-auto">
        {/* Live section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Gauge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-6"
            style={{ background: '#121110', border: '0.5px solid rgba(245,240,234,0.04)' }}
          >
            <p style={{ fontSize: 12, color: 'rgba(245,240,234,0.4)', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 16 }}>
              EN CE MOMENT
            </p>
            <div className="flex items-center gap-6">
              <div className="relative w-[120px] h-[120px]">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(245,240,234,0.04)" strokeWidth="8"/>
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#4ade80" strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 52}`}
                    strokeDashoffset={`${2 * Math.PI * 52 * 0.3}`}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                    style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.16,1,0.3,1)' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span style={{ fontSize: 28, fontWeight: 800, color: '#4ade80' }}>
                    <AnimCounter target={247} />
                  </span>
                  <span style={{ fontSize: 10, color: 'rgba(245,240,234,0.4)' }}>en ligne</span>
                </div>
              </div>
              <div>
                <p style={{ fontSize: 13, color: 'rgba(245,240,234,0.5)' }}>
                  <span style={{ color: '#4ade80', fontWeight: 600 }}>+12%</span> vs hier
                </p>
                <p style={{ fontSize: 24, fontWeight: 800, color: '#f5f0ea', marginTop: 8 }}>
                  <AnimCounter target={1247} duration={1800} />
                </p>
                <p style={{ fontSize: 12, color: 'rgba(245,240,234,0.4)' }}>inscrits total</p>
              </div>
            </div>
          </motion.div>

          {/* Feed */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl p-6"
            style={{ background: '#121110', border: '0.5px solid rgba(245,240,234,0.04)' }}
          >
            <p style={{ fontSize: 12, color: 'rgba(245,240,234,0.4)', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 12 }}>
              FEED LIVE
            </p>
            <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
              {feedUsers.map((u, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-3 py-2 px-3 rounded-xl"
                  style={{ background: 'rgba(245,240,234,0.02)' }}
                >
                  <div className="w-8 h-8 rounded-full flex-shrink-0" style={{ background: 'rgba(181,130,78,0.15)' }} />
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: 13, fontWeight: 500, color: '#f5f0ea' }} className="truncate">{u.name}</p>
                    <p style={{ fontSize: 11, color: 'rgba(245,240,234,0.3)' }}>{u.age} ans · {u.city}</p>
                  </div>
                  <span
                    className="px-2 py-1 rounded-md"
                    style={{ background: `${pageColors[u.page]}15`, fontSize: 10, fontWeight: 600, color: pageColors[u.page] }}
                  >
                    {u.page}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Daily connections */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl p-6"
            style={{ background: '#121110', border: '0.5px solid rgba(245,240,234,0.04)' }}
          >
            <p style={{ fontSize: 12, color: 'rgba(245,240,234,0.4)', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 16 }}>
              CONNEXIONS / JOUR
            </p>
            <div className="flex items-end gap-2 h-[140px]">
              {dailyData.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(val / Math.max(...dailyData)) * 100}%` }}
                    transition={{ delay: 0.4 + i * 0.06, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full rounded-t-lg"
                    style={{ background: 'linear-gradient(180deg, #b5824e, #8a6338)' }}
                  />
                  <span style={{ fontSize: 10, color: 'rgba(245,240,234,0.3)' }}>{days[i]}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Sources */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl p-6"
            style={{ background: '#121110', border: '0.5px solid rgba(245,240,234,0.04)' }}
          >
            <p style={{ fontSize: 12, color: 'rgba(245,240,234,0.4)', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 16 }}>
              SOURCES D'ACQUISITION
            </p>
            <div className="flex flex-col gap-3">
              {sources.map((s, i) => (
                <div key={s.name} className="flex items-center gap-3">
                  <span style={{ fontSize: 12, color: 'rgba(245,240,234,0.5)', minWidth: 100 }}>{s.name}</span>
                  <div className="flex-1 rounded-full overflow-hidden h-2" style={{ background: 'rgba(245,240,234,0.04)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.pct}%` }}
                      transition={{ delay: 0.5 + i * 0.06, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full"
                      style={{ background: '#b5824e' }}
                    />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#b5824e', minWidth: 30, textAlign: 'right' }}>{s.pct}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Profile stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Genre */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl p-6"
            style={{ background: '#121110', border: '0.5px solid rgba(245,240,234,0.04)' }}
          >
            <p style={{ fontSize: 12, color: 'rgba(245,240,234,0.4)', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 16 }}>
              GENRE
            </p>
            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <p style={{ fontSize: 28, fontWeight: 800, color: '#b5824e' }}>58%</p>
                <p style={{ fontSize: 12, color: 'rgba(245,240,234,0.4)' }}>Hommes</p>
              </div>
              <div className="w-px h-12" style={{ background: 'rgba(245,240,234,0.06)' }} />
              <div className="text-center">
                <p style={{ fontSize: 28, fontWeight: 800, color: '#c49a62' }}>42%</p>
                <p style={{ fontSize: 12, color: 'rgba(245,240,234,0.4)' }}>Femmes</p>
              </div>
            </div>
          </motion.div>

          {/* Age */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-2xl p-6"
            style={{ background: '#121110', border: '0.5px solid rgba(245,240,234,0.04)' }}
          >
            <p style={{ fontSize: 12, color: 'rgba(245,240,234,0.4)', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 16 }}>
              AGE
            </p>
            {[
              { label: '18-24', pct: 38 },
              { label: '25-34', pct: 42 },
              { label: '35-44', pct: 14 },
              { label: '45+', pct: 6 },
            ].map((a) => (
              <div key={a.label} className="flex items-center gap-2 mb-2">
                <span style={{ fontSize: 11, color: 'rgba(245,240,234,0.4)', minWidth: 36 }}>{a.label}</span>
                <div className="flex-1 rounded-full overflow-hidden h-1.5" style={{ background: 'rgba(245,240,234,0.04)' }}>
                  <div className="h-full rounded-full" style={{ width: `${a.pct}%`, background: '#b5824e' }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#b5824e', minWidth: 26, textAlign: 'right' }}>{a.pct}%</span>
              </div>
            ))}
          </motion.div>

          {/* Top pays */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-2xl p-6"
            style={{ background: '#121110', border: '0.5px solid rgba(245,240,234,0.04)' }}
          >
            <p style={{ fontSize: 12, color: 'rgba(245,240,234,0.4)', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 16 }}>
              TOP PAYS
            </p>
            {[
              { country: 'France', pct: 35 },
              { country: 'Guinee', pct: 22 },
              { country: 'Senegal', pct: 18 },
              { country: 'Mali', pct: 12 },
              { country: 'Belgique', pct: 8 },
            ].map((c, i) => (
              <div key={c.country} className="flex items-center justify-between py-1.5">
                <span style={{ fontSize: 13, color: 'rgba(245,240,234,0.6)' }}>
                  {i + 1}. {c.country}
                </span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#b5824e' }}>{c.pct}%</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
