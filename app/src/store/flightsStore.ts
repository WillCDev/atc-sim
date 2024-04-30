import { create } from 'zustand'
import { FlightStripData, FlightStripLocation } from '@/types'
import { arrayMoveImmutable } from 'array-move'
import { format } from 'date-fns'

interface Identifier {
  callsign: string
  location: FlightStripLocation
}

interface FlightsState {
  flights: Record<string, FlightStripData>
  pendingFlights: Record<string, FlightStripData>
  lastDeletedFlight: null | { data: FlightStripData; location: FlightStripLocation }
  reset: () => void
  flightLocations: Record<FlightStripLocation, string[]>
  removeFlight: (callsign: string) => void
  upsertFlight: (flight: FlightStripData) => void
  removePendingFlight: (callsign: string) => void
  upsertPendingFlight: (flight: FlightStripData) => void
  selectedFlightStrip: (FlightStripData & { location: FlightStripLocation }) | null
  setSelectedFlightStrip: (
    strip: (FlightStripData & { location: FlightStripLocation }) | null
  ) => void
  moveFlightStrip: (args: { callsign?: string; location: FlightStripLocation }) => void
  transferFlightStrip: (callsign: string, isTransfered: boolean) => void
  continueApproach: (callsign: string) => void
  timeStampStrip: (callsign: string) => void
  stripToSelectHoldingPoint: string | null
  setStripToSelectHoldingPoint: (callsign: string | null) => void
  assignHoldingPointToStrip: (holdingPoint: string) => void
  clearStripForDeparture: (callsign: string) => void
  removeStrip: (arg: Identifier) => void
}

const getDefaultState = () =>
  ({
    flights: {},
    pendingFlights: {},
    lastDeletedFlight: null,
    flightLocations: <Record<FlightStripLocation, string[]>>{
      [FlightStripLocation.PENDING_ARRIVALS]: [],
      [FlightStripLocation.AIRBORNE_DEPS]: [],
      [FlightStripLocation.ARRIVAL_SEQ]: [],
      [FlightStripLocation.RUNWAY_1]: [],
      [FlightStripLocation.R1_LOOP]: [],
      [FlightStripLocation.HOLD_S]: [],
      [FlightStripLocation.HOLD_N]: [],
      [FlightStripLocation.UNASSIGNED]: [],
    },
  } as const)

