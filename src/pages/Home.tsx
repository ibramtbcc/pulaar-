import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import ScrollReveal from '../components/shared/ScrollReveal'
import { useUserStore } from '../stores/userStore'
import { IconBook, IconQuestion, IconRadio, IconPot, IconBaobab, IconStars, IconGlobe, IconPlay } from '../components/shared/Icons'

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

/* ─── Main Component ─── */
export default function Home() {
  const { prenom } = useUserStore()
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <div className="min-h-screen">

      {/* ═══ SECTION 1 — HERO (compact, impactful) ═══ */}
      <section ref={heroRef} className="relative overflow-hidden" style={{ maxHeight: '55vh', minHeight: '55vh' }}>
        {/* Background Gradient */}
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <div className="absolute inset-0" style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 40%, rgba(181,130,78,0.12) 0%, transparent 60%),
              radial-gradient(ellipse 60% 40% at 30% 70%, rgba(181,130,78,0.06) 0%, transparent 50%),
              radial-gradient(ellipse 40% 30% at 70% 20%, rgba(196,154,98,0.05) 0%, transparent 40%),
              #050505
            `,
          }} />
          {/* Fulani pattern overlay */}
          <FulaniPattern />
        </motion.div>

        <motion.div
          className="relative z-10 section-padding content-max flex flex-col items-center justify-center text-center"
          style={{ minHeight: '55vh', opacity: heroOpacity }}
        >
          {/* Main Title — Light weight for contrast */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontWeight: 300, fontSize: 'clamp(48px, 8vw, 80px)', lineHeight: 1.05, color: '#f5f0ea' }}
          >
            {prenom || 'Salam'}, <span style={{ color: '#b5824e' }}>A jaraama</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 max-w-lg"
            style={{ fontSize: 'clamp(14px, 1.8vw, 16px)', color: 'rgba(245,240,234,0.5)' }}
          >
            Decouvre ta culture, apprends le Pulaar et connecte-toi a la communaute Peule mondiale.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-4 mt-8"
          >
            <Link to="/quiz" className="btn-primary">Commencer le Quiz</Link>
            <Link to="/academy" className="btn-outline">Apprendre le Pulaar</Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ SECTION 2 — BENTO GRID (asymmetric rubriques) ═══ */}
      <section className="section-padding section-gap">
        <div className="content-max">
          <ScrollReveal>
            <div className="amber-line" />
            <h2 className="text-h2 mb-2">Explore PULAAR+</h2>
            <p className="text-body mb-10 max-w-lg">
              Sept rubriques pour decouvrir, apprendre et celebrer la culture Peule.
            </p>
          </ScrollReveal>

          {/* Bento Grid — asymmetric layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Row 1: Quiz (2 cols) + Academy (1 col) */}
            <ScrollReveal delay={0} className="md:col-span-2">
              <Link
                to="/quiz"
                className="surface-card card-hover block p-7 md:p-9 group relative overflow-hidden h-full"
                style={{ minHeight: 200, background: 'linear-gradient(135deg, rgba(181,130,78,0.1), rgba(181,130,78,0.03))' }}
              >
                <div className="absolute top-4 right-4 opacity-[0.06]">
                  <IconQuestion size={120} />
                </div>
                <div className="relative z-10">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: 'rgba(181,130,78,0.15)' }}
                  >
                    <IconQuestion size={28} />
                  </div>
                  <h3 className="text-h2 group-hover:text-[#b5824e] transition-colors duration-300">Quiz</h3>
                  <p className="text-body mt-2 max-w-sm">Teste tes connaissances sur la culture Peule</p>
                  <span
                    className="inline-block mt-4 px-3 py-1 rounded-full text-xs font-medium"
                    style={{ background: 'rgba(245,240,234,0.04)', color: 'rgba(245,240,234,0.5)' }}
                  >
                    100 questions
                  </span>
                </div>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.06}>
              <Link
                to="/academy"
                className="surface-card card-hover block p-6 md:p-7 group h-full"
                style={{ minHeight: 200 }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(181,130,78,0.08)' }}
                >
                  <IconBook size={24} />
                </div>
                <h3 className="text-h3 group-hover:text-[#b5824e] transition-colors duration-300">Academy</h3>
                <p className="text-small mt-1.5">Apprends le Pulaar pas a pas</p>
                <span
                  className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: 'rgba(245,240,234,0.04)', color: 'rgba(245,240,234,0.5)' }}
                >
                  13 lecons
                </span>
              </Link>
            </ScrollReveal>

            {/* Row 2: Music + Kitchen + Yettore (1 col each) */}
            <ScrollReveal delay={0.12}>
              <Link
                to="/music"
                className="surface-card card-hover block p-6 md:p-7 group relative overflow-hidden h-full"
                style={{ minHeight: 180, background: 'linear-gradient(160deg, #0c0b09, #080706)' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ background: 'rgba(181,130,78,0.08)' }}
                  >
                    <IconRadio size={24} />
                  </div>
                  <EqBars />
                </div>
                <h3 className="text-h3 group-hover:text-[#b5824e] transition-colors duration-300">Music</h3>
                <p className="text-small mt-1.5">Ecoute la playlist 100% Pulaar</p>
                <span
                  className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: 'rgba(245,240,234,0.04)', color: 'rgba(245,240,234,0.5)' }}
                >
                  10 titres
                </span>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.18}>
              <Link
                to="/kitchen"
                className="surface-card card-hover block p-6 md:p-7 group h-full"
                style={{
                  minHeight: 180,
                  background: 'linear-gradient(160deg, rgba(181,130,78,0.06), transparent)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(245,158,11,0.08)' }}
                >
                  <IconPot size={24} />
                </div>
                <h3 className="text-h3 group-hover:text-[#b5824e] transition-colors duration-300">Kitchen</h3>
                <p className="text-small mt-1.5">Decouvre les recettes traditionnelles Peules</p>
                <span
                  className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: 'rgba(245,240,234,0.04)', color: 'rgba(245,240,234,0.5)' }}
                >
                  8 recettes
                </span>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.24}>
              <Link
                to="/yettore"
                className="surface-card card-hover block p-6 md:p-7 group h-full"
                style={{ minHeight: 180 }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(59,130,246,0.08)' }}
                >
                  <IconBaobab size={24} />
                </div>
                <h3 className="text-h3 group-hover:text-[#b5824e] transition-colors duration-300">Yettore</h3>
                <p className="text-small mt-1.5">Decouvre ton patronyme et ta lignee</p>
                <span
                  className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: 'rgba(245,240,234,0.04)', color: 'rgba(245,240,234,0.5)' }}
                >
                  10 familles
                </span>
              </Link>
            </ScrollReveal>

            {/* Row 3: Peul & Fier (1 col) + PeulNation (2 cols) */}
            <ScrollReveal delay={0.3}>
              <Link
                to="/peul-fier"
                className="surface-card card-hover block p-6 md:p-7 group h-full"
                style={{ minHeight: 180 }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(244,63,94,0.08)' }}
                >
                  <IconStars size={24} />
                </div>
                <h3 className="text-h3 group-hover:text-[#b5824e] transition-colors duration-300">Peul & Fier</h3>
                <p className="text-small mt-1.5">Les grandes personnalites de la culture Peule</p>
                <span
                  className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: 'rgba(245,240,234,0.04)', color: 'rgba(245,240,234,0.5)' }}
                >
                  6 figures
                </span>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.36} className="md:col-span-2">
              <Link
                to="/peulnation"
                className="surface-card card-hover block p-7 md:p-9 group relative overflow-hidden h-full"
                style={{ minHeight: 180 }}
              >
                {/* Subtle globe in background */}
                <div className="absolute bottom-2 right-4 opacity-[0.04]">
                  <IconGlobe size={140} />
                </div>
                <div className="relative z-10">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: 'rgba(34,211,238,0.08)' }}
                  >
                    <IconGlobe size={28} />
                  </div>
                  <h3 className="text-h2 group-hover:text-[#b5824e] transition-colors duration-300">PeulNation</h3>
                  <p className="text-body mt-2 max-w-md">La presence Peule dans le monde</p>
                  <span
                    className="inline-block mt-4 px-3 py-1 rounded-full text-xs font-medium"
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

      {/* ═══ SECTION 3 — QUICK ACCESS (horizontal scroll pills) ═══ */}
      <section className="py-6">
        <div className="content-max px-4 md:px-8">
          <ScrollReveal>
            <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style>{`.quick-scroll::-webkit-scrollbar { display: none; }`}</style>
              <Link
                to="/academy"
                className="quick-scroll flex items-center gap-2.5 px-5 py-3 rounded-full whitespace-nowrap transition-colors duration-200 hover:bg-[rgba(181,130,78,0.12)]"
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
                className="quick-scroll flex items-center gap-2.5 px-5 py-3 rounded-full whitespace-nowrap transition-colors duration-200 hover:bg-[rgba(181,130,78,0.12)]"
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
                className="quick-scroll flex items-center gap-2.5 px-5 py-3 rounded-full whitespace-nowrap transition-colors duration-200 hover:bg-[rgba(181,130,78,0.12)]"
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

      {/* ═══ SECTION 4 — ACADEMY CTA (compact) ═══ */}
      <section className="section-padding section-gap">
        <div className="content-max">
          <ScrollReveal>
            <div
              className="rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(181,130,78,0.08), rgba(181,130,78,0.03))',
                border: '1px solid rgba(181,130,78,0.1)',
              }}
            >
              {/* Glow */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] opacity-20"
                style={{ background: 'radial-gradient(ellipse, #b5824e, transparent 70%)' }}
              />
              <div className="relative z-10">
                <span className="text-label">Pulaar Academy</span>
                <h2 className="text-h2 mt-3">Apprends le Pulaar</h2>
                <p className="text-body mt-3 max-w-md mx-auto">
                  13 lecons progressives pour maitriser les bases du Pulaar.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-7">
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
