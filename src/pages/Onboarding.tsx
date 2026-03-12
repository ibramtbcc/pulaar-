import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/shared/Logo'
import { IconMale, IconFemale } from '../components/shared/Icons'
import GrainOverlay from '../components/shared/GrainOverlay'
import { useUserStore } from '../stores/userStore'
import avatarsData from '../data/avatars.json'

type Step = 'splash' | 'login' | 'genre' | 'avatar' | 'profil' | 'welcome'

const STEPS: Step[] = ['splash', 'login', 'genre', 'avatar', 'profil']

const countries = [
  'Guinee', 'Senegal', 'Mali', 'Mauritanie', 'Cameroun',
  'Nigeria', 'Sierra Leone', "Cote d'Ivoire", 'Burkina Faso', 'Guinee-Bissau',
]

const levels = ['Debutant', 'Intermediaire', 'Courant']
const sources = ['Facebook', 'Instagram', 'TikTok', 'Snapchat', 'Bouche a oreille']

function getAvatarSrc(b64: string): string {
  if (b64.startsWith('data:')) return b64
  return `data:image/jpeg;base64,${b64}`
}

function ProgressBar({ currentStep }: { currentStep: Step }) {
  const idx = STEPS.indexOf(currentStep)
  if (currentStep === 'welcome') return null

  return (
    <div className="absolute top-0 left-0 right-0 z-10 flex gap-1.5 px-8 pt-4">
      {STEPS.map((s, i) => (
        <div
          key={s}
          className="flex-1 h-1 rounded-full transition-all duration-500"
          style={{
            background: i <= idx
              ? '#b5824e'
              : 'rgba(245,240,234,0.08)',
          }}
        />
      ))}
    </div>
  )
}