export const useFlightStore = create<FlightsState>((set) => ({
  ...getDefaultState(),
  reset: () => {
    set({ ...getDefaultState() })
  },
  upsertFlight: (flight: FlightStripData) => {
    set((state) => {
      const existingFlight = state.flights[flight.callsign]
      if (!existingFlight) {
        state.flights[flight.callsign] = flight

        let location =
          flight.type === 'arrival'
            ? FlightStripLocation.PENDING_ARRIVALS
            : FlightStripLocation.HOLD_N

        if (flight.callsign === state.lastDeletedFlight?.data.callsign) {
          location = state.lastDeletedFlight.location
          state.lastDeletedFlight = null
        }

        const list = state.flightLocations[location]
        state.flightLocations[location] = [...list, flight.callsign]
      } else {
        state.flights[flight.callsign] = { ...existingFlight, ...flight }
      }
      return { ...state }
    })
  },
  removeFlight: (callsign) => {
    set((state) => {
      const strip = state.flights[callsign]
      if (!strip) return state

      delete state.flights[strip.callsign]

      let stripLocation: FlightStripLocation = FlightStripLocation.UNASSIGNED

      Object.entries(state.flightLocations).forEach(([location, callsigns]) => {
        const stripIndex = callsigns.indexOf(strip.callsign)
        if (stripIndex !== -1) {
          stripLocation = location as FlightStripLocation
          state.flightLocations[location as FlightStripLocation] = state.flightLocations[
            location as FlightStripLocation
          ].filter((cs) => cs !== callsign)
        }
      })
      return { ...state, lastDeletedFlight: { data: strip, location: stripLocation } }
    })
  },
  upsertPendingFlight: (flight) => {
    set((state) => {
      const existingFlight = state.pendingFlights[flight.callsign]
      state.pendingFlights[flight.callsign] = { ...existingFlight, ...flight }
      return { ...state }
    })
  },
  removePendingFlight: (callsign) => {
    set((state) => {
      const strip = state.pendingFlights[callsign]
      if (!strip) return state

      delete state.pendingFlights[strip.callsign]
      return { ...state }
    })
  },
  selectedFlightStrip: null,
  setSelectedFlightStrip: (callsign) => set({ selectedFlightStrip: callsign }),
  stripToSelectHoldingPoint: null,
  setStripToSelectHoldingPoint: (strip) => set({ stripToSelectHoldingPoint: strip }),
  assignHoldingPointToStrip: (holdingPoint) =>
    set((state) => {
      if (state.stripToSelectHoldingPoint === null) return state

      const strip = state.flights[state.stripToSelectHoldingPoint]
      if (!strip) return state

      state.flights[strip.callsign] = { ...strip, holdingPoint }
      return { ...state, stripToSelectHoldingPoint: null }
    }),
  moveFlightStrip: (dest) =>
    // eslint-disable-next-line sonarjs/cognitive-complexity
    {
      set((state) => {
        const newState: FlightsState = { ...state }

        const source = state.selectedFlightStrip
        if (!source) return state

        const sourceIndex = getStripIndex(
          newState.flightLocations[source.location],
          source.callsign
        )
        if (sourceIndex == -1) return state

        const destinationIndex = dest.callsign
          ? getStripIndex(newState.flightLocations[dest.location], dest.callsign)
          : undefined

        return moveFlightStrip(
          newState,
          { location: source.location, index: sourceIndex },
          { location: dest.location, index: destinationIndex }
        )
      })
    },
  transferFlightStrip: (callsign, isTransfered) => {
    set((state) => {
      const strip = state.flights[callsign]
      if (!strip) return state

      state.flights[strip.callsign] = { ...strip, isTransfered }
      return { ...state }
    })
  },
  timeStampStrip: (callsign) => {
    set((state) => {
      const strip = state.flights[callsign]
      if (!strip.callsign) return state
      if (strip.type === 'departure') {
        strip.departureTime = format(Date.now(), 'mm:ss')
      } else {
        strip.arrivalTime = format(Date.now(), 'HHmm')
      }
      state.flights[strip.callsign] = { ...strip }

      return { ...state }
    })
  },
  continueApproach: (callsign) => {
    set((state) => {
      const strip = state.flights[callsign]
      if (!strip) return state

      state.flights[strip.callsign] = { ...strip, canContinueApproach: true }
      return { ...state }
    })
  },
  clearStripForDeparture: (callsign) => {
    set((state) => {
      const strip = state.flights[callsign]
      if (!strip) return state

      state.flights[strip.callsign] = { ...strip, isClearedForDeparture: true }
      return { ...state }
    })
  },
  removeStrip: ({ callsign, location }) => {
    set((state) => {
      const strip = state.flights[callsign]
      if (!strip) return state

      const stripIndex = state.flightLocations[location].indexOf(strip.callsign)
      if (stripIndex !== -1) return state

      delete state.flights[strip.callsign]
      state.flightLocations[location] = state.flightLocations[location].splice(
        stripIndex,
        1
      )
      return { ...state }
    })
  },
}))

const getStripIndex = (list: string[], callsign: string) =>
  list.findIndex((item) => item === callsign)

const moveFlightStrip = (
  state: FlightsState,
  source: { location: FlightStripLocation; index: number },
  dest: { location: FlightStripLocation; index?: number }
) => {
  const newState = JSON.parse(JSON.stringify(state))

  if (source.location === dest.location) {
    if (dest.index === undefined) return newState

    newState.flightLocations[dest.location] = arrayMoveImmutable(
      newState.flightLocations[dest.location],
      source.index,
      dest.index
    )
  } else {
    if (dest.index === undefined) {
      newState.flightLocations[dest.location].push(
        newState.flightLocations[source.location][source.index]
      )
    } else {
      newState.flightLocations[dest.location].splice(
        dest.index,
        0,
        newState.flightLocations[source.location][source.index]
      )
    }
    newState.flightLocations[source.location].splice(source.index, 1)
  }

  newState.selectedFlightStrip = null
  return newState
}
