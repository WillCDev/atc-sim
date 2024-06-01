import { CSSProperties, FC, PropsWithChildren, useState } from 'react'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import styled from 'styled-components'
import { useFlightStore } from '@/store'
import { Colors } from '@/constants/styles'

interface Props {
  style: CSSProperties
  callsign: string
  highlight?: boolean
}

export const AltitudeButton: FC<PropsWithChildren<Props>> = ({
  style,
  children,
  callsign,
  highlight,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const setAltitude = useFlightStore((state) => state.setAltitude)
  const clearForApproach = useFlightStore((state) => state.clearStripForApproach)

  const updateAltitude = (value: string) => {
    setAltitude(callsign, value)
    setIsModalOpen(false)
  }

  const clearFlightForApproach = () => {
    clearForApproach(callsign)
    setIsModalOpen(false)
  }

  return (
    <>
      <Button
        style={style}
        $size="inherit"
        $color={highlight ? Colors.green : undefined}
        onClick={() => setIsModalOpen(true)}
      >
        {children}
      </Button>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <Grid>
            <Button onClick={() => updateAltitude('090')}>090</Button>
            <Button onClick={() => updateAltitude('A50')}>A50</Button>
            <Button onClick={() => updateAltitude('A30')}>A30</Button>

            <Button onClick={() => updateAltitude('080')}>080</Button>
            <Button onClick={() => updateAltitude('A45')}>A45</Button>
            <Button onClick={() => updateAltitude('A25')}>A25</Button>

            <Button onClick={() => updateAltitude('070')}>070</Button>
            <Button onClick={() => updateAltitude('A40')}>A40</Button>
            <Button onClick={() => updateAltitude('A20')}>A20</Button>

            <Button onClick={() => updateAltitude('060')}>060</Button>
            <Button onClick={() => updateAltitude('A35')}>A35</Button>
            <Button onClick={() => updateAltitude('A15')}>A15</Button>

            <div />
            <Button onClick={clearFlightForApproach}>&darr;</Button>
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
