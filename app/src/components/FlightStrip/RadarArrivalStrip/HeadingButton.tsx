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

export const HeadingButton: FC<Props> = ({ style, data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [headingString, setHeadingString] = useState('')
  const setHeading = useFlightStore((state) => state.setHeading)

  const updateHeading = (number: string) => {
    setHeadingString(headingString + number)
  }

  const clearHeading = () => {
    setHeadingString('')
  }

  const applyHeading = () => {
    setHeading(data.callsign, headingString)
    setIsModalOpen(false)
  }

  return (
    <>
      <Button style={style} $size="inherit" onClick={() => setIsModalOpen(true)}>
        {data.heading ?? 'HDG'}
      </Button>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <Grid>
            <Button onClick={() => updateHeading('1')}>1</Button>
            <Button onClick={() => updateHeading('2')}>2</Button>
            <Button onClick={() => updateHeading('3')}>3</Button>
            <Button onClick={() => updateHeading('4')}>4</Button>
            <Button onClick={() => updateHeading('5')}>5</Button>
            <Button onClick={() => updateHeading('6')}>6</Button>
            <Button onClick={() => updateHeading('7')}>7</Button>
            <Button onClick={() => updateHeading('8')}>8</Button>
            <Button onClick={() => updateHeading('9')}>9</Button>
            <Button onClick={clearHeading}>Erase</Button>
            <Button onClick={() => updateHeading('0')}>0</Button>
            <Button disabled={headingString === ''} onClick={applyHeading}>
              OK
            </Button>
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
  grid-template-rows: repeat(4, 1fr);
  gap: 1rem;
`
