import { FC } from 'react'
import styled from 'styled-components'
import { Colors } from '@/constants/styles'
import { CallSign } from '../CallSign'
import { useFlightStore, useSimStore } from '@/store'
import { Content, Panel, TransferOverlay, Value } from '../FlightStrip.styles'
import { FlightStripData, FlightStripLocation } from '@/types'
import { useADepartureStripControlRules } from './useDepartureStripControlRules'

interface Props {
  data: FlightStripData
  location: FlightStripLocation
}

export const DepartureStrip: FC<Props> = ({ data, location }) => {
  const isDualRunway = useSimStore((state) => state.isDualRunway)

  const { canBeTranfered, canTimeStamp, canBeClearedForDeparture } =
    useADepartureStripControlRules(data, location)

  const transerStrip = useFlightStore((state) => state.transferFlightStrip)
  const timeStampStrip = useFlightStore((state) => state.timeStampStrip)
  const selectHoldingPoint = useFlightStore((state) => state.setStripToSelectHoldingPoint)
  const clearForDeparture = useFlightStore((state) => state.clearStripForDeparture)

  const handleTransfer = () => {
    if (!canBeTranfered) return
    transerStrip(data.callsign)
  }

  const handleTimeStamp = () => {
    if (!canTimeStamp) return
    timeStampStrip(data.callsign)
  }

  const handleClearForDeparture = () => {
    if (!canBeClearedForDeparture) return
    clearForDeparture(data.callsign)
  }

  const onSelectHoldingPoint = () => {
    selectHoldingPoint(data.callsign)
  }

  return (
    <Panel>
      <ContentGrid $color={Colors.blue}>
        <Value style={{ gridArea: '1 / 1 / 3 / 2' }}>{data.departureTime}</Value>

        <CallSign
          style={{ gridArea: '1 / 2 / 3 / 3', padding: '0 5px' }}
          data={data}
          location={location}
          disabled={data.isTransfered}
        />

        <Value style={{ gridArea: '1 / 3 / 2 / 4' }}>{data.classification}</Value>
        <div style={{ display: 'flex', gridArea: '2 / 3 / 3 / 4' }}>
          <Value style={{ flexGrow: 1 }}>{data.squawk ?? ''}</Value>
          <Value style={{ flexGrow: 1, textAlign: 'center' }}>I</Value>
        </div>

        <Value style={{ gridArea: '1 / 4 / 2 / 5' }} />
        <div style={{ display: 'flex', gridArea: '2 / 4 / 3 / 5' }}>
          <Value
            style={{ flexGrow: 1, textAlign: 'center', cursor: 'pointer' }}
            $color={data.holdingPoint ? Colors.green : undefined}
            onClick={onSelectHoldingPoint}
          >
            {data.holdingPoint}
          </Value>
          <Value style={{ flexGrow: 1, textAlign: 'center' }}>{data.qnh}</Value>
        </div>

        <Value style={{ gridArea: '1 / 5 / 2 / 6' }} />
        <Value
          style={{ gridArea: '2 / 5 / 3 / 6' }}
          $color={data.isClearedForDeparture ? Colors.green : undefined}
          onClick={handleClearForDeparture}
        >
          {data.destination}
        </Value>

        <Value
          style={{
            gridArea: '1 / 6 / 3 / 7',
            cursor: canBeTranfered ? 'pointer' : 'initial',
          }}
          onClick={!isDualRunway ? handleTransfer : undefined}
        >
          QSY
        </Value>

        <Value style={{ gridArea: '1 / 7 / 2 / 8' }}>HDG</Value>
        <Value style={{ gridArea: '2 / 7 / 3 / 8' }}>CLD</Value>

        <Value
          style={{ gridArea: '1 / 8 / 3 / 9' }}
          $color={Colors.white}
          onClick={isDualRunway ? handleTransfer : handleTimeStamp}
        >
          {data.sid}
        </Value>
      </ContentGrid>
      {data.isTransfered && <TransferOverlay onClick={(e) => e.stopPropagation()} />}
    </Panel>
  )
}

const ContentGrid = styled(Content)`
  grid-template-columns: 1.5fr 2.5fr 2fr 2fr 1fr 1fr 1fr 1.5fr;
  grid-template-rows: 1fr 1fr;
`
