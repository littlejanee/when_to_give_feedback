import { css } from '@emotion/react'
import styled from '@emotion/styled'

interface Props {
  color: string
}

export function ColorClass({ color }: Props) {
  return <Container color={color}></Container>
}

const Container = styled.button<{ color: string }>`
  ${({ color }) => css`
    background: ${color};
    width: 20px;
    height: 20px;
    border-style: solid;
    border-radius: 25px;
    border-color: gray;
    border-width: 0.5px;
    margin-left: 5px;
    margin-top: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  `}
`
