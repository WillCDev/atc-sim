import { FC } from 'react'
import { ArrivalStrip } from './ArrivalStrip'
import { DepartureStrip } from './DepartureStrip'
import type { FlightStripLocation } from '@/store'

interface Props {
  data: FlightStripData
  canTransferDepartures: boolean
  canTransferArrivals: boolean
  canTimestamp: boolean
  location: FlightStripLocation
}

export const FlightStrip: FC<Props> = ({
  data,
  canTransferDepartures,
  canTransferArrivals,
  canTimestamp,
  location,
}) => {
  if (data.type === 'arrival')
    return (
      <ArrivalStrip
        data={data}
        location={location}
        canBeTranfered={canTransferArrivals}
        canTimeStamp={canTimestamp && data.arrivalTime === null && !data.isTransfered}
      />
    )
  return (
    <DepartureStrip
      data={data}
      location={location}
      canBeTranfered={canTransferDepartures && !data.isTransfered}
      canTimeStamp={canTimestamp && data.departureTime === null && !data.isTransfered}
    />
  )
}
