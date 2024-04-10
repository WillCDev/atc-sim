import { FC, useEffect } from 'react'
import { ArrivalStrip } from './ArrivalStrip'
import { DepartureStrip } from './DepartureStrip'
import { useFlightStore } from '@/store'
import { FlightStripData, FlightStripLocation } from '@/types'

interface Props {
  data: FlightStripData
  canTransferDepartures: boolean
  canConfirmDepartureClearance: boolean
  canTimestamp: boolean
  location: FlightStripLocation
}

export const FlightStrip: FC<Props> = ({
  data,
  canTransferDepartures,
  canConfirmDepartureClearance,
  canTimestamp,
  location,
}) => {
  const removeStrip = useFlightStore((state) => state.removeStrip)

  useEffect(() => {
    if (data.isTransfered) {
      const random1To4 = Math.floor(Math.random() * 4) + 1
      const timer = setTimeout(() => {
        removeStrip({ callsign: data.callsign, location })
        clearTimeout(timer)
      }, random1To4 * 1000)

      return () => clearTimeout(timer)
    }
  }, [data.isTransfered])

  if (data.type === 'arrival') return <ArrivalStrip data={data} location={location} />

  return (
    <DepartureStrip
      data={data}
      location={location}
      canBeTranfered={canTransferDepartures && !data.isTransfered}
      canBeClearedForDeparture={canConfirmDepartureClearance}
      canTimeStamp={
        canTimestamp &&
        data.departureTime === null &&
        !data.isTransfered &&
        data.isClearedForDeparture
      }
    />
  )
}
