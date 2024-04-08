import { create } from 'zustand'
import { computed } from 'zustand-computed'

const computedState = (state: SimState) => ({
  isDualRunway: state.arrivalRunway !== state.departureRunway,
})

export const useSimStore = create<SimState>()(
  computed(
    (set) => ({
      simType: 'tower',
      arrivalRunway: '23L',
      departureRunway: '23R',
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
