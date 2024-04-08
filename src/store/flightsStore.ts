import { create } from 'zustand'
import { mockDepartures } from './mockFlights'
import { move } from 'move-position'
import { format } from 'date-fns'

export enum FlightStripLocation {
  PENDING_ARRIVALS = 'PENDING_ARRIVALS',
  AIRBORNE_DEPS = 'AIRBORNE_DEPS',
  ARRIVAL_SEQ = 'ARRIVAL_SEQ',
  RUNWAY_1 = 'RUNWAY_1',
  R1_LOOP = 'R1_LOOP',
  HOLD_S = 'HOLD_S',
  HOLD_N = 'HOLD_N',
  UNASSIGNED = 'UNASSIGNED',
}

interface FlightsState {
  flights: Record<FlightStripLocation, FlightStripData[]>
  selectedFlightStrip: (FlightStripData & { location: FlightStripLocation }) | null
  setSelectedFlightStrip: (
    strip: (FlightStripData & { location: FlightStripLocation }) | null
  ) => void
  moveFlightStrip: (args: {
    source: { callsign: string; location: FlightStripLocation }
    dest: { callsign?: string; location: FlightStripLocation }
  }) => void
  transferFlightStrip: (args: { callsign: string; location: FlightStripLocation }) => void
  timeStampStrip: (args: { callsign: string; location: FlightStripLocation }) => void
}

export const useFlightStore = create<FlightsState>((set) => ({
  flights: {
    [FlightStripLocation.PENDING_ARRIVALS]: [],
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
      if (
        sourceIndex == -1 ||
        newState.flights[location][sourceIndex].departureTime !== null
      ) {
        return state
      }

      newState.flights[location][sourceIndex].departureTime = format(Date.now(), 'mm:ss')
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
