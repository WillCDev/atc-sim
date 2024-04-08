import { FC } from 'react'
import { InfoStrip } from '@/components/InfoStrip'
import { StripBay } from './StripBay'
import { FlightStripLocation, useFlightStore } from '@/store'

export const ArrivalSeqBay: FC = () => {
  const strips = useFlightStore((state) => state.flights.ARRIVAL_SEQ)

  return (
    <StripBay
      allowedStripTypes={['arrival']}
      strips={strips}
      location={FlightStripLocation.ARRIVAL_SEQ}
    >
      <InfoStrip
        items={[
          { value: 'ARR SEQUENCE', width: '150px' },
          { value: strips.length },
          { value: 'RETURN FROM AIR' },
          { value: 'HD' },
          { value: 'UNHD' },
          { value: 'DIVERT' },
          { value: 'SM' },
          { value: 'LG' },
        ]}
      />
    </StripBay>
  )
}
