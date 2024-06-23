import { Condition } from '../constants/enums'
import { Scenario } from '../constants/scenario'

class ExperimentManager {
  private PARTICIPANT_STAGE = 'PARTICIPANT_STAGE'
  private TIME_STAMP = 'TIME_STAMP'

  constructor(id?: string, condition?: Condition, private onNextStage?: (id: string, stage: number) => Promise<void>, private fallbackPage = '/') {
    if (id !== undefined && condition !== undefined) {
      this.initialize(id, condition)
    }
  }

  get id(): string | null {
    const id = window.location.href.split('id=')[1]
    if (id !== null) {
      return id
    }
    return null
  }

  initialize(id: string, group: Condition, onNextStage?: (id: string, stage: number) => Promise<void>, fallbackPage = '/') {
    console.info(`Initializing experiment with id ${id} and group ${group}`)
    localStorage.setItem(this.PARTICIPANT_STAGE, '0')
    localStorage.setItem(this.TIME_STAMP, new Date().getTime().toString())
    this.onNextStage = onNextStage
    this.fallbackPage = fallbackPage
  }

  nextStage(condition: Condition, jump = 0): string {
    const id = this.id
    if (id === null) {
      return this.fallbackPage
    }

    const participantStage = parseInt(localStorage.getItem(this.PARTICIPANT_STAGE) ?? '0', 10)
    if (this.currentStage === participantStage) {
      const nextStage = Scenario[participantStage + 1]
      this.onNextStage?.(id, this.currentStage)
      localStorage.setItem(this.PARTICIPANT_STAGE, (participantStage + 1).toString())
      localStorage.setItem(this.TIME_STAMP, new Date().getTime().toString())
      return (nextStage.url.find((conditionUrl) => conditionUrl.conditionMatch.includes(condition))?.url ?? '/') + `?id=${this.id}`
    } else {
      const nextStage = Scenario[participantStage + jump]
      return (nextStage.url.find((conditionUrl) => conditionUrl.conditionMatch.includes(condition))?.url ?? '/') + `?id=${this.id}`
    }
  }

  get timeRemaining(): number {
    const timeLimit = Scenario[this.currentStage]?.timeLimit ?? 0
    const timeStamp = localStorage.getItem(this.TIME_STAMP) ?? new Date().getTime().toString()
    return timeLimit - Math.floor((new Date().getTime() - parseInt(timeStamp, 10)) / 1000)
  }

  hasTimeLimit(): boolean {
    return Scenario[this.currentStage]?.timeLimit !== 0
  }

  get currentStage(): number {
    return parseInt(localStorage.getItem(this.PARTICIPANT_STAGE) ?? '0', 10)
  }
}

export const experimentManager = new ExperimentManager()
