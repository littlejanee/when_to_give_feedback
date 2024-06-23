import { LogType } from '../constants/enums'

interface Log {
  timestamp: number
  timestampReadable: string
}

export interface PolotnoStateLog extends Log {
  pages: string
}

export interface UserActionLog extends Log {
  action: LogType
  extra?: {
    [key: string]: string
  }
}
