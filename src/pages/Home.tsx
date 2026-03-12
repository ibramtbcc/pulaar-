import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { IconPlay } from '../components/shared/Icons'

function AnimatedCounter({ target, duration = 1400, suffix = '' }: { target: number; duration?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const start = performance.now()
    function animate(now: number) {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      el.textContent = Math.round(eased * target).toLocaleString() + suffix
      if (p < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [target, duration, suffix])
  return <span ref={ref}>0{suffix}</span>
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen" style={{ background: '#050505' }}>
      {/* TopBar */}
      <div
        className="sticky top-0 z-30 px-5 py-4 flex items-center justify-between"
        style={{
          background: 'linear-gradient(180deg, #050505 60%, transparent)',
        }}
      >
        <div>
          <p style={{ fontSize: 14, color: 'rgba(245,240,234,0.5)', fontWeight: 400 }}>
            Moussa, <span style={{ color: '#b5824e' }}>A salminama</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{
              background: 'rgba(245,240,234,0.04)',
              border: '0.5px solid rgba(245,240,234,0.08)',
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: '#4ade80', animation: 'pulse 2.5s infinite' }}
            />
            <span style={{ fontSize: 12, fontWeight: 500, color: 'rgba(245,240,234,0.7)' }}>
              <AnimatedCounter target={1247} duration={2000} /> inscrits
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 flex flex-col gap-4 pb-8">
        {/* Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl p-5 relative overflow-hidden"
          style={{
            background: '#0c0b09',
            border: '0.5px solid #161410',
            boxShadow: '0 1px 0 rgba(255,255,255,0.008) inset',
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-16 h-16 rounded-full flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #b5824e 0%, #8a6338 100%)',
                border: '2px solid rgba(181,130,78,0.3)',
              }}
            />
            <div className="flex-1 min-w-0">
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#f5f0ea' }}>Moussa Diallo</h2>
              <p style={{ fontSize: 13, color: 'rgba(245,240,234,0.5)', marginTop: 2 }}>
                Yettore · Diallubhe
              </p>
              <p style={{ fontSize: 12, color: 'rgba(245,240,234,0.4)', marginTop: 4 }}>
                Paris · Labe
              </p>
              <div
                className="inline-flex items-center px-3 py-1 rounded-full mt-3"
                style={{
                  background: 'rgba(181,130,78,0.12)',
                  border: '1px solid rgba(181,130,78,0.2)',
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 600, color: '#b5824e', letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>
                  Pullo confirme
                </span>
              </div>
            </div>
          </div>

          {/* Score */}
          <div className="mt-5 flex items-end justify-between">
            <div>
              <p style={{ fontSize: 11, color: 'rgba(245,240,234,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, fontWeight: 500 }}>
                PULAAR QUIZZ
              </p>
              <p style={{ fontSize: 48, fontWeight: 800, color: '#f5f0ea', lineHeight: 1 }}>
                <AnimatedCounter target={90} suffix="%" />
              </p>
              <p style={{ fontSize: 12, color: 'rgba(245,240,234,0.4)', marginTop: 2 }}>de reussite</p>
            </div>
            <div className="flex gap-2">
              <Link
                to="/quiz"
                className="px-4 py-2.5 rounded-xl flex items-center gap-2 transition-transform active:scale-[0.97]"
                style={{
                  background: 'linear-gradient(135deg, #b5824e, #9a6d3c)',
                  boxShadow: '0 2px 12px rgba(181,130,78,0.3)',
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 600, color: '#050505' }}>Rejouer</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Academy Module */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            to="/academy"
            className="block rounded-2xl p-5"
            style={{
              background: '#0c0b09',
              border: '0.5px solid #161410',
              boxShadow: '0 1px 0 rgba(255,255,255,0.008) inset',
            }}
          >
            <p style={{ fontSize: 12, color: 'rgba(245,240,234,0.4)', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>
              PULAAR ACADEMY
            </p>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#f5f0ea', marginTop: 6 }}>
              Lecon 3 · Les salutations
            </h3>
            <div className="mt-3 rounded-full overflow-hidden h-1.5" style={{ background: 'rgba(245,240,234,0.06)' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '25%' }}
                transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #b5824e, #c49a62)' }}
              />
            </div>
            <div className="flex items-center justify-between mt-3">
              <span style={{ fontSize: 12, color: 'rgba(245,240,234,0.4)' }}>25% complete</span>
              <span
                className="px-4 py-2 rounded-xl"
                style={{
                  background: 'rgba(181,130,78,0.1)',
                  border: '1px solid rgba(181,130,78,0.2)',
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#b5824e',
                }}
              >
                Continuer ma lecon
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Culture du jour */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl p-5"
          style={{
            background: '#0c0b09',
            border: '0.5px solid #161410',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span
              className="px-2.5 py-1 rounded-md"
              style={{
                background: 'rgba(181,130,78,0.12)',
                fontSize: 10,
                fontWeight: 600,
                color: '#b5824e',
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
              }}
            >
              CULTURE DU JOUR
            </span>
            <span
              className="px-2 py-0.5 rounded-md"
              style={{
                background: 'rgba(74,222,128,0.1)',
                fontSize: 10,
                fontWeight: 500,
                color: '#4ade80',
              }}
            >
              Nouveau
            </span>
          </div>
          <p style={{ fontSize: 14, color: 'rgba(245,240,234,0.7)', lineHeight: 1.6 }}>
            Les Peuls representent l'un des plus grands groupes ethniques d'Afrique,
            presents dans plus de 15 pays. Leur tradition pastorale et leur code moral
            (pulaaku) sont au coeur de leur identite.
          </p>
        </motion.div>

        {/* Banner Kitchen */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            to="/kitchen"
            className="block rounded-2xl overflow-hidden relative"
            style={{ height: 160 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, #1a1206 0%, #0c0b09 50%, #0d0906 100%)',
              }}
            />
            <div className="absolute inset-0 flex flex-col justify-end p-5">
              <p style={{ fontSize: 11, fontWeight: 600, color: '#b5824e', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>
                Decouvrir
              </p>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: '#f5f0ea', marginTop: 4 }}>
                Pulaar Kitchen
              </h3>
              <p style={{ fontSize: 13, color: 'rgba(245,240,234,0.5)', marginTop: 4 }}>
                Recettes & cuisine 100% peul
              </p>
            </div>
          </Link>
        </motion.div>

        {/* Banner Music */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            to="/music"
            className="block rounded-2xl overflow-hidden relative"
            style={{ height: 160 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, #0d0f06 0%, #0c0b09 50%, #060908 100%)',
              }}
            />
            <div className="absolute inset-0 flex items-center justify-between p-5">
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: '#b5824e', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>
                  Ecouter
                </p>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: '#f5f0ea', marginTop: 4 }}>
                  Pulaar Music
                </h3>
                <p style={{ fontSize: 13, color: 'rgba(245,240,234,0.5)', marginTop: 4 }}>
                  Ta playlist 100% pulaar
                </p>
              </div>
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(181,130,78,0.15)',
                  border: '2px solid rgba(181,130,78,0.3)',
                  animation: 'glowPulse 3s infinite',
                }}
              >
                <IconPlay size={24} />
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
