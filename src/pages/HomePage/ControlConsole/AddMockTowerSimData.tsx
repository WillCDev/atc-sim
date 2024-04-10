import { useFlightStore } from '@/store'
import { mockArrivals, mockDepartures } from '@/store/mockFlights'
import { FC, useEffect } from 'react'

export const AddMockTowerSimData: FC = () => {
  const flights = useFlightStore((state) => state.flights)
  const insertArrival = useFlightStore((state) => state.insertNewArrival)
  const insertDeparture = useFlightStore((state) => state.insertNewDeparture)

  useEffect(() => {
    mockArrivals.forEach((arrival) => {
      if (!flights[arrival.callsign]) {
        insertArrival(arrival)
      }
    })
    mockDepartures.forEach((departure) => {
      if (!flights[departure.callsign]) {
        insertDeparture(departure)
      }
    })
  }, [])

  return null
}
