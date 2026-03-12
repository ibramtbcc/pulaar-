import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { IconHome, IconQuestion, IconBook, IconRadio, IconMore, IconPot, IconBaobab, IconStars, IconGlobe } from '../shared/Icons'
import { AnimatePresence, motion } from 'framer-motion'

const mainTabs = [
  { to: '/', icon: <IconHome size={22} />, label: 'Accueil' },
  { to: '/quiz', icon: <IconQuestion size={22} />, label: 'Quiz' },
  { to: '/academy', icon: <IconBook size={22} />, label: 'Academy' },
  { to: '/music', icon: <IconRadio size={22} />, label: 'Music' },
]

const menuItems = [
  { to: '/academy', icon: <IconBook size={28} />, label: 'Academy' },
  { to: '/quiz', icon: <IconQuestion size={28} />, label: 'Quiz' },
  { to: '/yettore', icon: <IconBaobab size={28} />, label: 'Yettore' },
  { to: '/peul-fier', icon: <IconStars size={28} />, label: 'Peul & Fier' },
  { to: '/music', icon: <IconRadio size={28} />, label: 'Music' },
  { to: '/kitchen', icon: <IconPot size={28} />, label: 'Kitchen' },
  { to: '/peulnation', icon: <IconGlobe size={28} />, label: 'PeulNation' },
]

export default function BottomNav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden"
            style={{ background: 'rgba(5, 5, 5, 0.95)' }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="px-6 pb-28"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-2">
                {menuItems.map((item, i) => (
                  <NavLink
                    key={item.to + i}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-4 px-5 py-4 rounded-2xl transition-all"
                    style={{
                      background: 'rgba(245, 240, 234, 0.04)',
                      border: '0.5px solid rgba(245, 240, 234, 0.06)',
                    }}
                  >
                    <span className="w-7 h-7 flex items-center justify-center opacity-80">
                      {item.icon}
                    </span>
                    <span style={{ fontWeight: 500, fontSize: 16, color: '#f5f0ea' }}>
                      {item.label}
                    </span>
                  </NavLink>
                ))}
              </div>

              <NavLink
                to="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center mt-4 py-4 rounded-2xl"
                style={{
                  background: 'rgba(181, 130, 78, 0.15)',
                  border: '1px solid rgba(181, 130, 78, 0.3)',
                }}
              >
                <span style={{ fontWeight: 600, fontSize: 16, color: '#b5824e' }}>Accueil</span>
              </NavLink>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav
        className="fixed bottom-0 left-0 right-0 z-40 flex lg:hidden"
        style={{
          background: 'rgba(12, 11, 9, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(245, 240, 234, 0.06)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        <div className="flex w-full justify-around items-center px-2 pt-2 pb-1">
          {mainTabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-1 px-3 transition-all duration-200 ${
                  isActive ? 'text-[#b5824e]' : 'text-[rgba(245,240,234,0.4)]'
                }`
              }
            >
              <span className="w-6 h-6 flex items-center justify-center">{tab.icon}</span>
              <span style={{ fontSize: 10, fontWeight: 500 }}>{tab.label}</span>
            </NavLink>
          ))}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col items-center gap-1 py-1 px-3 transition-all duration-200"
            style={{ color: menuOpen ? '#b5824e' : 'rgba(245, 240, 234, 0.4)' }}
          >
            <span className="w-6 h-6 flex items-center justify-center">
              <IconMore size={22} />
            </span>
            <span style={{ fontSize: 10, fontWeight: 500 }}>Plus</span>
          </button>
        </div>
      </nav>
    </>
  )
}
