import styled from '@emotion/styled'
import { isNil } from 'lodash'
import { useCallback } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Condition } from '../constants/enums'
import { useThrottleCallback } from '../hooks/useThrottleCallback'
import { experimentManager } from '../services/experimentManager'
import { fireStore } from '../services/fireStore'

export const IntroductionPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { condition } = useParams()

  const onClickStart = useThrottleCallback(
    useCallback(async () => {
      const id = searchParams.get('id')
      if (isNil(condition)) {
        alert('Condition is not set!')
        return
      }
      const newId = await fireStore.getNewId(condition as Condition, id)
      experimentManager.initialize(newId, condition as Condition)
      navigate(experimentManager.nextStage(condition as Condition))
    }, [condition, navigate, searchParams]),
    500,
  )

  return (
    <Container>
      <Title>Polotno Design Tool</Title>
      <Body>When you are ready, please click “Start” and we will walk you through some key features.</Body>
      <Button variant="primary" size="lg" onClick={onClickStart}>
        start
      </Button>
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
