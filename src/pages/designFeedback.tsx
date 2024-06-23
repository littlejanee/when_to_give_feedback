import produce from 'immer'
import { compact, differenceWith, isEqual } from 'lodash'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createContainer } from 'unstated-next'
import { store } from '../App'
import { EditorWithFeedback } from '../components/editorWithFeedback'
import { NO_ID } from '../constants/constants'
import { Principle } from '../constants/enums'
import { IssueTypes } from '../constants/issueTypes'
import { useCaptureCanvas } from '../hooks/useCaptureCanvas'
import { useExperiment } from '../hooks/useExperiment'
import { useSaveLog } from '../hooks/useSaveLog'
import { useSubscribeIssues } from '../hooks/useSubscribeIssues'
import { useSubscribeStoreLocal } from '../hooks/useSubscribeStoreLocal'
import { useSubscribeStoreRemote } from '../hooks/useSubscribeStoreRemote'
import { useUpdateStoreRemote } from '../hooks/useUpdateStoreRemote'
import { experimentManager } from '../services/experimentManager'
import { Issue } from '../types/participant'

export const DesignFeedbackContainer = createContainer(() => {
  const id = experimentManager.id ?? NO_ID
  const latestIssues = useSubscribeIssues(id).issues.filter((issue) => issue.published)
  const [selectedPrinciple, setSelectedPrinciple] = useState<Principle | null>(null)
  const [displayedIssues, setDisplayedIssues] = useState<Issue[]>([])
  const [displayedCommons, setDisplayedCommons] = useState<string[][]>([])
  const [notification, setNotification] = useState<Set<Principle>>(new Set())
  const [prevIssues, setPrevIssues] = useState<Issue[]>([])
  const [showMarkers, setShowMarkers] = useState(true)
  const [issues, setIssues] = useState<Issue[]>(latestIssues)
  const [isFetchingFeedback, setIsFetchingFeedback] = useState(false)
  const [isRequestAvailable, setIsRequestAvailable] = useState(false)
  const { logResolveIssue, logDismissIssue, logTurnOffAnnotation, logTurnOnAnnotation, logRequestFeedback } = useSaveLog()
  const { captureCanvas } = useCaptureCanvas()
  const { condition } = useExperiment(id)
  const { polotnoStore } = useSubscribeStoreLocal()
  const { updatePolotnoState } = useUpdateStoreRemote()

  const requestFeedback = useCallback(() => {
    setIsFetchingFeedback(true)
    setIsRequestAvailable(false)
    const snapshot = `${Date.now()}.png`
    logRequestFeedback(snapshot)
    captureCanvas(snapshot)
    setTimeout(() => {
      setIssues(latestIssues.filter((issue) => issue.published))
      setIsFetchingFeedback(false)
      setSelectedPrinciple(null)
    }, 500)
  }, [captureCanvas, latestIssues, logRequestFeedback])

  const removeIssue = useCallback(
    (issue: Issue) => {
      setIssues(
        produce(issues, (draft) => {
          draft.splice(
            draft.findIndex((i) => i.type === issue.type && i.description === issue.description),
            1,
          )
        }),
      )
    },
    [issues],
  )

  const resolveIssue = useCallback(
    (issueId: number) => async () => {
      const issue = displayedIssues[issueId]
      await logResolveIssue(issue.type, issue.description, selectedPrinciple ?? 'All')
      removeIssue(issue)
    },
    [displayedIssues, logResolveIssue, removeIssue, selectedPrinciple],
  )

  const dismissIssue = useCallback(
    (issueId: number) => async () => {
      const issue = displayedIssues[issueId]
      await logDismissIssue(issue.type, issue.description, selectedPrinciple ?? 'All')
      removeIssue(issue)
    },
    [displayedIssues, logDismissIssue, removeIssue, selectedPrinciple],
  )

  const toggleAnnotations = useCallback(() => {
    if (showMarkers) {
      logTurnOffAnnotation()
    } else {
      logTurnOnAnnotation()
    }
    setShowMarkers(!showMarkers)
  }, [logTurnOffAnnotation, logTurnOnAnnotation, showMarkers])

  useEffect(() => {
    if (0 < notification.size && selectedPrinciple === null) {
      setNotification(new Set())
    } else if (selectedPrinciple !== null && notification.has(selectedPrinciple)) {
      setNotification(
        produce(notification, (draft) => {
          draft.delete(selectedPrinciple)
        }),
      )
    }
  }, [notification, selectedPrinciple])

  useEffect(() => {
    if (selectedPrinciple === null) {
      setDisplayedIssues(issues)
    } else {
      const issueFilter = IssueTypes.filter((i) => i.principle === selectedPrinciple)
      setDisplayedIssues(issues.filter((i) => issueFilter.some((f) => f.type === i.type)))
    }
  }, [issues, selectedPrinciple])

  useEffect(() => {
    const issueFilter = IssueTypes.filter((i) => i.principle === selectedPrinciple)
    setDisplayedCommons(
      issueFilter.map((element) => {
        return [element.name, element.explanation]
      }),
    )
  }, [selectedPrinciple])

  useEffect(() => {
    const newIssues = differenceWith(issues, prevIssues, isEqual)
    if (0 < newIssues.length) {
      const principles = compact(newIssues.map((i) => IssueTypes.find((it) => it.type === i.type)?.principle))
      setNotification(
        produce(notification, (draft) => {
          principles.filter((p) => p !== selectedPrinciple).forEach((p) => draft.add(p))
        }),
      )
    }
    setPrevIssues(issues)
  }, [issues, notification, prevIssues, selectedPrinciple])

  const deferredRequestAvailableCheck = useRef<NodeJS.Timeout>()
  useEffect(() => {
    if (deferredRequestAvailableCheck.current != null) {
      clearTimeout(deferredRequestAvailableCheck.current)
    }
    deferredRequestAvailableCheck.current = setTimeout(() => {
      setIsRequestAvailable(!isEqual(latestIssues, issues))
    }, 4 * 1000)
  }, [issues, latestIssues])

  useEffect(() => {
    if (0 < polotnoStore.pages.length) {
      updatePolotnoState(polotnoStore)
    }
  }, [polotnoStore, updatePolotnoState])

  const { polotnoState: polotnoStateRemote } = useSubscribeStoreRemote(id)

  useEffect(() => {
    if (0 === polotnoStore.pages.length && polotnoStateRemote) {
      store?.loadJSON(polotnoStateRemote)
    }
  }, [polotnoStateRemote, polotnoStore.pages.length])

  return {
    displayedIssues,
    displayedCommons,
    notification,
    selectedPrinciple,
    isRequestAvailable,
    setSelectedPrinciple,
    showMarkers,
    toggleAnnotations,
    setDisplayedIssues,
    requestFeedback,
    isFetchingFeedback,
    resolveIssue,
    dismissIssue,
    condition,
    polotnoStore,
  }
})

export function DesignFeedbackPage() {
  return (
    <DesignFeedbackContainer.Provider>
      <EditorWithFeedback store={store} />
    </DesignFeedbackContainer.Provider>
  )
}
