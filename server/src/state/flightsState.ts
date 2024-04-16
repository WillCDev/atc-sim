import { CreateFlightData, FlightData } from '../types'

type OnChangeHandler = (
  args:
    | { action: 'DELETE'; payload: string }
    | { action: 'UPSERT'; payload: FlightData }
    | { action: 'BATCH'; payload: FlightData[] }
) => void

class FlightsState {
  private pendingFlights: Map<string, FlightData> = new Map()
  private flights: Map<string, FlightData> = new Map()
  private onFlightChangeHandler: OnChangeHandler | null = null
  private onPendingFlightChangeHandler: OnChangeHandler | null = null

  getPendingFlights() {
    return Array.from(this.pendingFlights.values())
  }

  getFlights() {
    return Array.from(this.flights.values())
  }

  deleteFlight(callsign: string) {
    if (!this.flights.has(callsign)) throw new Error('Flight not found')
    this.flights.delete(callsign)

    this.onFlightChangeHandler?.({ action: 'DELETE', payload: callsign })

    return this.getFlights()
  }

  deletePendingFlight(callsign: string) {
    if (!this.pendingFlights.has(callsign)) throw new Error('Flight not found')
    this.pendingFlights.delete(callsign)

    this.onPendingFlightChangeHandler?.({ action: 'DELETE', payload: callsign })

    return this.getPendingFlights()
  }

  upsertFlight(flight: CreateFlightData) {
    const existingFlight = this.flights.get(flight.callsign)
    if (!existingFlight) {
      this.flights.set(flight.callsign, { ...flight, version: 1 })
    } else {
      this.flights.set(flight.callsign, {
        ...existingFlight,
        ...flight,
        version: existingFlight.version + 1,
      })
    }

    const newFlight = this.flights.get(flight.callsign)

    this.onFlightChangeHandler?.({
      action: 'UPSERT',
      payload: newFlight!,
    })

    return newFlight
  }

  upsertPendingFlight(flight: CreateFlightData) {
    const existingFlight = this.pendingFlights.get(flight.callsign)
    if (!existingFlight) {
      this.pendingFlights.set(flight.callsign, { ...flight, version: 1 })
    } else {
      this.pendingFlights.set(flight.callsign, {
        ...existingFlight,
        ...flight,
        version: existingFlight.version + 1,
      })
    }

    const newFlight = this.pendingFlights.get(flight.callsign)
    this.onPendingFlightChangeHandler?.({ action: 'UPSERT', payload: newFlight! })

    return newFlight
  }

  resetFlights() {
    this.pendingFlights = new Map()
    this.flights = new Map()

    this.onFlightChangeHandler?.({ action: 'BATCH', payload: [] })
    this.onPendingFlightChangeHandler?.({ action: 'BATCH', payload: [] })
  }

  onFlightChange(cb: OnChangeHandler) {
    this.onFlightChangeHandler = cb
  }

  onPendingFlightChange(cb: OnChangeHandler) {
    this.onPendingFlightChangeHandler = cb
  }
}

export const flightState = new FlightsState()
