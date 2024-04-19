import express, { Request, Response } from 'express'
import ObjectsToCsv from 'objects-to-csv'
import { CreateFlightData, FlightData, FlightDataSchema, MyResponse } from '../types'
import { flightState } from '../state/flightsState'

export const flightsRouter = express.Router({ mergeParams: true })

flightsRouter.get(
  '/',
  async (req: Request, res: Response<MyResponse<FlightData[]> | string>) => {
    try {
      const flights = flightState.getFlights()
      if (req.headers['accept'] === 'text/csv') {
        return new ObjectsToCsv(
          flights.map(({ type, callsign, holdingPoint }) => ({
            type,
            callsign,
            holdingPoint,
          }))
        )
          .toString()
          .then((csv: string) => {
            res.setHeader('Content-Type', 'text/csv')
            res.setHeader('Content-Disposition', 'attachment; filename="flights.csv"')
            return res.status(200).send(csv)
          })
      }
      return res.status(200).json({ data: flights })
    } catch (err: any) {
      console.error(err)
      return res.status(500).json({ err: err.message })
    }
  }
)

flightsRouter.put(
  '/',
  async (
    req: Request<{}, {}, CreateFlightData>,
    res: Response<MyResponse<FlightData>>
  ) => {
    try {
      const { success } = FlightDataSchema.safeParse(req.body)
      if (!success) return res.status(400).json({ err: 'Invalid Flight Data' })

      const flight = flightState.upsertFlight(req.body)
      return res.status(201).json({ data: flight })
    } catch (err: any) {
      console.error(err)
      return res.status(500).json({ err: err.message })
    }
  }
)

flightsRouter.delete(
  '/:callsign',
  async (
    req: Request<{ callsign: string }, {}, {}>,
    res: Response<MyResponse<FlightData[]>>
  ) => {
    const id = req.params.callsign
    try {
      const flights = flightState.deleteFlight(id)

      return res.status(200).json({ data: flights })
    } catch (err) {
      console.error(err)
      return res.status(404).json({ err: 'Flight Not Found' })
    }
  }
)
