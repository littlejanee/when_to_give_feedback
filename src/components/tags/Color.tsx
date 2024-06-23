import { css } from '@emotion/react'
import styled from '@emotion/styled'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Color } from '../../constants/colors'

interface Props {
  color: string
}

const WhiteColors = ['white', 'rgb(255,255,255)', '#fff', '#ffffff', 'rgba(255,255,255,1)']

export function ColorTag({ color }: Props) {
  const borderColor = WhiteColors.some((c) => c === color) ? Color.Primary : 'transparent'
  return (
    <CopyToClipboard text={color}>
      <Container color={color} borderColor={borderColor} />
    </CopyToClipboard>
  )
}

const Container = styled.div<{ color: string; borderColor: string }>`
  ${({ color, borderColor }) => css`
    cursor: copy;
    background: ${color};
    width: 50px;
    height: 50px;
    border-radius: 5px;
    margin: 5px;
    font-size: 8px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${borderColor};
  `}
`
