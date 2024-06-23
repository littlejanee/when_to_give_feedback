import { Condition } from '../constants/enums'

export class ConditionUtil {
  static isFeedback(condition: Condition | null) {
    return [Condition.C].some((c) => condition === c)
  }
}
