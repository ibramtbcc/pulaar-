import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ScrollReveal from '../components/shared/ScrollReveal'
import { useUserStore } from '../stores/userStore'
import icons from '../data/icons.json'
import foodPhotos from '../data/food.json'
import avatarsData from '../data/avatars.json'

const ic = icons as Record<string, string>
const photos = foodPhotos as Record<string, string>
const avatars = avatarsData as Record<string, { b64: string }>

/* ─── Yettore clan mapping ─── */
const yettoreMap: Record<string, string> = {
  'Diallo': 'Diallubhe', 'Ba': 'Bahbe', 'Sow': 'Sowbe', 'Barry': 'Baribe',
  'Balde': 'Baldebhe', 'Diakite': 'Jaakite', 'Camara': 'Kamarabhe',
  'Sidibe': 'Sidibhe', 'Toure': 'Turebhe', 'Sangare': 'Sangarebhe',
  'Ndiaye': 'Njaaybe', 'Kane': 'Kanebhe', 'Dia': 'Jaabe',
}

function getYettore(nom: string): string {
  if (!nom) return ''
  const key = Object.keys(yettoreMap).find(
    (k) => nom.toLowerCase().startsWith(k.toLowerCase())
  )
  return key ? yettoreMap[key] : ''
}

/* ─── Fulani geometric SVG pattern ─── */
function FulaniPattern({ opacity = 0.04 }: { opacity?: number }) {
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" opacity={opacity}>
      <defs>
        <pattern id="fulani-home" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M30 0L60 30L30 60L0 30Z" fill="none" stroke="#b5824e" strokeWidth="0.5" />
          <path d="M30 10L50 30L30 50L10 30Z" fill="none" stroke="#b5824e" strokeWidth="0.3" />
          <path d="M30 20L40 30L30 40L20 30Z" fill="none" stroke="#c49a62" strokeWidth="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#fulani-home)" />
    </svg>
  )
}

