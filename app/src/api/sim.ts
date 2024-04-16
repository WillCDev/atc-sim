import axios from 'axios'

import { endpoint } from './api'

interface Response<T> {
  data: T
  error?: string
}

interface SimApiResponse {
  simType: 'tower' | 'radar'
  arrivalRunway: string
  departureRunway: string
  qnh: number
  started: boolean
}

export const getSimData = async (): Promise<Response<SimApiResponse>> => {
  const response = await axios.get(`${endpoint}/api/sim`)

  return response.data
}

export const endSim = async (): Promise<Response<void>> => {
  const response = await axios.delete(`${endpoint}/api/sim`)

  return response.data
}
