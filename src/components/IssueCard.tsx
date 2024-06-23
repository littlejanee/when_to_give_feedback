import styled from '@emotion/styled'
import { Button } from 'react-bootstrap'
import Collapsible from 'react-collapsible'
import { Color } from '../constants/colors'
import { IssueTypes } from '../constants/issueTypes'
import { LinearLayout } from './layouts/Linear'
import { Readmore } from './Readmore'
import { BsChevronDown } from 'react-icons/bs'
import { Spacing } from './Spacing'

interface Props {
  title: string
  children: React.ReactNode
  onOpen: () => void
  onResolve: () => void
  onDismiss: () => void
}

export function IssueCard({ title, children, onResolve, onDismiss, onOpen }: Props) {
  const issueInfo = IssueTypes.find((i) => i.name === title.substring(3))

  return (
    <Container>
      <Expand>
        <Collapsible
          trigger={
            <Title>
              {title} <BsChevronDown />
            </Title>
          }
          onOpen={onOpen}
        >
          <Paragraph>Feedback Related To: {issueInfo?.principle}</Paragraph>
          <Header>{'Specific Instance in the Poster'}</Header>
          <Content>{children}</Content>
          <Header>{'Explanation'}</Header>
          <Readmore>{issueInfo?.explanation}</Readmore>
          <Header>{'Recommendations'}</Header>
          <Readmore>
            {issueInfo?.recommendations.map((key) => (
              <p key={key}>{key}</p>
            ))}
          </Readmore>
        </Collapsible>
        <Spacing height={10} />
      </Expand>
      <LinearLayout>
        <Button variant="success" onClick={onResolve}>
          Resolved
        </Button>
        <Button variant="light" onClick={onDismiss}>
          Dismiss
        </Button>
      </LinearLayout>
    </Container>
  )
}

const Container = styled.div`
  padding: 4px;
  color: black;
  border: 1px solid ${Color.Primary};
  border-radius: 0.375rem;
  margin-top: 8px;
`

const Title = styled.div`
  font-weight: bold;
  text-decoration: none;
  text-align: left;
  border: 1px solid white;
  padding: 5px 15px 0px 5px;
  color: ${Color.Title};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Header = styled.div`
  font-weight: bold;
  text-decoration: none;
  text-align: left;
  border: 1px solid white;
  padding: 15px 15px 0px 5px;
`

const Content = styled.div`
  padding: 8px 10px 5px 7px;
  font-size: 14px;
  border: 1px solid ${Color.Notification};
`
const Paragraph = styled.div`
  padding: 0px 0px 0px 8px;
  font-size: 14px;
`

const Expand = styled.div`
  cursor: pointer;
  font-size: 16px;
  .Collapsible__contentInner {
    padding: 4px;
    border-top: 0;
    p {
      margin-bottom: 10px;
      font-size: 14px;
      line-height: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .Collapsible__trigger.is-open svg {
    transform: rotateZ(180deg);
  }
`
