import express, { Express, Request, Response } from 'express'

import dotenv from 'dotenv'
import {
  CreateFlightData,
  FlightData,
  FlightDataSchema,
  MyResponse,
  SimState,
  SimStateSchema,
} from './types'
import { Sim } from './simState'
import { flightsRouter } from './routes/flights.routes'
import { flightState } from './flightsState'

dotenv.config()

const app: Express = express()
// const expressWs = require('express-ws')(app)

app.use(express.json())
const port = process.env.PORT || 3001

const simState = new Sim()

const pendingFlightsEndpoint = '/api/pendingFlights'
const simEndpoint = '/api/sim'

app.use(function (_req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  next()
})

app.use('/api/flights', flightsRouter)

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
    flightState.resetFlights()
    return res.status(200).json({ data: simState.getSimData() })
  } catch (err: any) {
    console.error(err)
    return res.status(500).json({ err: err.message })
  }
})

app.listen(port, () => {
  console.log(`⚡️[server]: Port: ${port}`)
})
