import { create } from 'zustand'
import { computed } from 'zustand-computed'

export interface SimState {
  simType: 'tower' | 'radar'
  arrivalRunway: string
  departureRunway: string
  qnh: string
  selectedRole: 'controller' | 'coordinator' | null
  simStarted: boolean
}

interface SimActions {
  setSimData: (data: Omit<SimState, 'selectedRole'>) => void
  setSelectedRole: (selectedRole: SimState['selectedRole']) => void
}

const computedState = (state: SimState & SimActions) => ({
  isDualRunway: state.arrivalRunway !== state.departureRunway,
})

export const useSimStore = create<SimState & SimActions>()(
  computed(
    (set) => ({
      simType: 'tower',
      arrivalRunway: '23R',
      departureRunway: '23R',
      qnh: '1014',
      selectedRole: null,
      simStarted: false,
      setSimData: (data) => set({ ...data }),
      setSimType: (simType: SimState['simType']) => set({ simType }),
      setArrivalRunway: (arrivalRunway: SimState['arrivalRunway']) =>
        set({ arrivalRunway }),
      setDepartureRunway: (departureRunway: SimState['departureRunway']) =>
        set({ departureRunway }),
      setqnh: (qnh: SimState['qnh']) => set({ qnh }),
      setSelectedRole: (selectedRole: SimState['selectedRole']) => set({ selectedRole }),
      setSimStarted: (simStarted: SimState['simStarted']) => set({ simStarted }),
    }),
    computedState
  )
)
