import { FC, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Colors } from '@/constants/styles'
import { CallSign } from '../CallSign'
import { useFlightStore, useSimStore } from '@/store'
import { Content, StripContainer, TransferOverlay, Value } from '../FlightStrip.styles'
import { FlightStripData, FlightStripLocation } from '@/types'
import { useArrivalStripControlRules } from './useArrivalStripControlRules'
import { CoordinatorButtons } from '../CoordinatorButtons'
import { deleteFlight } from '@/api/flights'

interface Props {
  data: FlightStripData
  location: FlightStripLocation
}

export const ArrivalStrip: FC<Props> = ({ data, location }) => {
  const timeStampAlertRef = useRef<number | null>(null)
  const [showTimeStampAlert, setShowTimeStampAlert] = useState(false)

  const { canBeTranfered, canTimeStamp, canContinueApproach, canBeRemoved } =
    useArrivalStripControlRules(data, location)

  const arrivalRunway = useSimStore((state) => state.arrivalRunway)
  const transferStrip = useFlightStore((state) => state.transferFlightStrip)
  const timeStampStrip = useFlightStore((state) => state.timeStampStrip)
  const continueApproach = useFlightStore((state) => state.continueApproach)
  const selectHoldingPoint = useFlightStore((state) => state.setStripToSelectHoldingPoint)

  const handleTransfer = () => {
    if (!canBeTranfered) return
    transferStrip(data.callsign, true)
  }

  const handleTimeStamp = () => {
    if (!canTimeStamp) return
    setShowTimeStampAlert(true)
    timeStampAlertRef.current = window.setInterval(() => {
      setShowTimeStampAlert((prev) => !prev)
      clearTimeout(timeStampAlertRef.current!)
    }, 15000)
    timeStampStrip(data.callsign)
  }

  useEffect(() => {
    return () => {
      if (timeStampAlertRef.current) clearTimeout(timeStampAlertRef.current)
    }
  }, [])

  const onSelectHoldingPoint = () => {
    selectHoldingPoint(data.callsign)
  }

  const handleCanContinueApproach = () => {
    if (!canContinueApproach) return
    continueApproach(data.callsign)
  }

  const handleRemoveFlight = () => {
    if (!canBeRemoved) return
    deleteFlight(data.callsign)
  }

  const isOnGround = [FlightStripLocation.HOLD_N, FlightStripLocation.RUNWAY_1].includes(
    location
  )

  return (
    <StripContainer>
      <ContentGrid $color={Colors.orange}>
        <Value style={{ gridArea: '1 / 1 / 3 / 2' }} />
        <Value
          style={{ gridArea: '1 / 2 / 3 / 3' }}
          onClick={handleTimeStamp}
          $color={showTimeStampAlert ? Colors.orange : 'initial'}
          $flashing={showTimeStampAlert}
        >
          {data.arrivalTime}
        </Value>

        <CallSign
          style={{ gridArea: '1 / 3 / 3 / 4', padding: '0 5px' }}
          data={data}
          location={location}
        />

        <Value style={{ gridArea: '1 / 4 / 2 / 5' }}>{data.classification}</Value>
        <Value style={{ gridArea: '2 / 4 / 3 / 5' }}>{data.squawk}</Value>
        <Value style={{ gridArea: '1 / 5 / 2 / 6' }} />
        <Value style={{ gridArea: '2 / 5 / 3 / 6' }}>I</Value>

        <Value style={{ gridArea: '1 / 6 / 2 / 7' }}>207</Value>
        <Value
          style={{ gridArea: '2 / 6 / 3 / 7', cursor: 'pointer' }}
          $color={isOnGround ? Colors.white : undefined}
          onClick={onSelectHoldingPoint}
        >
          {data.holdingPoint}
        </Value>

        <Value style={{ gridArea: '1 / 7 / 2 / 8' }} />
        <div style={{ display: 'flex', gridArea: '2 / 7 / 3 / 8' }}>
          <Value style={{ flexGrow: 1, flexBasis: '75%' }} />
          <Value style={{ flexGrow: 0, flexBasis: '25%' }} />
        </div>

        <Value style={{ gridArea: '1 / 8 / 3 / 9' }} onClick={handleTransfer}>
          {data.origin}
        </Value>

        <Value style={{ gridArea: '1 / 9 / 2 / 10' }}>HDG</Value>
        <Value style={{ gridArea: '2 / 9 / 3 / 10' }}>CLD</Value>

        <div
          style={{
            display: 'flex',
            gridArea: isOnGround ? '1 / 10 / 2 / 11' : '1 / 10 / 3 / 11',
            fontSize: isOnGround ? 'inherit' : '1rem',
          }}
        >
          <Value
            style={{ flexGrow: 1, fontWeight: 'bold' }}
            onClick={handleCanContinueApproach}
          >
            {data.canContinueApproach ? 'C' : null}
          </Value>
          <Value style={{ flexGrow: 1, fontWeight: 'bold' }}>{arrivalRunway}</Value>
        </div>
        {isOnGround && (
          <Value style={{ gridArea: '2 / 10 / 3 / 11', fontWeight: 'bold' }}>ILS</Value>
        )}

        <Value
          style={{ gridArea: '1 / 11 / 3 / 12', fontWeight: 'bold' }}
          $color={Colors.white}
          onClick={handleRemoveFlight}
        >
          {data.isTransfered ? 'HIDE' : '> GMC'}
        </Value>
      </ContentGrid>
      {data.isTransfered && <TransferOverlay />}
      {location === FlightStripLocation.UNASSIGNED && <CoordinatorButtons data={data} />}
    </StripContainer>
  )
}

const ContentGrid = styled(Content)`
  grid-template-columns: 0.75fr 1fr 2fr 0.7fr 0.5fr 0.9fr 1fr 0.8fr 1fr 1.75fr 1.2fr;
  grid-template-rows: 1fr 1fr;
`
