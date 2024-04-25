import { FC } from 'react'
import { Colors } from '@/constants/styles'
import styled from 'styled-components'
import { DisplayItem } from '@/components/ItemDisplay'
import { ClockDisplay } from './Clock'
import { DepAtis } from './DepAtis'
import { Runways } from './Runways'
import { DepartureRoutes } from './DepartureRoutes'
import { Buttons } from './Buttons'
import { QNH } from './QNH'
import { Button } from '@/components/Button'
import { useFlightStore } from '@/store'
import { createFlight } from '@/api/flights'

export const Footer: FC = () => {
  const lastDeleteFlight = useFlightStore((state) => state.lastDeletedFlight)

  const handleUndo = () => {
    if (lastDeleteFlight) {
      createFlight(lastDeleteFlight.data)
    }
  }

  return (
    <Wrapper>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexBasis: '150px',
          gap: '2px',
        }}
      >
        <DisplayItem value="AIR 1" width="100%" color={Colors.green} bold />
        <DisplayItem value="DIR CLOSED" width="100%" grow color={Colors.white} />
      </div>
      <ClockDisplay />
      <DepAtis />
      <Runways />
      <DepartureRoutes />
      <Buttons />
      <QNH />
      <div style={{ flex: 1 }} />
      {!!lastDeleteFlight && <Button onClick={handleUndo}>Undo</Button>}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`
