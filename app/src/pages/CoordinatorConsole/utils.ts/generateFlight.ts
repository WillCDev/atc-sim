import { FlightStripData } from '@/types'
import { getRandomFlightOption } from './getFlightOptions'
import { generateSquawk } from './generateSquawk'
import { SimState } from '@/store'
import { getRandomSid } from './sids'
import { getRandomHoldingPoint } from './holdingPoint'
;('EGCC')

export const generateFlight = (
  type: FlightStripData['type'],
  qnh: SimState['qnh'],
  isDualRunway: boolean
): FlightStripData => {
  const { callsign, classification, origin } = getRandomFlightOption()

  return {
    type,
    callsign,
    classification,
    origin: type === 'arrival' ? origin : 'EGCC',
    departureTime: null,
    arrivalTime: null,
    squawk: String(generateSquawk()),
    holdingPoint:
      type === 'arrival' ? null : isDualRunway ? getRandomHoldingPoint() : 'J1',
    qnh: String(qnh ?? 1014),
    destination: type === 'arrival' ? 'EGCC' : origin,
    sid: getRandomSid(),
    heading: null,
    speed: null,
    altitude: null,
    isTransfered: false,
    isClearedForDeparture: false,
    canContinueApproach: false,
  }
}
