import { useSimStore } from '@/store'
import { FlightStripData, FlightStripLocation } from '@/types'

const getCanbeTransfered = (data: FlightStripData) => {
  return !![FlightStripLocation.HOLD_N, FlightStripLocation.RUNWAY_1].includes(
    data.location
  )
}

const getCanBeTimeStamped = (data: FlightStripData, isDualRunway: boolean) => {
  if (isDualRunway) return false
  if (data.arrivalTime !== null) return false
  if (data.isTransfered) return false

  return !(data.location !== FlightStripLocation.RUNWAY_1)
}

export const useArrivalStripControlRules = (data: FlightStripData) => {
  const isDualRunway = useSimStore((state) => state.isDualRunway)

  return {
    canBeTranfered: getCanbeTransfered(data),
    canTimeStamp: getCanBeTimeStamped(data, isDualRunway),
  }
}
