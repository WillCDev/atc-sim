import { FC } from 'react'
import { Colors, PanelCSS } from '@/constants/styles'
import { ImBrightnessContrast } from 'react-icons/im'
import styled from 'styled-components'
import { Spacer } from '@/components/Spacer'

export const Buttons: FC = () => (
  <>
    <Spacer $size="3px" $vertical />

    <Button>
      <ButtonContent $highlightColor={Colors.red}>
        HDG
        <br />
        ALT
        <br />
        GA
      </ButtonContent>
    </Button>

    <Spacer $size="12px" $vertical />
    <Button>
      <ButtonContent $highlightColor={Colors.purple}>TAG</ButtonContent>
    </Button>

    <Spacer $size="12px" $vertical />
    <Button>
      <ButtonContent>
        CROSS
        <br />
        HILIGHT
      </ButtonContent>
    </Button>
    <Button>
      <ButtonContent>
        DRWY
        <br />
        MDI
        <br />
        ROUTE
      </ButtonContent>
    </Button>
    <Button>
      <ButtonContent>TRXFR</ButtonContent>
    </Button>

    <Spacer $size="12px" $vertical />
    <Button>
      <ButtonContent>LOCAL EDIT</ButtonContent>
    </Button>

    <Spacer $size="4px" $vertical />
    <Button>
      <ButtonContent>
        <ImBrightnessContrast size={25} />
      </ButtonContent>
    </Button>

    <Spacer $size="4px" $vertical />
    <Button>
      <ButtonContent>
        NAS
        <br />
        MSGS
      </ButtonContent>
    </Button>
  </>
)

const Button = styled.button`
  ${PanelCSS}
  padding: 0;
  cursor: pointer;
`

const ButtonContent = styled.div<{ $highlightColor?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  justify-content: center;
  width: 50px;
  font-size: 0.6rem;
  font-weight: bold;
  border: ${({ $highlightColor }) =>
    $highlightColor ? `2px solid ${$highlightColor}` : 'none'};
`
