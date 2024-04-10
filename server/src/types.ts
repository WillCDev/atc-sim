import { z } from 'zod'

export const FlightDataSchema = z.object({
  type: z.enum(['arrival', 'departure']),
  callsign: z.string(),
  departureTime: z.string().nullable(),
  arrivalTime: z.string().nullable(),
  classification: z.string().nullable(),
  squawk: z.string().nullable(),
  holdingPoint: z.string().nullable(),
  qnh: z.string().nullable(),
  destination: z.string().nullable(),
  origin: z.string().nullable(),
  sid: z.string().nullable(),
  isTransfered: z.boolean(),
  isClearedForDeparture: z.boolean(),
})

export type CreateFlightData = z.infer<typeof FlightDataSchema>
export type FlightData = CreateFlightData & { version: number }
