import { CreateFlightData, FlightData } from '../types'

class FlightsState {
  private pendingFlights: Map<string, FlightData> = new Map()
  private flights: Map<string, FlightData> = new Map()

  getPendingFlights() {
    return Array.from(this.pendingFlights.values())
  }

  getFlights() {
    return Array.from(this.flights.values())
  }

  deleteFlight(callsign: string) {
    if (!this.flights.has(callsign)) throw new Error('Flight not found')
    this.flights.delete(callsign)
    return this.getFlights()
  }

  deletePendingFlight(callsign: string) {
    if (!this.pendingFlights.has(callsign)) throw new Error('Flight not found')
    this.pendingFlights.delete(callsign)
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
    return this.flights.get(flight.callsign)
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
    return this.pendingFlights.get(flight.callsign)
  }

  resetFlights() {
    this.pendingFlights = new Map()
    this.flights = new Map()
  }
}

export const flightState = new FlightsState()
