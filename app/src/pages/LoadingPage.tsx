import { FC } from 'react'
import styled from 'styled-components'
import { CenteredContent } from '@/components/CenteredContent'
import { FancyText, fadeIn } from '@/constants/styles'

interface Props {
  text: string
}

export const LoadingPage: FC<Props> = ({ text, ...props }) => {
  return (
    <LoadingWrapper {...props}>
      <SimLoadingText>{text}</SimLoadingText>
    </LoadingWrapper>
  )
}

const LoadingWrapper = styled(CenteredContent)`
  background-image: url('images/loading_plane.gif');
  background-size: cover;
  background-position: center;
  animation: ${fadeIn} 500ms ease-in-out;
`

const SimLoadingText = styled.h1`
  top: -25%;
  position: relative;
  ${FancyText}
`
