import { FC } from 'react'
import { InfoStrip } from '@/components/InfoStrip'
import { StripBay } from './StripBay'
import { FlightStripLocation, useFlightStore } from '@/store'

export const Runway1Bay: FC = () => {
  const strips = useFlightStore((state) => state.flights.RUNWAY_1)

  return (
    <StripBay
      allowedStripTypes={['arrival', 'departure']}
      canTimestamp
      strips={strips}
      location={FlightStripLocation.RUNWAY_1}
      canTransferArrivals
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
