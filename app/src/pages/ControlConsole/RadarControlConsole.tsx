import { FC } from 'react'
import { HeaderInfo } from './HeaderInfo'
import * as Layout from './RadarControlConsole.styles'
import * as Bays from './StripBays'
import { Footer } from './Footer'
import { HeaderMetrics } from './HeaderMetrics'
import { HoldingPointSelectModal } from './HoldingPointSelectModal'

export const RadarControlConsole: FC = () => (
  <>
    <Layout.GridWrapper>
      <Layout.Header>
        <HeaderInfo />
        <HeaderMetrics />
      </Layout.Header>

      <Layout.TransferIn>
        <Bays.TransferInBay />
      </Layout.TransferIn>

      <Layout.Dynamic>
        <Bays.DynamicBay />
      </Layout.Dynamic>

      <Layout.AirController>
        <Bays.AirControllerBay />
      </Layout.AirController>

      <Layout.Footer>
        <Footer />
      </Layout.Footer>
    </Layout.GridWrapper>

    <HoldingPointSelectModal />
  </>
)
