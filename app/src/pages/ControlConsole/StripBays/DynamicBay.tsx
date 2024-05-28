import { FC } from 'react'
import { InfoStrip } from '@/components/InfoStrip'
import { StripBay } from '@/components/StripBay'
import { useFlightStore } from '@/store'
import { FlightStripLocation } from '@/types'

export const DynamicBay: FC = () => {
  const strips = useFlightStore((state) => state.flightLocations.DYNAMIC)

  return (
    <StripBay strips={strips} location={FlightStripLocation.DYNAMIC}>
      <InfoStrip
        items={[
          { value: 'DYNAMIC', basis: '150px', align: 'left' },
          { value: strips.length },
          { value: 'HIDE', basis: '80px' },
          { value: 'UNHIDE', basis: '80px' },
          { value: 'NEW', basis: '100px' },
          { value: 'ACT OV' },
          { value: 'DIVERT' },
        ]}
      />
    </StripBay>
  )
}
