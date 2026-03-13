import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/shared/Logo'
import { IconMale, IconFemale } from '../components/shared/Icons'
import GrainOverlay from '../components/shared/GrainOverlay'
import { useUserStore } from '../stores/userStore'
import avatarsData from '../data/avatars.json'

/* ─── Types & Constants ─── */
type Step = 'splash' | 'login' | 'genre' | 'avatar' | 'profil' | 'welcome'

const STEPS: Step[] = ['splash', 'login', 'genre', 'avatar', 'profil', 'welcome']

const COUNTRIES = [
  'Guinee', 'Senegal', 'Mali', 'Mauritanie', 'Cameroun',
  'Nigeria', 'Sierra Leone', "Cote d'Ivoire", 'Burkina Faso', 'Guinee-Bissau',
]

const LEVELS = ['Debutant', 'Intermediaire', 'Courant']

const SOURCES = [
  'Facebook', 'Instagram', 'TikTok', 'Snapchat',
  'YouTube', 'Bouche a oreille', 'Autre',
]

const MALE_AVATARS = ['suka', 'gaynaako', 'djaambaaro', 'nagge', 'mawdo']
const FEMALE_AVATARS = ['debbopullo', 'janginoowo', 'daragol', 'neene', 'pinal']

const SPRING = { type: 'spring' as const, stiffness: 300, damping: 28 }
const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const

/* ─── Helpers ─── */
function getAvatarSrc(b64: string): string {
  if (b64.startsWith('data:')) return b64
  return `data:image/jpeg;base64,${b64}`
}

