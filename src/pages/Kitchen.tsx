import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import SplashScreen from '../components/shared/SplashScreen'
import { IconPot, IconBack, IconHeart, IconShare } from '../components/shared/Icons'
import recipesData from '../data/recipes.json'

interface Recipe {
  name: string
  namePl: string
  cat: string
  time: string
  diff: string
  pers: string
  desc: string
  ingredients: string[]
  steps: string[]
}

const recipes = Object.entries(recipesData as Record<string, Recipe>)

export default function Kitchen() {
  const navigate = useNavigate()
  const [showSplash, setShowSplash] = useState(true)
  const [filter, setFilter] = useState('tout')
  const [openRecipe, setOpenRecipe] = useState<string | null>(null)
  const [recipeTab, setRecipeTab] = useState<'ing' | 'steps'>('ing')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const filtered = filter === 'tout' ? recipes : recipes.filter(([, r]) => r.cat === filter)

  const toggleFav = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const openRecipeData = openRecipe ? recipesData[openRecipe as keyof typeof recipesData] as Recipe : null

  if (showSplash) {
    return (
      <SplashScreen
        icon={<IconPot size={120} />}
        title="Pulaar Kitchen"
        onComplete={() => setShowSplash(false)}
      />
    )
  }

  return (
    <div className="min-h-screen relative">
      <div className="px-5 pt-6 pb-24">
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#f5f0ea', marginBottom: 4 }}>
          Pulaar Kitchen
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(245,240,234,0.5)', marginBottom: 20 }}>
          Recettes traditionnelles peules
        </p>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {['tout', 'plat', 'dessert'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className="px-4 py-2 rounded-xl transition-all"
              style={{
                background: filter === tab ? 'rgba(181,130,78,0.15)' : 'rgba(245,240,234,0.04)',
                border: filter === tab ? '1px solid rgba(181,130,78,0.3)' : '0.5px solid rgba(245,240,234,0.08)',
                color: filter === tab ? '#b5824e' : 'rgba(245,240,234,0.5)',
                fontSize: 13,
                fontWeight: 600,
                textTransform: 'capitalize' as const,
              }}
            >
              {tab === 'tout' ? 'Tout' : tab === 'plat' ? 'Plats' : 'Desserts'}
            </button>
          ))}
        </div>

        {/* Recipe cards */}
        <div className="flex flex-col gap-3">
          {filtered.map(([id, recipe], i) => (
            <motion.button
              key={id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => { setOpenRecipe(id); setRecipeTab('ing') }}
              className="relative rounded-2xl overflow-hidden text-left transition-transform active:scale-[0.98]"
              style={{ height: i % 3 === 0 ? 200 : 160 }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, #1a150e ${i * 5}%, #0c0b09 60%, #080706 100%)`,
                }}
              />
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(180deg, transparent 40%, rgba(5,5,5,0.92) 100%)',
              }} />
              {/* Time badge */}
              <div className="absolute top-3 left-3">
                <span
                  className="px-2.5 py-1 rounded-lg"
                  style={{
                    background: 'rgba(5,5,5,0.6)',
                    backdropFilter: 'blur(8px)',
                    fontSize: 11,
                    fontWeight: 500,
                    color: 'rgba(245,240,234,0.7)',
                  }}
                >
                  {recipe.time}
                </span>
              </div>
              {/* Fav button */}
              <button
                className="absolute top-3 right-3 p-2"
                onClick={(e) => { e.stopPropagation(); toggleFav(id) }}
              >
                <IconHeart size={18} filled={favorites.has(id)} />
              </button>
              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#f5f0ea' }}>{recipe.name}</h3>
                <p style={{ fontSize: 12, color: 'rgba(245,240,234,0.5)', marginTop: 2 }}>
                  {recipe.namePl} · {recipe.diff}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Recipe Modal */}
      <AnimatePresence>
        {openRecipe && openRecipeData && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 overflow-y-auto"
            style={{ background: '#050505' }}
          >
            {/* Hero */}
            <div className="relative" style={{ height: 280 }}>
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(135deg, #1a150e 0%, #0c0b09 100%)',
              }} />
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(180deg, transparent 30%, #050505 100%)',
              }} />
              <button
                onClick={() => setOpenRecipe(null)}
                className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center z-10"
                style={{ background: 'rgba(5,5,5,0.5)', backdropFilter: 'blur(8px)' }}
              >
                <IconBack size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="px-5 -mt-16 relative z-10 pb-24">
              <h2 style={{ fontSize: 26, fontWeight: 800, color: '#f5f0ea' }}>{openRecipeData.name}</h2>
              <p style={{ fontSize: 14, color: '#b5824e', marginTop: 4 }}>{openRecipeData.namePl}</p>
              <p style={{ fontSize: 13, color: 'rgba(245,240,234,0.5)', marginTop: 8, lineHeight: 1.6 }}>
                {openRecipeData.desc}
              </p>

              {/* Meta */}
              <div className="flex gap-4 mt-5">
                {[
                  { label: 'Temps', value: openRecipeData.time },
                  { label: 'Difficulte', value: openRecipeData.diff },
                  { label: 'Portions', value: openRecipeData.pers },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="flex-1 py-3 rounded-xl text-center"
                    style={{ background: 'rgba(245,240,234,0.04)', border: '0.5px solid rgba(245,240,234,0.06)' }}
                  >
                    <p style={{ fontSize: 10, color: 'rgba(245,240,234,0.4)', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>
                      {m.label}
                    </p>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#f5f0ea', marginTop: 4 }}>{m.value}</p>
                  </div>
                ))}
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mt-6 mb-4">
                {(['ing', 'steps'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setRecipeTab(tab)}
                    className="flex-1 py-3 rounded-xl transition-all"
                    style={{
                      background: recipeTab === tab ? 'rgba(181,130,78,0.15)' : 'rgba(245,240,234,0.04)',
                      border: recipeTab === tab ? '1px solid rgba(181,130,78,0.3)' : '0.5px solid rgba(245,240,234,0.06)',
                      color: recipeTab === tab ? '#b5824e' : 'rgba(245,240,234,0.5)',
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    {tab === 'ing' ? 'Ingredients' : 'Preparation'}
                  </button>
                ))}
              </div>

              {recipeTab === 'ing' ? (
                <ul className="flex flex-col gap-2">
                  {openRecipeData.ingredients.map((ing: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 py-2">
                      <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#b5824e' }} />
                      <span style={{ fontSize: 14, color: 'rgba(245,240,234,0.7)', lineHeight: 1.5 }}>{ing}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <ol className="flex flex-col gap-4">
                  {openRecipeData.steps.map((step: string, i: number) => (
                    <li key={i} className="flex gap-4">
                      <span
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: 'rgba(181,130,78,0.1)', fontSize: 13, fontWeight: 700, color: '#b5824e' }}
                      >
                        {i + 1}
                      </span>
                      <p style={{ fontSize: 14, color: 'rgba(245,240,234,0.7)', lineHeight: 1.6 }}>{step}</p>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
