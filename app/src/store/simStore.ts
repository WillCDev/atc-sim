import { create } from 'zustand'
import { computed } from 'zustand-computed'

interface SimState {
  simType: 'tower' | 'radar'
  arrivalRunway: string
  departureRunway: string
  qnh: string
}

const computedState = (state: SimState) => ({
  isDualRunway: state.arrivalRunway !== state.departureRunway,
})

export const useSimStore = create<SimState>()(
  computed(
    (set) => ({
      simType: 'tower',
      arrivalRunway: '23R',
      departureRunway: '23L',
      qnh: '1014',
      setSimType: (simType: SimState['simType']) => set({ simType }),
      setArrivalRunway: (arrivalRunway: SimState['arrivalRunway']) =>
        set({ arrivalRunway }),
      setDepartureRunway: (departureRunway: SimState['departureRunway']) =>
        set({ departureRunway }),
      setqnh: (qnh: SimState['qnh']) => set({ qnh }),
    }),
    computedState
  )
)
