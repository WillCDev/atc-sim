import { FC, memo } from 'react'
import { ArrivalStrip } from './ArrivalStrip'
import { DepartureStrip } from './DepartureStrip'
import { useFlightStore } from '@/store'
import { FlightStripLocation } from '@/types'

interface Props {
  callsign: string
  location: FlightStripLocation
}

const FlightStripBase: FC<Props> = ({ callsign, location }) => {
  const dataSource =
    location === FlightStripLocation.UNASSIGNED ? 'pendingFlights' : 'flights'
  const data = useFlightStore((state) => state[dataSource][callsign])

  // const removeFlight = (callsign: string, immediate?: true) => {
  //   const random1To4 = Math.floor(Math.random() * 4) + 1
  //   const timer = setTimeout(
  //     () => {
  //       deleteFlight(callsign)
  //       clearTimeout(timer)
  //     },
  //     immediate ? 0 : random1To4 * 1000
  //   )
  // }

  if (!data) return null

  if (data.type === 'arrival') return <ArrivalStrip data={data} location={location} />

  return <DepartureStrip data={data} location={location} />
}

export const FlightStrip = memo(FlightStripBase)
