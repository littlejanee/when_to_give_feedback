import { ViolationType } from '../constants/enums'
import { Condition } from '../constants/enums'

export interface Issue {
  id: number
  type: ViolationType
  description: string
  x: number
  y: number
  published: boolean
  page?: number
}

export interface Participant {
  condition: Condition
  issues: Issue[]
  polotnoState: string
  completed: boolean
}
