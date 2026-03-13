import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

/* Fulani geometric pattern — subtle identity */
function FulaniPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" opacity="0.03">
      <defs>
        <pattern id="fulani-landing" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M40 0L80 40L40 80L0 40Z" fill="none" stroke="#b5824e" strokeWidth="0.4" />
          <path d="M40 15L65 40L40 65L15 40Z" fill="none" stroke="#b5824e" strokeWidth="0.3" />
          <path d="M40 28L52 40L40 52L28 40Z" fill="none" stroke="#c49a62" strokeWidth="0.2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#fulani-landing)" />
    </svg>
  )
}

export default function Landing() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#050505' }}>

      {/* ─── Background layers ─── */}
      <div className="absolute inset-0">
        <FulaniPattern />
      </div>
      {/* Radial amber glow top center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          width: '80vw',
          maxWidth: 900,
          height: '60vh',
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(181,130,78,0.08) 0%, transparent 70%)',
        }}
      />

      {/* ─── Topbar ─── */}
      <header className="relative z-20">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between h-16 px-5 md:px-8">
          {/* Logo */}
          <div className="flex items-center gap-0 select-none">
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 22, color: '#f5f0ea', letterSpacing: '-0.03em' }}>
              pulaar
            </span>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 22, color: '#b5824e', letterSpacing: '-0.03em' }}>
              +
            </span>
          </div>

          {/* CTA */}
          <Link
            to="/onboarding"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 13,
              fontWeight: 700,
              color: '#050505',
              background: '#b5824e',
              borderRadius: 12,
              padding: '10px 22px',
              transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="hover:scale-[1.04] active:scale-[0.97]"
          >
            Commencer
          </Link>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <main className="relative z-10 max-w-[900px] mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-20">
        {/* Micro-label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <span style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: '0.25em',
            textTransform: 'uppercase' as const,
            color: '#b5824e',
          }}>
            L'app de la fierte Peule
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(40px, 8vw, 72px)',
            color: '#f5f0ea',
            lineHeight: 1.05,
            letterSpacing: '-0.04em',
            marginTop: 20,
          }}
        >
          Apprends. Decouvre.{' '}
          <span style={{ color: '#b5824e' }}>Celebre.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(16px, 2.5vw, 20px)',
            color: 'rgba(245,240,234,0.5)',
            lineHeight: 1.6,
            marginTop: 24,
            maxWidth: 560,
          }}
        >
          PULAAR+ rassemble la langue, la musique, la cuisine et l'histoire du peuple Peul
          dans une seule experience — pensee par et pour la communaute.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease }}
          className="flex flex-wrap items-center gap-4 mt-10"
        >
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-2 hover:scale-[1.04] active:scale-[0.97] transition-all duration-300"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 15,
              fontWeight: 700,
              color: '#050505',
              background: 'linear-gradient(135deg, #b5824e, #c49a62)',
              borderRadius: 14,
              padding: '15px 32px',
              boxShadow: '0 4px 24px rgba(181,130,78,0.25)',
            }}
          >
            Rejoindre PULAAR+
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          <span style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 13,
            fontWeight: 400,
            color: 'rgba(245,240,234,0.3)',
          }}>
            Gratuit &middot; 1,247 inscrits
          </span>
        </motion.div>

        {/* ─── Rubriques preview ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease }}
          className="mt-20"
        >
          <span style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase' as const,
            color: 'rgba(245,240,234,0.25)',
          }}>
            8 rubriques
          </span>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
            {[
              { name: 'Quiz', desc: 'Culture Peule' },
              { name: 'Academy', desc: 'Apprendre le Pulaar' },
              { name: 'Music', desc: 'Playlist Pulaar' },
              { name: 'Kitchen', desc: 'Recettes tradition.' },
              { name: 'Yettore', desc: 'Ton patronyme' },
              { name: 'Peul & Fier', desc: 'Personnalites' },
              { name: 'PeulNation', desc: '45M+ dans le monde' },
              { name: 'Classement', desc: 'Defie ta communaute' },
            ].map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.06, ease }}
                className="rounded-2xl p-4"
                style={{
                  background: '#0c0b09',
                  border: '0.5px solid rgba(245,240,234,0.04)',
                }}
              >
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#f5f0ea',
                }}>
                  {r.name}
                </div>
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 12,
                  fontWeight: 300,
                  color: 'rgba(245,240,234,0.3)',
                  marginTop: 4,
                }}>
                  {r.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── Stats ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1, ease }}
          className="flex items-center justify-center gap-10 md:gap-16 mt-20"
        >
          {[
            { value: '45M+', label: 'Peuls dans le monde' },
            { value: '15+', label: 'Pays representes' },
            { value: '100%', label: 'Gratuit' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(24px, 4vw, 36px)',
                color: '#f5f0ea',
                lineHeight: 1,
                letterSpacing: '-0.03em',
              }}>
                {s.value}
              </div>
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: '0.15em',
                textTransform: 'uppercase' as const,
                color: 'rgba(245,240,234,0.25)',
                marginTop: 6,
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ─── Bottom CTA ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease }}
          className="text-center mt-20"
        >
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 300,
            fontSize: 16,
            color: 'rgba(245,240,234,0.4)',
            lineHeight: 1.6,
          }}>
            Rejoins la communaute Peule la plus connectee au monde.
          </p>
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-2 mt-6 hover:scale-[1.04] active:scale-[0.97] transition-all duration-300"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: '#050505',
              background: '#b5824e',
              borderRadius: 12,
              padding: '14px 28px',
            }}
          >
            Commencer gratuitement
          </Link>
        </motion.div>

        {/* ─── Footer minimal ─── */}
        <div className="mt-24 text-center">
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 11,
            fontWeight: 400,
            color: 'rgba(245,240,234,0.15)',
          }}>
            2026 PULAAR+ &middot; Fait avec fierte pour la communaute Peule &middot; By Moussier Tombola
          </p>
        </div>
      </main>
    </div>
  )
}