/* ─── Progress Bar ─── */
function ProgressBar({ currentStep }: { currentStep: Step }) {
  const visibleSteps: Step[] = ['login', 'genre', 'avatar', 'profil']
  const idx = visibleSteps.indexOf(currentStep)

  if (currentStep === 'splash' || currentStep === 'welcome') return null

  return (
    <div className="absolute top-0 left-0 right-0 z-20 flex gap-2 px-8 pt-5">
      {visibleSteps.map((s, i) => (
        <motion.div
          key={s}
          className="flex-1 h-[3px] rounded-full overflow-hidden"
          style={{ background: 'rgba(245,240,234,0.06)' }}
        >
          <motion.div
            className="h-full rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: i <= idx ? '100%' : '0%' }}
            transition={{ duration: 0.6, ease: [...EASE_PREMIUM] }}
            style={{
              background: 'linear-gradient(90deg, #b5824e, #c49a62)',
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}

/* ─── Shimmer Logo ─── */
function ShimmerLogo({ size = 36 }: { size?: number }) {
  return (
    <div className="relative inline-flex items-center overflow-hidden">
      <Logo size={size} />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(245,240,234,0.12) 50%, transparent 60%)',
        }}
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
      />
    </div>
  )
}

/* ─── Main Component ─── */
export default function Onboarding() {
  const navigate = useNavigate()
  const { isOnboarded, setField, completeOnboarding } = useUserStore()

  const [step, setStep] = useState<Step>('splash')
  const [genre, setGenre] = useState<'gorko' | 'debbo' | null>(null)
  const [avatarKey, setAvatarKey] = useState<string | null>(null)
  const [prenom, setPrenom] = useState('')
  const [nom, setNom] = useState('')
  const [dateNaissance, setDateNaissance] = useState('')
  const [paysRacine, setPaysRacine] = useState('')
  const [villeOrigine, setVilleOrigine] = useState('')
  const [paysActuel, setPaysActuel] = useState('')
  const [niveau, setNiveau] = useState('')
  const [selectedSources, setSelectedSources] = useState<string[]>([])

  // Redirect if already onboarded
  useEffect(() => {
    if (isOnboarded) navigate('/', { replace: true })
  }, [isOnboarded, navigate])

  // Splash auto-advance
  useEffect(() => {
    if (step === 'splash') {
      const timer = setTimeout(() => setStep('login'), 2800)
      return () => clearTimeout(timer)
    }
  }, [step])

  // Reset avatar when genre changes
  useEffect(() => {
    setAvatarKey(null)
  }, [genre])

  // Filter avatars by genre: 5 avatars per genre
  const filteredAvatars = useMemo(() => {
    const keys = genre === 'gorko' ? MALE_AVATARS : FEMALE_AVATARS
    const data = avatarsData as Record<string, { b64: string }>
    return keys
      .filter((k) => data[k])
      .map((k) => ({ key: k, b64: data[k].b64 }))
  }, [genre])

  const toggleSource = useCallback((s: string) => {
    setSelectedSources((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    )
  }, [])

  const handleComplete = useCallback(() => {
    setField('prenom', prenom)
    setField('nom', nom)
    setField('genre', genre)
    setField('avatarId', avatarKey)
    setField('dateNaissance', dateNaissance)
    setField('paysRacine', paysRacine)
    setField('villeOrigine', villeOrigine)
    setField('paysActuel', paysActuel)
    setField('niveauPulaar', niveau)
    setField('source', selectedSources)
    completeOnboarding()
    navigate('/')
  }, [prenom, nom, genre, avatarKey, dateNaissance, paysRacine, villeOrigine, paysActuel, niveau, selectedSources, setField, completeOnboarding, navigate])

  const canFinishProfil = prenom.trim() && nom.trim()

  /* ─── Slide Variants ─── */
  const slideVariants = {
    enter: { opacity: 0, x: 80, scale: 0.98 },
    center: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -80, scale: 0.98 },
  }

  /* ─── Shared Styles ─── */
  const inputStyle: React.CSSProperties = {
    background: 'rgba(245,240,234,0.04)',
    border: '0.5px solid rgba(245,240,234,0.1)',
    fontSize: 15,
    color: '#f5f0ea',
    outline: 'none',
    fontFamily: 'Outfit, sans-serif',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: 12,
    color: 'rgba(245,240,234,0.5)',
    fontWeight: 500,
    fontFamily: 'Outfit, sans-serif',
    marginBottom: 6,
    display: 'block',
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ background: '#050505', fontFamily: 'Outfit, sans-serif' }}
    >
      <GrainOverlay />
      <div className="w-full max-w-md h-full flex flex-col relative overflow-hidden">
        <ProgressBar currentStep={step} />

        <AnimatePresence mode="wait">
          {/* ━━━ SPLASH ━━━ */}
          {step === 'splash' && (
            <motion.div
              key="splash"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.08 }}
              transition={{ duration: 0.7, ease: [...EASE_PREMIUM] }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ShimmerLogo size={72} />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                style={{
                  fontSize: 14,
                  color: 'rgba(245,240,234,0.35)',
                  marginTop: 16,
                  fontWeight: 300,
                  letterSpacing: '0.04em',
                }}
              >
                L'app de la fierte Peule
              </motion.p>

              <motion.div
                className="mt-6 h-[2px] rounded-full"
                style={{
                  width: 80,
                  background: 'linear-gradient(90deg, transparent, #b5824e, transparent)',
                }}
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          )}

          {/* ━━━ LOGIN ━━━ */}
          {step === 'login' && (
            <motion.div
              key="login"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [...EASE_PREMIUM] }}
              className="flex-1 flex flex-col items-center justify-center px-8"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <Logo size={40} />
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.5 }}
                style={{
                  fontSize: 14,
                  color: 'rgba(245,240,234,0.45)',
                  marginTop: 14,
                  textAlign: 'center',
                  fontWeight: 300,
                }}
              >
                Bien plus qu'une langue, une communaute.
              </motion.p>

              <div className="w-full mt-12 flex flex-col gap-3">
                {/* Google button */}
                <motion.button
                  whileHover={{ scale: 1.01, borderColor: 'rgba(181,130,78,0.3)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setStep('genre')}
                  className="w-full py-4 rounded-2xl flex items-center justify-center gap-3"
                  style={{
                    background: 'rgba(245,240,234,0.04)',
                    border: '0.5px solid rgba(245,240,234,0.1)',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(181,130,78,0.08)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#f5f0ea' }}>
                    Continuer avec Google
                  </span>
                </motion.button>

                {/* Apple button */}
                <motion.button
                  whileHover={{ scale: 1.01, borderColor: 'rgba(181,130,78,0.3)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setStep('genre')}
                  className="w-full py-4 rounded-2xl flex items-center justify-center gap-3"
                  style={{
                    background: 'rgba(245,240,234,0.04)',
                    border: '0.5px solid rgba(245,240,234,0.1)',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(181,130,78,0.08)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#f5f0ea">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#f5f0ea' }}>
                    Continuer avec Apple
                  </span>
                </motion.button>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep('genre')}
                className="mt-5"
                style={{ fontSize: 13, color: 'rgba(245,240,234,0.35)', fontWeight: 400 }}
              >
                S'inscrire avec un email
              </motion.button>

              <p
                className="mt-auto mb-6"
                style={{
                  fontSize: 10,
                  color: 'rgba(245,240,234,0.18)',
                  textAlign: 'center',
                  lineHeight: 1.5,
                }}
              >
                En continuant, tu acceptes les CGU et la politique de confidentialite.
              </p>
            </motion.div>
          )}

          {/* ━━━ GENRE ━━━ */}
          {step === 'genre' && (
            <motion.div
              key="genre"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [...EASE_PREMIUM] }}
              className="flex-1 flex flex-col items-center justify-center px-8"
            >
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: '#f5f0ea',
                  textAlign: 'center',
                  marginBottom: 8,
                }}
              >
                Tu es...
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                style={{
                  fontSize: 14,
                  color: 'rgba(245,240,234,0.4)',
                  marginBottom: 32,
                }}
              >
                Pour personnaliser ton experience
              </motion.p>

              <div className="w-full flex gap-4">
                {([
                  { id: 'gorko' as const, label: 'Gorko', sub: 'Homme', Icon: IconMale },
                  { id: 'debbo' as const, label: 'Debbo', sub: 'Femme', Icon: IconFemale },
                ]).map(({ id, label, sub, Icon }, i) => (
                  <motion.button
                    key={id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.1, ...SPRING }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setGenre(id)
                      setTimeout(() => setStep('avatar'), 450)
                    }}
                    className="flex-1 py-10 rounded-3xl flex flex-col items-center gap-4"
                    style={{
                      background: genre === id
                        ? 'rgba(181,130,78,0.08)'
                        : 'rgba(245,240,234,0.03)',
                      border: genre === id
                        ? '1.5px solid rgba(181,130,78,0.4)'
                        : '0.5px solid rgba(245,240,234,0.06)',
                      transition: 'background 0.3s ease, border-color 0.3s ease',
                    }}
                  >
                    <Icon size={64} />
                    <div className="text-center">
                      <p style={{ fontSize: 20, fontWeight: 700, color: '#f5f0ea' }}>{label}</p>
                      <p style={{ fontSize: 13, color: 'rgba(245,240,234,0.4)', marginTop: 2 }}>{sub}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ━━━ AVATAR ━━━ */}
          {step === 'avatar' && (
            <motion.div
              key="avatar"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [...EASE_PREMIUM] }}
              className="flex-1 flex flex-col items-center justify-center px-8"
            >
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: '#f5f0ea',
                  marginBottom: 8,
                  textAlign: 'center',
                }}
              >
                Choisis ton avatar Peul
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{
                  fontSize: 14,
                  color: 'rgba(245,240,234,0.4)',
                  marginBottom: 32,
                }}
              >
                {genre === 'gorko' ? '5 avatars masculins' : '5 avatars feminins'}
              </motion.p>

              {/* Grid: 3 top row, 2 bottom centered */}
              <div className="flex flex-col items-center gap-5 mb-10">
                {/* Row 1: first 3 */}
                <div className="flex gap-5 justify-center">
                  {filteredAvatars.slice(0, 3).map((av, i) => (
                    <AvatarButton
                      key={av.key}
                      avatarKey={av.key}
                      b64={av.b64}
                      selected={avatarKey === av.key}
                      onSelect={setAvatarKey}
                      delay={0.15 + i * 0.07}
                    />
                  ))}
                </div>
                {/* Row 2: last 2 centered */}
                <div className="flex gap-5 justify-center">
                  {filteredAvatars.slice(3, 5).map((av, i) => (
                    <AvatarButton
                      key={av.key}
                      avatarKey={av.key}
                      b64={av.b64}
                      selected={avatarKey === av.key}
                      onSelect={setAvatarKey}
                      delay={0.35 + i * 0.07}
                    />
                  ))}
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => avatarKey && setStep('profil')}
                disabled={!avatarKey}
                className="w-full py-4 rounded-2xl font-semibold"
                style={{
                  background: avatarKey
                    ? 'linear-gradient(135deg, #b5824e, #9a6d3c)'
                    : 'rgba(245,240,234,0.06)',
                  color: avatarKey ? '#050505' : 'rgba(245,240,234,0.25)',
                  fontSize: 15,
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  cursor: avatarKey ? 'pointer' : 'not-allowed',
                }}
              >
                Continuer
              </motion.button>
            </motion.div>
          )}

          {/* ━━━ PROFIL ━━━ */}
          {step === 'profil' && (
            <motion.div
              key="profil"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [...EASE_PREMIUM] }}
              className="flex-1 flex flex-col px-6 pt-12 pb-6 overflow-y-auto"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{ fontSize: 22, fontWeight: 700, color: '#f5f0ea' }}
              >
                Parle-nous de toi
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{
                  fontSize: 13,
                  color: 'rgba(245,240,234,0.4)',
                  marginTop: 4,
                  marginBottom: 28,
                }}
              >
                Pour personnaliser ton experience
              </motion.p>

              <div className="flex flex-col gap-5">
                {/* Prenom + Nom side by side */}
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label style={labelStyle}>Prenom</label>
                    <input
                      type="text"
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                      placeholder="Amadou"
                      className="w-full px-4 py-3.5 rounded-xl focus:ring-1 focus:ring-amber-700/30"
                      style={inputStyle}
                    />
                  </div>
                  <div className="flex-1">
                    <label style={labelStyle}>Nom de famille</label>
                    <input
                      type="text"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      placeholder="Diallo"
                      className="w-full px-4 py-3.5 rounded-xl focus:ring-1 focus:ring-amber-700/30"
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Date de naissance */}
                <div>
                  <label style={labelStyle}>Date de naissance</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={dateNaissance}
                      onChange={(e) => setDateNaissance(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl focus:ring-1 focus:ring-amber-700/30"
                      style={{
                        ...inputStyle,
                        colorScheme: 'dark',
                      }}
                    />
                  </div>
                </div>

                {/* Tes racines - dropdown */}
                <div>
                  <label style={labelStyle}>Tes racines</label>
                  <select
                    value={paysRacine}
                    onChange={(e) => setPaysRacine(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl focus:ring-1 focus:ring-amber-700/30 appearance-none"
                    style={{
                      ...inputStyle,
                      color: paysRacine ? '#f5f0ea' : 'rgba(245,240,234,0.3)',
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23b5824e' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 16px center',
                      paddingRight: 40,
                    }}
                  >
                    <option value="">Selectionner un pays</option>
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Ville / Village d'origine */}
                <div>
                  <label style={labelStyle}>Ville / Village d'origine</label>
                  <input
                    type="text"
                    value={villeOrigine}
                    onChange={(e) => setVilleOrigine(e.target.value)}
                    placeholder="Labe, Futa Jalon..."
                    className="w-full px-4 py-3.5 rounded-xl focus:ring-1 focus:ring-amber-700/30"
                    style={inputStyle}
                  />
                </div>

                {/* Tu vis ou aujourd'hui */}
                <div>
                  <label style={labelStyle}>Tu vis ou aujourd'hui ?</label>
                  <input
                    type="text"
                    value={paysActuel}
                    onChange={(e) => setPaysActuel(e.target.value)}
                    placeholder="Paris, France"
                    className="w-full px-4 py-3.5 rounded-xl focus:ring-1 focus:ring-amber-700/30"
                    style={inputStyle}
                  />
                </div>

                {/* Niveau en pulaar */}
                <div>
                  <label style={labelStyle}>Niveau en pulaar</label>
                  <div className="flex gap-2">
                    {LEVELS.map((l) => (
                      <motion.button
                        key={l}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setNiveau(l)}
                        className="flex-1 py-3 rounded-xl"
                        style={{
                          background: niveau === l
                            ? 'rgba(181,130,78,0.12)'
                            : 'rgba(245,240,234,0.04)',
                          border: niveau === l
                            ? '1px solid rgba(181,130,78,0.35)'
                            : '0.5px solid rgba(245,240,234,0.08)',
                          color: niveau === l ? '#c49a62' : 'rgba(245,240,234,0.45)',
                          fontSize: 13,
                          fontWeight: 600,
                          transition: 'all 0.25s ease',
                          fontFamily: 'Outfit, sans-serif',
                        }}
                      >
                        {l}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Comment tu as connu PULAAR+ */}
                <div>
                  <label style={labelStyle}>Comment tu as connu PULAAR+ ?</label>
                  <div className="flex flex-wrap gap-2">
                    {SOURCES.map((s) => (
                      <motion.button
                        key={s}
                        whileTap={{ scale: 0.93 }}
                        onClick={() => toggleSource(s)}
                        className="px-4 py-2.5 rounded-full"
                        style={{
                          background: selectedSources.includes(s)
                            ? 'rgba(181,130,78,0.12)'
                            : 'rgba(245,240,234,0.04)',
                          border: selectedSources.includes(s)
                            ? '1px solid rgba(181,130,78,0.35)'
                            : '0.5px solid rgba(245,240,234,0.08)',
                          color: selectedSources.includes(s)
                            ? '#c49a62'
                            : 'rgba(245,240,234,0.45)',
                          fontSize: 12,
                          fontWeight: 500,
                          transition: 'all 0.25s ease',
                          fontFamily: 'Outfit, sans-serif',
                        }}
                      >
                        {s}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Continue button */}
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => canFinishProfil && setStep('welcome')}
                disabled={!canFinishProfil}
                className="w-full py-4 rounded-2xl font-semibold mt-8 mb-2 shrink-0"
                style={{
                  background: canFinishProfil
                    ? 'linear-gradient(135deg, #b5824e, #9a6d3c)'
                    : 'rgba(245,240,234,0.06)',
                  color: canFinishProfil ? '#050505' : 'rgba(245,240,234,0.25)',
                  fontSize: 15,
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  cursor: canFinishProfil ? 'pointer' : 'not-allowed',
                }}
              >
                Continuer
              </motion.button>
            </motion.div>
          )}

          {/* ━━━ WELCOME ━━━ */}
          {step === 'welcome' && (
            <motion.div
              key="welcome"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [...EASE_PREMIUM] }}
              className="flex-1 flex flex-col items-center justify-center px-8"
            >
              {/* Selected avatar */}
              {avatarKey && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ ...SPRING, delay: 0.1 }}
                  className="relative mb-6"
                >
                  <div
                    className="rounded-full overflow-hidden"
                    style={{
                      width: 100,
                      height: 100,
                      border: '3px solid rgba(181,130,78,0.5)',
                      boxShadow: '0 0 30px rgba(181,130,78,0.15)',
                    }}
                  >
                    <img
                      src={getAvatarSrc(
                        (avatarsData as Record<string, { b64: string }>)[avatarKey]?.b64 || ''
                      )}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Glow ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      border: '2px solid rgba(181,130,78,0.2)',
                    }}
                    animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />
                </motion.div>
              )}

              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: '#f5f0ea',
                  textAlign: 'center',
                  lineHeight: 1.3,
                }}
              >
                Bissimilema, {prenom}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                style={{
                  fontSize: 15,
                  color: 'rgba(245,240,234,0.45)',
                  marginTop: 6,
                  textAlign: 'center',
                }}
              >
                {genre === 'debbo' ? 'sois la bienvenue' : 'sois le bienvenu'}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-8 px-4"
              >
                <p
                  style={{
                    fontSize: 16,
                    color: 'rgba(245,240,234,0.45)',
                    textAlign: 'center',
                    fontStyle: 'italic',
                    lineHeight: 1.7,
                    fontWeight: 300,
                  }}
                >
                  "Nebbe ndonndi fof, a yiytaa heen gollal maa."
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: 'rgba(245,240,234,0.25)',
                    marginTop: 6,
                    textAlign: 'center',
                    fontWeight: 400,
                  }}
                >
                  Proverbe peul
                </p>
              </motion.div>

              {/* Golden CTA with glow */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, ...SPRING }}
                whileTap={{ scale: 0.96 }}
                onClick={handleComplete}
                className="w-full py-4 rounded-2xl font-semibold mt-12 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #d4a24e, #b5824e)',
                  color: '#050505',
                  fontSize: 16,
                  fontWeight: 700,
                  boxShadow: '0 4px 30px rgba(212,162,78,0.3), 0 0 60px rgba(181,130,78,0.12)',
                }}
              >
                {/* Shimmer sweep on button */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)',
                  }}
                  animate={{ x: ['-100%', '250%'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
                />
                <span className="relative z-10">Entrer dans PULAAR+</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ─── Avatar Button Component ─── */
function AvatarButton({
  avatarKey,
  b64,
  selected,
  onSelect,
  delay,
}: {
  avatarKey: string
  b64: string
  selected: boolean
  onSelect: (key: string) => void
  delay: number
}) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, ...SPRING }}
      whileTap={{ scale: 0.9 }}
      onClick={() => onSelect(avatarKey)}
      className="relative"
      style={{ width: 88, height: 88 }}
    >
      {/* Avatar circle */}
      <motion.div
        animate={selected ? { scale: [1, 1.08, 1] } : { scale: 1 }}
        transition={selected ? { ...SPRING } : {}}
        className="w-full h-full rounded-full overflow-hidden"
        style={{
          border: selected
            ? '3px solid #b5824e'
            : '2px solid rgba(245,240,234,0.08)',
          transition: 'border-color 0.3s ease',
          boxShadow: selected ? '0 0 20px rgba(181,130,78,0.2)' : 'none',
        }}
      >
        <img
          src={getAvatarSrc(b64)}
          alt={avatarKey}
          className="w-full h-full object-cover"
          draggable={false}
        />
      </motion.div>

      {/* Check mark OUTSIDE circle, top-right */}
      <AnimatePresence>
        {selected && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={SPRING}
            className="absolute flex items-center justify-center rounded-full"
            style={{
              width: 26,
              height: 26,
              top: -3,
              right: -3,
              background: '#b5824e',
              boxShadow: '0 2px 8px rgba(181,130,78,0.4)',
              zIndex: 10,
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#050505" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
