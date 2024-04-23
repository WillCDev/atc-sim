import { FC } from 'react'
import { InfoStrip } from '@/components/InfoStrip'
import { StripBay } from '@/components/StripBay'
import { useFlightStore } from '@/store'
import { FlightStripLocation } from '@/types'

export const R1LoopBay: FC = () => {
  const strips = useFlightStore((state) => state.flightLocations.R1_LOOP)

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
