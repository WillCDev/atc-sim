import ObjectsToCsv from 'objects-to-csv'
import express, { Express, Request, Response } from 'express'
import { FlightsState } from './flightsState'
import dotenv from 'dotenv'
import {
  CreateFlightData,
  FlightData,
  FlightDataSchema,
  SimState,
  SimStateSchema,
} from './types'
import { Sim } from './simState'

dotenv.config()

const app: Express = express()
app.use(express.json())
const port = process.env.PORT || 3001

const flightState = new FlightsState()
const simState = new Sim()

const flightsEndpoint = '/api/flights'
const pendingFlightsEndpoint = '/api/pendingFlights'
const simEndpoint = '/api/sim'
type MyResponse<T> = { data?: T; err?: string }

app.get(
  flightsEndpoint,
  async (req: Request, res: Response<MyResponse<FlightData[]> | string>) => {
    try {
      const flights = flightState.getFlights()
      if (req.headers['accept'] === 'text/csv') {
        return new ObjectsToCsv(flights.map(({ type, callsign }) => ({ type, callsign })))
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

app.get(
  pendingFlightsEndpoint,
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

app.put(
  flightsEndpoint,
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

app.put(
  pendingFlightsEndpoint,
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

app.delete(
  `${flightsEndpoint}/:callsign`,
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

app.delete(
  `${pendingFlightsEndpoint}/:callsign`,
  async (
    req: Request<{ callsign: string }, {}, {}>,
    res: Response<MyResponse<FlightData[]>>
  ) => {
    const id = req.params.callsign
    console.log(id)
    try {
      const flights = flightState.deletePendingFlight(id)

      return res.status(200).json({ data: flights })
    } catch (err) {
      console.error(err)
      return res.status(404).json({ err: 'Flight Not Found' })
    }
  }
)

app.get(simEndpoint, async (_: Request, res: Response<MyResponse<SimState>>) => {
  try {
    const simData = simState.getSimData()
    return res.status(200).json({ data: simData })
  } catch (err: any) {
    console.error(err)
    return res.status(500).json({ err: err.message })
  }
})

app.post(
  simEndpoint,
  async (req: Request<{}, {}, SimState>, res: Response<MyResponse<SimState>>) => {
    try {
      const { success } = SimStateSchema.safeParse(req.body)
      if (!success) return res.status(400).json({ err: 'Invalid Sim Data' })

      simState.setSimData(req.body)
      return res.status(201).json({ data: req.body })
    } catch (err: any) {
      console.error(err)
      return res.status(500).json({ err: err.message })
    }
  }
)

app.delete(simEndpoint, async (_: Request, res: Response<MyResponse<SimState>>) => {
  try {
    simState.resetSimData()
    return res.status(200).json({ data: simState.getSimData() })
  } catch (err: any) {
    console.error(err)
    return res.status(500).json({ err: err.message })
  }
})

app.listen(port, () => {
  console.log(`⚡️[server]: Port: ${port}`)
})
