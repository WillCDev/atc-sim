import { FC } from 'react'
import { Colors } from '@/constants/styles'
import { InfoStrip } from '@/components/InfoStrip'
import { StripBay } from './StripBay'
import { FlightStripLocation, useFlightStore } from '@/store'

export const HoldNorthBay: FC = () => {
  const strips = useFlightStore((state) => state.flights.HOLD_N)

  return (
    <StripBay
      allowedStripTypes={['arrival', 'departure']}
      strips={strips}
      location={FlightStripLocation.HOLD_N}
      canTransferArrivals={true}
    >
      <InfoStrip
        items={[
          { value: 'HOLD N', basis: '100px', align: 'left' },
          { value: strips.length },
          { value: 'HIDE' },
          { value: 'UNHD' },
          { value: 'NEW VEH' },
          { value: 'PUSH + TAXI', color: Colors.darkGrey },
        ]}
      />
    </StripBay>
  )
}
