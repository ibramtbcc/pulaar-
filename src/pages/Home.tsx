import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ScrollReveal from '../components/shared/ScrollReveal'
import { useUserStore } from '../stores/userStore'
import { IconBook, IconQuestion, IconPlay, IconShare, IconUser } from '../components/shared/Icons'
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

/* ─── Fulani geometric SVG pattern (inline) ─── */
function FulaniPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" opacity="0.035">
      <defs>
        <pattern id="fulani" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M30 0L60 30L30 60L0 30Z" fill="none" stroke="#b5824e" strokeWidth="0.5" />
          <path d="M30 10L50 30L30 50L10 30Z" fill="none" stroke="#b5824e" strokeWidth="0.3" />
          <path d="M30 20L40 30L30 40L20 30Z" fill="none" stroke="#c49a62" strokeWidth="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#fulani)" />
    </svg>
  )
}

/* ─── Equalizer bars animation for Music card ─── */
function EqBars() {
  return (
    <div className="flex items-end gap-[3px] h-5 opacity-40">
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

/* ─── Inline SVG icons for hero card action buttons ─── */
const ReplayIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f5f0ea" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 4v6h6" /><path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
  </svg>
)
const InviteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f5f0ea" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" />
  </svg>
)

/* ─── Main Component ─── */
export default function Home() {
  const { prenom, nom, avatarId, paysRacine, score } = useUserStore()

  const yettore = useMemo(() => getYettore(nom), [nom])

  // Get avatar base64 image
  const avatarSrc = useMemo(() => {
    if (!avatarId) return null
    const entry = avatars[avatarId]
    return entry?.b64 || null
  }, [avatarId])

  // Get first available food photo for kitchen banner
  const kitchenPhoto = useMemo(() => {
    const keys = Object.keys(photos)
    // Try "thieb" first, then any available key
    if (photos['thieb']) return photos['thieb']
    if (photos['thieboudienne']) return photos['thieboudienne']
    return keys.length > 0 ? photos[keys[0]] : null
  }, [])

  // Compute score display
  const scoreDisplay = score > 0 ? `${Math.min(score, 100)}%` : '0%'

  return (
    <div className="min-h-screen pb-28">

      {/* ═══ SECTION 1 — USER HERO CARD ═══ */}
      <section className="px-4 md:px-8 pt-4">
        <div className="content-max">
          <ScrollReveal>
            <div
              className="relative overflow-hidden"
              style={{
                background: '#0c0b09',
                borderRadius: 24,
                border: '1px solid rgba(181,130,78,0.12)',
              }}
            >
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-50">
                <FulaniPattern />
              </div>
              {/* Top glow */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[280px] h-[120px]"
                style={{ background: 'radial-gradient(ellipse, rgba(181,130,78,0.1), transparent 70%)' }}
              />

              <div className="relative z-10 p-6 md:p-8">
                {/* Avatar + User Info */}
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div
                    className="shrink-0 rounded-full overflow-hidden"
                    style={{
                      width: 64, height: 64,
                      border: '2px solid rgba(181,130,78,0.4)',
                      background: 'rgba(181,130,78,0.08)',
                    }}
                  >
                    {avatarSrc ? (
                      <img src={avatarSrc} alt="" className="w-full h-full object-cover" draggable={false} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <IconUser size={28} />
                      </div>
                    )}
                  </div>

                  {/* Name + Badges */}
                  <div className="flex-1 min-w-0">
                    <h2
                      className="font-semibold truncate"
                      style={{ fontSize: 20, color: '#f5f0ea', lineHeight: 1.2 }}
                    >
                      {prenom || 'Pullo'} {nom || ''}
                    </h2>

                    {/* Yettore + Country badges */}
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      {yettore && (
                        <span
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium"
                          style={{
                            background: 'rgba(181,130,78,0.12)',
                            color: '#c49a62',
                            border: '1px solid rgba(181,130,78,0.2)',
                          }}
                        >
                          {yettore}
                        </span>
                      )}
                      {paysRacine && (
                        <span
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium"
                          style={{
                            background: 'rgba(245,240,234,0.05)',
                            color: 'rgba(245,240,234,0.6)',
                          }}
                        >
                          {paysRacine}
                        </span>
                      )}
                    </div>

                    {/* Status badge */}
                    <div className="mt-2">
                      <span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider"
                        style={{
                          background: 'linear-gradient(135deg, rgba(181,130,78,0.2), rgba(196,154,98,0.12))',
                          color: '#b5824e',
                          border: '1px solid rgba(181,130,78,0.25)',
                        }}
                      >
                        Pullo confirme
                      </span>
                    </div>
                  </div>

                  {/* Score badge (top right) */}
                  <div
                    className="shrink-0 text-center px-3 py-2 rounded-2xl"
                    style={{
                      background: 'rgba(181,130,78,0.1)',
                      border: '1px solid rgba(181,130,78,0.15)',
                    }}
                  >
                    <div className="font-bold" style={{ fontSize: 18, color: '#b5824e', lineHeight: 1 }}>
                      {scoreDisplay}
                    </div>
                    <div className="text-[10px] font-medium mt-0.5 uppercase tracking-wider" style={{ color: 'rgba(245,240,234,0.4)' }}>
                      Quiz
                    </div>
                  </div>
                </div>

                {/* Action buttons row */}
                <div className="flex items-center gap-2 mt-5">
                  {[
                    { to: '/quiz', icon: <ReplayIcon />, label: 'Rejouer' },
                    { to: '#', icon: <IconShare size={18} />, label: 'Partager' },
                    { to: '#', icon: <InviteIcon />, label: 'Inviter' },
                    { to: '#', icon: <IconUser size={18} />, label: 'Profil' },
                  ].map((btn) => (
                    <Link
                      key={btn.label}
                      to={btn.to}
                      className="flex-1 flex flex-col items-center gap-1.5 py-2.5 rounded-2xl transition-colors duration-200 hover:bg-[rgba(181,130,78,0.08)]"
                      style={{
                        background: 'rgba(245,240,234,0.03)',
                        border: '1px solid rgba(245,240,234,0.06)',
                      }}
                    >
                      {btn.icon}
                      <span className="text-[10px] font-medium" style={{ color: 'rgba(245,240,234,0.5)' }}>
                        {btn.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ SECTION 2 — ACADEMY PROGRESS MODULE ═══ */}
      <section className="px-4 md:px-8 mt-5">
        <div className="content-max">
          <ScrollReveal delay={0.08}>
            <Link
              to="/academy"
              className="block relative overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, rgba(181,130,78,0.08), rgba(181,130,78,0.03))',
                borderRadius: 20,
                border: '1px solid rgba(181,130,78,0.1)',
                padding: '20px 24px',
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center overflow-hidden"
                      style={{ background: 'rgba(181,130,78,0.12)' }}
                    >
                      <img src={ic.book} alt="" className="w-5 h-5 object-contain" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#b5824e' }}>
                      Academy
                    </span>
                  </div>
                  <h3 className="font-semibold" style={{ fontSize: 15, color: '#f5f0ea' }}>
                    Lecon 3 &middot; Les salutations
                  </h3>
                  {/* Progress bar */}
                  <div className="mt-3 w-full max-w-[240px]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-medium" style={{ color: 'rgba(245,240,234,0.4)' }}>
                        Progression
                      </span>
                      <span className="text-[10px] font-semibold" style={{ color: '#b5824e' }}>
                        25%
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(245,240,234,0.06)' }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: 'linear-gradient(90deg, #b5824e, #c49a62)', width: '25%' }}
                        initial={{ width: 0 }}
                        animate={{ width: '25%' }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="shrink-0 ml-4 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 group-hover:scale-105"
                  style={{
                    background: '#b5824e',
                    color: '#050505',
                  }}
                >
                  Continuer
                </div>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ QUICK ACCESS PILLS ═══ */}
      <section className="mt-5">
        <div className="content-max px-4 md:px-8">
          <ScrollReveal delay={0.1}>
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar" style={{ scrollbarWidth: 'none' }}>
              <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
              <Link
                to="/academy"
                className="flex items-center gap-2.5 px-5 py-3 rounded-full whitespace-nowrap transition-colors duration-200 hover:bg-[rgba(181,130,78,0.12)]"
                style={{
                  border: '1px solid rgba(181,130,78,0.25)',
                  color: '#f5f0ea',
                  background: 'rgba(181,130,78,0.05)',
                }}
              >
                <IconBook size={16} />
                <span className="text-sm font-medium">Reprendre ma lecon</span>
              </Link>
              <Link
                to="/quiz"
                className="flex items-center gap-2.5 px-5 py-3 rounded-full whitespace-nowrap transition-colors duration-200 hover:bg-[rgba(181,130,78,0.12)]"
                style={{
                  border: '1px solid rgba(181,130,78,0.25)',
                  color: '#f5f0ea',
                  background: 'rgba(181,130,78,0.05)',
                }}
              >
                <IconQuestion size={16} />
                <span className="text-sm font-medium">Quiz du jour</span>
              </Link>
              <Link
                to="/music"
                className="flex items-center gap-2.5 px-5 py-3 rounded-full whitespace-nowrap transition-colors duration-200 hover:bg-[rgba(181,130,78,0.12)]"
                style={{
                  border: '1px solid rgba(181,130,78,0.25)',
                  color: '#f5f0ea',
                  background: 'rgba(181,130,78,0.05)',
                }}
              >
                <IconPlay size={16} />
                <span className="text-sm font-medium">Ecouter</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ SECTION 3 — BENTO GRID (7 rubriques) ═══ */}
      <section className="px-4 md:px-8 mt-8">
        <div className="content-max">
          <ScrollReveal>
            <div className="amber-line" />
            <h2 className="text-h2 mb-2">Explore PULAAR+</h2>
            <p className="text-body mb-8 max-w-lg">
              Sept rubriques pour decouvrir, apprendre et celebrer la culture Peule.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">

            {/* Quiz — 2 cols, tall */}
            <ScrollReveal delay={0} className="col-span-2 md:col-span-2">
              <Link
                to="/quiz"
                className="surface-card card-hover block p-6 md:p-8 group relative overflow-hidden h-full"
                style={{
                  minHeight: 180,
                  borderRadius: 20,
                  background: 'linear-gradient(135deg, rgba(181,130,78,0.1), rgba(181,130,78,0.02))',
                }}
              >
                <div className="absolute top-3 right-3 opacity-[0.06]">
                  <img src={ic.quiz} alt="" className="w-[100px] h-[100px] object-contain" draggable={false} />
                </div>
                <div className="relative z-10">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 overflow-hidden"
                    style={{ background: 'rgba(181,130,78,0.15)' }}
                  >
                    <img src={ic.quiz} alt="" className="w-7 h-7 object-contain" />
                  </div>
                  <h3 className="text-h3 group-hover:text-[#b5824e] transition-colors duration-300" style={{ fontSize: 20 }}>
                    Quiz
                  </h3>
                  <p className="text-small mt-1.5 max-w-sm">Teste tes connaissances sur la culture Peule</p>
                  <span
                    className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium"
                    style={{ background: 'rgba(245,240,234,0.04)', color: 'rgba(245,240,234,0.5)' }}
                  >
                    100 questions
                  </span>
                </div>
              </Link>
            </ScrollReveal>

            {/* Academy — 1 col */}
            <ScrollReveal delay={0.06}>
              <Link
                to="/academy"
                className="surface-card card-hover block p-5 md:p-6 group h-full"
                style={{ minHeight: 180, borderRadius: 20 }}
              >
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 overflow-hidden"
                  style={{ background: 'rgba(181,130,78,0.08)' }}
                >
                  <img src={ic.book} alt="" className="w-7 h-7 object-contain" />
                </div>
                <h3 className="text-h3 group-hover:text-[#b5824e] transition-colors duration-300">Academy</h3>
                <p className="text-small mt-1">Apprends le Pulaar pas a pas</p>
                <span
                  className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: 'rgba(245,240,234,0.04)', color: 'rgba(245,240,234,0.5)' }}
                >
                  13 lecons
                </span>
              </Link>
            </ScrollReveal>

            {/* Music — 1 col */}
            <ScrollReveal delay={0.1}>
              <Link
                to="/music"
                className="surface-card card-hover block p-5 md:p-6 group relative overflow-hidden h-full"
                style={{
                  minHeight: 160,
                  borderRadius: 20,
                  background: 'linear-gradient(160deg, #0c0b09, #080706)',
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 overflow-hidden"
                    style={{ background: 'rgba(181,130,78,0.08)' }}
                  >
                    <img src={ic.radio} alt="" className="w-7 h-7 object-contain" />
                  </div>
                  <EqBars />
                </div>
                <h3 className="text-h3 group-hover:text-[#b5824e] transition-colors duration-300">Music</h3>
                <p className="text-small mt-1">Playlist 100% Pulaar</p>
                <span
                  className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: 'rgba(245,240,234,0.04)', color: 'rgba(245,240,234,0.5)' }}
                >
                  10 titres
                </span>
              </Link>
            </ScrollReveal>

            {/* Kitchen — 1 col */}
            <ScrollReveal delay={0.14}>
              <Link
                to="/kitchen"
                className="surface-card card-hover block p-5 md:p-6 group h-full"
                style={{
                  minHeight: 160,
                  borderRadius: 20,
                  background: 'linear-gradient(160deg, rgba(181,130,78,0.06), transparent)',
                }}
              >
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 overflow-hidden"
                  style={{ background: 'rgba(245,158,11,0.08)' }}
                >
                  <img src={ic.pot} alt="" className="w-7 h-7 object-contain" />
                </div>
                <h3 className="text-h3 group-hover:text-[#b5824e] transition-colors duration-300">Kitchen</h3>
                <p className="text-small mt-1">Recettes traditionnelles</p>
                <span
                  className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: 'rgba(245,240,234,0.04)', color: 'rgba(245,240,234,0.5)' }}
                >
                  8 recettes
                </span>
              </Link>
            </ScrollReveal>

            {/* Yettore — 1 col */}
            <ScrollReveal delay={0.18}>
              <Link
                to="/yettore"
                className="surface-card card-hover block p-5 md:p-6 group h-full"
                style={{ minHeight: 160, borderRadius: 20 }}
              >
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 overflow-hidden"
                  style={{ background: 'rgba(59,130,246,0.08)' }}
                >
                  <img src={ic.zebu} alt="" className="w-7 h-7 object-contain" />
                </div>
                <h3 className="text-h3 group-hover:text-[#b5824e] transition-colors duration-300">Yettore</h3>
                <p className="text-small mt-1">Ton patronyme & ta lignee</p>
                <span
                  className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: 'rgba(245,240,234,0.04)', color: 'rgba(245,240,234,0.5)' }}
                >
                  10 familles
                </span>
              </Link>
            </ScrollReveal>

            {/* Peul & Fier — 1 col */}
            <ScrollReveal delay={0.22}>
              <Link
                to="/peul-fier"
                className="surface-card card-hover block p-5 md:p-6 group h-full"
                style={{ minHeight: 160, borderRadius: 20 }}
              >
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 overflow-hidden"
                  style={{ background: 'rgba(244,63,94,0.08)' }}
                >
                  <img src={ic.stars} alt="" className="w-7 h-7 object-contain" />
                </div>
                <h3 className="text-h3 group-hover:text-[#b5824e] transition-colors duration-300">Peul & Fier</h3>
                <p className="text-small mt-1">Grandes personnalites</p>
                <span
                  className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: 'rgba(245,240,234,0.04)', color: 'rgba(245,240,234,0.5)' }}
                >
                  6 figures
                </span>
              </Link>
            </ScrollReveal>

            {/* PeulNation — 2 cols */}
            <ScrollReveal delay={0.26} className="col-span-2">
              <Link
                to="/peulnation"
                className="surface-card card-hover block p-6 md:p-8 group relative overflow-hidden h-full"
                style={{ minHeight: 160, borderRadius: 20 }}
              >
                <div className="absolute bottom-2 right-4 opacity-[0.06]">
                  <img src={ic.globe} alt="" className="w-[120px] h-[120px] object-contain" draggable={false} />
                </div>
                <div className="relative z-10">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 overflow-hidden"
                    style={{ background: 'rgba(34,211,238,0.08)' }}
                  >
                    <img src={ic.globe} alt="" className="w-7 h-7 object-contain" />
                  </div>
                  <h3 className="text-h3 group-hover:text-[#b5824e] transition-colors duration-300" style={{ fontSize: 20 }}>
                    PeulNation
                  </h3>
                  <p className="text-body mt-1.5 max-w-md">La presence Peule dans le monde</p>
                  <span
                    className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium"
                    style={{ background: 'rgba(245,240,234,0.04)', color: 'rgba(245,240,234,0.5)' }}
                  >
                    15+ pays
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4 — CULTURE DU JOUR ═══ */}
      <section className="px-4 md:px-8 mt-8">
        <div className="content-max">
          <ScrollReveal delay={0.1}>
            <div
              className="relative overflow-hidden"
              style={{
                background: '#0c0b09',
                borderRadius: 20,
                border: '1px solid rgba(181,130,78,0.1)',
                padding: '24px',
              }}
            >
              {/* Amber accent line */}
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
              <p
                className="leading-relaxed"
                style={{ fontSize: 14, color: 'rgba(245,240,234,0.7)', lineHeight: 1.7 }}
              >
                Le Fouta-Toro, berceau du peuple Peul, s'etend le long du fleuve Senegal.
                Centre historique de la civilisation Peule, il a vu naitre des royaumes
                puissants et reste aujourd'hui un haut lieu de la culture et des traditions Haalpulaar.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ SECTION 5 — KITCHEN BANNER ═══ */}
      <section className="px-4 md:px-8 mt-5">
        <div className="content-max">
          <ScrollReveal delay={0.1}>
            <Link
              to="/kitchen"
              className="block relative overflow-hidden group"
              style={{ borderRadius: 20, height: 200 }}
            >
              {/* Food photo background */}
              {kitchenPhoto && (
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${kitchenPhoto})` }}
                />
              )}
              {/* Dark gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: kitchenPhoto
                    ? 'linear-gradient(180deg, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.5) 40%, rgba(5,5,5,0.88) 100%)'
                    : 'linear-gradient(135deg, rgba(181,130,78,0.12), rgba(5,5,5,0.95))',
                }}
              />
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center overflow-hidden"
                    style={{ background: 'rgba(181,130,78,0.2)' }}
                  >
                    <img src={ic.pot} alt="" className="w-5 h-5 object-contain" />
                  </div>
                </div>
                <h3
                  className="font-bold"
                  style={{ fontSize: 22, color: '#f5f0ea', lineHeight: 1.2 }}
                >
                  Pulaar Kitchen
                </h3>
                <p
                  className="mt-1"
                  style={{ fontSize: 13, color: 'rgba(245,240,234,0.6)' }}
                >
                  Recettes & cuisine 100% peul
                </p>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ SECTION 6 — MUSIC BANNER ═══ */}
      <section className="px-4 md:px-8 mt-5">
        <div className="content-max">
          <ScrollReveal delay={0.1}>
            <Link
              to="/music"
              className="block relative overflow-hidden group"
              style={{
                borderRadius: 20,
                height: 180,
                background: 'linear-gradient(135deg, rgba(181,130,78,0.15), rgba(196,154,98,0.06), rgba(181,130,78,0.08))',
                border: '1px solid rgba(181,130,78,0.12)',
              }}
            >
              {/* Warm glow */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px]"
                style={{
                  background: 'radial-gradient(ellipse, rgba(181,130,78,0.12), transparent 70%)',
                }}
              />
              {/* Subtle pattern */}
              <div className="absolute inset-0 opacity-30">
                <FulaniPattern />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex items-center justify-between p-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center overflow-hidden"
                      style={{ background: 'rgba(181,130,78,0.15)' }}
                    >
                      <img src={ic.radio} alt="" className="w-5 h-5 object-contain" />
                    </div>
                    <EqBars />
                  </div>
                  <h3
                    className="font-bold"
                    style={{ fontSize: 22, color: '#f5f0ea', lineHeight: 1.2 }}
                  >
                    Pulaar Music
                  </h3>
                  <p
                    className="mt-1"
                    style={{ fontSize: 13, color: 'rgba(245,240,234,0.5)' }}
                  >
                    Ta playlist 100% pulaar
                  </p>
                </div>

                {/* Animated play button */}
                <div className="relative shrink-0">
                  {/* Pulse glow rings */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'rgba(181,130,78,0.15)',
                      width: 64, height: 64,
                      margin: '-8px',
                    }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'rgba(181,130,78,0.1)',
                      width: 64, height: 64,
                      margin: '-8px',
                    }}
                    animate={{ scale: [1, 1.6, 1], opacity: [0.2, 0, 0.2] }}
                    transition={{ duration: 2, delay: 0.3, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  {/* Play button */}
                  <div
                    className="relative w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: 'linear-gradient(135deg, #b5824e, #c49a62)',
                      boxShadow: '0 4px 20px rgba(181,130,78,0.3)',
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#050505">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

    </div>
  )
}
