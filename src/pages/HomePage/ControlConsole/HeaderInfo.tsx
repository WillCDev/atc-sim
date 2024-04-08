import { FC } from 'react'
import { InfoStrip } from '../../../components/InfoStrip'

export const HeaderInfo: FC = () => (
  <InfoStrip
    items={[
      { value: 'INFO', basis: '100px' },
      { value: 5 },
      { value: 'NEW INFO' },
      { value: 'NEW MDI' },
      { value: 'FIND + DELETE' },
      { value: 'STORED FLIGHTS' },
      { value: 'EDIT INFO' },
    ]}
  />
)
