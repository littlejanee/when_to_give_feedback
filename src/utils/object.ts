export class ObjectUtil {
  static keys<T>(object: T) {
    return Object.keys(object) as Array<keyof T>
  }

  static keyValues<T>(object: T) {
    return this.keys(object).map((key) => ({
      key,
      value: object[key],
    }))
  }
}
