import { useSimStore } from '@/store'
import { FlightStripData, FlightStripLocation } from '@/types'

const getCanbeTransfered = (
  data: FlightStripData,
  location: FlightStripLocation,
  isDualRunway: boolean
) => {
  if (data.isTransfered) return false
  if (location === FlightStripLocation.HOLD_S && isDualRunway) return true
  if (location === FlightStripLocation.AIRBORNE_DEPS && !isDualRunway) return true
  return false
}

const getCanBeTimeStamped = (
  data: FlightStripData,
  location: FlightStripLocation,
  isDualRunway: boolean
) => {
  if (data.isTransfered) return false
  if (data.departureTime !== null) return false
  if (!data.isClearedForDeparture) return false
  if (location === FlightStripLocation.RUNWAY_1 && !isDualRunway) return true
  return false
}

const getCanBeClearedForDeparture = (
  data: FlightStripData,
  location: FlightStripLocation,
  isDualRunway: boolean
) => {
  if (data.isClearedForDeparture) return false
  if (location === FlightStripLocation.RUNWAY_1 && !isDualRunway) return true
  return false
}

const getCanBeSelected = (data: FlightStripData, location: FlightStripLocation) => {
  if (data.isTransfered) return false
  if (location === FlightStripLocation.UNASSIGNED) return false
  return true
}

export const useADepartureStripControlRules = (
  data: FlightStripData,
  location: FlightStripLocation
) => {
  const isDualRunway = useSimStore((state) => state.isDualRunway)

  return {
    canBeSelected: getCanBeSelected(data, location),
    canBeTranfered: getCanbeTransfered(data, location, isDualRunway),
    canTimeStamp: getCanBeTimeStamped(data, location, isDualRunway),
    canBeClearedForDeparture: getCanBeClearedForDeparture(data, location, isDualRunway),
  }
}
