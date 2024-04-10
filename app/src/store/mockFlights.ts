import { FlightStripData } from '@/types'

export const mockDepartures: FlightStripData[] = [
  {
    type: 'departure',
    callsign: 'AFR1669',
    departureTime: null,
    arrivalTime: null,
    classification: 'H/A332/SP',
    squawk: '6641',
    holdingPoint: null,
    qnh: '1014',
    destination: 'QMAA',
    origin: 'OEJN',
    sid: 'DESIG 1S',
    isTransfered: false,
    isClearedForDeparture: false,
  },
  {
    type: 'departure',
    callsign: 'QTR041',
    departureTime: null,
    arrivalTime: null,
    classification: 'H/A332/SP',
    squawk: '6641',
    holdingPoint: null,
    qnh: '1014',
    destination: 'QMAA',
    origin: 'OEJN',
    sid: 'DESIG 1S',
    isTransfered: false,
    isClearedForDeparture: false,
  },
]

export const mockArrivals: FlightStripData[] = [
  {
    type: 'arrival',
    callsign: 'SVA123',
    departureTime: null,
    arrivalTime: null,
    classification: 'H/B772/SP',
    squawk: '7111',
    holdingPoint: null,
    qnh: '1014',
    destination: 'QMAA',
    origin: 'OEJN',
    sid: null,
    isTransfered: false,
    isClearedForDeparture: false,
  },
]