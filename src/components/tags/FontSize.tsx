import styled from '@emotion/styled'
import CopyToClipboard from 'react-copy-to-clipboard'

interface Props {
  fontSize: number
}

export function FontSizeTag({ fontSize }: Props) {
  return (
    <CopyToClipboard text={fontSize.toString()}>
      <Container>{fontSize}</Container>
    </CopyToClipboard>
  )
}

const Container = styled.div`
  color: black;
  font-size: 20px;
  margin-right: 8px;
  cursor: copy;
`
