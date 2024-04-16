import { FC, useEffect } from 'react'
import { WSServer } from './api/ws'
import { useSimStore } from './store'

export const WsSync: FC = () => {
  const setSimData = useSimStore((state) => state.setSimData)

  useEffect(() => {
    WSServer.onSimChange(setSimData)
    return () => {
      WSServer.unregisterSimChange(setSimData)
    }
  }, [])

  return null
}
