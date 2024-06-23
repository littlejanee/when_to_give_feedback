import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useCallback } from 'react'
import { Button, Nav, Tab } from 'react-bootstrap'
import { useContainer } from 'unstated-next'
import { Color } from '../constants/colors'
import { Principle, ViolationType } from '../constants/enums'
import { IssueTypes } from '../constants/issueTypes'
import { Principles } from '../constants/principles'
import { useSaveLog } from '../hooks/useSaveLog'
import { DesignFeedbackContainer } from '../pages/designFeedback'
import { ObjectUtil } from '../utils/object'
import { CommonIssue } from './CommonIssues'
import { IssueCard } from './IssueCard'
import { LinearLayout } from './layouts/Linear'
import { NotifiableButton } from './NotifiableButton'
import { Readmore } from './Readmore'
import { Spacing } from './Spacing'
import { app } from '../services/firebaseApp'

export function PrincipleList() {
  const {
    selectedPrinciple,
    displayedIssues,
    displayedCommons,
    notification,
    setSelectedPrinciple,
    toggleAnnotations,
    showMarkers,
    requestFeedback,
    isFetchingFeedback,
    isRequestAvailable,
    resolveIssue,
    dismissIssue,
  } = useContainer(DesignFeedbackContainer)
  const { logClickCommon, logClickDetected, logExpandIssueCard, logClickPrincipleTab, logClickPrincipleReadMore } = useSaveLog()

  const onSelectPrinciple = useCallback(
    (eventKey: string | null) => {
      if (eventKey === 'All') {
        setSelectedPrinciple(null)
        logClickPrincipleTab('All')
      } else {
        const principle = (eventKey ?? Principle.Hierarchy) as Principle
        setSelectedPrinciple(principle)
        logClickPrincipleTab(principle)
      }
    },
    [logClickPrincipleTab, setSelectedPrinciple],
  )

  const onSelectListType = useCallback(
    (eventKey: string | null) => {
      if (eventKey === 'Detected') {
        logClickDetected(selectedPrinciple ?? 'All')
      } else {
        logClickCommon(selectedPrinciple ?? 'All')
      }
    },
    [logClickCommon, logClickDetected, selectedPrinciple],
  )

  const onExpandIssueCard = useCallback(
    (violationType: ViolationType, issueDesc: string, principleTab: string) => () => {
      logExpandIssueCard(violationType, issueDesc, principleTab)
    },
    [logExpandIssueCard],
  )
  // const firebaseID = app.options.projectId
  // const InAction = firebaseID?.includes('prod3') ? true : false

  const button = Array.from(document.getElementsByClassName('btn btn-dark') as HTMLCollectionOf<HTMLElement>)
  let grayedOut
  if (button.length !== 0) {
    const buttonFeedback = button[0].style
    grayedOut = function () {
      requestFeedback()
      buttonFeedback.background = 'lightgrey'
      buttonFeedback.border = 'none'
      setTimeout(function () {
        buttonFeedback.background = 'black'
        buttonFeedback.border = 'none'
      }, 60000)
    }
  } else {
    grayedOut = function () {
      requestFeedback()
    }
  }

  return (
    <Content>
      <Header>
        Principled Feedback
        <LinearLayout>
          <NotifiableButton hasNotification={isRequestAvailable} variant="dark" style={{ marginRight: 12 }} onClick={grayedOut}>
            Request Feedback
          </NotifiableButton>
          <Button variant="light" onClick={toggleAnnotations}>
            Annotation: {showMarkers ? 'On' : 'Off'}
          </Button>
        </LinearLayout>
      </Header>
      <Tab.Container id="principles" activeKey={selectedPrinciple ?? 'All'} onSelect={onSelectPrinciple}>
        <div style={{ paddingLeft: 12, paddingRight: 12 }}>
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey={'All'} style={{ outline: 'none' }}>
                All
              </Nav.Link>
            </Nav.Item>
            {ObjectUtil.keys(Principles).map((key) => (
              <Nav.Item key={key}>
                <Nav.Link eventKey={key} style={{ outline: 'none' }}>
                  <NotificationTab notification={notification.has(key)}>{Principles[key].name}</NotificationTab>
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <Scrollable>
          <Tab.Content>
            <Tab.Pane eventKey="All">
              {displayedIssues.length === 0 && <Notice>No feedback at the moment.</Notice>}
              {isFetchingFeedback ? (
                <Loading>Fetching Feedback...</Loading>
              ) : (
                displayedIssues.map(({ type, id, description }, i) => {
                  const issueInfo = IssueTypes.find((i) => i.type === type)
                  return (
                    <IssueCard
                      key={i}
                      title={`${id}. ${issueInfo?.name ?? ''}`}
                      onResolve={resolveIssue(i)}
                      onDismiss={dismissIssue(i)}
                      onOpen={onExpandIssueCard(type, description, 'All')}
                    >
                      {description}
                    </IssueCard>
                  )
                })
              )}
            </Tab.Pane>
            {ObjectUtil.keys(Principles).map((principle) => (
              <Tab.Pane key={principle} eventKey={principle}>
                <Readmore onClick={() => logClickPrincipleReadMore(principle)}>{Principles[principle].explanation}</Readmore>

                <Spacing height={24} />
                <Tab.Container id="issues" defaultActiveKey={'Common'} onSelect={onSelectListType}>
                  <Tab.Content>
                    <Tab.Pane eventKey="Common">
                      {isFetchingFeedback ? (
                        <Loading>Fetching Feedback...</Loading>
                      ) : (
                        displayedCommons.map((issue) => {
                          return (
                            <CommonIssue key={issue[0]} title={issue[0]}>
                              {issue[1]}
                            </CommonIssue>
                          )
                        })
                      )}
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Scrollable>
      </Tab.Container>
    </Content>
  )
}

const Content = styled.div`
  flex: 1;
  color: #36454f;
  background: white;
  border-radius: 8px;
  margin: 24px;
  justify-content: flex-start;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  height: calc(100vh - 425px);
`

const Scrollable = styled.div`
  overflow: scroll;
  padding: 12px;
  flex-grow: 1;
`

const Loading = styled.div`
  text-align: center;
  margin-top: 40px;
`

const Header = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  padding: 12px;
`

const Notice = styled.div`
  padding: 4px;
  color: black;
  border-radius: 0.375rem;
  margin-top: 8px;
  font-size: 14px;
  white-space: pre-line;
`

const NotificationTab = styled.div<{ notification: boolean }>`
  ${({ notification }) => css`
    position: relative;
    &::after {
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: ${notification ? Color.Notification : 'transparent'};
    }
  `}
`
