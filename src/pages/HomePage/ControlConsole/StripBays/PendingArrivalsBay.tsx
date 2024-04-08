import { FC } from 'react'
import { InfoStrip } from '@/components/InfoStrip'
import { FlightStripLocation, useFlightStore } from '@/store'
import { StripBay } from './StripBay'

export const PendingArrivalsBay: FC = () => {
  const strips = useFlightStore((state) => state.flights.PENDING_ARRIVALS)

  return (
    <StripBay
      strips={strips}
      allowedStripTypes={[]}
      location={FlightStripLocation.PENDING_ARRIVALS}
    >
      <InfoStrip
        items={[
          { value: 'PEND ARR', width: '80px' },
          { value: strips.length },
          { value: 'ACTIVATE' },
          { value: 'NEW' },
          { value: 'HD' },
          { value: 'UNHD' },
          { value: 'SM' },
          { value: 'LG' },
        ]}
      />
    </StripBay>
  )
}
