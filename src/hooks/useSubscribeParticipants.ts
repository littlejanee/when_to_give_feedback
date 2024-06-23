import { onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { fireStore } from '../services/fireStore'
import { isEqual } from 'lodash'

export function useSubscribeParticipants() {
  const [participants, setParticipants] = useState<string[]>([])

  useEffect(() => {
    const unsubscribe = onSnapshot(fireStore.participants, (snapshot) => {
      const newParticipants = snapshot.docs.map((doc) => doc.id)
      if (!isEqual(newParticipants, participants)) {
        setParticipants(newParticipants)
      }
    })
    return () => unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { participants }
}
