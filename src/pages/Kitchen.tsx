import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SplashScreen from '../components/shared/SplashScreen'
import { IconBack, IconHeart } from '../components/shared/Icons'
import ScrollReveal from '../components/shared/ScrollReveal'
import { useIsTablet } from '../hooks/useMediaQuery'
import recipesData from '../data/recipes.json'
import foodPhotos from '../data/food.json'
import icons from '../data/icons.json'

const ic = icons as Record<string, string>

interface Recipe {
  name: string; namePl: string; cat: string; time: string; diff: string; pers: string; desc: string; ingredients: string[]; steps: string[]
}

const recipes = Object.entries(recipesData as Record<string, Recipe>)
const photos = foodPhotos as Record<string, string>

/* ── Recipe Card Component ── */
function RecipeCard({
  id, recipe, height, fullWidth, isFav, onOpen, onToggleFav
}: {
  id: string; recipe: Recipe; height: number; fullWidth: boolean; isFav: boolean
  onOpen: () => void; onToggleFav: () => void
}) {
  return (
    <button
      onClick={onOpen}
      className="relative overflow-hidden text-left w-full group"
      style={{
        height,
        borderRadius: 22,
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {photos[id] && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${photos[id]})` }}
        />
      )}

      {/* Netflix-style gradient overlay: 92% to 65% opacity */}
      <div
        className="absolute inset-0"
        style={{
          background: fullWidth
            ? 'linear-gradient(180deg, rgba(5,5,5,0.08) 0%, rgba(5,5,5,0.15) 30%, rgba(5,5,5,0.65) 70%, rgba(5,5,5,0.92) 100%)'
            : 'linear-gradient(180deg, rgba(5,5,5,0.10) 0%, rgba(5,5,5,0.20) 30%, rgba(5,5,5,0.65) 65%, rgba(5,5,5,0.92) 100%)',
        }}
      />

      {/* Time badge + category badge */}
      <div className="absolute top-3 left-3 flex items-center gap-2">
        <span
          className="px-3 py-1.5 rounded-lg text-xs font-medium"
          style={{ background: 'rgba(5,5,5,0.6)', backdropFilter: 'blur(8px)', color: 'rgba(245,240,234,0.85)' }}
        >
          {recipe.time}
        </span>
        <span
          className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide"
          style={{
            background: 'rgba(181,130,78,0.15)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(181,130,78,0.25)',
            color: '#b5824e',
          }}
        >
          {recipe.cat === 'plat' ? 'Plat' : 'Dessert'}
        </span>
      </div>

      {/* Favorite button */}
      <button
        className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center hover:scale-110"
        style={{
          background: 'rgba(5,5,5,0.5)',
          backdropFilter: 'blur(8px)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => { e.stopPropagation(); onToggleFav() }}
      >
        <IconHeart size={16} filled={isFav} />
      </button>

      {/* Info at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3
          className="font-bold group-hover:text-[#b5824e]"
          style={{
            fontSize: fullWidth ? 22 : 17,
            color: '#f5f0ea',
            fontFamily: "'Outfit', sans-serif",
            transition: 'color 0.3s ease',
          }}
        >
          {recipe.name}
        </h3>
        <p className="text-small mt-1" style={{ color: 'rgba(245,240,234,0.5)' }}>
          {recipe.namePl} · {recipe.diff}
        </p>
        {fullWidth && (
          <p className="text-sm mt-2" style={{ color: 'rgba(245,240,234,0.4)', lineHeight: 1.5 }}>
            {recipe.desc.length > 80 ? recipe.desc.slice(0, 80) + '...' : recipe.desc}
          </p>
        )}
      </div>
    </button>
  )
}

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
    return <SplashScreen icon={<img src={ic.pot} alt="" className="w-[120px] h-[120px] object-contain" />} title="Pulaar Kitchen" onComplete={() => setShowSplash(false)} />
  }

  // Build alternating layout: 1 big card + 2 small side by side, repeat
  const renderAlternatingGrid = () => {
    const items = filtered
    const elements: JSX.Element[] = []
    let idx = 0

    while (idx < items.length) {
      // Big card (full width)
      const [bigId, bigRecipe] = items[idx]
      elements.push(
        <ScrollReveal key={bigId} delay={idx * 0.06}>
          <RecipeCard
            id={bigId}
            recipe={bigRecipe}
            height={360}
            fullWidth
            isFav={favorites.has(bigId)}
            onOpen={() => { setOpenRecipe(bigId); setRecipeTab('ing') }}
            onToggleFav={() => toggleFav(bigId)}
          />
        </ScrollReveal>
      )
      idx++

      // Two small cards side by side
      if (idx < items.length) {
        const smallPair: JSX.Element[] = []
        for (let j = 0; j < 2 && idx < items.length; j++, idx++) {
          const [smallId, smallRecipe] = items[idx]
          smallPair.push(
            <ScrollReveal key={smallId} delay={idx * 0.06}>
              <RecipeCard
                id={smallId}
                recipe={smallRecipe}
                height={240}
                fullWidth={false}
                isFav={favorites.has(smallId)}
                onOpen={() => { setOpenRecipe(smallId); setRecipeTab('ing') }}
                onToggleFav={() => toggleFav(smallId)}
              />
            </ScrollReveal>
          )
        }
        elements.push(
          <div key={`pair-${idx}`} className="grid grid-cols-2 gap-4">
            {smallPair}
          </div>
        )
      }
    }

    return elements
  }

  return (
    <div className="min-h-screen relative" style={{ fontFamily: "'Outfit', sans-serif" }}>
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
                className="px-5 py-2.5 rounded-xl text-sm font-semibold capitalize"
                style={{
                  background: filter === tab ? 'rgba(181,130,78,0.15)' : 'rgba(245,240,234,0.04)',
                  border: filter === tab ? '1px solid rgba(181,130,78,0.3)' : '0.5px solid rgba(245,240,234,0.08)',
                  color: filter === tab ? '#b5824e' : 'rgba(245,240,234,0.5)',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {tab === 'tout' ? 'Tout' : tab === 'plat' ? 'Plats' : 'Desserts'}
              </button>
            ))}
          </div>

          {/* Alternating Recipe Grid */}
          <div className="flex flex-col gap-4 md:gap-6">
            {renderAlternatingGrid()}
          </div>
        </div>
      </section>

      {/* Recipe Modal */}
      <AnimatePresence>
        {openRecipe && openRecipeData && (
          <>
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
              {/* Hero with food photo */}
              <div className="relative" style={{ height: isTablet ? 240 : 300 }}>
                {photos[openRecipe] && (
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${photos[openRecipe]})` }}
                  />
                )}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(5,5,5,0.2) 0%, rgba(5,5,5,0.4) 50%, #050505 100%)' }} />

                {/* Back button with Fermer text */}
                <button
                  onClick={() => setOpenRecipe(null)}
                  className="absolute top-4 left-4 flex items-center gap-2 px-3 pr-4 h-10 rounded-full z-10 hover:scale-105 transition-transform"
                  style={{ background: 'rgba(5,5,5,0.5)', backdropFilter: 'blur(8px)' }}
                >
                  <IconBack size={18} />
                  <span className="text-xs font-medium" style={{ color: 'rgba(245,240,234,0.8)' }}>Fermer</span>
                </button>

                {/* Favorite button in modal */}
                <button
                  className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center z-10 hover:scale-110 transition-transform"
                  style={{ background: 'rgba(5,5,5,0.5)', backdropFilter: 'blur(8px)' }}
                  onClick={() => toggleFav(openRecipe)}
                >
                  <IconHeart size={18} filled={favorites.has(openRecipe)} />
                </button>

                {/* Category badge in modal hero */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
                  <span
                    className="px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider"
                    style={{ background: 'rgba(181,130,78,0.2)', border: '1px solid rgba(181,130,78,0.3)', color: '#b5824e' }}
                  >
                    {openRecipeData.cat === 'plat' ? 'Plat' : 'Dessert'}
                  </span>
                </div>
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
                      className="flex-1 py-3 rounded-xl text-sm font-semibold"
                      style={{
                        background: recipeTab === tab ? 'rgba(181,130,78,0.15)' : 'rgba(245,240,234,0.04)',
                        border: recipeTab === tab ? '1px solid rgba(181,130,78,0.3)' : '0.5px solid rgba(245,240,234,0.06)',
                        color: recipeTab === tab ? '#b5824e' : 'rgba(245,240,234,0.5)',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      {tab === 'ing' ? 'Ingredients' : 'Preparation'}
                    </button>
                  ))}
                </div>

                {recipeTab === 'ing' ? (
                  <ul className="flex flex-col gap-0">
                    {openRecipeData.ingredients.map((ing: string, i: number) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 px-4 py-3 rounded-xl"
                        style={{
                          background: i % 2 === 0 ? 'rgba(245,240,234,0.03)' : 'transparent',
                        }}
                      >
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
