import { useSimStore } from '@/store'
import { FlightStripData, FlightStripLocation } from '@/types'

const getCanbeTransfered = (data: FlightStripData, location: FlightStripLocation) => {
  if (data.isTransfered) return false
  return !![FlightStripLocation.HOLD_N, FlightStripLocation.RUNWAY_1].includes(location)
}

const getCanBeTimeStamped = (
  data: FlightStripData,
  location: FlightStripLocation,
  isDualRunway: boolean
) => {
  if (isDualRunway) return false
  if (data.arrivalTime !== null) return false
  if (data.isTransfered) return false

  return !(location !== FlightStripLocation.RUNWAY_1)
}

export const useArrivalStripControlRules = (
  data: FlightStripData,
  location: FlightStripLocation
) => {
  const isDualRunway = useSimStore((state) => state.isDualRunway)

  return {
    canBeTranfered: getCanbeTransfered(data, location),
    canTimeStamp: getCanBeTimeStamped(data, location, isDualRunway),
  }
}
