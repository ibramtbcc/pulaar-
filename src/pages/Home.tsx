import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
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

/* ─── Reveal wrapper (IntersectionObserver driven) ─── */
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ─── Equalizer bars (Music card) ─── */
function EqBars() {
  return (
    <div className="flex items-end gap-[2px] h-4">
      {[0.6, 1, 0.4, 0.8, 0.5].map((s, i) => (
        <motion.div
          key={i}
          className="w-[2.5px] rounded-full"
          style={{ background: '#b5824e', height: '100%', transformOrigin: 'bottom' }}
          animate={{ scaleY: [s, 1, s * 0.4, s] }}
          transition={{ duration: 1.2 + i * 0.15, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

/* ─── Arrow icon ─── */
function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

/* ═══════════════════════════════════════════ */
export default function Home() {
  const { prenom, nom, avatarId, paysRacine, score } = useUserStore()

  const yettore = useMemo(() => getYettore(nom), [nom])

  const avatarSrc = useMemo(() => {
    if (!avatarId) return null
    return avatars[avatarId]?.b64 || null
  }, [avatarId])

  const kitchenPhoto = useMemo(() => {
    if (photos['thieb']) return photos['thieb']
    if (photos['thieboudienne']) return photos['thieboudienne']
    const keys = Object.keys(photos)
    return keys.length > 0 ? photos[keys[0]] : null
  }, [])

  const displayName = prenom || 'Pullo'
  const initial = displayName.charAt(0).toUpperCase()
  const hasScore = score > 0

  return (
    <div className="min-h-screen pb-28 lg:pb-16">

      {/* ═══════════════════════════════════════ */}
      {/*   SECTION 1 — HERO PROFIL              */}
      {/* ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: 260 }}>
        {/* Background — radial gradient subtil */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 20%, rgba(12,11,9,1) 0%, #050505 100%)' }}
        />

        <div className="relative z-10 max-w-[960px] mx-auto px-5 md:px-8 pt-10 md:pt-14 pb-8">
          <Reveal>
            <div className="flex items-center gap-5 md:gap-7">

              {/* Avatar — 80px, amber ring, initials fallback */}
              <div className="shrink-0 relative" style={{ width: 80, height: 80 }}>
                <div
                  className="w-full h-full rounded-full overflow-hidden"
                  style={{ border: '1.5px solid rgba(181,130,78,0.5)' }}
                >
                  {avatarSrc ? (
                    <img src={avatarSrc} alt="" className="w-full h-full object-cover" draggable={false} />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ background: '#0c0b09' }}
                    >
                      <span style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 700,
                        fontSize: 28,
                        color: '#b5824e',
                      }}>
                        {initial}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Name block */}
              <div className="flex-1 min-w-0">
                <h1
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    fontSize: 'clamp(28px, 5vw, 40px)',
                    color: '#f5f0ea',
                    lineHeight: 1.1,
                    letterSpacing: '-0.04em',
                  }}
                >
                  {displayName}{nom ? ` ${nom}` : ''}
                </h1>

                {/* Badges row */}
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  {paysRacine && (
                    <span style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: 12,
                      fontWeight: 400,
                      color: 'rgba(245,240,234,0.45)',
                    }}>
                      {paysRacine}
                    </span>
                  )}
                  {paysRacine && yettore && (
                    <span style={{ color: 'rgba(245,240,234,0.15)', fontSize: 10 }}>|</span>
                  )}
                  {yettore && (
                    <span style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: 12,
                      fontWeight: 500,
                      color: 'rgba(181,130,78,0.7)',
                    }}>
                      {yettore}
                    </span>
                  )}
                  {/* PULLO CONFIRME badge — ambre system, NOT green */}
                  <span
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: 9,
                      fontWeight: 500,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase' as const,
                      color: '#b5824e',
                      background: 'rgba(181,130,78,0.08)',
                      border: '0.5px solid rgba(181,130,78,0.2)',
                      borderRadius: 20,
                      padding: '3px 10px',
                    }}
                  >
                    Pullo confirme
                  </span>
                </div>
              </div>

              {/* Score — integrated metric card, NOT a floating button */}
              <div className="hidden sm:block shrink-0">
                <div
                  style={{
                    background: '#0c0b09',
                    border: '0.5px solid rgba(181,130,78,0.12)',
                    borderRadius: 16,
                    padding: '14px 20px',
                    textAlign: 'center' as const,
                    minWidth: 90,
                  }}
                >
                  <div style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    fontSize: 28,
                    color: hasScore ? '#b5824e' : 'rgba(245,240,234,0.15)',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}>
                    {hasScore ? `${Math.min(score, 100)}%` : '\u2013'}
                  </div>
                  <div style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 9,
                    fontWeight: 500,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase' as const,
                    color: 'rgba(245,240,234,0.3)',
                    marginTop: 4,
                  }}>
                    Score quiz
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/*   SECTION 2 — METRIQUES (4 stats)      */}
      {/* ═══════════════════════════════════════ */}
      <section className="max-w-[960px] mx-auto px-5 md:px-8">
        <Reveal delay={0.08}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              padding: '28px 0',
            }}
          >
            {[
              { value: '45M+', label: 'Peuls' },
              { value: '1,247', label: 'Inscrits' },
              { value: '15+', label: 'Pays' },
              { value: '8', label: 'Rubriques' },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center relative"
              >
                {i > 0 && (
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-6"
                    style={{ background: 'rgba(181,130,78,0.08)' }}
                  />
                )}
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: 'clamp(22px, 3vw, 32px)',
                  color: '#f5f0ea',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase' as const,
                  color: 'rgba(245,240,234,0.3)',
                  marginTop: 6,
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/*   SECTION 3 — CARDS CTA (hierarchy)    */}
      {/* ═══════════════════════════════════════ */}
      <section className="max-w-[960px] mx-auto px-5 md:px-8 mt-2">
        <Reveal delay={0.1}>
          <div className="grid grid-cols-3 gap-3">

            {/* PRIMARY — Reprendre ma lecon */}
            <Link
              to="/academy"
              className="group relative overflow-hidden flex flex-col items-center justify-center gap-2.5 py-5 px-3 rounded-2xl transition-all duration-300 active:scale-[0.97]"
              style={{
                background: 'linear-gradient(135deg, #b5824e, #9a6d3c)',
                minHeight: 88,
              }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden" style={{ background: 'rgba(5,5,5,0.15)' }}>
                <img src={ic.book} alt="" className="w-6 h-6 object-contain" style={{ filter: 'brightness(0)' }} />
              </div>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 12,
                fontWeight: 700,
                color: '#050505',
                textAlign: 'center' as const,
                lineHeight: 1.2,
              }}>
                Reprendre ma lecon
              </span>
            </Link>

            {/* SECONDARY — Quiz du jour */}
            <Link
              to="/quiz"
              className="group flex flex-col items-center justify-center gap-2.5 py-5 px-3 rounded-2xl transition-all duration-300 active:scale-[0.97]"
              style={{
                background: '#0c0b09',
                border: '0.5px solid rgba(181,130,78,0.15)',
                minHeight: 88,
              }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden" style={{ background: 'rgba(181,130,78,0.08)' }}>
                <img src={ic.quiz} alt="" className="w-6 h-6 object-contain" />
              </div>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 12,
                fontWeight: 600,
                color: '#f5f0ea',
                textAlign: 'center' as const,
                lineHeight: 1.2,
              }}>
                Quiz du jour
              </span>
            </Link>

            {/* TERTIARY — Ecouter */}
            <Link
              to="/music"
              className="group flex flex-col items-center justify-center gap-2.5 py-5 px-3 rounded-2xl transition-all duration-300 active:scale-[0.97]"
              style={{
                background: '#0c0b09',
                border: '0.5px solid rgba(245,240,234,0.05)',
                minHeight: 88,
              }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden" style={{ background: 'rgba(245,240,234,0.04)' }}>
                <img src={ic.radio} alt="" className="w-6 h-6 object-contain" style={{ opacity: 0.7 }} />
              </div>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 12,
                fontWeight: 500,
                color: 'rgba(245,240,234,0.55)',
                textAlign: 'center' as const,
                lineHeight: 1.2,
              }}>
                Ecouter
              </span>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/*   SECTION 4 — ACADEMY PROGRESS         */}
      {/* ═══════════════════════════════════════ */}
      <section className="max-w-[960px] mx-auto px-5 md:px-8 mt-5">
        <Reveal delay={0.12}>
          <Link
            to="/academy"
            className="group block relative overflow-hidden rounded-2xl transition-all duration-300"
            style={{
              background: '#0c0b09',
              border: '0.5px solid rgba(181,130,78,0.1)',
              padding: '22px 24px',
            }}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                {/* Label */}
                <div className="flex items-center gap-2 mb-2">
                  <span style={{
                    display: 'inline-block',
                    width: 4,
                    height: 4,
                    background: '#b5824e',
                    borderRadius: 1,
                  }} />
                  <span style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 9,
                    fontWeight: 500,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase' as const,
                    color: '#b5824e',
                  }}>
                    Academy
                  </span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#f5f0ea',
                  lineHeight: 1.2,
                }}>
                  Lecon 3 &middot; Les salutations
                </h3>

                {/* Progress bar — 6px height with glow */}
                <div className="mt-4 w-full max-w-[280px]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 400, color: 'rgba(245,240,234,0.35)' }}>
                      Progression
                    </span>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 600, color: '#b5824e' }}>
                      25%
                    </span>
                  </div>
                  <div
                    className="w-full overflow-hidden"
                    style={{ height: 6, borderRadius: 3, background: '#1a1a1a' }}
                  >
                    <motion.div
                      style={{
                        height: '100%',
                        borderRadius: 3,
                        background: 'linear-gradient(90deg, #b5824e, #c49a62)',
                        boxShadow: '0 0 8px rgba(181,130,78,0.3)',
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: '25%' }}
                      transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              </div>

              {/* CTA button — pill shape */}
              <div
                className="shrink-0 flex items-center gap-2 transition-all duration-300 group-hover:scale-[1.03]"
                style={{
                  background: '#b5824e',
                  color: '#050505',
                  borderRadius: 999,
                  padding: '10px 20px',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                Continuer
                <ArrowRight size={13} />
              </div>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/*   SECTION 5 — EXPLORE RUBRIQUES        */}
      {/* ═══════════════════════════════════════ */}
      <section className="max-w-[960px] mx-auto px-5 md:px-8 mt-14">
        <Reveal>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(24px, 4vw, 32px)',
            color: '#f5f0ea',
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
          }}>
            Explore PULAAR+
          </h2>
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 300,
            fontSize: 14,
            color: 'rgba(245,240,234,0.4)',
            marginTop: 8,
            lineHeight: 1.5,
          }}>
            Sept rubriques pour decouvrir et celebrer la culture Peule.
          </p>
        </Reveal>

        {/* Grid — 2 cols desktop, 1 mobile, uniform height */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8"
        >
          {[
            {
              to: '/quiz',
              icon: ic.quiz,
              name: 'Quiz',
              desc: 'Teste tes connaissances sur la culture Peule',
              meta: '100 questions',
              accent: true,
            },
            {
              to: '/academy',
              icon: ic.book,
              name: 'Academy',
              desc: 'Apprends le Pulaar pas a pas',
              meta: '13 lecons',
            },
            {
              to: '/music',
              icon: ic.radio,
              name: 'Pulaar Music',
              desc: 'Playlist 100% Pulaar',
              meta: '10 titres',
              extra: <EqBars />,
            },
            {
              to: '/kitchen',
              icon: ic.pot,
              name: 'Kitchen',
              desc: 'Recettes & cuisine traditionnelle',
              meta: '8 recettes',
              photo: kitchenPhoto,
            },
            {
              to: '/yettore',
              icon: ic.zebu,
              name: 'Yettore',
              desc: 'Ton patronyme & ta lignee',
              meta: '10 familles',
            },
            {
              to: '/peul-fier',
              icon: ic.stars,
              name: 'Peul & Fier',
              desc: 'Grandes personnalites Peules',
              meta: '6 figures',
            },
            {
              to: '/peulnation',
              icon: ic.globe,
              name: 'PeulNation',
              desc: 'La presence Peule dans le monde',
              meta: '15+ pays',
              wide: true,
            },
          ].map((item, i) => (
            <Reveal
              key={item.to}
              delay={i * 0.05}
              className={item.wide ? 'md:col-span-2' : ''}
            >
              <Link
                to={item.to}
                className="group block relative overflow-hidden h-full rounded-2xl transition-all duration-300"
                style={{
                  background: '#0c0b09',
                  border: '0.5px solid rgba(22,20,16,1)',
                  minHeight: item.wide ? 100 : 140,
                }}
              >
                {/* Photo background (Kitchen) */}
                {item.photo && (
                  <>
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${item.photo})` }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(135deg, rgba(5,5,5,0.85) 30%, rgba(5,5,5,0.6) 100%)' }}
                    />
                  </>
                )}

                {/* Hover border + shadow */}
                <div
                  className="absolute inset-0 rounded-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"
                  style={{
                    border: '0.5px solid rgba(181,130,78,0.15)',
                    boxShadow: '0 8px 32px rgba(181,130,78,0.04)',
                  }}
                />

                <div className={`relative z-10 flex ${item.wide ? 'items-center' : 'flex-col'} gap-4 p-5 md:p-6 h-full`}>
                  {/* Icon */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden shrink-0 transition-transform duration-300 group-hover:scale-105"
                      style={{ background: item.accent ? 'rgba(181,130,78,0.12)' : 'rgba(245,240,234,0.03)' }}
                    >
                      <img src={item.icon} alt="" className="w-7 h-7 object-contain" />
                    </div>
                    {item.extra && <div className="hidden md:block">{item.extra}</div>}
                  </div>

                  {/* Text */}
                  <div className={`flex-1 min-w-0 ${item.wide ? '' : 'mt-auto'}`}>
                    <h3
                      className="transition-colors duration-300 group-hover:text-[#b5824e]"
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 700,
                        fontSize: item.wide ? 20 : 18,
                        color: '#f5f0ea',
                        lineHeight: 1.2,
                      }}
                    >
                      {item.name}
                    </h3>
                    <p style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 300,
                      fontSize: 13,
                      color: 'rgba(245,240,234,0.45)',
                      lineHeight: 1.4,
                      marginTop: 4,
                    }}>
                      {item.desc} {item.wide && <span style={{ color: 'rgba(245,240,234,0.25)' }}>&middot; {item.meta}</span>}
                    </p>
                    {!item.wide && (
                      <span style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: 11,
                        fontWeight: 400,
                        color: 'rgba(245,240,234,0.25)',
                        marginTop: 8,
                        display: 'inline-block',
                      }}>
                        {item.meta}
                      </span>
                    )}
                  </div>

                  {/* Hover arrow */}
                  <div
                    className="hidden md:flex items-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0"
                    style={{ color: '#b5824e' }}
                  >
                    <ArrowRight />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/*   SECTION 6 — CULTURE DU JOUR          */}
      {/* ═══════════════════════════════════════ */}
      <section className="max-w-[960px] mx-auto px-5 md:px-8 mt-12">
        <Reveal delay={0.08}>
          <div
            className="relative overflow-hidden rounded-2xl"
            style={{
              background: '#0c0b09',
              border: '0.5px solid rgba(181,130,78,0.08)',
              padding: '24px',
            }}
          >
            {/* Top amber line */}
            <div
              className="absolute top-0 left-6 right-6 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(181,130,78,0.2), transparent)' }}
            />

            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 9,
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase' as const,
              color: '#b5824e',
            }}>
              Culture du jour
            </span>

            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 300,
              fontSize: 14,
              color: 'rgba(245,240,234,0.6)',
              lineHeight: 1.8,
              marginTop: 12,
            }}>
              Le Fouta-Toro, berceau du peuple Peul, s'etend le long du fleuve Senegal.
              Centre historique de la civilisation Peule, il a vu naitre des royaumes
              puissants et reste aujourd'hui un haut lieu de la culture et des traditions Haalpulaar.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/*   SECTION 7 — MUSIC BANNER             */}
      {/* ═══════════════════════════════════════ */}
      <section className="max-w-[960px] mx-auto px-5 md:px-8 mt-5">
        <Reveal delay={0.1}>
          <Link
            to="/music"
            className="group block relative overflow-hidden rounded-2xl"
            style={{
              height: 160,
              background: 'linear-gradient(135deg, rgba(181,130,78,0.1), rgba(181,130,78,0.03))',
              border: '0.5px solid rgba(181,130,78,0.1)',
            }}
          >
            {/* Warm glow center */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: 300, height: 200,
                background: 'radial-gradient(ellipse, rgba(181,130,78,0.08), transparent 70%)',
              }}
            />

            <div className="relative z-10 h-full flex items-center justify-between p-6 md:p-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden"
                    style={{ background: 'rgba(181,130,78,0.1)' }}
                  >
                    <img src={ic.radio} alt="" className="w-5 h-5 object-contain" />
                  </div>
                  <EqBars />
                </div>
                <h3 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: 22,
                  color: '#f5f0ea',
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                }}>
                  Pulaar Music
                </h3>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 300,
                  fontSize: 13,
                  color: 'rgba(245,240,234,0.4)',
                  marginTop: 4,
                }}>
                  Ta playlist 100% pulaar
                </p>
              </div>

              {/* Play button with pulse */}
              <div className="relative shrink-0">
                <motion.div
                  className="absolute rounded-full"
                  style={{ background: 'rgba(181,130,78,0.12)', inset: -10 }}
                  animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div
                  className="relative w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, #b5824e, #c49a62)',
                    boxShadow: '0 4px 16px rgba(181,130,78,0.25)',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#050505">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </Reveal>
      </section>

    </div>
  )
}
