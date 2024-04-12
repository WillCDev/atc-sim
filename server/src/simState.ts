import { SimState } from './types'

const SimDefaults: SimState = {
  simType: 'tower',
  arrivalRunway: null,
  departureRunway: null,
  qnh: null,
  started: false,
}

export class Sim {
  private data: SimState

  constructor() {
    this.data = { ...SimDefaults }
  }

  public getSimData(): SimState {
    return { ...this.data }
  }

  public setSimData(simData: SimState): void {
    console.log(simData)
    this.data = { ...simData }
  }

  public resetSimData(): void {
    this.data = { ...SimDefaults }
  }
}
