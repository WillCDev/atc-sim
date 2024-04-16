import express from 'express'
import dotenv from 'dotenv'

import { flightsRouter } from './routes/flights.routes'
import { pendingFlightsRouter } from './routes/pendingFlights.routes'
import { simRouter } from './routes/sim.routes'
import { simState } from './state/simState'
import e from 'express'
import { flightState } from './state/flightsState'

dotenv.config()

const app = express()
const expressWs = require('express-ws')(app)

app.use(express.json())
const port = process.env.PORT || 3001

app.use(function (_req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  next()
})

app.use('/api/flights', flightsRouter)
app.use('/api/pendingFlights', pendingFlightsRouter)
app.use('/api/sim', simRouter)

simState.onChange((state) => {
  expressWs.getWss().clients.forEach((client: any) => {
    client.send(JSON.stringify({ type: 'SIM_DATA', payload: state }))
  })
})

flightState.onFlightChange((data) => {
  expressWs.getWss().clients.forEach((client: any) => {
    client.send(JSON.stringify({ type: 'FLIGHT', ...data }))
  })
})

flightState.onPendingFlightChange((data) => {
  expressWs.getWss().clients.forEach((client: any) => {
    client.send(JSON.stringify({ type: 'PENDING_FLIGHT', ...data }))
  })
})

// @ts-ignore
app.ws('/', (ws) => {
  console.log('ws connection')
  ws.send(JSON.stringify({ type: 'SIM_DATA', payload: simState.getSimData() }))
  ws.send(JSON.stringify({ type: 'FLIGHTS', payload: flightState.getFlights() }))
  ws.send(
    JSON.stringify({ type: 'PENDING_FLIGHTS', payload: flightState.getPendingFlights() })
  )
})

app.listen(port, () => {
  console.log(`⚡️[server]: Port: ${port}`)
})
