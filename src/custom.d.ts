declare module '*.svg' {
  import * as React from 'react'

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >

  const src: string
  export default src
}

declare interface FlightStripControlProps {
  isTransfered: boolean // False by default, greyed out once transfered
}

declare interface FlightStripData extends FlightStripControlProps {
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

declare interface SimState {
  simType: 'tower' | 'radar'
  arrivalRunway: string
  departureRunway: string
  qnh: string
}
