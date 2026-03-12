import { NavLink } from 'react-router-dom'
import Logo from '../shared/Logo'
import { IconHome, IconQuestion, IconBook, IconRadio, IconPot, IconBaobab, IconStars, IconGlobe, IconUser, IconSettings } from '../shared/Icons'

const links = [
  { to: '/', icon: <IconHome size={20} />, label: 'Accueil' },
  { to: '/quiz', icon: <IconQuestion size={20} />, label: 'Quiz' },
  { to: '/academy', icon: <IconBook size={20} />, label: 'Academy' },
  { to: '/music', icon: <IconRadio size={20} />, label: 'Music' },
  { to: '/kitchen', icon: <IconPot size={20} />, label: 'Kitchen' },
  { to: '/yettore', icon: <IconBaobab size={20} />, label: 'Yettore' },
  { to: '/peul-fier', icon: <IconStars size={20} />, label: 'Peul & Fier' },
  { to: '/peulnation', icon: <IconGlobe size={20} />, label: 'PeulNation' },
]

const bottomLinks = [
  { to: '/profil', icon: <IconUser size={20} />, label: 'Profil' },
  { to: '/settings', icon: <IconSettings size={20} />, label: 'Reglages' },
]

export default function Sidebar() {
  return (
    <aside
      className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-[240px] z-40"
      style={{
        background: '#0c0b09',
        borderRight: '1px solid rgba(245, 240, 234, 0.06)',
      }}
    >
      <div className="p-6 pb-4">
        <Logo size={28} />
      </div>

      <nav className="flex-1 flex flex-col px-3 gap-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-[rgba(181,130,78,0.1)] text-[#b5824e]'
                  : 'text-[rgba(245,240,234,0.6)] hover:text-[#f5f0ea] hover:bg-[rgba(245,240,234,0.04)]'
              }`
            }
            end={link.to === '/'}
          >
            <span className="w-5 h-5 flex items-center justify-center" style={{ opacity: 0.9 }}>
              {link.icon}
            </span>
            <span style={{ fontWeight: 500, fontSize: 14 }}>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-3 pb-4 flex flex-col gap-1">
        <div className="h-px bg-[rgba(245,240,234,0.06)] mx-3 mb-2" />
        {bottomLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-[rgba(181,130,78,0.1)] text-[#b5824e]'
                  : 'text-[rgba(245,240,234,0.5)] hover:text-[#f5f0ea] hover:bg-[rgba(245,240,234,0.04)]'
              }`
            }
          >
            <span className="w-5 h-5 flex items-center justify-center">{link.icon}</span>
            <span style={{ fontWeight: 500, fontSize: 14 }}>{link.label}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  )
}
