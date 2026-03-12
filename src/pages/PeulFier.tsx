import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SplashScreen from '../components/shared/SplashScreen'
import { IconStars, IconBack } from '../components/shared/Icons'

const personalities = [
  { id: 'baaba', name: 'Baaba Maal', domain: 'Musique', country: 'Senegal', bio: 'Baaba Maal est un chanteur et musicien senegalais originaire de Podor, dans le Fouta-Toro. Figure majeure de la musique africaine, il chante en pulaar et porte fièrement son heritage peul a travers le monde.', quote: '"La musique est le pont entre les cultures."', color: '#b5824e' },
  { id: 'oumou', name: 'Oumou Sangare', domain: 'Musique', country: 'Mali', bio: 'Oumou Sangare est une chanteuse et compositrice malienne, ambassadrice de la musique wassoulou. Elle utilise sa musique pour defendre les droits des femmes et celebrer la culture peule.', quote: '"La voix des femmes est la force de l\'Afrique."', color: '#c49a62' },
  { id: 'hampate', name: 'Amadou Hampate Ba', domain: 'Litterature', country: 'Mali', bio: 'Ecrivain, historien et ethnologue malien d\'origine peule. Sa celebre phrase "En Afrique, quand un vieillard meurt, c\'est une bibliotheque qui brule" reste gravee dans l\'histoire.', quote: '"En Afrique, quand un vieillard meurt, c\'est une bibliotheque qui brule."', color: '#d4a24e' },
  { id: 'sekouba', name: 'Sekouba Bambino', domain: 'Musique', country: 'Guinee', bio: 'Chanteur guineen d\'origine peule, Sekouba Bambino Diabate est une voix majeure de la musique mandingue et peule. Il porte les valeurs du pulaaku dans chacune de ses performances.', quote: '"La musique peule parle au coeur de chaque Africain."', color: '#b87333' },
  { id: 'sona', name: 'Sona Jobarteh', domain: 'Musique', country: 'Gambie', bio: 'Premiere femme joueuse professionnelle de kora d\'Afrique de l\'Ouest. Elle brise les traditions pour porter la culture griotique a un niveau international.', quote: '"L\'heritage n\'a pas de genre."', color: '#a8a8a8' },
  { id: 'macky', name: 'Macky Sall', domain: 'Politique', country: 'Senegal', bio: 'Ancien president de la Republique du Senegal (2012-2024) et ancien president de l\'Union Africaine. D\'origine peule du Fouta-Toro, il a marque la politique senegalaise et africaine.', quote: '"Le Senegal est debout."', color: '#b5824e' },
]

export default function PeulFier() {
  const [showSplash, setShowSplash] = useState(true)
  const [openPerson, setOpenPerson] = useState<string | null>(null)

  const person = openPerson ? personalities.find((p) => p.id === openPerson) : null

  if (showSplash) {
    return (
      <SplashScreen
        icon={<IconStars size={120} />}
        title="Peul & Fier"
        onComplete={() => setShowSplash(false)}
      />
    )
  }

  return (
    <div className="min-h-screen relative">
      <div className="px-5 pt-6 pb-24">
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#f5f0ea', marginBottom: 4 }}>
          Peul & Fier
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(245,240,234,0.5)', marginBottom: 20 }}>
          Personnalites peules inspirantes
        </p>

        <div className="grid grid-cols-2 gap-3">
          {personalities.map((p, i) => (
            <motion.button
              key={p.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => setOpenPerson(p.id)}
              className="rounded-2xl overflow-hidden relative text-left transition-transform active:scale-[0.97]"
              style={{ height: 200 }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${p.color}15 0%, #0c0b09 100%)`,
                }}
              />
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(180deg, transparent 30%, rgba(5,5,5,0.95) 100%)',
              }} />
              <div className="absolute top-4 left-4">
                <span
                  className="px-2 py-1 rounded-md"
                  style={{
                    background: 'rgba(5,5,5,0.5)',
                    backdropFilter: 'blur(8px)',
                    fontSize: 10,
                    fontWeight: 600,
                    color: p.color,
                  }}
                >
                  {p.domain}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#f5f0ea' }}>{p.name}</h3>
                <p style={{ fontSize: 11, color: 'rgba(245,240,234,0.4)', marginTop: 2 }}>
                  {p.country}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Person detail */}
      <AnimatePresence>
        {person && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 overflow-y-auto"
            style={{ background: '#050505' }}
          >
            <div className="relative" style={{ height: 300 }}>
              <div className="absolute inset-0" style={{
                background: `linear-gradient(180deg, ${person.color}20 0%, #050505 100%)`,
              }} />
              <button
                onClick={() => setOpenPerson(null)}
                className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center z-10"
                style={{ background: 'rgba(5,5,5,0.5)', backdropFilter: 'blur(8px)' }}
              >
                <IconBack size={18} />
              </button>
            </div>

            <div className="px-5 -mt-20 relative z-10 pb-24">
              <span
                className="inline-block px-3 py-1 rounded-lg mb-3"
                style={{ background: `${person.color}15`, border: `1px solid ${person.color}30`, fontSize: 12, fontWeight: 600, color: person.color }}
              >
                {person.domain}
              </span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: '#f5f0ea' }}>{person.name}</h2>
              <p style={{ fontSize: 14, color: 'rgba(245,240,234,0.5)', marginTop: 2 }}>{person.country}</p>

              <div className="mt-6">
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f5f0ea', marginBottom: 8 }}>
                  Biographie
                </h3>
                <p style={{ fontSize: 14, color: 'rgba(245,240,234,0.6)', lineHeight: 1.7 }}>
                  {person.bio}
                </p>
              </div>

              <div
                className="mt-6 rounded-2xl p-5"
                style={{
                  background: `${person.color}08`,
                  border: `1px solid ${person.color}15`,
                }}
              >
                <p style={{ fontSize: 16, color: '#f5f0ea', fontStyle: 'italic', lineHeight: 1.6 }}>
                  {person.quote}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
