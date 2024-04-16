import { css, keyframes } from 'styled-components'

export const Colors = {
  lightGrey: '#c1c1c1',
  darkGrey: '#818181',
  white: '#fdffff',
  black: '#000000',
  skyBlue: '#87ceeb',
  blue: '#0000ff',
  orange: '#ffa500',
  lightSkyBlue: '#e9f2ff',
  lightMustard: '#f7f2d8',
  green: '#00d900',
  red: '#ff0000',
  purple: '#ff00ff',
}

export const PanelCSS = css`
  outline: 1px ${Colors.darkGrey};
  border-style: solid;
  background-color: ${Colors.lightGrey};
  border-color: ${Colors.white} #808080 #808080 ${Colors.white};
  box-shadow: 0px 0px 1px ${Colors.black};
`

export const FancyText = css`
  font-size: 3.5rem;
  font-weight: bold;
  color: ${Colors.white};
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: black;
`

export const fadeIn = keyframes`
    0% { opacity: 0 }
    100% { opacity: 1 }
`
