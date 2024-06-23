import styled from '@emotion/styled'

export const FallbackPage = () => {
  return (
    <Container>
      <Title>Page Not Found</Title>
      <Body>
        You accessed to a page that does not exist.
        <br />
        Please ask the experimenter for help.
      </Body>
    </Container>
  )
}

const Container = styled.div`
  color: black;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`

const Title = styled.h1`
  font-size: 32px;
`

const Body = styled.p`
  font-size: 24px;
  max-width: 720px;
  text-align: center;
  margin-bottom: 32px;
`
