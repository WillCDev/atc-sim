import { SimState } from '@/store'
import { wsEndpoint } from './api'
import { FlightStripData } from '@/types'

interface SimMessage {
  type: 'SIM_DATA'
  payload: Partial<SimState>
}

interface FlightMessage {
  type: 'FLIGHT' | 'PENDING_FLIGHT'
  action: 'UPSERT'
  payload: FlightStripData
}

interface DeletedFlightMessage {
  type: 'FLIGHT' | 'PENDING_FLIGHT'
  action: 'DELETE'
  payload: string
}

interface BatchFlightsMessage {
  type: 'FLIGHT' | 'PENDING_FLIGHT'
  action: 'BATCH'
  payload: FlightStripData[]
}

type WsMessage = SimMessage | FlightMessage | DeletedFlightMessage | BatchFlightsMessage

class WebsocketServer {
  private ws: WebSocket
  private simChangeHandlers: Set<(state: Partial<SimState>) => void> = new Set()
  private flightChangeHandlers: Set<(state: FlightStripData) => void> = new Set()
  private flightRemovalHandlers: Set<(callsign: string) => void> = new Set()
  private flightBatchHandlers: Set<(flights: FlightStripData[]) => void> = new Set()
  private pendingFlightBatchHandlers: Set<(flights: FlightStripData[]) => void> =
    new Set()
  private pendingFlightChangeHandlers: Set<(state: FlightStripData) => void> = new Set()
  private pendingFlightRemovalHandlers: Set<(callsign: string) => void> = new Set()

  constructor() {
    this.ws = new WebSocket(wsEndpoint)

    this.ws.onopen = () => {
      console.log('Connected to ws')
    }

    this.ws.onmessage = (message) => {
      console.log('Received message:', message.data)
      this.handleMessage(JSON.parse(message.data))
    }

    this.ws.onclose = () => {
      console.log('Disconnected from ws')
    }
  }

  private handleMessage(message: WsMessage) {
    if (message.type == 'SIM_DATA') {
      this.broadcastSimChange(message.payload)
    } else if (message.type == 'FLIGHT') {
      if (message.action == 'UPSERT') {
        console.log('broadcasting flight change', message.payload)
        this.broadcastFlightChange(message.payload)
      }
      if (message.action == 'DELETE') {
        this.broadcastFlightRemoval(message.payload)
      }
      if (message.action == 'BATCH') {
        this.broadcastFlightBatch(message.payload)
      }
    } else if (message.type == 'PENDING_FLIGHT') {
      if (message.action == 'UPSERT') {
        this.broadcastPendingFlightChange(message.payload)
      }
      if (message.action == 'DELETE') {
        this.broadcastPendingFlightRemoval(message.payload)
      }
      if (message.action == 'BATCH') {
        this.broadcastPendingFlightBatch(message.payload)
      }
    }
  }

  private broadcastSimChange(state: Partial<SimState>) {
    this.simChangeHandlers.forEach((handler) => handler(state))
  }

  private broadcastFlightChange(state: FlightStripData) {
    this.flightChangeHandlers.forEach((handler) => handler(state))
  }

  private broadcastFlightRemoval(callsign: string) {
    this.flightRemovalHandlers.forEach((handler) => handler(callsign))
  }

  private broadcastFlightBatch(flights: FlightStripData[]) {
    this.flightBatchHandlers.forEach((handler) => handler(flights))
  }

  private broadcastPendingFlightBatch(flights: FlightStripData[]) {
    this.pendingFlightBatchHandlers.forEach((handler) => handler(flights))
  }

  private broadcastPendingFlightChange(state: FlightStripData) {
    this.pendingFlightChangeHandlers.forEach((handler) => handler(state))
  }

  private broadcastPendingFlightRemoval(callsign: string) {
    this.pendingFlightRemovalHandlers.forEach((handler) => handler(callsign))
  }

  public onSimChange(handler: (state: Partial<SimState>) => void) {
    this.simChangeHandlers.add(handler)
  }

  public unregisterSimChange(handler: (state: Partial<SimState>) => void) {
    this.simChangeHandlers.delete(handler)
  }

  public onFlightChange(handler: (flight: FlightStripData) => void) {
    this.flightChangeHandlers.add(handler)
  }

  public unregisterFlightChange(handler: (flight: FlightStripData) => void) {
    this.flightChangeHandlers.delete(handler)
  }

  public onFlightRemoval(handler: (callsign: string) => void) {
    this.flightRemovalHandlers.add(handler)
  }

  public unregisterFlightRemoval(handler: (callsign: string) => void) {
    this.flightRemovalHandlers.delete(handler)
  }

  public onFlightBatch(handler: (flights: FlightStripData[]) => void) {
    this.flightBatchHandlers.add(handler)
  }

  public unregisterFlightBatch(handler: (flights: FlightStripData[]) => void) {
    this.flightBatchHandlers.delete(handler)
  }

  public onPendingFlightBatch(handler: (flights: FlightStripData[]) => void) {
    this.pendingFlightBatchHandlers.add(handler)
  }

  public unregisterPendingFlightBatch(handler: (flights: FlightStripData[]) => void) {
    this.pendingFlightBatchHandlers.delete(handler)
  }

  public onPendingFlightChange(handler: (flight: FlightStripData) => void) {
    this.pendingFlightChangeHandlers.add(handler)
  }

  public unregisterPendingFlightChange(handler: (flight: FlightStripData) => void) {
    this.pendingFlightChangeHandlers.delete(handler)
  }

  public onPendingFlightRemoval(handler: (callsign: string) => void) {
    this.pendingFlightRemovalHandlers.add(handler)
  }

  public unregisterPendingFlightRemoval(handler: (callsign: string) => void) {
    this.pendingFlightRemovalHandlers.delete(handler)
  }
}

export const WSServer = new WebsocketServer()
