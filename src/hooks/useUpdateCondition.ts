import { useCallback } from 'react'
import { NO_ID } from '../constants/constants'
import { Condition } from '../constants/enums'
import { fireStore, updateDocLog } from '../services/fireStore'

export function useUpdateCondition(id: string) {
  const updateCondition = useCallback(
    async (condition: Condition) => {
      try {
        if (id !== NO_ID) {
          await updateDocLog(fireStore.participant(id), {
            condition,
          })
        }
      } catch (e) {
        console.error('Error updating document: ', e)
      }
    },
    [id],
  )

  return { updateCondition }
}
