import styled from '@emotion/styled'

interface Props {
  height: number
}

export function Spacing({ height }: Props) {
  return <Container height={height}></Container>
}

const Container = styled.div<{ height: number }>`
  width: 100%;
  flex-grow: 0;
  height: ${({ height }) => height}px;
`
