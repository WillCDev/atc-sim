import { FC } from 'react'
import styled from 'styled-components'
import { InfoStrip } from '@/components/InfoStrip'
import { Colors } from '@/constants/styles'

export const HeaderMetrics: FC = () => (
  <Wrapper>
    <InfoStrip
      items={[
        { value: 'SPACING', width: '100px', color: Colors.white },
        { value: '4', width: '120px', color: Colors.white, grow: true, align: 'left' },
        { value: '', width: '0px', color: Colors.red },
      ]}
    />
    <InfoStrip
      items={[
        { value: 'WAL/IOM', width: '100px', color: Colors.white },
        {
          value: '128.055',
          width: '120px',
          color: Colors.white,
          grow: true,
          align: 'left',
        },
        { value: '', width: '0px', color: Colors.red },
      ]}
    />
    <InfoStrip
      items={[
        { value: 'EGGP', width: '100px', color: Colors.white },
        {
          value: '27',
          width: '120px',
          color: Colors.white,
          grow: true,
          align: 'left',
        },
        { value: '', width: '0px', color: Colors.red },
      ]}
    />
    <InfoStrip
      items={[
        { value: 'STAFA', width: '100px', color: Colors.white },
        {
          value: '134.430',
          width: '120px',
          color: Colors.white,
          grow: true,
          align: 'left',
        },
        { value: '', width: '0px', color: Colors.red },
      ]}
    />
    <InfoStrip
      items={[
        { value: 'NORTH', width: '100px', color: Colors.white },
        {
          value: '133.8',
          width: '120px',
          color: Colors.white,
          grow: true,
          align: 'left',
        },
        { value: '', width: '0px', color: Colors.red },
      ]}
    />
  </Wrapper>
)

const Wrapper = styled.section`
  display: flex;
`
