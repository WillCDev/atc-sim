import { FC } from 'react'
import { InfoStrip } from '@/components/InfoStrip'
import { useFlightStore } from '@/store'
import { StripBay } from '../../../../components/StripBay'
import { FlightStripLocation } from '@/types'

export const PendingArrivalsBay: FC = () => {
  const strips = useFlightStore((state) => state.flightLocations.PENDING_ARRIVALS)

  return (
    <StripBay
      strips={strips}
      allowedStripTypes={['arrival']}
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
