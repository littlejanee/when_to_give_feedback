import styled from '@emotion/styled'
import produce from 'immer'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Dropdown, Card, Button } from 'react-bootstrap'
import { Editor } from '../components/Editor'
import { Radio } from '../components/Radio'
import { CANVAS_HEIGHT_FEEDBACK, CANVAS_WIDTH_FEEDBACK, NO_ID } from '../constants/constants'
import { LogType, ViolationType } from '../constants/enums'
import { IssueTypes } from '../constants/issueTypes'
import { MarkerType } from '../constants/markers'
import { useSubscribeIssues } from '../hooks/useSubscribeIssues'
import { useSubscribeParticipants } from '../hooks/useSubscribeParticipants'
import { useSubscribeStoreRemote } from '../hooks/useSubscribeStoreRemote'
import { fireStore, updateDocLog } from '../services/fireStore'
import { store } from '../App'
import { max } from 'lodash'
import { useSaveLog } from '../hooks/useSaveLog'
import { DesignElements } from '../components/DesignElements'
import { useSubscribeStoreLocal } from '../hooks/useSubscribeStoreLocal'

export const WizardPage = () => {
  const { participants } = useSubscribeParticipants()
  const [selectedParticipant, setSelectedParticipant] = useState(NO_ID)
  const { issues } = useSubscribeIssues(selectedParticipant)
  const { polotnoState } = useSubscribeStoreRemote(selectedParticipant)
  const { polotnoStore: polotnoStoreLocal } = useSubscribeStoreLocal()
  const { log } = useSaveLog(selectedParticipant)

  const chooseParticipant = useCallback(
    (i: number) => () => {
      const id = participants[i]
      setSelectedParticipant(id)
    },
    [participants],
  )

  const createIssue = useCallback(
    async (x: number, y: number) => {
      const id = (max(issues.map((i) => i.id)) ?? 0) + 1
      await updateDocLog(fireStore.participant(selectedParticipant), {
        issues: produce(issues, (draft) => {
          draft.push({
            id,
            type: ViolationType.A_1,
            description: '',
            x,
            y,
            published: false,
          })
        }),
      })
      await log(LogType.CreateIssue, { issueId: id })
    },
    [issues, log, selectedParticipant],
  )

  const deleteIssue = useCallback(
    (id: number) => async () => {
      await updateDocLog(fireStore.participant(selectedParticipant), {
        issues: produce(issues, (draft) => {
          const i = draft.findIndex((issue) => issue.id === id)
          draft.splice(i, 1)
        }),
      })
      await log(LogType.DeleteIssue, { issueId: id })
    },
    [issues, log, selectedParticipant],
  )

  const editIssueDescription = useCallback(
    (id: number) => async (e: ChangeEvent<HTMLTextAreaElement>) => {
      const description = e.target.value
      await updateDocLog(fireStore.participant(selectedParticipant), {
        issues: produce(issues, (draft) => {
          const i = draft.findIndex((issue) => issue.id === id)
          draft[i].description = description
        }),
      })
    },
    [issues, selectedParticipant],
  )

  const editIssueType = useCallback(
    (id: number, issueType: ViolationType) => async () => {
      await updateDocLog(fireStore.participant(selectedParticipant), {
        issues: produce(issues, (draft) => {
          const i = draft.findIndex((issue) => issue.id === id)
          draft[i].type = issueType
        }),
      })
    },
    [issues, selectedParticipant],
  )

  useEffect(() => {
    if (polotnoState !== null) {
      store.loadJSON(polotnoState)
    }
  }, [polotnoState])

  return (
    <Container>
      <FieldSet>
        <Legend>Participant</Legend>
        {participants.map((option, i) => (
          <Radio key={option} option={option} checked={selectedParticipant === participants[i]} name="participant" onChange={chooseParticipant(i)}>
            {option}
          </Radio>
        ))}
      </FieldSet>
      <FieldSet>
        <DesignElements polotnoStore={polotnoStoreLocal} />
        <Legend>Issues</Legend>
        {issues.map(({ type, x, y, id, description }) => {
          const issueType = IssueTypes.find((it) => it.type === type)
          const key = `${type},${x},${y}`
          return (
            <Card body key={key}>
              <div>#{id}</div>
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id={key}>
                  {issueType?.name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {IssueTypes.map((it) => (
                    <Dropdown.Item key={it.type} onClick={editIssueType(id, it.type)}>
                      {it.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <TextInput value={description} onChange={editIssueDescription(id)} />
              <Button variant="danger" onClick={deleteIssue(id)}>
                Delete
              </Button>
            </Card>
          )
        })}
      </FieldSet>
      <Editor
        store={store}
        hasZoomButtons={false}
        onClick={createIssue}
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
  grid-template-columns: 1fr 2fr 3fr;
`

const Legend = styled.legend`
  font-size: 18px;
  margin-top: 8px;
`

const FieldSet = styled.fieldset`
  padding: 8px;
  height: 100vh;
  overflow: auto;
  border-right: 1px solid black;
`

const TextInput = styled.textarea`
  background: transparent;
  width: 100%;
  color: black;
`
