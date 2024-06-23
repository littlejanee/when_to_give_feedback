import { useCallback } from 'react'
import { config } from '../configurations/configuration'
import { NO_ID } from '../constants/constants'
import { experimentManager } from '../services/experimentManager'
import { fireStorage } from '../services/fireStorage'

export function useCaptureCanvas() {
  const id = experimentManager.id ?? NO_ID

  const captureCanvas = useCallback(
    async (fileName: string, pageId?: string) => {
      const base64url = await store?.toDataURL({ mimeType: 'image/png', pageId })
      if (config.production) {
        if (base64url) {
          const url = await fireStorage.upload(`/captures/${id}/${fileName}`, base64url.split(',')[1])
          return url
        }
      } else {
        console.log(`Save canvas to /captures/${id}/${fileName}`)
      }
    },
    [id],
  )

  return { captureCanvas }
}
