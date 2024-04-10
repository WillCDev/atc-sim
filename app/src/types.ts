interface FlightStripControlProps {
  isTransfered: boolean // False by default, greyed out once transfered
  isClearedForDeparture: boolean // False by default, green once cleared
}

export enum FlightStripLocation {
  PENDING_ARRIVALS = 'PENDING_ARRIVALS',
  AIRBORNE_DEPS = 'AIRBORNE_DEPS',
  ARRIVAL_SEQ = 'ARRIVAL_SEQ',
  RUNWAY_1 = 'RUNWAY_1',
  R1_LOOP = 'R1_LOOP',
  HOLD_S = 'HOLD_S',
  HOLD_N = 'HOLD_N',
  UNASSIGNED = 'UNASSIGNED',
}

export interface FlightStripData extends FlightStripControlProps {
  type: 'arrival' | 'departure'
  callsign: string // Set at begining of SIM
  departureTime: string | null // Selected by user during SIM
  arrivalTime: string | null // Selected by user during SIM
  classification: string | null // Set at begining of SIM
  squawk: string | null // Set at begining of SIM
  holdingPoint: string | null // Selected by user from Map
  qnh: string | null // '1014' derived from Simulator
  destination: string | null // 'OMAA' Set at begining of SIM
  origin: string | null // 'OEJN' Set at Begining of SIM
  sid: string | null
}

// DEPARTURES
// SID is always prepopulated as one of these, KUXEM_1R, EKLAD_1R, SONEX_1R, POL_5R, SANBA_1R, LISTO_2R

// Single Runway
// SID does not timestamp until cleared for departure
// CLicking destination, dest goes green, can now timestamp, but only in Runway Bay
// Holding Point is always prepopulate as J1

// Dual Runway
// Can't clear for departure ever
// Can't timestamp ever
// Cannot move departures into Airborne Deps
// Clicking SID whilst in HOLD_S, transfers strip
// Holding Point is always prepopulated as either, F1, H1, or P1
