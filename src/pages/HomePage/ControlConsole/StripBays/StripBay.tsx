import { FC } from 'react'
import { FlightStrip } from '@/components/FlightStrip'
import styled from 'styled-components'
import { useFlightStore } from '@/store'
import { FlightStripData, FlightStripLocation } from '@/types'

export interface StripBayProps {
  strips: string[]
  allowedStripTypes: Array<FlightStripData['type']>
  location: FlightStripLocation
  children: React.ReactNode
}

export const StripBay: FC<StripBayProps> = ({
  children,
  strips,
  allowedStripTypes,
  location,
}) => {
  const selectedStrip = useFlightStore((state) => state.selectedFlightStrip)
  const moveFlightStrip = useFlightStore((state) => state.moveFlightStrip)
  const timeStampStrip = useFlightStore((state) => state.timeStampStrip)

  const canReceiveStrip =
    !!selectedStrip && allowedStripTypes.includes(selectedStrip.type)

  const addTimeStamp =
    !!selectedStrip &&
    location === FlightStripLocation.AIRBORNE_DEPS &&
    selectedStrip.departureTime === null

  const handleClick = () => {
    if (canReceiveStrip) {
      moveFlightStrip({ location })
      if (addTimeStamp) timeStampStrip(selectedStrip.callsign)
    }
  }

  return (
    <Wrapper>
      <div style={{ flex: 0 }}>{children}</div>
      <ClickableArea onClick={handleClick} $enabled={canReceiveStrip} />
      <Bay>
        {strips.map((strip) => (
          <FlightStrip key={strip} callsign={strip} location={location} />
        ))}
      </Bay>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Bay = styled.div`
  display: flex;
  flex-direction: column-reverse;
  flex: 0;
  align-items: flex-end;
`

const ClickableArea = styled.div<{ $enabled: boolean }>`
  cursor: ${({ $enabled }) => ($enabled ? 'pointer' : 'default')};
  flex: 1;
`
