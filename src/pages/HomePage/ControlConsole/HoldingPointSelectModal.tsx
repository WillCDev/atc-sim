import { FC } from 'react'
import { useFlightStore } from '@/store'
import styled from 'styled-components'
import { PanelCSS } from '@/constants/styles'
import { InfoStrip } from '@/components/InfoStrip'

export const HoldingPointSelectModal: FC = () => {
  const selectedStrip = useFlightStore((state) => state.stripToSelectHoldingPoint)
  //   const assignHoldingPoint = useFlightStore((state) => state.assignHoldingPointToStrip)
  const setSelectedStrip = useFlightStore((state) => state.setStripToSelectHoldingPoint)

  if (!selectedStrip) return null

  return (
    <Modal>
      <ModalContent>
        <InfoStrip
          items={[]}
          buttons={[
            {
              value: 'X',
              width: '100px',
              color: 'red',
              onClick: () => setSelectedStrip(null),
            },
          ]}
        />
      </ModalContent>
    </Modal>
  )
}

const Modal = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`

const ModalContent = styled.div`
  ${PanelCSS}
  position: relative;
  width: 900px;
  height: 500px;
  pointer-events: all;
`
