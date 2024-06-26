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
  if (isDualRunway) return false
  if (data.departureTime !== null) return false
  if (!data.isClearedForDeparture) return false
  if (location === FlightStripLocation.RUNWAY_1) return true
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

const getCanBeSelected = (location: FlightStripLocation) => {
  if (location === FlightStripLocation.UNASSIGNED) return false
  return true
}

const getCanBeDeleted = (
  data: FlightStripData,
  location: FlightStripLocation,
  isDualRunway: boolean
) => {
  if (location === FlightStripLocation.AIRBORNE_DEPS) return true
  if (isDualRunway && location === FlightStripLocation.HOLD_S) return true
  return false
}

export const useADepartureStripControlRules = (
  data: FlightStripData,
  location: FlightStripLocation
) => {
  const isDualRunway = useSimStore((state) => state.isDualRunway)

  return {
    canBeSelected: getCanBeSelected(location),
    canBeTransfered: getCanbeTransfered(data, location, isDualRunway),
    canTimeStamp: getCanBeTimeStamped(data, location, isDualRunway),
    canBeClearedForDeparture: getCanBeClearedForDeparture(data, location, isDualRunway),
    canBeDeleted: getCanBeDeleted(data, location, isDualRunway),
  }
}
