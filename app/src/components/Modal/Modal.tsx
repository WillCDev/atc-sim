import { PanelCSS } from '@/constants/styles'
import { FC, PropsWithChildren } from 'react'
import styled from 'styled-components'
import { InfoStrip } from '../InfoStrip'

export const Modal: FC<PropsWithChildren<{ onClose?: () => void }>> = ({
  children,
  onClose,
}) => {
  return (
    <ModalWrapper
      onClick={(e) => {
        e.preventDefault()
        e.bubbles = false
      }}
    >
      <ModalContent>
        <InfoStrip
          items={[]}
          buttons={[
            {
              value: 'X',
              width: '100%',
              color: 'red',
              onClick: onClose,
            },
          ]}
        />
        {children}
      </ModalContent>
    </ModalWrapper>
  )
}

const ModalWrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
`

const ModalContent = styled.div`
  ${PanelCSS}
  position: relative;
  pointer-events: all;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
`
