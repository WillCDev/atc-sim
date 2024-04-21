import { FC, useEffect } from 'react'
import styled from 'styled-components'
import { Colors } from '@/constants/styles'
import { CallSign } from '../CallSign'
import { useFlightStore, useSimStore } from '@/store'
import { Content, Panel, TransferOverlay, Value } from '../FlightStrip.styles'
import { FlightStripData, FlightStripLocation } from '@/types'
import { useArrivalStripControlRules } from './useArrivalStripControlRules'
import { CoordinatorButtons } from '../CoordinatorButtons'

interface Props {
  data: FlightStripData
  location: FlightStripLocation
  handleRemoveFlight: (callsign: string) => void
}

export const ArrivalStrip: FC<Props> = ({ data, location, handleRemoveFlight }) => {
  const { canBeTranfered, canTimeStamp } = useArrivalStripControlRules(data, location)

  const arrivalRunway = useSimStore((state) => state.arrivalRunway)
  const transerStrip = useFlightStore((state) => state.transferFlightStrip)
  const timeStampStrip = useFlightStore((state) => state.timeStampStrip)
  const selectHoldingPoint = useFlightStore((state) => state.setStripToSelectHoldingPoint)

  const handleTransfer = () => {
    if (!canBeTranfered) return
    transerStrip(data.callsign)
  }

  const handleTimeStamp = () => {
    if (!canTimeStamp) return
    timeStampStrip(data.callsign)
  }

  const onSelectHoldingPoint = () => {
    selectHoldingPoint(data.callsign)
  }

  useEffect(() => {
    if (data.isTransfered && location === FlightStripLocation.HOLD_N)
      handleRemoveFlight(data.callsign)
  }, [data.isTransfered, location])

  return (
    <Container>
      <ContentGrid $color={Colors.orange}>
        <Value style={{ gridArea: '1 / 1 / 3 / 2' }} />
        <Value style={{ gridArea: '1 / 2 / 3 / 3' }} onClick={handleTimeStamp}>
          {data.arrivalTime}
        </Value>

        <CallSign
          style={{ gridArea: '1 / 3 / 3 / 4', padding: '0 5px' }}
          data={data}
          location={location}
        />

        <Value style={{ gridArea: '1 / 4 / 2 / 5' }}>{data.classification}</Value>
        <Value style={{ gridArea: '2 / 4 / 3 / 5' }}>{data.squawk}</Value>
        <Value
          style={{ gridArea: '1 / 5 / 2 / 6', cursor: 'pointer' }}
          onClick={onSelectHoldingPoint}
        >
          {data.holdingPoint}
        </Value>
        <Value style={{ gridArea: '2 / 5 / 3 / 6' }}>I</Value>

        <Value style={{ gridArea: '1 / 6 / 2 / 7' }}>207</Value>
        <Value style={{ gridArea: '2 / 6 / 3 / 7' }} color={Colors.white} />

        <Value style={{ gridArea: '1 / 7 / 2 / 8' }} />
        <div style={{ display: 'flex', gridArea: '2 / 7 / 3 / 8' }}>
          <Value style={{ flexGrow: 1, flexBasis: '75%' }} />
          <Value style={{ flexGrow: 0, flexBasis: '25%' }} />
        </div>

        <Value style={{ gridArea: '1 / 8 / 3 / 9' }}>{data.origin}</Value>

        <Value style={{ gridArea: '1 / 9 / 2 / 10' }}>HDG</Value>
        <Value style={{ gridArea: '2 / 9 / 3 / 10' }}>CLD</Value>

        <div style={{ display: 'flex', gridArea: '1 / 10 / 2 / 11' }}>
          <Value style={{ flexGrow: 1, fontWeight: 'bold' }}>C</Value>
          <Value style={{ flexGrow: 1, fontWeight: 'bold' }}>{arrivalRunway}</Value>
        </div>
        <Value style={{ gridArea: '2 / 10 / 3 / 11', fontWeight: 'bold' }}>ILS</Value>

        <Value
          style={{ gridArea: '1 / 11 / 3 / 12', fontWeight: 'bold' }}
          $color={Colors.white}
          onClick={handleTransfer}
        >
          {'> GMC'}
        </Value>
      </ContentGrid>
      {data.isTransfered && <TransferOverlay />}
      {location === FlightStripLocation.UNASSIGNED && <CoordinatorButtons data={data} />}
    </Container>
  )
}

const ContentGrid = styled(Content)`
  grid-template-columns: 0.75fr 1fr 2.5fr 0.7fr 0.5fr 1fr 1.5fr 1fr 1fr 1.5fr 1.2fr;
  grid-template-rows: 1fr 1fr;
`

const Container = styled(Panel)`
  display: flex;
`
