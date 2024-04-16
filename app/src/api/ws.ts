import { SimState } from '@/store'
import { wsEndpoint } from './api'

interface SimMessage {
  type: 'SIM_DATA'
  payload: SimState
}

class WebsocketServer {
  private ws: WebSocket
  private simChangeHandlers: Set<(state: SimState) => void> = new Set()

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

  private handleMessage(message: SimMessage) {
    if (message.type !== 'SIM_DATA') return console.error('Invalid message type')
    this.broadcastSimChange(message.payload)
  }

  private broadcastSimChange(state: SimState) {
    this.simChangeHandlers.forEach((handler) => handler(state))
  }

  public onSimChange(handler: (state: SimState) => void) {
    this.simChangeHandlers.add(handler)
  }

  public unregisterSimChange(handler: (state: SimState) => void) {
    this.simChangeHandlers.delete(handler)
  }
}

export const WSServer = new WebsocketServer()
