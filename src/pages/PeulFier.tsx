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

export default function PeulFier() {
  const isTablet = useIsTablet()
  const [showSplash, setShowSplash] = useState(!isTablet)
  const [openPerson, setOpenPerson] = useState<string | null>(null)
  const person = openPerson ? personalities.find((p) => p.id === openPerson) : null

  if (showSplash) return <SplashScreen icon={<img src={ic.stars} alt="" className="w-[120px] h-[120px] object-contain" />} title="Peul & Fier" onComplete={() => setShowSplash(false)} />

  return (
    <div className="min-h-screen relative">
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
            {personalities.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 0.06}>
                <button
                  onClick={() => setOpenPerson(p.id)}
                  className="rounded-2xl overflow-hidden relative text-left w-full card-hover group"
                  style={{ height: 260 }}
                >
                  <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${p.color}15 0%, #0c0b09 100%)` }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(5,5,5,0.95) 100%)' }} />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: 'rgba(5,5,5,0.5)', backdropFilter: 'blur(8px)', color: p.color }}>
                      {p.domain}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-h3 group-hover:text-[#b5824e] transition-colors">{p.name}</h3>
                    <p className="text-small mt-1">{p.country}</p>
                  </div>
                </button>
              </ScrollReveal>
            ))}
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
              <div className="relative" style={{ height: isTablet ? 180 : 300 }}>
                <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${person.color}20 0%, #050505 100%)` }} />
                <button onClick={() => setOpenPerson(null)}
                  className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center z-10 hover:scale-110 transition-transform"
                  style={{ background: 'rgba(5,5,5,0.5)', backdropFilter: 'blur(8px)' }}>
                  <IconBack size={18} />
                </button>
              </div>

              <div className="px-6 md:px-8 -mt-20 relative z-10 pb-24 md:pb-10">
                <span className="inline-block px-3 py-1.5 rounded-lg mb-3 text-xs font-semibold"
                  style={{ background: `${person.color}15`, border: `1px solid ${person.color}30`, color: person.color }}>
                  {person.domain}
                </span>
                <h2 className="text-h2">{person.name}</h2>
                <p className="text-body mt-1">{person.country}</p>

                <div className="mt-6">
                  <h3 className="text-h3 mb-3">Biographie</h3>
                  <p className="text-body leading-relaxed">{person.bio}</p>
                </div>

                <div className="mt-6 rounded-2xl p-5" style={{ background: `${person.color}08`, border: `1px solid ${person.color}15` }}>
                  <p className="text-body italic" style={{ color: '#f5f0ea' }}>{person.quote}</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
