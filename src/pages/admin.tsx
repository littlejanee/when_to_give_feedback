import styled from '@emotion/styled'
import produce from 'immer'
import { useCallback, useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Editor } from '../components/Editor'
import { Radio } from '../components/Radio'
import { Conditions } from '../constants/conditions'
import { CANVAS_HEIGHT_FEEDBACK, CANVAS_WIDTH_FEEDBACK, NO_ID } from '../constants/constants'
import { Condition, LogType } from '../constants/enums'
import { IssueTypes } from '../constants/issueTypes'
import { useExperiment } from '../hooks/useExperiment'
import { useSubscribeIssues } from '../hooks/useSubscribeIssues'
import { useSubscribeParticipants } from '../hooks/useSubscribeParticipants'
import { useSubscribeStoreRemote } from '../hooks/useSubscribeStoreRemote'
import { useUpdateCondition } from '../hooks/useUpdateCondition'
import { fireStore, updateDocLog } from '../services/fireStore'
import { ObjectUtil } from '../utils/object'
import { store } from '../App'
import { MarkerType } from '../constants/markers'
import { useSaveLog } from '../hooks/useSaveLog'

export const AdminPage = () => {
  const { participants } = useSubscribeParticipants()
  const [selectedParticipant, setSelectedParticipant] = useState(NO_ID)
  const { updateCondition } = useUpdateCondition(selectedParticipant)
  const { issues } = useSubscribeIssues(selectedParticipant)
  const { condition } = useExperiment(selectedParticipant)
  const { polotnoState } = useSubscribeStoreRemote(selectedParticipant)
  const { log } = useSaveLog(selectedParticipant)

  const chooseParticipant = useCallback(
    (i: number) => () => {
      const id = participants[i]
      setSelectedParticipant(id)
    },
    [participants],
  )

  const chooseCondition = useCallback(
    (i: number) => () => {
      const cond = Object.keys(Condition)[i] as Condition
      updateCondition(cond)
    },
    [updateCondition],
  )

  const togglePublished = useCallback(
    (id: number) => async () => {
      const i = issues.findIndex((issue) => issue.id === id)
      const isPublished = issues[i].published
      await updateDocLog(fireStore.participant(selectedParticipant), {
        issues: produce(issues, (draft) => {
          draft[i].published = !isPublished
        }),
      })
      if (!isPublished) {
        await log(LogType.PublishIssue, { issueId: id })
      } else {
        await log(LogType.UnpublishIssue, { issueId: id })
      }
    },
    [issues, log, selectedParticipant],
  )

  const logStartExperiment = useCallback(async () => {
    await log(LogType.Start)
    alert('Log Start')
  }, [log])

  const logEndExperiment = useCallback(async () => {
    await log(LogType.End)
    alert('Log End')
  }, [log])

  useEffect(() => {
    if (polotnoState !== null) {
      store.loadJSON(polotnoState)
    }
  }, [polotnoState])

  return (
    <Container>
      <FieldSet>
        <Legend>Participant</Legend>
        {participants.map((option, i) => {
          return (
            <Radio key={option} option={option} checked={selectedParticipant === participants[i]} name="participant" onChange={chooseParticipant(i)}>
              {option}
            </Radio>
          )
        })}
      </FieldSet>
      <FieldSet>
        <Legend>Log</Legend>
        <Button onClick={logStartExperiment}>Start</Button>
        <Button onClick={logEndExperiment}>End</Button>
        <Legend>Condition</Legend>
        {ObjectUtil.keys(Condition).map((option, i) => {
          return (
            <Radio key={option} option={option} checked={condition === Object.keys(Condition)[i]} name="condition" onChange={chooseCondition(i)}>
              {Conditions[option].name}
            </Radio>
          )
        })}
      </FieldSet>
      <FieldSet>
        <Legend>Issues</Legend>
        {issues.map(({ type, x, y, description, published, id }) => {
          const issueType = IssueTypes.find((it) => it.type === type)
          const key = `${type},${x},${y}`
          return (
            <Card body key={key}>
              <div>#{id}</div>
              <div>{issueType?.name}</div>
              <div>{description}</div>
              <Button variant={published ? 'danger' : 'primary'} onClick={togglePublished(id)}>
                {published ? 'Unpublish' : 'Publish'}
              </Button>
            </Card>
          )
        })}
      </FieldSet>
      <Editor
        store={store}
        hasZoomButtons={false}
        markers={issues.map(({ x, y, id }) => ({ x, y, id, width: 50, height: 50, type: MarkerType.Text }))}
        canvasWidth={CANVAS_WIDTH_FEEDBACK}
        canvasheight={CANVAS_HEIGHT_FEEDBACK}
        editable={false}
      />
    </Container>
  )
}

const Container = styled.div`
  color: black;
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr 1fr 3fr 3fr;
`

const Legend = styled.legend`
  font-size: 18px;
  margin-top: 8px;
`

const FieldSet = styled.fieldset`
  padding: 16px;
  border-left: 1px solid black;
`
