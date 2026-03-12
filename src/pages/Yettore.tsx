import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import SplashScreen from '../components/shared/SplashScreen'
import { IconBaobab, IconQuestion, IconBook } from '../components/shared/Icons'
import { useUserStore } from '../stores/userStore'
import ScrollReveal from '../components/shared/ScrollReveal'
import { useIsTablet } from '../hooks/useMediaQuery'

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
  { cat: 'Quiz', name: 'Diallo', iconEl: <IconQuestion size={20} /> },
  { cat: 'Academy', name: 'Ba', iconEl: <IconBook size={20} /> },
  { cat: 'Progression', name: 'Sow', iconEl: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b5824e" strokeWidth="1.5"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg> },
  { cat: 'Plus actif', name: 'Barry', iconEl: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b5824e" strokeWidth="1.5"><path d="M12 2v20M2 12h20"/><circle cx="12" cy="12" r="3"/></svg> },
]

function AnimCounter({ target, duration = 1200 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const start = performance.now()
    function a(now: number) { const p = Math.min((now - start) / duration, 1); el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target).toLocaleString(); if (p < 1) requestAnimationFrame(a) }
    requestAnimationFrame(a)
  }, [target, duration])
  return <span ref={ref}>0</span>
}

export default function Yettore() {
  const isTablet = useIsTablet()
  const { nom } = useUserStore()
  const [showSplash, setShowSplash] = useState(!isTablet)
  const [tab, setTab] = useState<'general' | 'categories'>('general')
  const userYettore = nom || 'Diallo'

  if (showSplash) return <SplashScreen icon={<IconBaobab size={120} />} title="Yettore" onComplete={() => setShowSplash(false)} />

  return (
    <div className="min-h-screen">
      <section className="section-padding pt-12 md:pt-20 pb-8 md:pb-12">
        <div className="content-max">
          <div className="amber-line" />
          <h1 className="text-hero">Yettore</h1>
          <p className="text-body mt-3 max-w-lg">Classement par nom de famille. Represente ta lignee.</p>
        </div>
      </section>

      <section className="section-padding pb-24 md:pb-16">
        <div className="content-max">
          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            {(['general', 'categories'] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className="px-5 py-3 rounded-xl transition-all text-sm font-semibold"
                style={{
                  background: tab === t ? 'rgba(181,130,78,0.15)' : 'rgba(245,240,234,0.04)',
                  border: tab === t ? '1px solid rgba(181,130,78,0.3)' : '0.5px solid rgba(245,240,234,0.06)',
                  color: tab === t ? '#b5824e' : 'rgba(245,240,234,0.5)',
                }}>
                {t === 'general' ? 'Classement' : 'Categories'}
              </button>
            ))}
          </div>

          {tab === 'general' ? (
            <>
              {/* Podium — top 3 side-by-side on desktop */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {rankings.slice(0, 3).map((r, i) => {
                  const colors = ['#d4a24e', '#a8a8a8', '#b87333']
                  return (
                    <ScrollReveal key={r.name} delay={i * 0.1}>
                      <div className="surface-card card-hover p-6 text-center relative overflow-hidden"
                        style={{ border: `1px solid ${colors[i]}25`, boxShadow: i === 0 ? `0 0 40px ${colors[i]}10` : undefined }}>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[100px] opacity-10"
                          style={{ background: `radial-gradient(ellipse, ${colors[i]}, transparent 70%)` }} />
                        <span className="relative z-10 inline-flex w-14 h-14 rounded-2xl items-center justify-center text-xl font-black"
                          style={{ background: `${colors[i]}15`, color: colors[i] }}>
                          {i + 1}
                        </span>
                        <h3 className="text-h2 mt-3 relative z-10" style={{ color: colors[i] }}>{r.name}</h3>
                        <p className="text-small mt-2 relative z-10">{r.members} membres · <AnimCounter target={r.avg} /> pts/moy</p>
                      </div>
                    </ScrollReveal>
                  )
                })}
              </div>

              {/* Rest of rankings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {rankings.slice(3).map((r, i) => (
                  <ScrollReveal key={r.name} delay={i * 0.04}>
                    <div className="surface-card card-hover flex items-center gap-4 p-4 md:p-5">
                      <span className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold"
                        style={{ background: 'rgba(181,130,78,0.08)', color: '#b5824e' }}>
                        {i + 4}
                      </span>
                      <div className="flex-1">
                        <h3 className="text-[15px] font-bold" style={{ color: '#f5f0ea' }}>{r.name}</h3>
                        <p className="text-xs mt-0.5" style={{ color: 'rgba(245,240,234,0.4)' }}>
                          {r.members} membres · <AnimCounter target={r.avg} /> pts/moy
                        </p>
                      </div>
                      <span style={{ color: r.trend === 'up' ? '#4ade80' : '#ef4444' }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                          {r.trend === 'up'
                            ? <path d="M6 2L10 8H2L6 2Z" />
                            : <path d="M6 10L2 4H10L6 10Z" />
                          }
                        </svg>
                      </span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* Your position */}
              <ScrollReveal>
                <div className="mt-6 rounded-2xl p-5 md:p-6" style={{ background: 'rgba(181,130,78,0.06)', border: '1px solid rgba(181,130,78,0.15)' }}>
                  <div className="flex items-center gap-4">
                    <span className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold"
                      style={{ background: 'rgba(181,130,78,0.12)', color: '#b5824e' }}>Toi</span>
                    <div>
                      <h3 className="text-h3">{userYettore}</h3>
                      <p className="text-small mt-0.5">1er · 124 pts derriere les Ba</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </>
          ) : (
            <>
              {/* Yettore de la semaine */}
              <ScrollReveal>
                <div className="rounded-3xl p-8 md:p-10 mb-8 text-center relative overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, rgba(212,162,78,0.08), rgba(12,11,9,1))', border: '1px solid rgba(212,162,78,0.15)', boxShadow: '0 0 60px rgba(212,162,78,0.06)' }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] opacity-15"
                    style={{ background: 'radial-gradient(ellipse, #d4a24e, transparent 70%)' }} />
                  <p className="text-label relative z-10">Yettore de la semaine</p>
                  <h2 className="text-hero mt-4 relative z-10" style={{ color: '#d4a24e' }}>DIALLO</h2>
                  <p className="text-body mt-2 relative z-10">342 membres · 847 pts de moyenne</p>
                </div>
              </ScrollReveal>

              {/* Category winners */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {catWinners.map((cw, i) => (
                  <ScrollReveal key={cw.cat} delay={i * 0.08}>
                    <div className="surface-card card-hover p-5 md:p-6">
                      <span className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                        style={{ background: 'rgba(181,130,78,0.08)' }}>{cw.iconEl}</span>
                      <p className="text-label text-[10px]">{cw.cat}</p>
                      <p className="text-h3 mt-2">{cw.name}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* Invite */}
              <ScrollReveal>
                <div className="rounded-2xl p-6 md:p-8 mt-8 text-center" style={{ background: 'rgba(181,130,78,0.06)', border: '1px solid rgba(181,130,78,0.15)' }}>
                  <p className="text-h3">Les {userYettore.toUpperCase()} comptent sur toi !</p>
                  <button className="btn-primary mt-6">Inviter des membres de ma famille</button>
                </div>
              </ScrollReveal>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
