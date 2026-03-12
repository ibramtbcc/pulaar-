import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  prenom: string
  nom: string
  genre: 'gorko' | 'debbo' | null
  avatarId: string | null
  paysRacine: string
  villeOrigine: string
  paysActuel: string
  niveauPulaar: string
  source: string[]
  dateNaissance: string
  yettore: string
  score: number
  isOnboarded: boolean
  setField: (field: string, value: unknown) => void
  completeOnboarding: () => void
  reset: () => void
}

const initialState = {
  prenom: '',
  nom: '',
  genre: null as 'gorko' | 'debbo' | null,
  avatarId: null as string | null,
  paysRacine: '',
  villeOrigine: '',
  paysActuel: '',
  niveauPulaar: '',
  source: [] as string[],
  dateNaissance: '',
  yettore: '',
  score: 0,
  isOnboarded: false,
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      ...initialState,
      setField: (field, value) => set((state) => ({ ...state, [field]: value })),
      completeOnboarding: () => set({ isOnboarded: true }),
      reset: () => set(initialState),
    }),
    { name: 'pulaar-user' }
  )
)
