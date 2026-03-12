import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SplashScreen from '../components/shared/SplashScreen'
import { IconPot, IconBack, IconHeart } from '../components/shared/Icons'
import ScrollReveal from '../components/shared/ScrollReveal'
import { useIsTablet } from '../hooks/useMediaQuery'
import recipesData from '../data/recipes.json'

interface Recipe {
  name: string; namePl: string; cat: string; time: string; diff: string; pers: string; desc: string; ingredients: string[]; steps: string[]
}

const recipes = Object.entries(recipesData as Record<string, Recipe>)

export default function Kitchen() {
  const isTablet = useIsTablet()
  const [showSplash, setShowSplash] = useState(!isTablet)
  const [filter, setFilter] = useState('tout')
  const [openRecipe, setOpenRecipe] = useState<string | null>(null)
  const [recipeTab, setRecipeTab] = useState<'ing' | 'steps'>('ing')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const filtered = filter === 'tout' ? recipes : recipes.filter(([, r]) => r.cat === filter)
  const toggleFav = (id: string) => {
    setFavorites((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next })
  }
  const openRecipeData = openRecipe ? recipesData[openRecipe as keyof typeof recipesData] as Recipe : null

  if (showSplash) {
    return <SplashScreen icon={<IconPot size={120} />} title="Pulaar Kitchen" onComplete={() => setShowSplash(false)} />
  }

  return (
    <div className="min-h-screen relative">
      {/* Hero */}
      <section className="section-padding pt-12 md:pt-20 pb-8 md:pb-12">
        <div className="content-max">
          <div className="amber-line" />
          <h1 className="text-hero">Pulaar Kitchen</h1>
          <p className="text-body mt-3 max-w-lg">Recettes traditionnelles peules transmises de generation en generation.</p>
        </div>
      </section>

      <section className="section-padding pb-24 md:pb-16">
        <div className="content-max">
          {/* Filter tabs */}
          <div className="flex gap-2 mb-8">
            {['tout', 'plat', 'dessert'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className="px-5 py-2.5 rounded-xl transition-all text-sm font-semibold capitalize"
                style={{
                  background: filter === tab ? 'rgba(181,130,78,0.15)' : 'rgba(245,240,234,0.04)',
                  border: filter === tab ? '1px solid rgba(181,130,78,0.3)' : '0.5px solid rgba(245,240,234,0.08)',
                  color: filter === tab ? '#b5824e' : 'rgba(245,240,234,0.5)',
                }}
              >
                {tab === 'tout' ? 'Tout' : tab === 'plat' ? 'Plats' : 'Desserts'}
              </button>
            ))}
          </div>

          {/* Recipe Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {filtered.map(([id, recipe], i) => (
              <ScrollReveal key={id} delay={i * 0.06}>
                <button
                  onClick={() => { setOpenRecipe(id); setRecipeTab('ing') }}
                  className="relative rounded-2xl overflow-hidden text-left w-full card-hover group"
                  style={{ height: 220 }}
                >
                  <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, #1a150e ${i * 5}%, #0c0b09 60%, #080706 100%)` }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(5,5,5,0.95) 100%)' }} />
                  {/* Time badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: 'rgba(5,5,5,0.6)', backdropFilter: 'blur(8px)', color: 'rgba(245,240,234,0.7)' }}>
                      {recipe.time}
                    </span>
                  </div>
                  {/* Fav */}
                  <button className="absolute top-3 right-3 p-2 hover:scale-110 transition-transform" onClick={(e) => { e.stopPropagation(); toggleFav(id) }}>
                    <IconHeart size={18} filled={favorites.has(id)} />
                  </button>
                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-h3 group-hover:text-[#b5824e] transition-colors">{recipe.name}</h3>
                    <p className="text-small mt-1">{recipe.namePl} · {recipe.diff}</p>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Recipe Modal — Desktop: centered overlay, Mobile: full slide */}
      <AnimatePresence>
        {openRecipe && openRecipeData && (
          <>
            {/* Backdrop (desktop only) */}
            {isTablet && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 hidden md:block"
                style={{ background: 'rgba(5,5,5,0.8)', backdropFilter: 'blur(8px)' }}
                onClick={() => setOpenRecipe(null)}
              />
            )}
            <motion.div
              initial={isTablet ? { opacity: 0, scale: 0.95, y: 20 } : { x: '100%' }}
              animate={isTablet ? { opacity: 1, scale: 1, y: 0 } : { x: 0 }}
              exit={isTablet ? { opacity: 0, scale: 0.95, y: 20 } : { x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={`fixed z-50 overflow-y-auto ${
                isTablet
                  ? 'inset-x-0 inset-y-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[700px] md:max-h-[85vh] md:rounded-3xl'
                  : 'inset-0'
              }`}
              style={{ background: '#050505', border: isTablet ? '1px solid rgba(245,240,234,0.08)' : 'none' }}
            >
              {/* Hero */}
              <div className="relative" style={{ height: isTablet ? 200 : 280 }}>
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1a150e 0%, #0c0b09 100%)' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 30%, #050505 100%)' }} />
                <button
                  onClick={() => setOpenRecipe(null)}
                  className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center z-10 hover:scale-110 transition-transform"
                  style={{ background: 'rgba(5,5,5,0.5)', backdropFilter: 'blur(8px)' }}
                >
                  <IconBack size={18} />
                </button>
              </div>

              <div className="px-6 md:px-8 -mt-16 relative z-10 pb-24 md:pb-10">
                <h2 className="text-h2">{openRecipeData.name}</h2>
                <p className="text-sm mt-1" style={{ color: '#b5824e' }}>{openRecipeData.namePl}</p>
                <p className="text-body mt-3">{openRecipeData.desc}</p>

                {/* Meta */}
                <div className="flex gap-3 mt-5">
                  {[
                    { label: 'Temps', value: openRecipeData.time },
                    { label: 'Difficulte', value: openRecipeData.diff },
                    { label: 'Portions', value: openRecipeData.pers },
                  ].map((m) => (
                    <div key={m.label} className="flex-1 py-3 rounded-xl text-center surface-card">
                      <p className="text-label text-[9px]">{m.label}</p>
                      <p className="text-sm font-bold mt-1" style={{ color: '#f5f0ea' }}>{m.value}</p>
                    </div>
                  ))}
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mt-6 mb-5">
                  {(['ing', 'steps'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setRecipeTab(tab)}
                      className="flex-1 py-3 rounded-xl transition-all text-sm font-semibold"
                      style={{
                        background: recipeTab === tab ? 'rgba(181,130,78,0.15)' : 'rgba(245,240,234,0.04)',
                        border: recipeTab === tab ? '1px solid rgba(181,130,78,0.3)' : '0.5px solid rgba(245,240,234,0.06)',
                        color: recipeTab === tab ? '#b5824e' : 'rgba(245,240,234,0.5)',
                      }}
                    >
                      {tab === 'ing' ? 'Ingredients' : 'Preparation'}
                    </button>
                  ))}
                </div>

                {recipeTab === 'ing' ? (
                  <ul className="flex flex-col gap-2.5">
                    {openRecipeData.ingredients.map((ing: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 py-1">
                        <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: '#b5824e' }} />
                        <span className="text-body">{ing}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ol className="flex flex-col gap-4">
                    {openRecipeData.steps.map((step: string, i: number) => (
                      <li key={i} className="flex gap-4">
                        <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold"
                          style={{ background: 'rgba(181,130,78,0.1)', color: '#b5824e' }}>{i + 1}</span>
                        <p className="text-body">{step}</p>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
