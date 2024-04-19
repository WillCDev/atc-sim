import { FC } from 'react'
import { InfoStrip } from '@/components/InfoStrip'
import { StripBay } from '../../../../components/StripBay'
import { useFlightStore } from '@/store'
import { FlightStripLocation } from '@/types'

export const HoldSouthBay: FC = () => {
  const strips = useFlightStore((state) => state.flightLocations.HOLD_S)

  return (
    <StripBay
      allowedStripTypes={['departure']}
      strips={strips}
      location={FlightStripLocation.HOLD_S}
    >
      <InfoStrip
        items={[
          { value: 'HOLD S', basis: '100px', align: 'left' },
          { value: strips.length },
          { value: 'HIDE' },
          { value: 'UNHD' },
          { value: 'NEW VEH' },
        ]}
      />
    </StripBay>
  )
}
