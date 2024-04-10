import { FC } from 'react'
import styled from 'styled-components'
import { CenteredContent } from './CenteredContent'
import { Colors } from '@/constants/styles'

interface Props {
  value: string | number
  gap?: number
  color?: string
  basis?: string
  width?: string | number
  height?: string | number
  bold?: boolean
  fontSize?: string
  grow?: boolean
  align?: 'left' | 'center' | 'right'
  style?: React.CSSProperties
  onClick?: () => void
}

export const DisplayItem: FC<Props> = (props) => (
  <Item
    $width={props.width}
    $height={props.height}
    $gap={props.gap}
    $color={props.color}
    $bold={props.bold}
    $fontSize={props.fontSize}
    $grow={props.grow}
    $basis={props.basis}
    style={props.style}
    onClick={props.onClick}
  >
    <CenteredContent $align={props.align}>{props.value}</CenteredContent>
  </Item>
)

const Item = styled.div<{
  $width?: string | number
  $height?: string | number
  $gap?: number
  $color?: string
  $bold?: boolean
  $fontSize?: string
  $grow?: boolean
  $basis?: string
  onClick?: () => void
}>`
  flex: 1;
  font-size: ${({ $bold, $fontSize }) => $fontSize ?? ($bold ? '1rem' : '0.71rem')};
  font-weight: bold;
  width: ${({ $width = 'auto' }) => $width};
  height: ${({ $height = 'auto' }) => $height};
  background-color: ${({ $color = Colors.lightMustard }) => $color};
  flex-grow: ${({ $grow }) => ($grow ? 1 : 0)};
  flex-shrink: 1;
  flex-basis: ${({ $basis }) => $basis};
  padding: 2px 10px 1px 10px;
  margin-left: ${({ $gap = 0 }) => $gap}px;
  box-shadow: 1px 1px 1px inset ${Colors.darkGrey};
  white-space: nowrap;
  cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};
`
