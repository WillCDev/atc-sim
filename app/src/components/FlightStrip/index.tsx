import { FC, memo } from 'react'
import { TowerArrivalStrip } from './TowerArrivalStrip'
import { RadarArrivalStrip } from './RadarArrivalStrip'
import { DepartureStrip } from './DepartureStrip'
import { useFlightStore, useSimStore } from '@/store'
import { FlightStripLocation } from '@/types'

interface Props {
  callsign: string
  location: FlightStripLocation
}

const FlightStripBase: FC<Props> = ({ callsign, location }) => {
  const dataSource =
    location === FlightStripLocation.UNASSIGNED ? 'pendingFlights' : 'flights'

  const data = useFlightStore((state) => state[dataSource][callsign])
  const simType = useSimStore((state) => state.simType)

  if (!data) return null

  if (data.type === 'arrival') {
    if (simType === 'tower') return <TowerArrivalStrip data={data} location={location} />
    return <RadarArrivalStrip data={data} location={location} />
  }

  return <DepartureStrip data={data} location={location} />
}

export const FlightStrip = memo(FlightStripBase)
