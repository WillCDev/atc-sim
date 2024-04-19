import { create } from 'zustand'
import { computed } from 'zustand-computed'

export interface SimState {
  simType: 'tower' | 'radar'
  arrivalRunway: string | null
  departureRunway: string | null
  qnh: number
  selectedRole: 'controller' | 'coordinator' | null
  started: boolean
}

interface SimActions {
  setSimData: (data: Partial<SimState>) => void
  setSelectedRole: (selectedRole: SimState['selectedRole']) => void
}

const computedState = (state: SimState & SimActions) => ({
  isDualRunway: state.arrivalRunway !== state.departureRunway,
})

export const useSimStore = create<SimState & SimActions>()(
  computed(
    (set) => ({
      simType: 'tower',
      arrivalRunway: null,
      departureRunway: null,
      qnh: 1014,
      selectedRole: null,
      started: false,
      setSimData: (data) => set((state) => ({ ...state, ...data })),
      setSelectedRole: (selectedRole: SimState['selectedRole']) => set({ selectedRole }),
    }),
    computedState
  )
)
