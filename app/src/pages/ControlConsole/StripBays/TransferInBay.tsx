import { FC } from 'react'
import { InfoStrip } from '@/components/InfoStrip'
import { StripBay } from '@/components/StripBay'
import { useFlightStore } from '@/store'
import { FlightStripLocation } from '@/types'

export const TransferInBay: FC = () => {
  const strips = useFlightStore((state) => state.flightLocations.TRANSFER_IN)

  return (
    <StripBay strips={strips} location={FlightStripLocation.TRANSFER_IN}>
      <InfoStrip
        items={[
          { value: 'TRANSFER IN', basis: '150px', align: 'left' },
          { value: strips.length },
          { value: 'ACTIVATE', basis: '100px' },
          { value: 'NEW', basis: '100px' },
          { value: 'SM' },
          { value: 'LG' },
        ]}
      />
    </StripBay>
  )
}
