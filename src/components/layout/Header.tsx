import { useState, useMemo } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from '../shared/Logo'
import { IconBaobab, IconStars, IconGlobe, IconUser } from '../shared/Icons'
import { useUserStore } from '../../stores/userStore'
import avatarsData from '../../data/avatars.json'

const avatars = avatarsData as Record<string, { b64: string }>

const mainNav = [
  { to: '/', label: 'Accueil' },
  { to: '/quiz', label: 'Quiz' },
  { to: '/academy', label: 'Academy' },
  { to: '/music', label: 'Music' },
  { to: '/kitchen', label: 'Kitchen' },
]

const moreNav = [
  { to: '/yettore', label: 'Yettore', icon: <IconBaobab size={18} /> },
  { to: '/peul-fier', label: 'Peul & Fier', icon: <IconStars size={18} /> },
  { to: '/peulnation', label: 'PeulNation', icon: <IconGlobe size={18} /> },
]

const allNavMobile = [
  ...mainNav,
  { to: '/yettore', label: 'Yettore' },
  { to: '/peul-fier', label: 'Peul & Fier' },
  { to: '/peulnation', label: 'PeulNation' },
]

export default function Header() {
  const [moreOpen, setMoreOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { avatarId } = useUserStore()

  const avatarSrc = useMemo(() => {
    if (!avatarId) return null
    const entry = avatars[avatarId]
    return entry?.b64 || null
  }, [avatarId])

  return (
    <>
      <header
        className="hidden md:block sticky top-0 z-40"
        style={{
          background: 'rgba(12, 11, 9, 0.85)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(245, 240, 234, 0.06)',
        }}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between h-16 px-6 lg:px-10">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <Logo size={26} />
          </Link>

          {/* Center Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {mainNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-[#b5824e]'
                      : 'text-[rgba(245,240,234,0.55)] hover:text-[#f5f0ea]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
                        style={{ background: '#b5824e' }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}

            {/* Plus dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setMoreOpen(true)}
              onMouseLeave={() => setMoreOpen(false)}
            >
              <button
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-[rgba(245,240,234,0.55)] hover:text-[#f5f0ea] flex items-center gap-1.5"
              >
                Plus
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                </svg>
              </button>

              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full right-0 mt-2 w-52 rounded-xl overflow-hidden"
                    style={{
                      background: 'rgba(18, 16, 14, 0.98)',
                      border: '1px solid rgba(245, 240, 234, 0.08)',
                      boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    <div className="py-2">
                      {moreNav.map((item) => (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          onClick={() => setMoreOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 ${
                              isActive
                                ? 'text-[#b5824e] bg-[rgba(181,130,78,0.08)]'
                                : 'text-[rgba(245,240,234,0.7)] hover:text-[#f5f0ea] hover:bg-[rgba(245,240,234,0.04)]'
                            }`
                          }
                        >
                          <span className="opacity-75">{item.icon}</span>
                          <span className="font-medium">{item.label}</span>
                        </NavLink>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Tablet: Hamburger (md-lg) */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex lg:hidden flex-col gap-1.5 p-2"
          >
            <span className="w-5 h-[1.5px] rounded-full bg-[#f5f0ea] transition-all" style={{ transform: mobileOpen ? 'rotate(45deg) translateY(4.5px)' : 'none' }} />
            <span className="w-5 h-[1.5px] rounded-full bg-[#f5f0ea] transition-all" style={{ opacity: mobileOpen ? 0 : 1 }} />
            <span className="w-5 h-[1.5px] rounded-full bg-[#f5f0ea] transition-all" style={{ transform: mobileOpen ? 'rotate(-45deg) translateY(-4.5px)' : 'none' }} />
          </button>

          {/* Right: User + Counter */}
          <div className="hidden lg:flex items-center gap-4">
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
              <span className="text-xs font-medium" style={{ color: 'rgba(245,240,234,0.65)' }}>
                1,247 inscrits
              </span>
            </div>
            <Link
              to="/"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-105 overflow-hidden"
              style={{
                background: avatarSrc ? 'transparent' : 'linear-gradient(135deg, #b5824e, #8a6338)',
                border: '2px solid rgba(181,130,78,0.4)',
              }}
            >
              {avatarSrc ? (
                <img src={avatarSrc} alt="" className="w-full h-full object-cover" draggable={false} />
              ) : (
                <IconUser size={16} />
              )}
            </Link>
          </div>
        </div>

        {/* Tablet slide-down menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden overflow-hidden"
              style={{
                background: 'rgba(12, 11, 9, 0.98)',
                borderTop: '1px solid rgba(245, 240, 234, 0.04)',
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
                      `px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'text-[#b5824e] bg-[rgba(181,130,78,0.08)]'
                          : 'text-[rgba(245,240,234,0.6)] hover:text-[#f5f0ea]'
                      }`
                    }
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
