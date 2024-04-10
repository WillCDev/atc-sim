import { FC } from 'react'
import { InfoStrip } from '@/components/InfoStrip'
import { StripBay } from './StripBay'
import { useFlightStore, useSimStore } from '@/store'
import { FlightStripLocation } from '@/types'

export const HoldSouthBay: FC = () => {
  const strips = useFlightStore((state) => state.flightLocations.HOLD_S)
  const isDualRunway = useSimStore((state) => state.isDualRunway)

  return (
    <StripBay
      allowedStripTypes={['departure']}
      strips={strips}
      location={FlightStripLocation.HOLD_S}
      canTransferDepartures={isDualRunway}
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
