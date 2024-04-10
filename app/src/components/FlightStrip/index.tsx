import { FC, memo, useEffect } from 'react'
import { ArrivalStrip } from './ArrivalStrip'
import { DepartureStrip } from './DepartureStrip'
import { useFlightStore } from '@/store'
import { FlightStripLocation } from '@/types'

interface Props {
  callsign: string
  location: FlightStripLocation
}

const FlightStripBase: FC<Props> = ({ callsign, location }) => {
  const data = useFlightStore((state) => state.flights[callsign])
  const removeStrip = useFlightStore((state) => state.removeStrip)

  useEffect(() => {
    if (data?.isTransfered) {
      const random1To4 = Math.floor(Math.random() * 4) + 1
      const timer = setTimeout(() => {
        removeStrip({ callsign: data.callsign, location: location })
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