export default function Onboarding() {
  const navigate = useNavigate()
  const { isOnboarded, setField, completeOnboarding } = useUserStore()

  const [step, setStep] = useState<Step>('splash')
  const [genre, setGenre] = useState<'gorko' | 'debbo' | null>(null)
  const [avatarKey, setAvatarKey] = useState<string | null>(null)
  const [prenom, setPrenom] = useState('')
  const [nom, setNom] = useState('')
  const [paysRacine, setPaysRacine] = useState('')
  const [niveau, setNiveau] = useState('')
  const [selectedSources, setSelectedSources] = useState<string[]>([])

  // Redirect if already onboarded
  useEffect(() => {
    if (isOnboarded) {
      navigate('/', { replace: true })
    }
  }, [isOnboarded, navigate])

  // Splash auto-advance
  useEffect(() => {
    if (step === 'splash') {
      const timer = setTimeout(() => setStep('login'), 3000)
      return () => clearTimeout(timer)
    }
  }, [step])

  // Get first 6 avatar entries
  const avatarEntries = useMemo(() => {
    const entries = Object.entries(avatarsData as Record<string, { b64: string }>)
    return entries.slice(0, 6)
  }, [])

  const toggleSource = (s: string) => {
    setSelectedSources((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    )
  }

  const handleComplete = () => {
    setField('prenom', prenom)
    setField('nom', nom)
    setField('genre', genre)
    setField('avatarId', avatarKey)
    setField('paysRacine', paysRacine)
    setField('niveauPulaar', niveau)
    setField('source', selectedSources)
    completeOnboarding()
    navigate('/')
  }

  const slideVariants = {
    enter: { opacity: 0, x: 60 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -60 },
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ background: '#050505' }}>
      <GrainOverlay />
      <div className="w-full max-w-md h-full flex flex-col relative overflow-hidden">
        <ProgressBar currentStep={step} />

        <AnimatePresence mode="wait">
          {/* SPLASH */}
          {step === 'splash' && (
            <motion.div
              key="splash"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6 }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              <motion.div
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Logo size={72} />
              </motion.div>
              <motion.div
                className="mt-2 h-0.5 rounded-full"
                style={{ width: 100, background: 'linear-gradient(90deg, transparent, #b5824e, transparent)' }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          )}

          {/* LOGIN */}
          {step === 'login' && (
            <motion.div
              key="login"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex flex-col items-center justify-center px-8"
            >
              <Logo size={36} />
              <p style={{ fontSize: 14, color: 'rgba(245,240,234,0.5)', marginTop: 12, textAlign: 'center' }}>
                Bien plus qu'une langue, une communaute.
              </p>

              <div className="w-full mt-10 flex flex-col gap-3">
                <button
                  onClick={() => setStep('genre')}
                  className="w-full py-4 rounded-2xl flex items-center justify-center gap-3 transition-transform active:scale-[0.98]"
                  style={{
                    background: 'rgba(245,240,234,0.04)',
                    border: '0.5px solid rgba(245,240,234,0.1)',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#f5f0ea' }}>
                    Continuer avec Google
                  </span>
                </button>

                <button
                  onClick={() => setStep('genre')}
                  className="w-full py-4 rounded-2xl flex items-center justify-center gap-3 transition-transform active:scale-[0.98]"
                  style={{
                    background: 'rgba(245,240,234,0.04)',
                    border: '0.5px solid rgba(245,240,234,0.1)',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#f5f0ea"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#f5f0ea' }}>
                    Continuer avec Apple
                  </span>
                </button>
              </div>

              <button
                onClick={() => setStep('genre')}
                className="mt-4"
                style={{ fontSize: 13, color: 'rgba(245,240,234,0.4)' }}
              >
                S'inscrire avec un email
              </button>

              <p className="mt-auto mb-6" style={{ fontSize: 10, color: 'rgba(245,240,234,0.2)', textAlign: 'center' }}>
                En continuant, tu acceptes les CGU et la politique de confidentialite.
              </p>
            </motion.div>
          )}

          {/* GENRE */}
          {step === 'genre' && (
            <motion.div
              key="genre"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex flex-col items-center justify-center px-8 gap-5"
            >
              {[
                { id: 'gorko' as const, label: 'Gorko', sub: 'Homme', Icon: IconMale },
                { id: 'debbo' as const, label: 'Debbo', sub: 'Femme', Icon: IconFemale },
              ].map(({ id, label, sub, Icon }) => (
                <button
                  key={id}
                  onClick={() => { setGenre(id); setTimeout(() => setStep('avatar'), 400) }}
                  className="w-full py-8 rounded-3xl flex flex-col items-center gap-3 transition-all active:scale-[0.97]"
                  style={{
                    background: genre === id ? 'rgba(181,130,78,0.08)' : 'rgba(245,240,234,0.03)',
                    border: genre === id ? '1.5px solid rgba(181,130,78,0.4)' : '0.5px solid rgba(245,240,234,0.06)',
                  }}
                >
                  <Icon size={60} />
                  <div className="text-center">
                    <p style={{ fontSize: 20, fontWeight: 700, color: '#f5f0ea' }}>{label}</p>
                    <p style={{ fontSize: 13, color: 'rgba(245,240,234,0.4)' }}>{sub}</p>
                  </div>
                </button>
              ))}
            </motion.div>
          )}

          {/* AVATAR */}
          {step === 'avatar' && (
            <motion.div
              key="avatar"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex flex-col items-center justify-center px-8"
            >
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f5f0ea', marginBottom: 24 }}>
                Choisis ton avatar Peul
              </h2>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {avatarEntries.map(([key, avatar]) => (
                  <button
                    key={key}
                    onClick={() => setAvatarKey(key)}
                    className="relative w-20 h-20 rounded-full transition-all active:scale-95 overflow-hidden"
                    style={{
                      border: avatarKey === key ? '3px solid #b5824e' : '2px solid rgba(245,240,234,0.08)',
                    }}
                  >
                    <img
                      src={getAvatarSrc(avatar.b64)}
                      alt={key}
                      className="w-full h-full object-cover rounded-full"
                    />
                    {avatarKey === key && (
                      <span
                        className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: '#b5824e' }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#050505" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep('profil')}
                disabled={avatarKey === null}
                className="w-full py-4 rounded-2xl font-semibold transition-all active:scale-[0.97]"
                style={{
                  background: avatarKey !== null ? 'linear-gradient(135deg, #b5824e, #9a6d3c)' : 'rgba(245,240,234,0.06)',
                  color: avatarKey !== null ? '#050505' : 'rgba(245,240,234,0.3)',
                  fontSize: 15,
                }}
              >
                Continuer
              </button>
            </motion.div>
          )}

          {/* PROFIL */}
          {step === 'profil' && (
            <motion.div
              key="profil"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex flex-col px-6 pt-10 pb-8 overflow-y-auto"
            >
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f5f0ea' }}>D'ou tu viens ?</h2>
              <p style={{ fontSize: 13, color: 'rgba(245,240,234,0.4)', marginTop: 4, marginBottom: 24 }}>
                Pour personnaliser ton experience
              </p>

              <div className="flex flex-col gap-4">
                {[
                  { label: 'Prenom', value: prenom, set: setPrenom, type: 'text' },
                  { label: 'Nom de famille', value: nom, set: setNom, type: 'text' },
                ].map((f) => (
                  <div key={f.label}>
                    <label style={{ fontSize: 12, color: 'rgba(245,240,234,0.4)', fontWeight: 500 }}>
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      value={f.value}
                      onChange={(e) => f.set(e.target.value)}
                      className="w-full mt-1 px-4 py-3 rounded-xl"
                      style={{
                        background: 'rgba(245,240,234,0.04)',
                        border: '0.5px solid rgba(245,240,234,0.1)',
                        fontSize: 15,
                        color: '#f5f0ea',
                      }}
                    />
                  </div>
                ))}

                <div>
                  <label style={{ fontSize: 12, color: 'rgba(245,240,234,0.4)', fontWeight: 500 }}>
                    Tes racines
                  </label>
                  <select
                    value={paysRacine}
                    onChange={(e) => setPaysRacine(e.target.value)}
                    className="w-full mt-1 px-4 py-3 rounded-xl"
                    style={{
                      background: 'rgba(245,240,234,0.04)',
                      border: '0.5px solid rgba(245,240,234,0.1)',
                      fontSize: 15,
                      color: paysRacine ? '#f5f0ea' : 'rgba(245,240,234,0.3)',
                    }}
                  >
                    <option value="">Selectionner un pays</option>
                    {countries.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: 12, color: 'rgba(245,240,234,0.4)', fontWeight: 500, marginBottom: 8, display: 'block' }}>
                    Niveau en pulaar
                  </label>
                  <div className="flex gap-2">
                    {levels.map((l) => (
                      <button
                        key={l}
                        onClick={() => setNiveau(l)}
                        className="flex-1 py-2.5 rounded-xl transition-all"
                        style={{
                          background: niveau === l ? 'rgba(181,130,78,0.12)' : 'rgba(245,240,234,0.04)',
                          border: niveau === l ? '1px solid rgba(181,130,78,0.3)' : '0.5px solid rgba(245,240,234,0.08)',
                          color: niveau === l ? '#b5824e' : 'rgba(245,240,234,0.5)',
                          fontSize: 12,
                          fontWeight: 600,
                        }}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 12, color: 'rgba(245,240,234,0.4)', fontWeight: 500, marginBottom: 8, display: 'block' }}>
                    Comment tu as connu PULAAR+ ?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {sources.map((s) => (
                      <button
                        key={s}
                        onClick={() => toggleSource(s)}
                        className="px-3 py-2 rounded-xl transition-all"
                        style={{
                          background: selectedSources.includes(s) ? 'rgba(181,130,78,0.12)' : 'rgba(245,240,234,0.04)',
                          border: selectedSources.includes(s) ? '1px solid rgba(181,130,78,0.3)' : '0.5px solid rgba(245,240,234,0.08)',
                          color: selectedSources.includes(s) ? '#b5824e' : 'rgba(245,240,234,0.5)',
                          fontSize: 12,
                          fontWeight: 500,
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep('welcome')}
                disabled={!prenom || !nom}
                className="w-full py-4 rounded-2xl font-semibold mt-8 transition-all active:scale-[0.97]"
                style={{
                  background: prenom && nom ? 'linear-gradient(135deg, #b5824e, #9a6d3c)' : 'rgba(245,240,234,0.06)',
                  color: prenom && nom ? '#050505' : 'rgba(245,240,234,0.3)',
                  fontSize: 15,
                }}
              >
                Continuer
              </button>
            </motion.div>
          )}

          {/* WELCOME */}
          {step === 'welcome' && (
            <motion.div
              key="welcome"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex flex-col items-center justify-center px-8"
            >
              <Logo size={48} />
              <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f5f0ea', marginTop: 24, textAlign: 'center' }}>
                {prenom}, bissilemilema !
              </h2>
              <p style={{
                fontSize: 16,
                color: 'rgba(245,240,234,0.5)',
                marginTop: 16,
                textAlign: 'center',
                fontStyle: 'italic',
                lineHeight: 1.6,
              }}>
                "Nebbe ndonndi fof, a yiytaa heen gollal maa."
              </p>
              <p style={{ fontSize: 13, color: 'rgba(245,240,234,0.3)', marginTop: 4 }}>
                Proverbe peul
              </p>

              <button
                onClick={handleComplete}
                className="w-full py-4 rounded-2xl font-semibold mt-12 transition-all active:scale-[0.97]"
                style={{
                  background: 'linear-gradient(135deg, #d4a24e, #b5824e)',
                  color: '#050505',
                  fontSize: 16,
                  boxShadow: '0 4px 20px rgba(212,162,78,0.3)',
                }}
              >
                Entrer dans PULAAR+
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
