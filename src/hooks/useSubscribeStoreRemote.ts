import { onSnapshot } from 'firebase/firestore'
import { isEqual } from 'lodash'
import { StoreType } from 'polotno/model/store'
import { useEffect, useState } from 'react'
import { NO_ID } from '../constants/constants'
import { fireStore } from '../services/fireStore'

export function useSubscribeStoreRemote(id: string) {
  const [polotnoState, setPolotnoState] = useState<ReturnType<StoreType['toJSON']> | null>(null)

  useEffect(() => {
    if (id !== NO_ID) {
      const unsubscribe = onSnapshot(fireStore.participant(id), (snapshot) => {
        const data = snapshot.data()
        if (data) {
          const state = JSON.parse(data.polotnoState) as StoreType
          if (!isEqual(state, polotnoState)) {
            setPolotnoState(state)
          }
        }
      })
      return () => unsubscribe()
    }
  }, [id, polotnoState])

  return { polotnoState }
}
