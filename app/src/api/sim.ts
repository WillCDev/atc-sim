import axios from 'axios'
import { Response, httpEndpoint } from './api'
import { SimState } from '@/store'

interface SimApiResponse {
  simType: 'tower' | 'radar'
  arrivalRunway: string
  departureRunway: string
  qnh: number
  started: boolean
}

export const getSimData = async (): Promise<Response<SimApiResponse>> => {
  const response = await axios.get(`${httpEndpoint}/api/sim`)

  return response.data
}

export const postSimData = async (
  data: Partial<SimState>
): Promise<Response<SimApiResponse>> => {
  const response = await axios.post(`${httpEndpoint}/api/sim`, data)

  return response.data
}

export const endSim = async (): Promise<Response<void>> => {
  const response = await axios.post(`${httpEndpoint}/api/sim/reset`)

  return response.data
}
