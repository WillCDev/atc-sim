import { FC } from 'react'
import { FlightStrip } from '@/components/FlightStrip'
import styled from 'styled-components'
import { useFlightStore, useSimStore } from '@/store'
import { FlightStripLocation } from '@/types'
import { isStripAllowedInBay } from './AllowedFlightTypeMappings'

export interface StripBayProps {
  strips: string[]
  location: FlightStripLocation
  children: React.ReactNode
}

export const StripBay: FC<StripBayProps> = ({ children, strips, location }) => {
  const isDualRunway = useSimStore((state) => state.isDualRunway)
  const selectedStrip = useFlightStore((state) => state.selectedFlightStrip)
  const moveFlightStrip = useFlightStore((state) => state.moveFlightStrip)
  const timeStampStrip = useFlightStore((state) => state.timeStampStrip)

  const canReceiveStrip =
    !!selectedStrip && isStripAllowedInBay(selectedStrip.type, location, isDualRunway)

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
      <div style={{ flex: 0, position: 'sticky', top: 0, zIndex: 1 }}>{children}</div>
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
  overflow: auto;
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
