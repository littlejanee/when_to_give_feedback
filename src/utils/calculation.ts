export class CalcUtil {
  static euclideanDistance(a: number[], b: number[]): number {
    return Math.sqrt(a.map((n, i) => Math.pow(n - b[i], 2)).reduce((s, n) => s + n, 0))
  }
}
