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

export const Footer: FC = () => (
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
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`
