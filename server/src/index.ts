import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import { flightsRouter } from './routes/flights.routes'
import { pendingFlightsRouter } from './routes/pendingFlights.routes'
import { simRouter } from './routes/sim.routes'
import { simState } from './state/simState'
import { flightState } from './state/flightsState'

dotenv.config()

const app = express()
app.use(cors())
const expressWs = require('express-ws')(app)
const port = process.env.PORT || 3001

app.use(function (_req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  next()
})
app.use(express.json())

app.use('/api/flights', flightsRouter)
app.use('/api/pendingFlights', pendingFlightsRouter)
app.use('/api/sim', simRouter)

simState.onChange((state) => {
  expressWs.getWss().clients.forEach((client: any) => {
    client.send(JSON.stringify({ type: 'SIM_DATA', payload: state }))
  })
})

simState.onReset((state) => {
  expressWs.getWss().clients.forEach((client: any) => {
    client.send(JSON.stringify({ type: 'RESET', payload: state }))
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
  ws.send(
    JSON.stringify({ type: 'FLIGHT', action: 'BATCH', payload: flightState.getFlights() })
  )
  ws.send(
    JSON.stringify({
      type: 'PENDING_FLIGHT',
      action: 'BATCH',
      payload: flightState.getPendingFlights(),
    })
  )
})

app.listen(port, () => {
  console.log(`⚡️[server]: Port: ${port}`)
})
