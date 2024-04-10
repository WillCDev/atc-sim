import { create } from 'zustand'
import { FlightStripData, FlightStripLocation } from '@/types'
import { mockArrivals, mockDepartures } from './mockFlights'
import { move } from 'move-position'
import { format } from 'date-fns'

interface Identifier {
  callsign: string
  location: FlightStripLocation
}

interface FlightsState {
  flights: Record<FlightStripLocation, FlightStripData[]>
  selectedFlightStrip: (FlightStripData & { location: FlightStripLocation }) | null
  setSelectedFlightStrip: (
    strip: (FlightStripData & { location: FlightStripLocation }) | null
  ) => void
  moveFlightStrip: (args: {
    source: Identifier
    dest: { callsign?: string; location: FlightStripLocation }
  }) => void
  transferFlightStrip: (args: Identifier) => void
  timeStampStrip: (args: Identifier) => void
  stripToSelectHoldingPoint: Identifier | null
  setStripToSelectHoldingPoint: (args: Identifier | null) => void
  assignHoldingPointToStrip: (holdingPoint: string) => void
  clearStripForDeparture: (strip: Identifier) => void
  removeStrip: (strip: Identifier) => void
}

export const useFlightStore = create<FlightsState>((set) => ({
  flights: {
    [FlightStripLocation.PENDING_ARRIVALS]: [...mockArrivals],
    [FlightStripLocation.AIRBORNE_DEPS]: [],
    [FlightStripLocation.ARRIVAL_SEQ]: [],
    [FlightStripLocation.RUNWAY_1]: [],
    [FlightStripLocation.R1_LOOP]: [],
    [FlightStripLocation.HOLD_S]: [],
    [FlightStripLocation.HOLD_N]: [...mockDepartures],
    [FlightStripLocation.UNASSIGNED]: [],
  },
  selectedFlightStrip: null,
  setSelectedFlightStrip: (callsign) => set({ selectedFlightStrip: callsign }),
  stripToSelectHoldingPoint: null,
  setStripToSelectHoldingPoint: (strip) => set({ stripToSelectHoldingPoint: strip }),
  assignHoldingPointToStrip: (holdingPoint) =>
    set((state) => {
      if (state.stripToSelectHoldingPoint === null) return state

      const newState: FlightsState = JSON.parse(JSON.stringify(state))
      const stripIndex = getStripIndex(
        newState.flights[state.stripToSelectHoldingPoint.location],
        state.stripToSelectHoldingPoint.callsign
      )
      if (stripIndex === -1) return state

      newState.flights[state.stripToSelectHoldingPoint.location][
        stripIndex
      ].holdingPoint = holdingPoint

      return newState
    }),
  moveFlightStrip: ({ source, dest }) =>
    // eslint-disable-next-line sonarjs/cognitive-complexity
    {
      set((state) => {
        const newState: FlightsState = { ...state }

        const sourceIndex = getStripIndex(
          newState.flights[source.location],
          source.callsign
        )
        if (sourceIndex == -1) return state

        const destinationIndex = dest.callsign
          ? getStripIndex(newState.flights[dest.location], dest.callsign)
          : undefined

        return moveFlightStrip(
          newState,
          { location: source.location, index: sourceIndex },
          { location: dest.location, index: destinationIndex }
        )
      })
    },
  transferFlightStrip: ({ callsign, location }) => {
    set((state) => {
      const newState: FlightsState = JSON.parse(JSON.stringify(state))

      const sourceIndex = getStripIndex(newState.flights[location], callsign)
      if (sourceIndex == -1) return state

      newState.flights[location][sourceIndex].isTransfered = true
      return newState
    })
  },
  timeStampStrip: ({ callsign, location }) => {
    set((state) => {
      const newState: FlightsState = JSON.parse(JSON.stringify(state))

      const sourceIndex = getStripIndex(newState.flights[location], callsign)
      const souceStrip = newState.flights[location][sourceIndex]
      if (sourceIndex == -1 || souceStrip.departureTime !== null) {
        return state
      }

      if (souceStrip.type === 'departure') {
        souceStrip.departureTime = format(Date.now(), 'mm:ss')
      } else {
        souceStrip.arrivalTime = format(Date.now(), 'HHmm')
      }
      return newState
    })
  },
  clearStripForDeparture: ({ callsign, location }) => {
    set((state) => {
      const newState: FlightsState = JSON.parse(JSON.stringify(state))

      const sourceIndex = getStripIndex(newState.flights[location], callsign)
      if (sourceIndex == -1) return state

      const sourceStrip = newState.flights[location][sourceIndex]
      if (sourceStrip.isClearedForDeparture) return state

      newState.flights[location][sourceIndex].isClearedForDeparture = true
      return newState
    })
  },
  removeStrip: ({ callsign, location }) => {
    set((state) => {
      const newState: FlightsState = JSON.parse(JSON.stringify(state))

      const sourceIndex = getStripIndex(newState.flights[location], callsign)
      if (sourceIndex == -1) return state

      newState.flights[location].splice(sourceIndex, 1)
      return newState
    })
  },
}))

const getStripIndex = (list: FlightStripData[], callsign: string) =>
  list.findIndex((flight) => flight.callsign === callsign)

const moveFlightStrip = (
  state: FlightsState,
  source: { location: FlightStripLocation; index: number },
  dest: { location: FlightStripLocation; index?: number }
) => {
  const newState = JSON.parse(JSON.stringify(state))

  if (source.location === dest.location) {
    if (dest.index === undefined) return newState

    newState.flights[dest.location] = move(newState.flights[dest.location], [
      { from: source.index, to: dest.index },
    ])
  } else {
    if (dest.index === undefined) {
      newState.flights[dest.location].push(
        newState.flights[source.location][source.index]
      )
    } else {
      newState.flights[dest.location].splice(
        dest.index,
        0,
        newState.flights[source.location][source.index]
      )
    }
    newState.flights[source.location].splice(source.index, 1)
  }

  newState.selectedFlightStrip = null
  return newState
}
