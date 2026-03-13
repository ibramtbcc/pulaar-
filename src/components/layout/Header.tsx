import { useState, useMemo } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { IconBaobab, IconStars, IconGlobe, IconUser } from '../shared/Icons'
import { useUserStore } from '../../stores/userStore'
import avatarsData from '../../data/avatars.json'

const avatars = avatarsData as Record<string, { b64: string }>

/* Only 4 items visible in nav — the rest goes in "..." */
const mainNav = [
  { to: '/', label: 'Accueil' },
  { to: '/quiz', label: 'Quiz' },
  { to: '/academy', label: 'Academy' },
  { to: '/music', label: 'Music' },
]

const moreNav = [
  { to: '/kitchen', label: 'Kitchen', icon: <IconBaobab size={16} /> },
  { to: '/yettore', label: 'Yettore', icon: <IconBaobab size={16} /> },
  { to: '/peul-fier', label: 'Peul & Fier', icon: <IconStars size={16} /> },
  { to: '/peulnation', label: 'PeulNation', icon: <IconGlobe size={16} /> },
]

const allNavMobile = [
  ...mainNav,
  { to: '/kitchen', label: 'Kitchen' },
  { to: '/yettore', label: 'Yettore' },
  { to: '/peul-fier', label: 'Peul & Fier' },
  { to: '/peulnation', label: 'PeulNation' },
]

export default function Header() {
  const [moreOpen, setMoreOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { avatarId, prenom } = useUserStore()

  const avatarSrc = useMemo(() => {
    if (!avatarId) return null
    const entry = avatars[avatarId]
    return entry?.b64 || null
  }, [avatarId])

  const initial = prenom ? prenom.charAt(0).toUpperCase() : ''

  return (
    <>
      <header
        className="hidden md:block sticky top-0 z-40"
        style={{
          background: 'rgba(5, 5, 5, 0.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {/* Bottom gradient fade — ultra subtle */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(181,130,78,0.12) 50%, transparent 95%)' }}
        />

        <div className="max-w-[1200px] mx-auto flex items-center justify-between h-16 px-6 lg:px-10">
          {/* Logo — dominant */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-0 select-none">
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: 22,
                color: '#f5f0ea',
                letterSpacing: '-0.03em',
              }}
            >
              pulaar
            </span>
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: 22,
                color: '#b5824e',
                letterSpacing: '-0.03em',
              }}
            >
              +
            </span>
          </Link>

          {/* Center Nav — 4 items max + "..." */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {mainNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'text-[#f5f0ea]'
                      : 'text-[rgba(245,240,234,0.4)] hover:text-[rgba(245,240,234,0.8)]'
                  }`
                }
                style={{ fontSize: 13, fontWeight: 400, fontFamily: "'Outfit', sans-serif" }}
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-4 right-4 h-[1.5px] rounded-full"
                        style={{ background: '#b5824e' }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}

            {/* "..." dropdown — clear affordance */}
            <div
              className="relative"
              onMouseEnter={() => setMoreOpen(true)}
              onMouseLeave={() => setMoreOpen(false)}
            >
              <button
                className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200"
                style={{
                  color: moreOpen ? '#f5f0ea' : 'rgba(245,240,234,0.35)',
                  background: moreOpen ? 'rgba(245,240,234,0.06)' : 'transparent',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <circle cx="3" cy="8" r="1.2" />
                  <circle cx="8" cy="8" r="1.2" />
                  <circle cx="13" cy="8" r="1.2" />
                </svg>
              </button>

              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full right-0 mt-2 w-48 rounded-2xl overflow-hidden"
                    style={{
                      background: '#0c0b09',
                      border: '0.5px solid rgba(245, 240, 234, 0.08)',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
                    }}
                  >
                    <div className="py-1.5">
                      {moreNav.map((item) => (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          onClick={() => setMoreOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-2.5 px-4 py-2.5 transition-all duration-200 ${
                              isActive
                                ? 'text-[#b5824e]'
                                : 'text-[rgba(245,240,234,0.6)] hover:text-[#f5f0ea] hover:bg-[rgba(245,240,234,0.03)]'
                            }`
                          }
                          style={{ fontSize: 13, fontFamily: "'Outfit', sans-serif" }}
                        >
                          <span className="opacity-60">{item.icon}</span>
                          <span style={{ fontWeight: 500 }}>{item.label}</span>
                        </NavLink>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Tablet hamburger (md-lg) */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex lg:hidden flex-col gap-1.5 p-2"
          >
            <span className="w-5 h-[1.5px] rounded-full bg-[#f5f0ea] transition-all" style={{ transform: mobileOpen ? 'rotate(45deg) translateY(4.5px)' : 'none' }} />
            <span className="w-5 h-[1.5px] rounded-full bg-[#f5f0ea] transition-all" style={{ opacity: mobileOpen ? 0 : 1 }} />
            <span className="w-5 h-[1.5px] rounded-full bg-[#f5f0ea] transition-all" style={{ transform: mobileOpen ? 'rotate(-45deg) translateY(-4.5px)' : 'none' }} />
          </button>

          {/* Right — avatar + inscrits */}
          <div className="hidden lg:flex items-center gap-3">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ border: '0.5px solid rgba(245,240,234,0.06)' }}
            >
              <span
                className="w-[6px] h-[6px] rounded-full"
                style={{ background: '#4ade80', boxShadow: '0 0 6px rgba(74,222,128,0.4)' }}
              />
              <span style={{ fontSize: 11, fontWeight: 500, color: 'rgba(245,240,234,0.5)', fontFamily: "'Outfit', sans-serif", letterSpacing: '0.02em' }}>
                1,247 inscrits
              </span>
            </div>

            {/* Avatar — real or initials */}
            <Link
              to="/"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 overflow-hidden"
              style={{
                border: '1.5px solid rgba(181,130,78,0.4)',
                background: avatarSrc ? 'transparent' : '#0c0b09',
              }}
            >
              {avatarSrc ? (
                <img src={avatarSrc} alt="" className="w-full h-full object-cover" draggable={false} />
              ) : initial ? (
                <span style={{ fontSize: 13, fontWeight: 700, color: '#b5824e', fontFamily: "'Outfit', sans-serif" }}>
                  {initial}
                </span>
              ) : (
                <IconUser size={14} />
              )}
            </Link>
          </div>
        </div>

        {/* Tablet slide-down */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden overflow-hidden"
              style={{
                background: 'rgba(5, 5, 5, 0.98)',
                borderTop: '0.5px solid rgba(245, 240, 234, 0.04)',
              }}
            >
              <nav className="flex flex-col py-3 px-4">
                {allNavMobile.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'text-[#b5824e] bg-[rgba(181,130,78,0.06)]'
                          : 'text-[rgba(245,240,234,0.5)] hover:text-[#f5f0ea]'
                      }`
                    }
                    style={{ fontSize: 14, fontWeight: 500, fontFamily: "'Outfit', sans-serif" }}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
