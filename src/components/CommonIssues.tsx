import styled from '@emotion/styled'

interface Props {
  title: string
  children: React.ReactNode
}

export function CommonIssue({ title, children }: Props) {
  return (
    <Container>
      <Header>{title}</Header>
      <Content>{children}</Content>
    </Container>
  )
}

const Container = styled.div`
  padding: 4px;
  color: black;
  border-radius: 0.375rem;
  margin-top: 8px;
`

const Header = styled.div`
  font-weight: bold;
  text-decoration: none;
  position: relative;
  border: 1px solid white;
  padding: 10px 10px 10px 0px;
`

const Content = styled.div`
  font-size: 14px;
`
