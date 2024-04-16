import { FC, useRef } from 'react'
import { connectToWs } from './api/ws'
import { useSimStore } from './store'

const connection = connectToWs()

export const WsSync: FC = () => {
  const hasLoaded = useRef(false)
  const setSimData = useSimStore((state) => state.setSimData)

  if (!hasLoaded.current) {
    hasLoaded.current = true

    connection.onmessage = (message) => {
      const data = JSON.parse(message.data)

      if (data.type === 'SIM_DATA') {
        setSimData(data.payload)
      }
    }
  }

  return null
}
