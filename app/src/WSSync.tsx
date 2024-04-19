import { FC, useEffect } from 'react'
import { WSServer } from './api/ws'
import { useFlightStore, useSimStore } from './store'
import { FlightStripData } from './types'

export const WsSync: FC = () => {
  const setSimData = useSimStore((state) => state.setSimData)
  const upsertFlight = useFlightStore((state) => state.upsertFlight)
  const upsertPendingFlight = useFlightStore((state) => state.upsertPendingFlight)
  const removeFlight = useFlightStore((state) => state.removeFlight)
  const removePendingFlight = useFlightStore((state) => state.removePendingFlight)
  const resetStore = useFlightStore((state) => state.reset)

  useEffect(() => {
    WSServer.onSimChange(setSimData)
    WSServer.onFlightChange(upsertFlight)
    WSServer.onPendingFlightChange(upsertPendingFlight)
    WSServer.onFlightRemoval(removeFlight)
    WSServer.onPendingFlightRemoval(removePendingFlight)
    WSServer.onReset(resetStore)

    const handleFlightBatch = (flights: FlightStripData[]) => {
      flights.forEach(upsertFlight)
    }
    WSServer.onFlightBatch(handleFlightBatch)

    const handlePendingFlightBatch = (flights: FlightStripData[]) => {
      flights.forEach(upsertPendingFlight)
    }
    WSServer.onPendingFlightBatch(handlePendingFlightBatch)

    return () => {
      WSServer.unregisterSimChange(setSimData)
      WSServer.unregisterFlightChange(upsertFlight)
      WSServer.unregisterPendingFlightChange(upsertPendingFlight)
      WSServer.unregisterFlightRemoval(removeFlight)
      WSServer.unregisterPendingFlightRemoval(removePendingFlight)
      WSServer.unregisterFlightBatch(handleFlightBatch)
      WSServer.unregisterPendingFlightBatch(handlePendingFlightBatch)
      WSServer.unregisterReset(resetStore)
    }
  }, [])

  return null
}
