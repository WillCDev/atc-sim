import { Colors, PanelCSS } from '@/constants/styles'
import styled from 'styled-components'

export const Panel = styled.div<{ $color?: string }>`
  ${PanelCSS}
  background-color: ${(props) => props.$color || Colors.lightGrey};
  width: 100%;
  position: relative;
`

export const Content = styled.div<{ $color: string }>`
  height: 100%;
  width: 100%;
  font-size: 0.65rem;
  border: 3px solid ${(props) => props.$color};
  display: grid;
  gap: 1px;
  height: 100%;
`

export const Value = styled(Panel)`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding: 3px 2px;
`

export const TransferOverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  background-color: #ffffff88;
  pointer-events: none;
`