/* ─── Equalizer bars ─── */
function EqBars() {
  return (
    <div className="flex items-end gap-[3px] h-6">
      {[0.6, 1, 0.4, 0.8, 0.5].map((scale, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full"
          style={{ background: '#b5824e', height: '100%', transformOrigin: 'bottom' }}
          animate={{ scaleY: [scale, 1, scale * 0.5, scale] }}
          transition={{ duration: 1.2 + i * 0.15, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

/* ─── Stat counter ─── */
function StatCounter({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-bold" style={{ fontSize: 28, color: '#f5f0ea', lineHeight: 1, fontFamily: "'Outfit', sans-serif" }}>
        {value}
      </div>
      <div className="text-[11px] font-medium mt-1 uppercase tracking-wider" style={{ color: 'rgba(245,240,234,0.4)' }}>
        {label}
      </div>
    </div>
  )
}

/* ─── Arrow icon ─── */
function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

/* ═══════════════════════════════════════════ */
/*               MAIN COMPONENT               */
/* ═══════════════════════════════════════════ */
export default function Home() {
  const { prenom, nom, avatarId, paysRacine, score } = useUserStore()

  const yettore = useMemo(() => getYettore(nom), [nom])

  const avatarSrc = useMemo(() => {
    if (!avatarId) return null
    const entry = avatars[avatarId]
    return entry?.b64 || null
  }, [avatarId])

  const kitchenPhoto = useMemo(() => {
    if (photos['thieb']) return photos['thieb']
    if (photos['thieboudienne']) return photos['thieboudienne']
    const keys = Object.keys(photos)
    return keys.length > 0 ? photos[keys[0]] : null
  }, [])

  const scoreDisplay = score > 0 ? `${Math.min(score, 100)}%` : '0%'

  return (
    <div className="min-h-screen pb-28 lg:pb-16">

      {/* ═══ HERO SECTION ═══ */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(181,130,78,0.15) 0%, rgba(181,130,78,0.04) 50%, transparent 80%)',
          }}
        />
        <div className="absolute inset-0">
          <FulaniPattern opacity={0.025} />
        </div>

        <div className="relative z-10 max-w-[1100px] mx-auto px-5 md:px-8 pt-8 md:pt-12 pb-10 md:pb-14">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
              {/* Avatar */}
              <motion.div
                className="shrink-0"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className="relative"
                  style={{ width: 100, height: 100 }}
                >
                  {/* Glow ring */}
                  <div
                    className="absolute inset-[-4px] rounded-full"
                    style={{
                      background: 'conic-gradient(from 0deg, #b5824e, #c49a62, #b5824e)',
                      opacity: 0.5,
                      filter: 'blur(4px)',
                    }}
                  />
                  <div
                    className="relative w-full h-full rounded-full overflow-hidden"
                    style={{
                      border: '3px solid rgba(181,130,78,0.6)',
                      background: 'rgba(181,130,78,0.1)',
                    }}
                  >
                    {avatarSrc ? (
                      <img src={avatarSrc} alt="" className="w-full h-full object-cover" draggable={false} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#f5f0ea" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Greeting + info */}
              <div className="flex-1 min-w-0">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h1
                    className="font-bold"
                    style={{
                      fontSize: 'clamp(28px, 4vw, 42px)',
                      color: '#f5f0ea',
                      lineHeight: 1.15,
                      fontFamily: "'Outfit', sans-serif",
                      letterSpacing: '-0.02em',
                    }}
                  >
                    Bissmillaay, <span style={{ color: '#b5824e' }}>{prenom || 'Pullo'}</span>
                  </h1>

                  {/* Badges row */}
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    {yettore && (
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          background: 'linear-gradient(135deg, rgba(181,130,78,0.15), rgba(181,130,78,0.08))',
                          color: '#c49a62',
                          border: '1px solid rgba(181,130,78,0.25)',
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#b5824e" opacity="0.7">
                          <path d="M12 2L15 8.5L22 9.3L17 14L18.2 21L12 17.5L5.8 21L7 14L2 9.3L9 8.5Z" />
                        </svg>
                        {yettore}
                      </span>
                    )}
                    {paysRacine && (
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          background: 'rgba(245,240,234,0.05)',
                          color: 'rgba(245,240,234,0.6)',
                          border: '1px solid rgba(245,240,234,0.08)',
                        }}
                      >
                        {paysRacine}
                      </span>
                    )}
                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        background: 'linear-gradient(135deg, rgba(181,130,78,0.2), rgba(196,154,98,0.1))',
                        color: '#b5824e',
                        border: '1px solid rgba(181,130,78,0.3)',
                      }}
                    >
                      Pullo confirme
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Score card */}
              <motion.div
                className="shrink-0"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className="px-6 py-4 rounded-2xl text-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(181,130,78,0.12), rgba(181,130,78,0.04))',
                    border: '1px solid rgba(181,130,78,0.2)',
                    minWidth: 110,
                  }}
                >
                  <div className="font-extrabold" style={{ fontSize: 32, color: '#b5824e', lineHeight: 1, fontFamily: "'Outfit', sans-serif" }}>
                    {scoreDisplay}
                  </div>
                  <div className="text-[10px] font-semibold mt-1 uppercase tracking-wider" style={{ color: 'rgba(245,240,234,0.4)' }}>
                    Score Quiz
                  </div>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Stats bar */}
          <ScrollReveal delay={0.12}>
            <div
              className="flex items-center justify-around mt-8 py-5 rounded-2xl"
              style={{
                background: 'rgba(12,11,9,0.6)',
                border: '1px solid rgba(245,240,234,0.06)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <StatCounter value="45M+" label="Peuls" />
              <div className="w-px h-8" style={{ background: 'rgba(245,240,234,0.08)' }} />
              <StatCounter value="1,247" label="Inscrits" />
              <div className="w-px h-8" style={{ background: 'rgba(245,240,234,0.08)' }} />
              <StatCounter value="15+" label="Pays" />
              <div className="w-px h-8 hidden sm:block" style={{ background: 'rgba(245,240,234,0.08)' }} />
              <div className="hidden sm:block">
                <StatCounter value="8" label="Rubriques" />
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16"
          style={{ background: 'linear-gradient(to top, #050505, transparent)' }}
        />
      </section>

      {/* ═══ QUICK ACTIONS ═══ */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-8 -mt-2">
        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-3 gap-3">
            {[
              { to: '/academy', icon: ic.book, label: 'Reprendre ma lecon', sub: 'Lecon 3 - Salutations' },
              { to: '/quiz', icon: ic.quiz, label: 'Quiz du jour', sub: '100 questions' },
              { to: '/music', icon: ic.radio, label: 'Ecouter', sub: '10 titres Pulaar' },
            ].map((item, i) => (
              <Link
                key={i}
                to={item.to}
                className="group flex flex-col items-center gap-3 p-4 md:p-5 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'rgba(12,11,9,0.8)',
                  border: '1px solid rgba(245,240,234,0.06)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 overflow-hidden"
                  style={{ background: 'rgba(181,130,78,0.1)' }}
                >
                  <img src={item.icon} alt="" className="w-7 h-7 object-contain" />
                </div>
                <div className="text-center">
                  <div className="text-xs md:text-sm font-semibold" style={{ color: '#f5f0ea' }}>
                    {item.label}
                  </div>
                  <div className="text-[10px] md:text-[11px] mt-0.5" style={{ color: 'rgba(245,240,234,0.4)' }}>
                    {item.sub}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ═══ ACADEMY PROGRESS ═══ */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-8 mt-6">
        <ScrollReveal delay={0.08}>
          <Link
            to="/academy"
            className="block relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, rgba(181,130,78,0.1), rgba(181,130,78,0.03))',
              borderRadius: 20,
              border: '1px solid rgba(181,130,78,0.12)',
              padding: '20px 24px',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden"
                    style={{ background: 'rgba(181,130,78,0.12)' }}
                  >
                    <img src={ic.book} alt="" className="w-5 h-5 object-contain" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: '#b5824e' }}>
                    Academy
                  </span>
                </div>
                <h3 className="font-semibold" style={{ fontSize: 16, color: '#f5f0ea' }}>
                  Lecon 3 &middot; Les salutations
                </h3>
                <div className="mt-3 w-full max-w-[260px]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-medium" style={{ color: 'rgba(245,240,234,0.4)' }}>Progression</span>
                    <span className="text-[11px] font-bold" style={{ color: '#b5824e' }}>25%</span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(245,240,234,0.06)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, #b5824e, #c49a62)' }}
                      initial={{ width: 0 }}
                      animate={{ width: '25%' }}
                      transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              </div>
              <div
                className="shrink-0 ml-4 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 group-hover:scale-105 flex items-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #b5824e, #9a6d3c)',
                  color: '#050505',
                  boxShadow: '0 4px 16px rgba(181,130,78,0.25)',
                }}
              >
                Continuer
                <ArrowRight />
              </div>
            </div>
          </Link>
        </ScrollReveal>
      </section>

      {/* ═══ EXPLORE SECTION ═══ */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-8 mt-12">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="amber-line" />
              <h2 style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 700, color: '#f5f0ea', lineHeight: 1.2, fontFamily: "'Outfit', sans-serif" }}>
                Explore PULAAR+
              </h2>
              <p className="mt-2" style={{ fontSize: 14, color: 'rgba(245,240,234,0.5)', maxWidth: 400 }}>
                Sept rubriques pour decouvrir, apprendre et celebrer la culture Peule.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Main Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">

          {/* ─ Quiz ─ Wide card */}
          <ScrollReveal delay={0} className="col-span-2">
            <Link
              to="/quiz"
              className="group block relative overflow-hidden h-full"
              style={{
                minHeight: 200,
                borderRadius: 22,
                background: 'linear-gradient(135deg, rgba(181,130,78,0.14), rgba(12,11,9,0.95))',
                border: '1px solid rgba(181,130,78,0.15)',
              }}
            >
              <FulaniPattern opacity={0.03} />
              {/* Large decorative icon */}
              <div className="absolute -bottom-4 -right-4 opacity-[0.06] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <img src={ic.quiz} alt="" className="w-[180px] h-[180px] object-contain" draggable={false} />
              </div>
              {/* Glow */}
              <div
                className="absolute top-0 left-0 w-[250px] h-[200px]"
                style={{ background: 'radial-gradient(ellipse, rgba(181,130,78,0.1), transparent 70%)' }}
              />
              <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8">
                <div>
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(181,130,78,0.25)] overflow-hidden"
                    style={{ background: 'rgba(181,130,78,0.15)', border: '1px solid rgba(181,130,78,0.15)' }}
                  >
                    <img src={ic.quiz} alt="" className="w-8 h-8 object-contain" />
                  </div>
                  <h3
                    className="font-bold transition-colors duration-300 group-hover:text-[#b5824e]"
                    style={{ fontSize: 24, color: '#f5f0ea', lineHeight: 1.2 }}
                  >
                    Quiz
                  </h3>
                  <p className="mt-2 max-w-sm" style={{ fontSize: 14, color: 'rgba(245,240,234,0.55)', lineHeight: 1.5 }}>
                    Teste tes connaissances sur la culture Peule, l'histoire et la langue
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ background: 'rgba(181,130,78,0.12)', color: '#c49a62' }}
                  >
                    100 questions
                  </span>
                  <span
                    className="flex items-center gap-1.5 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
                    style={{ color: '#b5824e' }}
                  >
                    Jouer <ArrowRight />
                  </span>
                </div>
              </div>
            </Link>
          </ScrollReveal>

          {/* ─ Academy ─ */}
          <ScrollReveal delay={0.06}>
            <Link
              to="/academy"
              className="group block relative overflow-hidden h-full"
              style={{
                minHeight: 200,
                borderRadius: 22,
                background: 'linear-gradient(160deg, rgba(59,130,246,0.06), #0c0b09)',
                border: '1px solid rgba(245,240,234,0.06)',
              }}
            >
              <div className="p-5 md:p-6 h-full flex flex-col">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 overflow-hidden"
                  style={{ background: 'rgba(181,130,78,0.1)' }}
                >
                  <img src={ic.book} alt="" className="w-7 h-7 object-contain" />
                </div>
                <h3
                  className="font-bold transition-colors duration-300 group-hover:text-[#b5824e]"
                  style={{ fontSize: 18, color: '#f5f0ea' }}
                >
                  Academy
                </h3>
                <p className="mt-1.5 flex-1" style={{ fontSize: 13, color: 'rgba(245,240,234,0.45)', lineHeight: 1.5 }}>
                  Apprends le Pulaar pas a pas
                </p>
                <span
                  className="mt-3 px-3 py-1 rounded-full text-[11px] font-medium self-start"
                  style={{ background: 'rgba(245,240,234,0.04)', color: 'rgba(245,240,234,0.5)' }}
                >
                  13 lecons
                </span>
              </div>
            </Link>
          </ScrollReveal>

          {/* ─ Music ─ */}
          <ScrollReveal delay={0.1}>
            <Link
              to="/music"
              className="group block relative overflow-hidden h-full"
              style={{
                minHeight: 180,
                borderRadius: 22,
                background: 'linear-gradient(160deg, rgba(181,130,78,0.08), #0c0b09)',
                border: '1px solid rgba(245,240,234,0.06)',
              }}
            >
              <div className="p-5 md:p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 overflow-hidden"
                    style={{ background: 'rgba(181,130,78,0.1)' }}
                  >
                    <img src={ic.radio} alt="" className="w-7 h-7 object-contain" />
                  </div>
                  <EqBars />
                </div>
                <h3
                  className="font-bold transition-colors duration-300 group-hover:text-[#b5824e]"
                  style={{ fontSize: 18, color: '#f5f0ea' }}
                >
                  Music
                </h3>
                <p className="mt-1.5 flex-1" style={{ fontSize: 13, color: 'rgba(245,240,234,0.45)', lineHeight: 1.5 }}>
                  Playlist 100% Pulaar
                </p>
                <span
                  className="mt-3 px-3 py-1 rounded-full text-[11px] font-medium self-start"
                  style={{ background: 'rgba(245,240,234,0.04)', color: 'rgba(245,240,234,0.5)' }}
                >
                  10 titres
                </span>
              </div>
            </Link>
          </ScrollReveal>

          {/* ─ Kitchen ─ Food photo card */}
          <ScrollReveal delay={0.14} className="col-span-2 lg:col-span-1">
            <Link
              to="/kitchen"
              className="group block relative overflow-hidden h-full"
              style={{
                minHeight: 200,
                borderRadius: 22,
              }}
            >
              {/* Food photo bg */}
              {kitchenPhoto && (
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${kitchenPhoto})` }}
                />
              )}
              <div
                className="absolute inset-0"
                style={{
                  background: kitchenPhoto
                    ? 'linear-gradient(180deg, rgba(5,5,5,0.2) 0%, rgba(5,5,5,0.65) 50%, rgba(5,5,5,0.92) 100%)'
                    : 'linear-gradient(135deg, rgba(181,130,78,0.12), #0c0b09)',
                }}
              />
              <div className="relative z-10 h-full flex flex-col justify-end p-5 md:p-6">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110 overflow-hidden"
                  style={{ background: 'rgba(181,130,78,0.15)', border: '1px solid rgba(181,130,78,0.15)' }}
                >
                  <img src={ic.pot} alt="" className="w-7 h-7 object-contain" />
                </div>
                <h3
                  className="font-bold transition-colors duration-300 group-hover:text-[#b5824e]"
                  style={{ fontSize: 20, color: '#f5f0ea' }}
                >
                  Pulaar Kitchen
                </h3>
                <p className="mt-1" style={{ fontSize: 13, color: 'rgba(245,240,234,0.55)' }}>
                  Recettes & cuisine traditionnelle
                </p>
                <span
                  className="mt-3 px-3 py-1 rounded-full text-[11px] font-medium self-start"
                  style={{ background: 'rgba(181,130,78,0.12)', color: '#c49a62' }}
                >
                  8 recettes
                </span>
              </div>
            </Link>
          </ScrollReveal>

          {/* ─ Yettore ─ */}
          <ScrollReveal delay={0.18}>
            <Link
              to="/yettore"
              className="group block relative overflow-hidden h-full"
              style={{
                minHeight: 180,
                borderRadius: 22,
                background: 'linear-gradient(160deg, rgba(212,162,78,0.06), #0c0b09)',
                border: '1px solid rgba(245,240,234,0.06)',
              }}
            >
              <div className="p-5 md:p-6 h-full flex flex-col">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 overflow-hidden"
                  style={{ background: 'rgba(181,130,78,0.1)' }}
                >
                  <img src={ic.zebu} alt="" className="w-7 h-7 object-contain" />
                </div>
                <h3
                  className="font-bold transition-colors duration-300 group-hover:text-[#b5824e]"
                  style={{ fontSize: 18, color: '#f5f0ea' }}
                >
                  Yettore
                </h3>
                <p className="mt-1.5 flex-1" style={{ fontSize: 13, color: 'rgba(245,240,234,0.45)', lineHeight: 1.5 }}>
                  Ton patronyme & ta lignee
                </p>
                <span
                  className="mt-3 px-3 py-1 rounded-full text-[11px] font-medium self-start"
                  style={{ background: 'rgba(245,240,234,0.04)', color: 'rgba(245,240,234,0.5)' }}
                >
                  10 familles
                </span>
              </div>
            </Link>
          </ScrollReveal>

          {/* ─ Peul & Fier ─ */}
          <ScrollReveal delay={0.22}>
            <Link
              to="/peul-fier"
              className="group block relative overflow-hidden h-full"
              style={{
                minHeight: 180,
                borderRadius: 22,
                background: 'linear-gradient(160deg, rgba(244,63,94,0.04), #0c0b09)',
                border: '1px solid rgba(245,240,234,0.06)',
              }}
            >
              <div className="p-5 md:p-6 h-full flex flex-col">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 overflow-hidden"
                  style={{ background: 'rgba(181,130,78,0.1)' }}
                >
                  <img src={ic.stars} alt="" className="w-7 h-7 object-contain" />
                </div>
                <h3
                  className="font-bold transition-colors duration-300 group-hover:text-[#b5824e]"
                  style={{ fontSize: 18, color: '#f5f0ea' }}
                >
                  Peul & Fier
                </h3>
                <p className="mt-1.5 flex-1" style={{ fontSize: 13, color: 'rgba(245,240,234,0.45)', lineHeight: 1.5 }}>
                  Grandes personnalites Peules
                </p>
                <span
                  className="mt-3 px-3 py-1 rounded-full text-[11px] font-medium self-start"
                  style={{ background: 'rgba(245,240,234,0.04)', color: 'rgba(245,240,234,0.5)' }}
                >
                  6 figures
                </span>
              </div>
            </Link>
          </ScrollReveal>

          {/* ─ PeulNation ─ Wide card */}
          <ScrollReveal delay={0.26} className="col-span-2 lg:col-span-3">
            <Link
              to="/peulnation"
              className="group block relative overflow-hidden"
              style={{
                minHeight: 160,
                borderRadius: 22,
                background: 'linear-gradient(135deg, rgba(34,211,238,0.04), rgba(181,130,78,0.06), #0c0b09)',
                border: '1px solid rgba(245,240,234,0.06)',
              }}
            >
              {/* Large decorative globe */}
              <div className="absolute -bottom-6 right-8 md:right-16 opacity-[0.05] transition-transform duration-500 group-hover:scale-110">
                <img src={ic.globe} alt="" className="w-[160px] h-[160px] md:w-[200px] md:h-[200px] object-contain" draggable={false} />
              </div>
              <div className="relative z-10 flex items-center gap-6 p-6 md:p-8 h-full">
                <div
                  className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 overflow-hidden"
                  style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.1)' }}
                >
                  <img src={ic.globe} alt="" className="w-8 h-8 object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className="font-bold transition-colors duration-300 group-hover:text-[#b5824e]"
                    style={{ fontSize: 22, color: '#f5f0ea' }}
                  >
                    PeulNation
                  </h3>
                  <p className="mt-1" style={{ fontSize: 14, color: 'rgba(245,240,234,0.5)' }}>
                    La presence Peule dans le monde &middot; 15+ pays
                  </p>
                </div>
                <span
                  className="hidden md:flex items-center gap-1.5 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
                  style={{ color: '#b5824e' }}
                >
                  Decouvrir <ArrowRight />
                </span>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ CULTURE DU JOUR ═══ */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-8 mt-12">
        <ScrollReveal delay={0.1}>
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: 22,
              border: '1px solid rgba(181,130,78,0.1)',
              padding: '28px 28px',
              background: 'linear-gradient(135deg, rgba(181,130,78,0.06), rgba(12,11,9,0.95))',
            }}
          >
            <div
              className="absolute top-0 left-6 right-6 h-[1px]"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(181,130,78,0.3), transparent)' }}
            />
            <span
              className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] mb-3"
              style={{
                background: 'rgba(181,130,78,0.12)',
                color: '#b5824e',
                border: '1px solid rgba(181,130,78,0.2)',
              }}
            >
              Culture du jour
            </span>
            <p style={{ fontSize: 15, color: 'rgba(245,240,234,0.7)', lineHeight: 1.8 }}>
              Le Fouta-Toro, berceau du peuple Peul, s'etend le long du fleuve Senegal.
              Centre historique de la civilisation Peule, il a vu naitre des royaumes
              puissants et reste aujourd'hui un haut lieu de la culture et des traditions Haalpulaar.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══ MUSIC BANNER ═══ */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-8 mt-6">
        <ScrollReveal delay={0.1}>
          <Link
            to="/music"
            className="block relative overflow-hidden group"
            style={{
              borderRadius: 22,
              height: 180,
              background: 'linear-gradient(135deg, rgba(181,130,78,0.15), rgba(196,154,98,0.06), rgba(181,130,78,0.08))',
              border: '1px solid rgba(181,130,78,0.12)',
            }}
          >
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[250px]"
              style={{ background: 'radial-gradient(ellipse, rgba(181,130,78,0.12), transparent 70%)' }}
            />
            <div className="absolute inset-0 opacity-20">
              <FulaniPattern opacity={0.04} />
            </div>

            <div className="relative z-10 h-full flex items-center justify-between p-6 md:p-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden"
                    style={{ background: 'rgba(181,130,78,0.15)' }}
                  >
                    <img src={ic.radio} alt="" className="w-6 h-6 object-contain" />
                  </div>
                  <EqBars />
                </div>
                <h3
                  className="font-bold"
                  style={{ fontSize: 24, color: '#f5f0ea', lineHeight: 1.2 }}
                >
                  Pulaar Music
                </h3>
                <p className="mt-1" style={{ fontSize: 14, color: 'rgba(245,240,234,0.5)' }}>
                  Ta playlist 100% pulaar
                </p>
              </div>

              {/* Animated play button */}
              <div className="relative shrink-0">
                <motion.div
                  className="absolute rounded-full"
                  style={{ background: 'rgba(181,130,78,0.15)', inset: -12 }}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute rounded-full"
                  style={{ background: 'rgba(181,130,78,0.1)', inset: -12 }}
                  animate={{ scale: [1, 1.6, 1], opacity: [0.2, 0, 0.2] }}
                  transition={{ duration: 2, delay: 0.3, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div
                  className="relative w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, #b5824e, #c49a62)',
                    boxShadow: '0 6px 24px rgba(181,130,78,0.35)',
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#050505">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </ScrollReveal>
      </section>

    </div>
  )
}
