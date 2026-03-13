import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SplashScreen from '../components/shared/SplashScreen'
import { IconQuestion, IconBook } from '../components/shared/Icons'
import { useUserStore } from '../stores/userStore'
import ScrollReveal from '../components/shared/ScrollReveal'
import { useIsTablet } from '../hooks/useMediaQuery'
import icons from '../data/icons.json'
import avatars from '../data/avatars.json'

const ic = icons as Record<string, string>
const av = avatars as Record<string, string>

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
  { cat: 'Quiz', name: 'Diallo', iconEl: <IconQuestion size={20} />, accent: '#b5824e' },
  { cat: 'Academy', name: 'Ba', iconEl: <IconBook size={20} />, accent: '#6d9eeb' },
  { cat: 'Progression', name: 'Sow', iconEl: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b5824e" strokeWidth="1.5"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg>, accent: '#4ade80' },
  { cat: 'Plus actif', name: 'Barry', iconEl: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b5824e" strokeWidth="1.5"><path d="M12 2v20M2 12h20"/><circle cx="12" cy="12" r="3"/></svg>, accent: '#c084fc' },
]

function AnimCounter({ target, duration = 1200 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const start = performance.now()
    function a(now: number) { const p = Math.min((now - start) / duration, 1); el!.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target).toLocaleString(); if (p < 1) requestAnimationFrame(a) }
    requestAnimationFrame(a)
  }, [target, duration])
  return <span ref={ref}>0</span>
}

/* Shimmer keyframes injected once */
const shimmerStyle = `
@keyframes yettore-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
@keyframes yettore-float {
  0%, 100% { transform: translateY(0) scale(1); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 0.6; }
  100% { transform: translateY(-80px) scale(0.3); opacity: 0; }
}
`

