import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SplashScreen from '../components/shared/SplashScreen'
import { IconBack } from '../components/shared/Icons'
import ScrollReveal from '../components/shared/ScrollReveal'
import { useIsTablet } from '../hooks/useMediaQuery'
import icons from '../data/icons.json'

const ic = icons as Record<string, string>

const personalities = [
  { id: 'baaba', name: 'Baaba Maal', domain: 'Musique', country: 'Senegal', bio: 'Baaba Maal est un chanteur et musicien senegalais originaire de Podor, dans le Fouta-Toro. Figure majeure de la musique africaine, il chante en pulaar et porte fierement son heritage peul a travers le monde.', quote: '"La musique est le pont entre les cultures."', color: '#b5824e' },
  { id: 'oumou', name: 'Oumou Sangare', domain: 'Musique', country: 'Mali', bio: 'Oumou Sangare est une chanteuse et compositrice malienne, ambassadrice de la musique wassoulou. Elle utilise sa musique pour defendre les droits des femmes et celebrer la culture peule.', quote: '"La voix des femmes est la force de l\'Afrique."', color: '#c49a62' },
  { id: 'hampate', name: 'Amadou Hampate Ba', domain: 'Litterature', country: 'Mali', bio: 'Ecrivain, historien et ethnologue malien d\'origine peule. Sa celebre phrase reste gravee dans l\'histoire et a inspire des generations entieres de penseurs africains.', quote: '"En Afrique, quand un vieillard meurt, c\'est une bibliotheque qui brule."', color: '#d4a24e' },
  { id: 'sekouba', name: 'Sekouba Bambino', domain: 'Musique', country: 'Guinee', bio: 'Chanteur guineen d\'origine peule, Sekouba Bambino Diabate est une voix majeure de la musique mandingue et peule. Il porte les valeurs du pulaaku dans chacune de ses performances.', quote: '"La musique peule parle au coeur de chaque Africain."', color: '#b87333' },
  { id: 'sona', name: 'Sona Jobarteh', domain: 'Musique', country: 'Gambie', bio: 'Premiere femme joueuse professionnelle de kora d\'Afrique de l\'Ouest. Elle brise les traditions pour porter la culture griotique a un niveau international.', quote: '"L\'heritage n\'a pas de genre."', color: '#a8a8a8' },
  { id: 'macky', name: 'Macky Sall', domain: 'Politique', country: 'Senegal', bio: 'Ancien president de la Republique du Senegal (2012-2024) et ancien president de l\'Union Africaine. D\'origine peule du Fouta-Toro, il a marque la politique senegalaise et africaine.', quote: '"Le Senegal est debout."', color: '#b5824e' },
]

/* Decorative quote mark SVG */
function QuoteMark({ color }: { color: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path
        d="M14 28c-3.3 0-6-2.7-6-6s2.7-6 6-6c.7 0 1.4.1 2 .4C14.3 11.6 10.5 8 6 8V4c7.7 0 14 6.3 14 14v12c0 2.2-1.8 4-4 4h-2zm20 0c-3.3 0-6-2.7-6-6s2.7-6 6-6c.7 0 1.4.1 2 .4C34.3 11.6 30.5 8 26 8V4c7.7 0 14 6.3 14 14v12c0 2.2-1.8 4-4 4h-2z"
        fill={color}
        opacity="0.15"
      />
    </svg>
  )
}

/* Domain icon SVG */
function DomainIcon({ domain, color }: { domain: string; color: string }) {
  if (domain === 'Musique') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
      </svg>
    )
  }
  if (domain === 'Litterature') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    )
  }
  // Politique / default
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
    </svg>
  )
}

