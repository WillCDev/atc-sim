import { FC } from 'react'
import styled from 'styled-components'

import { Modal } from '@/components/Modal'
import { useFlightStore } from '@/store'
import * as Points from './Points'

export const HoldingPointSelectModal: FC = () => {
  const selectedStrip = useFlightStore((state) => state.stripToSelectHoldingPoint)
  const setSelectedStrip = useFlightStore((state) => state.setStripToSelectHoldingPoint)

  if (!selectedStrip) return null

  return (
    <Modal onClose={() => setSelectedStrip(null)}>
      <Content>
        <Points.G1Point>G1</Points.G1Point>
        <Points.G2Point>G2</Points.G2Point>
        <Points.G3Point>G3</Points.G3Point>
        <Points.G4Point>G4</Points.G4Point>
        <Points.V1Point>V1</Points.V1Point>
        <Points.V3Point>V3</Points.V3Point>
        <Points.V4Point>V4</Points.V4Point>
        <Points.V5Point>V5</Points.V5Point>
        <Points.K1Point>K1</Points.K1Point>
        <Points.K2Point>K2</Points.K2Point>
        <Points.K3Point>K3</Points.K3Point>
        <Points.K4Point>K4</Points.K4Point>
        <Points.K5Point>K5</Points.K5Point>
        <Points.F1Point>F1</Points.F1Point>
        <Points.P1Point>P1</Points.P1Point>
        <Points.H1Point>H1</Points.H1Point>
        <Points.H2Point>H2</Points.H2Point>
        <Points.J1Point>J1</Points.J1Point>
        <Points.J2Point>J2</Points.J2Point>
        <Points.J3Point>J3</Points.J3Point>
        <Points.J4Point>J4</Points.J4Point>
        <Points.M1Point>M1</Points.M1Point>
        <Points.T1Point>T1</Points.T1Point>
        <Points.FZ1Point>FZ1</Points.FZ1Point>
        <Points.HZ1Point>HZ1</Points.HZ1Point>
        <Points.DZ1Point>DZ1</Points.DZ1Point>
      </Content>
    </Modal>
  )
}

const multiplier = 1.15
const height = 587 * multiplier
const width = 927 * multiplier

const Content = styled.div`
  width: ${width}px;
  height: ${height}px;
  background-image: url('images/holdingpoint-select.jpeg');
  background-size: contain;
`
