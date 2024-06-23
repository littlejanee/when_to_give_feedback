import { StoreType } from 'polotno/model/store'
import { useCallback } from 'react'
import { NO_ID } from '../constants/constants'
import { experimentManager } from '../services/experimentManager'
import { fireStore, updateDocLog } from '../services/fireStore'

export function useUpdateStoreRemote() {
  const updatePolotnoState = useCallback(async (state: ReturnType<StoreType['toJSON']>) => {
    const id = experimentManager.id ?? NO_ID
    try {
      if (id !== NO_ID) {
        await updateDocLog(fireStore.participant(id), {
          polotnoState: JSON.stringify(state),
        })
      }
    } catch (e) {
      console.error('Error updating document: ', e)
    }
  }, [])

  return { updatePolotnoState }
}
