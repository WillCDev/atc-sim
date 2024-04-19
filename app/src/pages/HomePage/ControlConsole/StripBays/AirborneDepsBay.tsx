import { FC } from 'react'
import { InfoStrip } from '@/components/InfoStrip'
import { StripBay } from '../../../../components/StripBay'
import { useFlightStore, useSimStore } from '@/store'
import { FlightStripLocation } from '@/types'

export const AirborneDepsBay: FC = () => {
  const strips = useFlightStore((state) => state.flightLocations.AIRBORNE_DEPS)
  const isDualRunway = useSimStore((state) => state.isDualRunway)

  return (
    <StripBay
      allowedStripTypes={isDualRunway ? [] : ['departure']}
      strips={strips}
      location={FlightStripLocation.AIRBORNE_DEPS}
    >
      <InfoStrip
        items={[
          { value: 'AIRBORNE DEP', basis: '150px', align: 'left' },
          { value: strips.length },
          { value: 'UNHD' },
          { value: 'BACK TO RWY' },
        ]}
      />
    </StripBay>
  )
}
