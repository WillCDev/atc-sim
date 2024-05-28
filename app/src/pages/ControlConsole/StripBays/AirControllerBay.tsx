import { FC } from 'react'
import { InfoStrip } from '@/components/InfoStrip'
import { StripBay } from '@/components/StripBay'
import { useFlightStore } from '@/store'
import { FlightStripLocation } from '@/types'

export const AirControllerBay: FC = () => {
  const strips = useFlightStore((state) => state.flightLocations.AIR_CONTROLLER)

  return (
    <StripBay strips={strips} location={FlightStripLocation.AIR_CONTROLLER}>
      <InfoStrip
        items={[
          { value: 'AIR CONTROLLER', basis: '150px', align: 'left' },
          { value: strips.length },
          { value: 'RETRIEVE  ', basis: '100px' },
          { value: 'HD' },
          { value: 'UNHD' },
        ]}
      />
    </StripBay>
  )
}
