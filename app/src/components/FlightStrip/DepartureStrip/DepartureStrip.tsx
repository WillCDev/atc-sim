import { FC, useEffect } from 'react'
import styled from 'styled-components'
import { Colors } from '@/constants/styles'
import { CallSign } from '../CallSign'
import { useFlightStore, useSimStore } from '@/store'
import { Content, StripContainer, TransferOverlay, Value } from '../FlightStrip.styles'
import { FlightStripData, FlightStripLocation } from '@/types'
import { useADepartureStripControlRules } from './useDepartureStripControlRules'
import { CoordinatorButtons } from '../CoordinatorButtons'

interface Props {
  data: FlightStripData
  location: FlightStripLocation
  handleRemoveFlight: (callsign: string, immediate?: true) => void
}

export const DepartureStrip: FC<Props> = ({ data, location, handleRemoveFlight }) => {
  const isDualRunway = useSimStore((state) => state.isDualRunway)

  const { canBeTranfered, canTimeStamp, canBeClearedForDeparture, canBeSelected } =
    useADepartureStripControlRules(data, location)

  const transferStrip = useFlightStore((state) => state.transferFlightStrip)
  const timeStampStrip = useFlightStore((state) => state.timeStampStrip)
  const moveFlightStrip = useFlightStore((state) => state.moveFlightStrip)
  const selectStripToMove = useFlightStore((state) => state.setSelectedFlightStrip)
  const selectHoldingPoint = useFlightStore((state) => state.setStripToSelectHoldingPoint)
  const clearForDeparture = useFlightStore((state) => state.clearStripForDeparture)

  const isAirborne = [FlightStripLocation.AIRBORNE_DEPS].includes(location)

  const handleTransfer = () => {
    if (!canBeTranfered) return
    transferStrip(data.callsign, true)
  }

  const handleTimeStamp = () => {
    if (!canTimeStamp) return
    selectStripToMove({ ...data, location })
    timeStampStrip(data.callsign)
    moveFlightStrip({ location: FlightStripLocation.AIRBORNE_DEPS })
  }

  const handleClearForDeparture = () => {
    if (!canBeClearedForDeparture) return
    clearForDeparture(data.callsign)
  }

  const onSelectHoldingPoint = () => {
    if (isAirborne) return
    selectHoldingPoint(data.callsign)
  }

  const handleSidClick = () => {
    if (isDualRunway) return handleTransfer()
    if (!data.isTransfered) return handleTimeStamp()
    if (data.isTransfered) return handleRemoveFlight(data.callsign, true)
  }

  const handleQsyClick = () => {
    if (isDualRunway) return
    if (!data.isTransfered) return handleTransfer()
    handleRemoveFlight(data.callsign)
  }

  useEffect(() => {
    if (data.isTransfered) transferStrip(data.callsign, false)
  }, [location])

  const highlightClearedFOrDeparture =
    data.isClearedForDeparture && location === FlightStripLocation.RUNWAY_1

  return (
    <StripContainer>
      <ContentGrid $color={Colors.blue}>
        <Value
          style={{ gridArea: '1 / 1 / 3 / 2' }}
          $color={highlightClearedFOrDeparture ? Colors.green : undefined}
        >
          {data.departureTime}
        </Value>

        <CallSign
          style={{ gridArea: '1 / 2 / 3 / 3', padding: '0 5px' }}
          data={data}
          location={location}
          disabled={!canBeSelected}
        />

        <Value style={{ gridArea: '1 / 3 / 2 / 4' }}>{data.classification}</Value>
        <div style={{ display: 'flex', gridArea: '2 / 3 / 3 / 4' }}>
          <Value style={{ flexGrow: 1 }}>{data.squawk ?? ''}</Value>
          <Value style={{ flexGrow: 0, textAlign: 'center' }}>I</Value>
          {!isAirborne && (
            <Value style={{ flexGrow: 0, textAlign: 'center' }} $color={Colors.green}>
              A
            </Value>
          )}
        </div>

        <Value style={{ gridArea: '1 / 4 / 2 / 5' }} />
        <div style={{ display: 'flex', gridArea: '2 / 4 / 3 / 5' }}>
          <Value
            style={{
              flexGrow: 0,
              textAlign: 'center',
              flexBasis: '40%',
              cursor: isAirborne ? 'initial' : 'pointer',
            }}
            $color={isAirborne ? Colors.green : Colors.white}
            onClick={onSelectHoldingPoint}
          >
            {isAirborne ? 'A' : data.holdingPoint}
          </Value>
          <Value style={{ flexGrow: 1, textAlign: 'center' }}>{data.qnh}</Value>
        </div>

        <Value style={{ gridArea: '1 / 5 / 2 / 6' }} />
        <Value
          style={{ gridArea: '2 / 5 / 3 / 6' }}
          $color={highlightClearedFOrDeparture ? Colors.green : undefined}
          onClick={handleClearForDeparture}
        >
          {data.destination}
        </Value>

        <Value
          style={{
            gridArea: '1 / 6 / 3 / 7',
            cursor: canBeTranfered ? 'pointer' : 'initial',
          }}
          onClick={handleQsyClick}
        >
          QSY
        </Value>

        <Value style={{ gridArea: '1 / 7 / 2 / 8' }}>HDG</Value>
        <Value style={{ gridArea: '2 / 7 / 3 / 8' }}>CLD</Value>

        <Value
          style={{ gridArea: '1 / 8 / 3 / 9' }}
          $color={highlightClearedFOrDeparture ? Colors.green : Colors.white}
          onClick={handleSidClick}
        >
          {data.isTransfered ? 'HIDE' : data.sid}
        </Value>
      </ContentGrid>
      {data.isTransfered && <TransferOverlay />}
      {location === FlightStripLocation.UNASSIGNED && <CoordinatorButtons data={data} />}
    </StripContainer>
  )
}

const ContentGrid = styled(Content)`
  grid-template-columns: 1.5fr 2.5fr 2fr 2fr 1fr 1fr 1fr 1.5fr;
  grid-template-rows: 1fr 1fr;
`
