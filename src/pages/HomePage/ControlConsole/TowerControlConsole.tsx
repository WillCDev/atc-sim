import { FC } from 'react'
import { HeaderInfo } from './HeaderInfo'
import * as Layout from './TowerControlConsole.styles'
import * as Bays from './StripBays'
import { Footer } from './Footer'
import { HeaderMetrics } from './HeaderMetrics'

export const TowerControlConsole: FC = () => (
  <Layout.GridWrapper>
    <Layout.Header>
      <HeaderInfo />
      <HeaderMetrics />
    </Layout.Header>

    <Layout.PendingArrivals>
      <Bays.PendingArrivalsBay />
    </Layout.PendingArrivals>

    <Layout.AirbornDepartures>
      <Bays.AirborneDepsBay />
    </Layout.AirbornDepartures>

    <Layout.ArrivalSequence>
      <Bays.ArrivalSeqBay />
    </Layout.ArrivalSequence>

    <Layout.Runway1>
      <Bays.Runway1Bay />
    </Layout.Runway1>

    <Layout.R1Loop>
      <Bays.R1LoopBay />
    </Layout.R1Loop>

    <Layout.HoldSouth>
      <Bays.HoldSouthBay />
    </Layout.HoldSouth>

    <Layout.HoldNorth>
      <Bays.HoldNorthBay />
    </Layout.HoldNorth>

    <Layout.Footer>
      <Footer />
    </Layout.Footer>
  </Layout.GridWrapper>
)
