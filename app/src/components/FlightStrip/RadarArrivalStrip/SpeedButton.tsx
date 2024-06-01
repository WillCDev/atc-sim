import { CSSProperties, FC, useState } from 'react'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import { FlightStripData } from '@/types'
import styled from 'styled-components'
import { useFlightStore } from '@/store'

interface Props {
  style: CSSProperties
  data: FlightStripData
}

export const SpeedButton: FC<Props> = ({ style, data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const updateFlightSpeed = useFlightStore((state) => state.setFlightSpeed)

  const setFlightSpeed = (speed: string) => {
    updateFlightSpeed(data.callsign, speed)
    setIsModalOpen(false)
  }

  return (
    <>
      <Button style={style} $size="inherit" onClick={() => setIsModalOpen(true)}>
        {data.speed ?? 'SPD'}
      </Button>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <Grid>
            <Button onClick={() => setFlightSpeed('250')}>250</Button>
            <Button onClick={() => setFlightSpeed('200')}>200</Button>
            <div />
            <Button onClick={() => setFlightSpeed('240')}>240</Button>
            <Button onClick={() => setFlightSpeed('190')}>190</Button>
            <div />
            <Button onClick={() => setFlightSpeed('230')}>230</Button>
            <Button onClick={() => setFlightSpeed('180')}>180</Button>
            <div />
            <Button onClick={() => setFlightSpeed('220')}>220</Button>
            <Button onClick={() => setFlightSpeed('170')}>170</Button>
            <div />
            <Button onClick={() => setFlightSpeed('210')}>210</Button>
            <Button onClick={() => setFlightSpeed('160')}>160</Button>
            <div />
          </Grid>
        </Modal>
      )}
    </>
  )
}

const Grid = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 1rem;
`
