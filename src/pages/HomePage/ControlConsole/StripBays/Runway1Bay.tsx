import { FC } from 'react'
import { InfoStrip } from '@/components/InfoStrip'
import { StripBay } from './StripBay'
import { useFlightStore, useSimStore } from '@/store'
import { FlightStripLocation } from '@/types'

export const Runway1Bay: FC = () => {
  const strips = useFlightStore((state) => state.flightLocations.RUNWAY_1)
  const isDualRunway = useSimStore((state) => state.isDualRunway)

  return (
    <StripBay
      allowedStripTypes={['arrival', 'departure']}
      canTimestamp={!isDualRunway}
      strips={strips}
      location={FlightStripLocation.RUNWAY_1}
      canConfirmDepartureClearance={!isDualRunway}
    >
      <InfoStrip
        items={[
          { value: 'RUNWAY 1', basis: '100px', align: 'left' },
          { value: strips.length },
          { value: 'RETRIEVE' },
          { value: 'OP STATUS', gap: 12 },
        ]}
        buttons={[{ value: 'X', width: '100px', color: 'red', grow: true }]}
      />
    </StripBay>
  )
}
