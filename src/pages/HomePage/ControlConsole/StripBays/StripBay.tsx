import { FC } from 'react'
import { FlightStrip } from '@/components/FlightStrip'
import styled from 'styled-components'
import { FlightStripLocation, useFlightStore } from '@/store'

export interface StripBayProps {
  strips: FlightStripData[]
  allowedStripTypes: Array<FlightStripData['type']>
  canTransferDepartures?: boolean
  canTimestamp?: boolean
  location: FlightStripLocation
  children: React.ReactNode
}

export const StripBay: FC<StripBayProps> = ({
  strips,
  children,
  allowedStripTypes,
  canTransferDepartures,
  canTimestamp,
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
      moveFlightStrip({
        source: { callsign: selectedStrip.callsign, location: selectedStrip.location },
        dest: { location },
      })
      if (addTimeStamp) timeStampStrip({ callsign: selectedStrip.callsign, location })
    }
  }

  return (
    <Wrapper>
      <div style={{ flex: 0 }}>{children}</div>
      <ClickableArea onClick={handleClick} $enabled={canReceiveStrip} />
      <Bay>
        {strips.map((strip) => (
          <FlightStrip
            key={strip.callsign}
            data={strip}
            canTransferDepartures={!!canTransferDepartures}
            canTimestamp={!!canTimestamp}
            location={location}
          />
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
  /* background-color: ${({ $enabled }) => ($enabled ? '#ff000055' : 'transparent')}; */
  flex: 1;
`