export default function PeulFier() {
  const isTablet = useIsTablet()
  const [showSplash, setShowSplash] = useState(!isTablet)
  const [openPerson, setOpenPerson] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const person = openPerson ? personalities.find((p) => p.id === openPerson) : null

  if (showSplash) return <SplashScreen icon={<img src={ic.stars} alt="" className="w-[120px] h-[120px] object-contain" />} title="Peul & Fier" onComplete={() => setShowSplash(false)} />

  return (
    <div className="min-h-screen relative" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <section className="section-padding pt-12 md:pt-20 pb-8 md:pb-12">
        <div className="content-max">
          <div className="amber-line" />
          <h1 className="text-hero">Peul & Fier</h1>
          <p className="text-body mt-3 max-w-lg">Les grandes personnalites qui font la fierte de la culture Peule.</p>
        </div>
      </section>

      <section className="section-padding pb-24 md:pb-16">
        <div className="content-max">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {personalities.map((p, i) => {
              const isHovered = hoveredId === p.id
              return (
                <ScrollReveal key={p.id} delay={i * 0.06}>
                  <button
                    onClick={() => setOpenPerson(p.id)}
                    onMouseEnter={() => setHoveredId(p.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="overflow-hidden relative text-left w-full group"
                    style={{
                      height: 320,
                      borderRadius: 24,
                      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    {/* Unique gradient background per person */}
                    <div className="absolute inset-0" style={{
                      background: `linear-gradient(160deg, ${p.color}18 0%, ${p.color}08 40%, #0c0b09 70%, #050505 100%)`,
                    }} />

                    {/* Subtle radial accent */}
                    <div className="absolute inset-0" style={{
                      background: `radial-gradient(ellipse at 30% 20%, ${p.color}12 0%, transparent 60%)`,
                    }} />

                    {/* Bottom gradient for text readability */}
                    <div className="absolute inset-0" style={{
                      background: 'linear-gradient(180deg, transparent 40%, rgba(5,5,5,0.8) 75%, rgba(5,5,5,0.95) 100%)',
                    }} />

                    {/* Large decorative first letter */}
                    <div
                      className="absolute top-4 right-4 select-none pointer-events-none"
                      style={{
                        fontSize: 120,
                        fontWeight: 900,
                        lineHeight: 1,
                        color: p.color,
                        opacity: 0.06,
                        fontFamily: "'Outfit', sans-serif",
                        transition: 'opacity 0.5s ease',
                        ...(isHovered ? { opacity: 0.1 } : {}),
                      }}
                    >
                      {p.name.charAt(0)}
                    </div>

                    {/* Geometric accent lines */}
                    <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: `linear-gradient(90deg, ${p.color}30, transparent 60%)` }} />
                    <div className="absolute top-0 left-0 h-full w-[1px]" style={{ background: `linear-gradient(180deg, ${p.color}20, transparent 50%)` }} />

                    {/* Domain badge top-left */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                        style={{ background: 'rgba(5,5,5,0.5)', backdropFilter: 'blur(8px)', color: p.color }}
                      >
                        <DomainIcon domain={p.domain} color={p.color} />
                        {p.domain}
                      </span>
                    </div>

                    {/* Country badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <span
                        className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider"
                        style={{
                          background: 'rgba(245,240,234,0.04)',
                          backdropFilter: 'blur(8px)',
                          border: '0.5px solid rgba(245,240,234,0.08)',
                          color: 'rgba(245,240,234,0.5)',
                        }}
                      >
                        {p.country}
                      </span>
                    </div>

                    {/* Info at bottom with slide-up reveal on hover */}
                    <div
                      className="absolute bottom-0 left-0 right-0 p-5"
                      style={{ transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
                    >
                      <h3
                        className="font-bold text-lg"
                        style={{
                          color: '#f5f0ea',
                          fontFamily: "'Outfit', sans-serif",
                          transition: 'color 0.3s ease',
                          ...(isHovered ? { color: p.color } : {}),
                        }}
                      >
                        {p.name}
                      </h3>

                      {/* Quote preview (first ~50 chars) */}
                      <p
                        className="text-xs mt-2 italic leading-relaxed"
                        style={{
                          color: 'rgba(245,240,234,0.4)',
                          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                          maxHeight: isHovered ? 60 : 0,
                          opacity: isHovered ? 1 : 0,
                          overflow: 'hidden',
                        }}
                      >
                        {p.quote.length > 55 ? p.quote.slice(0, 55) + '...' : p.quote}
                      </p>

                      {/* "Decouvrir" text on hover */}
                      <div
                        className="flex items-center gap-1 mt-2"
                        style={{
                          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                          opacity: isHovered ? 1 : 0,
                          transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
                        }}
                      >
                        <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: p.color }}>Decouvrir</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      </div>
                    </div>
                  </button>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Person Modal */}
      <AnimatePresence>
        {person && (
          <>
            {isTablet && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 hidden md:block" style={{ background: 'rgba(5,5,5,0.8)', backdropFilter: 'blur(8px)' }}
                onClick={() => setOpenPerson(null)} />
            )}
            <motion.div
              initial={isTablet ? { opacity: 0, scale: 0.95, y: 20 } : { y: '100%' }}
              animate={isTablet ? { opacity: 1, scale: 1, y: 0 } : { y: 0 }}
              exit={isTablet ? { opacity: 0, scale: 0.95, y: 20 } : { y: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={`fixed z-50 overflow-y-auto ${isTablet ? 'inset-x-0 inset-y-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[650px] md:max-h-[85vh] md:rounded-3xl' : 'inset-0'}`}
              style={{ background: '#050505', border: isTablet ? '1px solid rgba(245,240,234,0.08)' : 'none' }}
            >
              {/* Modal header with gradient */}
              <div className="relative" style={{ height: isTablet ? 200 : 300 }}>
                <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${person.color}20 0%, ${person.color}08 40%, #050505 100%)` }} />
                <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 30%, ${person.color}15 0%, transparent 60%)` }} />

                {/* Large decorative letter in modal header */}
                <div
                  className="absolute bottom-0 right-8 select-none pointer-events-none"
                  style={{
                    fontSize: 180,
                    fontWeight: 900,
                    lineHeight: 0.8,
                    color: person.color,
                    opacity: 0.06,
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  {person.name.charAt(0)}
                </div>

                {/* Top line accent */}
                <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: `linear-gradient(90deg, ${person.color}40, transparent 60%)` }} />

                {/* Back button with Fermer */}
                <button onClick={() => setOpenPerson(null)}
                  className="absolute top-4 left-4 flex items-center gap-2 px-3 pr-4 h-10 rounded-full z-10 hover:scale-105 transition-transform"
                  style={{ background: 'rgba(5,5,5,0.5)', backdropFilter: 'blur(8px)' }}>
                  <IconBack size={18} />
                  <span className="text-xs font-medium" style={{ color: 'rgba(245,240,234,0.8)' }}>Fermer</span>
                </button>

                {/* Country badge in header */}
                <div className="absolute top-4 right-4 z-10">
                  <span
                    className="px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider"
                    style={{
                      background: 'rgba(245,240,234,0.04)',
                      border: '0.5px solid rgba(245,240,234,0.1)',
                      color: 'rgba(245,240,234,0.6)',
                    }}
                  >
                    {person.country}
                  </span>
                </div>
              </div>

              <div className="px-6 md:px-8 -mt-20 relative z-10 pb-24 md:pb-10">
                {/* Domain badge */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg mb-3 text-xs font-semibold"
                  style={{ background: `${person.color}15`, border: `1px solid ${person.color}30`, color: person.color }}>
                  <DomainIcon domain={person.domain} color={person.color} />
                  {person.domain}
                </span>
                <h2 className="text-h2">{person.name}</h2>

                {/* Domaine section */}
                <div className="flex items-center gap-3 mt-4 px-4 py-3 rounded-xl" style={{ background: 'rgba(245,240,234,0.03)' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${person.color}15` }}>
                    <DomainIcon domain={person.domain} color={person.color} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: 'rgba(245,240,234,0.4)' }}>Domaine</p>
                    <p className="text-sm font-bold" style={{ color: '#f5f0ea' }}>{person.domain}</p>
                  </div>
                </div>

                {/* Biography */}
                <div className="mt-8">
                  <h3 className="text-h3 mb-3">Biographie</h3>
                  <p className="text-body leading-relaxed">{person.bio}</p>
                </div>

                {/* Decorative quote block */}
                <div className="mt-8 rounded-2xl p-6 relative overflow-hidden" style={{ background: `${person.color}06`, border: `1px solid ${person.color}15` }}>
                  {/* Large quote mark SVG */}
                  <div className="absolute top-3 left-4">
                    <QuoteMark color={person.color} />
                  </div>

                  {/* Subtle gradient accent in quote block */}
                  <div className="absolute top-0 left-0 w-1 h-full rounded-full" style={{ background: `linear-gradient(180deg, ${person.color}60, ${person.color}10)` }} />

                  <div className="relative pl-4 pt-6">
                    <p className="text-body italic leading-relaxed" style={{ color: '#f5f0ea', fontSize: 16 }}>{person.quote}</p>
                    <p className="text-xs mt-3 font-semibold" style={{ color: person.color }}>-- {person.name}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
