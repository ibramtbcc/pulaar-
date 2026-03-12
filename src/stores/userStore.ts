import { create } from 'zustand'

interface UserState {
  prenom: string
  nom: string
  genre: 'gorko' | 'debbo' | null
  avatarId: string | null
  paysRacine: string
  villeOrigine: string
  paysActuel: string
  niveauPulaar: string
  source: string
  dateNaissance: string
  yettore: string
  score: number
  isOnboarded: boolean
  setField: (field: string, value: string | number | boolean | null) => void
  completeOnboarding: () => void
}

export const useUserStore = create<UserState>((set) => ({
  prenom: '',
  nom: '',
  genre: null,
  avatarId: null,
  paysRacine: '',
  villeOrigine: '',
  paysActuel: '',
  niveauPulaar: '',
  source: '',
  dateNaissance: '',
  yettore: '',
  score: 0,
  isOnboarded: false,
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  completeOnboarding: () => set({ isOnboarded: true }),
}))
