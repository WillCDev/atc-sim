import { FlightStripData } from '@/types'
import axios from 'axios'
import { Response, httpEndpoint } from './api'

export const createPendingFlight = async (
  flight: FlightStripData
): Promise<Response<void>> => {
  const response = await axios.put(`${httpEndpoint}/api/pendingFlights`, flight)

  return response.data
}

export const deletePendingFlight = async (callsign: string): Promise<Response<void>> => {
  const response = await axios.delete(`${httpEndpoint}/api/pendingFlights/${callsign}`)

  return response.data
}

export const createFlight = async (flight: FlightStripData): Promise<Response<void>> => {
  const response = await axios.put(`${httpEndpoint}/api/flights`, flight)

  return response.data
}

export const deleteFlight = async (callsign: string): Promise<Response<void>> => {
  const response = await axios.delete(`${httpEndpoint}/api/flights/${callsign}`)

  return response.data
}
