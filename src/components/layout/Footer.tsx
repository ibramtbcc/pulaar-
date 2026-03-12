import { Link } from 'react-router-dom'
import Logo from '../shared/Logo'

const navLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/quiz', label: 'Quiz' },
  { to: '/academy', label: 'Academy' },
  { to: '/music', label: 'Pulaar Music' },
  { to: '/kitchen', label: 'Pulaar Kitchen' },
  { to: '/yettore', label: 'Yettore' },
  { to: '/peul-fier', label: 'Peul & Fier' },
  { to: '/peulnation', label: 'PeulNation' },
]

const socialLinks = [
  { label: 'Instagram', href: '#', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f5f0ea" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="5"/>
      <circle cx="17.5" cy="6.5" r="1" fill="#f5f0ea" stroke="none"/>
    </svg>
  )},
  { label: 'TikTok', href: '#', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#f5f0ea">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .55.04.81.1v-3.5a6.37 6.37 0 00-.81-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.87 4.44V13.2a8.18 8.18 0 005.57 2.16V12a4.83 4.83 0 01-3.77-1.55V6.69h3.77z"/>
    </svg>
  )},
  { label: 'YouTube', href: '#', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#f5f0ea">
      <path d="M23.5 6.5a3 3 0 00-2.1-2.1C19.5 4 12 4 12 4s-7.5 0-9.4.4A3 3 0 00.5 6.5 31 31 0 000 12a31 31 0 00.5 5.5 3 3 0 002.1 2.1c1.9.4 9.4.4 9.4.4s7.5 0 9.4-.4a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.5zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
    </svg>
  )},
]

export default function Footer() {
  return (
    <footer
      className="hidden md:block"
      style={{
        background: '#0c0b09',
        borderTop: '1px solid rgba(245, 240, 234, 0.06)',
      }}
    >
      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo size={28} />
            <p className="mt-4 text-sm leading-relaxed" style={{ color: 'rgba(245,240,234,0.45)' }}>
              L'app de la fierte Peule. Apprends le Pulaar, decouvre ta culture, connecte-toi a ta communaute.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    background: 'rgba(245,240,234,0.04)',
                    border: '1px solid rgba(245,240,234,0.06)',
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: '#b5824e' }}>
              Rubriques
            </h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm transition-all duration-200 hover:text-[#f5f0ea]"
                    style={{ color: 'rgba(245,240,234,0.45)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Communaute */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: '#b5824e' }}>
              Communaute
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <span className="text-sm" style={{ color: 'rgba(245,240,234,0.45)' }}>
                  +1,200 inscrits actifs
                </span>
              </li>
              <li>
                <span className="text-sm" style={{ color: 'rgba(245,240,234,0.45)' }}>
                  15+ pays representes
                </span>
              </li>
              <li>
                <span className="text-sm" style={{ color: 'rgba(245,240,234,0.45)' }}>
                  45M+ Peuls dans le monde
                </span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: '#b5824e' }}>
              Informations
            </h4>
            <ul className="flex flex-col gap-3">
              {['Mentions legales', 'Politique de confidentialite', 'CGU', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm transition-all duration-200 hover:text-[#f5f0ea]"
                    style={{ color: 'rgba(245,240,234,0.45)' }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(245, 240, 234, 0.04)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(245,240,234,0.3)' }}>
            2026 PULAAR+. Fait avec fierte pour la communaute Peule.
          </p>
          <p className="text-xs" style={{ color: 'rgba(245,240,234,0.2)' }}>
            By Moussier Tombola
          </p>
        </div>
      </div>
    </footer>
  )
}
