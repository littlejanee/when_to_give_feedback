import styled from '@emotion/styled'
import { uniq } from 'lodash'
import { StoreType } from 'polotno/model/store'
import { Color } from '../constants/colors'
import { PolotnoUtil } from '../utils/polotno'
import { LinearLayout } from './layouts/Linear'
import { ColorTag } from './tags/Color'
import { FontFamilyTag } from './tags/FontFamily'
import { FontSizeTag } from './tags/FontSize'

interface Props {
  polotnoStore: Readonly<StoreType>
}

export function DesignElements({ polotnoStore }: Props) {
  return (
    <Container>
      <Header>Design Elements</Header>
      <SubHeader>Font Family</SubHeader>
      <LinearLayout>
        {uniq(
          PolotnoUtil.filterTextElementsBy(polotnoStore.pages, 'fontFamily').map((fontFamily) => <FontFamilyTag key={fontFamily} fontFamily={fontFamily} />),
        )}
      </LinearLayout>
      <SubHeader>Text Color</SubHeader>
      <LinearLayout>{uniq(PolotnoUtil.filterTextElementsBy(polotnoStore.pages, 'fill').map((color) => <ColorTag key={color} color={color} />))}</LinearLayout>
      <SubHeader>Font Size</SubHeader>
      <LinearLayout>
        {uniq(PolotnoUtil.filterTextElementsBy(polotnoStore.pages, 'fontSize').map((fontSize) => <FontSizeTag key={fontSize} fontSize={fontSize} />))}
      </LinearLayout>
    </Container>
  )
}

const Container = styled.div`
  flex: 0;
  color: ${Color.Primary};
  border-radius: 8px;
  background: white;
  margin: 24px;
  margin-top: 0px;
  padding: 12px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
`

const SubHeader = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-top: 8px;
  margin-bottom: 4px;
`

const Header = styled.div`
  font-style: normal;
  font-weight: 800;
  font-size: 22px;
  margin-top: 5px;
  margin-bottom: 6px;
`
