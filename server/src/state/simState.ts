import { SimState } from '../types'
import { flightState } from './flightsState'

const SimDefaults: SimState = {
  simType: 'tower',
  arrivalRunway: null,
  departureRunway: null,
  qnh: null,
  started: false,
}

type OnChangeHandler = (state: SimState) => void

class Sim {
  private data: SimState
  private onChangeHandler: OnChangeHandler | null = null
  private onResetHandler: OnChangeHandler | null = null

  constructor() {
    this.data = { ...SimDefaults }
  }

  public getSimData(): SimState {
    return { ...this.data }
  }

  public setSimData(simData: SimState): void {
    this.data = { ...simData }
    this.onChangeHandler?.(this.data)
  }

  public resetSimData(): void {
    this.data = { ...SimDefaults }
    this.onChangeHandler?.(this.data)
    this.onResetHandler?.(this.data)
    flightState.resetFlights()
  }

  public onChange(cb: OnChangeHandler): void {
    this.onChangeHandler = cb
  }

  public onReset(cb: OnChangeHandler): void {
    this.onResetHandler = cb
  }
}

export const simState = new Sim()