export default function Yettore() {
  const isTablet = useIsTablet()
  const { nom, avatarId } = useUserStore()
  const [showSplash, setShowSplash] = useState(!isTablet)
  const [tab, setTab] = useState<'general' | 'categories'>('general')
  const userYettore = nom || 'Diallo'

  // Resolve avatar
  const avatarKeys = Object.keys(av)
  const userAvatar = avatarId && av[avatarId] ? av[avatarId] : (avatarKeys.length > 0 ? av[avatarKeys[0]] : null)

  if (showSplash) return <SplashScreen icon={<img src={ic.tree} alt="" className="w-[120px] h-[120px] object-contain" />} title="Yettore" onComplete={() => setShowSplash(false)} />

  const medalColors = ['#d4a24e', '#a8a8a8', '#b87333']
  const medalLabels = ['Or', 'Argent', 'Bronze']

  return (
    <div className="min-h-screen">
      <style>{shimmerStyle}</style>

      <section className="section-padding pt-12 md:pt-20 pb-8 md:pb-12">
        <div className="content-max">
          <div className="amber-line" />
          <h1 className="text-hero">Yettore</h1>
          <p className="text-body mt-3 max-w-lg">Classement par nom de famille. Represente ta lignee.</p>
        </div>
      </section>

      <section className="section-padding pb-24 md:pb-16">
        <div className="content-max">
          {/* Tabs — pill-shaped */}
          <div className="flex gap-2 mb-8">
            {(['general', 'categories'] as const).map((t) => (
              <motion.button
                key={t}
                onClick={() => setTab(t)}
                className="px-6 py-3 transition-all text-sm font-semibold relative"
                style={{
                  borderRadius: '999px',
                  background: tab === t ? 'rgba(181,130,78,0.15)' : 'rgba(245,240,234,0.04)',
                  border: tab === t ? '1px solid rgba(181,130,78,0.3)' : '0.5px solid rgba(245,240,234,0.06)',
                  color: tab === t ? '#b5824e' : 'rgba(245,240,234,0.5)',
                }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {t === 'general' ? 'Classement' : 'Categories'}
              </motion.button>
            ))}
          </div>

          {tab === 'general' ? (
            <>
              {/* Podium — dramatic top 3 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {rankings.slice(0, 3).map((r, i) => {
                  const color = medalColors[i]
                  const isGold = i === 0
                  return (
                    <ScrollReveal key={r.name} delay={i * 0.1}>
                      <motion.div
                        className="surface-card relative overflow-hidden text-center"
                        style={{
                          padding: isGold ? '2rem 1.5rem 2.5rem' : '1.5rem 1.25rem 2rem',
                          border: `1px solid ${color}30`,
                          boxShadow: isGold
                            ? `0 0 60px ${color}15, 0 0 120px ${color}08, inset 0 1px 0 ${color}15`
                            : `0 0 30px ${color}08`,
                          borderRadius: '24px',
                        }}
                        whileHover={{ y: -3, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
                      >
                        {/* Glow */}
                        <div
                          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
                          style={{
                            width: isGold ? '280px' : '200px',
                            height: isGold ? '140px' : '100px',
                            opacity: isGold ? 0.18 : 0.1,
                            background: `radial-gradient(ellipse, ${color}, transparent 70%)`,
                          }}
                        />

                        {/* Rank medal circle */}
                        <div className="relative z-10 mx-auto mb-4">
                          <motion.div
                            className="inline-flex items-center justify-center rounded-full font-black"
                            style={{
                              width: isGold ? '64px' : '52px',
                              height: isGold ? '64px' : '52px',
                              fontSize: isGold ? '1.5rem' : '1.125rem',
                              background: `${color}18`,
                              color: color,
                              border: `2px solid ${color}40`,
                              boxShadow: isGold ? `0 0 20px ${color}20` : undefined,
                            }}
                            animate={isGold ? { boxShadow: [`0 0 20px ${color}10`, `0 0 30px ${color}25`, `0 0 20px ${color}10`] } : undefined}
                            transition={isGold ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : undefined}
                          >
                            {i + 1}
                          </motion.div>
                          <p
                            className="text-[10px] font-bold uppercase tracking-widest mt-1.5"
                            style={{ color: `${color}80` }}
                          >
                            {medalLabels[i]}
                          </p>
                        </div>

                        <h3
                          className="relative z-10 font-black"
                          style={{
                            color: color,
                            fontSize: isGold ? '1.75rem' : '1.375rem',
                            lineHeight: 1.2,
                          }}
                        >
                          {r.name}
                        </h3>
                        <p className="text-small mt-2 relative z-10">
                          {r.members} membres · <AnimCounter target={r.avg} /> pts/moy
                        </p>
                      </motion.div>
                    </ScrollReveal>
                  )
                })}
              </div>

              {/* Rest of rankings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {rankings.slice(3).map((r, i) => (
                  <ScrollReveal key={r.name} delay={i * 0.04}>
                    <motion.div
                      className="surface-card flex items-center gap-4 p-4 md:p-5"
                      whileHover={{ y: -2, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
                    >
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
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>

              {/* Your position — "Toi" card with avatar + CTA */}
              <ScrollReveal>
                <div
                  className="mt-6 rounded-3xl relative overflow-hidden"
                  style={{
                    background: 'rgba(181,130,78,0.06)',
                    border: '1px solid rgba(181,130,78,0.2)',
                  }}
                >
                  {/* Amber highlight bar at top */}
                  <div
                    className="absolute top-0 left-0 w-full h-[3px]"
                    style={{ background: 'linear-gradient(90deg, #b5824e, #c49a62, #b5824e)' }}
                  />

                  <div className="p-5 md:p-7">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      {userAvatar ? (
                        <img
                          src={userAvatar}
                          alt=""
                          className="w-14 h-14 rounded-2xl object-cover flex-shrink-0"
                          style={{ border: '2px solid rgba(181,130,78,0.25)' }}
                        />
                      ) : (
                        <span
                          className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold flex-shrink-0"
                          style={{ background: 'rgba(181,130,78,0.12)', color: '#b5824e' }}
                        >
                          Toi
                        </span>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: '#b5824e' }}>
                          Ta position
                        </p>
                        <h3 className="text-h3 mt-0.5">{userYettore}</h3>
                        <p className="text-small mt-0.5">1er · 124 pts derriere les Ba</p>
                      </div>
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-lg font-black"
                        style={{ background: 'rgba(181,130,78,0.12)', color: '#b5824e' }}
                      >
                        #1
                      </div>
                    </div>

                    {/* CTA */}
                    <Link to="/quiz">
                      <motion.button
                        className="w-full mt-5 py-3.5 rounded-2xl text-sm font-bold transition-colors"
                        style={{
                          background: 'linear-gradient(135deg, #b5824e, #c49a62)',
                          color: '#050505',
                          borderRadius: '16px',
                        }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      >
                        Jouer pour gagner des points
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </>
          ) : (
            <>
              {/* Yettore de la semaine — with shimmer */}
              <ScrollReveal>
                <div
                  className="rounded-3xl p-8 md:p-10 mb-8 text-center relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(212,162,78,0.08), rgba(12,11,9,1))',
                    border: '1px solid rgba(212,162,78,0.15)',
                    boxShadow: '0 0 60px rgba(212,162,78,0.06)',
                  }}
                >
                  {/* Top glow */}
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] opacity-15 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse, #d4a24e, transparent 70%)' }}
                  />

                  {/* Shimmer overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.06]"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(212,162,78,0.4) 50%, transparent 100%)',
                      backgroundSize: '200% 100%',
                      animation: 'yettore-shimmer 3s ease-in-out infinite',
                    }}
                  />

                  {/* Floating gold particles */}
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full pointer-events-none"
                      style={{
                        width: `${3 + i % 3}px`,
                        height: `${3 + i % 3}px`,
                        background: '#d4a24e',
                        left: `${15 + i * 13}%`,
                        bottom: '20%',
                        opacity: 0,
                        animation: `yettore-float ${2 + i * 0.5}s ease-out ${i * 0.4}s infinite`,
                      }}
                    />
                  ))}

                  <p className="text-label relative z-10">Yettore de la semaine</p>

                  {/* Gold medal */}
                  <div
                    className="relative z-10 mx-auto mt-4 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black"
                    style={{
                      background: 'rgba(212,162,78,0.15)',
                      border: '2px solid rgba(212,162,78,0.3)',
                      color: '#d4a24e',
                      boxShadow: '0 0 30px rgba(212,162,78,0.15)',
                    }}
                  >
                    1
                  </div>

                  <h2 className="text-hero mt-4 relative z-10" style={{ color: '#d4a24e' }}>DIALLO</h2>
                  <p className="text-body mt-2 relative z-10">342 membres · 847 pts de moyenne</p>
                </div>
              </ScrollReveal>

              {/* Category winners with colored accents */}
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
                style={{ color: 'rgba(245,240,234,0.35)' }}
              >
                Meilleurs par categorie
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {catWinners.map((cw, i) => (
                  <ScrollReveal key={cw.cat} delay={i * 0.08}>
                    <motion.div
                      className="surface-card p-5 md:p-6 relative overflow-hidden"
                      style={{ borderRadius: '20px' }}
                      whileHover={{ y: -2, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
                    >
                      {/* Subtle accent line at top */}
                      <div
                        className="absolute top-0 left-0 w-full h-[2px]"
                        style={{ background: `linear-gradient(90deg, ${cw.accent}60, transparent)` }}
                      />
                      <span
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                        style={{ background: `${cw.accent}12` }}
                      >
                        {cw.iconEl}
                      </span>
                      <p className="text-label text-[10px]">{cw.cat}</p>
                      <p className="text-h3 mt-2">{cw.name}</p>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>

              {/* Invite section with geometric pattern */}
              <ScrollReveal>
                <div
                  className="rounded-3xl p-6 md:p-8 mt-8 text-center relative overflow-hidden"
                  style={{
                    background: 'rgba(181,130,78,0.06)',
                    border: '1px solid rgba(181,130,78,0.15)',
                    borderRadius: '24px',
                  }}
                >
                  {/* Geometric pattern overlay */}
                  <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
                    <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
                      {[...Array(8)].map((_, i) => (
                        <polygon
                          key={i}
                          points={`${50 + i * 45},${20 + (i % 2) * 40} ${70 + i * 45},${60 + (i % 2) * 40} ${30 + i * 45},${60 + (i % 2) * 40}`}
                          fill="none"
                          stroke="#b5824e"
                          strokeWidth="0.5"
                        />
                      ))}
                      {[...Array(6)].map((_, i) => (
                        <circle
                          key={`c${i}`}
                          cx={60 + i * 60}
                          cy={130 + (i % 2) * 30}
                          r={8 + (i % 3) * 4}
                          fill="none"
                          stroke="#b5824e"
                          strokeWidth="0.5"
                        />
                      ))}
                    </svg>
                  </div>

                  <div className="relative z-10">
                    <div
                      className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-4"
                      style={{ background: 'rgba(181,130,78,0.1)' }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b5824e" strokeWidth="1.5">
                        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4-4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <line x1="19" y1="8" x2="19" y2="14" />
                        <line x1="22" y1="11" x2="16" y2="11" />
                      </svg>
                    </div>
                    <p className="text-h3">Les {userYettore.toUpperCase()} comptent sur toi !</p>
                    <p className="text-small mt-2 max-w-xs mx-auto">Invite d'autres membres de ta famille pour grimper dans le classement.</p>
                    <motion.button
                      className="btn-primary mt-6"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                      Inviter des membres de ma famille
                    </motion.button>
                  </div>
                </div>
              </ScrollReveal>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
