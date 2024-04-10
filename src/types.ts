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
  departureTime: string | null // ONLY When in Runway bay, user selects SID, which timestamps. else timestamp auto applied when moved to Airborne Deps
  arrivalTime: string | null // ??
  classification: string | null // Set at begining of SIM
  squawk: string | null // Set at begining of SIM
  // atis: 'I' // Hard Coded
  holdingPoint: string | null // 'A' / 'B' Selected by user from Map
  qnh: string | null // '1014' derived from Simulator
  destination: string | null // 'OMAA' Set at begining of SIM
  origin: string | null // 'OEJN' Set at Begining of SIM
  // transfer: string // Hardcode as QSY for Departures, and >GMC for Arrivals, doesn't need to be configurable
  // arrivalInfo: string // Hardcode as C, 23R, ILS, doesn't need to be configurable
  // 207 hardcoded
  // HDG/CLD Hardcoded
  sid: string | null // 'DESIG 1S' Set at begining of SIM
}

// DEPARTURES

// Single Runway
// SID does not timestamp until cleared for departure
// CLicking destination, dest goes green, can now timestamp, but only in Runway Bay

// Dual Runway
// Can't clear for departure ever
// Can't timestamp ever
// Cannot move departures into Airborne Deps
// Clicking SID whilst in HOLD_S, transfers strip
