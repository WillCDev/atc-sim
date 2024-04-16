import express, { Request, Response } from 'express'
import { MyResponse, SimState, SimStateSchema } from '../types'
import { flightState } from '../flightsState'
import { simState } from '../simState'

export const simRouter = express.Router({ mergeParams: true })

simRouter.get('/', async (_: Request, res: Response<MyResponse<SimState>>) => {
  try {
    const simData = simState.getSimData()
    return res.status(200).json({ data: simData })
  } catch (err: any) {
    console.error(err)
    return res.status(500).json({ err: err.message })
  }
})

simRouter.post(
  '/',
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

simRouter.post('/reset', async (_: Request, res: Response<MyResponse<SimState>>) => {
  try {
    simState.resetSimData()
    flightState.resetFlights()
    return res.status(200).json({ data: simState.getSimData() })
  } catch (err: any) {
    console.error(err)
    return res.status(500).json({ err: err.message })
  }
})
