import { useFlightStore } from '@/store'
import { FC } from 'react'
import styled from 'styled-components'

const HoldingPoint: FC<{ children: string }> = ({ children, ...props }) => {
  const assignHoldingPoint = useFlightStore((state) => state.assignHoldingPointToStrip)
  return (
    <Point {...props} onClick={() => assignHoldingPoint(children)}>
      {children}
    </Point>
  )
}

const Point = styled.div`
  padding: 3px 3px 2px 3px;
  font-size: 12px;
  font-weight: bold;
  color: yellow;
  background: black;
  border: 1px solid yellow;
  position: absolute;
  cursor: pointer;
`

export const G1Point = styled(HoldingPoint)`
  top: 69.8%;
  right: 61.5%;
`

export const G2Point = styled(HoldingPoint)`
  top: 75.5%;
  right: 68.7%;
`

export const G3Point = styled(HoldingPoint)`
  top: 77.5%;
  right: 73.8%;
`

export const G4Point = styled(HoldingPoint)`
  top: 74%;
  right: 71.8%;
`

export const H1Point = styled(HoldingPoint)`
  top: 65.5%;
  right: 68.8%;
`

export const H2Point = styled(HoldingPoint)`
  top: 69.7%;
  right: 68.8%;
`

export const P1Point = styled(HoldingPoint)`
  top: 52.3%;
  right: 45.3%;
`

export const F1Point = styled(HoldingPoint)`
  top: 56%;
  right: 54%;
`

export const V1Point = styled(HoldingPoint)`
  top: 35%;
  right: 57.5%;
`

export const FZ1Point = styled(HoldingPoint)`
  top: 43%;
  right: 57%;
`

export const HZ1Point = styled(HoldingPoint)`
  top: 46%;
  right: 61.5%;
`

export const DZ1Point = styled(HoldingPoint)`
  top: 38.5%;
  right: 44%;
`

export const V3Point = styled(HoldingPoint)`
  top: 31%;
  right: 48.8%;
`

export const V4Point = styled(HoldingPoint)`
  top: 33%;
  right: 40.2%;
`

export const V5Point = styled(HoldingPoint)`
  top: 31%;
  right: 35.5%;
`

export const J1Point = styled(HoldingPoint)`
  top: 79.8%;
  right: 89.2%;
`

export const J2Point = styled(HoldingPoint)`
  top: 79.5%;
  right: 84%;
`

export const J3Point = styled(HoldingPoint)`
  top: 69%;
  right: 76.7%;
`

export const J4Point = styled(HoldingPoint)`
  top: 67%;
  right: 59.5%;
`

export const M1Point = styled(HoldingPoint)`
  top: 71.5%;
  right: 84%;
`
export const K1Point = styled(HoldingPoint)`
  top: 60%;
  right: 54.5%;
`
export const K2Point = styled(HoldingPoint)`
  top: 60.6%;
  right: 50.3%;
`
export const K3Point = styled(HoldingPoint)`
  top: 56%;
  right: 46%;
`
export const K4Point = styled(HoldingPoint)`
  top: 53.3%;
  right: 40.8%;
`
export const K5Point = styled(HoldingPoint)`
  top: 55.8%;
  right: 37%;
`

export const T1Point = styled(HoldingPoint)`
  top: 21.8%;
  right: 43.2%;
`
