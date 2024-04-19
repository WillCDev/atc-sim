import { FC, memo, useEffect } from 'react'
import { ArrivalStrip } from './ArrivalStrip'
import { DepartureStrip } from './DepartureStrip'
import { useFlightStore } from '@/store'
import { FlightStripLocation } from '@/types'
import { deleteFlight } from '@/api/flights'

interface Props {
  callsign: string
  location: FlightStripLocation
}

const FlightStripBase: FC<Props> = ({ callsign, location }) => {
  const dataSource =
    location === FlightStripLocation.UNASSIGNED ? 'pendingFlights' : 'flights'
  const data = useFlightStore((state) => state[dataSource][callsign])

  useEffect(() => {
    if (data?.isTransfered) {
      const random1To4 = Math.floor(Math.random() * 4) + 1
      const timer = setTimeout(() => {
        deleteFlight(data.callsign)
        clearTimeout(timer)
      }, random1To4 * 1000)

      return () => clearTimeout(timer)
    }
  }, [data?.isTransfered])

  if (!data) return null
  if (data.type === 'arrival') return <ArrivalStrip data={data} location={location} />

  return <DepartureStrip data={data} location={location} />
}

export const FlightStrip = memo(FlightStripBase)
