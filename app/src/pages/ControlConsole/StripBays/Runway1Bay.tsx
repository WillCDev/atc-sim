import { FC } from 'react'
import { InfoStrip } from '@/components/InfoStrip'
import { StripBay } from '@/components/StripBay'
import { useFlightStore } from '@/store'
import { FlightStripLocation } from '@/types'

export const Runway1Bay: FC = () => {
  const strips = useFlightStore((state) => state.flightLocations.RUNWAY_1)

  return (
    <StripBay strips={strips} location={FlightStripLocation.RUNWAY_1}>
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
