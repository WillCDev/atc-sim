import { wsEndpoint } from './api'

export const connectToWs = () => {
  const ws = new WebSocket(wsEndpoint)

  ws.onopen = () => {
    console.log('Connected to ws')
  }

  ws.onmessage = (message) => {
    console.log('Received message:', message.data)
  }

  ws.onclose = () => {
    console.log('Disconnected from ws')
  }

  return ws
}
