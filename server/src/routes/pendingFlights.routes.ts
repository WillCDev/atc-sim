import express, { Request, Response } from 'express'
import { CreateFlightData, FlightData, FlightDataSchema, MyResponse } from '../types'
import { flightState } from '../state/flightsState'

export const pendingFlightsRouter = express.Router({ mergeParams: true })

pendingFlightsRouter.get(
  '/',
  async (_: Request, res: Response<MyResponse<FlightData[]>>) => {
    try {
      const flights = flightState.getPendingFlights()
      return res.status(200).json({ data: flights })
    } catch (err: any) {
      console.error(err)
      return res.status(500).json({ err: err.message })
    }
  }
)

pendingFlightsRouter.put(
  '/',
  async (
    req: Request<{}, {}, CreateFlightData>,
    res: Response<MyResponse<FlightData>>
  ) => {
    try {
      const { success } = FlightDataSchema.safeParse(req.body)
      if (!success) return res.status(400).json({ err: 'Invalid Flight Data' })

      const flight = flightState.upsertPendingFlight(req.body)
      return res.status(201).json({ data: flight })
    } catch (err: any) {
      console.error(err)
      return res.status(500).json({ err: err.message })
    }
  }
)

pendingFlightsRouter.delete(
  '/:callsign',
  async (
    req: Request<{ callsign: string }, {}, {}>,
    res: Response<MyResponse<FlightData[]>>
  ) => {
    const id = req.params.callsign
    try {
      const flights = flightState.deletePendingFlight(id)

      return res.status(200).json({ data: flights })
    } catch (err) {
      console.error(err)
      return res.status(404).json({ err: 'Flight Not Found' })
    }
  }
)
