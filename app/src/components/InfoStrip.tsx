import { PanelCSS } from '@/constants/styles'
import { ComponentProps, FC } from 'react'
import styled from 'styled-components'
import { DisplayItem } from './ItemDisplay'

type InfoItem = ComponentProps<typeof DisplayItem>

interface Props {
  items: InfoItem[]
  buttons?: InfoItem[]
}

export const InfoStrip: FC<Props> = ({ items, buttons }) => (
  <Wrapper>
    {items.map((item) => (
      <DisplayItem key={item.value} {...item} />
    ))}
    {!!buttons?.length && <div style={{ flex: 1 }} />}
    {buttons?.map((button) => (
      <DisplayItem key={button.value} {...button} />
    ))}
  </Wrapper>
)

const Wrapper = styled.div`
  ${PanelCSS}
  display: flex;
  padding: 2px;
  gap: 4px;
  overflow: hidden;
`
