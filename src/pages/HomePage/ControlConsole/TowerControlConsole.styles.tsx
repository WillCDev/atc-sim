import { Colors } from '@/constants/styles'
import styled from 'styled-components'

export const GridWrapper = styled.div`
  display: grid;
  background-color: ${Colors.lightGrey};
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 45px 1fr 1fr 1fr 1fr 1fr 1fr 45px;
  border: 4px solid ${Colors.lightGrey};
  gap: 4px 4px;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`

const StripBay = styled.div`
  border-top: 2px solid ${Colors.darkGrey};
  border-left: 2px solid ${Colors.darkGrey};
  background-color: ${Colors.lightSkyBlue};
  overflow: hidden;
`

export const Header = styled.div`
  grid-area: 1 / 1 / 2 / 4;
`

export const PendingArrivals = styled(StripBay)`
  grid-area: 2 / 1 / 5 / 2;
`

export const AirbornDepartures = styled(StripBay)`
  grid-area: 5 / 1 / 8 / 2;
`

export const ArrivalSequence = styled(StripBay)`
  grid-area: 2 / 2 / 5 / 3;
`

export const Runway1 = styled(StripBay)`
  grid-area: 5 / 2 / 8 / 3;
`

export const R1Loop = styled(StripBay)`
  grid-area: 2 / 3 / 3 / 4;
`

export const HoldSouth = styled(StripBay)`
  grid-area: 3 / 3 / 5 / 4;
`

export const HoldNorth = styled(StripBay)`
  grid-area: 5 / 3 / 8 / 4;
`

export const Footer = styled.div`
  grid-area: 8 / 1 / 9 / 4;
`
