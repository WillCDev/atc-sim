import express, { Express } from 'express'
import dotenv from 'dotenv'
import { flightsRouter } from './routes/flights.routes'
import { pendingFlightsRouter } from './routes/pendingFlights.routes'
import { simRouter } from './routes/sim.routes'

dotenv.config()

const app: Express = express()
// const expressWs = require('express-ws')(app)

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

app.listen(port, () => {
  console.log(`⚡️[server]: Port: ${port}`)
})
