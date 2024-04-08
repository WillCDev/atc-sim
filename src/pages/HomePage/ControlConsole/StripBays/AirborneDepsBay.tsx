import { FC } from 'react'
import { InfoStrip } from '@/components/InfoStrip'
import { StripBay } from './StripBay'
import { FlightStripLocation, useFlightStore } from '@/store'

export const AirborneDepsBay: FC = () => {
  const strips = useFlightStore((state) => state.flights.AIRBORNE_DEPS)

  return (
    <StripBay
      allowedStripTypes={['departure']}
      canTransferDepartures
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
