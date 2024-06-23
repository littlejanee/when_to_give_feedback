import { css } from '@emotion/react'
import styled from '@emotion/styled'
import CopyToClipboard from 'react-copy-to-clipboard'

interface Props {
  fontFamily: string
}

export function FontFamilyTag({ fontFamily }: Props) {
  return (
    <CopyToClipboard text={fontFamily}>
      <Container fontFamily={fontFamily}>{fontFamily}</Container>
    </CopyToClipboard>
  )
}

const Container = styled.div<{ fontFamily: string }>`
  ${({ fontFamily }) => css`
    color: black;
    font-size: 16px;
    font-family: ${fontFamily};
    margin-right: 8px;
    cursor: copy;
  `}
`
