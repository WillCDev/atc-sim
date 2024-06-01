import { FlightStripData, FlightStripLocation } from '@/types'

const allowedStripBayFlightTypeMappings: Record<
  FlightStripLocation,
  { single: FlightStripData['type'][]; dual: FlightStripData['type'][] }
> = {
  [FlightStripLocation.PENDING_ARRIVALS]: {
    single: ['arrival'],
    dual: ['arrival'],
  },
  [FlightStripLocation.HOLD_N]: {
    single: ['arrival', 'departure'],
    dual: ['arrival', 'departure'],
  },
  [FlightStripLocation.HOLD_S]: {
    single: ['departure'],
    dual: ['departure'],
  },
  [FlightStripLocation.RUNWAY_1]: {
    single: ['arrival', 'departure'],
    dual: ['arrival', 'departure'],
  },
  [FlightStripLocation.R1_LOOP]: {
    single: [],
    dual: [],
  },
  [FlightStripLocation.AIRBORNE_DEPS]: {
    single: ['departure'],
    dual: [],
  },
  [FlightStripLocation.ARRIVAL_SEQ]: {
    single: ['arrival'],
    dual: ['arrival'],
  },
  [FlightStripLocation.UNASSIGNED]: {
    single: ['arrival', 'departure'],
    dual: ['arrival', 'departure'],
  },
  [FlightStripLocation.TRANSFER_IN]: {
    single: ['arrival'],
    dual: ['arrival'],
  },
  [FlightStripLocation.DYNAMIC]: {
    single: ['arrival'],
    dual: ['arrival'],
  },
  [FlightStripLocation.AIR_CONTROLLER]: {
    single: ['arrival'],
    dual: ['arrival'],
  },
}

export const isStripAllowedInBay = (
  type: FlightStripData['type'],
  location: FlightStripLocation,
  isDualRunway: boolean
) => {
  const allowedTypes = isDualRunway
    ? allowedStripBayFlightTypeMappings[location].dual
    : allowedStripBayFlightTypeMappings[location].single

  return allowedTypes.includes(type)
}
