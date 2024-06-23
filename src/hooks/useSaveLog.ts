import { StoreType } from 'polotno/model/store'
import { useCallback } from 'react'
import { config } from '../configurations/configuration'
import { NO_ID } from '../constants/constants'
import { LogType, ViolationType } from '../constants/enums'
import { experimentManager } from '../services/experimentManager'
import { fireStore } from '../services/fireStore'

export function useSaveLog(id = experimentManager.id ?? NO_ID) {
  const logPolotnoState = useCallback(
    async (store: StoreType) => {
      const log = {
        timestamp: Date.now(),
        timestampReadable: new Date().toLocaleString(),
        pages: JSON.stringify(store.pages),
      }
      if (config.production) {
        const key = await fireStore.addNewPolotnoStateLog(id, log)
        return key
      } else {
        console.log(log)
        return ''
      }
    },
    [id],
  )

  const log = useCallback(
    async (logType: LogType, extra?: any) => {
      const log = extra
        ? {
            timestamp: Date.now(),
            timestampReadable: new Date().toLocaleString(),
            action: logType,
          }
        : {
            timestamp: Date.now(),
            timestampReadable: new Date().toLocaleString(),
            action: logType,
          }
      if (config.production) {
        const key = await fireStore.addNewUserActionLog(id, log)
        return key
      } else {
        console.log(log)
        return ''
      }
    },
    [id],
  )

  const logResolveIssue = useCallback(
    async (violationType: ViolationType, issueDesc: string, principleTab: string) => {
      return log(LogType.ResolveIssue, {
        violationType,
        issueDesc,
        principleTab,
      })
    },
    [log],
  )

  const logDismissIssue = useCallback(
    async (violationType: ViolationType, issueDesc: string, principleTab: string) => {
      return log(LogType.DismissIssue, {
        violationType,
        issueDesc,
        principleTab,
      })
    },
    [log],
  )

  const logRequestFeedback = useCallback(
    async (snapshotName: string) => {
      return log(LogType.RequestFeedback, { snapshotName })
    },
    [log],
  )

  const logTurnOnAnnotation = useCallback(async () => {
    return log(LogType.TurnOnAnnotation, {})
  }, [log])

  const logTurnOffAnnotation = useCallback(async () => {
    return log(LogType.TurnOffAnnotation, {})
  }, [log])

  const logClickCommon = useCallback(
    async (principleTab: string) => {
      return log(LogType.ClickCommon, {
        principleTab,
      })
    },
    [log],
  )

  const logClickDetected = useCallback(
    async (principleTab: string) => {
      return log(LogType.ClickDetected, {
        principleTab,
      })
    },
    [log],
  )

  const logExpandIssueCard = useCallback(
    async (violationType: ViolationType, issueDesc: string, principleTab: string) => {
      return log(LogType.ExpandIssueCard, {
        violationType,
        principleTab,
        issueDesc,
      })
    },
    [log],
  )

  const logClickPrincipleTab = useCallback(
    async (principleTab: string) => {
      return log(LogType.ClickPrincipleTab, {
        principleTab,
      })
    },
    [log],
  )

  const logClickPrincipleReadMore = useCallback(
    async (principleTab: string) => {
      return log(LogType.ClickPrincipleReadMore, {
        principleTab,
      })
    },
    [log],
  )

  const logMoveNext = useCallback(
    async (stage: string) => {
      return log(LogType.MoveToNext, {
        stage,
      })
    },
    [log],
  )

  return {
    logPolotnoState,
    logResolveIssue,
    logDismissIssue,
    logRequestFeedback,
    logTurnOffAnnotation,
    logTurnOnAnnotation,
    logClickCommon,
    logClickDetected,
    logExpandIssueCard,
    logClickPrincipleTab,
    logClickPrincipleReadMore,
    logMoveNext,
    log,
  }
}
