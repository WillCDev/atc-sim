import { FC } from 'react'
import { Colors } from '@/constants/styles'
import { InfoStrip } from '@/components/InfoStrip'
import { StripBay } from '@/components/StripBay'
import { useFlightStore } from '@/store'
import { FlightStripLocation } from '@/types'

export const HoldNorthBay: FC = () => {
  const strips = useFlightStore((state) => state.flightLocations.HOLD_N)

  return (
    <StripBay strips={strips} location={FlightStripLocation.HOLD_N}>
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
