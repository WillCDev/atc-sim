import { FC } from 'react'
import { ArrivalStrip } from './ArrivalStrip'
import { DepartureStrip } from './DepartureStrip'
import type { FlightStripLocation } from '@/store'

interface Props {
  data: FlightStripData
  canTransferDepartures: boolean
  canTimestamp: boolean
  location: FlightStripLocation
}

export const FlightStrip: FC<Props> = ({
  data,
  canTransferDepartures,
  canTimestamp,
  location,
}) => {
  if (data.type === 'arrival') return <ArrivalStrip data={data} />
  return (
    <DepartureStrip
      data={data}
      location={location}
      canBeTranfered={canTransferDepartures && !data.isTransfered}
      canTimeStamp={canTimestamp && data.departureTime === null}
    />
  )
}
