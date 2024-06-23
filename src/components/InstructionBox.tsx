import styled from '@emotion/styled'
import { COLOR_SET } from '../constants/ui'
import { ColorTag } from './tags/Color'
import { LinearLayout } from './layouts/Linear'

export function InstructionBox() {
  return (
    <Container>
      <b>Requirements:</b>
      <ul>
        <li>
          Must include ALL the content in the <b>Text</b> section
        </li>
        <li>
          Must include at least 1 graphic from the <b>Graphic</b> section
        </li>
        <li>Must use at least 1 color from the following</li>
      </ul>
      <LinearLayout>
        {COLOR_SET.map((color) => (
          <ColorTag key={color} color={color} />
        ))}
      </LinearLayout>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  padding: 12px;
  color: black;
  margin: 3px;
  background: white;
  border: none;
`
