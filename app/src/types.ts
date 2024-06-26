interface FlightStripControlProps {
  isTransfered: boolean // False by default, greyed out once transfered
  isClearedForDeparture: boolean // False by default, green once cleared
  canContinueApproach: boolean // False by default, C once cleared
  isClearedForApproach: boolean // False by default, green once cleared
}

export enum FlightStripLocation {
  PENDING_ARRIVALS = 'PENDING_ARRIVALS',
  AIRBORNE_DEPS = 'AIRBORNE_DEPS',
  ARRIVAL_SEQ = 'ARRIVAL_SEQ',
  RUNWAY_1 = 'RUNWAY_1',
  R1_LOOP = 'R1_LOOP',
  HOLD_S = 'HOLD_S',
  HOLD_N = 'HOLD_N',
  TRANSFER_IN = 'TRANSFER_IN',
  DYNAMIC = 'DYNAMIC',
  AIR_CONTROLLER = 'AIR_CONTROLLER',
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
  heading: string | null // Defaults to HDG
  speed: string | null // Defaults to SPD
  altitude: string | null // Defaults to CLD
}
