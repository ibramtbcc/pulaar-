import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import ScrollReveal from '../components/shared/ScrollReveal'
import { IconBook, IconQuestion, IconRadio, IconPot, IconBaobab, IconStars, IconGlobe, IconPlay } from '../components/shared/Icons'

/* ─── Animated Counter ─── */
function AnimatedCounter({ target, duration = 1400, suffix = '', prefix = '' }: { target: number; duration?: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || hasAnimated.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const start = performance.now()
          function animate(now: number) {
            const p = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            el!.textContent = prefix + Math.round(eased * target).toLocaleString() + suffix
            if (p < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration, suffix, prefix])

  return <span ref={ref}>{prefix}0{suffix}</span>
}

/* ─── Rubriques Data ─── */
const rubriques = [
  { to: '/quiz', icon: <IconQuestion size={28} />, title: 'Quiz', desc: 'Teste tes connaissances sur la culture Peule', color: 'rgba(181,130,78,0.12)', stat: '100 questions' },
  { to: '/academy', icon: <IconBook size={28} />, title: 'Academy', desc: 'Apprends le Pulaar pas a pas', color: 'rgba(74,222,128,0.08)', stat: '13 lecons' },
  { to: '/music', icon: <IconRadio size={28} />, title: 'Music', desc: 'Ecoute la playlist 100% Pulaar', color: 'rgba(139,92,246,0.08)', stat: '10 titres' },
  { to: '/kitchen', icon: <IconPot size={28} />, title: 'Kitchen', desc: 'Decouvre les recettes traditionnelles Peules', color: 'rgba(245,158,11,0.08)', stat: '8 recettes' },
  { to: '/yettore', icon: <IconBaobab size={28} />, title: 'Yettore', desc: 'Decouvre ton patronyme et ta lignee', color: 'rgba(59,130,246,0.08)', stat: '10 familles' },
  { to: '/peul-fier', icon: <IconStars size={28} />, title: 'Peul & Fier', desc: 'Les grandes personnalites de la culture Peule', color: 'rgba(244,63,94,0.08)', stat: '6 figures' },
  { to: '/peulnation', icon: <IconGlobe size={28} />, title: 'PeulNation', desc: 'La presence Peule dans le monde', color: 'rgba(34,211,238,0.08)', stat: '15+ pays' },
]

const stats = [
  { value: 45, suffix: 'M+', label: 'Peuls dans le monde' },
  { value: 1247, suffix: '', label: 'Inscrits actifs' },
  { value: 15, suffix: '+', label: 'Pays representes' },
  { value: 8, suffix: '', label: 'Rubriques' },
]

/* ─── Main Component ─── */
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <div className="min-h-screen">
      {/* ═══ HERO SECTION ═══ */}
      <section ref={heroRef} className="relative overflow-hidden" style={{ minHeight: '75vh' }}>
        {/* Background Gradient */}
        <motion.div
          className="absolute inset-0"
          style={{ y: heroY }}
        >
          <div className="absolute inset-0" style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 40%, rgba(181,130,78,0.12) 0%, transparent 60%),
              radial-gradient(ellipse 60% 40% at 30% 70%, rgba(181,130,78,0.06) 0%, transparent 50%),
              radial-gradient(ellipse 40% 30% at 70% 20%, rgba(196,154,98,0.05) 0%, transparent 40%),
              #050505
            `,
          }} />
          {/* Decorative circles */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, #b5824e, transparent 70%)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.02]" style={{ background: 'radial-gradient(circle, #c49a62, transparent 70%)' }} />
        </motion.div>

        <motion.div
          className="relative z-10 section-padding content-max flex flex-col items-center justify-center text-center"
          style={{ minHeight: '75vh', opacity: heroOpacity }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: 'rgba(181,130,78,0.1)',
              border: '1px solid rgba(181,130,78,0.2)',
            }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: '#4ade80', animation: 'pulse 2.5s infinite' }} />
            <span className="text-xs font-medium" style={{ color: 'rgba(245,240,234,0.7)' }}>
              <AnimatedCounter target={1247} duration={2000} /> inscrits en ligne
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-hero max-w-3xl"
          >
            Moussa, <span style={{ color: '#b5824e' }}>A jaraama</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 text-body max-w-xl"
            style={{ fontSize: 'clamp(15px, 2vw, 18px)' }}
          >
            Decouvre ta culture, apprends le Pulaar et connecte-toi a la communaute Peule mondiale.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-4 mt-10"
          >
            <Link to="/quiz" className="btn-primary">Commencer le Quiz</Link>
            <Link to="/academy" className="btn-outline">Apprendre le Pulaar</Link>
          </motion.div>

          {/* Stat Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-14"
          >
            {[
              { label: 'Quiz Score', value: '90%' },
              { label: 'Academy', value: '25%' },
              { label: 'Yettore', value: 'Diallubhe' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl md:text-3xl font-bold" style={{ color: '#f5f0ea' }}>{s.value}</p>
                <p className="text-xs mt-1" style={{ color: 'rgba(245,240,234,0.4)' }}>{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs" style={{ color: 'rgba(245,240,234,0.3)' }}>Explorer</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1.5"
            style={{ borderColor: 'rgba(245,240,234,0.15)' }}
          >
            <div className="w-1 h-1.5 rounded-full" style={{ background: 'rgba(245,240,234,0.3)' }} />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ RUBRIQUES GRID ═══ */}
      <section className="section-padding section-gap">
        <div className="content-max">
          <ScrollReveal>
            <div className="amber-line" />
            <h2 className="text-h2 mb-2">Explore PULAAR+</h2>
            <p className="text-body mb-10 max-w-lg">
              Sept rubriques pour decouvrir, apprendre et celebrer la culture Peule.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {rubriques.map((r, i) => (
              <ScrollReveal key={r.to} delay={i * 0.06}>
                <Link
                  to={r.to}
                  className="surface-card card-hover block p-6 md:p-7 group"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: r.color }}
                    >
                      {r.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-h3 group-hover:text-[#b5824e] transition-colors duration-300">{r.title}</h3>
                      <p className="text-small mt-1.5">{r.desc}</p>
                      <span
                        className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium"
                        style={{ background: 'rgba(245,240,234,0.04)', color: 'rgba(245,240,234,0.5)' }}
                      >
                        {r.stat}
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CULTURE DU JOUR ═══ */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(181,130,78,0.04) 0%, rgba(181,130,78,0.02) 50%, transparent 100%)',
          borderTop: '1px solid rgba(181,130,78,0.06)',
          borderBottom: '1px solid rgba(181,130,78,0.06)',
        }}
      >
        <div className="section-padding section-gap content-max">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="text-label px-3 py-1.5 rounded-lg" style={{ background: 'rgba(181,130,78,0.12)' }}>
                  Culture du jour
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-medium" style={{ background: 'rgba(74,222,128,0.1)', color: '#4ade80' }}>
                  Nouveau
                </span>
              </div>
              <p className="text-body md:text-lg leading-relaxed" style={{ color: 'rgba(245,240,234,0.65)' }}>
                Les Peuls representent l'un des plus grands groupes ethniques d'Afrique,
                presents dans plus de 15 pays. Leur tradition pastorale et leur code moral
                (pulaaku) sont au coeur de leur identite.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ STATS COUNTER ═══ */}
      <section className="section-padding section-gap">
        <div className="content-max">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.1}>
                <div className="text-center py-6">
                  <p className="text-4xl md:text-5xl lg:text-6xl font-extrabold" style={{ color: '#f5f0ea' }}>
                    <AnimatedCounter target={s.value} suffix={s.suffix} duration={1800} />
                  </p>
                  <p className="text-small mt-3">{s.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED: KITCHEN ═══ */}
      <section className="relative overflow-hidden" style={{ minHeight: 360 }}>
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, rgba(26,18,6,0.6) 0%, transparent 60%)',
        }} />
        <div className="section-padding content-max relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 py-16 md:py-24">
            <ScrollReveal className="flex-1" direction="left">
              <span className="text-label">Decouvrir</span>
              <h2 className="text-h2 mt-3">Pulaar Kitchen</h2>
              <p className="text-body mt-4 max-w-md">
                Explore les recettes traditionnelles peules, du thiakry au laciri en passant par le kosam.
              </p>
              <Link to="/kitchen" className="btn-primary mt-8">
                Voir les recettes
              </Link>
            </ScrollReveal>
            <ScrollReveal className="flex-1 flex justify-center" direction="right">
              <div
                className="w-full max-w-sm aspect-[4/3] rounded-3xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #1a1206, #0c0b09)',
                  border: '1px solid rgba(181,130,78,0.1)',
                  boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <IconPot size={80} />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ FEATURED: MUSIC ═══ */}
      <section className="relative overflow-hidden" style={{ minHeight: 360 }}>
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(225deg, rgba(13,15,6,0.4) 0%, transparent 60%)',
        }} />
        <div className="section-padding content-max relative z-10">
          <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16 py-16 md:py-24">
            <ScrollReveal className="flex-1 flex justify-center" direction="left">
              <div
                className="w-48 h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center"
                style={{
                  background: 'radial-gradient(circle, rgba(181,130,78,0.12), rgba(181,130,78,0.03))',
                  border: '2px solid rgba(181,130,78,0.15)',
                  boxShadow: '0 0 60px rgba(181,130,78,0.1)',
                  animation: 'glowPulse 4s infinite',
                }}
              >
                <IconPlay size={48} />
              </div>
            </ScrollReveal>
            <ScrollReveal className="flex-1" direction="right">
              <span className="text-label">Ecouter</span>
              <h2 className="text-h2 mt-3">Pulaar Music</h2>
              <p className="text-body mt-4 max-w-md">
                Ta playlist 100% pulaar. Les plus beaux morceaux de la culture Peule, de Baaba Maal a Oumou Sangare.
              </p>
              <Link to="/music" className="btn-primary mt-8">
                <IconPlay size={16} />
                Lancer la playlist
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ ACADEMY CTA ═══ */}
      <section className="section-padding section-gap">
        <div className="content-max">
          <ScrollReveal>
            <div
              className="rounded-3xl p-8 md:p-14 text-center relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(181,130,78,0.08), rgba(181,130,78,0.03))',
                border: '1px solid rgba(181,130,78,0.1)',
              }}
            >
              {/* Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] opacity-20"
                style={{ background: 'radial-gradient(ellipse, #b5824e, transparent 70%)' }} />

              <div className="relative z-10">
                <span className="text-label">Pulaar Academy</span>
                <h2 className="text-h2 mt-4">Apprends le Pulaar</h2>
                <p className="text-body mt-4 max-w-md mx-auto">
                  13 lecons progressives pour maitriser les bases du Pulaar. Du debutant au courant.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                  <Link to="/academy" className="btn-primary">Commencer les lecons</Link>
                  <Link to="/quiz" className="btn-outline">Tester mon niveau</Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
