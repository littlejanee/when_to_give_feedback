import { Condition } from './enums'

type ConditionMatch = `${Condition | ''}`

interface ConditionUrl {
  conditionMatch: ConditionMatch
  url: string
}

interface Stage {
  canRevisit: boolean
  url: ConditionUrl[]
  timeLimit: number
  name: string
}

export const Scenario: Stage[] = [
  {
    name: 'Introduction',
    url: [],
    timeLimit: 0,
    canRevisit: false,
  },
  {
    name: 'Design',
    url: [{ conditionMatch: 'C', url: '/design-feedback' }],
    timeLimit: 0,
    canRevisit: false,
  },
]
