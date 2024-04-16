import express from 'express'
import dotenv from 'dotenv'

import { flightsRouter } from './routes/flights.routes'
import { pendingFlightsRouter } from './routes/pendingFlights.routes'
import { simRouter } from './routes/sim.routes'
import { simState } from './state/simState'
import e from 'express'

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
    client.send(JSON.stringify({ type: 'SIM', payload: state }))
  })
})

// @ts-ignore
app.ws('/', () => {
  console.log('ws connection')
})

app.listen(port, () => {
  console.log(`⚡️[server]: Port: ${port}`)
})
