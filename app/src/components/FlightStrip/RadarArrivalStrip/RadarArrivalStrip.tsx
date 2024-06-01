import { FC, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Colors } from '@/constants/styles'
import { CallSign } from '../CallSign'
import { useSimStore } from '@/store'
import { Content, StripContainer, TransferOverlay, Value } from '../FlightStrip.styles'
import { FlightStripData, FlightStripLocation } from '@/types'
import { CoordinatorButtons } from '../CoordinatorButtons'
import { deleteFlight } from '@/api/flights'
import { SpeedButton } from './SpeedButton'
import { HeadingButton } from './HeadingButton'
import { AltitudeButton } from './AltitudeButton'

interface Props {
  data: FlightStripData
  location: FlightStripLocation
}

const getRandomTimeBetween5sAnd10s = () => {
  return Math.floor(Math.random() * 5 + 5) * 1000
}

export const RadarArrivalStrip: FC<Props> = ({ data, location }) => {
  const autoTransferTimer = useRef<number | null>(null)
  const arrivalRunway = useSimStore((state) => state.arrivalRunway)

  useEffect(() => {
    if (location === FlightStripLocation.AIR_CONTROLLER) {
      autoTransferTimer.current = window.setTimeout(() => {
        deleteFlight(data.callsign)
        clearTimeout(autoTransferTimer.current!)
        autoTransferTimer.current = null
      }, getRandomTimeBetween5sAnd10s())
    }
  }, [location])

  return (
    <StripContainer>
      <ContentGrid $color={Colors.orange}>
        <Value style={{ gridArea: '1 / 1 / 2 / 2' }}>OXF</Value>
        <Value style={{ gridArea: '2 / 1 / 3 / 2' }} />

        <Value style={{ gridArea: '1 / 2 / 2 / 3' }}>EGCC</Value>
        <Value style={{ gridArea: '2 / 2 / 3 / 3' }} />

        <CallSign
          style={{ gridArea: '1 / 3 / 3 / 4', padding: '0 5px' }}
          data={data}
          location={location}
        />

        <Value style={{ gridArea: '1 / 4 / 2 / 6' }}>{data.classification}</Value>
        <Value style={{ gridArea: '2 / 4 / 3 / 5' }}>{data.squawk}</Value>
        <Value style={{ gridArea: '2 / 5 / 3 / 6' }} />

        <Value style={{ gridArea: '1 / 6 / 2 / 7' }}>T</Value>
        <Value style={{ gridArea: '1 / 7 / 2 / 8' }}>I</Value>
        <SpeedButton
          style={{ gridArea: '2 / 6 / 3 / 8', fontWeight: 'bold' }}
          data={data}
        />

        <Value style={{ gridArea: '1 / 8 / 2 / 9' }} />
        <Value style={{ gridArea: '2 / 8 / 3 / 9' }}>TCAS</Value>

        <Value style={{ gridArea: '1 / 9 / 2 / 10' }} />
        <Value style={{ gridArea: '2 / 9 / 3 / 10' }} />

        <Value style={{ gridArea: '1 / 10 / 2 / 11' }} />
        <Value style={{ gridArea: '2 / 10 / 3 / 11' }}>PSG</Value>

        <HeadingButton style={{ gridArea: '1 / 11 / 2 / 13' }} data={data} />
        <AltitudeButton
          style={{ gridArea: '2 / 11 / 3 / 12', fontWeight: 'bold' }}
          callsign={data.callsign}
          highlight={data.isClearedForApproach}
        >
          {data.isClearedForApproach && <>&darr;</>}
        </AltitudeButton>
        <AltitudeButton style={{ gridArea: '2 / 12 / 3 / 13' }} callsign={data.callsign}>
          {data.altitude ?? 'CLD'}
        </AltitudeButton>

        <Value style={{ gridArea: '1 / 13 / 2 / 14' }}>{arrivalRunway}</Value>
        <Value style={{ gridArea: '2 / 13 / 3 / 14' }}>ILS</Value>
      </ContentGrid>
      {data.isTransfered && <TransferOverlay />}

      {location === FlightStripLocation.UNASSIGNED && <CoordinatorButtons data={data} />}
    </StripContainer>
  )
}

const ContentGrid = styled(Content)`
  grid-template-columns: 1fr 1fr 2fr 0.5fr 0.5fr 0.4fr 0.4fr 1fr 1fr 0.7fr 0.3fr 0.7fr 1fr;
  grid-template-rows: 1fr 1fr;
`
