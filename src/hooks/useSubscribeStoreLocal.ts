import { cloneDeep, isEqual } from 'lodash'
import { StoreType } from 'polotno/model/store'
import { useEffect, useState } from 'react'
import { store } from '../App'

export function useSubscribeStoreLocal(debounceTimeInMs = 1000) {
  const [polotnoStore, setStore] = useState<Readonly<StoreType>>(store.toJSON() as any)

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null

    const unsubscribe = store?.on('change', () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        try {
          const pureStore = cloneDeep(store.toJSON()) as StoreType
          pureStore.pages.forEach((page) => {
            page.children = page.children.filter((c) => c.name !== 'VISUALIZATION') as any
          })
          if (!isEqual(pureStore, polotnoStore)) {
            setStore(Object.freeze(pureStore))
          }
        } catch (e) {
          console.error(e)
        }
      }, debounceTimeInMs)
    })

    return () => {
      unsubscribe?.()
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [debounceTimeInMs, polotnoStore])

  return { polotnoStore }
}
