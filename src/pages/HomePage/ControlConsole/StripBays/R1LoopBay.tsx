import { FC } from 'react'
import { InfoStrip } from '@/components/InfoStrip'
import { StripBay } from './StripBay'
import { FlightStripLocation, useFlightStore } from '@/store'

export const R1LoopBay: FC = () => {
  const strips = useFlightStore((state) => state.flights.R1_LOOP)

  return (
    <StripBay
      allowedStripTypes={[]}
      strips={strips}
      location={FlightStripLocation.R1_LOOP}
    >
      <InfoStrip
        items={[
          { value: 'R1 Loop', basis: '100px', align: 'left' },
          { value: strips.length },
          { value: 'HD' },
          { value: 'UNHD' },
          { value: 'NEW VEH' },
        ]}
      />
    </StripBay>
  )
}
