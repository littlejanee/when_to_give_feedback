import styled from '@emotion/styled'
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno'
import { StoreType } from 'polotno/model/store'
import { ElementsSection, SidePanel, SizeSection } from 'polotno/side-panel'
import { Toolbar } from 'polotno/toolbar/toolbar'
import { useContainer } from 'unstated-next'
import { Color } from '../constants/colors'
import { CANVAS_HEIGHT_FEEDBACK, CANVAS_WIDTH_FEEDBACK } from '../constants/constants'
import { MarkerType } from '../constants/markers'
import { RIGHT_PANEL_WIDTH, TOP_BAR_HEIGHT } from '../constants/ui'
import { DesignFeedbackContainer } from '../pages/designFeedback'
import { DesignElements } from './DesignElements'
import { Editor } from './Editor'
import { PrincipleList } from './PrincipleList'
import { BackgroundPart } from './sections/BackgroundPart'
import { CustomGraphics } from './sections/Graphic'
import { CustomPhotos } from './sections/Images'
import { CustomText } from './sections/TextPart'
import { TopBar } from './TopBar'
import { setGoogleFonts } from 'polotno/config'
import { FontList } from '../constants/enums'

export const EditorWithFeedback = ({ store }: { store: StoreType }) => {
  const { showMarkers, displayedIssues, polotnoStore } = useContainer(DesignFeedbackContainer)
  const fonts = Object.values(FontList)
  fonts.sort()
  setGoogleFonts(fonts)

  // useEffect(() => {
  //   checkDesign().then((results) => {
  //     setViolations(results.filter((res) => res.violated))
  //   })
  //   logPolotnoState(polotnoStore)
  // }, [checkDesign, polotnoStore, logPolotnoState])

  return (
    <EditorContainer>
      <CanvasSection>
        <TopBar store={store} />
        <PolotnoContainer>
          <SidePanelWrap>
            <SidePanel
              store={store}
              sections={[CustomText, BackgroundPart, CustomPhotos, CustomGraphics, ElementsSection, SizeSection]}
              defaultSection="custom"
            />
          </SidePanelWrap>
          <WorkspaceWrap>
            <Toolbar store={store} />
            <Editor
              store={store}
              hasZoomButtons={false}
              canvasWidth={CANVAS_WIDTH_FEEDBACK}
              canvasheight={CANVAS_HEIGHT_FEEDBACK}
              markers={
                showMarkers
                  ? displayedIssues.map(({ x, y, page, id }) => ({
                      x,
                      y,
                      id,
                      page,
                      width: 50,
                      height: 50,
                      type: MarkerType.Text,
                    }))
                  : []
              }
            />
          </WorkspaceWrap>
        </PolotnoContainer>
      </CanvasSection>
      <RightPanel>
        <PrincipleList />
        <DesignElements polotnoStore={polotnoStore} />
      </RightPanel>
    </EditorContainer>
  )
}

const EditorContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: calc(100% - ${RIGHT_PANEL_WIDTH}px) ${RIGHT_PANEL_WIDTH}px;
`

const CanvasSection = styled.div`
  height: calc(100vh - ${TOP_BAR_HEIGHT}px);
`

const RightPanel = styled.div`
  width: ${RIGHT_PANEL_WIDTH}px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${Color.Background};
  border-left: 5px solid #434b56;
`
