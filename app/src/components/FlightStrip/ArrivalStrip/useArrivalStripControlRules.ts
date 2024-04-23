import { FlightStripData, FlightStripLocation } from '@/types'

const isOnTheGround = (location: FlightStripLocation) => {
  return [FlightStripLocation.HOLD_N, FlightStripLocation.RUNWAY_1].includes(location)
}

const getCanbeTransfered = (data: FlightStripData, location: FlightStripLocation) => {
  if (data.isTransfered) return false
  return isOnTheGround(location)
}

const getCanBeTimeStamped = (data: FlightStripData, location: FlightStripLocation) => {
  if (data.arrivalTime !== null) return false
  if (data.isTransfered) return false

  return !(location !== FlightStripLocation.RUNWAY_1)
}

const getCanBeRemoved = (data: FlightStripData, location: FlightStripLocation) => {
  return data.isTransfered && isOnTheGround(location)
}

export const useArrivalStripControlRules = (
  data: FlightStripData,
  location: FlightStripLocation
) => {
  return {
    canBeTranfered: getCanbeTransfered(data, location),
    canTimeStamp: getCanBeTimeStamped(data, location),
    canContinueApproach:
      location === FlightStripLocation.ARRIVAL_SEQ && !data.canContinueApproach,
    canBeRemoved: getCanBeRemoved(data, location),
  }
}
