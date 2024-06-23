import { onSnapshot, updateDoc } from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'
import { NO_ID } from '../constants/constants'
import { Condition } from '../constants/enums'
import { fireStore } from '../services/fireStore'

export function useExperiment(id: string) {
  const [condition, setCondition] = useState<Condition | null>(null)
  const [completed, setCompleted] = useState<boolean>(false)

  useEffect(() => {
    if (id !== NO_ID) {
      const unsubscribe = onSnapshot(fireStore.participant(id), (snapshot) => {
        setCondition(snapshot.data()?.condition ?? null)
      })
      return () => unsubscribe()
    }
  }, [id])

  useEffect(() => {
    if (id !== NO_ID) {
      const unsubscribe = onSnapshot(fireStore.participant(id), (snapshot) => {
        setCompleted(snapshot.data()?.completed ?? false)
      })
      return () => unsubscribe()
    }
  }, [id])

  const completeExperiment = useCallback(async () => {
    if (id !== NO_ID) {
      await updateDoc(fireStore.participant(id), {
        completed: true,
      })
    }
  }, [id])

  return { condition, completed, completeExperiment }
}
