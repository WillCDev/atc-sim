import { FC } from 'react'
import styled from 'styled-components'
import { Colors, PanelCSS } from '@/constants/styles'
import { CallSign } from './CallSign'
import { useFlightStore, type FlightStripLocation } from '@/store'

interface Props {
  data: FlightStripData
  canBeTranfered: boolean
  canTimeStamp: boolean
  location: FlightStripLocation
}

export const DepartureStrip: FC<Props> = ({
  data,
  canBeTranfered,
  canTimeStamp,
  location,
}) => {
  const transerStrip = useFlightStore((state) => state.transferFlightStrip)
  const timeStampStrip = useFlightStore((state) => state.timeStampStrip)

  const handleTransfer = () => {
    if (!canBeTranfered) return
    transerStrip({ callsign: data.callsign, location })
  }

  const handleTimeStamp = () => {
    console.log('Hmm', canTimeStamp)
    if (!canTimeStamp) return
    timeStampStrip({ callsign: data.callsign, location })
  }

  return (
    <Panel>
      <Content>
        <Value style={{ gridArea: '1 / 1 / 3 / 2' }}>{data.departureTime}</Value>

        <CallSign
          style={{ gridArea: '1 / 2 / 3 / 3', padding: '0 5px' }}
          data={data}
          location={location}
        />

        <Value style={{ gridArea: '1 / 3 / 2 / 4' }}>{data.callsign}</Value>
        <div style={{ display: 'flex', gridArea: '2 / 3 / 3 / 4' }}>
          <Value style={{ flexGrow: 1 }}>{data.squawk ?? ''}</Value>
          <Value style={{ flexGrow: 1, textAlign: 'center' }}>I</Value>
        </div>

        <Value style={{ gridArea: '1 / 4 / 2 / 5' }} />
        <div style={{ display: 'flex', gridArea: '2 / 4 / 3 / 5' }}>
          <Value style={{ flexGrow: 1, textAlign: 'center' }} $color={Colors.green}>
            {data.holdingPoint ?? 'A'}
          </Value>
          <Value style={{ flexGrow: 1, textAlign: 'center' }}>{data.qnh}</Value>
        </div>

        <Value style={{ gridArea: '1 / 5 / 2 / 6' }} />
        <Value style={{ gridArea: '2 / 5 / 3 / 6' }}>{data.destination}</Value>

        <Value
          style={{
            gridArea: '1 / 6 / 3 / 7',
            cursor: canBeTranfered ? 'pointer' : 'initial',
          }}
          onClick={handleTransfer}
        >
          QSY
        </Value>

        <Value style={{ gridArea: '1 / 7 / 2 / 8' }}>HDG</Value>
        <Value style={{ gridArea: '2 / 7 / 3 / 8' }}>CLD</Value>

        <Value
          style={{ gridArea: '1 / 8 / 3 / 9' }}
          $color={Colors.white}
          onClick={handleTimeStamp}
        >
          {data.sid}
        </Value>
      </Content>
      {data.isTransfered && <TransferOverlay />}
    </Panel>
  )
}

const Panel = styled.div<{ $color?: string }>`
  ${PanelCSS}
  background-color: ${(props) => props.$color || Colors.lightGrey};
  width: 100%;
  position: relative;
`

const Content = styled.div`
  height: 100%;
  width: 100%;
  font-size: 0.65rem;
  border: 3px solid ${Colors.blue};
  display: grid;
  grid-template-columns: 1.5fr 2.5fr 2fr 2fr 1fr 1fr 1fr 1.5fr;
  grid-template-rows: 1fr 1fr;
  gap: 1px;
  height: 100%;
`

const Value = styled(Panel)`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding: 3px 2px;
`

const TransferOverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  background-color: #ffffff88;
  pointer-events: none;
`
