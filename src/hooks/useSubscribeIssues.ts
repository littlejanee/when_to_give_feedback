import { onSnapshot } from 'firebase/firestore'
import { isEqual } from 'lodash'
import { useEffect, useState } from 'react'
import { NO_ID } from '../constants/constants'
import { fireStore } from '../services/fireStore'
import { Issue } from '../types/participant'

export function useSubscribeIssues(id: string) {
  const [issues, setIssues] = useState<Issue[]>([])

  useEffect(() => {
    if (id !== NO_ID) {
      const unsubscribe = onSnapshot(fireStore.participant(id), (snapshot) => {
        if (!isEqual(issues, snapshot.data()?.issues)) {
          setIssues(snapshot.data()?.issues ?? [])
        }
      })
      return () => unsubscribe()
    }
  }, [id, issues])

  return { issues }
}
